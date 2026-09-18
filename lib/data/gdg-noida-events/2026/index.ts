import { agenticPremiereLeague } from "./agentic-premiere-league";
import { dataAndAiNexus70 } from "./data-and-ai-nexus-7-0";
import { designSamvaad2026 } from "./design-samvaad-2026";
import { devfestNoida2026 } from "./devfest-noida-2026";
import { foundAndFixedSearchAndObservability } from "./found-and-fixed-search-and-observability";
import { womenSDay2026BreakThePattern } from "./women-s-day-2026-break-the-pattern";

export {
  agenticPremiereLeague,
  dataAndAiNexus70,
  designSamvaad2026,
  devfestNoida2026,
  foundAndFixedSearchAndObservability,
  womenSDay2026BreakThePattern,
};

export const events2026 = [
  { id: "devfest-noida-2026", ...devfestNoida2026["2026"] },
  { id: "agentic-premiere-league", ...agenticPremiereLeague["2026"] },
  { id: "data-and-ai-nexus-7-0", ...dataAndAiNexus70["2026"] },
  { id: "design-samvaad-2026", ...designSamvaad2026["2026"] },
  { id: "found-and-fixed-search-and-observability", ...foundAndFixedSearchAndObservability["2026"] },
  { id: "women-s-day-2026-break-the-pattern", ...womenSDay2026BreakThePattern["2026"] },
];
