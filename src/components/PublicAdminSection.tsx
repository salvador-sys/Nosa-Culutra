import React, { useState } from 'react';
import { PUBLIC_ADMINISTRATION_DATA, PublicAdminSection } from '../data/publicAdministrationData';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Phone,
  Mail,
  Clock,
  Building2,
  HelpCircle,
  Check,
  Copy,
  ExternalLink,
  ShieldAlert,
  Search,
} from 'lucide-react';

interface PublicAdminSectionProps {
  lang: Language;
}

export const PublicAdminSectionView: React.FC<PublicAdminSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const filteredAdmins = PUBLIC_ADMINISTRATION_DATA.map((admin) => {
    if (!filterQuery.trim()) return admin;
    const q = filterQuery.toLowerCase();
    const adminName = lang === 'gl' ? admin.adminNameGl : admin.adminNameEs;
    const entity = lang === 'gl' ? admin.entityGl : admin.entityEs;

    const matchedContacts = admin.contacts.filter((c) => {
      const name = lang === 'gl' ? c.nameGl : c.nameEs;
      const purpose = lang === 'gl' ? c.purposeGl : c.purposeEs;
      return (
        name.toLowerCase().includes(q) ||
        purpose.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        adminName.toLowerCase().includes(q) ||
        entity.toLowerCase().includes(q)
      );
    });

    return {
      ...admin,
      contacts: matchedContacts,
    };
  }).filter((admin) => admin.contacts.length > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Banner */}
      <div className="bg-[#F2ECE0] border border-[#E3D9C9] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#DDD3C0] text-xs font-semibold text-[#6E5B45] mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#C25E3B]" />
            <span>
              {lang === 'gl' ? 'Guía de Atención Telefónica Oficial' : 'Guía de Atención Telefónica Oficial'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#27221E] tracking-tight mb-2">
            {lang === 'gl'
              ? 'Información cultural por administracións públicas'
              : 'Información cultural por administraciones públicas'}
          </h2>

          <p className="text-xs sm:text-sm text-[#5C5043] leading-relaxed">
            {lang === 'gl'
              ? 'Canles oficiais de consulta telefónica, correos e horarios de atención do Ministerio de Cultura (Bono Cultural Xove), da Xunta de Galicia e do Concello de Vigo.'
              : 'Canales oficiales de consulta telefónica, correos y horarios de atención del Ministerio de Cultura (Bono Cultural Joven), de la Xunta de Galicia y del Concello de Vigo.'}
          </p>
        </div>
      </div>

      {/* Search Input Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={
              lang === 'gl'
                ? 'Buscar trámite, teléfono ou organismo...'
                : 'Buscar trámite, teléfono u organismo...'
            }
            className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E3D9C9] text-xs sm:text-sm text-[#27221E] placeholder-[#9E907F] focus:outline-none focus:border-[#C25E3B]"
          />
        </div>

        <span className="text-xs text-[#7A6D5E]">
          {lang === 'gl'
            ? 'Números de teléfono contrastados e actualizados'
            : 'Números de teléfono contrastados y actualizados'}
        </span>
      </div>

      {/* Admin Tiers */}
      <div className="space-y-8">
        {filteredAdmins.map((admin) => {
          const adminTitle = lang === 'gl' ? admin.adminNameGl : admin.adminNameEs;
          const entityTitle = lang === 'gl' ? admin.entityGl : admin.entityEs;

          return (
            <div
              key={admin.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-xs space-y-6"
            >
              {/* Admin Tier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#EFE8DC]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C25E3B] block">
                    {adminTitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#27221E]">
                    {entityTitle}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F3EFE6] text-[#695B4C] border border-[#E0D7C6] self-start sm:self-auto">
                  {admin.badge}
                </span>
              </div>

              {/* Contacts Grid for this Tier */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {admin.contacts.map((contact, idx) => {
                  const name = lang === 'gl' ? contact.nameGl : contact.nameEs;
                  const purpose = lang === 'gl' ? contact.purposeGl : contact.purposeEs;
                  const schedule = lang === 'gl' ? contact.scheduleGl : contact.scheduleEs;
                  const extra = lang === 'gl' ? contact.extraInfoGl : contact.extraInfoEs;
                  const isCopied = copiedPhone === contact.phone;

                  return (
                    <div
                      key={idx}
                      className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#ECE3D5] flex flex-col justify-between space-y-4 hover:border-[#D5C7B2] transition-colors"
                    >
                      <div>
                        {/* Title */}
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#27221E] leading-snug mb-2">
                          {name}
                        </h4>

                        {/* Purpose */}
                        <p className="text-xs text-[#5C5043] leading-relaxed mb-4">
                          {purpose}
                        </p>

                        {/* Schedule Info Box */}
                        <div className="bg-white p-3 rounded-xl border border-[#EAE1D1] text-xs text-[#635544] mb-3 space-y-1.5">
                          <div className="flex items-start gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#C25E3B] shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-[#27221E] font-semibold text-[11px] uppercase tracking-wider">
                                {lang === 'gl' ? 'Horario de atención' : 'Horario de atención'}:
                              </strong>
                              <span className="leading-snug">{schedule}</span>
                            </div>
                          </div>
                        </div>

                        {/* Extra info if any */}
                        {extra && (
                          <p className="text-[11px] text-[#7A6C5C] italic mb-3">
                            {extra}
                          </p>
                        )}
                      </div>

                      {/* Direct Action Channels */}
                      <div className="pt-3 border-t border-[#EAE1D1] space-y-2 mt-auto">
                        {/* Phone Call Row */}
                        <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#E3D9C9]">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#27221E] truncate">
                            <Phone className="w-3.5 h-3.5 text-[#C25E3B] shrink-0" />
                            <a
                              href={`tel:${contact.phoneRaw}`}
                              className="hover:text-[#C25E3B] hover:underline truncate"
                              title="Chamar directamente"
                            >
                              {contact.phone}
                            </a>
                          </div>

                          <button
                            onClick={() => handleCopy(contact.phone)}
                            className="p-1 rounded-md text-[#7A6C5C] hover:text-[#27221E] hover:bg-[#F3EFE6] transition-colors shrink-0"
                            title="Copiar número"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Email Row if present */}
                        {contact.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#E3D9C9] text-xs text-[#554737] hover:text-[#27221E] hover:border-[#C25E3B] transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#8C7A68] shrink-0" />
                            <span className="truncate font-medium">{contact.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAdmins.length === 0 && (
        <div className="text-center py-12 px-4 bg-white/70 rounded-3xl border border-[#E8E1D3]">
          <Building2 className="w-10 h-10 text-[#8C7A68] mx-auto mb-3 stroke-[1.5]" />
          <h4 className="font-serif font-bold text-lg text-[#27221E] mb-1">
            {lang === 'gl' ? 'Non se atoparon resultados' : 'No se encontraron resultados'}
          </h4>
          <p className="text-xs sm:text-sm text-[#7A6D5E]">
            {lang === 'gl'
              ? 'Proba a buscar por palabras como "Bono Cultural", "Correos", "010" ou "Xunta".'
              : 'Prueba a buscar por palabras como "Bono Cultural", "Correos", "010" o "Xunta".'}
          </p>
        </div>
      )}
    </div>
  );
};
