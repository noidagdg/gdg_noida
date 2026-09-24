"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { getEventById, allEvents } from "@/lib/data/gdg-noida-events";
import { getEventUniqueStats } from "@/lib/data/event-stats";
import AttendeeStats from "@/components/sections/attendee-stats";
import CommunityFeedback from "@/components/sections/community-feedback";
import Agenda from "@/components/sections/agenda";
import MomentsGallery from "@/components/sections/moments-gallery";
import { galleryCategories } from "@/lib/content";
import type { GalleryImage } from "@/lib/content";
import type { Track } from "@/components/sections/agenda/data";
import EventCoverImage from "../event-cover-image";

interface EventDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
    const { id } = use(params);

    // Find the event by ID or slug, fallback to first event if not found
    const event = useMemo(() => {
        return getEventById(id) || allEvents[0];
    }, [id]);

    const eventYear = event.year || 2026;
    const isUpcoming = event.status?.toLowerCase() === "upcoming";

    // Unique statistics for this event (returns "TBA" for upcoming events)
    const stats = useMemo(() => {
        if (event.uniqueStats) {
            return event.uniqueStats;
        }

        return getEventUniqueStats(
            event.id,
            event.speakers?.list?.length,
            event.attendees?.total,
            event.status
        );
    }, [event]);

    // Cover image
    const coverImage = event.branding?.coverImage || "";

    // Agenda tracks: render only tracks and sessions provided by the event data.
    const eventTracks = useMemo(() => {
        if (!event.agenda?.tracks || event.agenda.tracks.length === 0) {
            return null;
        }

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

    // Gallery images:
    // Only DevFest 2023 has complete default moments; other files show only images mentioned in their ts file
    const galleryImages = useMemo(() => {
        if (event.gallery?.images && event.gallery.images.length > 0) {
            return event.gallery.images.map((img, idx) => ({
                id: typeof img.id === "number" ? img.id : idx + 1,
                src: img.src,
                alt: img.alt || event.title,
                category: galleryCategories.find(({ id }) => id === img.category)?.id ?? "all",
                aspectRatio: img.aspectRatio || 1,
            } satisfies GalleryImage));
        }
        return null;
    }, [event]);

    // Feedback:
    // Only DevFest 2023 or events that have feedback reviews in their ts file
    const hasFeedback = useMemo(() => {
        return Boolean(event.feedback?.reviews && event.feedback.reviews.length > 0);
    }, [event]);

    return (
        <main className="min-h-screen bg-[#f8f9fa] pb-16 pt-24 sm:pt-28 md:pt-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Top Navigation / Breadcrumb */}
            <div className="mb-5 sm:mb-6">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#5f6368] hover:text-[#1a73e8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 rounded-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to all events</span>
                </Link>
            </div>

            {/* Title & Metadata */}
            <section className="rounded-3xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_4px_rgba(60,64,67,0.1)] sm:p-6 lg:p-8">
            <header className="pb-3 sm:pb-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e8f0fe] text-[#174ea6]">
                        {eventYear}
                    </span>
                    <span
                        className={[
                            "px-3 py-1 rounded-full text-xs font-bold capitalize border",
                            isUpcoming
                                ? "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]"
                                : "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
                        ].join(" ")}
                    >
                        {event.status || "Completed"}
                    </span>
                    {event.venue?.city && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {event.venue.city}
                        </span>
                    )}
                </div>

                <h1
                    className="break-words text-3xl leading-tight tracking-tight text-[#202124] sm:text-4xl lg:text-5xl"
                    style={{
                        fontFamily: "'Product Sans', sans-serif",
                        fontWeight: 500,
                    }}
                >
                    {event.title}
                </h1>

                {/* Date & Venue Bar */}
                <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#e8eaed] bg-[#f8f9fa] px-4 py-3 text-sm text-[#5f6368] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:text-base">
                    {event.dates?.displayDate && (
                        <span className="flex min-w-0 items-start gap-2">
                            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#4285F4]" aria-hidden="true" />
                            <span>{event.dates.displayDate}</span>
                        </span>
                    )}
                    {event.venue?.name && (
                        <span className="flex min-w-0 items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EA4335]" aria-hidden="true" />
                            {event.venue.mapLink ? (
                                <a
                                    href={event.venue.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-[#EA4335]/30 underline-offset-2 hover:text-[#EA4335] hover:decoration-[#EA4335] transition-colors"
                                >
                                    {event.venue.name}
                                </a>
                            ) : (
                                <span>{event.venue.name}</span>
                            )}
                        </span>
                    )}
                </div>
            </header>

            {/* Hero Cover Image (Full Width, similar to devfest_2023) */}
            <figure className="mt-3 w-full sm:mt-4">
                <div
                    className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-xl sm:aspect-[16/8] lg:aspect-[16/6]"
                    style={{ clipPath: "inset(0 round 0.75rem)" }}
                >
                    <EventCoverImage
                        src={coverImage}
                        alt={event.title}
                        className="rounded-xl object-contain"
                        sizes="(max-width: 1279px) 100vw, 1152px"
                        priority
                    />
                </div>
            </figure>
            </section>

            </div>

            {/* 3 Columns in 1 Single Row: Speakers, Attendees, Registered (Circle Removed, TBA if Upcoming) */}
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

            {/* Community Feedback for events with reviews in their data */}
            {hasFeedback && <CommunityFeedback />}

            {/* Agenda Section for events with track data */}
            {eventTracks !== null && (
                <Agenda
                    tracks={eventTracks ?? undefined}
                    title={event.agenda?.heading || "Agenda"}
                />
            )}

            {/* Moments Gallery for events with gallery images in their data */}
            {galleryImages !== null && (
                <MomentsGallery
                    categories={galleryCategories}
                    images={galleryImages ?? undefined}
                />
            )}
        </main>
    );
}
