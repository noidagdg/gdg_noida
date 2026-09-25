"use client";

import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
import { GRAIN, GRAIN_SIZE } from "@/lib/grain";

interface StarSpeakersProps {
  className?: string;
}

const speakers = [
  {
    id: 1,
    name: "Ansh Mehra",
    position: "Founder, Cutting Edge School",
    image: "/assets/speakers/ansh-mehra.webp",
    backgroundColor: "#D2E3FC",
  },
  {
    id: 2,
    name: "Joy Banerjee",
    position: "Vice President Design, Blinkit",
    image: "/assets/speakers/joy-banerjee.webp",
    backgroundColor: "#CEEAD6",
  },
  {
    id: 3,
    name: "Saurabh Rajpal",
    position: "Staff Customer Engineer, Google",
    image: "/assets/speakers/saurabh-rajpal.webp",
    backgroundColor: "#FAD2CF",
  },
  {
    id: 4,
    name: "Ruchi Batra",
    position: "Design Leader, Microsoft",
    image: "/assets/speakers/ruchi-batra.webp",
    backgroundColor: "#FEEFC3",
  },
];

export default function StarSpeakers({ className }: StarSpeakersProps) {
  return (
    <section id="speakers" className={cn("relative w-full overflow-hidden py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl text-zinc-900 md:text-5xl lg:text-6xl">
              Our Star <span className="font-bold">Speakers</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              leaders sharing ideas that shape the future
            </p>
          </BlurFade>
        </div>

        {/* Speaker Cards Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {speakers.map((speaker, idx) => (
            <BlurFade key={speaker.id} delay={0.3 + idx * 0.1} inView>
              <div
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl w-[156px] h-[187px] sm:w-[196px] sm:h-[235px] md:w-[220px] md:h-[263px] lg:w-[261px] lg:h-[313px]"
                style={{
                  backgroundColor: speaker.backgroundColor,
                  backgroundImage: GRAIN,
                  backgroundSize: GRAIN_SIZE,
                }}
              >
                {/* Speaker Image - Centered */}
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={261}
                    height={313}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Gradient Overlay (white to transparent, from bottom to 150px) */}
                <div 
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '120px',
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
                  }}
                />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black">
                    {speaker.name}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base text-black">
                    {speaker.position}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

