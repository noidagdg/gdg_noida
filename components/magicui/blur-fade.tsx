"use client";

import { useLayoutEffect, useRef } from "react";
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
}

/**
 * Scroll reveal driven by GSAP + ScrollTrigger.
 *
 * This is intentionally a one-time transform/opacity reveal. It avoids filter
 * animation and repeat work while someone scrolls back and forth through a page.
 */
export default function BlurFade({
  children,
  className,
  duration = 0.6,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-120px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The old framer prop shrank the viewport by this margin; express the same
    // idea as a ScrollTrigger start offset.
    const margin = parseFloat(inViewMargin) || 0;
    const start = `top bottom${margin <= 0 ? "-=" : "+="}${Math.abs(margin)}`;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { clearProps: "opacity,transform,filter" });
        return;
      }

      gsap.fromTo(
        el,
        { y: yOffset, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay: 0.04 + delay,
          ease: "power2.out",
          scrollTrigger: inView
            ? { trigger: el, start, toggleActions: "play none none none", once: true }
            : undefined,
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [duration, delay, yOffset, inView, inViewMargin]);

  // Hidden up front so there is no flash before the effect runs; GSAP owns it
  // from mount onward. React will not rewrite this on re-render because the
  // JSX value never changes.
  return (
    <div ref={ref} className={cn(className)} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
