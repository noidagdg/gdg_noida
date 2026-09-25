import type Lenis from "lenis";

/**
 * Scroll to an element (or absolute offset) through Lenis so the motion matches
 * the site's wheel smoothing. Falls back to the browser's native smooth scroll
 * when no instance is available yet — e.g. a click landing before the root
 * provider has mounted.
 *
 * @param offset Pixels to shift the final position by; negative values leave
 *               room for the fixed navbar.
 */
export function smoothScrollTo(
  lenis: Lenis | undefined,
  target: HTMLElement | number,
  offset = 0,
) {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }

  const top =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({ top: top + offset, behavior: "smooth" });
}
