"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, ArrowUp, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { smoothScrollTo } from '@/lib/scroll-to'
import { useGsapReveal } from '@/lib/gsap-reveal'

const ABOUT_LINKS = [
  { label: 'About Us', href: '/#about' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Brochure', href: '/#brochure' },
] as const

const RESOURCE_LINKS = [
  { label: 'Articles', href: '/#articles' },
  { label: 'Blogs', href: '/#blogs' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'FAQs', href: '/#faqs' },
] as const

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/#privacy' },
  { label: 'Terms of Service', href: '/#terms' },
  { label: 'Cookies Settings', href: '/#cookies' },
] as const

// One Google brand colour per network, revealed on hover.
const SOCIAL_LINKS = [
  { label: 'Instagram', handle: 'gdg_noida', href: 'https://instagram.com/gdg_noida', Icon: Instagram, accent: '#EA4335' },
  { label: 'Twitter', handle: 'gdg-noida', href: 'https://twitter.com/gdg-noida', Icon: Twitter, accent: '#4285F4' },
  { label: 'LinkedIn', handle: 'noidagdg', href: 'https://linkedin.com/company/noidagdg', Icon: Linkedin, accent: '#34A853' },
  { label: 'YouTube', handle: 'gdg_noida', href: 'https://youtube.com/@gdg_noida', Icon: Youtube, accent: '#FBBC04' },
] as const

// text-sm, not an arbitrary 15px: every other run of body copy in the footer —
// the tagline, the CTA, the copyright and the legal links — is 14px.
const linkClass =
  "relative w-fit text-sm text-white/60 transition-colors duration-200 hover:text-white " +
  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 " +
  "after:bg-white/40 after:transition-transform after:duration-300 hover:after:scale-x-100"

function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const footerRef = useGsapReveal<HTMLElement>();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Extract the hash from href (e.g., "/#about" -> "#about")
    const hash = href.split('#')[1];

    const scrollToHash = () => {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          smoothScrollTo(lenis, element);
        }
      } else {
        smoothScrollTo(lenis, 0);
      }
    };

    // If we're on the home page, just scroll
    if (pathname === '/') {
      scrollToHash();
      return;
    }

    // Not on home page, navigate home first
    router.push('/');
    // Wait for navigation and page load, then scroll
    setTimeout(scrollToHash, 1500); // Wait for home page animations to show
  };

  return (
    <footer
      ref={footerRef}
      className="relative mt-8 overflow-hidden rounded-t-[40px] bg-[#202124] text-white md:mt-12 md:rounded-t-[60px]"
    >
      {/* Google-colour rim along the top edge */}
      <div aria-hidden className="absolute inset-x-0 top-0 flex h-[3px]">
        <span className="flex-1 bg-[#4285F4]" />
        <span className="flex-1 bg-[#EA4335]" />
        <span className="flex-1 bg-[#FBBC04]" />
        <span className="flex-1 bg-[#34A853]" />
      </div>

      {/* Soft glow bleeding in from the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[min(900px,90%)] -translate-x-1/2 rounded-full bg-[#4285F4]/10 blur-[120px]"
      />

      <div className="relative mx-auto px-4 pt-12 pb-6 sm:px-8 md:px-16 md:pt-16 lg:px-24 xl:px-32">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Brand */}
          <div className="flex flex-col items-start gap-5">
            <Image
              data-reveal
              src="/assets/gdg_logo.svg"
              alt="GDG Noida Logo"
              width={180}
              height={112}
              className="h-auto w-[124px] object-contain md:w-[144px]"
            />

            <p data-reveal className="max-w-[300px] text-sm leading-relaxed text-white/55">
              Empowering developers to build, learn, and grow together in the Noida community.
            </p>

            {/* CTA and socials share a row so the brand column stays short */}
            <div data-reveal className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                href="https://www.commudle.com/communities/gdg-noida"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#202124] transition-colors duration-300 hover:bg-white/90"
              >
                Join our community
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map(({ label, handle, href, Icon, accent }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} — ${handle}`}
                    title={`${label} — ${handle}`}
                    style={{ '--accent': accent } as React.CSSProperties}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <Icon size={16} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div data-reveal className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-[0.18em] text-white/35 uppercase">
                About
              </h3>
              <div className="flex flex-col gap-3">
                {ABOUT_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={linkClass}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div data-reveal className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-[0.18em] text-white/35 uppercase">
                Resources
              </h3>
              <div className="flex flex-col gap-3">
                {RESOURCE_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={linkClass}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div data-reveal className="mt-10 border-t border-white/10 pt-5 md:mt-12">
          <div className="flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-1 text-sm text-white/40">
              <span className="text-[15px] leading-none mb-[1px]" style={{ fontFamily: 'system-ui, sans-serif' }}>&copy;</span>
              <span>GDG Noida. All rights reserved.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {LEGAL_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-sm text-white/40 transition-colors duration-200 hover:text-white"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/community-guidelines"
                className="text-sm text-white/40 transition-colors duration-200 hover:text-white"
              >
                Community Guidelines
              </Link>

              <button
                type="button"
                onClick={() => smoothScrollTo(lenis, 0)}
                aria-label="Back to top"
                className="group flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-white md:border-l md:border-white/10 md:pl-6"
              >
                Top
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white/30 group-hover:bg-white/10"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
