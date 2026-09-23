'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { BlurFade } from '@/components/magicui'
import { GRAIN, GRAIN_SIZE } from '@/lib/grain'

/** How long each testimonial stays on screen before the next one rotates in. */
const ROTATE_MS = 5000

// Google-themed star. Unfilled stars keep the same silhouette so the row of
// five never shifts when a rating is below max.
function GoogleStar({ className, filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2L14.9 8.62L22 9.27L16.5 14.14L18.18 21.02L12 17.27L5.82 21.02L7.5 14.14L2 9.27L9.1 8.62L12 2Z"
        fill={filled ? '#FBBC04' : '#E8EAED'}
        stroke={filled ? '#F9AB00' : '#DADCE0'}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface Sponsor {
  id: number
  name: string
  logo: string
  accent: string // pastel surface for the card + active tab
  accentDeep: string // saturated counterpart for the quote mark and rules
  testimonial: {
    text: string
    author: string
    position: string
    rating: number
    photo: string
  }
}

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Neo4j",
    logo: "/assets/sponsors/neo4j.svg",
    accent: "#D2E3FC",
    accentDeep: "#1967D2",
    testimonial: {
      text: "I am thrilled to share my experience of collaborating with GDG Noida on behalf of Neo4j. Sponsoring DevFest Noida last year, I was impressed by the professionalism and dedication of the GDG team. The event was a resounding success, with an engaged audience that aligned perfectly with our goals. Based on this successful partnership, I have hosted multiple meetups with GDG Noida, and each event has been exceptional. The team consistently delivers high-quality tech events with seamless coordination and attention to detail, ensuring smooth execution and effective audience engagement. The visibility and reach we gained through our partnership with GDG Noida have been invaluable. I am very happy with the collaboration and look forward to continuing our long-term partnership",
      author: "Siddhant Agarwal",
      position: "DevRel, Neo4j",
      rating: 5,
      photo: "/assets/sponsors/sid-neo4j.svg"
    }
  },
  {
    id: 2,
    name: "GitHub",
    logo: "/assets/sponsors/github.svg",
    accent: "#FEEFC3",
    accentDeep: "#B06000",
    testimonial: {
      text: "I'm incredibly grateful to GDG Noida for providing an exceptional platform to showcase Copilot and engage with a passionate community of developers. The enthusiasm and competitive spirit displayed by participants in the contests were truly inspiring. I'm eager to contribute again at the next DevFest!",
      author: "Shubhangi Gupta",
      position: "GitHub Campus Expert",
      rating: 5,
      photo: "/assets/sponsors/shubhangi-GH.svg"
    }
  },
  {
    id: 3,
    name: "Brevo",
    logo: "/assets/sponsors/brrr.svg",
    accent: "#CEEAD6",
    accentDeep: "#188038",
    testimonial: {
      text: "Our partnership with GDG Noida has been a highlight of the past year for Brevo. Sponsoring DevFest Noida 2024 gave us a firsthand look at the team’s remarkable ability to connect with developers. Their dedication to fostering a vibrant and engaged tech community is truly inspiring, and it’s a mission we're proud to support. The high-quality events and seamless execution have not only enhanced our visibility but have also created meaningful connections. We are grateful for this reliable and committed partnership and look forward to continuing to build on this success in the future.",
      author: "Harshit Punwar",
      position: "Developer Ecosystem Manager",
      rating: 5,
      photo: "/assets/sponsors/harshit-brevo.svg"
    }
  },
  {
    id: 4,
    name: "Capx",
    logo: "/assets/sponsors/capx.svg",
    accent: "#FAD2CF",
    accentDeep: "#C5221F",
    testimonial: {
      text: "The overall feedback from the event has been outstanding! It was an amazing experience. We connected with numerous developers who were genuinely interested and enthusiastic about building innovative projects.",
      author: "Vaibhav Tyagi",
      position: "Founder, Capx",
      rating: 5,
      photo: "/assets/sponsors/vaibhav.svg"
    }
  }
]

function Sponsors() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSponsor = sponsors[activeIndex]

  const sectionRef = useRef<HTMLElement | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const railRef = useRef<HTMLDivElement | null>(null)

  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  // Bumped on every resume so the timer effect below re-runs and starts a fresh
  // full interval, rather than resuming whatever was left of the previous one.
  const [runId, setRunId] = useState(0)

  const running = inView && !paused

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % sponsors.length) + sponsors.length) % sponsors.length)
  }, [])

  // Leaving the rail restarts the full 5 seconds. Bumped at the event that
  // resumes, never from an effect body, which would cascade an extra render.
  const resume = useCallback(() => {
    setPaused(false)
    setRunId((n) => n + 1)
  }, [])

  // Hold the rotation until the section is actually on screen. Starting it at
  // mount means a visitor who scrolls down here arrives mid-cycle, on whichever
  // sponsor the clock happened to land on rather than the first one.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setRunId((n) => n + 1)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-advance through every sponsor on a loop. A timer, not requestAnimationFrame:
  // rAF is throttled to zero in a background tab, and reduced-motion preferences
  // must not switch the rotation off — it is the point of the section.
  // Re-running on activeIndex means a manual pick also restarts the countdown.
  useEffect(() => {
    if (!running) return
    const id = setTimeout(
      () => setActiveIndex((i) => (i + 1) % sponsors.length),
      ROTATE_MS,
    )
    return () => clearTimeout(id)
  }, [activeIndex, running, runId])

  // On mobile the rail is a horizontal strip, so the selected tab has to be
  // scrolled back into view. On desktop all four tabs are always visible.
  useEffect(() => {
    const tab = tabRefs.current[activeIndex]
    const rail = railRef.current
    if (!tab || !rail || window.matchMedia('(min-width: 1024px)').matches) return

    rail.scrollTo({
      left: tab.offsetLeft - rail.clientWidth / 2 + tab.clientWidth / 2,
      behavior: 'smooth',
    })
  }, [activeIndex])

  const handleTabKeyDown = (event: React.KeyboardEvent) => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const next = isDesktop ? 'ArrowDown' : 'ArrowRight'
    const prev = isDesktop ? 'ArrowUp' : 'ArrowLeft'

    let target: number | null = null
    if (event.key === next) target = activeIndex + 1
    else if (event.key === prev) target = activeIndex - 1
    else if (event.key === 'Home') target = 0
    else if (event.key === 'End') target = sponsors.length - 1
    if (target === null) return

    event.preventDefault()
    const resolved = ((target % sponsors.length) + sponsors.length) % sponsors.length
    goTo(resolved)
    tabRefs.current[resolved]?.focus()
  }

  return (
    <section ref={sectionRef} id="sponsors" className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl text-zinc-900 md:text-5xl lg:text-6xl">
              Star <span className="font-bold">Sponsors</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              Empowering our vision with their support
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.3} inView>
          <div className="mx-auto grid max-w-[1360px] items-stretch gap-4 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-6">
            {/* Sponsor picker — horizontal strip on mobile, stacked rail on desktop.
                Rotation holds only while the pointer is over this rail, so reading
                the quote never stalls the carousel. Touch is excluded: a tap fires
                pointerenter and would leave it paused with no pointerleave to
                follow. Focus pauses too — that is the keyboard equivalent. */}
            <div
              ref={railRef}
              data-lenis-prevent
              role="tablist"
              aria-label="Sponsors"
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setPaused(true) }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') resume() }}
              onFocusCapture={(e) => {
                // Only keyboard focus holds. A click also focuses the button, and
                // pausing on that would strand the carousel until you clicked away.
                if (e.target instanceof Element && e.target.matches(':focus-visible')) setPaused(true)
              }}
              onBlurCapture={() => resume()}
              className="no-scrollbar flex w-full gap-3 overflow-x-auto scroll-smooth lg:h-full lg:flex-col lg:gap-4 lg:overflow-x-visible"
            >
              {sponsors.map((sponsor, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={sponsor.id}
                    ref={(el) => { tabRefs.current[index] = el }}
                    id={`sponsor-tab-${sponsor.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`sponsor-panel-${sponsor.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => goTo(index)}
                    onKeyDown={handleTabKeyDown}
                    style={
                      isActive
                        ? { backgroundColor: sponsor.accent, backgroundImage: GRAIN, backgroundSize: GRAIN_SIZE }
                        : undefined
                    }
                    className={`group relative flex shrink-0 transform-gpu items-center justify-center overflow-hidden rounded-2xl px-4 outline-none transition-[transform,box-shadow,background-color] duration-300 ease-out focus-visible:ring-4 focus-visible:ring-[#4285F4]/35 h-[84px] w-[124px] md:h-[96px] md:w-[140px] lg:h-auto lg:min-h-[112px] lg:w-full lg:flex-1 lg:px-6 ${isActive ? 'shadow-[0_10px_30px_-14px_rgba(16,24,40,0.45)]' : 'bg-white shadow-[0_2px_10px_-4px_rgba(16,24,40,0.14)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-16px_rgba(16,24,40,0.35)]'}`}
                  >
                    <span className="sr-only">Read the {sponsor.name} testimonial</span>
                    {/* Fixed "logo well": object-contain fits each mark inside the
                        same box, so a tall logo and a wide one carry equal weight
                        instead of being sized by their own aspect ratio. */}
                    <span className="relative block h-[34px] w-full max-w-[84px] md:h-[38px] md:max-w-[100px] lg:h-[48px] lg:max-w-[150px]">
                      <Image
                        src={sponsor.logo}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 150px, 100px"
                        className={`object-contain transition-[filter,opacity] duration-500 ease-out ${isActive ? 'opacity-100 grayscale-0' : 'opacity-55 grayscale group-hover:opacity-85 group-hover:grayscale-0'}`}
                      />
                    </span>

                  </button>
                )
              })}
            </div>

            {/* Testimonial panel */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSponsor.id}
                  id={`sponsor-panel-${activeSponsor.id}`}
                  role="tabpanel"
                  aria-labelledby={`sponsor-tab-${activeSponsor.id}`}
                  // Fixed initial state to prevent hydration mismatches on reduced-motion devices.
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{
                    backgroundColor: activeSponsor.accent,
                    backgroundImage: GRAIN,
                    backgroundSize: GRAIN_SIZE,
                  }}
                  className="flex min-h-[480px] w-full flex-col rounded-3xl p-6 shadow-[0_18px_40px_-24px_rgba(16,24,40,0.45)] md:min-h-[540px] md:p-8 lg:min-h-[620px] lg:p-10"
                >
                  {/* One type size for every quote. The lengths differ a lot, so the
                      mark and the text centre together in the flex track — the glyph
                      has to travel with the text or a short quote leaves it stranded
                      at the top of the card with a gap between them. */}
                  <div className="flex flex-1 flex-col justify-center">
                    <span
                      aria-hidden="true"
                      className="mb-2 block font-serif text-6xl leading-[0.6] md:text-7xl"
                      style={{ color: activeSponsor.accentDeep, opacity: 0.35 }}
                    >
                      &ldquo;
                    </span>
                    <blockquote className="text-base leading-relaxed text-zinc-800 md:text-[17px] lg:text-lg lg:leading-[1.75]">
                      {activeSponsor.testimonial.text}
                    </blockquote>
                  </div>

                  {/* Attribution */}
                  <div
                    className="mt-6 border-t pt-5 md:mt-8 md:pt-6"
                    style={{ borderColor: `${activeSponsor.accentDeep}26` }}
                  >
                    <div className="flex flex-wrap items-center gap-4">
                      <Image
                        src={activeSponsor.testimonial.photo}
                        alt={activeSponsor.testimonial.author}
                        width={92}
                        height={92}
                        className="h-14 w-14 shrink-0 rounded-full bg-white object-cover ring-2 ring-white md:h-[72px] md:w-[72px]"
                      />
                      <div className="min-w-0">
                        <p className="text-lg font-semibold text-zinc-900 md:text-xl">
                          {activeSponsor.testimonial.author}
                        </p>
                        <p className="mt-0.5 text-sm text-zinc-600 md:text-base">
                          {activeSponsor.testimonial.position}
                        </p>
                      </div>

                      <div
                        className="ml-auto flex shrink-0 gap-1"
                        role="img"
                        aria-label={`Rated ${activeSponsor.testimonial.rating} out of 5`}
                      >
                        {Array.from({ length: 5 }, (_, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
                            transition={{ delay: 0.25 + index * 0.05, duration: 0.2 }}
                          >
                            <GoogleStar
                              className="h-5 w-5 md:h-6 md:w-6"
                              filled={index < activeSponsor.testimonial.rating}
                            />
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

export default Sponsors
