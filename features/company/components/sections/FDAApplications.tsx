"use client";

import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function FDAApplications({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!company.fdaApplications || company.fdaApplications.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">FDA Drug Applications</h2>
        <button 
          onClick={() => onTabChange && onTabChange('fda')}
          className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
        >
          View All Applications <ArrowRight size={16} />
        </button>
      </div>

      <div className="relative group">
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 px-2"
        >
          {company.fdaApplications.map((app, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[300px] bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all snap-start flex flex-col cursor-pointer group/card">
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  {app.type}
                </span>
              </div>
              
              <h3 className="text-lg font-black text-slate-900 mb-6">{app.type} {app.number}</h3>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-semibold">Brand Name</span>
                  <span className="font-bold text-slate-800 line-clamp-1" title={app.brandName}>{app.brandName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-semibold">Generic Name</span>
                  <span className="font-bold text-slate-800 line-clamp-1" title={app.genericName}>{app.genericName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-semibold">Dosage Form</span>
                  <span className="font-bold text-slate-800 line-clamp-1" title={app.dosageForm}>{app.dosageForm}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 font-semibold">Status</span>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                    <ShieldCheck size={14} />
                    {app.status}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-primary font-bold text-sm mt-auto pt-4 border-t border-slate-100">
                View Details
                <ArrowRight size={16} className="group-hover/card:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
