"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLogoClickTracker } from "@/lib/useLogoClickTracker";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { smoothScrollTo } from "@/lib/scroll-to";

const NAVBAR_OFFSET = -100;

// Single source of truth so every navbar surface shares one edge and one hover tint.
const GLASS_BORDER = "border border-black/[0.10] dark:border-white/[0.16]";
// Needs to read against a white page seen through a translucent bar, so it sits
// well above the usual ~8% hover tint.
const HOVER_TINT = "bg-black/[0.14] dark:bg-white/[0.16]";

interface NavbarProps {
  className?: string;
  onSecretUnlocked?: () => void;
}

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Events", href: "/events" },
  { name: "Speakers", href: "#speakers" },
  // { name: "Agenda", href: "/agenda" }, // Hid for now per request
  { name: "About Us", href: "#about" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Gallery", href: "#gallery" },
] as const;

export default function Navbar({ className, onSecretUnlocked }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { trackClick } = useLogoClickTracker(onSecretUnlocked);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a full URL path (not a hash), let it navigate normally
    if (href.startsWith("/")) {
      return;
    }

    e.preventDefault();
    const targetId = href.replace("#", "");

    // If not on home page and clicking a hash link, navigate to home first
    if (pathname !== "/") {
      router.push('/');
      setIsOpen(false);
      // Wait for navigation and home page animations, then scroll
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          smoothScrollTo(lenis, element, NAVBAR_OFFSET);
        }
      }, 1500); // Wait for home page animations to show
      return;
    }

    // Already on home page, just scroll
    const element = document.getElementById(targetId);

    if (element) {
      smoothScrollTo(lenis, element, NAVBAR_OFFSET);
    }
    setIsOpen(false);
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className={cn(
        "fixed top-4 md:top-10 inset-x-0 max-w-7xl mx-auto z-50 px-4 md:px-8 lg:px-20",
        className
      )}
    >
      <nav
        className={cn(
          "relative rounded-full",
          // Glass: translucent fill + heavy blur. The edge is drawn by a lit inner
          // highlight and a faint outer ring, not by making the fill opaque.
          "bg-white/40 dark:bg-black/30 backdrop-blur-2xl backdrop-saturate-[180%]",
          GLASS_BORDER,
          // inset 0 0 0 1px = highlight on all four sides, not just the top edge
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65),0_10px_34px_-12px_rgba(16,24,40,0.3)]",
          "flex items-center justify-between",
          "px-4 md:px-8 py-3 md:py-4 antialiased",
          "transition-all duration-300"
        )}
      >
        {/* Logo Button */}
        <motion.button
          onClick={trackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={cn(
            "flex items-center space-x-3 z-50 rounded-full outline-none",
            "bg-transparent border-none cursor-pointer",
            "focus-visible:ring-2 focus-visible:ring-[#4285F4]/50",
            "transition-opacity duration-300 hover:opacity-80"
          )}
          aria-label="GDG Noida Logo"
        >
          <Image
            src="/assets/noida_long_logo0.svg"
            alt="GDG Noida Logo"
            width={200}
            height={40}
            className="h-5 md:h-6 w-auto object-contain"
            priority
          />
        </motion.button>

        {/* Desktop Navigation */}
        <div
          className="hidden lg:flex items-center space-x-1"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              onMouseEnter={() => setHovered(link.name)}
              onFocus={() => setHovered(link.name)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative px-4 py-2 text-black dark:text-white",
                "transition-colors duration-200 font-medium text-sm",
                "cursor-pointer rounded-full outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#4285F4]/50"
              )}
            >
              {/* Single pill shared across links, so it glides to whatever is hovered */}
              {hovered === link.name && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className={cn("absolute inset-0 rounded-full", HOVER_TINT, GLASS_BORDER)}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "lg:hidden z-50 p-2 rounded-full outline-none",
            "hover:bg-black/[0.14] dark:hover:bg-white/[0.16]",
            "focus-visible:ring-2 focus-visible:ring-[#4285F4]/50",
            "transition-colors duration-300"
          )}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-black dark:text-white" />
            )}
          </motion.div>
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "absolute top-full left-0 right-0 mt-3 mx-2 lg:hidden rounded-3xl",
                "bg-white/55 dark:bg-black/45 backdrop-blur-2xl backdrop-saturate-[180%]",
                GLASS_BORDER,
                "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65),0_18px_44px_-14px_rgba(16,24,40,0.34)]",
                "overflow-hidden"
              )}
            >
              <div className="flex flex-col p-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className={cn(
                        "text-black dark:text-white",
                        "hover:bg-black/[0.14] dark:hover:bg-white/[0.16]",
                        "active:bg-black/[0.18] dark:active:bg-white/[0.2]",
                        "px-4 py-3 rounded-2xl transition-colors duration-200",
                        "font-medium block cursor-pointer"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}