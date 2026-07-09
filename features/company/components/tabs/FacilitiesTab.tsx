"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Factory, MapPin, Search, ExternalLink, Package, Activity, Award } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function FacilitiesTab({ company }: { company: CompanyDetails }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFacilities = useMemo(() => {
    if (!company.facilitiesList) return [];
    return company.facilitiesList.filter(facility => {
      const query = searchQuery.toLowerCase();
      return (
        facility.name.toLowerCase().includes(query) ||
        facility.city.toLowerCase().includes(query) ||
        facility.country.toLowerCase().includes(query) ||
        facility.type.toLowerCase().includes(query)
      );
    });
  }, [company.facilitiesList, searchQuery]);

  if (!company.facilitiesList || company.facilitiesList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <Factory size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">No publicly available information</h3>
        <p className="text-slate-500 mt-2">We could not find any public records for manufacturing facilities or sites for this company.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          Global Facilities
          <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredFacilities.length}</span>
        </h2>
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search facilities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFacilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-6 group">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-48 h-48 sm:h-36 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                {facility.image ? (
                  <Image src={facility.image} alt={facility.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Factory size={40} className="text-slate-300" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-sm">
                  {facility.type}
                </div>
              </div>
              
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors">{facility.name}</h3>
                
                <div className="flex items-start gap-2 mb-4">
                  <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-600 leading-snug">
                    {facility.address}<br />
                    {facility.city}, {facility.country}
                  </span>
                </div>

                {facility.googleMapsLink && (
                  <a 
                    href={facility.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary font-bold text-xs bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors w-fit"
                  >
                    View on Map <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Details Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 rounded-xl p-4 border border-slate-100">
              {facility.productsManufactured && facility.productsManufactured.length > 0 && (
                <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
                  <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <Package size={14} /> Products Manufactured
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {facility.productsManufactured.map((prod, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-md bg-white border border-slate-200 text-xs font-bold text-slate-700">
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {facility.capacity && (
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <Activity size={14} /> Capacity
                  </span>
                  <span className="font-bold text-slate-800">{facility.capacity}</span>
                </div>
              )}
            </div>

            {/* Certifications */}
            {facility.certifications && facility.certifications.length > 0 && (
              <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-3">
                  <Award size={14} /> Certifications
                </span>
                <div className="flex flex-wrap gap-2">
                  {facility.certifications.map((cert, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-primary/5 border border-primary/20 text-xs font-bold text-primary-700 shadow-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          No facilities match your search.
        </div>
      )}
    </div>
  );
}
