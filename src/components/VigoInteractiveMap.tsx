import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CulturalEvent } from '../types/event';
import { MapPin, Navigation, ExternalLink, Calendar, Tag } from 'lucide-react';

interface VigoInteractiveMapProps {
  events: CulturalEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: CulturalEvent) => void;
  className?: string;
}

export const VigoInteractiveMap: React.FC<VigoInteractiveMapProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if not already done
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [42.2328, -8.7226],
        zoom: 13,
        zoomControl: false,
        attributionControl: true,
      });

      // Warm beige-toned CartoDB Voyager tiles
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
          subdomains: 'abcd',
        }
      ).addTo(map);

      // Custom positioned zoom control
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map alive during simple re-renders
    };
  }, []);

  // Update markers when events change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (events.length === 0) return;

    const bounds = L.latLngBounds([]);

    events.forEach((ev) => {
      const isSelected = ev.id === selectedEventId;
      const isActual = ev.type === 'actual';
      const isPermanente = ev.type === 'permanente';

      // Pick badge colors
      const pinColor = isSelected
        ? '#C25E3B'
        : isActual
        ? '#D97706'
        : isPermanente
        ? '#57534E'
        : '#854D0E';

      const customIcon = L.divIcon({
        className: 'custom-vigo-pin',
        html: `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${isSelected ? '38px' : '30px'};
            height: ${isSelected ? '38px' : '30px'};
            background-color: ${pinColor};
            border: 2px solid #FFFFFF;
            border-radius: 9999px;
            box-shadow: 0 4px 12px rgba(40,30,20,0.35);
            color: #FFFFFF;
            cursor: pointer;
            transition: all 0.2s ease;
            transform: scale(${isSelected ? 1.15 : 1});
          ">
            <svg width="${isSelected ? '18' : '15'}" height="${isSelected ? '18' : '15'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `,
        iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
        iconAnchor: [isSelected ? 19 : 15, isSelected ? 19 : 15],
      });

      const marker = L.marker([ev.coordinates.lat, ev.coordinates.lng], {
        icon: customIcon,
        title: ev.title,
      });

      const mapImg =
        ev.imageUrl && ev.imageUrl.trim() !== ''
          ? ev.imageUrl
          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG/800px-Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG';

      // Custom HTML Popup content
      const popupHtml = `
        <div style="width: 250px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
          <div style="height: 110px; overflow: hidden; position: relative; background: #EFE8DC;">
            <img src="${mapImg}" alt="${ev.title}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG/800px-Vigo_-_Museo_de_Arte_Contempor%C3%A1neo_%28MARCO%29_1.JPG'" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 8px; left: 8px; background: rgba(39, 34, 30, 0.85); color: #fff; font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 9999px; text-transform: uppercase;">
              ${ev.type}
            </div>
            <div style="position: absolute; bottom: 8px; right: 8px; background: #FAF8F5; color: #27221E; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
              ${ev.price}
            </div>
          </div>
          <div style="padding: 12px;">
            <div style="font-size: 10px; color: #8C7E72; text-transform: uppercase; font-weight: 600; margin-bottom: 2px;">
              ${ev.category}
            </div>
            <div style="font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; color: #27221E; line-height: 1.25; margin-bottom: 6px;">
              ${ev.title}
            </div>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: #6E665E; margin-bottom: 10px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C25E3B" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style="font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${ev.venue}</span>
            </div>
            <div style="display: flex; gap: 6px;">
              <button id="popup-btn-${ev.id}" style="flex: 1; background: #C25E3B; color: #FFF; border: none; border-radius: 6px; padding: 6px 10px; font-size: 11px; font-weight: 600; cursor: pointer;">
                Ver información
              </button>
              <a href="${ev.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="background: #F3EFE6; color: #4A3E31; display: flex; align-items: center; justify-content: center; padding: 6px 8px; border-radius: 6px; text-decoration: none; font-size: 11px;" title="Ver en Google Maps">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectEvent(ev);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${ev.id}`);
        if (btn) {
          btn.onclick = () => onSelectEvent(ev);
        }
      });

      marker.addTo(map);
      markersRef.current[ev.id] = marker;
      bounds.extend([ev.coordinates.lat, ev.coordinates.lng]);
    });

    if (events.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [events]);

  // Center on selected event
  useEffect(() => {
    if (!selectedEventId || !mapInstanceRef.current) return;
    const marker = markersRef.current[selectedEventId];
    if (marker) {
      const map = mapInstanceRef.current;
      map.setView(marker.getLatLng(), 15, { animate: true });
      marker.openPopup();
    }
  }, [selectedEventId]);

  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-sm border border-[#E9E3D8] bg-[#F5F2EB] ${className}`}>
      {/* Top Banner on Map */}
      <div className="absolute top-4 left-4 z-[500] bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-[#E6DECF] flex items-center gap-3 pointer-events-auto">
        <div className="w-2.5 h-2.5 rounded-full bg-[#C25E3B] animate-pulse"></div>
        <div>
          <p className="text-xs font-bold text-[#27221E] uppercase tracking-wider">
            Mapa Cultural de Vigo
          </p>
          <p className="text-[11px] text-[#6E665E]">
            {events.length} espazos e eventos xeolocalizados
          </p>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[500] hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-[#E6DECF] text-[11px] text-[#4A3E31] font-medium">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
          <span>Actual</span>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#854D0E]"></span>
          <span>Próximo</span>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#57534E]"></span>
          <span>Permanente</span>
        </div>
      </div>

      {/* Map Target Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[350px]" />
    </div>
  );
};
