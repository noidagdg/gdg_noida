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
  /**
   * When true the animation fires once and stays — elements never reverse back
   * to hidden. Use this for footers or any element that should remain visible
   * after the first reveal regardless of scroll direction.
   */
  once?: boolean;
}

/**
 * Staggered scroll reveal for every `[data-reveal]` element inside the returned ref.
 *
 * By default `toggleActions: "play none none reverse"` runs the reveal on the
 * way down and rewinds it on the way back up. Pass `once: true` to fire once
 * and stay visible — ideal for footers.
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
  once = false,
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
            toggleActions: once ? "play none none none" : "play none none reverse",
            once,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [y, duration, stagger, start, once]);

  return ref;
}
