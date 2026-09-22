import type { EventUniqueStats } from "./events-data/types";

export type { EventUniqueStats } from "./events-data/types";

/**
 * Deterministically generates unique, realistic stats for each event based on its ID and data.
 * For upcoming events, stats are marked as "TBA".
 */
export function getEventUniqueStats(
  eventId: string,
  actualSpeakersCount?: number,
  actualAttendeesTotal?: number,
  status?: string
): EventUniqueStats {
  // Upcoming events should show TBA
  if (status?.toLowerCase() === "upcoming") {
    return {
      speakers: "TBA",
      attendees: "TBA",
      registered: "TBA",
    };
  }

  let hash = 0;
  for (let i = 0; i < eventId.length; i++) {
    hash = (hash << 5) - hash + eventId.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);

  // Speakers: use actual list length if > 0, otherwise unique pseudo-random (4 - 35)
  const speakers =
    actualSpeakersCount && actualSpeakersCount > 0
      ? actualSpeakersCount
      : 4 + (abs % 28);

  // Registered: unique range 450 - 5,200
  const regNum = 450 + ((abs * 41) % 4750);

  // Attendees: unique realistic conversion (55% - 85% of registrations)
  const attNum =
    actualAttendeesTotal && actualAttendeesTotal > 0 && actualAttendeesTotal < 10000
      ? actualAttendeesTotal
      : Math.floor(regNum * (0.55 + ((abs % 30) / 100)));

  return {
    speakers,
    attendees: `${attNum.toLocaleString()}+`,
    registered: `${regNum.toLocaleString()}+`,
  };
}
