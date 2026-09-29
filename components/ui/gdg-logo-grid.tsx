import { cn } from "@/lib/utils";

// Pixel map for "GDG" — each string is a row, each character is a cell.
// B = Google Blue, R = Google Red, Y = Google Yellow, . = transparent.
const GDG_PIXEL_MAP = [
  "BBB...RRR...YYY",
  "B.....R.....Y..",
  "B.....R.....Y..",
  "B.BB.R..Y..Y...",
  "B..R..R...Y.Y..",
  "B..R..R...Y.Y..",
  "BBB...RRR...YYY",
];

const CELL_COLORS: Record<string, string> = {
  B: "#4285F4",
  R: "#EA4335",
  Y: "#FBBC04",
};

export function GDGLogoGrid({ className }: { className?: string }) {
  const cols = GDG_PIXEL_MAP[0].length;
  const rows = GDG_PIXEL_MAP.length;

  return (
    <div
      aria-hidden
      className={cn("grid gap-[4px]", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        aspectRatio: `${cols} / ${rows}`,
      }}
    >
      {GDG_PIXEL_MAP.flatMap((row, rowIdx) =>
        row.split("").map((cell, colIdx) => {
          if (cell === ".") {
            return <div key={`${rowIdx}-${colIdx}`} className="size-full" />;
          }
          const color = CELL_COLORS[cell] ?? "#4285F4";
          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              className="size-full rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          );
        })
      )}
    </div>
  );
}
