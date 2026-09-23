'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const BRAND_COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

export default function HeroSection({ heroReady = true }: { heroReady?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const magneticRef = useRef<HTMLDivElement>(null);

    // 4. Floating Particle Field
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles: Particle[] = [];
        let animationFrame: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Check if mobile (reduce particles)
        const isMobile = window.innerWidth <= 768;
        const numParticles = isMobile ? 50 : 120;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 2,
                color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)]
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Repel
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    p.x -= (dx / dist) * force * 2;
                    p.y -= (dy / dist) * force * 2;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            animationFrame = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // 2. Text Scramble on Load
    useEffect(() => {
        if (!heroReady) return;

        const el = subheadingRef.current;
        if (!el) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const finalString = "Dive deep into the latest trends and innovations through talks, workshops, & more";
        const chars = "!<>-_\\\\/[]{}—=+*^?#________";
        let frame = 0;
        const duration = 800;
        const frameDuration = 40;
        const totalFrames = duration / frameDuration;

        let interval: NodeJS.Timeout;

        const startScramble = () => {
            interval = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;

                let scrambled = "";
                for (let i = 0; i < finalString.length; i++) {
                    if (finalString[i] === " ") {
                        scrambled += " ";
                        continue;
                    }
                    if (progress >= Math.random()) {
                        scrambled += finalString[i];
                    } else {
                        scrambled += chars[Math.floor(Math.random() * chars.length)];
                    }
                }

                el.innerText = scrambled;

                if (frame >= totalFrames) {
                    el.innerText = finalString;
                    clearInterval(interval);
                }
            }, frameDuration);
        };

        setTimeout(startScramble, 200);

        return () => clearInterval(interval);
    }, [heroReady]);

    // 1. Kinetic Text Entrance & 6. Scroll-Driven Hero Collapse
    useEffect(() => {
        if (!heroReady) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            gsap.set('.hero-word', { y: '0%' });
            return;
        }

        const ctx = gsap.context(() => {
            // Entrance for Hero Words
            gsap.fromTo(
                '.hero-word',
                { y: '100%' },
                {
                    y: '0%',
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.1
                }
            );

            // Entrance for Subheading
            if (subheadingRef.current) {
                gsap.fromTo(
                    subheadingRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
                );
            }

            // Entrance for CTA Button
            if (magneticRef.current) {
                gsap.fromTo(
                    magneticRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.5)' }
                );
            }

            // Scroll Collapse
            if (headlineRef.current && containerRef.current) {
                gsap.to(headlineRef.current, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: '+=200',
                        scrub: 1,
                    },
                    scale: 0.85,
                    opacity: 0,
                    y: -40,
                    ease: 'none'
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [heroReady]);

    // 3. Magnetic CTA Button
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) return;

        const magnetic = magneticRef.current;
        if (!magnetic) return;

        let mouseX = 0;
        let mouseY = 0;
        let magneticX = 0;
        let magneticY = 0;
        let rect = magnetic.getBoundingClientRect();

        const onMouseMove = (e: MouseEvent) => {
            rect = magnetic.getBoundingClientRect();
            const elemX = rect.left + rect.width / 2;
            const elemY = rect.top + rect.height / 2;

            const dist = Math.sqrt(Math.pow(e.clientX - elemX, 2) + Math.pow(e.clientY - elemY, 2));

            if (dist < 100) {
                mouseX = (e.clientX - elemX) * 0.2;
                mouseY = (e.clientY - elemY) * 0.2;

                // limit inside 20px
                const magDist = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
                if (magDist > 20) {
                    mouseX = (mouseX / magDist) * 20;
                    mouseY = (mouseY / magDist) * 20;
                }

            } else {
                mouseX = 0;
                mouseY = 0;
            }
        };

        const onMouseLeave = () => {
            mouseX = 0;
            mouseY = 0;
        };

        const render = () => {
            magneticX += (mouseX - magneticX) * 0.1;
            magneticY += (mouseY - magneticY) * 0.1;

            if (magnetic) {
                magnetic.style.transform = `translate(${magneticX}px, ${magneticY}px)`;
            }
            requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', onMouseMove);
        magnetic.addEventListener('mouseleave', onMouseLeave);
        const frame = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            if (magnetic) {
                magnetic.removeEventListener('mouseleave', onMouseLeave);
            }
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <section
            id="home"
            ref={containerRef}
            className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 bg-background ${heroReady ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* 7. Noise Texture Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-50 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            ></div>

            {/* 5. Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-[400px] h-[400px] rounded-full top-[-10%] left-[-10%] opacity-15"
                    style={{ background: 'radial-gradient(circle, #4285F4 0%, transparent 70%)', filter: 'blur(80px)', animation: 'drift1 8s infinite alternate ease-in-out' }}
                ></div>
                <div
                    className="absolute w-[400px] h-[400px] rounded-full top-[-10%] right-[-10%] opacity-15"
                    style={{ background: 'radial-gradient(circle, #EA4335 0%, transparent 70%)', filter: 'blur(80px)', animation: 'drift2 10s infinite alternate ease-in-out' }}
                ></div>
                <div
                    className="absolute w-[400px] h-[400px] rounded-full bottom-[-10%] left-[50%] -translate-x-1/2 opacity-15"
                    style={{ background: 'radial-gradient(circle, #FBBC04 0%, transparent 70%)', filter: 'blur(80px)', animation: 'drift3 12s infinite alternate ease-in-out' }}
                ></div>
            </div>

            <style>{`
        @keyframes drift1 { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 30px); } }
        @keyframes drift2 { 0% { transform: translate(0, 0); } 100% { transform: translate(-40px, 40px); } }
        @keyframes drift3 { 0% { transform: translate(0, 0) translateX(-50%); } 100% { transform: translate(30px, -50px) translateX(-50%); } }
      `}</style>

            {/* 4. Canvas Particles */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full">

                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className="flex flex-wrap justify-center gap-[1vw] font-[800] tracking-tight leading-none mb-6 relative z-10"
                    style={{ fontFamily: "'Space Grotesk', 'Bricolage Grotesque', sans-serif", fontSize: 'clamp(3rem, 10vw, 12rem)' }}
                >
                    {[
                        { word: 'Think', color: '#FBBC04' },
                        { word: 'Build', color: '#4285F4' },
                        { word: 'Grow', color: '#34A853' }
                    ].map((item, i) => (
                        <span key={i} className="inline-block overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
                            <span className="hero-word inline-block transform translate-y-full px-1">
                                <span style={{ color: item.color }}>{item.word}</span>
                                <span style={{ color: '#EA4335' }}>.</span>
                            </span>
                        </span>
                    ))}
                </h1>

                {/* Subheading */}
                <p
                    ref={subheadingRef}
                    className="text-gray-900 max-w-2xl text-[1.125rem] md:text-xl font-medium mb-12 min-h-[3rem] relative z-10"
                >
                    Dive deep into the latest trends and innovations through talks, workshops, & more
                </p>

                {/* CTA Button */}
                <div ref={magneticRef} className="inline-block z-20">
                    <button
                        ref={buttonRef}
                        className="rounded-full px-8 py-4 font-bold text-white transition-all duration-300"
                        style={{
                            background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)',
                            backgroundSize: '200% auto',
                            boxShadow: '0 0 20px rgba(66, 133, 244, 0.4)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(66, 133, 244, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.4)';
                        }}
                        onClick={() => window.open('https://www.commudle.com/communities/gdg-noida', '_blank', 'noopener,noreferrer')}
                    >
                        Join Community
                    </button>
                </div>
            </div>
        </section>
    );
}
