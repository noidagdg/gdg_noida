"use client";

import { useCallback, useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pushes Lenis' virtual scroll position into ScrollTrigger on every scroll frame.
 * Lives inside the provider so it can pick up the root instance once it exists.
 */
function ScrollTriggerBridge() {
    const onScroll = useCallback(() => ScrollTrigger.update(), []);
    useLenis(onScroll);
    return null;
}

/**
 * Site-wide smooth scrolling. Mounted once in the root layout so every route —
 * and anything rendered inside it — can reach the instance via `useLenis()`.
 *
 * Touch scrolling stays native; only wheel/trackpad input is smoothed.
 *
 * `respectReducedMotion: false` is deliberate. Lenis defaults it to true, which
 * drops `lerp` to 1 and makes the page jump straight to the wheel target — a
 * measured 3 rendered positions for a 600px flick, versus 22 when smoothing is
 * on. Windows reports `prefers-reduced-motion: reduce` whenever Accessibility →
 * Visual effects → Animation effects is off, which is common enough that the
 * site was shipping unsmoothed scroll to a large slice of visitors. The trade is
 * real: people who set the preference for vestibular reasons now get eased
 * scrolling anyway. Flip this back to `true` if that matters more.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);

    // Drive Lenis off GSAP's ticker rather than its own rAF loop, so smoothing and
    // scrubbed ScrollTriggers (the hero headline collapse) advance on the same frame.
    useEffect(() => {
        const update = (time: number) => {
            lenisRef.current?.lenis?.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            gsap.ticker.lagSmoothing(500, 33);
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                respectReducedMotion: false,
                // Fraction of the remaining distance covered each frame. Lower is
                // softer; below ~0.06 the page starts to feel like it lags the wheel.
                lerp: 0.085,
                smoothWheel: true,
            }}
        >
            <ScrollTriggerBridge />
            {children}
        </ReactLenis>
    );
}
