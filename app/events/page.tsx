"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { eventsByYear } from "@/lib/data/gdg-noida-events";
import { getEventUniqueStats } from "@/lib/data/event-stats";
import EventCoverImage from "./event-cover-image";

const YEARS = [2026, 2025, 2024, 2023, 2022] as const;

export default function EventsPage() {
    return (
        <Suspense fallback={null}>
            <EventsPageContent />
        </Suspense>
    );
}

function EventsPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const requestedYear = Number(searchParams.get("year"));
    const selectedYear = YEARS.includes(requestedYear as (typeof YEARS)[number])
        ? requestedYear
        : YEARS[0];

    // Events for the selected year, newest first.
    const yearEvents = useMemo(() => {
        return [...(eventsByYear[selectedYear] || [])].sort((firstEvent, secondEvent) =>
            (secondEvent.dates?.isoDate || "").localeCompare(firstEvent.dates?.isoDate || "")
        );
    }, [selectedYear]);

    // Handle year selection
    const handleYearChange = (year: number) => {
        router.push(`/events?year=${year}`);
    };

    return (
        <main className="min-h-screen bg-[#f8f9fa] pt-24 sm:pt-28 md:pt-32">
            <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-10">
                <section className="mb-8 rounded-3xl border border-[#dadce0] bg-white px-5 py-7 shadow-[0_1px_4px_rgba(60,64,67,0.1)] sm:px-8 sm:py-9 lg:px-10">
                    <header>
                        <div className="max-w-3xl">
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#174ea6]">
                                Explore our community
                            </p>
                            <h1
                                className="text-3xl font-medium leading-tight tracking-tight text-[#202124] sm:text-4xl lg:text-5xl"
                                style={{ fontFamily: "'Product Sans', sans-serif" }}
                            >
                                GDG Noida <span className="font-bold text-[#1a73e8]">Events</span>
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5f6368] sm:text-base">
                                Discover conferences, workshops, and meetups from the GDG Noida community. Pick a year to explore what happened.
                            </p>
                        </div>
                    </header>

                    <div className="mt-7 border-t border-[#e8eaed] pt-5">
                        <p className="mb-3 text-center text-xs font-bold uppercase tracking-wider text-[#5f6368]">Browse by year</p>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="group" aria-label="Filter events by year">
                            {YEARS.map((year) => {
                                const isActive = year === selectedYear;
                                return (
                                    <button
                                        key={year}
                                        type="button"
                                        onClick={() => handleYearChange(year)}
                                        aria-pressed={isActive}
                                        className={[
                                            "inline-flex min-h-11 min-w-16 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 sm:px-5 sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2",
                                            isActive
                                                ? "bg-[#1a73e8] text-white shadow-sm"
                                                : "bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f1f3f4]",
                                        ].join(" ")}
                                    >
                                        <span>{year}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            {/* Main Event Cards Grid */}
            <div className="mx-auto max-w-[1480px] px-4 pb-20 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                    {yearEvents.map((ev) => {
                        const isUpcoming = ev.status?.toLowerCase() === "upcoming";
                        const stats = ev.uniqueStats || getEventUniqueStats(
                            ev.id,
                            ev.speakers?.list?.length,
                            ev.attendees?.total,
                            ev.status
                        );
                        const coverImage = ev.branding?.coverImage || "";

                        return (
                            <div
                                key={ev.id}
                                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-[0_1px_3px_rgba(60,64,67,0.08)] transition-shadow duration-200 hover:shadow-[0_6px_20px_rgba(60,64,67,0.14)]"
                            >
                                {/* Main Card Image Banner - click directs to event page */}
                                <Link
                                    href={`/events/${ev.id}?year=${selectedYear}`}
                                    aria-label={`View ${ev.title} event details`}
                                    className="relative block aspect-[16/10] w-full overflow-hidden bg-[#f8f9fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1a73e8]"
                                >
                                    <EventCoverImage
                                        src={coverImage}
                                        alt={ev.title}
                                        className="object-contain object-center"
                                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                                        blurredBackdrop
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-3 right-3">
                                        <span
                                            className={[
                                                "px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs capitalize border",
                                                isUpcoming
                                                    ? "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]"
                                                    : "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
                                            ].join(" ")}
                                        >
                                            {ev.status
                                                ? `${ev.status.charAt(0).toUpperCase()}${ev.status.slice(1)}`
                                                : "Completed"}
                                        </span>
                                    </div>
                                </Link>

                                {/* Main Card Content */}
                                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                                    <div>
                                        {/* Date and Venue */}
                                        <div className="mb-3 flex flex-col gap-1.5 text-xs text-[#5f6368]">
                                            <span className="flex min-w-0 items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5 shrink-0 text-[#4285F4]" aria-hidden="true" />
                                                <span className="min-w-0 truncate">
                                                    {ev.dates?.displayDate || `${selectedYear}`}
                                                </span>
                                            </span>
                                            <span className="flex min-w-0 items-center gap-1.5">
                                                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#EA4335]" aria-hidden="true" />
                                                {ev.venue?.mapLink ? (
                                                    <a
                                                        href={ev.venue.mapLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="min-w-0 truncate underline decoration-[#EA4335]/30 underline-offset-2 hover:text-[#EA4335] hover:decoration-[#EA4335] transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {ev.venue?.name || ev.venue?.city || "Noida"}
                                                    </a>
                                                ) : (
                                                    <span className="min-w-0 truncate">
                                                        {ev.venue?.name || ev.venue?.city || "Noida"}
                                                    </span>
                                                )}
                                            </span>
                                        </div>

                                        {/* Title - clickable to event page */}
                                        <Link href={`/events/${ev.id}?year=${selectedYear}`} className="block focus-visible:outline-none focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4">
                                            <h3
                                                className="mb-1 text-xl font-bold leading-snug text-[#202124] transition-colors group-hover:text-[#1a73e8] sm:text-[22px]"
                                                style={{ fontFamily: "'Product Sans', sans-serif" }}
                                            >
                                                {ev.title}
                                            </h3>
                                        </Link>
                                        {ev.id !== "sns" && ev.subtitle && (
                                            <p className="mb-2 line-clamp-2 text-sm text-[#5f6368]">
                                                {ev.subtitle}
                                            </p>
                                        )}

                                        {/* 3 Columns in 1 Single Row: Speakers, Attendees, Registered (Circle Removed, TBA if Upcoming) */}
                                        <div className="my-4 grid grid-cols-3 gap-1 rounded-xl bg-[#f8f9fa] p-2 sm:gap-2">
                                            {/* Column 1: Speakers */}
                                            <div className="flex min-w-0 flex-col items-center justify-center p-1 text-center sm:p-2">
                                                <span
                                                    className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    Speakers
                                                </span>
                                                <span
                                                    className="text-base sm:text-xl font-bold text-[#4285F4]"
                                                    style={{ fontFamily: "'Product Sans', sans-serif" }}
                                                >
                                                    {stats.speakers}
                                                </span>
                                            </div>

                                            {/* Column 2: Attendees */}
                                            <div className="flex min-w-0 flex-col items-center justify-center p-1 text-center sm:p-2">
                                                <span
                                                    className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    Attendees
                                                </span>
                                                <span
                                                    className="text-base sm:text-xl font-bold text-[#34A853]"
                                                    style={{ fontFamily: "'Product Sans', sans-serif" }}
                                                >
                                                    {stats.attendees}
                                                </span>
                                            </div>

                                            {/* Column 3: Registered */}
                                            <div className="flex min-w-0 flex-col items-center justify-center p-1 text-center sm:p-2">
                                                <span
                                                    className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    Registered
                                                </span>
                                                <span
                                                    className="text-base sm:text-xl font-bold text-[#8a5a00]"
                                                    style={{ fontFamily: "'Product Sans', sans-serif" }}
                                                >
                                                    {stats.registered}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Small About Section Below Every Main Card (Always Present) */}
                                        <div className="mt-4">
                                            <h4
                                                className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1"
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                About this event
                                            </h4>
                                            <p
                                                className="line-clamp-3 text-sm leading-relaxed text-[#5f6368]"
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                {ev.about?.description ||
                                                    "This community-led event brings together developers, designers, and professionals to learn, share ideas, and connect in the local ecosystem."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action button: Directs user to event page */}
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <Link
                                            href={`/events/${ev.id}?year=${selectedYear}`}
                                            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1a73e8] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#174ea6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                        >
                                            <span>View Event Page</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
