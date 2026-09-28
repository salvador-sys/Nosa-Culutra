import React, { useState } from 'react';
import { CULTURAL_PARTICIPATION_DATA, CulturalParticipationItem } from '../data/culturalParticipationData';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Search,
  CheckCircle2,
  Calendar,
  Ticket,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';

interface ParticipateSectionProps {
  lang: Language;
}

export const ParticipateSection: React.FC<ParticipateSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = CULTURAL_PARTICIPATION_DATA.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const desc = lang === 'gl' ? item.descriptionGl : item.descriptionEs;
      const how = lang === 'gl' ? item.howToJoinGl : item.howToJoinEs;
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesEntity = item.entity.toLowerCase().includes(q);
      const matchesDesc = desc.toLowerCase().includes(q);
      const matchesHow = how.toLowerCase().includes(q);
      const matchesDisciplines = item.disciplines.some((d) => d.toLowerCase().includes(q));
      return matchesTitle || matchesEntity || matchesDesc || matchesHow || matchesDisciplines;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: t.participateCategoryAll },
    { id: 'theater', label: t.participateCategoryTheater },
    { id: 'music', label: t.participateCategoryMusic },
    { id: 'crafts', label: t.participateCategoryCrafts },
    { id: 'lit', label: t.participateCategoryLit },
    { id: 'community', label: t.participateCategoryCommunity },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Intro Header (Text-only, warm editorial) */}
      <div className="bg-[#F2ECE0] border border-[#E3D9C9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#DDD3C0] text-xs font-semibold text-[#6E5B45] mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#C25E3B]" />
            <span>{t.participateHeroBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#27221E] tracking-tight mb-2">
            {lang === 'gl' ? 'A cultura fála ti: Como participar e crear en Vigo' : 'La cultura la haces tú: Cómo participar y crear en Vigo'}
          </h2>

          <p className="text-xs sm:text-sm text-[#5C5043] leading-relaxed">
            {t.participateHeroDesc}
          </p>
        </div>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          {/* Search filter */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'gl' ? 'Buscar disciplina ou taller...' : 'Buscar disciplina o taller...'}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E3D9C9] text-xs sm:text-sm text-[#27221E] placeholder-[#9E907F] focus:outline-none focus:border-[#C25E3B]"
            />
          </div>
        </div>
      </div>

      {/* Cards List of Cultural Spaces & Schools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const desc = lang === 'gl' ? item.descriptionGl : item.descriptionEs;
          const howTo = lang === 'gl' ? item.howToJoinGl : item.howToJoinEs;
          const reqs = lang === 'gl' ? item.requirementsGl : item.requirementsEs;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE3D6] hover:border-[#D5C7B2] shadow-2xs flex flex-col justify-between transition-all"
            >
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#8C7A68] bg-[#F7F3EB] px-3 py-1 rounded-full border border-[#E8E0D1]">
                    {item.entity}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-xl border ${
                      item.cost.includes('De balde') || item.cost.includes('gratuita')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-[#FAF8F5] text-[#27221E] border-[#E3DACB]'
                    }`}
                  >
                    {item.cost}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#27221E] leading-snug mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#554A3D] leading-relaxed mb-4">
                  {desc}
                </p>

                {/* Disciplines Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.disciplines.map((disc, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-[#EFE8DC] text-[#4A3E30] px-2.5 py-0.5 rounded-lg border border-[#DFD3BF]"
                    >
                      {disc}
                    </span>
                  ))}
                </div>

                {/* How to enroll / Participate Box */}
                <div className="space-y-2 bg-[#F9F6F0] p-4 rounded-2xl border border-[#EAE2D2] text-xs text-[#524639] mb-5">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#C25E3B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#27221E] font-semibold mb-0.5">
                        {t.enrollmentInfo}:
                      </strong>
                      <p className="leading-relaxed">{howTo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2 border-t border-[#EAE2D2]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#27221E] font-semibold mb-0.5">
                        {lang === 'gl' ? 'Requisitos' : 'Requisitos'}:
                      </strong>
                      <p className="leading-relaxed">{reqs}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info Details */}
                <div className="space-y-1.5 text-xs text-[#6B5E4F] mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
                    <span>{item.address}</span>
                  </div>
                  {item.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8C7A68] shrink-0" />
                      <span>{item.phone}</span>
                    </div>
                  )}
                  {item.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#8C7A68] shrink-0" />
                      <span>{item.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#F0EAE0] flex flex-wrap items-center justify-between gap-2 mt-auto">
                <a
                  href={item.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C5043] hover:text-[#27221E] bg-[#F3EFE6] hover:bg-[#EAE3D4] px-3.5 py-2 rounded-xl transition-colors border border-[#E0D7C6]"
                  title="Ver en Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C25E3B]" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C25E3B] hover:text-[#9E4524] transition-colors"
                >
                  <span>{t.officialLink}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 px-4 bg-white/70 rounded-3xl border border-[#E8E1D3]">
          <GraduationCap className="w-10 h-10 text-[#8C7A68] mx-auto mb-3 stroke-[1.5]" />
          <h4 className="font-serif font-bold text-lg text-[#27221E] mb-1">
            {lang === 'gl' ? 'Non se atoparon resultados' : 'No se encontraron resultados'}
          </h4>
          <p className="text-xs sm:text-sm text-[#7A6D5E]">
            {lang === 'gl'
              ? 'Proba a buscar polo nome doutra disciplina coma teatro, cerámica, música ou artes.'
              : 'Prueba a buscar por el nombre de otra disciplina como teatro, cerámica, música o artes.'}
          </p>
        </div>
      )}
    </div>
  );
};
