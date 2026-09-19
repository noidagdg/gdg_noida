import { dataAndAiNexus50 } from "./data-and-ai-nexus-5-0";
import { designSamvaad } from "./design-samvaad";
import { devfestNoida2025 } from "./devfest-noida-2025";
import { journeyIntoOpenSource } from "./journey-into-open-source";
import { redefinePossibleIwd2025 } from "./redefine-possible-iwd-2025";
import { theProductMixer } from "./the-product-mixer";

export {
  dataAndAiNexus50,
  designSamvaad,
  devfestNoida2025,
  journeyIntoOpenSource,
  redefinePossibleIwd2025,
  theProductMixer,
};

export const events2025 = [
  { id: "devfest-noida-2025", ...devfestNoida2025["2025"] },
  { id: "design-samvaad", ...designSamvaad["2025"] },
  { id: "the-product-mixer", ...theProductMixer["2025"] },
  { id: "journey-into-open-source", ...journeyIntoOpenSource["2025"] },
  { id: "data-and-ai-nexus-5-0", ...dataAndAiNexus50["2025"] },
  { id: "redefine-possible-iwd-2025", ...redefinePossibleIwd2025["2025"] },
];
