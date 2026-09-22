"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

interface UpcomingEvent {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  backgroundColor: string;
}
const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    title: "DevFest Noida 2025",
    subtitle: "Quickly create design mockups and prototypes with the latest Material 3, expressive components and styles",
    image: "/assets/upcomingEvents/devfest-noida-2025.jpg",
    link: "https://www.commudle.com/communities/gdg-noida/events/devfest-noida-2025",
    backgroundColor: "#E9F9EE",
  },
  {
    id: "2",
    title: "HackSpace Noida",
    subtitle: "Easier-to-implement motion system for more customizable transitions powered by tokens",
    image: "/assets/upcomingEvents/hackspace-noida.jpg",
    link: "https://www.commudle.com/communities/gdg-cloud-noida/hackathons/google-hackspace",
    backgroundColor: "#FFF7E0",
  },
];

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
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: event.backgroundColor }}
                className="group relative flex h-full transform-gpu flex-col rounded-3xl p-3 outline-none shadow-[0_2px_10px_-4px_rgba(16,24,40,0.10)] transition-transform duration-400 ease-out hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[#4285F4]/35 after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:shadow-[0_18px_40px_-16px_rgba(16,24,40,0.30)] after:opacity-0 after:transition-opacity after:duration-400 after:ease-out hover:after:opacity-100"
              >
                {/* Artwork, inset like a framed poster. Radius = card radius minus padding. */}
                <div className="relative aspect-[650/298] w-full overflow-hidden rounded-xl shadow-[0_4px_14px_-6px_rgba(16,24,40,0.35)]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 650px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col px-2 pt-5 pb-2 md:px-3">
                  <h3 className="text-xl leading-tight font-semibold text-zinc-900 md:text-2xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-snug text-zinc-600 md:text-base">
                    {event.subtitle}
                  </p>

                  {/* mt-auto keeps the CTA on the baseline even if titles wrap differently */}
                  <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-zinc-900">
                    Know More
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </a>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
