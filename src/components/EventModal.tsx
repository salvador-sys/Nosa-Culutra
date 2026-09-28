import React, { useEffect } from 'react';
import { CulturalEvent } from '../types/event';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Ticket,
  Navigation,
  Building,
  CheckCircle2,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface EventModalProps {
  event: CulturalEvent | null;
  onClose: () => void;
  lang: Language;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, lang }) => {
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: t.shareText(event.title, event.venue),
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${event.title} - ${event.venue} (Vigo)`);
      alert(t.shareSuccess);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8E1D3] overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#F5EFE4] border-b border-[#E8DFC9] relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white text-[#27221E] flex items-center justify-center shadow-xs border border-[#E0D7C7] hover:bg-[#F0E9DA] transition-transform hover:scale-105"
            title="Pechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3 pr-12">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#C25E3B] text-white">
              {event.type}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-[#524434] border border-[#DDD3BF]">
              {event.category}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                event.isFree
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-[#27221E] border-[#DDD3BF]'
              }`}
            >
              {event.isFree ? t.freeBadge : event.price}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221E] leading-tight mb-2 pr-6">
            {event.title}
          </h2>

          {event.subtitle && (
            <p className="text-sm sm:text-base text-[#6E6050] font-medium leading-relaxed">
              {event.subtitle}
            </p>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F5F0E6] p-5 rounded-2xl border border-[#E6DDCA]">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#C25E3B] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-[#8C7A68] uppercase tracking-wider block">
                  {t.dateAndSchedule}
                </span>
                <span className="text-sm font-semibold text-[#27221E]">
                  {event.startDate}
                  {event.endDate ? ` — ${event.endDate}` : ''}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#C25E3B] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-[#8C7A68] uppercase tracking-wider block">
                  {t.scheduleTime}
                </span>
                <span className="text-sm text-[#27221E]">
                  {event.scheduleTime || t.consultSchedule}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C25E3B] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-[#8C7A68] uppercase tracking-wider block">
                  {t.venueInVigo}
                </span>
                <span className="text-sm font-semibold text-[#27221E]">
                  {event.venue}
                </span>
                <p className="text-xs text-[#6B5F52] mt-0.5">{event.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-[#C25E3B] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-[#8C7A68] uppercase tracking-wider block">
                  {t.organizer}
                </span>
                <span className="text-sm text-[#27221E]">
                  {event.organizer || t.defaultOrganizer}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Full Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-[#27221E]">
              {t.aboutEvent}
            </h3>
            <p className="text-sm sm:text-base text-[#4D4235] leading-relaxed">
              {event.description}
            </p>
            {event.fullDetails && (
              <p className="text-sm sm:text-base text-[#4D4235] leading-relaxed pt-2">
                {event.fullDetails}
              </p>
            )}
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A68]">
                {t.highlights}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {event.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-[#3E342A] bg-white p-3 rounded-xl border border-[#E8E0D1]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Venue & Directions Card */}
          <div className="p-5 rounded-2xl bg-[#F6F2EA] border border-[#E7DECD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C7A68] mb-1">
                {t.locationInVigo}
              </div>
              <div className="font-serif font-bold text-base text-[#27221E]">
                {event.venue}
              </div>
              <div className="text-xs text-[#6B5E4F] mt-0.5">
                {event.address}
              </div>
            </div>

            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#27221E] bg-white hover:bg-[#FAF8F5] border border-[#D5C9B7] px-4 py-2.5 rounded-xl transition-all shadow-2xs shrink-0 self-start sm:self-auto"
            >
              <Navigation className="w-4 h-4 text-[#C25E3B]" />
              <span>{t.directionsButton}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C7A68]" />
            </a>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#EFE8DC] text-[#554737] px-3 py-1 rounded-lg border border-[#DFD3C0]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F3EFE6] border-t border-[#E5DEC7] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#5E503F] hover:text-[#27221E] px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD1BE] transition-colors"
          >
            <Share2 className="w-4 h-4 text-[#8C7A68]" />
            <span>{t.shareButton}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-white hover:bg-[#FAF8F5] text-[#27221E] border border-[#DDD1BE] px-4 py-2.5 rounded-xl transition-all shadow-2xs"
            >
              <Navigation className="w-4 h-4 text-[#C25E3B]" />
              <span>{t.googleMapsButton}</span>
            </a>

            {event.bookingUrl && (
              <a
                href={event.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-[#C25E3B] hover:bg-[#A84A28] text-white px-5 py-2.5 rounded-xl transition-all shadow-2xs"
              >
                <Ticket className="w-4 h-4" />
                <span>{t.officialWebButton}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
