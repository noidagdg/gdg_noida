/**
 * Film grain as an inline SVG data URI, so there is no texture file to ship.
 * `feTurbulence` supplies the noise and `feColorMatrix saturate=0` strips the
 * colour speckle so it reads as grain rather than confetti.
 *
 * Encoded at import time so callers never have to hand-escape `#` and `%`,
 * which is the usual way these data URIs break.
 */
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='g'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#g)' opacity='0.32'/>" +
  "</svg>";

export const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

/** Tile size for {@link GRAIN}. Matches the SVG's own dimensions. */
export const GRAIN_SIZE = "160px 160px";
