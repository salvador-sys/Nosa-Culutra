import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_VIGO_EVENTS } from './src/data/vigoEvents.ts';
import { CulturalEvent, EventType, EventCategory } from './src/types/event.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory events store seeded with real curated authentic Vigo events
let eventsStore: CulturalEvent[] = [...INITIAL_VIGO_EVENTS];

// Helper to get verified, authentic photo of the actual cultural venue/type in Vigo
function getAuthenticVenueImageUrl(venue: string, title: string, category: string): string {
  const v = (venue || '').toLowerCase();
  const t = (title || '').toLowerCase();
  const c = (category || '').toLowerCase();

  // Specific event mappings
  if (t.includes('lago de los cisnes') || t.includes('cisnes') || t.includes('ballet')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Swan_Lake_at_the_Bolshoi_2006.jpg/800px-Swan_Lake_at_the_Bolshoi_2006.jpg';
  }
  if (t.includes('butterfly') || t.includes('puccini')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Madama_Butterfly%2C_Modello_Scene_-_Ugo_Nespolo.jpg/800px-Madama_Butterfly%2C_Modello_Scene_-_Ugo_Nespolo.jpg';
  }
  if (t.includes('pagliacci') || t.includes('leoncavallo')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pagliacci_Original_Score_Cover.jpg/800px-Pagliacci_Original_Score_Cover.jpg';
  }
  if (t.includes('kiko veneno')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Kiko_veneno_%282005%29.jpg/800px-Kiko_veneno_%282005%29.jpg';
  }
  if (t.includes('reconquista') || v.includes('casco vello') || v.includes('constituc')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Reconquista_de_vigo.jpg/800px-Reconquista_de_vigo.jpg';
  }
  if (v.includes('castro') || t.includes('castrexo')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Castro_de_vigo.jpg/800px-Castro_de_vigo.jpg';
  }
  if (v.includes('museo do mar') || v.includes('alcabre')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Museo_do_mar_de_Galicia_-_faro.jpg/800px-Museo_do_mar_de_Galicia_-_faro.jpg';
  }
  if (v.includes('castrelos') || v.includes('quiñones') || v.includes('alcedo')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Pazo_Qui%C3%B1ones_de_Le%C3%B3n%2C_Castrelos_edited.jpg/800px-Pazo_Qui%C3%B1ones_de_Le%C3%B3n%2C_Castrelos_edited.jpg';
  }
  if (v.includes('marco') || v.includes('contempor')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG/800px-Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG';
  }
  if (v.includes('afundaci') || v.includes('garc') || v.includes('barb') || v.includes('policarpo') || v.includes('laxeiro')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Teatro_Garc%C3%ADa_Barb%C3%B3n.jpg/800px-Teatro_Garc%C3%ADa_Barb%C3%B3n.jpg';
  }
  if (v.includes('mar de vigo') || v.includes('beiramar')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Auditorio_Mar_de_Vigo%2C_dende_o_peirao.JPG/800px-Auditorio_Mar_de_Vigo%2C_dende_o_peirao.JPG';
  }

  // Fallbacks by category
  if (c.includes('teatro') || c.includes('danza')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Teatro_Garc%C3%ADa_Barb%C3%B3n.jpg/800px-Teatro_Garc%C3%ADa_Barb%C3%B3n.jpg';
  }
  if (c.includes('música') || c.includes('musica')) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Auditorio_Mar_de_Vigo%2C_dende_o_peirao.JPG/800px-Auditorio_Mar_de_Vigo%2C_dende_o_peirao.JPG';
  }
  return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG/800px-Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG';
}

// GET /api/events
app.get('/api/events', (req, res) => {
  try {
    const { type, category, q, freeOnly } = req.query;

    let filtered = [...eventsStore];

    if (type && type !== 'todos') {
      filtered = filtered.filter((e) => e.type === type);
    }

    if (category && category !== 'Todas') {
      filtered = filtered.filter((e) => e.category === category);
    }

    if (freeOnly === 'true') {
      filtered = filtered.filter((e) => e.isFree);
    }

    if (q && typeof q === 'string' && q.trim().length > 0) {
      const searchTerm = q.trim().toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(searchTerm) ||
          e.venue.toLowerCase().includes(searchTerm) ||
          e.description.toLowerCase().includes(searchTerm) ||
          e.tags.some((t) => t.toLowerCase().includes(searchTerm)) ||
          (e.subtitle && e.subtitle.toLowerCase().includes(searchTerm))
      );
    }

    res.json({
      events: filtered,
      total: filtered.length,
      source: 'catalog',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

// POST /api/search-google-events
app.post('/api/search-google-events', async (req, res) => {
  const { query, type = 'todos', category = 'Todas' } = req.body;
  const searchQuery = query?.trim() || '';

  // If no GEMINI_API_KEY is configured, fallback to smart internal search
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    const fallbackFiltered = eventsStore.filter((e) => {
      const matchesType = type === 'todos' || e.type === type;
      const matchesCategory = category === 'Todas' || e.category === category;
      const matchesQ =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesCategory && matchesQ;
    });

    return res.json({
      events: fallbackFiltered,
      total: fallbackFiltered.length,
      query: searchQuery,
      source: 'catalog',
      searchSummary: `Mostrando eventos reais e actuais de Vigo para "${searchQuery || 'axenda cultural'}".`,
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `Es un experto documentalista en la agenda cultural de Vigo (Galicia, España).
El usuario busca eventos culturales reales, verídicos y actuales en Vigo: actuales, próximos o permanentes.
Debes buscar en Google eventos reales de Vigo (música, teatro, danza, ópera, exposiciones en MARCO o museos, festivales, conciertos en Auditorio Mar de Vigo, Castrelos, Teatro Afundación / García Barbón, Casa das Artes, etc.).

Genera una lista en formato JSON estrictamente válido que contenga un array llamado "events".
Cada objeto del array debe tener:
- id: string único (ej: "vigo-evento-1")
- title: string con el título del evento o exposición real
- subtitle: string breve explicativo
- type: 'actual' | 'proximo' | 'permanente'
- category: Una de ('Música', 'Teatro e Danza', 'Arte e Exposicións', 'Cinema e Audiovisual', 'Literatura e Charlas', 'Festivais e Tradición', 'Infantil e Familiar')
- venue: Nombre verídico del lugar o recinto en Vigo (ej: 'Auditorio Mar de Vigo', 'MARCO', 'Teatro Afundación', 'Pazo de Castrelos', 'Museo do Mar de Galicia', etc.)
- address: Dirección real en Vigo (con código postal 362XX Vigo)
- coordinates: { lat: número aproximado en Vigo (ej: 42.23XX), lng: número aproximado en Vigo (ej: -8.72XX) }
- startDate: fecha real o momento (ej: '23 de Outubro de 2026', 'Ata o 1 de novembro', 'Permanente')
- endDate: fecha final opcional
- scheduleTime: horario aproximado
- price: string del precio verídico (ej: 'De balde', '24€', etc.)
- isFree: boolean (true si es gratuito)
- description: descripción verídica y documentada del evento cultural
- fullDetails: detalles adicionales, artistas, programa
- organizer: organizador o promotor real (ej: Concello de Vigo, Afundación, etc.)
- imageUrl: URL de imagen que represente fielmente el evento o el recinto cultural de Vigo
- googleMapsUrl: URL a Google Maps (ej: https://www.google.com/maps/search/?api=1&query=Lugar+Vigo)
- highlights: array de 2 o 3 puntos destacados verídicos
- tags: array de 3 o 4 etiquetas

IMPORTANTE: Responde ÚNICAMENTE con el bloque JSON válido, sin texto adicional alrededor.`;

    const userMessage = `Busca eventos culturales reales, verídicos y actuales en Vigo relacionados con: "${searchQuery || 'eventos culturais actuais e próximos en Vigo'}". Filtro tipo: ${type}, categoría: ${category}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        tools: [{ googleSearch: {} }],
      },
    });

    const responseText = response.text || '';
    let parsedEvents: CulturalEvent[] = [];

    // Extract JSON block
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, responseText];
    const candidateJson = jsonMatch[1]?.trim() || responseText.trim();

    try {
      const parsed = JSON.parse(candidateJson);
      if (Array.isArray(parsed.events)) {
        parsedEvents = parsed.events.map((ev: any, idx: number) => {
          const validImg =
            ev.imageUrl && ev.imageUrl.startsWith('http') && !ev.imageUrl.includes('placeholder')
              ? ev.imageUrl
              : getAuthenticVenueImageUrl(ev.venue || '', ev.title || '', ev.category || '');

          return {
            ...ev,
            id: ev.id || `live-vigo-${Date.now()}-${idx}`,
            source: 'google_search',
            coordinates: {
              lat: typeof ev.coordinates?.lat === 'number' ? ev.coordinates.lat : 42.2328 + (Math.random() - 0.5) * 0.02,
              lng: typeof ev.coordinates?.lng === 'number' ? ev.coordinates.lng : -8.7226 + (Math.random() - 0.5) * 0.02,
            },
            imageUrl: validImg,
            googleMapsUrl:
              ev.googleMapsUrl ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((ev.venue || '') + ' Vigo')}`,
          };
        });
      }
    } catch (parseErr) {
      console.warn('Could not parse Google Search model output as JSON:', parseErr);
    }

    if (parsedEvents.length > 0) {
      // Add newly found unique events to memory store
      for (const ev of parsedEvents) {
        if (!eventsStore.some((e) => e.title.toLowerCase() === ev.title.toLowerCase())) {
          eventsStore.unshift(ev);
        }
      }

      return res.json({
        events: parsedEvents,
        total: parsedEvents.length,
        query: searchQuery,
        source: 'google_search',
        searchSummary: `Atopáronse eventos culturais en Vigo a través de Google Search para "${searchQuery || 'eventos culturais'}".`,
        timestamp: new Date().toISOString(),
      });
    }

    // Fallback if model returned no events
    const matchingCurated = eventsStore.filter((e) => {
      const matchesType = type === 'todos' || e.type === type;
      const matchesCategory = category === 'Todas' || e.category === category;
      const matchesQ =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesCategory && matchesQ;
    });

    return res.json({
      events: matchingCurated,
      total: matchingCurated.length,
      query: searchQuery,
      source: 'catalog',
      searchSummary: `Amosando eventos culturais reais de Vigo para "${searchQuery}".`,
      timestamp: new Date().toISOString(),
    });
  } catch (apiError) {
    console.error('Error querying Gemini with Google Search:', apiError);

    // Gracefully fallback
    const fallbackFiltered = eventsStore.filter((e) => {
      const matchesType = type === 'todos' || e.type === type;
      const matchesCategory = category === 'Todas' || e.category === category;
      const matchesQ =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesCategory && matchesQ;
    });

    return res.json({
      events: fallbackFiltered,
      total: fallbackFiltered.length,
      query: searchQuery,
      source: 'catalog',
      searchSummary: `Resultados culturais en Vigo para "${searchQuery || 'cultura en Vigo'}".`,
      timestamp: new Date().toISOString(),
    });
  }
});

// Configure Vite integration
async function setupServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nosa Cultura server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

setupServer();
