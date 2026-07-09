"use client";

import React, { useState } from 'react';
import { ArrowRight, Globe2, Building2, Users, Package } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function GlobalPresence({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const presence = company.globalPresence;
  const [activeRegion, setActiveRegion] = useState<string | null>(presence?.[0]?.region || null);

  const currentRegion = presence?.find(p => p.region === activeRegion) || presence?.[0];

  if (!presence || presence.length === 0 || !currentRegion) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Globe2 size={20} className="text-primary" /> Global Presence
        </h3>
        <div className="flex-1 flex items-center justify-center text-slate-400 font-medium p-6 text-center">
          Global presence data not available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
        <Globe2 size={20} className="text-primary" /> Global Presence
      </h3>
      
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          {presence.map(p => (
            <button
              key={p.region}
              onClick={() => setActiveRegion(p.region)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeRegion === p.region 
                  ? 'bg-primary text-white shadow-sm shadow-primary/20' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p.region}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
          <h4 className="text-sm font-black text-slate-900 mb-4">{currentRegion.region} Operations</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Globe2 size={12} /> Countries
              </span>
              <span className="text-lg font-black text-slate-800">{currentRegion.countries?.length || 0}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Building2 size={12} /> Facilities
              </span>
              <span className="text-lg font-black text-slate-800">{currentRegion.facilities}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Users size={12} /> Employees
              </span>
              <span className="text-lg font-black text-slate-800">{currentRegion.employees}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Package size={12} /> Products
              </span>
              <span className="text-lg font-black text-slate-800">{currentRegion.products}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Key Markets</span>
            <div className="flex flex-wrap gap-1.5">
              {currentRegion.countries?.slice(0, 5).map((country, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs font-bold text-slate-600">
                  {country}
                </span>
              ))}
              {(currentRegion.countries?.length || 0) > 5 && (
                <span className="px-2 py-0.5 rounded bg-slate-100 text-xs font-bold text-slate-500">
                  +{currentRegion.countries.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onTabChange && onTabChange('facilities')}
        className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 rounded-xl text-primary font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all group"
      >
        Explore All Facilities
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
