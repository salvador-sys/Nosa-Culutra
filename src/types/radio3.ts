export interface Radio3Program {
  id: string;
  name: string;
  host: string;
  days: string;
  startTime: string; // "09:00"
  endTime: string;   // "11:00"
  timeSlot: 'mañá' | 'tarde' | 'noite' | 'findesemana';
  description: string;
  genre: string;
  rtveAudioUrl: string;
}
