"use client";

import { use, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { getEventById, allEvents } from "@/lib/data/gdg-noida-events";
import { getEventUniqueStats } from "@/lib/data/event-stats";
import AttendeeStats from "@/components/sections/attendee-stats";
import CommunityFeedback from "@/components/sections/community-feedback";
import Agenda from "@/components/sections/agenda";
import MomentsGallery from "@/components/sections/moments-gallery";
import type { GalleryImage } from "@/lib/content";
import SponsorsSection from "@/components/sections/sponsors_section";
import type { Track } from "@/components/sections/agenda/data";
import EventCoverImage from "../event-cover-image";

interface EventDetailPageProps {
    params: Promise<{ id: string }>;
}

/* Google's four colours, used once as a structural motif (hero bar + ticket edge). */
const G = { blue: "#4285F4", red: "#EA4335", yellow: "#FBBC04", green: "#34A853" };
const INK = "#14181f";

const display = { fontFamily: "'Product Sans', 'Inter', sans-serif" } as const;
const body = { fontFamily: "'Inter', sans-serif" } as const;

/* ─────────────────────────────────────────────────────────────
   Layout tokens: ONE width and ONE gutter for the whole page.
   Every block (hero, nav, stats, sponsors, feedback, agenda,
   gallery) goes through these, so their edges always line up.
   ───────────────────────────────────────────────────────────── */
const CONTAINER = "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10";
const SECTION_GAP = "";

/**
 * Wraps a child section in the shared container.
 *
 * The imported section components (AttendeeStats, CommunityFeedback, Agenda,
 * MomentsGallery) bring their own max-width / padding, which is what caused
 * them to render at different sizes from the hero. The `[&>*]` overrides
 * neutralise the root element's own max-w, mx and px so the shared container
 * is the single source of truth for width.
 */
function PageSection({
    id,
    className = "",
    children,
}: {
    id?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div id={id} className={`scroll-mt-32 ${className}`}>
            <div
                className={`${CONTAINER} [&>*]:!mx-0 [&>*]:!w-full [&>*]:!max-w-none [&>*]:!px-0`}
            >
                {children}
            </div>
        </div>
    );
}

function GoogleBar({ className = "" }: { className?: string }) {
    return (
        <div className={`flex h-1.5 w-full overflow-hidden rounded-full ${className}`} aria-hidden="true">
            <span className="flex-1" style={{ background: G.blue }} />
            <span className="flex-1" style={{ background: G.red }} />
            <span className="flex-1" style={{ background: G.yellow }} />
            <span className="flex-1" style={{ background: G.green }} />
        </div>
    );
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    const { id } = use(params);

    // Find the event by ID or slug, fallback to first event if not found
    const event = useMemo(() => getEventById(id) || allEvents[0], [id]);

    const eventYear = event.year || 2026;
    const isUpcoming = event.status?.toLowerCase() === "upcoming";

    // Unique statistics for this event (returns "TBA" for upcoming events)
    const stats = useMemo(() => {
        if (event.uniqueStats) return event.uniqueStats;
        return getEventUniqueStats(
            event.id,
            event.speakers?.list?.length,
            event.attendees?.total,
            event.status
        );
    }, [event]);

    const coverImage = event.branding?.coverImage || "";

    // Agenda tracks: render only tracks and sessions provided by the event data.
    const eventTracks = useMemo(() => {
        if (!event.agenda?.tracks || event.agenda.tracks.length === 0) return null;

        const parsed: Track[] = event.agenda.tracks
            .map((t) => ({
                id: String(t.id || t.name || "main"),
                name: t.name || t.title || "Main Track",
                color: t.color || "#4285F4",
                sessions: (t.sessions || [])
                    .filter((s) => s && s.title && String(s.title).trim().length > 0)
                    .map((s, idx) => ({
                        id: String(s.id ?? idx),
                        startTime: s.startTime || s.time || "",
                        endTime: s.endTime || "",
                        title: s.title || "",
                        speakers: (s.speakers || (s.speaker ? [{ name: s.speaker }] : [])).map((sp) => ({
                            name: typeof sp === "string" ? sp : sp.name || "",
                            designation: sp.designation || sp.company || "",
                        })),
                    })),
            }))
            .filter((t: Track) => t.sessions.length > 0);

        return parsed.length > 0 ? parsed : null;
    }, [event]);

    // Gallery images: only images listed in the event's data file
    const galleryImages = useMemo(() => {
        if (event.gallery?.images && event.gallery.images.length > 0) {
            return event.gallery.images.map((img, idx) => ({
                id: typeof img.id === "number" ? img.id : idx + 1,
                src: img.src,
                alt: img.alt || event.title,
                category: "all",
                aspectRatio: img.aspectRatio || 1,
            } satisfies GalleryImage));
        }
        return null;
    }, [event]);

    // Feedback: only events that have reviews in their data file
    const hasFeedback = useMemo(
        () => Boolean(event.feedback?.reviews && event.feedback.reviews.length > 0),
        [event]
    );

    const hasSponsors = Boolean((event.sponsors as any[]) && (event.sponsors as any[]).length > 0);

    /* In-page navigation: only lists sections this event actually has. */
    const sections = useMemo(
        () =>
            [
                { id: "overview", label: "Overview", show: true },
                { id: "sponsors", label: "Sponsors", show: hasSponsors },
                { id: "feedback", label: "Feedback", show: hasFeedback },
                { id: "agenda", label: "Agenda", show: eventTracks !== null },
                { id: "gallery", label: "Gallery", show: galleryImages !== null },
            ].filter((s) => s.show),
        [hasSponsors, hasFeedback, eventTracks, galleryImages]
    );

    const [active, setActive] = useState("overview");

    useEffect(() => {
        const els = sections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => Boolean(el));
        if (els.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    const statusStyles = isUpcoming
        ? "bg-[#FBBC04] text-[#3c2e00]"
        : "bg-[#34A853] text-white";

    return (
        <main
            className="min-h-screen overflow-x-clip bg-[#f8f9fa] pb-24 pt-24 sm:pt-28 md:pt-32"
            style={body}
        >
            {/* ───────── Hero + nav (same container as every other section) ───────── */}
            <div className={CONTAINER}>
                {/* Back link */}
                <Link
                    href={`/events?year=${eventYear}`}
                    className="group mb-5 inline-flex items-center gap-2 rounded-full py-1.5 pr-3 text-sm font-semibold text-[#4b5563] transition-colors hover:text-[#1a73e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
                >
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-[#d6dbe4] bg-white transition-transform group-hover:-translate-x-0.5">
                        <ArrowLeft className="h-4 w-4" />
                    </span>
                    Back to all events
                </Link>

                {/* Hero card: sits directly in the outer container (no second PageSection container),
                    so it is exactly one container wide */}
                <div id="overview" className="w-full scroll-mt-32">
                    {/* One card, same width as every other section: cover, title band, colour bar, date + venue */}
                    <div className="overflow-hidden w-full rounded-[1.75rem] border border-[#d6dbe4] bg-white sm:rounded-[2.25rem]">
                        {/* Cover image: full brightness, no overlay */}
                        <div
                            className="relative aspect-[16/10] w-full sm:aspect-[16/8] lg:aspect-[21/8]"
                            style={{ background: INK }}
                        >
                            <EventCoverImage
                                src={coverImage}
                                alt=""
                                className="object-cover"
                                sizes="(max-width: 1359px) 100vw, 1280px"
                                priority
                            />
                        </div>

                        {/* Title band: solid colour, so the text stays readable without a scrim */}
                        <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-12" style={{ background: INK }}>
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-[#2b3444] px-3 py-1 text-xs font-semibold text-white">
                                    {eventYear}
                                </span>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles}`}
                                >
                                    {event.status || "Completed"}
                                </span>
                                {event.venue?.city && (
                                    <span className="rounded-full bg-[#2b3444] px-3 py-1 text-xs font-semibold text-white">
                                        {event.venue.city}
                                    </span>
                                )}
                            </div>

                            <h1
                                id="event-title"
                                className="max-w-4xl break-words font-boldtext-[1.75rem] leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
                                style={{ ...display, fontWeight: 500, textWrap: "balance" }}
                            >
                                {event.title}
                            </h1>
                        </div>
                        <GoogleBar className="!rounded-none" />

                        {/* Date + venue: full card width, aligned with the cover and every section below */}
                        {(event.dates?.displayDate || event.venue?.name) && (
                            <div className="flex flex-col divide-y divide-dashed divide-[#d6dbe4] bg-white sm:flex-row sm:divide-x sm:divide-y-0">
                                {event.dates?.displayDate && (
                                    <div className="flex min-w-0 flex-1 items-center gap-4 px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
                                        <span
                                            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                                            style={{ background: "#e8f0fe", color: G.blue }}
                                        >
                                            <Calendar className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-[#6b7280]">When</p>
                                            <p
                                                className="text-base font-medium text-[#14181f] sm:text-lg"
                                                style={display}
                                            >
                                                {event.dates.displayDate}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {event.venue?.name && (
                                    <div className="flex min-w-0 flex-1 items-center gap-4 px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
                                        <span
                                            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                                            style={{ background: "#fce8e6", color: G.red }}
                                        >
                                            <MapPin className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-[#6b7280]">Where</p>
                                            <p
                                                className="text-base font-medium text-[#14181f] sm:text-lg"
                                                style={display}
                                            >
                                                {event.venue.name}
                                            </p>
                                        </div>
                                        {event.venue.mapLink && (
                                            <a
                                                href={event.venue.mapLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#d6dbe4] px-3 py-1.5 text-xs font-semibold text-[#14181f] transition-colors hover:border-[#EA4335] hover:bg-[#fce8e6] hover:text-[#b3261e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA4335] focus-visible:ring-offset-2"
                                            >
                                                Open map
                                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ───────── Sticky section nav ───────── */}
                {sections.length > 1 && (
                    <nav
                        aria-label="Event sections"
                        className="sticky top-20 z-30 mt-8 flex justify-center sm:top-24"
                    >
                        <ul className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#d6dbe4] bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(20,24,31,0.3)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {sections.map((s) => {
                                const isActive = active === s.id;
                                return (
                                    <li key={s.id} className="shrink-0">
                                        <a
                                            href={`#${s.id}`}
                                            aria-current={isActive ? "true" : undefined}
                                            className={[
                                                "block rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]",
                                                isActive
                                                    ? "bg-[#14181f] text-white"
                                                    : "text-[#4b5563] hover:bg-[#eef1f6] hover:text-[#14181f]",
                                            ].join(" ")}
                                        >
                                            {s.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                )}
            </div>

            {/* ───────── Stats / about ───────── */}
            <PageSection id="overview-stats" className={SECTION_GAP}>
                <AttendeeStats
                    heading={event.overview?.heading || `Impact & Participation • ${event.title}`}
                    description={
                        event.attendees?.description ||
                        (isUpcoming
                            ? "Details for this upcoming event will be announced soon."
                            : "Key participation and community engagement metrics for this event")
                    }
                    speakers={stats.speakers}
                    attendees={stats.attendees}
                    registered={stats.registered}
                    about={event.about?.description}
                />
            </PageSection>

            {/* ───────── Sponsors ───────── */}
            {hasSponsors && (
                <PageSection id="sponsors" className="mt-8">
                    <SponsorsSection sponsors={event.sponsors as any[]} />
                </PageSection>
            )}

            {/* ───────── Feedback ───────── */}
            {hasFeedback && (
                <PageSection id="feedback" className={SECTION_GAP}>
                    <CommunityFeedback />
                </PageSection>
            )}

            {/* ───────── Agenda ───────── */}
            {eventTracks !== null && (
                <PageSection id="agenda" className={SECTION_GAP}>
                    <Agenda tracks={eventTracks} title={event.agenda?.heading || "Agenda"} />
                </PageSection>
            )}

            {/* ───────── Gallery ───────── */}
            {galleryImages !== null && (
                <PageSection id="gallery" className={SECTION_GAP}>
                    <MomentsGallery eventName={event.title} images={galleryImages} />
                </PageSection>
            )}
        </main>
    );
}