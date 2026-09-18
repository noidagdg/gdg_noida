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
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="mb-10 text-center text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-black" style={{ fontFamily: "'Product Sans', sans-serif" }}>
          {title}
        </h2>

        {/* Tracks */}
        <div className="space-y-4">
          {activeTracks.map((track) => {
            const isOpen = openTrack === track.id || activeTracks.length === 1;

            return (
              <div
                key={track.id}
                className="overflow-hidden rounded-xl border border-[#E5E7EB]"
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

                  {activeTracks.length > 1 && (
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
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