"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { getEventById, allEvents, eventsByYear } from "@/lib/data/gdg-noida-events";
import { getEventUniqueStats } from "@/lib/data/event-stats";
import AttendeeStats from "@/components/sections/attendee-stats";
import CommunityFeedback from "@/components/sections/community-feedback";
import Agenda from "@/components/sections/agenda";
import MomentsGallery from "@/components/sections/moments-gallery";
import { galleryCategories } from "@/lib/content";
import type { GalleryImage } from "@/lib/content";
import type { Track } from "@/components/sections/agenda/data";

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

    // Only DevFest 2023 is the complete file with all details; other events use only what's in their ts file
    const isDevfest2023 = useMemo(() => {
        const cleanId = event.id.toLowerCase();
        return cleanId === "devfest-noida-2023" || cleanId === "devfest-2023" || (event.year === 2023 && cleanId.includes("devfest"));
    }, [event]);

    // Related events from the same year
    const sameYearEvents = useMemo(() => {
        return eventsByYear[eventYear] || [];
    }, [eventYear]);

    // Unique statistics for this event (returns "TBA" for upcoming events)
    const stats = useMemo(() => {
        return getEventUniqueStats(
            event.id,
            event.speakers?.list?.length,
            event.attendees?.total,
            event.status
        );
    }, [event]);

    // Cover image
    const coverImage =
        event.branding?.coverImage ||
        "/assets/who-we-are/successful-events.png";

    // Agenda tracks:
    // For DevFest 2023, undefined is passed so Agenda uses its complete default multi-tracks.
    // For all other files, keep only the agenda given by the info of each file. If none, null.
    const eventTracks = useMemo(() => {
        if (isDevfest2023) {
            return undefined; // complete multi-tracks
        }

        if (!event.agenda?.tracks || event.agenda.tracks.length === 0) {
            return null;
        }

        const parsed: Track[] = event.agenda.tracks
            .map((t: any) => ({
                id: String(t.id || t.name || "main"),
                name: t.name || t.title || "Main Track",
                color: t.color || "#4285F4",
                sessions: (t.sessions || [])
                    .filter((s: any) => s && s.title && String(s.title).trim().length > 0)
                    .map((s: any, idx: number) => ({
                        id: String(s.id ?? idx),
                        startTime: s.startTime || s.time || "",
                        endTime: s.endTime || "",
                        title: s.title || "",
                        speakers: (s.speakers || (s.speaker ? [{ name: s.speaker }] : [])).map((sp: any) => ({
                            name: typeof sp === "string" ? sp : sp.name || "",
                            designation: sp.designation || sp.company || "",
                        })),
                    })),
            }))
            .filter((t: Track) => t.sessions.length > 0);

        return parsed.length > 0 ? parsed : null;
    }, [event, isDevfest2023]);

    // Gallery images:
    // Only DevFest 2023 has complete default moments; other files show only images mentioned in their ts file
    const galleryImages = useMemo(() => {
        if (event.gallery?.images && event.gallery.images.length > 0) {
            return event.gallery.images.map((img: any, idx: number) => ({
                id: typeof img.id === "number" ? img.id : idx + 1,
                src: img.src,
                alt: img.alt || event.title,
                category: img.category || "all",
                aspectRatio: img.aspectRatio || 1,
            })) as GalleryImage[];
        }
        if (isDevfest2023) {
            return undefined; // uses default gallery images for DevFest 2023
        }
        return null;
    }, [event, isDevfest2023]);

    // Feedback:
    // Only DevFest 2023 or events that have feedback reviews in their ts file
    const hasFeedback = useMemo(() => {
        if (isDevfest2023) return true;
        return Boolean(event.feedback?.reviews && event.feedback.reviews.length > 0);
    }, [event, isDevfest2023]);

    return (
        <div className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-32">
            {/* Top Navigation / Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#3B82F6] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to all events</span>
                </Link>
            </div>

            {/* Title & Metadata */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF2FE] text-[#1A73E8]">
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
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black text-center lg:text-left"
                    style={{
                        fontFamily: "'Product Sans', sans-serif",
                        fontWeight: 500,
                    }}
                >
                    {event.title}
                </h1>

                {/* Date & Venue Bar */}
                <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-600 mt-3 justify-center lg:justify-start">
                    {event.dates?.displayDate && (
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#4285F4]" />
                            <span>{event.dates.displayDate}</span>
                        </span>
                    )}
                    {event.venue?.name && (
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#EA4335]" />
                            <span>{event.venue.name}</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Hero Cover Image (Full Width, similar to devfest_2023) */}
            <div className="w-full mt-6 sm:mt-8">
                <div className="relative w-full h-[220px] sm:h-[340px] md:h-[460px] lg:h-[600px] bg-gray-100">
                    <Image
                        src={coverImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        unoptimized
                    />
                </div>
            </div>

            {/* Events from the same year selector tabs */}
            {sameYearEvents.length > 1 && (
                <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-8 pb-4">
                    <div className="text-center mb-4">
                        <span
                            className="text-xs font-bold uppercase tracking-wider text-gray-500"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            More Events in {eventYear}
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {sameYearEvents.map((ev) => {
                            const isCurrent = ev.id === event.id;
                            return (
                                <Link
                                    key={ev.id}
                                    href={`/events/${ev.id}`}
                                    className={[
                                        "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 truncate max-w-[240px]",
                                        isCurrent
                                            ? "bg-[#3B82F6] text-white shadow-md scale-105"
                                            : "bg-[#F0F0F1] text-[#4B5563] hover:bg-[#E5E5E6]",
                                    ].join(" ")}
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {ev.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

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

            {/* Community Feedback (Only DevFest 2023 or events with reviews in their ts file) */}
            {hasFeedback && <CommunityFeedback />}

            {/* Agenda Section (DevFest 2023 has full multi-track; other files only show tracks from their ts file) */}
            {(isDevfest2023 || eventTracks !== null) && (
                <Agenda
                    tracks={eventTracks ?? undefined}
                    title={event.agenda?.heading || "Agenda"}
                />
            )}

            {/* Moments Gallery (DevFest 2023 or events with gallery images in their ts file) */}
            {(isDevfest2023 || galleryImages !== null) && (
                <MomentsGallery
                    categories={galleryCategories}
                    images={galleryImages ?? undefined}
                />
            )}
        </div>
    );
}
