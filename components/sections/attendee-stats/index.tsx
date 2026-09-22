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
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div
                className="max-w-6xl mx-auto px-6 py-10 sm:px-10 sm:py-12 relative overflow-hidden rounded-2xl"
                style={{
                    background: "linear-gradient(135deg, #e8f4fb 0%, #dceefb 100%)",
                    border: "2px dashed #93c5e8",
                }}
            >
                {/* Header */}
                <div className="relative text-center mb-8 z-10">
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-1"
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
                <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
                    {/* Speakers Column */}
                    <div className="bg-white/90 backdrop-blur-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-xs border border-white/80 flex flex-col items-center justify-center">
                        <span
                            className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Speakers
                        </span>
                        <span
                            className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#4285F4]"
                            style={{ fontFamily: "'Product Sans', sans-serif" }}
                        >
                            {speakers}
                        </span>
                    </div>

                    {/* Attendees Column */}
                    <div className="bg-white/90 backdrop-blur-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-xs border border-white/80 flex flex-col items-center justify-center">
                        <span
                            className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Attendees
                        </span>
                        <span
                            className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#34A853]"
                            style={{ fontFamily: "'Product Sans', sans-serif" }}
                        >
                            {attendees}
                        </span>
                    </div>

                    {/* Registered Column */}
                    <div className="bg-white/90 backdrop-blur-xs rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-xs border border-white/80 flex flex-col items-center justify-center">
                        <span
                            className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Registered
                        </span>
                        <span
                            className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#FBBC05]"
                            style={{ fontFamily: "'Product Sans', sans-serif" }}
                        >
                            {registered}
                        </span>
                    </div>
                </div>

                {/* Small About section below main card */}
                {about && (
                    <div className="relative z-10 mt-8 max-w-4xl mx-auto bg-white/80 backdrop-blur-xs rounded-xl p-5 border border-white/70 shadow-xs">
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
