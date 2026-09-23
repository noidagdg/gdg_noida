"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";

interface WhoWeAreProps {
  className?: string;
}

const imagePaths = {
  communityForAll: "/assets/who-we-are/community-for-all.png",
  androidImage: "/assets/who-we-are/android-image.png",
  goldenYears: "/assets/who-we-are/golden-years.png",
  communityMembers: "/assets/who-we-are/community-members.png",
  successfulEvents: "/assets/who-we-are/successful-events.png",
  techDiverse: "/assets/who-we-are/tech-diverse.png",
  noidaGraphic: "/assets/who-we-are/noida-graphic.png",
  digitalTrendsetters: "/assets/who-we-are/digital-trendsetters.png",
  teamPhoto: "/assets/who-we-are/team-photo.png",
  industryLeaders: "/assets/who-we-are/industry-leaders.png",
  gdgNoidaLogo: "/assets/who-we-are/gdg-noida-logo.png",
  behindScenes: "/assets/who-we-are/behind-scenes.png",
  nightGdgNoida: "/assets/who-we-are/night-gdg.png",
};

/** Half-column tiles sit inside a nested 2-up grid; full ones span the column. */
const SIZES_FULL = "(min-width: 1024px) 460px, (min-width: 768px) 50vw, 100vw";
const SIZES_HALF = "(min-width: 1024px) 225px, (min-width: 768px) 25vw, 50vw";

interface TileProps {
  src: string;
  alt: string;
  /** Aspect-ratio utility — each tile's proportions are part of the bento rhythm. */
  aspect: string;
  delay: number;
  sizes: string;
  /**
   * Only for artwork that is dark. Every PNG here has its corners rounded into
   * the file, so a sliver of the tile shows through at each corner; on a dark
   * image that sliver would read as a white notch. Pale artwork needs nothing —
   * the corner falls through to the page and disappears.
   */
  surface?: string;
  priority?: boolean;
}

function Tile({ src, alt, aspect, delay, sizes, surface, priority }: TileProps) {
  return (
    <BlurFade delay={delay} inView>
      <figure
        className={cn(
          "relative w-full overflow-hidden rounded-2xl md:rounded-3xl",
          "shadow-[0_1px_2px_rgba(16,24,40,0.06)]",
          aspect,
          surface,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </figure>
    </BlurFade>
  );
}

export default function WhoWeAre({ className }: WhoWeAreProps) {
  return (
    <section
      id="about"
      className={cn("relative w-full overflow-hidden py-16 md:py-24", className)}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl text-zinc-900 md:text-5xl lg:text-6xl">
              Who <span className="font-bold">We Are</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              Where ideas take shape and stories spark inspiration
            </p>
          </BlurFade>
        </div>

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 pb-8 md:grid-cols-2 md:gap-4 md:pb-0 lg:grid-cols-3">
          {/* Column 1 */}
          <div className="flex w-full flex-col justify-between gap-3 md:gap-4">
            <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
              <Tile
                src={imagePaths.communityForAll}
                alt="Community for ALL"
                aspect="aspect-[94/100]"
                delay={0.2}
                sizes={SIZES_HALF}
              />
              <Tile
                src={imagePaths.androidImage}
                alt="Android mascot"
                aspect="aspect-[94/100]"
                delay={0.25}
                sizes={SIZES_HALF}
              />
            </div>

            <Tile
              src={imagePaths.techDiverse}
              alt="A tech-diverse community"
              aspect="aspect-[710/252]"
              delay={0.3}
              sizes={SIZES_FULL}
            />

            <Tile
              src={imagePaths.teamPhoto}
              alt="The GDG Noida team"
              aspect="aspect-[722/306]"
              delay={0.35}
              sizes={SIZES_FULL}
              surface="bg-[#1F2937]"
            />
          </div>

          {/* Column 2 */}
          <div className="flex w-full flex-col justify-between gap-3 md:gap-4">
            <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
              <Tile
                src={imagePaths.nightGdgNoida}
                alt="GDG Noida at night"
                aspect="aspect-[225/100]"
                delay={0.45}
                sizes={SIZES_HALF}
                surface="bg-black"
              />
              <Tile
                src={imagePaths.goldenYears}
                alt="3+ golden years"
                aspect="aspect-[225/100]"
                delay={0.5}
                sizes={SIZES_HALF}
              />
            </div>

            <Tile
              src={imagePaths.noidaGraphic}
              alt="Noida city graphic"
              aspect="aspect-[468/437]"
              delay={0.55}
              sizes={SIZES_FULL}
              priority
            />

            <Tile
              src={imagePaths.industryLeaders}
              alt="Industry leaders"
              aspect="aspect-[936/196]"
              delay={0.6}
              sizes={SIZES_FULL}
            />
          </div>

          {/* Column 3 */}
          <div className="flex w-full flex-col justify-between gap-3 md:gap-4">
            <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
              <Tile
                src={imagePaths.communityMembers}
                alt="33K+ community members"
                aspect="aspect-[143/100]"
                delay={0.65}
                sizes={SIZES_HALF}
              />
              <Tile
                src={imagePaths.successfulEvents}
                alt="50+ successful events"
                aspect="aspect-[143/100]"
                delay={0.7}
                sizes={SIZES_HALF}
              />
            </div>

            <Tile
              src={imagePaths.digitalTrendsetters}
              alt="Digital trendsetters"
              aspect="aspect-[914/518]"
              delay={0.75}
              sizes={SIZES_FULL}
            />

            <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
              <Tile
                src={imagePaths.gdgNoidaLogo}
                alt="GDG Noida logo"
                aspect="aspect-square"
                delay={0.8}
                sizes={SIZES_HALF}
              />
              <Tile
                src={imagePaths.behindScenes}
                alt="Behind the scenes"
                aspect="aspect-square"
                delay={0.85}
                sizes={SIZES_HALF}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
