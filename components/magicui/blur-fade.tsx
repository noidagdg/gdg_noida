"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

/**
 * Scroll reveal driven by GSAP + ScrollTrigger.
 *
 * `toggleActions: "play none none reverse"` rewinds the reveal when it scrolls
 * back out of view, so returning to a section replays it instead of it firing
 * once for the lifetime of the page.
 */
export default function BlurFade({
  children,
  className,
  duration = 0.6,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-120px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The old framer prop shrank the viewport by this margin; express the same
    // idea as a ScrollTrigger start offset.
    const margin = parseFloat(inViewMargin) || 0;
    const start = `top bottom${margin <= 0 ? "-=" : "+="}${Math.abs(margin)}`;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: yOffset, opacity: 0, filter: `blur(${blur})` },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          delay: 0.04 + delay,
          ease: "power2.out",
          scrollTrigger: inView
            ? { trigger: el, start, toggleActions: "play reverse play reverse" }
            : undefined,
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [duration, delay, yOffset, inView, inViewMargin, blur]);

  // Hidden up front so there is no flash before the effect runs; GSAP owns it
  // from mount onward. React will not rewrite this on re-render because the
  // JSX value never changes.
  return (
    <div ref={ref} className={cn(className)} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
