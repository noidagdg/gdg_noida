"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Track } from "./data";
import SessionRow from "./session-row";

export default function Agenda({ heading = "Agenda", tracks }: { heading?: string; tracks: Track[] }) {
  const [openTrack, setOpenTrack] = useState<string>("think");

  const toggleTrack = (trackId: string) => {
    setOpenTrack((prev) => (prev === trackId ? "" : trackId));
  };

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="mb-10 text-center text-4xl font-medium tracking-tight text-black md:text-5xl lg:text-6xl">
          {heading}
        </h2>

        {/* Tracks */}
        <div className="space-y-4">
          {tracks.map((track) => {
            const isOpen = openTrack === track.id;

            return (
              <div
                key={track.id}
                className="overflow-hidden rounded-xl border border-[#E5E7EB] border-l-4"
                style={{ borderLeftColor: track.color }}
              >
                {/* Track Header */}
                <button
                  onClick={() => toggleTrack(track.id)}
                  className="flex w-full items-center justify-between bg-[#EEF4FF] px-6 py-5 text-left transition-colors hover:bg-[#E8F0FF]"
                >
                  <span className="text-lg font-medium text-black">
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
                      <div className="px-6 py-8 text-center text-gray-500">
                        Agenda will be added soon.
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