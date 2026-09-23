"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
  /** Distance in px the elements travel up into place. */
  y?: number;
  duration?: number;
  /** Gap between each element in the group. */
  stagger?: number;
  /** ScrollTrigger `start` string. */
  start?: string;
}

/**
 * Staggered scroll reveal for every `[data-reveal]` element inside the returned ref.
 *
 * `toggleActions: "play none none reverse"` runs the reveal on the way down and
 * rewinds it on the way back up, so scrolling away and returning replays the
 * animation rather than firing only once.
 *
 * Targets start hidden via the global `[data-reveal]` rule in globals.css, which
 * avoids a flash of un-animated content between paint and this effect running.
 * Only add `data-reveal` inside a subtree that actually calls this hook.
 */
export function useGsapReveal<T extends HTMLElement>({
  y = 28,
  duration = 0.8,
  stagger = 0.08,
  start = "top 75%",
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [y, duration, stagger, start]);

  return ref;
}
