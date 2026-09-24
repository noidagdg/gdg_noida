"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import EventCoverImage from "@/app/events/event-cover-image";
import { eventsByYear } from "@/lib/data/gdg-noida-events";

const upcomingEventIds = ["devfest-noida-2026", "design-samvaad-2026"];
const upcomingEvents = eventsByYear[2026].filter((event) => upcomingEventIds.includes(event.id));
const cardBackgrounds: Record<string, string> = {
  "devfest-noida-2026": "#E9F9EE",
  "design-samvaad-2026": "#FFF7E0",
};
const cardDescriptions: Record<string, string> = {
  "devfest-noida-2026": "Join developers for inspiring talks, hands-on workshops, and meaningful community connections at DevFest Noida 2026.",
  "design-samvaad-2026": "Join product designers, students, and makers for fresh ideas, practical learning, and thoughtful design conversations.",
};

export default function UpcomingEvents() {
  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl text-zinc-900 md:text-5xl lg:text-6xl">
              Upcoming <span className="font-bold">Events</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              Exciting experiences on the horizon
            </p>
          </BlurFade>
        </div>

        {/* Event Cards */}
        <div className="mx-auto grid max-w-[1360px] gap-8 md:grid-cols-2 lg:gap-10">
          {upcomingEvents.map((event, idx) => (
            <BlurFade key={event.id} delay={0.3 + idx * 0.1} inView className="h-full">
              {/* The pastel is the card surface; the whole card is the link */}
              <Link
                href={`/events/${event.id}`}
                style={{ backgroundColor: cardBackgrounds[event.id] || "#F8F9FA" }}
                className="group relative flex h-full transform-gpu flex-col rounded-3xl p-3 outline-none shadow-[0_2px_10px_-4px_rgba(16,24,40,0.10)] transition-transform duration-400 ease-out hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[#4285F4]/35 after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:shadow-[0_18px_40px_-16px_rgba(16,24,40,0.30)] after:opacity-0 after:transition-opacity after:duration-400 after:ease-out hover:after:opacity-100"
              >
                {/* Artwork, inset like a framed poster. Radius = card radius minus padding. */}
                <div className="relative aspect-[650/298] w-full overflow-hidden rounded-xl bg-white shadow-[0_4px_14px_-6px_rgba(16,24,40,0.35)]">
                  <EventCoverImage
                    src={event.branding?.coverImage || ""}
                    alt={event.title}
                    className="object-contain"
                    sizes="(min-width: 1024px) 650px, (min-width: 768px) 50vw, 100vw"
                    blurredBackdrop
                  />
                </div>

                <div className="flex flex-1 flex-col px-2 pt-5 pb-2 md:px-3">
                  <h3 className="text-lg leading-tight font-semibold text-zinc-900 md:text-xl">
                    {event.title}
                  </h3>
                  {event.dates?.displayDate && (
                    <p className="mt-2 text-xs font-medium text-zinc-700 md:text-sm">
                      {event.dates.displayDate}
                    </p>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 md:text-sm">
                    {cardDescriptions[event.id] || event.subtitle || event.about?.description}
                  </p>

                  {/* mt-auto keeps the CTA on the baseline even if titles wrap differently */}
                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 group-hover:bg-[#174ea6] group-focus-visible:bg-[#174ea6]">
                      Know More
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
