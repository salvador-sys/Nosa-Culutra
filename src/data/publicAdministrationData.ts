export interface ContactChannel {
  nameGl: string;
  nameEs: string;
  purposeGl: string;
  purposeEs: string;
  phone: string;
  phoneRaw: string; // for tel: link
  email?: string;
  scheduleGl: string;
  scheduleEs: string;
  extraInfoGl?: string;
  extraInfoEs?: string;
}

export interface PublicAdminSection {
  id: string;
  adminNameGl: string;
  adminNameEs: string;
  entityGl: string;
  entityEs: string;
  badge: string;
  contacts: ContactChannel[];
}

export const PUBLIC_ADMINISTRATION_DATA: PublicAdminSection[] = [
  {
    id: 'ministerio-cultura',
    adminNameGl: 'Goberno de España',
    adminNameEs: 'Gobierno de España',
    entityGl: 'Ministerio de Cultura',
    entityEs: 'Ministerio de Cultura',
    badge: 'Administración Xeral do Estado',
    contacts: [
      {
        nameGl: 'Bono Cultural Xove: Solicitude e Trámites (FNMT)',
        nameEs: 'Bono Cultural Joven: Solicitud y Trámites (FNMT)',
        purposeGl:
          'Consultas relativas á solicitude do Bono Cultural Xove, estado de tramitación da axuda de 400€ ou incidencias na plataforma web e na aplicación móbil oficial.',
        purposeEs:
          'Consultas relativas a la solicitud del Bono Cultural Joven, estado de tramitación de la ayuda de 400€ o incidencias en la plataforma web y en la app móvil oficial.',
        phone: '+34 91 740 67 93',
        phoneRaw: '+34917406793',
        email: 'bcj@fnmt.es',
        scheduleGl: 'De 8:00 a 19:00 horas, de luns a venres laborables de ámbito nacional.',
        scheduleEs: 'De 8:00 a 19:00 horas, de lunes a viernes laborables de ámbito nacional.',
        extraInfoGl: 'Xestionado pola Fábrica Nacional de Moneda y Timbre (FNMT).',
        extraInfoEs: 'Gestionado por la Fábrica Nacional de Moneda y Timbre (FNMT).',
      },
      {
        nameGl: 'Bono Cultural Xove: Tarxeta e Métodos de Pago (Correos)',
        nameEs: 'Bono Cultural Joven: Tarjeta y Métodos de Pago (Correos)',
        purposeGl:
          'Consultas sobre a activación, bloqueo, extravío ou non recepción da tarxeta física/virtual e resolución de problemas nas compras de produtos e servizos culturais adheridos.',
        purposeEs:
          'Consultas sobre la activación, bloqueo, pérdida o no recepción de la tarjeta física/virtual y resolución de problemas en las compras de productos y servicios culturales adheridos.',
        phone: '+34 911 23 95 69',
        phoneRaw: '+34911239569',
        email: 'bonocultural@correos.com',
        scheduleGl: 'De 9:00 a 18:00 horas, de luns a venres laborables de ámbito nacional.',
        scheduleEs: 'De 9:00 a 18:00 horas, de lunes a viernes laborables de ámbito nacional.',
        extraInfoGl: 'Servizo técnico e de medios de pago facilitado por Correos.',
        extraInfoEs: 'Servicio técnico y de medios de pago facilitado por Correos.',
      },
      {
        nameGl: 'Teléfono de Información Xeral de Cultura',
        nameEs: 'Teléfono de Información General de Cultura',
        purposeGl:
          'Atención cidadá para o resto de consultas culturais do Ministerio de Cultura: patrimonio histórico, axudas, arquivos estatais, museos nacionais e propiedade intelectual.',
        purposeEs:
          'Atención ciudadana para el resto de consultas culturales del Ministerio de Cultura: patrimonio histórico, ayudas, archivos estatales, museos nacionales y propiedad intelectual.',
        phone: '91 701 74 81',
        phoneRaw: '+34917017481',
        scheduleGl:
          'De luns a xoves de 9:00 a 17:30 horas. Venres de 9:00 a 14:30 horas. Horario de verán (do 16 de xuño ao 15 de setembro): de 9:00 a 14:00 horas.',
        scheduleEs:
          'De lunes a jueves de 9:00 a 17:30 horas. Viernes de 9:00 a 14:30 horas. Horario de verano (del 16 de junio al 15 de septiembre): de 9:00 a 14:00 horas.',
        extraInfoGl: 'Sede central do Ministerio de Cultura (Plaza del Rey, 1, Madrid).',
        extraInfoEs: 'Sede central del Ministerio de Cultura (Plaza del Rey, 1, Madrid).',
      },
    ],
  },
  {
    id: 'xunta-galicia',
    adminNameGl: 'Xunta de Galicia',
    adminNameEs: 'Xunta de Galicia',
    entityGl: 'Consellería de Cultura, Lingua e Xuventude',
    entityEs: 'Consellería de Cultura, Lingua e Xuventude',
    badge: 'Administración Autonómica',
    contacts: [
      {
        nameGl: 'Atención e Información Cultural de Galicia',
        nameEs: 'Atención e Información Cultural de Galicia',
        purposeGl:
          'Consultas sobre a programación cultural da Xunta, axudas a creadores galegos, Rede Galega de Teatros e Auditorios, museos autonómicos, festivais de Galicia e trámites culturais.',
        purposeEs:
          'Consultas sobre la programación cultural de la Xunta, ayudas a creadores gallegos, Red Gallega de Teatros y Auditorios, museos autonómicos, festivales de Galicia y trámites culturales.',
        phone: '881 950 002',
        phoneRaw: '+34881950002',
        scheduleGl: 'De luns a venres de 9:00 a 14:00 horas.',
        scheduleEs: 'De lunes a viernes de 9:00 a 14:00 horas.',
        extraInfoGl: 'Edificio Administrativo de San Caetano / Cidade da Cultura, Santiago de Compostela.',
        extraInfoEs: 'Edificio Administrativo de San Caetano / Cidade da Cultura, Santiago de Compostela.',
      },
    ],
  },
  {
    id: 'concello-vigo',
    adminNameGl: 'Concello de Vigo',
    adminNameEs: 'Concello de Vigo',
    entityGl: 'Servizo de Información Cidadá e Cultura Municipal',
    entityEs: 'Servicio de Información Ciudadana y Cultura Municipal',
    badge: 'Administración Local',
    contacts: [
      {
        nameGl: 'Teléfono 010 de Atención e Axenda Municipal',
        nameEs: 'Teléfono 010 de Atención y Agenda Municipal',
        purposeGl:
          'Información en tempo real sobre a programación cultural do Concello de Vigo: reservas de espazos, entradas de concertos municipais en Castrelos e Auditorio, teatros e festivais da cidade.',
        purposeEs:
          'Información en tiempo real sobre la programación cultural del Concello de Vigo: reservas de espacios, entradas de conciertos municipales en Castrelos y Auditorio, teatros y festivales de la ciudad.',
        phone: '010 (desde Vigo) / 986 810 100 (móbiles e fóra de Vigo)',
        phoneRaw: '010',
        scheduleGl: 'De luns a venres de 8:00 a 20:00 horas ininterrompidamente.',
        scheduleEs: 'De lunes a viernes de 8:00 a 20:00 horas ininterrumpidamente.',
        extraInfoGl: 'Casa do Concello de Vigo (Praza do Rei, 1, 36202 Vigo).',
        extraInfoEs: 'Casa do Concello de Vigo (Praza do Rei, 1, 36202 Vigo).',
      },
    ],
  },
];
