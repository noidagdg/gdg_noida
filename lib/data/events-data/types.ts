// ─── Speaker ────────────────────────────────────────────────────────────────

export interface EventSpeaker {
  name: string;
  designation: string;
  avatar: string;
  company: string;
}

// ─── Agenda ─────────────────────────────────────────────────────────────────

export interface EventSession {
  id: number;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  speakers: EventSpeaker[];
}

export interface EventTrack {
  id: string;
  name: string;
  color: string;
  sessions: EventSession[];
}

// ─── Overview Stats ─────────────────────────────────────────────────────────

export interface EventStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

// ─── Attendees ──────────────────────────────────────────────────────────────

export interface AttendeeDistribution {
  label: string;
  percentage: number;
}

// ─── Community Feedback ─────────────────────────────────────────────────────

export interface EventReview {
  id: string | number;
  text: string;
  backgroundColor?: string;
  author?: {
    name: string;
    role?: string;
    companyOrCollege?: string;
  };
}

// ─── Gallery ────────────────────────────────────────────────────────────────

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  aspectRatio: number;
}

// ─── Full Event Data ────────────────────────────────────────────────────────

export interface EventData {
  seriesId: string;
  year: number;
  title: string;
  subtitle: string;
  status: string;
  dates: {
    displayDate: string;
    isoDate: string;
  };
  venue: {
    name: string;
    city: string;
    address: string;
    mapLink: string;
  };
  branding: {
    logo: string;
    coverImage: string;
  };
  overview: {
    heading: string;
    stats: EventStat[];
  };
  about: {
    heading: string;
    description: string;
  };
  speakers: {
    heading: string;
    list: EventSpeaker[];
  };
  attendees: {
    heading: string;
    description: string;
    total: number;
    distribution: AttendeeDistribution[];
  };
  feedback: {
    heading: string;
    reviews: EventReview[];
  };
  agenda: {
    heading: string;
    tracks: EventTrack[];
  };
  gallery: {
    heading: string;
    categories: GalleryCategory[];
    images: GalleryImage[];
  };
}

// ─── Catalog ────────────────────────────────────────────────────────────────

/**
 * Top-level catalog type: maps an event slug to a record of year-keyed
 * event editions.
 *
 * Example:
 * ```
 * EventsCatalog["devfest-noida-2023"] = { "2023": EventData }
 * ```
 */
export type EventsCatalog = Record<string, Record<string, EventData>>;
