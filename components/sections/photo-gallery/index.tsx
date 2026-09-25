"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, type Variants } from "motion/react";

interface PhotoGalleryProps {
  readonly className?: string;
}

/**
 * Desktop layout — Figma-faithful absolute percentage positioning.
 * Reference frame: 1315 × 967.73 px.
 *
 *   H-gap = (1315 − (376+240+241+375)) / 3 = 27.67px → 2.10% of W
 *   V-gap = (967.73 − (302+304+304)) / 2  = 28.87px → 2.98% of H
 *
 * `bottomLeft` is 551px wide and starts at column 1, so it deliberately does not
 * align to the column that `bottomMiddle` starts from — which is why this is
 * absolute positioning rather than a grid.
 *
 * `w`/`h` are the asset's intrinsic pixels, used for the mobile aspect ratio so
 * nothing is cropped there.
 */
interface Photo {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** Percentage box within the desktop ratio container. */
  box: { left: string; top: string; width: string; height: string };
  sizes: string;
  delay: number;
}

const photos: Photo[] = [
  {
    src: "/photogallery/topleft376x302.png",
    alt: "Community raising hands at a GDG Noida event",
    w: 376,
    h: 302,
    box: { left: "0%", top: "0%", width: "28.60%", height: "31.21%" },
    sizes: "(min-width: 1024px) 28vw, 45vw",
    delay: 60,
  },
  {
    src: "/photogallery/topmiddle240x303.png",
    alt: "Speaker presenting on stage at DevFest",
    w: 240,
    h: 303,
    box: { left: "30.70%", top: "0%", width: "18.25%", height: "31.31%" },
    sizes: "(min-width: 1024px) 18vw, 45vw",
    delay: 40,
  },
  {
    src: "/photogallery/topmiddle241x303.png",
    alt: "Two developers working together at a laptop",
    w: 241,
    h: 303,
    box: { left: "51.05%", top: "0%", width: "18.33%", height: "31.31%" },
    sizes: "(min-width: 1024px) 18vw, 45vw",
    delay: 40,
  },
  {
    src: "/photogallery/topright375x444.png",
    alt: "GDG Noida anniversary cake surrounded by cupcakes",
    w: 375,
    h: 444,
    box: { left: "71.48%", top: "0%", width: "28.52%", height: "45.88%" },
    sizes: "(min-width: 1024px) 28vw, 45vw",
    delay: 80,
  },
  {
    src: "/photogallery/leftmiddle376x304.png",
    alt: "Large group photo at a GDG Noida event",
    w: 376,
    h: 304,
    box: { left: "0%", top: "34.19%", width: "28.60%", height: "31.41%" },
    sizes: "(min-width: 1024px) 28vw, 45vw",
    delay: 80,
  },
  {
    src: "/photogallery/bottomright375x495.png",
    alt: "Packed hall of attendees with raised hands",
    w: 375,
    h: 495,
    box: { left: "71.48%", top: "48.85%", width: "28.52%", height: "51.15%" },
    sizes: "(min-width: 1024px) 28vw, 45vw",
    delay: 120,
  },
  {
    src: "/photogallery/bottomleft551x304.png",
    alt: "Team smiling at a workshop desk",
    w: 551,
    h: 304,
    box: { left: "0%", top: "68.59%", width: "41.90%", height: "31.41%" },
    sizes: "(min-width: 1024px) 42vw, 45vw",
    delay: 100,
  },
  {
    src: "/photogallery/bottommiddle333x304.png",
    alt: "Audience listening during a talk",
    w: 333,
    h: 304,
    box: { left: "44.00%", top: "68.59%", width: "25.32%", height: "31.41%" },
    sizes: "(min-width: 1024px) 25vw, 45vw",
    delay: 140,
  },
];

// A plain fade-and-rise. The previous version also animated `filter: blur()`,
// which pushes eight full-bleed photos through the filter pipeline every frame.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: delay / 1000, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const textChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const headingStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

function Frame({ photo, className, style }: { photo: Photo; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.figure
      custom={photo.delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-6%" }}
      style={style}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "shadow-[0_2px_16px_rgba(0,0,0,0.09)]",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={photo.sizes}
        className="object-cover"
      />
    </motion.figure>
  );
}

function GalleryHeading({ compact }: { compact?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-5%" }}
      variants={headingStagger}
      className={cn("text-center", compact && "mb-10")}
    >
      <motion.h2
        variants={textChild}
        className={cn(
          "text-zinc-900",
          compact ? "text-3xl md:text-5xl" : "leading-none whitespace-nowrap",
        )}
        style={compact ? undefined : { fontSize: "clamp(2rem, 4.2vw, 3.75rem)" }}
      >
        Photo <span className="font-bold">Gallery</span>
      </motion.h2>
      <motion.p
        variants={textChild}
        className={cn("text-zinc-600", compact ? "mt-4 text-base md:text-lg" : "mt-[0.7em]")}
        style={compact ? undefined : { fontSize: "clamp(0.875rem, 1.1vw, 1.125rem)" }}
      >
        A glimpse into our most memorable moments
      </motion.p>
    </motion.div>
  );
}

export default function PhotoGallery({ className }: PhotoGalleryProps) {
  return (
    <section
      id="gallery"
      className={cn("relative w-full overflow-hidden py-16 md:py-24", className)}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Mobile — two balanced masonry columns. Every photo appears here; the
            old hand-split columns quietly omitted two of them. */}
        <div className="lg:hidden">
          <GalleryHeading compact />
          <div className="columns-2 gap-3">
            {photos.map((photo) => (
              <div key={photo.src} className="mb-3 break-inside-avoid">
                <Frame
                  photo={photo}
                  className="w-full"
                  style={{ aspectRatio: `${photo.w}/${photo.h}` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop — absolute percentage boxes inside a fixed-ratio frame, with
            the heading occupying the empty middle cell. */}
        <div className="relative hidden w-full lg:block" style={{ aspectRatio: "1315 / 967.73" }}>
          {photos.map((photo) => (
            <Frame key={photo.src} photo={photo} className="absolute" style={photo.box} />
          ))}

          {/* Middle cell: columns 2–3 of row 2, the gap the photos leave open. */}
          <div
            className="absolute flex items-center justify-center select-none"
            style={{ left: "30.70%", top: "34.19%", width: "40.78%", height: "31.41%" }}
          >
            <GalleryHeading />
          </div>
        </div>
      </div>
    </section>
  );
}
