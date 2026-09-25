"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Ticket, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { devfestNoida2026 } from "@/lib/data/gdg-noida-events/2026/devfest-noida-2026";
import styles from "./invitation.module.css";

const DEVFEST_URL = "https://devfest2k26.gdgnoida.com";
const event = devfestNoida2026["2026"];

export default function DevFestInvitation({ ready }: { ready: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);
  const lenis = useLenis();

  const openInvitation = useCallback(() => {
    hasOpenedRef.current = true;
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!ready || hasOpenedRef.current) return;

    // Give visitors a brief moment on the landing page before opening the invite.
    const timer = window.setTimeout(() => {
      openInvitation();
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [ready, openInvitation]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previouslyFocused = document.activeElement;
    const launcher = launcherRef.current;
    const previousOverflow = document.documentElement.style.overflow;
    const wasScrollStopped = lenis?.isStopped;

    // Native modal dialogs provide focus containment and an inert background.
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    // Keep focus on the dialog when it opens; the first Tab reaches the close
    // button without making the primary CTA look preselected.
    dialog.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      if (!wasScrollStopped) lenis?.start();
      const returnTarget =
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused !== document.body &&
        previouslyFocused.isConnected
          ? previouslyFocused
          : launcher;
      returnTarget?.focus({ preventScroll: true });
    };
  }, [isOpen, lenis]);

  const closeInvitation = () => setIsOpen(false);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        data-ready={ready}
        aria-label="Open your DevFest Noida 2026 invitation"
        aria-haspopup="dialog"
        aria-controls="devfest-invitation"
        aria-expanded={isOpen}
        tabIndex={ready ? 0 : -1}
        onClick={openInvitation}
      >
        <span className={styles.launcherIcon}><Ticket size={23} aria-hidden="true" /></span>
        <span className={styles.launcherText}>
          <span className={styles.launcherEyebrow}>YOU&apos;RE INVITED</span>
          <span className={styles.launcherTitle}>DevFest <span>2026</span></span>
        </span>
        <span className={styles.launcherArrow}><ArrowUpRight size={21} aria-hidden="true" /></span>
      </button>

      <dialog
        ref={dialogRef}
        id="devfest-invitation"
        className={styles.dialog}
        tabIndex={-1}
        aria-labelledby="devfest-title"
        aria-describedby="devfest-description"
        onCancel={closeInvitation}
        onClose={(e) => {
          // Ignore a queued close event if an effect has already reopened it.
          if (!e.currentTarget.open) closeInvitation();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeInvitation();
        }}
        data-lenis-prevent
      >
        <div className={styles.ticket}>
          <button
            type="button"
            className={styles.close}
            onClick={closeInvitation}
            aria-label="Close DevFest invitation"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className={styles.paper}>
            <div className={styles.presenter}>
              <span className={styles.googleDots} aria-hidden="true"><i /><i /><i /><i /></span>
              GDG NOIDA PRESENTS
            </div>

            <div className={styles.inviteLabel}>
              <span /> CONSIDER THIS YOUR INVITATION
            </div>

            <h2 id="devfest-title" className={styles.title}>
              DevFest<span className={styles.titleDot}>.</span>
              <span className={styles.edition}>NOIDA <span>/</span> 2026</span>
            </h2>

            <p className={styles.headline}>Your next big idea<br />starts with a hello.</p>
            <p id="devfest-description" className={styles.description}>
              Find your people. Feed your curiosity. Come build what&apos;s next with the community.
            </p>

            <div className={styles.details}>
              {event.dates && <span><CalendarDays size={15} aria-hidden="true" /><time dateTime={event.dates.isoDate}>{event.dates.displayDate}</time></span>}
              {event.venue?.name && <span><MapPin size={15} aria-hidden="true" />{event.venue.name}</span>}
            </div>

            <a
              href={DEVFEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              Explore DevFest 2026
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <button type="button" className={styles.later} onClick={closeInvitation}>
              I&apos;ll explore GDG first
            </button>

            <div className={styles.paperFooter} aria-hidden="true">
              <span>THINK. BUILD. BELONG.</span>
              <span>NOIDA ↗ THE FUTURE</span>
            </div>
          </div>

          <div className={styles.stub} aria-hidden="true">
            <div className={styles.stubTop}>GOOD PEOPLE.<br /> GREAT POSSIBILITIES.</div>
            <div className={styles.year}><span>20</span><span>26</span></div>
            <div className={styles.flower}>
              <svg viewBox="0 0 100 100" fill="none">
                <path d="M50 0 59 25 79 10 75 36 100 35 81 53 98 72 72 70 75 96 54 81 40 100 37 74 12 84 23 60 0 50 26 41 10 20 37 26Z" fill="currentColor" />
                <circle cx="50" cy="50" r="12" fill="#1c2024" />
              </svg>
            </div>
            <div className={styles.sticker}>made of<br /><strong>community.</strong></div>
            <div className={styles.stubBottom}>
              <span className={styles.barcode} />
              <span>GDG-NOIDA / DF-2026</span>
            </div>
          </div>
        </div>
        <p className={styles.caption}>A new connection. A fresh perspective. Your next chapter.</p>
      </dialog>
    </>
  );
}
