"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { DataProvenanceTooltip } from '@/components/ui/DataProvenanceTooltip';

// Fix for default Leaflet icon paths in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getMarkerColor = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('headquarter')) return '#2950DA';
  if (t.includes('manufacturing')) return '#10B981';
  if (t.includes('research') || t.includes('r&d')) return '#8B5CF6';
  if (t.includes('clinical')) return '#F59E0B';
  return '#64748B';
};

export default function GlobalMapRenderer({ facilities }: { facilities: any[] }) {
  // Try to find a center point (prefer HQ)
  let center: [number, number] = [20, 0]; // Default global view
  let zoom = 2;

  const validFacilities = facilities.filter(f => f.latitude != null && f.longitude != null);
  
  if (validFacilities.length > 0) {
    const hq = validFacilities.find(f => f.type?.toLowerCase().includes('headquarter'));
    if (hq) {
      center = [hq.latitude, hq.longitude];
    } else {
      center = [validFacilities[0].latitude, validFacilities[0].longitude];
    }
  }

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-inner border border-slate-200 relative z-0">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {validFacilities.map((fac, idx) => (
          <CircleMarker 
            key={idx} 
            center={[fac.latitude, fac.longitude]} 
            radius={8}
            pathOptions={{ 
              color: getMarkerColor(fac.type || ''),
              fillColor: getMarkerColor(fac.type || ''),
              fillOpacity: 0.7,
              weight: 2
            }}
          >
            <Popup className="rounded-xl overflow-hidden">
              <div className="flex flex-col gap-1 p-1">
                <span className="font-bold text-slate-800 text-sm leading-tight">{fac.name}</span>
                <span className="text-xs font-semibold text-slate-500">{fac.city ? `${fac.city}, ` : ''}{fac.country}</span>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                   <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold uppercase tracking-wider text-slate-600">
                     {fac.type || 'Facility'}
                   </span>
                   {fac.source && (
                     <span className="text-[9px] text-slate-400">Verified by {fac.source}</span>
                   )}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
