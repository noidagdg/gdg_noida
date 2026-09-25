import { designMixer } from "./design-mixer";
import { dpgDialogues } from "./dpg-dialogues";

export { designMixer, dpgDialogues };

export const eventsOther = [
  { id: "design-mixer", ...designMixer["0"] },
  { id: "dpg-dialogues", ...dpgDialogues["0"] },
];
