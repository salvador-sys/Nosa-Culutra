export type EventType = 'actual' | 'proximo' | 'permanente';

export type EventCategory =
  | 'Todas'
  | 'Música'
  | 'Teatro e Danza'
  | 'Arte e Exposicións'
  | 'Cinema e Audiovisual'
  | 'Literatura e Charlas'
  | 'Festivais e Tradición'
  | 'Infantil e Familiar';

export interface CulturalEvent {
  id: string;
  title: string;
  subtitle?: string;
  type: EventType;
  category: EventCategory;
  venue: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  startDate: string;
  endDate?: string;
  scheduleTime?: string;
  price: string;
  isFree: boolean;
  description: string;
  fullDetails: string;
  organizer: string;
  imageUrl: string;
  bookingUrl?: string;
  googleMapsUrl: string;
  source: 'google_search' | 'curated';
  highlights: string[];
  tags: string[];
}

export interface SearchEventsResponse {
  events: CulturalEvent[];
  total: number;
  query?: string;
  source: 'google_search' | 'catalog';
  searchSummary?: string;
  timestamp: string;
}
