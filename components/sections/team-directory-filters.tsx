"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TeamFilter = {
  id: string;
  name: string;
  slug: string;
  href: string;
  active: boolean;
  color?: string;
};

export default function TeamDirectoryFilters({ teams }: { teams: TeamFilter[] }) {
  const filtersRef = useRef<HTMLUListElement>(null);
  const chipRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update scroll state for left/right buttons
  useEffect(() => {
    const filters = filtersRef.current;
    if (!filters) return;

    const updateScrollState = () => {
      const maxScrollLeft = filters.scrollWidth - filters.clientWidth;
      setCanScrollLeft(filters.scrollLeft > 1);
      setCanScrollRight(filters.scrollLeft < maxScrollLeft - 1);
    };

    updateScrollState();
    filters.addEventListener("scroll", updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(filters);

    return () => {
      filters.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [teams.length]);

  // Scroll to active chip when teams change
  useEffect(() => {
    const activeChipId = teams.find((t) => t.active)?.id;
    if (!activeChipId || !chipRefs.current.has(activeChipId)) return;

    const filters = filtersRef.current;
    const activeChip = chipRefs.current.get(activeChipId);
    if (!filters || !activeChip) return;

    const chipRect = activeChip.getBoundingClientRect();
    const filtersRect = filters.getBoundingClientRect();
    const scrollOffset =
      chipRect.left - filtersRect.left + (chipRect.width - filtersRect.width) / 2;

    filters.scrollTo({
      left: filters.scrollLeft + scrollOffset,
      behavior: "smooth",
    });
  }, [teams]);

  const scrollFilters = (direction: "left" | "right") => {
    const filters = filtersRef.current;
    if (!filters) return;

    // Scroll by approximately one chip width (or a fixed amount if chips vary)
    // We'll use the width of the first chip as reference, or fallback to 100px
    let scrollAmount = 100; // default fallback
    if (filters.firstElementChild) {
      const firstChip = filters.firstElementChild as HTMLElement;
      scrollAmount = firstChip.clientWidth + 24; // chip width plus gap (gap-2 -> 0.5rem = 8px, but we have gap-2 on ul? Actually gap-2 is 0.5rem = 8px, but we have margin? We'll just use clientWidth which includes horizontal padding? We'll add the gap from CSS: the ul has gap-2 (0.5rem = 8px) between chips. So scrolling by chipWidth + gap should move one chip.
    }

    const scrollDelta = direction === "left" ? -scrollAmount : scrollAmount;

    filters.scrollBy({
      left: scrollDelta,
      behavior: "smooth",
    });
  };

  return (
    <nav aria-label="Filter by team" className="mt-3">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          aria-label="Scroll team filters left"
          onClick={() => scrollFilters("left")}
          disabled={!canScrollLeft}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1d1a17] bg-white text-[#1d1a17] disabled:cursor-not-allowed disabled:opacity-35 md:hidden"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <ul
          ref={filtersRef}
          className="flex min-w-0 flex-1 flex-nowrap gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"
        >
          {teams.map((team) => (
            <li
              key={team.id}
              className="shrink-0"
              ref={(element) => {
                if (element) {
                  chipRefs.current.set(team.id, element);
                  return () => {
                    chipRefs.current.delete(team.id);
                  };
                }
              }}
            >
              <Link
                href={team.href}
                aria-current={team.active ? "page" : undefined}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border-[2px] px-4 py-2 text-sm font-medium transition ${
                  team.active
                    ? "border-[#1d1a17] bg-[#1d1a17] text-[#f5f2ec]"
                    : "border-[#1d1a17] bg-white text-[#1d1a17]"
                }`}
              >
                {team.slug && (
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />
                )}
                {team.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Scroll team filters right"
          onClick={() => scrollFilters("right")}
          disabled={!canScrollRight}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1d1a17] bg-white text-[#1d1a17] disabled:cursor-not-allowed disabled:opacity-35 md:hidden"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}