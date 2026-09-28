export type Language = 'gl' | 'es';

export const TRANSLATIONS = {
  gl: {
    // Institutional Disclaimer (Always on entry)
    disclaimerTitle: 'Aviso Importante: Independencia Institucional',
    disclaimerText:
      'Este portal web e a iniciativa «Nosa Cultura» é un proxecto cidadán e independente de divulgación cultural. NON é un organismo público nin oficial do Goberno de España, nin da Xunta de Galicia, nin do Concello de Vigo.',
    disclaimerAcknowledge: 'Entendido e continuar',
    disclaimerBannerNotice:
      'Iniciativa cidadá independente • Non dependente do Concello de Vigo, da Xunta nin do Goberno de España.',

    // Header & Brand
    appName: 'Nosa Cultura',
    city: 'Vigo',
    appSubtitle: 'Axenda cultural de Vigo, iniciativas cidadás e programación de Radio 3',
    tabEvents: 'Eventos en Vigo',
    tabParticipate: 'A cultura fála ti',
    tabCulturaConEnye: 'Cultura con Ñ',
    tabPublicAdmin: 'Teléfonos & Trámites',
    tabRadio3: 'Radio 3',
    filterBy: 'Filtrar por:',
    all: 'Todos',
    actual: 'Actuais',
    proximo: 'Próximos',
    permanente: 'Permanentes',
    freeOnly: 'Só de balde',
    freeBadge: 'De balde',
    clearFilters: 'Limpar todos os filtros',

    // Hero
    eventsHeroBadge: 'Axenda Cultural de Vigo • Eventos Reais',
    participateHeroBadge: 'Guía Práctica • Creación e Participación Cultural en Vigo',
    culturaConEnyeHeroBadge: 'Circuitos Singulares & Festivais de Nicho en España',
    publicAdminHeroBadge: 'Atención Telefónica Oficial por Administracións Públicas',
    radio3HeroBadge: 'RTVE Radio 3 • A Radio da Cultura',
    eventsHeroTitle1: 'A cultura viva de ',
    eventsHeroTitle2: 'Vigo',
    eventsHeroDesc:
      'Consulta a programación cultural real e verídica de Vigo: concertos no Mar de Vigo, exposicións no MARCO, teatro e clásica en Afundación, patrimonio histórico en Castrelos e festas tradicionais.',
    participateHeroTitle1: 'A cultura ',
    participateHeroTitle2: 'fála ti',
    participateHeroDesc:
      'Información real, contrastada e práctica para facer teatro, aprender música tradicional, construír instrumentos, ensaiar de balde coa túa banda, formarte en artes e participar en clubes culturais en Vigo.',
    culturaConEnyeHeroTitle1: 'Cultura con ',
    culturaConEnyeHeroTitle2: 'Ñ',
    culturaConEnyeHeroDesc:
      'Unha selección contrastada de eventos culturais pouco coñecidos, experimentais, vangardas sonoras e festivais de culto en toda a xeografía española.',
    publicAdminHeroTitle1: 'Consultas culturais ',
    publicAdminHeroTitle2: 'oficiais',
    publicAdminHeroDesc:
      'Directorio telefónico de atención cidadá do Ministerio de Cultura (Bono Cultural Xove), Consellería de Lingua, Xuventude e Cultura (Xunta de Galicia) e Concello de Vigo (010).',
    radio3HeroTitle1: 'Programación de ',
    radio3HeroTitle2: 'Radio 3',
    radio3HeroDesc:
      'A emisora pública de RTVE adicada á música alternativa, á arte, ao cinema, ao cómic, á literatura e ao pensamento crítico. Consulta a grella de programas con horarios contrastados e acceso aos seus podcasts.',

    // Search
    searchPlaceholder: 'Buscar por artista, museo, obra, sala ou tipo de evento en Vigo...',
    searchGoogle: 'Buscar en Google',
    searchingGoogle: 'Buscando na rede...',
    clearSearch: 'Limpar busca',
    suggestions: 'Suxestións:',
    foundEventsCount: (count: number) =>
      count === 1 ? '1 evento cultural atopado' : `${count} eventos culturais atopados en Vigo`,
    typeLabel: 'Tipo',

    // Event Card & Modal
    detailsButton: 'Ver información',
    googleMapsButton: 'Google Maps',
    directionsButton: 'Como chegar en Google Maps',
    officialWebButton: 'Web oficial / Entradas',
    shareButton: 'Compartir evento',
    shareSuccess: 'Ligazón copiada ao portapapeis!',
    shareText: (title: string, venue: string) => `Evento cultural en Vigo: ${title} en ${venue}`,
    aboutEvent: 'Información sobre o evento',
    highlights: 'Aspectos destacados',
    dateAndSchedule: 'Data e programación',
    scheduleTime: 'Horario',
    venueInVigo: 'Lugar en Vigo',
    organizer: 'Entidade organizadora',
    defaultOrganizer: 'Concello de Vigo / Entidade Cultural',
    consultSchedule: 'Consultar programación do día',
    locationInVigo: 'Localización en Vigo',

    // Empty state
    emptyTitle: 'Non se atoparon eventos con eses criterios',
    emptyDescSearch: (term: string) =>
      `Non atopamos resultados locais para "${term}". Podes buscar en tempo real en Google para descubrir eventos anunciados en Vigo.`,
    emptyDescFilters:
      'Proba a cambiar o tipo de evento ou a categoría seleccionada para ver máis programación cultural.',
    searchGoogleFor: (term: string) => `Buscar "${term}" en Google`,
    resetFilters: 'Restablecer filtros',

    // Venues Directory
    venuesTitleBadge: 'Recintos & Patrimonio',
    venuesMainTitle: 'Principais sedes culturais en Vigo',
    venuesDesc:
      'Enderezos oficiais e localizacións dos espazos culturais municipais e teatros de referencia na cidade olívica.',
    viewOnGoogleMaps: 'Ver localización en Google Maps',

    // Participate Section
    participateCategoryAll: 'Todas as disciplinas',
    participateCategoryTheater: 'Teatro e Artes Escénicas',
    participateCategoryMusic: 'Música & Locais de Ensaio',
    participateCategoryCrafts: 'Artes, Oficios & Luthería',
    participateCategoryLit: 'Literatura & Clubes de Lectura',
    participateCategoryCommunity: 'Comunidade & Espazos Cívicos',
    enrollmentInfo: 'Como inscribirse e requisitos',
    contactAndLocation: 'Contacto e localización',
    officialLink: 'Máis información oficial',

    // Radio 3 Section
    radio3Title: 'Grella de programación oficial de Radio 3 (RTVE)',
    radio3Subtitle:
      'Horarios reais e verificados da emisora cultural pública. Consulta os directores, descricións e acceso aos podcasts en RTVE Audio.',
    radio3SearchPlaceholder: 'Buscar programa, presentador ou xénero...',
    radio3SlotAll: 'Toda a grella',
    radio3SlotWeek: 'Luns a venres',
    radio3SlotMorning: 'Mañás (06:00 - 14:00)',
    radio3SlotAfternoon: 'Tardes (14:00 - 20:00)',
    radio3SlotNight: 'Noites (20:00 - 02:00)',
    radio3SlotWeekend: 'Fins de semana',
    directedBy: 'Dirixido por',
    audiosAndPodcast: 'Audios e podcasts en RTVE Audio',
    noProgramsFoundTitle: 'Non se atoparon programas con esa busca',
    noProgramsFoundDesc: 'Proba a buscar polo nome doutro programa, xénero ou director de Radio 3.',

    // Footer
    footerSubtitle: 'Axenda cultural de Vigo e programación de Radio 3 (RTVE)',
    footerActual: 'Eventos actuais',
    footerUpcoming: 'Próximos eventos',
    footerPermanent: 'Museos permanentes',
    footerParticipate: 'A cultura fála ti',
    footerCulturaConEnye: 'Cultura con Ñ',
    footerPublicAdmin: 'Teléfonos & Trámites',
    footerRadio: 'Grella Radio 3',
    footerRights: 'Información cultural verídica de Vigo e Radio 3 (RTVE).',
    footerTagline: 'Cultura viva, libre e accesible en lingua galega.',

    // Categories
    catAll: 'Todas',
    catMusic: 'Música',
    catTheater: 'Teatro e Danza',
    catArt: 'Arte e Exposicións',
    catCinema: 'Cinema e Audiovisual',
    catLit: 'Literatura e Charlas',
    catTrad: 'Festivais e Tradición',
    catFamily: 'Infantil e Familiar',
  },
  es: {
    // Institutional Disclaimer (Always on entry)
    disclaimerTitle: 'Aviso Importante: Independencia Institucional',
    disclaimerText:
      'Este portal web y la iniciativa «Nosa Cultura» es un proyecto ciudadano e independiente de divulgación cultural. NO es un organismo público ni oficial del Gobierno de España, ni de la Xunta de Galicia, ni del Concello de Vigo.',
    disclaimerAcknowledge: 'Entendido y continuar',
    disclaimerBannerNotice:
      'Iniciativa ciudadana independiente • No perteneciente al Concello de Vigo, la Xunta ni el Gobierno de España.',

    // Header & Brand
    appName: 'Nosa Cultura',
    city: 'Vigo',
    appSubtitle: 'Agenda cultural de Vigo, iniciativas ciudadanas y programación de Radio 3',
    tabEvents: 'Eventos en Vigo',
    tabParticipate: 'La cultura la haces tú',
    tabCulturaConEnye: 'Cultura con Ñ',
    tabPublicAdmin: 'Teléfonos & Trámites',
    tabRadio3: 'Radio 3',
    filterBy: 'Filtrar por:',
    all: 'Todos',
    actual: 'Actuales',
    proximo: 'Próximos',
    permanente: 'Permanentes',
    freeOnly: 'Solo gratis',
    freeBadge: 'Gratis',
    clearFilters: 'Limpiar todos los filtros',

    // Hero
    eventsHeroBadge: 'Agenda Cultural de Vigo • Eventos Reales',
    participateHeroBadge: 'Guía Práctica • Creación y Participación Cultural en Vigo',
    culturaConEnyeHeroBadge: 'Circuitos Singulares & Festivales de Nicho en España',
    publicAdminHeroBadge: 'Atención Telefónica Oficial por Administraciones Públicas',
    radio3HeroBadge: 'RTVE Radio 3 • La Radio de la Cultura',
    eventsHeroTitle1: 'La cultura viva de ',
    eventsHeroTitle2: 'Vigo',
    eventsHeroDesc:
      'Consulta la programación cultural real y verídica de Vigo: conciertos en el Mar de Vigo, exposiciones en el MARCO, teatro y clásica en Afundación, patrimonio histórico en Castrelos y fiestas tradicionales.',
    participateHeroTitle1: 'La cultura ',
    participateHeroTitle2: 'la haces tú',
    participateHeroDesc:
      'Información real, contrastada y práctica para hacer teatro, aprender música tradicional, construir instrumentos, ensayar gratis con tu banda, formarte en artes y participar en clubes culturales en Vigo.',
    culturaConEnyeHeroTitle1: 'Cultura con ',
    culturaConEnyeHeroTitle2: 'Ñ',
    culturaConEnyeHeroDesc:
      'Una selección contrastada de eventos culturales poco conocidos, experimentales, vanguardias sonoras y festivales de culto en toda la geografía española.',
    publicAdminHeroTitle1: 'Consultas culturales ',
    publicAdminHeroTitle2: 'oficiales',
    publicAdminHeroDesc:
      'Directorio telefónico de atención ciudadana del Ministerio de Cultura (Bono Cultural Joven), Consellería de Lingua, Xuventude e Cultura (Xunta de Galicia) y Concello de Vigo (010).',
    radio3HeroTitle1: 'Programación de ',
    radio3HeroTitle2: 'Radio 3',
    radio3HeroDesc:
      'La emisora pública de RTVE dedicada a la música alternativa, el arte, el cine, el cómic, la literatura y el pensamiento crítico. Consulta la parrilla de programas con horarios contrastados y acceso a sus podcasts.',

    // Search
    searchPlaceholder: 'Buscar por artista, museo, obra, sala o tipo de evento en Vigo...',
    searchGoogle: 'Buscar en Google',
    searchingGoogle: 'Buscando en la red...',
    clearSearch: 'Limpiar búsqueda',
    suggestions: 'Sugerencias:',
    foundEventsCount: (count: number) =>
      count === 1 ? '1 evento cultural encontrado' : `${count} eventos culturales encontrados en Vigo`,
    typeLabel: 'Tipo',

    // Event Card & Modal
    detailsButton: 'Ver información',
    googleMapsButton: 'Google Maps',
    directionsButton: 'Cómo llegar en Google Maps',
    officialWebButton: 'Web oficial / Entradas',
    shareButton: 'Compartir evento',
    shareSuccess: '¡Enlace copiado al portapapeles!',
    shareText: (title: string, venue: string) => `Evento cultural en Vigo: ${title} en ${venue}`,
    aboutEvent: 'Información sobre el evento',
    highlights: 'Aspectos destacados',
    dateAndSchedule: 'Fecha y programación',
    scheduleTime: 'Horario',
    venueInVigo: 'Lugar en Vigo',
    organizer: 'Entidad organizadora',
    defaultOrganizer: 'Concello de Vigo / Entidad Cultural',
    consultSchedule: 'Consultar programación del día',
    locationInVigo: 'Localización en Vigo',

    // Empty state
    emptyTitle: 'No se encontraron eventos con esos criterios',
    emptyDescSearch: (term: string) =>
      `No encontramos resultados locales para "${term}". Puedes buscar en tiempo real en Google para descubrir eventos anunciados en Vigo.`,
    emptyDescFilters:
      'Prueba a cambiar el tipo de evento o la categoría seleccionada para ver más programación cultural.',
    searchGoogleFor: (term: string) => `Buscar "${term}" en Google`,
    resetFilters: 'Restablecer filtros',

    // Venues Directory
    venuesTitleBadge: 'Recintos & Patrimonio',
    venuesMainTitle: 'Principales sedes culturales en Vigo',
    venuesDesc:
      'Direcciones oficiales y localizaciones de los espacios culturales municipales y teatros de referencia en la ciudad olívica.',
    viewOnGoogleMaps: 'Ver localización en Google Maps',

    // Participate Section
    participateCategoryAll: 'Todas las disciplinas',
    participateCategoryTheater: 'Teatro y Artes Escénicas',
    participateCategoryMusic: 'Música & Locales de Ensayo',
    participateCategoryCrafts: 'Artes, Oficios & Luthería',
    participateCategoryLit: 'Literatura & Clubes de Lectura',
    participateCategoryCommunity: 'Comunidad & Espacios Cívicos',
    enrollmentInfo: 'Cómo inscribirse y requisitos',
    contactAndLocation: 'Contacto y localización',
    officialLink: 'Más información oficial',

    // Radio 3 Section
    radio3Title: 'Parrilla de programación oficial de Radio 3 (RTVE)',
    radio3Subtitle:
      'Horarios reales y verificados de la emisora cultural pública. Consulta los directores, descripciones y acceso a los podcasts en RTVE Audio.',
    radio3SearchPlaceholder: 'Buscar programa, presentador o género...',
    radio3SlotAll: 'Toda la parrilla',
    radio3SlotWeek: 'Lunes a viernes',
    radio3SlotMorning: 'Mañanas (06:00 - 14:00)',
    radio3SlotAfternoon: 'Tardes (14:00 - 20:00)',
    radio3SlotNight: 'Noches (20:00 - 02:00)',
    radio3SlotWeekend: 'Fines de semana',
    directedBy: 'Dirigido por',
    audiosAndPodcast: 'Audios y podcasts en RTVE Audio',
    noProgramsFoundTitle: 'No se encontraron programas con esa búsqueda',
    noProgramsFoundDesc: 'Prueba a buscar por el nombre de otro programa, género o director de Radio 3.',

    // Footer
    footerSubtitle: 'Agenda cultural de Vigo y programación de Radio 3 (RTVE)',
    footerActual: 'Eventos actuales',
    footerUpcoming: 'Próximos eventos',
    footerPermanent: 'Museos permanentes',
    footerParticipate: 'La cultura la haces tú',
    footerCulturaConEnye: 'Cultura con Ñ',
    footerPublicAdmin: 'Teléfonos & Trámites',
    footerRadio: 'Parrilla Radio 3',
    footerRights: 'Información cultural verídica de Vigo y Radio 3 (RTVE).',
    footerTagline: 'Cultura viva, libre y accesible.',

    // Categories
    catAll: 'Todas',
    catMusic: 'Música',
    catTheater: 'Teatro y Danza',
    catArt: 'Arte y Exposiciones',
    catCinema: 'Cine y Audiovisual',
    catLit: 'Literatura y Charlas',
    catTrad: 'Festivales y Tradición',
    catFamily: 'Infantil y Familiar',
  },
};
