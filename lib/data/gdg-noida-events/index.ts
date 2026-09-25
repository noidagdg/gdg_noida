import type { EventsCatalog, EventData } from "../events-data/types";

// Year-based collections
import { events2022, devfestNoida2022, gdgNoidaLaunch, indiafoss20, womenInCloud } from "./2022";
import { events2023, dataScienceMeetup, designSamvaadBeyondAesthetics, devfestNoida2023, ioExtendedNoida5c9dab9b95cc4028Acc23c06653b493f, theDataGenAiNexus } from "./2023";
import { events2024, bhashaTechathonLaunchEvent, dataAndAiNexus40, designSamwaad20, devfestNoida2024, googleIoExtended97e25a74Bdcb47f2B226E48eb149944e, googleIoStreamingParty, impactTheFutureWomenSDay2024, startupSuccessDaysNoida, theDataGenAiNexus110096fe1715452cAcc24d8936b385be, theProductPlayground } from "./2024";
import { events2025, dataAndAiNexus50, designSamvaad, devfestNoida2025, journeyIntoOpenSource, redefinePossibleIwd2025, theProductMixer } from "./2025";
import { events2026, agenticPremiereLeague, dataAndAiNexus70, designSamvaad2026, devfestNoida2026, foundAndFixedSearchAndObservability, womenSDay2026BreakThePattern } from "./2026";
import { eventsOther, designMixer, dpgDialogues } from "./other";

export {
  events2022,
  events2023,
  events2024,
  events2025,
  events2026,
  eventsOther,
};

export type EventItem = EventData & { id: string };

export const eventsByYear: Record<number, EventItem[]> = {
  2026: events2026 as EventItem[],
  2025: events2025 as EventItem[],
  2024: events2024 as EventItem[],
  2023: events2023 as EventItem[],
  2022: events2022 as EventItem[],
};

export const allEvents: EventItem[] = [
  ...events2026,
  ...events2025,
  ...events2024,
  ...events2023,
  ...events2022,
  ...eventsOther,
] as EventItem[];

export function getEventById(id: string): EventItem | undefined {
  const cleanId = id.toLowerCase().trim();
  const normalized = cleanId.replace(/[-_]/g, "");
  return (
    allEvents.find((e) => e.id.toLowerCase() === cleanId) ||
    allEvents.find((e) => e.id.toLowerCase().replace(/[-_]/g, "") === normalized) ||
    allEvents.find((e) => {
      const eNorm = e.id.toLowerCase().replace(/[-_]/g, "");
      return eNorm.includes(normalized) || normalized.includes(eNorm);
    })
  );
}

export const gdgNoidaEvents: EventsCatalog = {
  "agentic-premiere-league": agenticPremiereLeague,
  "bhasha-techathon-launch-event": bhashaTechathonLaunchEvent,
  "data-and-ai-nexus-4-0": dataAndAiNexus40,
  "data-and-ai-nexus-5-0": dataAndAiNexus50,
  "data-and-ai-nexus-7-0": dataAndAiNexus70,
  "data-science-meetup": dataScienceMeetup,
  "design-mixer": designMixer,
  "design-samvaad": designSamvaad,
  "design-samvaad-2026": designSamvaad2026,
  "design-samvaad-beyond-aesthetics": designSamvaadBeyondAesthetics,
  "design-samwaad-2-0": designSamwaad20,
  "devfest-noida-2022": devfestNoida2022,
  "devfest-noida-2023": devfestNoida2023,
  "devfest-noida-2024": devfestNoida2024,
  "devfest-noida-2025": devfestNoida2025,
  "devfest-noida-2026": devfestNoida2026,
  "dpg-dialogues": dpgDialogues,
  "found-and-fixed-search-and-observability": foundAndFixedSearchAndObservability,
  "gdg-noida-launch": gdgNoidaLaunch,
  "google-io-extended-97e25a74-bdcb-47f2-b226-e48eb149944e": googleIoExtended97e25a74Bdcb47f2B226E48eb149944e,
  "google-io-streaming-party": googleIoStreamingParty,
  "impact-the-future-women-s-day-2024": impactTheFutureWomenSDay2024,
  "indiafoss-2-0": indiafoss20,
  "io-extended-noida-5c9dab9b-95cc-4028-acc2-3c06653b493f": ioExtendedNoida5c9dab9b95cc4028Acc23c06653b493f,
  "journey-into-open-source": journeyIntoOpenSource,
  "redefine-possible-iwd-2025": redefinePossibleIwd2025,
  "startup-success-days-noida": startupSuccessDaysNoida,
  "the-data-gen-ai-nexus": theDataGenAiNexus,
  "the-data-gen-ai-nexus-110096fe-1715-452c-acc2-4d8936b385be": theDataGenAiNexus110096fe1715452cAcc24d8936b385be,
  "the-product-mixer": theProductMixer,
  "the-product-playground": theProductPlayground,
  "women-in-cloud": womenInCloud,
  "women-s-day-2026-break-the-pattern": womenSDay2026BreakThePattern,
};
