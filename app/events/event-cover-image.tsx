"use client";

import { useState } from "react";
import Image from "next/image";

interface EventCoverImageProps {
    src: string;
    alt: string;
    className: string;
    sizes: string;
    priority?: boolean;
    blurredBackdrop?: boolean;
}

function coverImageHash(value: string) {
    let hash = 5381;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash * 33) ^ value.charCodeAt(index);
    }

    return (hash >>> 0).toString(36);
}

export default function EventCoverImage({
    src,
    alt,
    className,
    sizes,
    priority = false,
    blurredBackdrop = false,
}: EventCoverImageProps) {
    const [hasFailed, setHasFailed] = useState(false);
    const localSrc = src.startsWith("http")
        ? `/assets/event-covers/${coverImageHash(src)}.webp`
        : src;

    if (!src || hasFailed) {
        return (
            <div role="img" aria-label={`${alt} event cover`} className="absolute inset-0 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#174ea6] via-[#1a73e8] to-[#0b57d0] p-5 text-white sm:p-7">
                <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border-[28px] border-white/10" aria-hidden="true" />
                <div className="absolute right-12 top-12 h-16 w-16 rounded-full bg-[#fbbc04]/80 blur-xl" aria-hidden="true" />
                <span className="relative mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">GDG Noida</span>
                <strong className="relative line-clamp-3 max-w-[85%] text-xl leading-tight sm:text-2xl">{alt}</strong>
            </div>
        );
    }

    return (
        <>
            {blurredBackdrop && (
                <Image
                    src={localSrc}
                    alt=""
                    aria-hidden="true"
                    fill
                    loading="lazy"
                    decoding="async"
                    quality={30}
                    sizes={sizes}
                    className="pointer-events-none scale-110 object-cover blur-xl brightness-75"
                />
            )}
            <Image
                src={localSrc}
                alt={alt}
                fill
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                quality={60}
                sizes={sizes}
                className={className}
                onError={() => setHasFailed(true)}
            />
        </>
    );
}
