import React, { useState } from 'react';
import { CompanyDetails } from '../../types';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';

export function FDAPreview({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const [startIndex, setStartIndex] = useState(0);
  
  if (!company.fdaApplications || company.fdaApplications.length === 0) {
    return null;
  }

  const items = company.fdaApplications.slice(0, 10);
  const visibleCount = 4;
  
  const handlePrev = () => setStartIndex(Math.max(0, startIndex - 1));
  const handleNext = () => setStartIndex(Math.min(items.length - visibleCount, startIndex + 1));

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Top FDA Applications</h3>
        <button 
          onClick={() => onTabChange && onTabChange('fda')}
          className="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1.5"
        >
          View All {company.totalFdaApplications || items.length} Applications <ArrowRight size={14} />
        </button>
      </div>

      <div className="relative flex items-center gap-4 group/carousel">
        <button 
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute -left-4 w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-0 transition-all z-20 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}>
            {items.map((app, i) => (
              <div key={i} className="min-w-[280px] w-1/4 shrink-0 bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all flex flex-col group cursor-pointer" onClick={() => onTabChange && onTabChange('fda')}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-emerald-100/50 text-emerald-700 border border-emerald-200">
                    {app.type || 'NDA'}
                  </span>
                  <span className="text-sm font-bold text-slate-900 tracking-tight">{app.id}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3 text-xs mb-4 flex-1">
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-bold mb-0.5">Brand Name</span>
                    <span className="font-bold text-slate-800 line-clamp-1">{app.brandName || '-'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-bold mb-0.5">Generic Name</span>
                    <span className="font-bold text-slate-800 line-clamp-1">{app.genericName || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="font-bold text-emerald-600">Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleNext}
          disabled={startIndex >= items.length - visibleCount}
          className="absolute -right-4 w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-0 transition-all z-20 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
