"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const BRAND_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];
const SUBHEADING = "Dive deep into the latest trends and innovations through talks, workshops, & more";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

export default function HeroSection({ heroReady = true }: { heroReady?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);
  const [desktopMotion, setDesktopMotion] = useState(false);

  // The canvas is decorative, so touch/reduced-motion devices never pay for its
  // continuous rendering work. The media listener also handles live resizing.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 769px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktopMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = containerRef.current;
    if (!heroReady || !desktopMotion || !canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let isRendering = false;
    let isVisible = false;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    const resetMouse = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.x = (particle.x + particle.vx + width) % width;
        particle.y = (particle.y + particle.vy + height) % height;
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
        }
        context.beginPath();
        context.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.fill();
      }
    };
    const stop = () => {
      if (!isRendering) return;
      gsap.ticker.remove(render);
      isRendering = false;
    };
    const render = () => draw();
    const start = () => {
      if (isVisible && !document.hidden && !isRendering) {
        gsap.ticker.add(render);
        isRendering = true;
      }
    };
    const updateDocumentVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    for (let index = 0; index < 64; index += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: BRAND_COLORS[index % BRAND_COLORS.length],
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    }, { threshold: 0.05 });

    observer.observe(section);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", resetMouse, { passive: true });
    document.addEventListener("visibilitychange", updateDocumentVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", resetMouse);
      document.removeEventListener("visibilitychange", updateDocumentVisibility);
    };
  }, [desktopMotion, heroReady]);

  useLayoutEffect(() => {
    if (!heroReady) return;
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([".hero-word", subheadingRef.current, magneticRef.current], { clearProps: "opacity,transform" });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(".hero-word", { yPercent: 100 }, { yPercent: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
      gsap.fromTo(subheadingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.25, ease: "power3.out" });
      gsap.fromTo(magneticRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: "back.out(1.5)" });

      const media = gsap.matchMedia();
      media.add("(min-width: 769px)", () => {
        if (!headlineRef.current) return;
        return gsap.to(headlineRef.current, {
          scale: 0.9,
          opacity: 0,
          y: -32,
          ease: "none",
          scrollTrigger: { trigger: container, start: "top top", end: "+=200", scrub: 0.5 },
        });
      });
      return () => media.revert();
    }, container);

    return () => context.revert();
  }, [heroReady]);

  // The old magnetic button ran a global perpetual rAF and measured on every
  // mouse move. This work is now local to the button and transform-only.
  useEffect(() => {
    const magnetic = magneticRef.current;
    if (!magnetic) return;
    const media = window.matchMedia("(pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (!media.matches) return;
      const setX = gsap.quickTo(magnetic, "x", { duration: 0.25, ease: "power3.out" });
      const setY = gsap.quickTo(magnetic, "y", { duration: 0.25, ease: "power3.out" });
      let bounds: DOMRect;
      const measure = () => { bounds = magnetic.getBoundingClientRect(); };
      const move = (event: PointerEvent) => {
        const x = Math.max(-20, Math.min(20, (event.clientX - (bounds.left + bounds.width / 2)) * 0.2));
        const y = Math.max(-20, Math.min(20, (event.clientY - (bounds.top + bounds.height / 2)) * 0.2));
        setX(x);
        setY(y);
      };
      const reset = () => { setX(0); setY(0); };
      magnetic.addEventListener("pointerenter", measure);
      magnetic.addEventListener("pointermove", move);
      magnetic.addEventListener("pointerleave", reset);
      cleanup = () => {
        magnetic.removeEventListener("pointerenter", measure);
        magnetic.removeEventListener("pointermove", move);
        magnetic.removeEventListener("pointerleave", reset);
        gsap.set(magnetic, { x: 0, y: 0 });
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      cleanup();
      media.removeEventListener("change", setup);
    };
  }, []);

  return (
    <section id="home" ref={containerRef} className={`relative min-h-[100dvh] w-full overflow-hidden bg-background ${heroReady ? "opacity-100" : "opacity-0"}`}>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] [background-image:radial-gradient(rgba(0,0,0,0.7)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 h-[320px] w-[320px] rounded-full bg-[#4285F4]/15 blur-[80px] motion-safe:animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute -top-10 -right-10 h-[320px] w-[320px] rounded-full bg-[#EA4335]/15 blur-[80px] motion-safe:animate-[pulse_10s_ease-in-out_infinite]" />
      </div>
      {desktopMotion && <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" />}

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 text-center">
        <h1 ref={headlineRef} className="relative z-10 mb-6 flex flex-wrap justify-center gap-[1vw] font-[800] leading-none tracking-tight" style={{ fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif", fontSize: "clamp(3rem, 10vw, 12rem)" }}>
          {[{ word: "Think", color: "#FBBC04" }, { word: "Build", color: "#4285F4" }, { word: "Grow", color: "#34A853" }].map((item) => (
            <span key={item.word} className="inline-block overflow-hidden"><span className="hero-word inline-block translate-y-full px-1"><span style={{ color: item.color }}>{item.word}</span><span style={{ color: "#EA4335" }}>.</span></span></span>
          ))}
        </h1>
        <p ref={subheadingRef} className="relative z-10 mb-12 min-h-[3rem] max-w-2xl text-[1.125rem] font-medium text-gray-900 md:text-xl">{SUBHEADING}</p>
        <div ref={magneticRef} className="relative z-10 inline-block">
          <button className="rounded-full px-8 py-4 font-bold text-white shadow-[0_0_20px_rgba(66,133,244,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(66,133,244,0.7)]" style={{ background: "linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)" }} onClick={() => window.open("https://www.commudle.com/communities/gdg-noida", "_blank", "noopener,noreferrer")}>
            Join Community
          </button>
        </div>
      </div>
    </section>
  );
}
