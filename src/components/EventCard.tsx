import React from 'react';
import { CulturalEvent } from '../types/event';
import { MapPin, Calendar, Clock, ArrowUpRight, Navigation, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface EventCardProps {
  event: CulturalEvent;
  onSelect: (event: CulturalEvent) => void;
  isSelected?: boolean;
  lang: Language;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelect,
  isSelected = false,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'actual':
        return {
          label: t.actual,
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500',
        };
      case 'proximo':
        return {
          label: t.proximo,
          bg: 'bg-blue-50 text-blue-900 border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'permanente':
        return {
          label: t.permanente,
          bg: 'bg-stone-100 text-stone-800 border-stone-300',
          dot: 'bg-stone-600',
        };
      default:
        return {
          label: type,
          bg: 'bg-stone-100 text-stone-800 border-stone-200',
          dot: 'bg-stone-400',
        };
    }
  };

  const badge = getTypeBadge(event.type);

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 ${
        isSelected
          ? 'border-[#C25E3B] ring-2 ring-[#C25E3B]/20 shadow-md bg-[#FFFDF9]'
          : 'border-[#EAE3D6] hover:border-[#D5C7B2] hover:shadow-2xs'
      }`}
    >
      <div>
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border shadow-2xs ${badge.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
              {badge.label}
            </span>

            <span className="text-xs font-medium bg-[#F3EFE6] text-[#5C5043] px-3 py-1 rounded-full border border-[#E5DEC7]">
              {event.category}
            </span>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-xl border ${
              event.isFree
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-[#FAF8F5] text-[#27221E] border-[#E3DACB]'
            }`}
          >
            {event.isFree ? t.freeBadge : event.price}
          </span>
        </div>

        {/* Venue & Location */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7A68] mb-2.5">
          <MapPin className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(event)}
          className="text-xl sm:text-2xl font-serif font-bold text-[#27221E] leading-snug hover:text-[#C25E3B] transition-colors cursor-pointer mb-2.5"
        >
          {event.title}
        </h3>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-[#5E5448] leading-relaxed mb-5">
          {event.subtitle || event.description}
        </p>

        {/* Date and Schedule Info Block */}
        <div className="space-y-1.5 text-xs text-[#6B5F52] bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#EBE4D5] mb-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
            <span className="font-semibold text-[#3D352B]">
              {event.startDate}
              {event.endDate ? ` — ${event.endDate}` : ''}
            </span>
          </div>
          {event.scheduleTime && (
            <div className="flex items-center gap-2 text-[11px] text-[#7A6E61]">
              <Clock className="w-3 h-3 text-[#9E8E7D] shrink-0" />
              <span>{event.scheduleTime}</span>
            </div>
          )}
        </div>

        {/* Highlights Pills */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="space-y-1.5 mb-5">
            {event.highlights.slice(0, 2).map((hl, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#55493D]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="line-clamp-1">{hl}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-[#F0EAE0] flex items-center justify-between gap-2 mt-auto">
        <a
          href={event.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5043] hover:text-[#27221E] bg-[#F3EFE6] hover:bg-[#EAE3D4] px-3.5 py-2 rounded-xl transition-colors border border-[#E0D7C6]"
          title={t.directionsButton}
        >
          <Navigation className="w-3.5 h-3.5 text-[#C25E3B]" />
          <span>{t.googleMapsButton}</span>
        </a>

        <button
          onClick={() => onSelect(event)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#C25E3B] hover:bg-[#A84A28] px-4 py-2 rounded-xl transition-all shadow-2xs hover:scale-102"
        >
          <span>{t.detailsButton}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
