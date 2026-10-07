"use client";

import LogoLoop from "@/components/LogoLoop";

type Sponsor = { name: string; image?: string | null; url?: string | null };

/* The logo strip colour and the marquee's edge-fade colour must be identical. */
const STRIP = "#f8f9fc";

/* A scrolling marquee looks odd with only a few logos, so below this
   count the logos render as a static, centred row of tiles. */
const MARQUEE_MIN = 5;

const logoSrc = (s: Sponsor) =>
    s.image || `/assets/sponsors/${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.svg` || `/assets/sponsors/${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.avif`;

export default function SponsorsSection({ sponsors }: { sponsors: Sponsor[] }) {
    if (sponsors.length === 0) return null;

    const logos = sponsors.map((s) => ({
        src: logoSrc(s),
        alt: s.name,
        title: s.name,
        href: s.url ?? undefined,
    }));

    return (
        <section
            aria-labelledby="sponsors-heading"
            className="overflow-hidden rounded-[1.75rem] border border-[#d6dbe4] bg-white sm:rounded-[2.25rem]"
        >
            {/* Heading: centred and bold, like the other section headings */}
            <div className="px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10 lg:px-12">
                <h2
                    id="sponsors-heading"
                    className="break-words text-center text-2xl leading-tight tracking-tight text-[#14181f] sm:text-3xl md:text-4xl lg:text-5xl"
                    style={{ fontFamily: "'Product Sans', 'Inter', sans-serif", fontWeight: 700 }}
                >
                    Our sponsors
                </h2>
            </div>

            {/* Logo strip: its own tinted surface, separated by the same dashed rule the hero uses */}
            <div
                className="border-t border-dashed border-[#d6dbe4] py-8 sm:py-10"
                style={{ background: STRIP }}
            >
                {logos.length >= MARQUEE_MIN ? (
                    <LogoLoop
                        // @ts-ignore
                        logos={logos}
                        speed={60}
                        direction="left"
                        logoHeight={36}
                        gap={56}
                        pauseOnHover
                        scaleOnHover
                        fadeOut
                        fadeOutColor={STRIP}
                    />
                ) : (
                    <ul className="flex flex-wrap items-center justify-center gap-3 px-5 sm:gap-4 sm:px-8 lg:px-12">
                        {logos.map((logo) => {
                            const tile =
                                "flex h-20 min-w-[9rem] items-center justify-center rounded-2xl border border-[#d6dbe4] bg-white px-6 transition-shadow duration-300 hover:shadow-[0_12px_28px_-14px_rgba(20,24,31,0.35)]";
                            const img = (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    title={logo.title}
                                    loading="lazy"
                                    className="h-9 w-auto max-w-[10rem] object-contain"
                                />
                            );
                            return (
                                <li key={logo.title}>
                                    {logo.href ? (
                                        <a
                                            href={logo.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={logo.title}
                                            className={`${tile} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2`}
                                        >
                                            {img}
                                        </a>
                                    ) : (
                                        <div className={tile}>{img}</div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}