"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Company } from "../services/company.service";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";

// Fix for default marker icons in Leaflet with Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  companies: Company[];
}

export default function MapView({ companies }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="w-full h-[600px] bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>;

  // Center on US / Europe generally or first company if available
  const center: [number, number] = [40.7128, -74.0060]; // Default NYC

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative z-0">
      <MapContainer center={center} zoom={3} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {companies.map((company) => {
          // Fallback geocoding logic for demonstration: assign randomish coordinates based on country/city hash if real coords aren't provided by API
          // In production, the API should return lat/lng
          const hash = company.name.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
          const lat = company.distanceKm ? 40.7128 + (hash % 10) : 34.0522 + (hash % 20) - 10;
          const lng = company.distanceKm ? -74.0060 + (hash % 15) : -118.2437 + (hash % 30) - 15;

          return (
            <Marker key={company.id} position={[lat, lng]} icon={customIcon}>
              <Popup className="rounded-xl">
                <div className="flex flex-col gap-2 min-w-[200px]">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-[10px]">
                        {company.initials}
                      </div>
                    )}
                    {company.name}
                  </div>
                  <div className="text-xs text-slate-600 mb-1">{company.description ? `${company.description.substring(0, 80)}...` : ''}</div>
                  
                  <div className="flex flex-col gap-1 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1"><MapPin size={10} /> {company.city}, {company.country}</div>
                    <div className="flex items-center gap-1"><Users size={10} /> {company.employees}</div>
                  </div>

                  <Link href={`/directory/${company.slug}/overview`} className="mt-2 w-full block text-center py-1.5 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700 transition-colors">
                    View Profile
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
