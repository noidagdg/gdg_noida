"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type GridPulseProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
> & {
  /** Cell size in px. The hairlines and the lit cells share it. */
  cell?: number;
  /** How far from the pointer a cell can still catch light, in cells. */
  reach?: number;
  /** How many cells light on their own each beat, so the grid is never dead. */
  ambient?: number;
  /** A lid, so a fast sweep cannot light the whole field at once. */
  maxLit?: number;
  /**
   * Elements whose lines of text the light holds back from, looked up
   * inside the grid's parent.
   */
  avoid?: string;
};

/** Hue at the top of the field and how far it turns by the bottom: yellow,
 *  through orange, red, magenta and blue, to green. */
const HUE_TOP = 60;
const HUE_SPAN = 270;
/**
 * Each cell takes one of these lightnesses, so a sweep reads as a field of
 * tints rather than one flat colour. On a dark ground the pale end of the
 * ladder would fade through grey, so it starts deeper there.
 */
const TINTS = [55, 48, 41, 34, 27];
const TINTS_DARK = [72, 65, 58, 51, 44];
const GOOGLE_BLUE = "#4285F4";
const GOOGLE_RED = "#EA4335";
const GOOGLE_YELLOW = "#FBBC04";
const GOOGLE_GREEN = "#34A853";

function lerpColor(color1: string, color2: string, ratio: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
/** How faint a cell goes right behind a line of text. */
const FAINT = 0.13;
/** How many cells it takes to come back up to full strength. */
const FADE = 2.2;
/** Clearing kept around each line of text, in px. */
const PAD = 5;
const FADE_IN = 160;
const FADE_OUT = 750;

// High-resolution hollow bracket pattern (< >)
const GDG_LOGO: string[] = [
  "........XXXXX.............XXXXX........",
  ".......XXXXX...............XXXXX.......",
  "......XXXXX.................XXXXX......",
  "....XXXXX.....................XXXXX....",
  "...XXXXX.......................XXXXX...",
  "..XXXXX.........................XXXXX..",
  ".XXXXX...........................XXXXX.",
  "XXXXX.............................XXXXX",
  "XXXXX.............................XXXXX",
  ".XXXXX...........................XXXXX.",
  "..XXXXX.........................XXXXX..",
  "...XXXXX.......................XXXXX...",
  "....XXXXX.....................XXXXX....",
  "......XXXXX.................XXXXX......",
  ".......XXXXX...............XXXXX.......",
  "........XXXXX.............XXXXX........",
];

type Cell = {
  col: number;
  row: number;
  colour: string;
  /** How much of its colour the cell is allowed, 0 to 1. */
  dim: number;
  born: number;
  /** When it starts to fade out. */
  until: number;
};

const easeOut = (t: number) => 1 - (1 - t) ** 2;
const easeIn = (t: number) => t * t;

export function GridPulse({
  cell = 24,
  reach = 2.6,
  ambient = 2,
  maxLit = 180,
  avoid = "[data-grid-avoid]",
  className,
  style,
  ...props
}: GridPulseProps) {
  const box = React.useRef<HTMLDivElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const el = box.current;
    const paper = canvas.current;
    const ctx = paper?.getContext("2d");
    if (!el || !paper || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cols = 1;
    let rows = 1;
    let width = 0;
    let height = 0;
    let clear: DOMRect[] = [];
    let tints = TINTS;

    // Dynamic interactive cells (hover / ambient)
    const cells = new Map<string, Cell>();
    // Fixed permanent cells (GDG logo) stored separately so maxLit is ignored
    const logoCells = new Map<string, Cell>();

    const probe = document.createElement("canvas").getContext("2d", {
      willReadFrequently: true,
    });
    const readTheme = () => {
      if (!probe) return;
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = getComputedStyle(el).color;
      probe.fillRect(0, 0, 1, 1);
      const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
      const light = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5;
      tints = light ? TINTS_DARK : TINTS;
    };

    const brightness = (col: number, row: number) => {
      const x = col * cell + cell / 2;
      const y = row * cell + cell / 2;
      let nearest = Number.POSITIVE_INFINITY;
      for (const r of clear) {
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        nearest = Math.min(nearest, Math.hypot(dx, dy));
        if (nearest === 0) break;
      }
      if (nearest === Number.POSITIVE_INFINITY) return 1;
      return FAINT + (1 - FAINT) * Math.min(1, nearest / (FADE * cell));
    };

    let frame = 0;
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const measureText = () => {
      const bounds = el.getBoundingClientRect();
      const scope = el.parentElement ?? document;
      clear = [...scope.querySelectorAll(avoid)].flatMap((node) => {
        const range = document.createRange();
        range.selectNodeContents(node);
        const lines = [...range.getClientRects()].filter(
          (r) => r.width > 0 && r.height > 0,
        );
        const boxes = lines.length > 0 ? lines : [node.getBoundingClientRect()];
        return boxes.map(
          (r) =>
            new DOMRect(
              r.left - bounds.left - PAD,
              r.top - bounds.top - PAD,
              r.width + PAD * 2,
              r.height + PAD * 2,
            ),
        );
      });
      // Text moved (fonts loaded, copy changed): re-dim the permanent logo
      // cells too, otherwise they keep the clearing from the first measure.
      for (const c of logoCells.values()) c.dim = brightness(c.col, c.row);
      wake();
    };

    const ink = (row: number) => {
      const t = rows > 1 ? Math.min(1, row / (rows - 1)) : 0;
      const hue = (((HUE_TOP - t * HUE_SPAN) % 360) + 360) % 360;
      const tint = tints[Math.floor(Math.random() * tints.length)];
      return `hsl(${Math.round(hue)} 94% ${tint}%)`;
    };

    const seedLogo = () => {
      logoCells.clear();
      const logoRows = GDG_LOGO.length;
      const logoCols = GDG_LOGO[0].length;
      const startCol = Math.floor((cols - logoCols) / 2);
      const startRow = Math.floor((rows - logoRows) / 2);
      const now = performance.now();
      const midpointCol = startCol + Math.floor(logoCols / 2);

      for (let r = 0; r < logoRows; r++) {
        for (let c = 0; c < logoCols; c++) {
          if (GDG_LOGO[r][c] === ".") continue;
          const col = startCol + c;
          const row = startRow + r;
          if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
          let colour;
          if (col < midpointCol) {
            // left half: gradient from red to blue based on vertical position
            const ratio = logoRows > 1 ? r / (logoRows - 1) : 0;
            colour = lerpColor(GOOGLE_RED, GOOGLE_BLUE, ratio);
          } else {
            // right half: gradient from yellow to green based on vertical position
            const ratio = logoRows > 1 ? r / (logoRows - 1) : 0;
            colour = lerpColor(GOOGLE_YELLOW, GOOGLE_GREEN, ratio);
          }
          logoCells.set(`${col},${row}`, {
            col,
            row,
            colour,
            dim: brightness(col, row),
            born: now,
            until: Number.POSITIVE_INFINITY,
          });
        }
      }
    };

    const measure = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      cols = Math.max(1, Math.ceil(width / cell));
      rows = Math.max(1, Math.ceil(height / cell));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      paper.width = Math.round(width * dpr);
      paper.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readTheme();
      measureText();
      seedLogo();
      wake();
    };

    const draw = (now: number) => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      // Only the moving cells keep the loop alive. The logo is static, so once
      // everything else has faded the last frame (logo included) just stays.
      let animating = false;

      // 1. Hover & ambient cells
      for (const [key, c] of cells) {
        let alpha: number;

        if (now < c.until) {
          alpha = easeOut(Math.min(1, (now - c.born) / FADE_IN));
        } else {
          const t = (now - c.until) / FADE_OUT;
          if (t >= 1) {
            cells.delete(key);
            continue;
          }
          alpha = 1 - easeIn(t);
        }
        animating = true;

        ctx.globalAlpha = alpha * c.dim;
        ctx.fillStyle = c.colour;
        ctx.fillRect(c.col * cell + 1, c.row * cell + 1, cell - 1, cell - 1);
      }

      // 2. Permanent logo cells on top
      for (const c of logoCells.values()) {
        ctx.globalAlpha = c.dim;
        ctx.fillStyle = c.colour;
        ctx.fillRect(c.col * cell + 1, c.row * cell + 1, cell - 1, cell - 1);
      }

      ctx.globalAlpha = 1;
      if (animating) frame = requestAnimationFrame(draw);
    };

    const light = (col: number, row: number, hold: number) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows) return;
      if (cells.size >= maxLit) return;
      const key = `${col},${row}`;
      const now = performance.now();
      const lit = cells.get(key);
      if (lit && now < lit.until) return;

      let born = now;
      if (lit) {
        const faded = 1 - easeIn(Math.min(1, (now - lit.until) / FADE_OUT));
        born = now - (1 - Math.sqrt(1 - faded)) * FADE_IN;
      }
      cells.set(key, {
        col,
        row,
        colour: lit?.colour ?? ink(row),
        dim: brightness(col, row),
        born,
        until: now + hold,
      });
      wake();
    };

    let pending = 0;
    let at: { x: number; y: number } | null = null;
    const paint = () => {
      pending = 0;
      if (!at) return;
      const cx = Math.floor(at.x / cell);
      const cy = Math.floor(at.y / cell);
      const span = Math.ceil(reach);
      for (let dy = -span; dy <= span; dy++) {
        for (let dx = -span; dx <= span; dx++) {
          const away = Math.hypot(dx, dy);
          if (away > reach) continue;
          if (Math.random() > 1 - away / (reach + 0.6)) continue;
          light(cx + dx, cy + dy, 260 + Math.random() * 900);
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      const bounds = el.getBoundingClientRect();
      at = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (!pending) pending = requestAnimationFrame(paint);
    };

    let visible = true;
    let beat = 0;
    const drift = () => {
      beat = window.setTimeout(drift, 1400 + Math.random() * 1800);
      if (!visible || document.hidden) return;
      for (let i = 0; i < ambient; i++) {
        light(
          Math.floor(Math.random() * cols),
          Math.floor(Math.random() * rows),
          900 + Math.random() * 1600,
        );
      }
    };
    beat = window.setTimeout(drift, 500);

    const sight = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    sight.observe(el);
    const resize = new ResizeObserver(measure);
    resize.observe(el);

    let recheck = 0;
    const copy = new MutationObserver(() => {
      if (!recheck) {
        recheck = requestAnimationFrame(() => {
          recheck = 0;
          measureText();
        });
      }
    });
    copy.observe(el.parentElement ?? document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    const theme = new MutationObserver(readTheme);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", readTheme);
    measure();

    document.fonts?.ready.then(measureText).catch(() => {});
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      sight.disconnect();
      resize.disconnect();
      copy.disconnect();
      cancelAnimationFrame(recheck);
      theme.disconnect();
      scheme.removeEventListener("change", readTheme);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pending);
      clearTimeout(beat);
      window.removeEventListener("pointermove", onMove);
    };
  }, [cell, reach, ambient, maxLit, avoid]);

  return (
    <div
      ref={box}
      aria-hidden
      data-slot="grid-pulse"
      className={cn(
        // Fixed black ground with white ink: the tint ladder in readTheme keys
        // off this element's own `color`, so it must be light here.
        "pointer-events-none absolute inset-0 overflow-hidden bg-black text-white",
        // color-mix needs two colours; the second one was missing, which made
        // the whole declaration invalid and the hairlines disappear.
        "[--grid-pulse-line:color-mix(in_oklab,white_10%,transparent)]",
        // Same problem: a single-stop gradient is a solid fill, so nothing faded.
        "[mask-image:linear-gradient(to_bottom,#000_92%,transparent)]",
        className,
      )}
      style={
        {
          "--grid-pulse-cell": `${cell}px`,
          backgroundImage:
            "linear-gradient(to right, var(--grid-pulse-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-pulse-line) 1px, transparent 1px)",
          backgroundSize: "var(--grid-pulse-cell) var(--grid-pulse-cell)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <canvas ref={canvas} className="absolute inset-0 size-full" />
    </div>
  );
}