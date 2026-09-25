'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

interface LoaderProps {
    onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const [visible, setVisible] = useState(true);
    const lenis = useLenis();
    const loaderRef = useRef<HTMLDivElement>(null);
    const q1Ref = useRef<HTMLDivElement>(null);
    const q2Ref = useRef<HTMLDivElement>(null);
    const q3Ref = useRef<HTMLDivElement>(null);
    const q4Ref = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const logoWrapRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Play loader animation on every load/reload as requested
        
        // Respect reduced motion
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (reducedMotion) {
            gsap.to(loaderRef.current, {
                opacity: 0, duration: 0.3,
                onComplete: () => { setVisible(false); onComplete(); }
            });
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => { setVisible(false); }
            });

            // --- Phase 1: Slam In ---
            tl.to([q1Ref.current, q2Ref.current, q3Ref.current, q4Ref.current], {
                x: 0, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.05,
            });
            // Screen shake
            tl.to(loaderRef.current, {
                keyframes: [
                    { x: -6, y: 4, duration: 0.04 },
                    { x: 6, y: -4, duration: 0.04 },
                    { x: -4, y: 2, duration: 0.04 },
                    { x: 2, y: -2, duration: 0.04 },
                    { x: 0, y: 0, duration: 0.04 },
                ],
            }, '<0.55');
            // Glow flash
            tl.to(glowRef.current, {
                boxShadow: '0 0 120px 80px rgba(255,255,255,0.55)',
                duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1,
            }, '<0.5');

            // --- Phase 2: Logo Reveal ---
            tl.to(logoWrapRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' }, '+=0.1');
            tl.from(logoRef.current, { scale: 0.55, duration: 0.55, ease: 'back.out(2.5)' }, '<');
            tl.to('.tagline-word', {
                y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power3.out',
            }, '<0.15');
            tl.to([q1Ref.current, q2Ref.current, q3Ref.current, q4Ref.current], {
                filter: 'brightness(1.35)', duration: 0.15, stagger: 0.08, yoyo: true, repeat: 1,
            }, '<0.3');

            // --- Phase 3: Logo Exit ---
            tl.to(logoRef.current, { scale: 1.5, opacity: 0, duration: 0.3, ease: 'power2.in' }, '+=0.15');
            tl.to('.tagline-word', {
                y: -12, opacity: 0, stagger: 0.05, duration: 0.2, ease: 'power2.in',
            }, '<');

            // --- Phase 4: Explosion Exit ---
            tl.to(q1Ref.current, { x: '-100%', y: '-100%', duration: 0.55, ease: 'expo.in' }, '+=0.05');
            tl.to(q2Ref.current, { x: '100%', y: '-100%', duration: 0.55, ease: 'expo.in' }, '<');
            tl.to(q3Ref.current, { x: '-100%', y: '100%', duration: 0.55, ease: 'expo.in' }, '<');
            tl.to(q4Ref.current, { x: '100%', y: '100%', duration: 0.55, ease: 'expo.in' }, '<');
            tl.to(loaderRef.current, { backgroundColor: 'transparent', duration: 0.55, ease: 'expo.in' }, '<');
            tl.add(() => onComplete(), '<'); // Trigger hero ready as explosion starts

        }, loaderRef);

        return () => ctx.revert();
    }, [onComplete]);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            // `overflow: hidden` only blocks user-driven scrolling; Lenis scrolls
            // programmatically, so it has to be paused explicitly.
            lenis?.stop();
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            lenis?.start();
        };
    }, [visible, lenis]);

    if (!visible) return null;

    return (
        <div ref={loaderRef} className="loader-wrap">
            <div ref={q1Ref} className="quad quad-1" />
            <div ref={q2Ref} className="quad quad-2" />
            <div ref={q3Ref} className="quad quad-3" />
            <div ref={q4Ref} className="quad quad-4" />
            <div ref={glowRef} className="loader-glow" />
            <div ref={logoWrapRef} className="loader-logo-wrap">
                <Image
                    ref={logoRef}
                    src="/assets/gdg_logo.svg"
                    alt="GDG Noida"
                    width={200}
                    height={200}
                    className="h-auto w-auto max-w-[min(50vw,200px)]"
                    priority
                    unoptimized
                />
                <p>
                    <span className="tagline-word">Think.</span>
                    <span className="tagline-word">Build.</span>
                    <span className="tagline-word">Grow.</span>
                </p>
            </div>
        </div>
    );
}
