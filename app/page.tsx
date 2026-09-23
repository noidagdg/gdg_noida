'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/HeroSection";
import FlagshipEvents from "@/components/sections/flagship-events";
import UpcomingEvents from "@/components/sections/upcoming-events";
import StarSpeakers from "@/components/sections/star-speakers";
import PhotoGallery from "@/components/sections/photo-gallery";
import Sponsors from "@/components/sections/sponsors";
import Footer from "@/components/sections/footer";
import Testimonials from "@/components/sections/Testimonials";
import Marquee from "@/components/sections/marquee";
import WhoWeAre from "@/components/sections/who-we-are";
import { SecretDialog } from "@/components/ui/secret-dialog";
import { useLenis } from "lenis/react";
import { smoothScrollTo } from "@/lib/scroll-to";

export default function Home() {
  const [isSecretDialogOpen, setIsSecretDialogOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (target) smoothScrollTo(lenis, target, -100);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lenis]);

  return (
    <div className="min-h-screen">
      {/* Navbar will rely on data-navbar-theme attributes attached to sections below */}
      <Navbar onSecretUnlocked={() => setIsSecretDialogOpen(true)} />

      <main>
        {/* Light theme for Hero */}
        <section data-navbar-theme="light">
          <HeroSection />
        </section>

        {/* Light theme for all other sections */}
        <section data-navbar-theme="light">
          <Marquee />
          <UpcomingEvents />
          <StarSpeakers />
          <WhoWeAre />
          <FlagshipEvents />
          <Sponsors />
          <Testimonials />
          <PhotoGallery />
          <Footer />
        </section>
      </main>

      {/* Secret Dialog */}
      <SecretDialog isOpen={isSecretDialogOpen} onClose={() => setIsSecretDialogOpen(false)} />
    </div>
  );
}
