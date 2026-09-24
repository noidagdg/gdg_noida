"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { tracks as defaultTracks, type Track } from "./data";
import SessionRow from "./session-row";

interface AgendaProps {
  tracks?: Track[];
  title?: string;
}

export default function Agenda({ tracks: propTracks, title = "Agenda" }: AgendaProps) {
  const activeTracks = propTracks ?? defaultTracks;
  const [openTrack, setOpenTrack] = useState<string>(activeTracks[0]?.id || "think");

  if (!activeTracks || activeTracks.length === 0) {
    return null;
  }

  const toggleTrack = (trackId: string) => {
    setOpenTrack((prev) => (prev === trackId ? "" : trackId));
  };

  return (
    <section className="w-full px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10">
      <div className="mx-auto max-w-[1400px] rounded-3xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_4px_rgba(60,64,67,0.1)] sm:p-6 lg:p-8">
        {/* Heading */}
        <h2 className="mb-6 text-center text-2xl font-medium tracking-tight text-[#202124] sm:mb-8 sm:text-3xl md:text-4xl" style={{ fontFamily: "'Product Sans', sans-serif" }}>
          {title}
        </h2>

        {/* Tracks */}
        <div className="space-y-4">
          {activeTracks.map((track) => {
            const isOpen = openTrack === track.id;

            return (
              <div
                key={track.id}
                className="overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-[0_1px_2px_rgba(60,64,67,0.08)]"
              >
                {/* Track Header */}
                <button
                  type="button"
                  onClick={() => toggleTrack(track.id)}
                  className="flex w-full items-center justify-between bg-[#EEF4FF] px-6 py-5 text-left transition-colors hover:bg-[#E8F0FF]"
                >
                  <span className="text-lg font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {track.name}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[5000px]" : "max-h-0"
                  }`}
                >
                  <div className="bg-white">
                    {track.sessions.length > 0 ? (
                      track.sessions.map((session) => (
                        <SessionRow
                          key={session.id}
                          session={session}
                        />
                      ))
                    ) : (
                      <div className="px-6 py-8 text-center text-gray-500 text-sm">
                        Sessions will be announced soon.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
