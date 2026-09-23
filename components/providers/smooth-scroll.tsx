"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

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
 * Lenis is intentionally configured once here. It smooths wheel/trackpad input
 * while preserving native touch behavior and the reduced-motion preference.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);
    const pathname = usePathname();

    const refreshScrollMeasurements = useCallback(() => {
        lenisRef.current?.lenis?.resize();
        ScrollTrigger.refresh();
    }, []);

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

    // Layouts persist across App Router navigations, while page content changes
    // underneath them. Refresh once after the committed route layout, not from
    // every individual animation component.
    useLayoutEffect(() => {
        const frame = window.requestAnimationFrame(refreshScrollMeasurements);
        return () => window.cancelAnimationFrame(frame);
    }, [pathname, refreshScrollMeasurements]);

    // Font and image decoding can alter scroll distances after the first
    // measurement. These are lifecycle events, not timer-based refreshes.
    useEffect(() => {
        window.addEventListener("load", refreshScrollMeasurements, { once: true });
        void document.fonts?.ready.then(refreshScrollMeasurements);

        return () => window.removeEventListener("load", refreshScrollMeasurements);
    }, [refreshScrollMeasurements]);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                // Preserve the platform's normal scroll behavior for visitors who
                // explicitly request reduced motion. Touch input remains native.
                respectReducedMotion: true,
                lerp: 0.085,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            <ScrollTriggerBridge />
            {children}
        </ReactLenis>
    );
}
