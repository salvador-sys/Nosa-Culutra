import React, { useState } from 'react';
import { AlertCircle, ShieldAlert, Check, ExternalLink } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface InstitutionalDisclaimerProps {
  lang: Language;
}

export const InstitutionalDisclaimer: React.FC<InstitutionalDisclaimerProps> = ({ lang }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <>
      {/* 1. Modal that ALWAYS appears on enter until acknowledged */}
      {!isDismissed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#C25E3B]/30 space-y-5"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="disclaimer-title"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C25E3B] block mb-1">
                  Transparencia e Independencia
                </span>
                <h3
                  id="disclaimer-title"
                  className="text-xl sm:text-2xl font-serif font-bold text-[#27221E] leading-snug"
                >
                  {t.disclaimerTitle}
                </h3>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DFC9] text-xs sm:text-sm text-[#4D4235] leading-relaxed space-y-2">
              <p className="font-medium text-[#27221E]">
                {t.disclaimerText}
              </p>
              <p className="text-[12px] text-[#7A6D5E]">
                {lang === 'gl'
                  ? 'Os horarios, datos de contacto e convocatorias recopílanse con fins estritamente informativos para a cidadanía.'
                  : 'Los horarios, datos de contacto y convocatorias se recopilan con fines estrictamente informativos para la ciudadanía.'}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsDismissed(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#27221E] hover:bg-[#3D352E] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>{t.disclaimerAcknowledge}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Persistent notice bar at the top of the site */}
      <div className="bg-[#F0EAE0] border-b border-[#E2D7C5] px-4 py-2 text-center text-[11px] sm:text-xs text-[#6B5E4F] font-medium flex items-center justify-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
        <span>{t.disclaimerBannerNotice}</span>
      </div>
    </>
  );
};
