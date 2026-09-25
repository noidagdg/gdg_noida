"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GRAIN, GRAIN_SIZE } from "@/lib/grain";

interface TestimonialAuthor {
  name: string;
  title: string;
  imgSrc: string;
}

interface TestimonialCardProps {
  /** Pastel card surface, from the shared Google palette. */
  accent: string;
  /** Saturated counterpart, used for the quote mark and the attribution rule. */
  accentDeep: string;
  content: React.ReactNode;
  author: TestimonialAuthor;
  className?: string;
}

export default function TestimonialCard({
  accent,
  accentDeep,
  content,
  author,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      style={{
        backgroundColor: accent,
        backgroundImage: GRAIN,
        backgroundSize: GRAIN_SIZE,
      }}
      className={cn(
        `group relative flex transform-gpu flex-col rounded-3xl p-6 md:p-7
         shadow-[0_2px_10px_-4px_rgba(16,24,40,0.10)]
         transition-transform duration-400 ease-out hover:-translate-y-1
         after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl
         after:shadow-[0_18px_40px_-16px_rgba(16,24,40,0.30)]
         after:opacity-0 after:transition-opacity after:duration-400 after:ease-out
         hover:after:opacity-100`,
        className
      )}
    >
      <span
        aria-hidden="true"
        className="mb-2 block font-serif text-5xl leading-[0.6] md:text-6xl"
        style={{ color: accentDeep, opacity: 0.35 }}
      >
        &ldquo;
      </span>

      {/* One size across breakpoints. The old scale shrank from 14px to 12px at
          `sm` before growing again, so the copy got smaller on larger phones. */}
      <blockquote className="text-[15px] leading-relaxed text-zinc-700 md:text-base [&>p:last-child]:mb-0">
        {content}
      </blockquote>

      <figcaption
        className="mt-6 flex items-center gap-3 border-t pt-5"
        style={{ borderColor: `${accentDeep}26` }}
      >
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white md:h-12 md:w-12">
          <Image
            src={author.imgSrc}
            alt={author.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900 md:text-base">{author.name}</p>
          <p className="text-xs text-zinc-600 md:text-sm">{author.title}</p>
        </div>
      </figcaption>
    </figure>
  );
}
