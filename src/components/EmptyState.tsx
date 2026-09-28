import React from 'react';
import { SearchX, RotateCcw, Globe } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface EmptyStateProps {
  searchTerm: string;
  onResetFilters: () => void;
  onGoogleSearch: () => void;
  isSearchingGoogle: boolean;
  lang: Language;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  onResetFilters,
  onGoogleSearch,
  isSearchingGoogle,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#E8E1D3] max-w-xl mx-auto shadow-xs">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#F5EFE6] flex items-center justify-center text-[#8C7A68]">
        <SearchX className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-xl font-serif font-bold text-[#27221E] mb-2">
        {t.emptyTitle}
      </h3>
      <p className="text-sm text-[#73685C] mb-6 max-w-md mx-auto">
        {searchTerm ? t.emptyDescSearch(searchTerm) : t.emptyDescFilters}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {searchTerm && (
          <button
            onClick={onGoogleSearch}
            disabled={isSearchingGoogle}
            className="inline-flex items-center gap-2 bg-[#C25E3B] hover:bg-[#A64C2C] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span>{t.searchGoogleFor(searchTerm)}</span>
          </button>
        )}
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 bg-[#F3EFE6] hover:bg-[#EBE4D6] text-[#4A3E31] px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border border-[#DDD3C2]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.resetFilters}</span>
        </button>
      </div>
    </div>
  );
};
