import React, { useState } from 'react';
import { Radio3Program } from '../types/radio3';
import { RADIO_3_SCHEDULE } from '../data/radio3Schedule';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Clock,
  User,
  ExternalLink,
  Search,
  Radio,
  Headphones,
  Calendar,
} from 'lucide-react';

interface Radio3SectionProps {
  lang: Language;
}

export const Radio3Section: React.FC<Radio3SectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeSlot, setActiveSlot] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = RADIO_3_SCHEDULE.filter((p) => {
    if (activeSlot !== 'todos') {
      if (activeSlot === 'semana') {
        if (p.timeSlot === 'findesemana') return false;
      } else if (p.timeSlot !== activeSlot) {
        return false;
      }
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.host.toLowerCase().includes(q) ||
        p.genre.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header Banner (No player, verified info only) */}
      <div className="bg-[#F2ECE0] border border-[#E3D9C9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#DDD3C0] text-xs font-semibold text-[#6E5B45] mb-3">
            <Radio className="w-3.5 h-3.5 text-[#C25E3B]" />
            <span>Radio Nacional de España (RNE)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#27221E] tracking-tight mb-2">
            {t.radio3Title}
          </h2>

          <p className="text-xs sm:text-sm text-[#5C5043] leading-relaxed">
            {t.radio3Subtitle}
          </p>
        </div>
      </div>

      {/* Program Schedule Controls & Search */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Slot Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'todos', label: t.radio3SlotAll },
              { id: 'semana', label: t.radio3SlotWeek },
              { id: 'mañá', label: t.radio3SlotMorning },
              { id: 'tarde', label: t.radio3SlotAfternoon },
              { id: 'noite', label: t.radio3SlotNight },
              { id: 'findesemana', label: t.radio3SlotWeekend },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSlot(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all border ${
                  activeSlot === tab.id
                    ? 'bg-[#27221E] text-white border-[#27221E] shadow-2xs font-semibold'
                    : 'bg-white text-[#615546] border-[#E8E1D3] hover:bg-[#F3EFE6] hover:text-[#27221E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box for programs */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.radio3SearchPlaceholder}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E3D9C9] text-xs sm:text-sm text-[#27221E] placeholder-[#9E907F] focus:outline-none focus:border-[#C25E3B]"
            />
          </div>
        </div>
      </div>

      {/* Program Cards Grid (Strictly text-based, verified times, no player) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="p-6 rounded-3xl bg-white border border-[#EAE3D6] hover:border-[#D8CCA9] hover:shadow-2xs flex flex-col justify-between transition-all duration-200"
          >
            <div>
              {/* Timing badge & Broadcast Days */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C25E3B] bg-[#FBEFEA] px-2.5 py-1 rounded-lg border border-[#F2D7CD]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{prog.startTime} - {prog.endTime} h</span>
                </div>

                <span className="text-[11px] font-medium text-[#7D6E5D] bg-[#F5F0E6] px-2.5 py-0.5 rounded-lg border border-[#E7DECE]">
                  {prog.days}
                </span>
              </div>

              {/* Program Title */}
              <h4 className="text-xl font-serif font-bold text-[#27221E] mb-1.5 leading-snug">
                {prog.name}
              </h4>

              {/* Host */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#6E6050] mb-3">
                <User className="w-3.5 h-3.5 text-[#8C7A68] shrink-0" />
                <span>
                  {t.directedBy} <strong className="text-[#3D352B]">{prog.host}</strong>
                </span>
              </div>

              {/* Genre Tag */}
              <div className="mb-3">
                <span className="inline-block text-[11px] font-semibold bg-[#EFE8DC] text-[#554737] px-2.5 py-0.5 rounded-md border border-[#E2D7C5]">
                  {prog.genre}
                </span>
              </div>

              {/* Verified Description */}
              <p className="text-xs sm:text-sm text-[#5E5244] leading-relaxed mb-4">
                {prog.description}
              </p>
            </div>

            {/* Bottom Actions: Link to RTVE Audio */}
            <div className="pt-4 border-t border-[#F0EAE0] flex items-center justify-between gap-2 mt-auto">
              <a
                href={prog.rtveAudioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C25E3B] hover:text-[#9E4524] transition-colors"
                title="Abrir podcasts oficiais en RTVE Audio"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{t.audiosAndPodcast}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12 px-4 bg-white/70 rounded-3xl border border-[#E8E1D3]">
          <Radio className="w-10 h-10 text-[#8C7A68] mx-auto mb-3 stroke-[1.5]" />
          <h4 className="font-serif font-bold text-lg text-[#27221E] mb-1">
            {t.noProgramsFoundTitle}
          </h4>
          <p className="text-xs sm:text-sm text-[#7A6D5E]">
            {t.noProgramsFoundDesc}
          </p>
        </div>
      )}
    </div>
  );
};
