"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/lib/content";

// ─── Props ──────────────────────────────────────────────────────────────────

interface MomentsGalleryProps {
  eventName: string;
  images?: GalleryImage[];
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function MomentsGallery({
  eventName,
  images = [],
}: MomentsGalleryProps) {
  const visibleImages = images.slice(0, 8);

  if (images.length === 0) return null;

  return (
    // Transparent so the page background (#f3f5f9) shows through; the card below is the only surface.
    <section className="w-full overflow-hidden bg-transparent px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10">
      {/* Same surface as the hero and sponsors cards: white, #d6dbe4 border, flat (no shadow) */}
      <div className="mx-auto w-full max-w-[1400px] rounded-[1.75rem] border border-[#d6dbe4] bg-white p-4 sm:rounded-[2.25rem] sm:p-8">
        {/* ── Heading ──────────────────────────────────────────────── */}
        <h2
          className="mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#14181f]"
          style={{ fontFamily: "'Product Sans', 'Inter', sans-serif" }}
        >
          <span className="font-normal">Moments from </span>{" "}
          <span className="font-bold">{eventName}</span>
        </h2>

        {/* ── Responsive eight-item grid ───────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {visibleImages.map((image) => (
              <motion.div
                layoutId={`gallery-img-${image.id}`}
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#d6dbe4] bg-[#eef1f6] transition-shadow duration-300 hover:shadow-[0_12px_28px_-14px_rgba(20,24,31,0.35)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}