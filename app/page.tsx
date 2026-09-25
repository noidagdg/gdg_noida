'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from "@/components/sections/navbar";
import Loader from "@/components/Loader";
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
import DevFestInvitation from "@/components/devfest-invitation";

export default function Home() {
  const [isSecretDialogOpen, setIsSecretDialogOpen] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const handleLoaderComplete = useCallback(() => setLoaderDone(true), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Loader onComplete={handleLoaderComplete} />

      {/* Navbar will rely on data-navbar-theme attributes attached to sections below */}
      <Navbar onSecretUnlocked={() => setIsSecretDialogOpen(true)} />

      <main>
        {/* Light theme for Hero */}
        <section data-navbar-theme="light">
          <HeroSection heroReady={loaderDone} />
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
      <DevFestInvitation ready={loaderDone && !isSecretDialogOpen} />
    </div>
  );
}
