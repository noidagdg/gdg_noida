'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GridPulse } from '@/components/ui/grid-pulse';

const FONT_FAMILY = "'Google Sans', 'Product Sans', Roboto, 'Segoe UI', sans-serif";

// The headline literally grows: each line is heavier than the one before.
const LINES = [
  [{ word: 'Think', weight: 'font-extralight', dot: 'bg-[#34A853]' }],
  [
    { word: 'Build', weight: 'font-normal', dot: 'bg-[#4285F4]' },
    { word: 'Grow', weight: 'font-bold', dot: '' },
  ],
];

// Wipe reveal. Negative insets keep ascenders and descenders from being clipped.
const WIPE_END = 'inset(-20% -5% -20% -5%)';

export default function HeroSection({ heroReady = true }: { heroReady?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // One orchestrated moment: the words are wiped in line by line, the supporting
  // text follows, then a cursor starts blinking after "Grow".
  // With reduced motion, the Tailwind motion-reduce classes below show everything
  // immediately, so nothing is animated here.
  useEffect(() => {
    if (!heroReady || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to('[data-line]', { clipPath: WIPE_END, duration: 0.9, stagger: 0.18 })
        .to('[data-fade]', { opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .set('[data-cursor]', { opacity: 1 })
        .to('[data-cursor]', {
          opacity: 0,
          duration: 0.01,
          ease: 'none',
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.6,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [heroReady, reducedMotion]);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{ fontFamily: FONT_FAMILY }}
      className={`relative w-full overflow-hidden bg-background text-foreground ${
        heroReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <GridPulse cell={24} reach={2} ambient={2} maxLit={100} className="opacity-20" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center gap-5 px-5 pb-6 pt-20 md:gap-8 md:px-10 md:pb-8">
        <p
          data-fade
          className="max-w-[26ch] text-sm text-muted-foreground opacity-0 motion-reduce:opacity-100 md:text-base"
        >
          Developer community for Noida, India
        </p>

        <h1 className="text-[length:clamp(2.5rem,min(13vw,22vh),10rem)] leading-[0.86] tracking-tight">
          {LINES.map((words, lineIndex) => (
            <span
              key={lineIndex}
              data-line
              className="block w-fit whitespace-nowrap [clip-path:inset(-20%_100%_-20%_-5%)] motion-reduce:[clip-path:none]"
            >
              {words.map(({ word, weight, dot }, wordIndex) => (
                <React.Fragment key={word}>
                  <span className={`${weight} ${wordIndex > 0 ? 'ml-[0.16em]' : ''}`}>{word}</span>
                  {dot && (
                    <span
                      aria-hidden="true"
                      className={`ml-[0.05em] inline-block size-[0.15em] rounded-full ${dot}`}
                    />
                  )}
                </React.Fragment>
              ))}
              {lineIndex === LINES.length - 1 && (
                <span
                  data-cursor
                  aria-hidden="true"
                  className="ml-[0.05em] inline-block h-[0.7em] w-[0.26em] bg-[#EA4335] opacity-0 motion-reduce:opacity-100"
                />
              )}
            </span>
          ))}
        </h1>

        <div
          data-fade
          className="flex flex-col gap-4 border-t border-border pt-4 opacity-0 motion-reduce:opacity-100 md:flex-row md:items-center md:justify-between md:pt-5"
        >
          <p className="max-w-[36ch] text-sm text-muted-foreground md:text-lg">
            Meet developers in Noida, share what you’re building, and learn together.
          </p>

          <a
            href="https://www.commudle.com/communities/gdg-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border-[3px] border-[#1C293C] bg-[#FBBC04] px-6 py-3 text-base font-bold text-[#1C293C] md:px-8 md:py-4 md:text-lg
              shadow-[6px_6px_0_0_#1C293C] transition-[transform,box-shadow] duration-150 ease-out motion-reduce:transition-none
              hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#4285F4]
              active:translate-x-1.5 active:translate-y-1.5 active:shadow-none
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4285F4]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background
              dark:shadow-[6px_6px_0_0_#F1F3F4] dark:hover:shadow-[8px_8px_0_0_#4285F4]
              md:w-auto"
          >
            Join GDG Noida
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}