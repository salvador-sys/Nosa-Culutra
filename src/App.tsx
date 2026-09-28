/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_VIGO_EVENTS } from './data/vigoEvents';
import { CulturalEvent, EventCategory, EventType } from './types/event';
import { Language, TRANSLATIONS } from './i18n/translations';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { EventModal } from './components/EventModal';
import { Radio3Section } from './components/Radio3Section';
import { ParticipateSection } from './components/ParticipateSection';
import { CulturaConEnyeSection } from './components/CulturaConEnyeSection';
import { PublicAdminSectionView } from './components/PublicAdminSection';
import { InstitutionalDisclaimer } from './components/InstitutionalDisclaimer';
import { EmptyState } from './components/EmptyState';
import {
  Compass,
  MapPin,
  Sparkles,
  ExternalLink,
  Landmark,
  Radio,
  PhoneCall,
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('gl');
  const [currentTab, setCurrentTab] = useState<'events' | 'participate' | 'culturaConEnye' | 'publicAdmin' | 'radio3'>('events');
  const [events, setEvents] = useState<CulturalEvent[]>(INITIAL_VIGO_EVENTS);
  const [selectedType, setSelectedType] = useState<EventType | 'todos'>('todos');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);
  const [isSearchingGoogle, setIsSearchingGoogle] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  // Fetch initial events from backend if available
  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
        }
      })
      .catch((err) => {
        console.warn('Using client-side curated events fallback:', err);
      });
  }, []);

  // Filter events based on active criteria
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Type filter
      if (selectedType !== 'todos' && ev.type !== selectedType) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'Todas' && ev.category !== selectedCategory) {
        return false;
      }
      // Free only
      if (freeOnly && !ev.isFree) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(query);
        const matchesVenue = ev.venue.toLowerCase().includes(query);
        const matchesDesc = ev.description.toLowerCase().includes(query);
        const matchesSubtitle = ev.subtitle?.toLowerCase().includes(query) ?? false;
        const matchesTags = ev.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesVenue || matchesDesc || matchesSubtitle || matchesTags;
      }
      return true;
    });
  }, [events, selectedType, selectedCategory, freeOnly, searchTerm]);

  // Counts for header metrics
  const actualCount = useMemo(() => events.filter((e) => e.type === 'actual').length, [events]);
  const proximoCount = useMemo(() => events.filter((e) => e.type === 'proximo').length, [events]);
  const permanenteCount = useMemo(() => events.filter((e) => e.type === 'permanente').length, [events]);

  // Google Search trigger
  const handleGoogleSearch = async (query: string) => {
    setIsSearchingGoogle(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/search-google-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query || searchTerm,
          type: selectedType,
          category: selectedCategory,
        }),
      });

      const data = await response.json();
      if (data && Array.isArray(data.events)) {
        // Merge without duplicates
        setEvents((prev) => {
          const map = new Map<string, CulturalEvent>();
          data.events.forEach((ev: CulturalEvent) => map.set(ev.title.toLowerCase(), ev));
          prev.forEach((ev) => {
            if (!map.has(ev.title.toLowerCase())) {
              map.set(ev.title.toLowerCase(), ev);
            }
          });
          return Array.from(map.values());
        });

        if (data.searchSummary) {
          setStatusMessage(data.searchSummary);
        } else {
          setStatusMessage(
            lang === 'gl'
              ? `Atopáronse ${data.events.length} eventos en Vigo.`
              : `Se encontraron ${data.events.length} eventos en Vigo.`
          );
        }
      }
    } catch (err) {
      console.error('Error searching with Google:', err);
      setStatusMessage(
        lang === 'gl'
          ? 'Amosando eventos locais de Vigo do catálogo de Nosa Cultura.'
          : 'Mostrando eventos locales de Vigo del catálogo de Nosa Cultura.'
      );
    } finally {
      setIsSearchingGoogle(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedType('todos');
    setSelectedCategory('Todas');
    setSearchTerm('');
    setFreeOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221E] flex flex-col font-sans selection:bg-[#E2D7C8]">
      {/* Institutional Disclaimer Notice (Always appears upon entry) */}
      <InstitutionalDisclaimer lang={lang} />

      {/* Sticky App Header with Tabs & Language Switcher */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        totalEvents={events.length}
        actualCount={actualCount}
        proximoCount={proximoCount}
        permanenteCount={permanenteCount}
        onSelectType={setSelectedType}
        activeType={selectedType}
        lang={lang}
        onLanguageChange={setLang}
      />

      {/* Hero Container */}
      <section className="relative border-b border-[#E8E1D3] bg-gradient-to-b from-[#F5F0E6] to-[#FAF8F5] pt-8 sm:pt-10 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Context Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE2D3] border border-[#DDD3C0] text-xs font-semibold text-[#5A4E3F] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C25E3B]"></span>
              {currentTab === 'events' && t.eventsHeroBadge}
              {currentTab === 'participate' && t.participateHeroBadge}
              {currentTab === 'culturaConEnye' && t.culturaConEnyeHeroBadge}
              {currentTab === 'publicAdmin' && t.publicAdminHeroBadge}
              {currentTab === 'radio3' && t.radio3HeroBadge}
            </div>

            {currentTab === 'events' && (
              <>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27221E] tracking-tight leading-[1.18] mb-3.5">
                  {t.eventsHeroTitle1}
                  <span className="italic text-[#C25E3B]">{t.eventsHeroTitle2}</span>.
                </h1>

                <p className="text-sm sm:text-base text-[#665B4E] leading-relaxed mb-6 font-normal">
                  {t.eventsHeroDesc}
                </p>

                {/* Integrated Search Box */}
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onGoogleSearch={handleGoogleSearch}
                  isSearchingGoogle={isSearchingGoogle}
                  lang={lang}
                />

                {/* Search Feedback Message */}
                {statusMessage && (
                  <div className="mt-3.5 inline-flex items-center gap-2 text-xs font-medium bg-[#EFE9DD] text-[#4A3E31] px-3.5 py-1.5 rounded-xl border border-[#DFD5C4] animate-in fade-in">
                    <Sparkles className="w-3.5 h-3.5 text-[#C25E3B]" />
                    <span>{statusMessage}</span>
                  </div>
                )}
              </>
            )}

            {currentTab === 'participate' && (
              <>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27221E] tracking-tight leading-[1.18] mb-3.5">
                  {t.participateHeroTitle1}
                  <span className="italic text-[#C25E3B]">{t.participateHeroTitle2}</span>.
                </h1>

                <p className="text-sm sm:text-base text-[#665B4E] leading-relaxed mb-4 font-normal">
                  {t.participateHeroDesc}
                </p>
              </>
            )}

            {currentTab === 'culturaConEnye' && (
              <>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27221E] tracking-tight leading-[1.18] mb-3.5">
                  {t.culturaConEnyeHeroTitle1}
                  <span className="italic text-[#C25E3B]">{t.culturaConEnyeHeroTitle2}</span>.
                </h1>

                <p className="text-sm sm:text-base text-[#665B4E] leading-relaxed mb-4 font-normal">
                  {t.culturaConEnyeHeroDesc}
                </p>
              </>
            )}

            {currentTab === 'publicAdmin' && (
              <>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27221E] tracking-tight leading-[1.18] mb-3.5">
                  {t.publicAdminHeroTitle1}
                  <span className="italic text-[#C25E3B]">{t.publicAdminHeroTitle2}</span>.
                </h1>

                <p className="text-sm sm:text-base text-[#665B4E] leading-relaxed mb-4 font-normal">
                  {t.publicAdminHeroDesc}
                </p>
              </>
            )}

            {currentTab === 'radio3' && (
              <>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27221E] tracking-tight leading-[1.18] mb-3.5">
                  {t.radio3HeroTitle1}
                  <span className="italic text-[#C25E3B]">{t.radio3HeroTitle2}</span>.
                </h1>

                <p className="text-sm sm:text-base text-[#665B4E] leading-relaxed mb-4 font-normal">
                  {t.radio3HeroDesc}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'participate' && (
          /* TAB 2: A CULTURA FÁLA TI */
          <ParticipateSection lang={lang} />
        )}

        {currentTab === 'culturaConEnye' && (
          /* TAB 3: CULTURA CON Ñ */
          <CulturaConEnyeSection lang={lang} />
        )}

        {currentTab === 'publicAdmin' && (
          /* TAB 4: CONSULTAS CULTURAIS POR ADMINISTRACIÓNS PÚBLICAS */
          <PublicAdminSectionView lang={lang} />
        )}

        {currentTab === 'radio3' && (
          /* TAB 5: RADIO 3 PROGRAMMING GRID */
          <Radio3Section lang={lang} />
        )}

        {currentTab === 'events' && (
          /* TAB 1: VIGO CULTURAL EVENTS */
          <div className="space-y-6">
            {/* Filter Controls Bar */}
            <FilterBar
              selectedType={selectedType}
              onSelectType={setSelectedType}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              freeOnly={freeOnly}
              onToggleFreeOnly={() => setFreeOnly(!freeOnly)}
              lang={lang}
            />

            {/* Results Counter and Active Filter summary */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#736657] border-b border-[#ECE4D8] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#27221E]">
                  {t.foundEventsCount(filteredEvents.length)}
                </span>
                {selectedType !== 'todos' && (
                  <span className="bg-[#EFE8DC] px-2 py-0.5 rounded-md text-[11px] font-medium text-[#4D4235]">
                    {t.typeLabel}: {selectedType}
                  </span>
                )}
                {selectedCategory !== 'Todas' && (
                  <span className="bg-[#EFE8DC] px-2 py-0.5 rounded-md text-[11px] font-medium text-[#4D4235]">
                    {selectedCategory}
                  </span>
                )}
                {freeOnly && (
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[11px] font-medium">
                    {t.freeBadge}
                  </span>
                )}
              </div>

              {(selectedType !== 'todos' || selectedCategory !== 'Todas' || freeOnly || searchTerm) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#C25E3B] hover:underline"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>

            {/* Event List / Empty State */}
            {filteredEvents.length === 0 ? (
              <EmptyState
                searchTerm={searchTerm}
                onResetFilters={handleResetFilters}
                onGoogleSearch={() => handleGoogleSearch(searchTerm)}
                isSearchingGoogle={isSearchingGoogle}
                lang={lang}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onSelect={(ev) => setSelectedEvent(ev)}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Featured Cultural Venues in Vigo Directory (Text & Typography) */}
      {currentTab === 'events' && (
        <section className="bg-[#F3EFE6] border-t border-[#E5DEC7] py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-[#8C7A68] uppercase tracking-wider">
                  {t.venuesTitleBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221E] mt-1">
                  {t.venuesMainTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#73685C] max-w-md">
                {t.venuesDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'MARCO - Museo de Arte Contemporánea',
                  address: 'Rúa do Príncipe, 54, 36202 Vigo',
                  desc:
                    lang === 'gl'
                      ? 'Salas de exposicións contemporáneas, proxectos e actividades educativas gratuítas.'
                      : 'Salas de exposiciones contemporáneas, proyectos y actividades educativas gratuitas.',
                  query: 'MARCO Museo Arte Contemporanea Vigo',
                },
                {
                  name: 'Auditorio Mar de Vigo',
                  address: 'Avenida de Beiramar, 59, 36202 Vigo',
                  desc:
                    lang === 'gl'
                      ? 'Grandes concertos, ópera lírica, ballet e festivais con vistas á ría.'
                      : 'Grandes conciertos, ópera lírica, ballet y festivales con vistas a la ría.',
                  query: 'Auditorio Mar de Vigo',
                },
                {
                  name: 'Teatro Afundación (García Barbón)',
                  address: 'Rúa Policarpo Sanz, 13, 36202 Vigo',
                  desc:
                    lang === 'gl'
                      ? 'Edificio histórico de Antonio Palacios: música sinfónica, danza clásica e teatro.'
                      : 'Edificio histórico de Antonio Palacios: música sinfónica, danza clásica y teatro.',
                  query: 'Teatro Afundacion Vigo',
                },
                {
                  name: 'Museo Quiñones de León e Castrelos',
                  address: 'Parque de Castrelos, s/n, 36213 Vigo',
                  desc:
                    lang === 'gl'
                      ? 'Pinacoteca galega histórica, arqueoloxía e xardíns barrocos franceses BIC de balde.'
                      : 'Pinacoteca gallega histórica, arqueología y jardines barrocos franceses BIC gratuitos.',
                  query: 'Pazo de Castrelos Vigo',
                },
                {
                  name: 'Museo do Mar de Galicia',
                  address: 'Avenida Atlántida, 160, Alcabre, 36208 Vigo',
                  desc:
                    lang === 'gl'
                      ? 'Complexo de Aldo Rossi e César Portela, acuario costeiro e tradición mariñeira.'
                      : 'Complejo de Aldo Rossi y César Portela, acuario costero y tradición marinera.',
                  query: 'Museo do Mar de Galicia Vigo',
                },
                {
                  name: 'Poboado Castrexo de O Castro',
                  address: 'Paseo de Rosalía de Castro, 36203 Vigo',
                  desc:
                    lang === 'gl'
                      ? 'Vivendas indíxenas reconstruídas do século II a.C. e miradoiro sobre a ría de Vigo.'
                      : 'Viviendas indígenas reconstruidas del siglo II a.C. y mirador sobre la ría de Vigo.',
                  query: 'Poboado Castrexo do Castro Vigo',
                },
              ].map((venue, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#E3D9C9] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#C25E3B]">
                      <Landmark className="w-4 h-4 shrink-0" />
                      <h4 className="font-serif font-bold text-base text-[#27221E]">
                        {venue.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#7A6E61] mb-2">
                      📍 {venue.address}
                    </p>
                    <p className="text-xs text-[#524638] leading-relaxed mb-4">
                      {venue.desc}
                    </p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C25E3B] hover:text-[#A84A28] pt-2 border-t border-[#F0EAE0]"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{t.viewOnGoogleMaps}</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-[#8C7A68]" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#241F1B] text-[#D8CEBF] py-12 border-t border-[#3A332C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#3A332C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C25E3B] flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white tracking-tight">
                  {t.appName}
                </span>
                <p className="text-xs text-[#9E907F]">
                  {t.footerSubtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#B5A898]">
              <button
                onClick={() => {
                  setCurrentTab('events');
                  setSelectedType('actual');
                }}
                className="hover:text-white transition-colors"
              >
                {t.footerActual}
              </button>
              <button
                onClick={() => {
                  setCurrentTab('events');
                  setSelectedType('proximo');
                }}
                className="hover:text-white transition-colors"
              >
                {t.footerUpcoming}
              </button>
              <button
                onClick={() => {
                  setCurrentTab('events');
                  setSelectedType('permanente');
                }}
                className="hover:text-white transition-colors"
              >
                {t.footerPermanent}
              </button>
              <button
                onClick={() => setCurrentTab('participate')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C25E3B]" />
                <span>{t.footerParticipate}</span>
              </button>
              <button
                onClick={() => setCurrentTab('culturaConEnye')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="font-serif font-bold text-[#C25E3B] text-xs">Ñ</span>
                <span>{t.footerCulturaConEnye}</span>
              </button>
              <button
                onClick={() => setCurrentTab('publicAdmin')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C25E3B]" />
                <span>{t.footerPublicAdmin}</span>
              </button>
              <button
                onClick={() => setCurrentTab('radio3')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5 text-[#C25E3B]" />
                <span>{t.footerRadio}</span>
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7F70]">
            <p>
              © {new Date().getFullYear()} {t.appName}. {t.footerRights}
            </p>
            <p className="text-[11px] text-[#A69784] bg-[#2F2924] px-3 py-1.5 rounded-lg border border-[#3E3630]">
              {t.disclaimerBannerNotice}
            </p>
          </div>
        </div>
      </footer>

      {/* Event Details Modal (Text-only, clean, no photos) */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          lang={lang}
        />
      )}
    </div>
  );
}
