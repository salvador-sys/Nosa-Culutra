export interface CulturaConEnyeEvent {
  id: string;
  title: string;
  conceptTag: string;
  category: 'sonoro' | 'artesvivas' | 'cinema' | 'visual';
  location: string; // e.g. "Santa Cruz de Tenerife (Canarias)"
  province: string;
  venue: string;
  dates: string;
  descriptionGl: string;
  descriptionEs: string;
  whyUniqueGl: string;
  whyUniqueEs: string;
  officialUrl: string;
  googleMapsUrl: string;
  priceInfo: string;
  tags: string[];
}
