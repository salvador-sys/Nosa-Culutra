import React from 'react';
import { EventCategory, EventType } from '../types/event';
import { Ticket } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface FilterBarProps {
  selectedType: EventType | 'todos';
  onSelectType: (type: EventType | 'todos') => void;
  selectedCategory: EventCategory;
  onSelectCategory: (category: EventCategory) => void;
  freeOnly: boolean;
  onToggleFreeOnly: () => void;
  lang: Language;
}

const CATEGORIES_MAPPING: { key: EventCategory; labelGl: string; labelEs: string }[] = [
  { key: 'Todas', labelGl: 'Todas', labelEs: 'Todas' },
  { key: 'Música', labelGl: 'Música', labelEs: 'Música' },
  { key: 'Teatro e Danza', labelGl: 'Teatro e Danza', labelEs: 'Teatro y Danza' },
  { key: 'Arte e Exposicións', labelGl: 'Arte e Exposicións', labelEs: 'Arte y Exposiciones' },
  { key: 'Cinema e Audiovisual', labelGl: 'Cinema e Audiovisual', labelEs: 'Cine y Audiovisual' },
  { key: 'Literatura e Charlas', labelGl: 'Literatura e Charlas', labelEs: 'Literatura y Charlas' },
  { key: 'Festivais e Tradición', labelGl: 'Festivais e Tradición', labelEs: 'Festivales y Tradición' },
  { key: 'Infantil e Familiar', labelGl: 'Infantil e Familiar', labelEs: 'Infantil y Familiar' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedType,
  onSelectType,
  selectedCategory,
  onSelectCategory,
  freeOnly,
  onToggleFreeOnly,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-4">
      {/* Top row: Type Tabs and Free Only Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        {/* Type Segments */}
        <div className="inline-flex p-1 bg-[#EFE9DC] rounded-2xl border border-[#E3D9C9] self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => onSelectType('todos')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedType === 'todos'
                ? 'bg-white text-[#27221E] shadow-2xs font-bold'
                : 'text-[#695D4F] hover:text-[#27221E]'
            }`}
          >
            {t.all}
          </button>
          <button
            onClick={() => onSelectType('actual')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedType === 'actual'
                ? 'bg-[#C25E3B] text-white shadow-2xs font-bold'
                : 'text-[#695D4F] hover:text-[#27221E]'
            }`}
          >
            {t.actual}
          </button>
          <button
            onClick={() => onSelectType('proximo')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedType === 'proximo'
                ? 'bg-[#C25E3B] text-white shadow-2xs font-bold'
                : 'text-[#695D4F] hover:text-[#27221E]'
            }`}
          >
            {t.proximo}
          </button>
          <button
            onClick={() => onSelectType('permanente')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedType === 'permanente'
                ? 'bg-[#C25E3B] text-white shadow-2xs font-bold'
                : 'text-[#695D4F] hover:text-[#27221E]'
            }`}
          >
            {t.permanente}
          </button>
        </div>

        {/* Free Only Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onToggleFreeOnly}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              freeOnly
                ? 'bg-[#2E5C38] text-white border-[#2E5C38] shadow-2xs'
                : 'bg-white text-[#5C5348] border-[#E3DAC9] hover:bg-[#F3EFE6]'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>{t.freeOnly}</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
        {CATEGORIES_MAPPING.map((item) => {
          const isActive = selectedCategory === item.key;
          const label = lang === 'gl' ? item.labelGl : item.labelEs;
          return (
            <button
              key={item.key}
              onClick={() => onSelectCategory(item.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#27221E] text-white border-[#27221E] shadow-2xs font-semibold'
                  : 'bg-white text-[#615649] border-[#E8E1D3] hover:bg-[#F5F1E8] hover:text-[#27221E]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
