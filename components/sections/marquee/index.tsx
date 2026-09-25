"use client";

import React from "react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { useGsapReveal } from "@/lib/gsap-reveal";

const logos = [
  {
    name: "DigitalOcean",
    image: "/assets/marquee/digitalocean-ar21 1.svg",
  },
  {
    name: "GitHub",
    image: "/assets/marquee/GitHub_Logo 1.svg",
  },
  {
    name: "Logo 1",
    image: "/assets/marquee/image 2334.svg",
  },
  {
    name: "Logo 2",
    image: "/assets/marquee/image 36.svg",
  },
  {
    name: "Logo 3",
    image: "/assets/marquee/image 58.svg",
  },
  {
    name: "Logo 4",
    image: "/assets/marquee/image 66.svg",
  },
  {
    name: "Logo 5",
    image: "/assets/marquee/image 67.svg",
  },
  {
    name: "Kaggle",
    image: "/assets/marquee/Kaggle_logo 1.svg",
  },
];

function MarqueeSection() {
  const sectionRef = useGsapReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-8 md:py-12 bg-white">
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      
      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <Marquee data-reveal className="[--duration:30s]" pauseOnHover>
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center mx-8 md:mx-12 shrink-0"
          >
            <Image
              src={logo.image}
              alt={logo.name}
              width={147}
              height={53}
              className="w-[97px] h-[38px] lg:w-[147px]  lg:h-[53px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export default MarqueeSection;