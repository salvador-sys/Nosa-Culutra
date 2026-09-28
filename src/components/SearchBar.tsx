import React, { useState } from 'react';
import { Search, Globe, Sparkles, X, Loader2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onGoogleSearch: (query: string) => void;
  isSearchingGoogle: boolean;
  lang: Language;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onGoogleSearch,
  isSearchingGoogle,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [localInput, setLocalInput] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localInput);
    if (localInput.trim()) {
      onGoogleSearch(localInput);
    }
  };

  const handleClear = () => {
    setLocalInput('');
    onSearchChange('');
  };

  const quickPicks = [
    'Madama Butterfly',
    'Kiko Veneno',
    'Arde Bogotá',
    'El Lago de los Cisnes',
    'Alberto Ardid MARCO',
    'Museo do Mar',
    'Reconquista de Vigo',
    'Real Filharmonía',
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white rounded-2xl border border-[#E4DDD0] shadow-sm hover:border-[#D1C6B4] focus-within:border-[#C25E3B] focus-within:ring-2 focus-within:ring-[#C25E3B]/20 transition-all p-1.5 sm:p-2">
          <div className="pl-3 pr-2 text-[#8C7E72]">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={localInput}
            onChange={(e) => {
              setLocalInput(e.target.value);
              onSearchChange(e.target.value);
            }}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-[#27221E] placeholder-[#9E9284] text-sm sm:text-base outline-none pr-3"
          />

          {localInput && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-[#9E9284] hover:text-[#27221E] hover:bg-[#F3EFE6] rounded-full transition-colors mr-1"
              title={t.clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onGoogleSearch(localInput)}
            disabled={isSearchingGoogle}
            className="flex items-center gap-2 bg-[#FAF6EE] hover:bg-[#F3ECE0] text-[#715438] border border-[#DFD3C0] hover:border-[#C9B9A0] font-medium text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-xs disabled:opacity-50 whitespace-nowrap"
            title={t.searchGoogle}
          >
            {isSearchingGoogle ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#C25E3B]" />
                <span className="hidden sm:inline">{t.searchingGoogle}</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-[#C25E3B]" />
                <span>{t.searchGoogle}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggestion Chips */}
      <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="text-[#8C7E72] font-medium text-[11px] uppercase tracking-wider pl-1 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#C25E3B]" />
          {t.suggestions}
        </span>
        {quickPicks.map((pick) => (
          <button
            key={pick}
            onClick={() => {
              setLocalInput(pick);
              onSearchChange(pick);
              onGoogleSearch(pick);
            }}
            className="px-2.5 py-1 rounded-lg bg-[#F5F1E8] text-[#554A3E] hover:bg-[#ECE5D8] hover:text-[#27221E] transition-colors border border-[#EAE3D5] whitespace-nowrap text-xs"
          >
            {pick}
          </button>
        ))}
      </div>
    </div>
  );
};
