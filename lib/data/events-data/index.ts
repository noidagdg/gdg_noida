import { gdgNoidaEvents } from "../gdg-noida-events";
import type { EventData } from "./types";

export type {
  EventData,
  EventsCatalog,
  EventSpeaker,
  EventSession,
  EventTrack,
  EventStat,
  AttendeeDistribution,
  EventReview,
  GalleryCategory,
  GalleryImage,
} from "./types";

// ─── Event Series Definition ────────────────────────────────────────────────

export interface EventSeries {
  id: string;
  name: string;
  brandColor: string;
  availableYears: string[];
  defaultYear: string;
}

// ─── Series Configuration ───────────────────────────────────────────────────
//
// Each series groups related events by their slugs from gdgNoidaEvents.
// Year keys are extracted dynamically from the data — no hardcoding needed.

interface SeriesConfig {
  id: string;
  name: string;
  brandColor: string;
  eventSlugs: string[];
}

const seriesConfigs: SeriesConfig[] = [
  // ── Flagship: DevFest Noida (2022–2026) ─────────────────────────────────
  {
    id: "devfest",
    name: "DevFest Noida",
    brandColor: "#4285F4",
    eventSlugs: [
      "devfest-noida-2022",
      "devfest-noida-2023",
      "devfest-noida-2024",
      "devfest-noida-2025",
      "devfest-noida-2026",
    ],
  },

  // ── Design Samvaad (2023–2026) ──────────────────────────────────────────
  {
    id: "design-samvaad",
    name: "Design Samvaad",
    brandColor: "#EA4335",
    eventSlugs: [
      "design-samvaad-beyond-aesthetics", // 2023
      "design-samwaad-2-0",               // 2024
      "design-samvaad",                   // 2025
      "design-samvaad-2026",              // 2026
    ],
  },

  // ── Data & AI Nexus (unique years only — no collisions) ─────────────────
  {
    id: "data-ai-nexus",
    name: "Data & AI Nexus",
    brandColor: "#34A853",
    eventSlugs: [
      "data-and-ai-nexus-4-0",  // 2024
      "data-and-ai-nexus-5-0",  // 2025
      "data-and-ai-nexus-7-0",  // 2026
    ],
  },

  // ── Data & GenAI Nexus (separate series — 2023 & 2024) ──────────────────
  {
    id: "data-genai-nexus",
    name: "Data & GenAI Nexus",
    brandColor: "#0F9D58",
    eventSlugs: [
      "the-data-gen-ai-nexus",                                        // 2023
      "the-data-gen-ai-nexus-110096fe-1715-452c-acc2-4d8936b385be",   // 2024
    ],
  },

  // ── Women's Day / IWD (2024–2026) ───────────────────────────────────────
  {
    id: "womens-day",
    name: "Women's Day",
    brandColor: "#E91E63",
    eventSlugs: [
      "impact-the-future-women-s-day-2024", // 2024
      "redefine-possible-iwd-2025",         // 2025
      "women-s-day-2026-break-the-pattern", // 2026
    ],
  },

  // ── Google I/O Extended (2023–2024) ─────────────────────────────────────
  {
    id: "io-extended",
    name: "Google I/O Extended",
    brandColor: "#FBBC04",
    eventSlugs: [
      "io-extended-noida-5c9dab9b-95cc-4028-acc2-3c06653b493f", // 2023
      "google-io-extended-97e25a74-bdcb-47f2-b226-e48eb149944e", // 2024
    ],
  },

  // ── Product Events (2024–2025) ──────────────────────────────────────────
  {
    id: "product-events",
    name: "Product Events",
    brandColor: "#FF6D00",
    eventSlugs: [
      "the-product-playground", // 2024
      "the-product-mixer",      // 2025
    ],
  },

  // ── Standalone events — each gets its own year key ──────────────────────
  {
    id: "data-science-meetup",
    name: "Data Science Meetup",
    brandColor: "#34A853",
    eventSlugs: ["data-science-meetup"], // 2023
  },
  {
    id: "women-in-cloud",
    name: "Women in Cloud",
    brandColor: "#E91E63",
    eventSlugs: ["women-in-cloud"], // 2022
  },
  {
    id: "gdg-noida-launch",
    name: "GDG Noida Launch",
    brandColor: "#4285F4",
    eventSlugs: ["gdg-noida-launch"], // 2022
  },
  {
    id: "google-io-streaming-party",
    name: "Google I/O Streaming Party",
    brandColor: "#FBBC04",
    eventSlugs: ["google-io-streaming-party"], // 2024
  },
  {
    id: "startup-success-days",
    name: "Startup Success Days",
    brandColor: "#4285F4",
    eventSlugs: ["startup-success-days-noida"], // 2024
  },
  {
    id: "journey-into-open-source",
    name: "Journey Into Open Source",
    brandColor: "#34A853",
    eventSlugs: ["journey-into-open-source"], // 2025
  },
  {
    id: "found-and-fixed",
    name: "Found & Fixed",
    brandColor: "#4285F4",
    eventSlugs: ["found-and-fixed-search-and-observability"], // 2026
  },
  {
    id: "indiafoss",
    name: "IndiaFOSS 2.0",
    brandColor: "#34A853",
    eventSlugs: ["indiafoss-2-0"], // 2022
  },
  {
    id: "bhasha-techathon",
    name: "Bhasha Techathon",
    brandColor: "#4285F4",
    eventSlugs: ["bhasha-techathon-launch-event"], // 2024
  },
  {
    id: "agentic-premiere-league",
    name: "Agentic Premiere League",
    brandColor: "#4285F4",
    eventSlugs: ["agentic-premiere-league"], // 2026
  },
  {
    id: "dpg-dialogues",
    name: "DPG Dialogues",
    brandColor: "#34A853",
    eventSlugs: ["dpg-dialogues"], // year 0
  },
  {
    id: "design-mixer",
    name: "Design Mixer",
    brandColor: "#EA4335",
    eventSlugs: ["design-mixer"], // year 0
  },
];

// ─── Build the Event Catalog ────────────────────────────────────────────────
//
// Merges individual event data into series-based groups:
//   eventCatalog[seriesId][yearKey] → EventData

function buildCatalog(): Record<string, Record<string, EventData>> {
  const catalog: Record<string, Record<string, EventData>> = {};

  for (const series of seriesConfigs) {
    const yearMap: Record<string, EventData> = {};

    for (const slug of series.eventSlugs) {
      const eventEntry = gdgNoidaEvents[slug];
      if (!eventEntry) continue;

      for (const [yearKey, data] of Object.entries(eventEntry)) {
        yearMap[yearKey] = data as EventData;
      }
    }

    catalog[series.id] = yearMap;
  }

  return catalog;
}

export const eventCatalog = buildCatalog();

// ─── Build the Series List ──────────────────────────────────────────────────

function buildSeriesList(): EventSeries[] {
  return seriesConfigs
    .map((config) => {
      const years = Object.keys(eventCatalog[config.id]).sort(
        (a, b) => Number(a) - Number(b),
      );

      if (years.length === 0) return null;

      return {
        id: config.id,
        name: config.name,
        brandColor: config.brandColor,
        availableYears: years,
        defaultYear: years[years.length - 1],
      };
    })
    .filter((s): s is EventSeries => s !== null);
}

export const eventSeriesList = buildSeriesList();
