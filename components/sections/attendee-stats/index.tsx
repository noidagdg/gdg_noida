"use client";

import React from "react";

export interface AttendeeStatsProps {
    heading?: string;
    description?: string;
    speakers?: number | string;
    registered?: number | string;
    attendees?: number | string;
    about?: string;
}

export default function AttendeeStats({
    heading = "Event Impact & Participation",
    description = "Community engagement and participation across key metrics",
    speakers = "30+",
    registered = "3,500+",
    attendees = "600+",
    about,
}: AttendeeStatsProps) {
    return (
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_4px_rgba(60,64,67,0.1)] sm:p-6 lg:p-8">
                {/* Header */}
                <div className="relative z-10 mb-6 text-center sm:mb-8">
                    <h2
                        className="mb-2 break-words text-2xl leading-tight text-gray-900 sm:text-3xl md:text-4xl"
                        style={{
                            fontFamily: "'Product Sans', sans-serif",
                            fontWeight: 500,
                        }}
                    >
                        {heading}
                    </h2>
                    {description && (
                        <p
                            className="text-sm sm:text-base text-gray-600"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* 3 columns in a single row - Speakers, Registered, Attendees */}
                <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-3 gap-1.5 sm:gap-5">
                    {/* Speakers Column */}
                    <div className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-2 text-center sm:rounded-2xl sm:p-6">
                        <span
                            className="mb-1 text-[10px] font-semibold uppercase tracking-normal text-gray-500 sm:text-sm sm:tracking-wider"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Speakers
                        </span>
                        <span
                            className="break-all text-xl font-bold text-[#1a73e8] sm:text-4xl md:text-5xl"
                            style={{ fontFamily: "'Product Sans', sans-serif" }}
                        >
                            {speakers}
                        </span>
                    </div>

                    {/* Attendees Column */}
                    <div className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-2 text-center sm:rounded-2xl sm:p-6">
                        <span
                            className="mb-1 text-[10px] font-semibold uppercase tracking-normal text-gray-500 sm:text-sm sm:tracking-wider"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Attendees
                        </span>
                        <span
                            className="break-all text-xl font-bold text-[#188038] sm:text-4xl md:text-5xl"
                            style={{ fontFamily: "'Product Sans', sans-serif" }}
                        >
                            {attendees}
                        </span>
                    </div>

                    {/* Registered Column */}
                    <div className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-2 text-center sm:rounded-2xl sm:p-6">
                        <span
                            className="mb-1 text-[10px] font-semibold uppercase tracking-normal text-gray-500 sm:text-sm sm:tracking-wider"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Registered
                        </span>
                        <span
                            className="break-all text-xl font-bold text-[#8a5a00] sm:text-4xl md:text-5xl"
                            style={{ fontFamily: "'Product Sans', sans-serif" }}
                        >
                            {registered}
                        </span>
                    </div>
                </div>

                {/* Small About section below main card */}
                {about && (
                    <div className="relative z-10 mx-auto mt-6 max-w-4xl rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-4 sm:mt-8 sm:p-5">
                        <h4
                            className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            About this event
                        </h4>
                        <p
                            className="text-sm sm:text-base text-gray-700 leading-relaxed"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            {about}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
