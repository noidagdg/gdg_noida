"use client";

import React from "react";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/lib/content";

interface TestimonialsProps {
  className?: string;
}

const BLUE = { accent: "#D2E3FC", accentDeep: "#1967D2" };
const RED = { accent: "#FAD2CF", accentDeep: "#C5221F" };
const GREEN = { accent: "#CEEAD6", accentDeep: "#188038" };
const YELLOW = { accent: "#FEEFC3", accentDeep: "#B06000" };

/**
 * Same Google pastels as the speakers and sponsors sections. Ordered, not cycled:
 * six cards over four hues means repeats are unavoidable, so they are placed to
 * fall in different columns. Masonry fills top-to-bottom in pairs, giving
 * (blue, red) (green, blue) (yellow, green) — no column repeats another, and no
 * hue sits directly above itself. A plain `index % 4` made columns 1 and 3 twins.
 */
const PALETTE = [BLUE, RED, GREEN, BLUE, YELLOW, GREEN];

export default function Testimonials({ className }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className={cn("relative w-full py-16 md:py-24", className)}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <BlurFade delay={0.1} inView>
            <h2 className="mx-auto max-w-4xl text-3xl text-zinc-900 md:text-5xl lg:text-6xl">
              <span className="font-bold">Success Stories</span> that Define Our Community
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              Voices from the developers who grew with us
            </p>
          </BlurFade>
        </div>

        {/* A snap-scrolling strip on phones, CSS masonry from md up. Columns beat a
            hand-assigned grid here: the quotes range from two lines to a full
            paragraph, and masonry packs that variance without ragged column feet. */}
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:block md:columns-2 md:gap-6 md:overflow-visible md:px-0 lg:columns-3">
          {testimonials.map((testimonial, index) => {
            const { accent, accentDeep } = PALETTE[index % PALETTE.length];
            return (
              <BlurFade
                key={testimonial.author.name}
                delay={0.15 + index * 0.06}
                inView
                // Gap between stacked cards is the item's own bottom margin rather
                // than `space-y` on the container: inside CSS columns that would
                // put a stray top margin on whichever card starts a column.
                className="w-[82vw] max-w-sm shrink-0 snap-center
                           md:mb-6 md:w-auto md:max-w-none md:break-inside-avoid"
              >
                <TestimonialCard
                  accent={accent}
                  accentDeep={accentDeep}
                  content={testimonial.content}
                  author={testimonial.author}
                  className="h-full md:h-auto"
                />
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
