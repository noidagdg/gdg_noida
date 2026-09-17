"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryCategory, GalleryCategoryId, GalleryImage } from "@/lib/content";

// ─── Props ──────────────────────────────────────────────────────────────────

interface MomentsGalleryProps {
  categories?: GalleryCategory[];
  images?: GalleryImage[];
  heading?: string;
}

// ─── Constants & Sequences ──────────────────────────────────────────────────

// Desktop (≥1024px)
const DESKTOP_ASPECT_RATIOS = {
  L: 300 / 630,
  M: 300 / 270,
  S: 300 / 170,
};

const DESKTOP_SEQUENCES = [
  ["L", "M", "M", "S"], // Col 1
  ["S", "L", "M", "M"], // Col 2
  ["M", "S", "L", "M"], // Col 3
  ["M", "M", "S", "L"], // Col 4
] as const;

// Mobile (<1024px)
const MOBILE_ASPECT_RATIOS = {
  L: 170 / 240,
  M: 170 / 150,
  S: 170 / 100,
};

const MOBILE_SEQUENCES = [
  ["L", "M", "M", "S"], // Col 1
  ["S", "L", "M", "M"], // Col 2
] as const;

// ─── Component ──────────────────────────────────────────────────────────────

export default function MomentsGallery({
  categories = [],
  images = [],
  heading = "Moments from DevFest",
}: MomentsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>("all");
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }
    // Initial calculation
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  // JS-based fixed-pattern distribution with orientation-aware slot assignment
  const columns = useMemo(() => {
    const columnCount = isDesktop ? 4 : 2;
    const sequences = isDesktop ? DESKTOP_SEQUENCES : MOBILE_SEQUENCES;
    const aspectRatios = isDesktop ? DESKTOP_ASPECT_RATIOS : MOBILE_ASPECT_RATIOS;

    const cols: {
      image: GalleryImage;
      aspectRatio: number;
      sizeSymbol: string;
    }[][] = Array.from({ length: columnCount }, () => []);

    // 1. Sort the filtered images by aspect ratio (portrait -> landscape)
    // Smallest ratio (e.g. 0.66) is most portrait, largest (e.g. 1.5) is most landscape
    const sortedImages = [...filteredImages].sort((a, b) => a.aspectRatio - b.aspectRatio);

    // 2. Iterate through the target slots rather than the original image list
    for (let index = 0; index < filteredImages.length; index++) {
      const colIndex = index % columnCount;
      const rowInCol = Math.floor(index / columnCount);

      // Look up the size in the fixed sequence for this column
      const sequence = sequences[colIndex];
      const sizeSymbol = sequence[rowInCol % 4];
      const targetAspectRatio = aspectRatios[sizeSymbol as keyof typeof aspectRatios];

      // Pull from the sorted array based on the target slot size
      let img;
      if (sizeSymbol === "L") {
        // Tallest slot, pull most portrait image (from the start)
        img = sortedImages.shift();
      } else if (sizeSymbol === "S") {
        // Widest slot, pull most landscape image (from the end)
        img = sortedImages.pop();
      } else { // "M"
        // Medium slot, pull from the middle
        const midIndex = Math.floor(sortedImages.length / 2);
        img = sortedImages.splice(midIndex, 1)[0];
      }

      if (img) {
        cols[colIndex].push({
          image: img,
          aspectRatio: targetAspectRatio,
          sizeSymbol,
        });
      }
    }

    return cols;
  }, [filteredImages, isDesktop]);

  // Don't render the section if there are no images, or if not yet mounted (to prevent hydration mismatch)
  if (images.length === 0 || !mounted) return null;

  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-10 py-16 md:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* ── Heading ──────────────────────────────────────────────── */}
        <h2
          className="mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black"
          style={{ fontFamily: "'Product Sans', sans-serif" }}
        >
          {heading}
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

        {/* ── Fixed Pattern Masonry Grid ───────────────────────────── */}
        <div 
          className="flex flex-row items-start w-full"
          style={{ gap: isDesktop ? '30px' : '15px' }}
        >
          {columns.map((col, colIndex) => (
            <div 
              key={`col-${colIndex}`} 
              className="flex flex-col flex-1 min-w-0"
              style={{ gap: isDesktop ? '20px' : '9px' }}
            >
              <AnimatePresence mode="popLayout">
                {col.map((item) => (
                  <motion.div
                    // layoutId ensures smooth animation even if an image moves between columns
                    layoutId={`gallery-img-${item.image.id}`}
                    key={item.image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1], // easeOut
                    }}
                    className="relative w-full rounded-2xl overflow-hidden group shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    {/* 
                        Cropping via object-fit: cover is intentional here.
                        These are fixed slots, not natural-aspect-ratio containers.
                    */}
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes={isDesktop ? "25vw" : "50vw"}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
