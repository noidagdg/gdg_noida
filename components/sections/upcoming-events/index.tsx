"use client";

import Link from "next/link";
import { ArrowRight, MapPin , Calendar} from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import EventCoverImage from "@/app/events/event-cover-image";
import { allEvents, type EventItem } from "@/lib/data/gdg-noida-events";
import { motion, AnimatePresence } from "framer-motion";
import { useGsapReveal } from "@/lib/gsap-reveal";
import { cn } from "@/lib/utils";

const getEventTimestamp = (event: EventItem) => {
  const timestamp = Date.parse(event.dates?.isoDate || "");
  return Number.isNaN(timestamp) ? Date.UTC(event.year, 0, 1) : timestamp;
};

const newestFirst = (events: EventItem[]) =>
  [...events].sort((first, second) => getEventTimestamp(second) - getEventTimestamp(first));

const upcomingEvents = newestFirst(
  allEvents.filter((event) => event.status?.toLowerCase() === "upcoming"),
).slice(0, 3); // Show up to 3 upcoming events

const completedEvents = newestFirst(
  allEvents.filter((event) => event.status?.toLowerCase() === "completed"),
).slice(0, 3); // Show up to 3 completed events

const showUpcomingEvents = upcomingEvents.length > 0;
const displayedEvents = showUpcomingEvents ? upcomingEvents : completedEvents;

const cardBackgrounds: Record<string, string> = {
  "devfest-noida-2026": "#E9F9EE",
  "design-samvaad-2026": "#FFF7E0",
  "agentic-premiere-league": "#F0F9FF",
  "data-and-ai-nexus-7-0": "#FFF0F6",
  "women-s-day-2026-break-the-pattern": "#F9F3FF",
  "found-and-fixed-search-and-observability": "#F0FDF4",
};

const cardDescriptions: Record<string, string> = {
  "devfest-noida-2026": "Join developers for inspiring talks, hands-on workshops, and meaningful community connections at DevFest Noida 2026.",
  "design-samvaad-2026": "Join product designers, students, and makers for fresh ideas, practical learning, and thoughtful design conversations.",
  "agentic-premiere-league": "Explore the frontier of AI agents and autonomous systems in this cutting-edge competition.",
  "data-and-ai-nexus-7-0": "Dive deep into the world of data engineering, AI infrastructure, and scalable machine learning systems.",
  "women-s-day-2026-break-the-pattern": "Celebrating women in tech with inspiring talks, workshops, and networking opportunities.",
  "found-and-fixed-search-and-observability": "Learn about modern observability, debugging, and system reliability practices.",
};

export default function UpcomingEvents() {
  const sectionRef = useGsapReveal();

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
      animate: { y: [0, -4, 0] }, // Gentle float animation
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
  };

  return (
    <section ref={sectionRef} id="upcoming-events" className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div data-reveal className="mb-12 text-center md:mb-16">
          <BlurFade delay={0.1} inView>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl text-zinc-900 md:text-5xl lg:text-6xl"
            >
              {showUpcomingEvents ? "Upcoming" : "Recent"} <span className="font-bold">Events</span>
            </motion.h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-base text-zinc-600 md:text-lg"
            >
              {showUpcomingEvents
                ? "Exciting experiences on the horizon"
                : "A look at our latest community experiences"}
            </motion.p>
          </BlurFade>
        </div>

        {/* Event Cards */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={[
              "mx-auto px-4 grid max-w-[1400px] gap-6 md:gap-8 lg:gap-10",
              displayedEvents.length === 1 ? "md:grid-cols-1" :
                       displayedEvents.length === 2 ? "md:grid-cols-2" :
                       "md:grid-cols-2 lg:grid-cols-3",
            ].join(" ")}
          >
            {displayedEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={cardVariants.hidden}
                animate={cardVariants.visible}
                whileHover={cardVariants.hover}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={[
                  "group",
                  displayedEvents.length === 1 ? "mx-auto max-w-[480px]" : "",
                ].join(" ")}
                data-reveal
              >
                {/* The whole card is the link */}
                <Link
                  href={`/events/${event.id}`}
                  className="flex h-full w-full flex-col  rounded-2xl bg-white/90 backdrop-blur-sm shadow-[0_4px_6px_-1px_rgba(16,24,40,0.08),0_2px_4px_-2px_rgba(16,24,40,0.03)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_25px_-5px_rgba(16,24,40,0.15),0_8px_10px_-6px_rgba(16,24,40,0.05)] group-hover:-translate-y-1 border border-white/20"
                  style={{
                    backgroundColor: cardBackgrounds[event.id] || "rgba(248, 249, 250, 0.3)",
                  }}
                >
                  {/* Event Cover Image */}
                  <div className="relative m-3 aspect-[16/9] overflow-hidden rounded-xl">
                    <EventCoverImage
                      src={event.branding?.coverImage || ""}
                      alt={event.title}
                      className="object-cover w-full h-full"
                      sizes="(min-width: 1024px) 480px, (min-width: 768px) 60vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex flex-1 flex-col p-5 space-y-3">
                    <h3
                      className="text-lg font-semibold text-zinc-900 md:text-xl line-clamp-2 group-hover:text-[#4285F4] transition-colors duration-300"
                    >
                      {event.title}
                    </h3>

                    {event.dates?.displayDate && (
                      <p className="flex items-center gap-2 text-xs font-medium text-zinc-500 md:text-sm">
                        <Calendar className="h-4 w-4 text-blue-500 bg-blue" />
                        <span className="mt-1">{event.dates.displayDate}</span>
                      </p>
                    )}

                    {/* Location */}
                    {event.venue?.name && (
                      <p className="flex items-center gap-1 text-xs font-medium text-zinc-500 md:text-sm">
                        <MapPin className="h-4 w-4 text-red-500 " />
                        <span className="mt-1">{event.venue.name}</span>
                      </p>
                    )}

                    {/* Event Stats/Badges
                    <div className="flex flex-wrap gap-2 mb-2">
                      {event.uniqueStats && Object.keys(event.uniqueStats).map((key, index) => (
                        <span
                          key={`${event.id}-${index}`}
                          className={cn(
                            "px-2.5 py-0.5 text-xs font-medium rounded-full",
                            event.uniqueStats[key] !== "--" && event.uniqueStats[key] !== ""
                              ? "bg-blue-50 text-blue-600 border border-blue-200"
                              : "bg-zinc-50 text-zinc-500 border border-zinc-200"
                          )}
                        >
                          {key === "speakers" && event.uniqueStats.speakers !== "--" ?
                            `🎤 ${event.uniqueStats.speakers}` : ""}
                          {key === "attendees" && event.uniqueStats.attendees !== "--" ?
                            `👥 ${event.uniqueStats.attendees}` : ""}
                          {key === "registered" && event.uniqueStats.registered !== "--" ?
                            `🎫 ${event.uniqueStats.registered}` : ""}
                        </span>
                      ))}
                    </div> */}

                    <p className="flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                      {cardDescriptions[event.id] || event.subtitle || event.about?.description}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-auto pt-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300",
                          "hover:bg-black hover:text-white hover:shadow-lg",
                          "active:bg-[#4285F4] active:border-2 active:border-black"
                        )}
                      >
                        Know More
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}