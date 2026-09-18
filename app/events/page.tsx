"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { eventsByYear } from "@/lib/data/gdg-noida-events";
import { getEventUniqueStats } from "@/lib/data/event-stats";

const YEARS = [2026, 2025, 2024, 2023, 2022] as const;

export default function EventsPage() {
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const [selectedEventId, setSelectedEventId] = useState<string>("all");

    // Events for the selected year only
    const yearEvents = useMemo(() => {
        return eventsByYear[selectedYear] || [];
    }, [selectedYear]);

    // Handle year selection
    const handleYearChange = (year: number) => {
        setSelectedYear(year);
        setSelectedEventId("all");
    };

    // Filtered events to display based on event selection
    const displayedEvents = useMemo(() => {
        if (selectedEventId === "all") {
            return yearEvents;
        }
        const filtered = yearEvents.filter((e) => e.id === selectedEventId);
        return filtered.length > 0 ? filtered : yearEvents;
    }, [yearEvents, selectedEventId]);

    return (
        <div className="min-h-screen bg-white pt-24 sm:pt-28 md:pt-32">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left mb-8">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black"
                    style={{
                        fontFamily: "'Product Sans', sans-serif",
                        fontWeight: 500,
                    }}
                >
                    GDG Noida <span className="font-bold text-[#4285F4]">Events</span>
                </h1>
                <p
                    className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 max-w-3xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    Explore all conferences, tech talks, workshops, and community meetups segregated by year. Click on any event to view its dedicated event page.
                </p>
            </div>

            {/* Year Selector Buttons */}
            <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-6">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                    {YEARS.map((year) => {
                        const isActive = year === selectedYear;
                        const count = eventsByYear[year]?.length || 0;
                        return (
                            <button
                                key={year}
                                type="button"
                                onClick={() => handleYearChange(year)}
                                aria-pressed={isActive}
                                className={[
                                    "px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg transition-all duration-200 flex items-center gap-2",
                                    isActive
                                        ? "bg-[#3B82F6] text-white shadow-md scale-105"
                                        : "bg-[#F0F0F1] text-[#4B5563] hover:bg-[#E5E5E6]",
                                ].join(" ")}
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 700,
                                }}
                            >
                                <span>{year}</span>
                                <span
                                    className={[
                                        "text-xs px-2 py-0.5 rounded-full font-medium",
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-gray-200 text-gray-600",
                                    ].join(" ")}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Event Selector for the selected year */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span
                            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Select Event in {selectedYear}
                        </span>
                        <span className="text-xs text-gray-500">
                            {yearEvents.length} event{yearEvents.length === 1 ? "" : "s"} available
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {/* Option to view All Events in the year */}
                        <button
                            type="button"
                            onClick={() => setSelectedEventId("all")}
                            className={[
                                "px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                                selectedEventId === "all"
                                    ? "bg-[#1E293B] text-white shadow-xs"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100",
                            ].join(" ")}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            All Events ({yearEvents.length})
                        </button>

                        {/* Quick links to each event page */}
                        {yearEvents.map((ev) => {
                            return (
                                <Link
                                    key={ev.id}
                                    href={`/events/${ev.id}`}
                                    className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors truncate max-w-[260px] bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                                    title={`Go to ${ev.title} page`}
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {ev.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Event Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {displayedEvents.map((ev) => {
                        const isUpcoming = ev.status?.toLowerCase() === "upcoming";
                        const stats = getEventUniqueStats(
                            ev.id,
                            ev.speakers?.list?.length,
                            ev.attendees?.total,
                            ev.status
                        );
                        const coverImage =
                            ev.branding?.coverImage ||
                            "/assets/who-we-are/successful-events.png";

                        return (
                            <div
                                key={ev.id}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                            >
                                {/* Main Card Image Banner - click directs to event page */}
                                <Link
                                    href={`/events/${ev.id}`}
                                    className="relative w-full h-[200px] sm:h-[220px] bg-gray-100 overflow-hidden block"
                                >
                                    <Image
                                        src={coverImage}
                                        alt={ev.title}
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-xs text-gray-800 shadow-xs">
                                            {ev.year || selectedYear}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span
                                            className={[
                                                "px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs capitalize border",
                                                isUpcoming
                                                    ? "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]"
                                                    : "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
                                            ].join(" ")}
                                        >
                                            {ev.status || "Completed"}
                                        </span>
                                    </div>
                                </Link>

                                {/* Main Card Content */}
                                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* Date and Venue */}
                                        <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-2.5">
                                            <span className="flex items-center gap-1.5 truncate">
                                                <Calendar className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                                                <span className="truncate">
                                                    {ev.dates?.displayDate || `${selectedYear}`}
                                                </span>
                                            </span>
                                            <span className="flex items-center gap-1.5 truncate max-w-[160px]">
                                                <MapPin className="w-3.5 h-3.5 text-[#EA4335] shrink-0" />
                                                <span className="truncate">
                                                    {ev.venue?.name || ev.venue?.city || "Noida"}
                                                </span>
                                            </span>
                                        </div>

                                        {/* Title - clickable to event page */}
                                        <Link href={`/events/${ev.id}`} className="block group-hover:text-[#3B82F6] transition-colors">
                                            <h3
                                                className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-1"
                                                style={{ fontFamily: "'Product Sans', sans-serif" }}
                                            >
                                                {ev.title}
                                            </h3>
                                        </Link>
                                        {ev.subtitle && (
                                            <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                                                {ev.subtitle}
                                            </p>
                                        )}

                                        {/* 3 Columns in 1 Single Row: Speakers, Attendees, Registered (Circle Removed, TBA if Upcoming) */}
                                        <div className="grid grid-cols-3 gap-2 my-4 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                            {/* Column 1: Speakers */}
                                            <div className="text-center flex flex-col items-center justify-center p-2 rounded-lg bg-white shadow-xs border border-gray-100">
                                                <span
                                                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5"
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
                                            <div className="text-center flex flex-col items-center justify-center p-2 rounded-lg bg-white shadow-xs border border-gray-100">
                                                <span
                                                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5"
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
                                            <div className="text-center flex flex-col items-center justify-center p-2 rounded-lg bg-white shadow-xs border border-gray-100">
                                                <span
                                                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    Registered
                                                </span>
                                                <span
                                                    className="text-base sm:text-xl font-bold text-[#FBBC05]"
                                                    style={{ fontFamily: "'Product Sans', sans-serif" }}
                                                >
                                                    {stats.registered}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Small About Section Below Every Main Card (Always Present) */}
                                        <div className="mt-3 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100">
                                            <h4
                                                className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1"
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                About this event
                                            </h4>
                                            <p
                                                className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3"
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
                                            href={`/events/${ev.id}`}
                                            className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 bg-[#1E293B] hover:bg-[#3B82F6] text-white flex items-center justify-center gap-1.5 shadow-xs"
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
        </div>
    );
}
