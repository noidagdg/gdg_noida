"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfettiAnimation } from "./confetti";

interface SecretDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecretDialog({ isOpen, onClose }: SecretDialogProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    // If dialog just opened, start confetti animation
    if (isOpen && !wasOpenRef.current) {
      wasOpenRef.current = true;

      // Defer setState to avoid synchronous call in effect
      const confettiTimer = setTimeout(() => {
        setShowConfetti(true);
      }, 0);

      // Stop confetti after 3 seconds
      const hideTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(hideTimer);
      };
    }

    // If dialog just closed, update the ref
    if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti Animation */}
          {showConfetti && <ConfettiAnimation />}

          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={cn(
              "fixed inset-0 bg-black/40 backdrop-blur-md z-40",
              "transition-colors duration-300"
            )}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-2xl max-h-[85vh] overflow-hidden"
          >
            {/* Glow background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4285F4]/20 via-[#F9AB00]/20 to-[#34A853]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main Dialog */}
            <div className="relative bg-white backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                      {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4285F4]/50 to-transparent" />

              {/* Content wrapper with overflow handling */}
              <div data-lenis-prevent className="overflow-y-auto max-h-[85vh] scrollbar-hide">
                <div className="p-6 md:p-8 lg:p-10">
                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={cn(
                      "absolute top-6 right-6 md:top-8 md:right-8 z-10",
                      "p-2 text-gray-600 hover:text-gray-900",
                      "bg-gray-100 hover:bg-gray-200 rounded-full",
                      "transition-all duration-300 backdrop-blur-sm"
                    )}
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.button>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="space-y-3 pr-8">
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className={cn(
                          "text-4xl md:text-5xl font-bold",
                          "bg-gradient-to-r from-[#4285F4] via-[#F9AB00] to-[#34A853]",
                          "bg-clip-text text-transparent"
                        )}
                      >
                        🔐 Secret Space
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                        className="text-lg md:text-xl text-gray-700 font-light leading-relaxed"
                      >
                        You have entered a secret space
                      </motion.p>
                    </div>

                    {/* Divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent origin-left"
                    />

                    {/* Google Form Embed */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className={cn(
                        "rounded-2xl overflow-hidden",
                        "border border-gray-200 bg-gray-50",
                        "backdrop-blur-sm shadow-lg",
                        "hover:border-gray-300 transition-colors duration-300"
                      )}
                    >
                      <iframe
                        src="https://forms.gle/oLkgBJK3jDDJktrC9"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        className="w-full bg-white"
                      >
                        Loading…
                      </iframe>
                    </motion.div>

                    {/* Close Button at Bottom */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className={cn(
                        "w-full px-6 py-3 md:py-4 font-semibold",
                        "bg-gradient-to-r from-[#4285F4]/80 via-[#F9AB00]/80 to-[#34A853]/80",
                        "hover:from-[#4285F4] hover:via-[#F9AB00] hover:to-[#34A853]",
                        "text-white rounded-xl transition-all duration-300",
                        "shadow-lg hover:shadow-xl hover:shadow-[#4285F4]/20",
                        "backdrop-blur-sm border border-white/10"
                      )}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
