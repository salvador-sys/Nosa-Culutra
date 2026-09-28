import React from 'react';
import { Compass, Sparkles, MapPin, CalendarDays, Landmark, Radio, Calendar, Languages, Building2, PhoneCall } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  currentTab: 'events' | 'participate' | 'culturaConEnye' | 'publicAdmin' | 'radio3';
  onTabChange: (tab: 'events' | 'participate' | 'culturaConEnye' | 'publicAdmin' | 'radio3') => void;
  totalEvents: number;
  actualCount: number;
  proximoCount: number;
  permanenteCount: number;
  onSelectType: (type: 'actual' | 'proximo' | 'permanente' | 'todos') => void;
  activeType: string;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  totalEvents,
  actualCount,
  proximoCount,
  permanenteCount,
  onSelectType,
  activeType,
  lang,
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="border-b border-[#E8E1D3] bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#C25E3B] flex items-center justify-center text-white shadow-sm shadow-[#C25E3B]/20">
                <Compass className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#27221E] tracking-tight">
                    {t.appName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#EFE8DC] text-[#715D48] px-2.5 py-0.5 rounded-full border border-[#E3D9C9]">
                    <MapPin className="w-3 h-3 text-[#C25E3B]" /> {t.city}
                  </span>
                </div>
                <p className="text-xs text-[#73685C] font-normal">
                  {t.appSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs and Language Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Primary View Switcher */}
            <div className="inline-flex p-1 bg-[#EFE8DC] rounded-2xl border border-[#E3D8C8] overflow-x-auto max-w-full">
              <button
                onClick={() => onTabChange('events')}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  currentTab === 'events'
                    ? 'bg-[#27221E] text-white shadow-2xs'
                    : 'text-[#615546] hover:text-[#27221E]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#C25E3B]" />
                <span>{t.tabEvents}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  currentTab === 'events' ? 'bg-white/20 text-white' : 'bg-[#E3DAC8] text-[#3D3429]'
                }`}>
                  {totalEvents}
                </span>
              </button>

              <button
                onClick={() => onTabChange('participate')}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  currentTab === 'participate'
                    ? 'bg-[#C25E3B] text-white shadow-2xs'
                    : 'text-[#615546] hover:text-[#27221E]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.tabParticipate}</span>
              </button>

              <button
                onClick={() => onTabChange('culturaConEnye')}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  currentTab === 'culturaConEnye'
                    ? 'bg-[#C25E3B] text-white shadow-2xs'
                    : 'text-[#615546] hover:text-[#27221E]'
                }`}
              >
                <span className="font-serif font-bold text-[#C25E3B] bg-white px-1 rounded text-xs leading-none">Ñ</span>
                <span>{t.tabCulturaConEnye}</span>
              </button>

              <button
                onClick={() => onTabChange('publicAdmin')}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  currentTab === 'publicAdmin'
                    ? 'bg-[#C25E3B] text-white shadow-2xs'
                    : 'text-[#615546] hover:text-[#27221E]'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t.tabPublicAdmin}</span>
              </button>

              <button
                onClick={() => onTabChange('radio3')}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  currentTab === 'radio3'
                    ? 'bg-[#27221E] text-white shadow-2xs'
                    : 'text-[#615546] hover:text-[#27221E]'
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-[#C25E3B]" />
                <span>{t.tabRadio3}</span>
              </button>
            </div>

            {/* Language Selector: Galego / Castelán */}
            <div className="inline-flex items-center p-1 bg-[#EFE8DC] rounded-2xl border border-[#E3D8C8] shrink-0">
              <div className="px-2 text-[#7A6B5C]">
                <Languages className="w-3.5 h-3.5" />
              </div>
              <button
                onClick={() => onLanguageChange('gl')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lang === 'gl'
                    ? 'bg-white text-[#27221E] shadow-2xs'
                    : 'text-[#695D4F] hover:text-[#27221E]'
                }`}
                title="Pór toda a web en Galego"
              >
                Galego
              </button>
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lang === 'es'
                    ? 'bg-white text-[#27221E] shadow-2xs'
                    : 'text-[#695D4F] hover:text-[#27221E]'
                }`}
                title="Poner la web en Castellano"
              >
                Castellano
              </button>
            </div>
          </div>

        </div>

        {/* Sub-bar with event counters when in events tab */}
        {currentTab === 'events' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none text-xs border-t border-[#EFE8DC]">
            <span className="text-[#8C7A68] text-xs font-semibold mr-1 uppercase tracking-wider">
              {t.filterBy}
            </span>
            <button
              onClick={() => onSelectType('todos')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                activeType === 'todos'
                  ? 'bg-[#27221E] text-white border-[#27221E] font-semibold'
                  : 'bg-white text-[#5C5348] border-[#E8E1D3] hover:bg-[#F3EFE6]'
              }`}
            >
              <span>{t.all} ({totalEvents})</span>
            </button>

            <button
              onClick={() => onSelectType('actual')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                activeType === 'actual'
                  ? 'bg-[#C25E3B] text-white border-[#C25E3B] font-semibold'
                  : 'bg-white text-[#5C5348] border-[#E8E1D3] hover:bg-[#F3EFE6]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.actual} ({actualCount})</span>
            </button>

            <button
              onClick={() => onSelectType('proximo')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                activeType === 'proximo'
                  ? 'bg-[#C25E3B] text-white border-[#C25E3B] font-semibold'
                  : 'bg-white text-[#5C5348] border-[#E8E1D3] hover:bg-[#F3EFE6]'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.proximo} ({proximoCount})</span>
            </button>

            <button
              onClick={() => onSelectType('permanente')}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                activeType === 'permanente'
                  ? 'bg-[#C25E3B] text-white border-[#C25E3B] font-semibold'
                  : 'bg-white text-[#5C5348] border-[#E8E1D3] hover:bg-[#F3EFE6]'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.permanente} ({permanenteCount})</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
