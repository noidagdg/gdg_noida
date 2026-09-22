import { devfestNoida2022 } from "./devfest-noida-2022";
import { gdgNoidaLaunch } from "./gdg-noida-launch";
import { indiafoss20 } from "./indiafoss-2-0";
import { womenInCloud } from "./women-in-cloud";

export { devfestNoida2022, gdgNoidaLaunch, indiafoss20, womenInCloud };

export const events2022 = [
  { id: "devfest-noida-2022", ...devfestNoida2022["2022"] },
  { id: "gdg-noida-launch", ...gdgNoidaLaunch["2022"] },
  { id: "indiafoss-2-0", ...indiafoss20["2022"] },
  { id: "women-in-cloud", ...womenInCloud["2022"] },
];
