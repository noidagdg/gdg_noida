"use client";

import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, DoughnutController } from "chart.js";

Chart.register(ArcElement, Tooltip, DoughnutController);

// ---------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------
export interface AttendeeDistribution {
    label: string;
    percentage: number;
    color?: string;
}

export interface AttendeeStatsData {
    heading: string;
    description: string;
    total: number;
    distribution: AttendeeDistribution[];
}

// ---------------------------------------------------------------------------
// Static data — replace with an API call when ready:
//
//   const data = await fetch('/api/events/2023/attendees').then(r => r.json())
//   <AttendeeStats data={data} />
// ---------------------------------------------------------------------------
export const defaultAttendeeStatsData: AttendeeStatsData = {
    heading: "Who attended DevFest 2023",
    description:
        "A strong student-driven community with growing professional participation",
    total: 33_482,
    distribution: [
        { label: "Students",      percentage: 68 },
        { label: "Professionals", percentage: 32 },
    ],
};

interface AttendeeStatsProps {
    /** Pass an API-fetched object here; falls back to bundled static data. */
    data?: AttendeeStatsData;
}

const COLORS: Record<string, string> = {
    Students: "#4285F4",
    Professionals: "#34A853",
};

const FALLBACK_COLORS = ["#4285F4", "#34A853", "#FBBC05", "#EA4335"];

/* Tiny SVG person silhouette used as background watermark */
const PersonSVG = () => (
    <svg
        viewBox="0 0 24 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-8 opacity-[0.12]"
    >
        <circle cx="12" cy="7" r="5" fill="#4285F4" />
        <path
            d="M2 34c0-5.523 4.477-10 10-10s10 4.477 10 10"
            stroke="#4285F4"
            strokeWidth="2.5"
            fill="none"
        />
    </svg>
);

export default function AttendeeStats({
    data = defaultAttendeeStatsData,
}: AttendeeStatsProps) {
    const { heading, description, total, distribution } = data;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current || distribution.length === 0) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const colors = distribution.map(
            (d, i) => d.color ?? COLORS[d.label] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length],
        );

        chartRef.current = new Chart(canvasRef.current, {
            type: "doughnut",
            data: {
                labels: distribution.map((d) => d.label),
                datasets: [
                    {
                        data: distribution.map((d) => d.percentage),
                        backgroundColor: colors,
                        borderWidth: 0,
                        hoverOffset: 6,
                    },
                ],
            },
            options: {
                cutout: "70%",
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`,
                        },
                    },
                },
                animation: {
                    animateRotate: true,
                    duration: 900,
                },
            },
        });

        return () => {
            chartRef.current?.destroy();
        };
    }, [distribution]);

    const totalFormatted = total.toLocaleString();

    // Map labels to their color and icon for floating labels
    const studentEntry = distribution[0];
    const professionalEntry = distribution[1];

    return (
        <section className="w-full bg-white py-20">
            <div
                className="w-full px-6 py-10 sm:px-10 sm:py-14 relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #e8f4fb 0%, #dceefb 100%)",
                    border: "2px dashed #93c5e8",
                }}
            >
                {/* Background person silhouettes */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                >
                    {/* Grid of silhouettes */}
                    {Array.from({ length: 48 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${(i % 12) * 8.5}%`,
                                top: `${Math.floor(i / 12) * 27}%`,
                            }}
                        >
                            <PersonSVG />
                        </div>
                    ))}
                </div>

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
                    <p
                        className="text-sm sm:text-base text-gray-500"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        {description}
                    </p>
                </div>

                {/* Chart area with floating labels */}
                <div className="relative flex items-center justify-center z-10">
                    {distribution.length === 0 ? (
                        <div className="flex h-[240px] w-[240px] items-center justify-center rounded-full border-[18px] border-[#4285F4]/20 sm:h-[280px] sm:w-[280px]">
                            <div className="flex h-[190px] w-[190px] flex-col items-center justify-center rounded-full border-2 border-[#4285F4]/40 bg-white/70 sm:h-[220px] sm:w-[220px]">
                                <span
                                    className="text-2xl font-bold leading-tight text-gray-800 sm:text-3xl"
                                    style={{ fontFamily: "'Product Sans', sans-serif" }}
                                >
                                    {totalFormatted}
                                </span>
                                <span
                                    className="mt-1 text-xs text-gray-500 sm:text-sm"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Total Attendees
                                </span>
                            </div>
                        </div>
                    ) : (
                        /* Outer wrapper — positions floating labels relative to chart */
                        <div className="relative h-[240px] w-[240px] sm:h-[280px] sm:w-[280px]">
                            <canvas ref={canvasRef} />

                            {/* Centre label */}
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span
                                    className="text-xl font-bold leading-tight text-gray-800 sm:text-2xl"
                                    style={{ fontFamily: "'Product Sans', sans-serif" }}
                                >
                                    {totalFormatted}
                                </span>
                                <span
                                    className="mt-0.5 text-xs text-gray-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Total Attendees
                                </span>
                            </div>

                            {/* 68% Students — top-right floating label */}
                            {studentEntry && (
                                <div
                                    className="absolute flex flex-col items-start"
                                    style={{ top: "4%", right: "-44%" }}
                                >
                                    <span
                                        className="text-2xl font-bold leading-none sm:text-3xl"
                                        style={{
                                            color: studentEntry.color ?? COLORS[studentEntry.label] ?? FALLBACK_COLORS[0],
                                            fontFamily: "'Product Sans', sans-serif",
                                        }}
                                    >
                                        {studentEntry.percentage}%
                                    </span>
                                    <span
                                        className="mt-0.5 text-xs text-gray-600 sm:text-sm"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {studentEntry.label}
                                    </span>
                                </div>
                            )}

                            {/* 32% Professionals — bottom-left floating label */}
                            {professionalEntry && (
                                <div
                                    className="absolute flex flex-col items-start"
                                    style={{ bottom: "6%", left: "-44%" }}
                                >
                                    <span
                                        className="text-2xl font-bold leading-none sm:text-3xl"
                                        style={{
                                            color: professionalEntry.color ?? COLORS[professionalEntry.label] ?? FALLBACK_COLORS[1],
                                            fontFamily: "'Product Sans', sans-serif",
                                        }}
                                    >
                                        {professionalEntry.percentage}%
                                    </span>
                                    <span
                                        className="mt-0.5 text-xs text-gray-600 sm:text-sm"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {professionalEntry.label}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
