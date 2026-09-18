import { dataScienceMeetup } from "./data-science-meetup";
import { designSamvaadBeyondAesthetics } from "./design-samvaad-beyond-aesthetics";
import { devfestNoida2023 } from "./devfest-noida-2023";
import { ioExtendedNoida5c9dab9b95cc4028Acc23c06653b493f } from "./io-extended-noida-5c9dab9b-95cc-4028-acc2-3c06653b493f";
import { theDataGenAiNexus } from "./the-data-gen-ai-nexus";

export {
  dataScienceMeetup,
  designSamvaadBeyondAesthetics,
  devfestNoida2023,
  ioExtendedNoida5c9dab9b95cc4028Acc23c06653b493f,
  theDataGenAiNexus,
};

export const events2023 = [
  { id: "devfest-noida-2023", ...devfestNoida2023["2023"] },
  { id: "data-science-meetup", ...dataScienceMeetup["2023"] },
  { id: "design-samvaad-beyond-aesthetics", ...designSamvaadBeyondAesthetics["2023"] },
  { id: "io-extended-noida-5c9dab9b-95cc-4028-acc2-3c06653b493f", ...ioExtendedNoida5c9dab9b95cc4028Acc23c06653b493f["2023"] },
  { id: "the-data-gen-ai-nexus", ...theDataGenAiNexus["2023"] },
];
