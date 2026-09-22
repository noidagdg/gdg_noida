export interface Speaker {
  name: string;
  designation?: string;
  avatar?: string | null;
}

export interface Session {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  speakers?: Speaker[];
}

export interface Track {
  id: string;
  name: string;
  color: string;
  sessions: Session[];
}

export const tracks: Track[] = [
  
];
