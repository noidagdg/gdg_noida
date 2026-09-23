"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { useGsapReveal } from "@/lib/gsap-reveal";

/** How long each set stays on screen before the next one slides in. */
const ROTATE_MS = 10000;


interface EventStat {
  value: string;
  label: string;
}

interface EventCard {
  year: string;
  location: string;
  image: string;
  logo: string;
  stats: EventStat[];
  venue: string;
}

interface EventSet {
  /** Series name — labels the pagination dots and the image alt text. */
  name: string;
  cards: EventCard[];
}

/** Cards are plain white; this is only the stat-number colour, cycled by position. */
const STAT_ACCENTS = ["#1967D2", "#C5221F", "#188038"];

const eventSets: EventSet[] = [
  {
    name: "DevFest",
    cards: [
      {
        year: "2022",
        location: "Noida",
        image: "/assets/events/devfest22bg.png",
        logo: "/assets/events/devfest22logo.png",
        stats: [
          { value: "3,820+", label: "Registrations" },
          { value: "350+", label: "Attendees" },
          { value: "30+", label: "Speakers" },
        ],
        venue: "Radisson Blu, Sector 18, Noida",
      },
      {
        year: "2023",
        location: "Noida",
        image: "/assets/events/devfest23bg.png",
        logo: "/assets/events/devfest23logo.png",
        stats: [
          { value: "4,730+", label: "Registrations" },
          { value: "500+", label: "Attendees" },
          { value: "30+", label: "Speakers" },
        ],
        venue: "Holiday Inn, Mayur Vihar",
      },
      {
        year: "2024",
        location: "Noida",
        image: "/assets/events/devfest24bg.png",
        logo: "/assets/events/devfest24logo.png",
        stats: [
          { value: "5,120+", label: "Registrations" },
          { value: "600+", label: "Attendees" },
          { value: "35+", label: "Speakers" },
        ],
        venue: "Expo Inn, Greater Noida",
      },
    ],
  },
  {
    name: "Design Samvad",
    cards: [
      {
        year: "2023",
        location: "Noida",
        image: "/assets/events/designSamvadbg23.png",
        logo: "/assets/events/designSamvadlogo23.png",
        stats: [
          { value: "50+", label: "Attendees" },
          { value: "7+", label: "Speakers" },
        ],
        venue: "TATA 1MG Office, Noida",
      },
      {
        year: "2024",
        location: "Delhi",
        image: "/assets/events/designSamvad24bg.png",
        logo: "/assets/events/designSamvad24logo.png",
        stats: [
          { value: "150+", label: "Attendees" },
          { value: "8+", label: "Speakers" },
        ],
        venue: "IIIT Delhi Campus, Delhi",
      },
      {
        year: "2025",
        location: "Gurugram",
        image: "/assets/events/designSamvad25bg.png",
        logo: "/assets/events/designSamvad25logo.png",
        stats: [
          { value: "170+", label: "Attendees" },
          { value: "6+", label: "Speakers" },
        ],
        venue: "Google Office, Gurugram",
      },
    ],
  },
  {
    name: "The Data & GenAI Nexus",
    cards: [
      {
        year: "2022",
        location: "Noida",
        image: "/assets/events/dgbg4.svg",
        logo: "/assets/events/dglogo4.svg",
        stats: [
          { value: "291+", label: "Attendees" },
          { value: "5+", label: "Speakers" },
        ],
        venue: "Akasa CoWorking, Noida",
      },
      {
        year: "2023",
        location: "Delhi",
        image: "/assets/events/dgbg5.svg",
        logo: "/assets/events/dglogo5.svg",
        stats: [
          { value: "200+", label: "Attendees" },
          { value: "5+", label: "Speakers" },
        ],
        venue: "EcoSphere, Noida",
      },
      {
        year: "2024",
        location: "Greater Noida",
        image: "/assets/events/dgbg6.svg",
        logo: "/assets/events/dglogo6.svg",
        stats: [
          { value: "170+", label: "Attendees" },
          { value: "5+", label: "Speakers" },
        ],
        venue: "Masters Union, Gurgaon",
      },
    ],
  },
];

function CounterNumber({
  value,
  color,
  run,
}: {
  readonly value: string;
  readonly color: string;
  readonly run: boolean;
}) {
  const [count, setCount] = useState(0);
  const [showPlus, setShowPlus] = useState(false);

  const numericValue = Number.parseInt(value.replaceAll(",", "").replaceAll("+", ""));
  const hasPlus = value.includes("+");

  useEffect(() => {
    // Hold at zero until the section is on screen, so the count-up is something
    // the visitor actually sees rather than something finished before they arrive.
    if (!run) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let currentStep = 0;
    let plusTimer: ReturnType<typeof setTimeout> | undefined;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep));
      } else {
        setCount(numericValue);
        clearInterval(timer);
        if (hasPlus) plusTimer = setTimeout(() => setShowPlus(true), 100);
      }
    }, duration / steps);

    return () => {
      clearInterval(timer);
      if (plusTimer) clearTimeout(plusTimer);
    };
  }, [numericValue, hasPlus, run]);

  return (
    <span className="text-[17px] font-semibold tabular-nums md:text-[19px]" style={{ color }}>
      {count.toLocaleString()}
      {hasPlus && (
        <span className={cn("transition-opacity duration-500", showPlus ? "opacity-100" : "opacity-0")}>
          +
        </span>
      )}
    </span>
  );
}

export default function FlagshipEvents() {
  const sectionRef = useGsapReveal<HTMLElement>();
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { once: false, amount: 0.35 });
  const [currentSet, setCurrentSet] = useState(0);
  const [direction, setDirection] = useState(0);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // Bumped on every resume so the countdown bar replays in step with the timer.
  const [runId, setRunId] = useState(0);

  // Being on screen is the only gate — hovering the cards does not hold it.
  const running = inView && isDesktop;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Hold the carousel until the section is on screen — otherwise a visitor who
  // scrolls down here lands on whichever set the clock happened to reach.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setRunId((n) => n + 1);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  const goTo = useCallback((index: number, newDirection: number) => {
    setDirection(newDirection);
    setCurrentSet(index);
    setRunId((n) => n + 1);
  }, []);

  // A timer rather than requestAnimationFrame: rAF is throttled to zero in a
  // background tab. Re-running on currentSet means a manual pick also restarts
  // the countdown.
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      setDirection(1);
      setCurrentSet((prev) => (prev + 1) % eventSets.length);
    }, ROTATE_MS);
    return () => clearTimeout(id);
  }, [currentSet, running, runId]);

  // The set container only orchestrates: it holds no visual state of its own, so
  // the three cards animate individually instead of the row moving as one slab.
  const setVariants = {
    enter: {},
    center: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
    // Leaving runs right-to-left and quicker than arriving, so the outgoing set
    // clears out before the next one starts building.
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const cardVariants = {
    enter: (dir: number) => ({ opacity: 0, y: 32, scale: 0.94, x: dir === 0 ? 0 : (dir > 0 ? 48 : -48) }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      x: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: -18,
      scale: 0.97,
      x: dir < 0 ? 48 : -48,
      transition: { duration: 0.3, ease: "easeIn" as const },
    }),
  };

  const activeSet = eventSets[currentSet];

  return (
    <section ref={sectionRef} id="events" className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div data-reveal className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl text-zinc-900 md:text-5xl lg:text-6xl">
            Our <span className="font-bold">Flagship Events</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600 md:text-lg">
            Our signature experiences that define excellence
          </p>
        </div>

        {/* Carousel — advances on its own whenever the section is on screen. */}
        <div ref={carouselRef} className="relative lg:overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSet}
              custom={direction}
              variants={setVariants}
              initial="enter"
              animate={carouselInView ? "center" : "enter"}
              exit="exit"
            >
              <div className="block lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-16 xl:gap-24">
                {activeSet.cards.map((event, index) => {
                  const accentDeep = STAT_ACCENTS[index % STAT_ACCENTS.length];
                  // The middle card sits lower, giving the row a deliberate arc.
                  const marginTopClass = index === 1 ? "lg:mt-[90px]" : "lg:mt-[39px]";

                  let zIndexClass = "z-10";
                  if (index === 1) zIndexClass = "z-20";
                  else if (index === 2) zIndexClass = "z-30";

                  return (
                    <motion.div
                      key={event.year}
                      custom={direction}
                      variants={cardVariants}
                      // The lift is a gesture prop, not a CSS hover: the variants
                      // above own `transform`, so a Tailwind translate would be
                      // overwritten the moment a card animates.
                      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                      className={cn(
                        "group relative mx-auto flex transform-gpu flex-col items-center rounded-3xl bg-white lg:mx-0",
                        "w-full max-w-[280px] md:max-w-[320px] lg:max-w-[372px]",
                        "h-[380px] md:h-[430px] lg:h-[493px]",
                        "shadow-[0_2px_10px_-4px_rgba(16,24,40,0.10)]",
                        "after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl",
                        "after:shadow-[0_18px_40px_-16px_rgba(16,24,40,0.30)]",
                        "after:opacity-0 after:transition-opacity after:duration-400 after:ease-out",
                        "lg:hover:after:opacity-100",
                        index === 0 ? "mt-0" : "mt-6 lg:mt-0",
                        marginTopClass,
                        `lg:z-auto ${zIndexClass}`,
                        "static",
                      )}
                    >
                      {/* Event Logo */}
                      <div className="mt-4 mb-3 flex w-full items-center justify-center px-4 md:mt-5 md:mb-3.5 md:px-5 lg:mt-6 lg:mb-4 lg:px-6">
                        <div className="relative h-[45px] w-full md:h-[50px] lg:h-[60px]">
                          <Image
                            src={event.logo}
                            alt={`${activeSet.name} ${event.year} logo`}
                            fill
                            sizes="(min-width: 1024px) 324px, 250px"
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Event Image */}
                      <div className="relative h-[260px] w-[250px] shrink-0 md:h-[295px] md:w-[290px] lg:h-[347px] lg:w-[334px]">
                        <div className="relative h-full w-full overflow-hidden rounded-2xl">
                          <Image
                            src={event.image}
                            alt={`${activeSet.name} ${event.year} at ${event.venue}`}
                            fill
                            sizes="(min-width: 1024px) 334px, 250px"
                            className="object-cover"
                          />
                        </div>

                        {/* Stats. Anchored to the image's right edge: the old
                            `left-[35%]` with `w-fit` let the widest pill spill
                            past the card entirely. */}
                        <div className="absolute right-3 bottom-3 flex flex-col items-end gap-2.5 md:right-4 md:bottom-4 md:gap-3">
                          {event.stats.map((stat) => (
                            <div
                              key={`${event.year}-${stat.label}`}
                              className="flex w-fit max-w-full items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm md:gap-2.5 md:px-4 md:py-2.5"
                            >
                              <CounterNumber
                                key={`${runId}-${currentSet}-${event.year}-${stat.label}`}
                                value={stat.value}
                                color={accentDeep}
                                run={inView}
                              />
                              <span className="text-[13px] whitespace-nowrap text-zinc-700 md:text-sm">
                                {stat.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="mt-auto flex items-center justify-center gap-1.5 px-4 pt-2 pb-4 text-zinc-800 md:gap-2 md:pb-5 lg:pb-6">
                        <MapPin className="h-4 w-4 shrink-0 md:h-[18px] md:w-[18px]" />
                        <span className="text-center text-sm leading-tight font-medium md:text-base">
                          {event.venue}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots with Progress Loader */}
          <div data-reveal className="mt-6 flex justify-center gap-3 lg:mt-16">
            {eventSets.map((set, index) => {
              const isActive = currentSet === index;
              return (
                <button
                  key={set.name}
                  type="button"
                  onClick={() => goTo(index, index > currentSet ? 1 : -1)}
                  aria-label={`Show ${set.name}`}
                  aria-current={isActive}
                  className={cn(
                    "relative h-3 overflow-hidden rounded-full bg-gray-300 transition-all duration-300",
                    "outline-none focus-visible:ring-4 focus-visible:ring-[#4285F4]/35",
                    isActive ? "w-12" : "w-3 hover:bg-gray-400",
                  )}
                >
                  {isActive && (
                    <span
                      key={`${currentSet}-${runId}`}
                      aria-hidden="true"
                      className="absolute inset-0 origin-left bg-gradient-to-r from-[#4285F4] to-[#34A853]"
                      style={{
                        transform: "scaleX(0)",
                        animation: `progress-sweep ${ROTATE_MS}ms linear forwards`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
