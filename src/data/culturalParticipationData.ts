export interface CulturalParticipationItem {
  id: string;
  category: 'theater' | 'music' | 'crafts' | 'lit' | 'community';
  title: string;
  entity: string;
  address: string;
  phone?: string;
  email?: string;
  websiteUrl: string;
  googleMapsUrl: string;
  cost: string; // "Gratuíto", "Público subvencionado", etc.
  descriptionGl: string;
  descriptionEs: string;
  howToJoinGl: string;
  howToJoinEs: string;
  requirementsGl: string;
  requirementsEs: string;
  disciplines: string[];
}

export const CULTURAL_PARTICIPATION_DATA: CulturalParticipationItem[] = [
  // --- TEATRO ---
  {
    id: 'emt-vigo',
    category: 'theater',
    title: 'Escola Municipal de Teatro de Vigo (EMT Vigo)',
    entity: 'Concello de Vigo',
    address: 'Avenida de Castelao, 87 (interior), 36213 Vigo',
    phone: '986 485 324 / 986 447 400',
    email: 'em.teatro@vigo.org',
    websiteUrl: 'https://emtvigo.com',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Escola+Municipal+de+Teatro+Vigo+Castelao',
    cost: 'Público subvencionado (11,25€ - 25,85€ / mes)',
    descriptionGl:
      'A escola municipal de referencia para a formación teatral dende os 4 anos ata adultos. Ofrece catro itinerarios pedagóxicos: Dramatización infantil, Básico, Medio e Avanzado, traballando interpretación, voz, expresión corporal e montaxes escénicas con funcións finais abertas ao público.',
    descriptionEs:
      'La escuela municipal de referencia para la formación teatral desde los 4 años hasta adultos. Ofrece cuatro itinerarios pedagógicos: Dramatización infantil, Básico, Medio y Avanzado, trabajando interpretación, voz, expresión corporal y montajes escénicos con funciones finales abiertas al público.',
    howToJoinGl:
      'A preinscrición para novo alumnado ábrese anualmente entre finais de xuño e principios de setembro a través do portal telemático emma.vigo.org ou presencialmente con cita previa. As prazas adxudícanse segundo a orde de convocatoria e probas de nivel para itinerarios medios e avanzados.',
    howToJoinEs:
      'La preinscripción para nuevo alumnado se abre anualmente entre finales de junio y principios de septiembre a través del portal telemático emma.vigo.org o presencialmente con cita previa. Las plazas se adjudican según el orden de convocatoria y pruebas de nivel para itinerarios medios y avanzados.',
    requirementsGl:
      'Estar empadroado/a en Vigo para acceder ás tarifas subvencionadas polo Concello ao 75%. Idades a partir de 4 anos sen límite superior.',
    requirementsEs:
      'Estar empadronado/a en Vigo para acceder a las tarifas subvencionadas por el Concello al 75%. Edades a partir de 4 años sin límite superior.',
    disciplines: ['Interpretación', 'Expresión corporal', 'Voz', 'Dramaturxia', 'Puesta en escena'],
  },
  {
    id: 'sala-artika',
    category: 'theater',
    title: 'Ártika Escola de Teatro & Creación Escénica',
    entity: 'Ártika Cía & Sala de Teatro',
    address: 'Avenida de Beiramar, 113, 36202 Vigo',
    phone: '986 165 735 / 667 808 674',
    email: 'info@artikavigo.com',
    websiteUrl: 'https://artikavigo.com',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Artika+Teatro+Beiramar+113+Vigo',
    cost: 'Privado / Mensualidade por módulo',
    descriptionGl:
      'Espazo independente multidisciplinar con programación regular e escola propia. Imparte cursos continuados de teatro para todas as idades, danza contemporánea, danza aérea en teas acrobáticas e obradoiros monográficos de dramatruxia e técnica actoral.',
    descriptionEs:
      'Espacio independiente multidisciplinar con programación regular y escuela propia. Imparte cursos continuados de teatro para todas las edades, danza contemporánea, danza aérea en telas acrobáticas y talleres monográficos de dramaturgia y técnica actoral.',
    howToJoinGl:
      'Matrícula aberta durante todo o ano (con comezo habitual de curso en outubro). Podes solicitar unha clase de proba ou informarte directamente no seu local en Beiramar ou por teléfono.',
    howToJoinEs:
      'Matrícula abierta durante todo el año (con inicio habitual de curso en octubre). Puedes solicitar una clase de prueba o informarte directamente en su local en Beiramar o por teléfono.',
    requirementsGl: 'Aberto a público infantil, xuvenil e adulto de calquera nivel.',
    requirementsEs: 'Abierto a público infantil, juvenil y adulto de cualquier nivel.',
    disciplines: ['Teatro físico', 'Danza aérea en teas', 'Danza contemporánea', 'Interpretación xuvenil'],
  },
  {
    id: 'teatro-ensalle',
    category: 'theater',
    title: 'Teatro Ensalle: Laboratorio e Cursos de Interpretación',
    entity: 'Compañía e Sala Ensalle',
    address: 'Rúa Chile, 15, 36202 Vigo',
    phone: '986 485 609',
    email: 'teatroensalle@teatroensalle.com',
    websiteUrl: 'https://teatroensalle.com',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Teatro+Ensalle+Rua+Chile+15+Vigo',
    cost: 'Cursos e obradoiros especializados',
    descriptionGl:
      'Unha das salas independentes de teatro contemporáneo e vangarda máis recoñecidas de Galicia. Ofrece obradoiros intensivos con creadores estatais e internacionais, formación actoral en teatro físico e espazos de residencia e produción para proxectos emerxentes.',
    descriptionEs:
      'Una de las salas independientes de teatro contemporáneo y vanguardia más reconocidas de Galicia. Ofrece talleres intensivos con creadores estatales e internacionales, formación actoral en teatro físico y espacios de residencia y producción para proyectos emergentes.',
    howToJoinGl:
      'Inscrición por convocatoria a través do seu correo electrónico ou na súa sede na Rúa Chile. Posibilidade de asociarse como socio colaborador con vantaxes en obradoiros.',
    howToJoinEs:
      'Inscripción por convocatoria a través de su correo electrónico o en su sede en la Rúa Chile. Posibilidad de asociarse como socio colaborador con ventajas en talleres.',
    requirementsGl: 'Actores, bailaríns, creadores escénicos e persoas con interese na linguaxe contemporánea.',
    requirementsEs: 'Actores, bailarines, creadores escénicos y personas con interés en el lenguaje contemporáneo.',
    disciplines: ['Vangarda escénica', 'Danza contemporánea', 'Residencias artísticas', 'Dramaturxia'],
  },

  // --- MÚSICA & LOCAIS DE ENSAIO ---
  {
    id: 'vigosonico',
    category: 'music',
    title: 'Vigosónico: Salas Públicas de Ensaio Musical Gratuitas',
    entity: 'Concellería de Xuventude - Concello de Vigo',
    address: 'Parque Tecnolóxico de Valadares, Rúa do Portal s/n, 36315 Vigo',
    phone: '986 616 388',
    email: 'vigosonico@gmail.com',
    websiteUrl: 'https://vigosonico.com',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vigosonico+Parque+Tecnoloxico+Valadares+Vigo',
    cost: '100% De balde (Servizo público municipal)',
    descriptionGl:
      'Complexo público municipal dotado con 5 salas de ensaio profesionais insonorizadas, climatizadas e totalmente equipadas con batería completa, amplificadores de guitarra e baixo, xogo de voces/PA, microfonía e mesa de mesturas para bandas e solistas.',
    descriptionEs:
      'Complejo público municipal dotado con 5 salas de ensayo profesionales insonorizadas, climatizadas y totalmente equipadas con batería completa, amplificadores de guitarra y bajo, juego de voces/PA, microfonía y mesa de mezclas para bandas y solistas.',
    howToJoinGl:
      'As quendas de ensaio adxudícanse trimestralmente mediante convocatoria pública en xuventudevigo.org e vigosonico.com na última semana de cada trimestre. Tamén se poden solicitar horas soltas entre convocatorias se hai ocos libres contactando por teléfono ou email.',
    howToJoinEs:
      'Los turnos de ensayo se adjudican trimestralmente mediante convocatoria pública en xuventudevigo.org y vigosonico.com en la última semana de cada trimestre. También se pueden solicitar horas sueltas entre convocatorias si hay huecos libres contactando por teléfono o email.',
    requirementsGl:
      'Grupos con músicos de 13 a 30 anos onde polo menos o 50%+1 dos membros estean empadroados en Vigo ou matriculados nun centro educativo da cidade.',
    requirementsEs:
      'Grupos con músicos de 13 a 30 años donde al menos el 50%+1 de los miembros estén empadronados en Vigo o matriculados en un centro educativo de la ciudad.',
    disciplines: ['Ensaio de bandas', 'Rock, Pop, Metal, Jazz, Folk', 'Gravación básica', 'Música urbana'],
  },
  {
    id: 'etrad-vigo',
    category: 'music',
    title: 'ETRAD: Escola Municipal de Música Folk e Tradicional',
    entity: 'Concello de Vigo',
    address: 'Avenida García Barbón, 5, 36201 Vigo',
    phone: '986 228 088',
    email: 'etrad@vigo.org',
    websiteUrl: 'https://etradvigo.org',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=ETRAD+Garcia+Barbon+5+Vigo',
    cost: 'Público subvencionado polo Concello',
    descriptionGl:
      'A escola pioneira en Galicia para a ensinanza e dignificación da música tradicional galega e o folk urbano. Conta con dez especialidades: Gaita galega, Zanfona, Acordeón diatónico, Arpa céltica, Requinta, Percusión tradicional, Violín folk, Corda pulsada, Canto popular e Música e movemento infantil (4 a 7 anos).',
    descriptionEs:
      'La escuela pionera en Galicia para la enseñanza y dignificación de la música tradicional gallega y el folk urbano. Cuenta con diez especialidades: Gaita gallega, Zanfona, Acordeón diatónico, Arpa céltica, Requinta, Percusión tradicional, Violín folk, Cuerda pulsada, Canto popular y Música y movimiento infantil (4 a 7 años).',
    howToJoinGl:
      'Solicitude de praza aberta cada ano entre xuño e setembro a través de emma.vigo.org. Conta con itinerarios básico, medio e avanzado, ademais de «Aulas Abertas» para práctica de conxunto e orquestra folk.',
    howToJoinEs:
      'Solicitud de plaza abierta cada año entre junio y septiembre a través de emma.vigo.org. Cuenta con itinerarios básico, medio y avanzado, además de «Aulas Abiertas» para práctica de conjunto y orquesta folk.',
    requirementsGl:
      'Empadroamento en Vigo para a cota pública bonificada. Non se require formación musical previa para o nivel básico de iniciación.',
    requirementsEs:
      'Empadronamiento en Vigo para la cuota pública bonificada. No se requiere formación musical previa para el nivel básico de iniciación.',
    disciplines: ['Gaita', 'Zanfona', 'Percusión galega', 'Arpa céltica', 'Canto tradicional', 'Violín'],
  },

  // --- ARTES, OFICIOS & LUTHERÍA ---
  {
    id: 'emao-vigo',
    category: 'crafts',
    title: 'EMAO: Escola Municipal de Artes e Oficios de Vigo',
    entity: 'Concello de Vigo',
    address: 'Avenida García Barbón, 5, 36201 Vigo',
    phone: '986 228 088',
    email: 'emao@vigo.org',
    websiteUrl: 'https://hoxe.vigo.org',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=EMAO+Escola+Artes+e+Oficios+Garcia+Barbon+5+Vigo',
    cost: '100% De balde (Matrícula e ensino gratuítos)',
    descriptionGl:
      'Histórica institución fundada en 1886 que ofrece formación artística e artesanal de primeiro nivel totalmente de balde. Especialidades destacadas: Construción artesanal de instrumentos musicais (CAIM: luthería de gaita, zanfona e corda), Cerámica artística, Talla e escultura en madeira, Debuxo e pintura artística, Ourivería, Artesanía en coiro, Serigrafía artística e Moda.',
    descriptionEs:
      'Histórica institución fundada en 1886 que ofrece formación artística y artesanal de primer nivel totalmente gratuita. Especialidades destacadas: Construcción artesanal de instrumentos musicales (CAIM: luthería de gaita, zanfona y cuerda), Cerámica artística, Talla y escultura en madera, Dibujo y pintura artística, Orfebrería, Artesanía en cuero, Serigrafía artística y Moda.',
    howToJoinGl:
      'Prazo de preinscrición anual do 22 de xuño ao 4 de setembro. Solicitude telemática ou presencial na secretaría da EMAO. Asignación de prazas por sorteo público para novo ingreso e probas de admisión en CAIM e talleres especializados.',
    howToJoinEs:
      'Plazo de preinscripción anual del 22 de junio al 4 de septiembre. Solicitud telemática o presencial en la secretaría de la EMAO. Asignación de plazas por sorteo público para nuevo ingreso y pruebas de admisión en CAIM y talleres especializados.',
    requirementsGl:
      'Maiores de 16 anos. As ensinanzas son 100% gratuítas, o alumnado só achega os materiais propios de traballo.',
    requirementsEs:
      'Mayores de 16 años. Las enseñanzas son 100% gratuitas, el alumnado solo aporta los materiales propios de trabajo.',
    disciplines: ['Luthería tradicional', 'Cerámica', 'Talla en madeira', 'Pintura', 'Ourivería', 'Serigrafía'],
  },

  // --- LITERATURA & CLUBES DE LECTURA ---
  {
    id: 'biblioteca-juan-companel',
    category: 'lit',
    title: 'Clubes de Lectura e Creación Literaria: Biblioteca Juan Compañel',
    entity: 'Rede de Bibliotecas Públicas de Galicia',
    address: 'Rúa Joaquín Yáñez, 6 (Casco Vello), 36202 Vigo',
    phone: '886 120 445',
    email: 'biblio.publica.vigo@xunta.gal',
    websiteUrl: 'https://bibliotecas.xunta.gal/vigo',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Biblioteca+Publica+Juan+Companel+Vigo',
    cost: '100% De balde',
    descriptionGl:
      'A Biblioteca Pública de Vigo situada no pazo histórico de Joaquín Yáñez no Casco Vello organiza cada tempada (outubro a maio) a maior rede de clubes de lectura da cidade: Clubes en lingua galega, castelá, banda deseñada (cómic), lectura dramatizada teatral, e en idiomas estranxeiros (inglés, francés, italiano e portugués), con encontros con escritores.',
    descriptionEs:
      'La Biblioteca Pública de Vigo situada en el palacio histórico de Joaquín Yáñez en el Casco Vello organiza cada temporada (octubre a mayo) la mayor red de clubes de lectura de la ciudad: Clubes en lengua gallega, castellana, cómic, lectura dramatizada teatral, y en idiomas extranjeros (inglés, francés, italiano y portugués), con encuentros con escritores.',
    howToJoinGl:
      'Preinscrición presencial na hemeroteca da biblioteca ou por teléfono no 886 120 445 durante o mes de setembro. Se as solicitudes superan as prazas, realízase sorteo público.',
    howToJoinEs:
      'Preinscripción presencial en la hemeroteca de la biblioteca o por teléfono en el 886 120 445 durante el mes de septiembre. Si las solicitudes superan las plazas, se realiza sorteo público.',
    requirementsGl:
      'Dispor do carné da Rede de Bibliotecas de Galicia (gratuíto no momento co DNI) e ganas de ler e debater.',
    requirementsEs:
      'Disponer del carnet de la Rede de Bibliotecas de Galicia (gratuito al momento con el DNI) y ganas de leer y debatir.',
    disciplines: ['Lectura compartida', 'Literatura galega', 'Banda deseñada', 'Lectura dramatizada', 'Idiomas'],
  },

  // --- COMUNIDADE & ASOCIACIONISMO ---
  {
    id: 'centros-civicos-vigo',
    category: 'community',
    title: 'Rede de Centros Cívicos e Culturais Veciñais de Vigo',
    entity: 'Federación Veciñal Eduardo Chao & Concello de Vigo',
    address: 'Sedes en Casco Vello, Teis, Calvario, Coruxo, Lavadores, Matamá, Saiáns, etc.',
    phone: '986 810 100 (Información Cidadá 010)',
    email: 'participacion.cidadan@vigo.org',
    websiteUrl: 'https://hoxe.vigo.org',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Centros+Civicos+Vigo+participacion+cidadan',
    cost: 'De balde para colectivos veciñais e asociacións',
    descriptionGl:
      'A rede municipal de centros cívicos e locais veciñais ofrece cesión de espazos, salas de ensaio e aulas polivalentes para asociacións culturais sen ánimo de lucro, grupos de teatro afeccionado, corais parroquiais, grupos de danza tradicional e colectivos artísticos de barrio.',
    descriptionEs:
      'La red municipal de centros cívicos y locales vecinales ofrece cesión de espacios, salas de ensayo y aulas polivalentes para asociaciones culturales sin ánimo de lucro, grupos de teatro aficionado, corales parroquiales, grupos de danza tradicional y colectivos artísticos de barrio.',
    howToJoinGl:
      'Tramitación da solicitude de cesión de espazos no rexistro xeral do Concello de Vigo ou directamente coa directiva da Asociación Veciñal do barrio correspondente.',
    howToJoinEs:
      'Tramitación de la solicitud de cesión de espacios en el registro general del Concello de Vigo o directamente con la directiva de la Asociación Vecinal del barrio correspondiente.',
    requirementsGl:
      'Estar constituído como asociación ou colectivo cultural con proxecto de dinamización para a veciñanza.',
    requirementsEs:
      'Estar constituido como asociación o colectivo cultural con proyecto de dinamización para el vecindario.',
    disciplines: ['Asociacionismo', 'Teatro comunitario', 'Danza tradicional', 'Dinamización veciñal'],
  },
];
