'use client'

import React from 'react'
import Image from 'next/image'
import BlurFade from '@/components/magicui/blur-fade'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import { motion } from 'motion/react'

function Hero() {
  return (
    <section id="home" className="relative lg:min-h-screen h-[70vh] md:h-screen flex flex-col px-4 py-8 md:py-12 lg:py-16 bg-white overflow-hidden w-full items-center justify-center">
      {/* Background Cover SVG */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image 
          src="/cover-bg.svg" 
          alt="Background" 
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Decorative Rectangle Elements - Bottom of Section */}
      <div className="hidden md:flex absolute bottom-0 left-0 right-0 w-full z-10 overflow-hidden pointer-events-none items-end justify-center gap-4 md:gap-8 px-4">
        <BlurFade delay={0.8} inView inViewMargin="0px">
          <Image 
            src="/assets/Rectangle 41272.svg" 
            alt="" 
            width={200}
            height={200}
            loading="lazy"
            fetchPriority="low"
            className="object-contain w-auto h-auto"
          />
        </BlurFade>
        
        <BlurFade delay={0.9} inView inViewMargin="0px">
          <Image 
            src="/assets/Rectangle 41269.svg" 
            alt="" 
            width={180}
            height={180}
            loading="lazy"
            fetchPriority="low"
            className="object-contain w-auto h-auto"
          />
        </BlurFade>

        <BlurFade delay={1.0} inView inViewMargin="0px">
          <Image 
            src="/assets/Rectangle 41270.svg" 
            alt="" 
            width={220}
            height={220}
            loading="lazy"
            fetchPriority="low"
            className="object-contain w-auto h-auto"
          />
        </BlurFade>

        <BlurFade delay={1.1} inView inViewMargin="0px">
          <Image 
            src="/assets/Rectangle 41271.svg" 
            alt="" 
            width={250}
            height={250}
            loading="lazy"
            fetchPriority="low"
            className="object-contain w-auto h-auto"
          />
        </BlurFade>
      </div>
      <div className="flex md:hidden absolute bottom-0 left-0 right-0 w-full z-10 overflow-hidden pointer-events-none  items-end justify-center gap-2 md:gap-8 px-4 ">
        <BlurFade delay={0.8} inView inViewMargin="0px">
          <Image 
            src="/assets/mobile/Rectangle 41272.svg" 
            alt="" 
            width={120}
            height={120}
            loading="lazy"
            fetchPriority="low"
            className="object-contain w-auto h-auto"
          />
        </BlurFade>
        
        <BlurFade delay={0.9} inView inViewMargin="0px">
          <Image 
            src="/assets/mobile/Rectangle 41269.svg" 
            alt="" 
            width={100}
            height={100}
            loading="lazy"
            fetchPriority="low"
            className="w-auto h-auto mb-10"
          />
        </BlurFade>

        <BlurFade delay={1.0} inView inViewMargin="0px">
          <Image 
            src="/assets/mobile/Rectangle 41270.svg" 
            alt="" 
            width={130}
            height={130}
            loading="lazy"
            fetchPriority="low"
            className="w-auto h-auto mb-4"
          />
        </BlurFade>

        <BlurFade delay={1.1} inView inViewMargin="0px">
          <Image 
            src="/assets/mobile/Rectangle 41271.svg" 
            alt="" 
            width={150}
            height={150}
            loading="lazy"
            fetchPriority="low"
            className="object-contain w-auto h-auto"
          />
        </BlurFade>
      </div>

      {/* Background Ripple Effect - Responsive */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="hidden md:block"
      >
        <BackgroundRippleEffect 
          rows={16} 
          cols={38} 
          cellSize={56}
          colors={['#4285F4', '#F9AB00', '#34A853']}
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="block md:hidden"
      >
        <BackgroundRippleEffect 
          rows={42} 
          cols={12} 
          cellSize={40}
          colors={['#4285F4', '#F9AB00', '#34A853']}
        />
      </motion.div>

      <div className="relative z-10 mt-[100px] sm:mt-[120px] md:mt-[80px] lg:mt-0 mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6 px-4 mb-[200px] sm:mb-[250px] md:mb-[180px] lg:mb-[200px]">
        {/* Main Slogan */}
        <BlurFade delay={0.25} inView inViewMargin="0px">
          <h1 className="font-bold flex flex-nowrap sm:flex-wrap items-center justify-center gap-[6px] sm:gap-3 md:gap-4 text-center">
            <span className="text-[#4285F4] text-[38px] sm:text-[60px] md:text-[80px] lg:text-[110px] xl:text-[140px] font-semibold leading-[1.1]">
              Think.
            </span>
            <span className="text-[#F9AB00] text-[38px] sm:text-[60px] md:text-[80px] lg:text-[110px] xl:text-[140px] font-semibold leading-[1.1]">
              Build.
            </span>
            <span className="text-[#34A853] text-[38px] sm:text-[60px] md:text-[80px] lg:text-[110px] xl:text-[140px] font-semibold leading-[1.1]">
              Grow.
            </span>
          </h1>
        </BlurFade>

        {/* Description */}
        <BlurFade delay={0.5} inView inViewMargin="0px">
          <p className="mx-auto text-center text-black font-urbanist text-[12px] sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium leading-relaxed max-w-3xl px-2">
            Dive deep into the latest trends and innovations through talks, workshops, &amp; more
          </p>
        </BlurFade>

        {/* Join Community Button */}
        <BlurFade delay={0.75} inView inViewMargin="0px">
          <button className="flex items-center justify-center gap-2 bg-[#4285F4] text-white transition-colors cursor-pointer mx-auto rounded-full shadow-lg w-auto px-4 sm:px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 min-w-0 sm:min-w-[175px] h-[48px] md:h-[52px] lg:h-[56px]">
            <Image 
              src="/assets/commudle.svg" 
              alt="Join Community" 
              width={34} 
              height={21}
              className="w-6 h-4 sm:w-8 sm:h-5 md:w-[34px] md:h-[21px]"
            />
            <span className="text-[15px] sm:text-base md:text-lg lg:text-xl font-semibold">
              <a href="https://www.commudle.com/communities/gdg-noida" target="_blank" rel="noopener noreferrer">
                Join Community
              </a>
            </span>
          </button>
        </BlurFade>
      </div>
      
    </section>
  )
}

export default Hero

