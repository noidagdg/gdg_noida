"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    image: "/assets/upcomingEvents/leftCardUpEvent.svg",
    link: "https://www.commudle.com/communities/gdg-noida/events/devfest-noida-2025",
    backgroundColor: "#E9F9EE",
  },
  {
    id: "2",
    title: "HackSpace Noida",
    subtitle: "Easier-to-implement motion system for more customizable transitions powered by tokens",
    image: "/assets/upcomingEvents/rightCardUpEvent.svg",
    link: "https://www.commudle.com/communities/gdg-cloud-noida/hackathons/google-hackspace",
    backgroundColor: "#FFF7E0",
  },
];

export default function UpcomingEvents () {
  return (
    <section className="py-8 px-2 md:px-4 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-black">
            Upcoming <span className="font-bold">Events</span>
          </h2>
          <p className="text-base md:text-2xl text-gray-600 mt-3">
            Exciting experiences on the horizon
          </p>
        </div>

        {/* Cards Container with 48px gap from title */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mt-12">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="relative w-full max-w-[650px] h-[443px] rounded-[20px] overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section - 650x298 */}
              <div className="relative w-full h-[298px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section - Remaining height (443 - 298 = 145px) */}
              <div className="absolute bottom-0 left-0 right-0 h-[145px] flex items-center justify-between px-6 py-4" style={{ backgroundColor: event.backgroundColor }}>
                {/* Text Content - Left Aligned */}
                <div className="flex-1 pr-6 max-w-[520px]">
                  <h3 className="text-2xl font-semibold text-black leading-tight mb-1">
                    {event.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-tight line-clamp-2">
                    {event.subtitle}
                  </p>
                </div>

                {/* Circular Arrow Button - Right Side, Vertically Centered */}
                <button
                  onClick={() => globalThis.location.href = event.link}
                  className="shrink-0 w-[40px] h-[40px] rounded-full bg-[#4285F4] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                  aria-label={`View ${event.title}`}
                >
                  <ArrowRight className="text-white" style={{ width: "18px", height: "18px" }} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

