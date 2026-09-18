export interface EventSpeaker {
  name: string;
  designation?: string;
  avatar?: string;
  company?: string;
}

export interface EventSession {
  id: number | string;
  startTime?: string;
  endTime?: string;
  time?: string;
  title: string;
  description?: string;
  speakers?: EventSpeaker[];
  speaker?: string;
}

export interface AgendaTrack {
  id: string;
  name?: string;
  title?: string;
  color?: string;
  sessions: EventSession[];
}

export interface EventGalleryImage {
  id: number | string;
  src: string;
  alt: string;
  category?: string;
  aspectRatio?: number;
}

export interface EventGalleryCategory {
  id: string;
  label: string;
}

export interface EventReview {
  name?: string;
  avatar?: string;
  review?: string;
  role?: string;
  [key: string]: any;
}

export interface EventStat {
  id?: string;
  label: string;
  value: number | string;
  suffix?: string;
}

export interface AttendeeDistribution {
  label: string;
  percentage: number;
}

export interface EventData {
  seriesId?: string;
  year: number;
  title: string;
  subtitle?: string;
  status?: string;
  dates?: {
    displayDate?: string;
    isoDate?: string;
  };
  venue?: {
    name?: string;
    city?: string;
    address?: string;
    mapLink?: string;
  };
  branding?: {
    logo?: string;
    coverImage?: string;
  };
  overview?: {
    heading?: string;
    stats?: EventStat[];
  };
  about?: {
    heading?: string;
    description?: string;
  };
  speakers?: {
    heading?: string;
    list?: EventSpeaker[];
  };
  attendees?: {
    heading?: string;
    description?: string;
    total?: number;
    distribution?: AttendeeDistribution[];
  };
  feedback?: {
    heading?: string;
    reviews?: EventReview[];
  };
  agenda?: {
    heading?: string;
    tracks?: AgendaTrack[];
  };
  gallery?: {
    heading?: string;
    categories?: EventGalleryCategory[];
    images?: EventGalleryImage[];
  };
  [key: string]: any;
}

export type EventByYear = Record<string, EventData>;

export type EventsCatalog = Record<string, EventByYear>;
