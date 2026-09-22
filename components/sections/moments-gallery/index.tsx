"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryCategory, GalleryCategoryId, GalleryImage } from "@/lib/content";

// ─── Props ──────────────────────────────────────────────────────────────────

interface MomentsGalleryProps {
  categories?: GalleryCategory[];
  images?: GalleryImage[];
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function MomentsGallery({
  categories = [],
  images = [],
}: MomentsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>("all");

  const visibleImages = useMemo(() => {
    const galleryImages = images.slice(0, 8);
    if (activeCategory === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  if (images.length === 0) return null;

  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-10 py-16 md:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* ── Heading ──────────────────────────────────────────────── */}
        <h2
          className="mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black"
          style={{ fontFamily: "'Product Sans', sans-serif" }}
        >
          <span className="font-bold">Moments</span> <span className="font-normal">from DevFest</span>
        </h2>

        {/* ── Filter Tabs ──────────────────────────────────────────── */}
        <div className="mb-10 flex justify-center">
          <div
            className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar px-1 py-1"
            aria-label="Gallery category filter"
          >
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={[
                    "shrink-0 px-5 sm:px-6 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2",
                    isActive
                      ? "bg-[#4285F4] text-white shadow-md"
                      : "bg-[#F0F0F1] text-[#4B5563] hover:bg-[#E5E5E6]",
                  ].join(" ")}
                  style={{ fontFamily: "'Product Sans', sans-serif" }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

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
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
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
