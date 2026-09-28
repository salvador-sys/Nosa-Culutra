import React, { useState } from 'react';
import { CULTURA_CON_ENYE_EVENTS } from '../data/culturaConEnyeData';
import { CulturaConEnyeEvent } from '../types/culturaConEnye';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Compass,
  MapPin,
  Calendar,
  ExternalLink,
  Search,
  Sparkles,
  Flame,
  Tag,
  Navigation,
} from 'lucide-react';

interface CulturaConEnyeSectionProps {
  lang: Language;
}

export const CulturaConEnyeSection: React.FC<CulturaConEnyeSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = CULTURA_CON_ENYE_EVENTS.filter((ev) => {
    if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const desc = lang === 'gl' ? ev.descriptionGl : ev.descriptionEs;
      const why = lang === 'gl' ? ev.whyUniqueGl : ev.whyUniqueEs;
      const matchesTitle = ev.title.toLowerCase().includes(q);
      const matchesLoc = ev.location.toLowerCase().includes(q);
      const matchesProv = ev.province.toLowerCase().includes(q);
      const matchesConcept = ev.conceptTag.toLowerCase().includes(q);
      const matchesDesc = desc.toLowerCase().includes(q);
      const matchesWhy = why.toLowerCase().includes(q);
      const matchesTags = ev.tags.some((tag) => tag.toLowerCase().includes(q));
      return (
        matchesTitle ||
        matchesLoc ||
        matchesProv ||
        matchesConcept ||
        matchesDesc ||
        matchesWhy ||
        matchesTags
      );
    }
    return true;
  });

  const categories = [
    {
      id: 'all',
      label: lang === 'gl' ? 'Todas as propostas' : 'Todas las propuestas',
    },
    {
      id: 'sonoro',
      label: lang === 'gl' ? 'Arte Sonora & Electrónica' : 'Arte Sonoro & Electrónica',
    },
    {
      id: 'artesvivas',
      label: lang === 'gl' ? 'Artes Vivas & Performance' : 'Artes Vivas & Performance',
    },
    {
      id: 'cinema',
      label: lang === 'gl' ? 'Cinema Experimental' : 'Cine Experimental',
    },
    {
      id: 'visual',
      label: lang === 'gl' ? 'Arte Dixital & Paisaxe' : 'Arte Digital & Paisaje',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header Banner (Photo-less, clean typography) */}
      <div className="bg-[#F2ECE0] border border-[#E3D9C9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#DDD3C0] text-xs font-semibold text-[#6E5B45] mb-3">
            <span className="font-serif font-bold text-[#C25E3B] text-sm">Ñ</span>
            <span>
              {lang === 'gl'
                ? 'Circuitos Singulares & Festivais de Nicho en España'
                : 'Circuitos Singulares & Festivales de Nicho en España'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#27221E] tracking-tight mb-2">
            Cultura con Ñ
          </h2>

          <p className="text-xs sm:text-sm text-[#5C5043] leading-relaxed">
            {lang === 'gl'
              ? 'Unha selección rigorosa e contrastada de encontros culturais pouco comúns, artes vivas radicais, acústica en espazos insólitos, ruidismo e vangarda documental en toda a península e illas.'
              : 'Una selección rigurosa y contrastada de encuentros culturales poco comunes, artes vivas radicales, acústica en espacios insólitos, ruidismo y vanguardia documental en toda la península e islas.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-[#27221E] text-white border-[#27221E] shadow-2xs font-semibold'
                    : 'bg-white text-[#615546] border-[#E8E1D3] hover:bg-[#F3EFE6] hover:text-[#27221E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'gl' ? 'Buscar evento, cidade ou xénero...' : 'Buscar evento, ciudad o género...'}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E3D9C9] text-xs sm:text-sm text-[#27221E] placeholder-[#9E907F] focus:outline-none focus:border-[#C25E3B]"
            />
          </div>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((ev) => {
          const desc = lang === 'gl' ? ev.descriptionGl : ev.descriptionEs;
          const why = lang === 'gl' ? ev.whyUniqueGl : ev.whyUniqueEs;

          return (
            <div
              key={ev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE3D6] hover:border-[#D5C7B2] shadow-2xs flex flex-col justify-between transition-all"
            >
              <div>
                {/* Location Badge & Dates */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7A68]">
                    <MapPin className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
                    <span className="bg-[#FAF7F0] px-2.5 py-0.5 rounded-lg border border-[#ECE4D4]">
                      {ev.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D352B] bg-[#F4EFE6] px-2.5 py-0.5 rounded-lg border border-[#E4DCB8]">
                    <Calendar className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
                    <span>{ev.dates}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#27221E] leading-snug mb-1">
                  {ev.title}
                </h3>

                {/* Concept Tag */}
                <p className="text-xs font-semibold text-[#C25E3B] uppercase tracking-wider mb-3">
                  {ev.conceptTag}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#554A3E] leading-relaxed mb-4">
                  {desc}
                </p>

                {/* Why it's unique / niche callout */}
                <div className="bg-[#FBF8F2] border-l-3 border-[#C25E3B] p-3.5 rounded-r-2xl mb-4 text-xs">
                  <strong className="block text-[#27221E] font-semibold mb-1">
                    {lang === 'gl' ? 'O que o fai único e de nicho:' : 'Lo que lo hace único y de nicho:'}
                  </strong>
                  <p className="text-[#635544] leading-relaxed">{why}</p>
                </div>

                {/* Venue and Price info */}
                <div className="space-y-1 text-xs text-[#7A6C5C] mb-4">
                  <p>
                    <strong className="text-[#3D3429]">{lang === 'gl' ? 'Sede:' : 'Sede:'}</strong> {ev.venue}
                  </p>
                  <p>
                    <strong className="text-[#3D3429]">{lang === 'gl' ? 'Acceso:' : 'Acceso:'}</strong> {ev.priceInfo}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {ev.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-[#EFE8DC] text-[#4A3E30] px-2.5 py-0.5 rounded-lg border border-[#DFD3BF]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#F0EAE0] flex flex-wrap items-center justify-between gap-2 mt-auto">
                <a
                  href={ev.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5043] hover:text-[#27221E] bg-[#F3EFE6] hover:bg-[#EAE3D4] px-3.5 py-2 rounded-xl transition-colors border border-[#E0D7C6]"
                  title="Ver en Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C25E3B]" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={ev.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C25E3B] hover:text-[#9E4524] transition-colors"
                >
                  <span>{lang === 'gl' ? 'Web oficial do festival' : 'Web oficial del festival'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 px-4 bg-white/70 rounded-3xl border border-[#E8E1D3]">
          <Compass className="w-10 h-10 text-[#8C7A68] mx-auto mb-3 stroke-[1.5]" />
          <h4 className="font-serif font-bold text-lg text-[#27221E] mb-1">
            {lang === 'gl' ? 'Non se atoparon eventos de nicho' : 'No se encontraron eventos de nicho'}
          </h4>
          <p className="text-xs sm:text-sm text-[#7A6D5E]">
            {lang === 'gl'
              ? 'Proba a buscar por outra provincia, cidade ou xénero artístico.'
              : 'Prueba a buscar por otra provincia, ciudad o género artístico.'}
          </p>
        </div>
      )}
    </div>
  );
};
