import React, { useState } from 'react';
import { CompanyDetails } from '../../types';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export function FDAPreview({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const [startIndex, setStartIndex] = useState(0);
  
  if (!company.fdaApplications || company.fdaApplications.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-black text-slate-900">FDA Drug Applications</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center text-slate-500">
          <FileText size={32} className="mb-3 text-slate-300" />
          <p className="font-bold">No public FDA applications found</p>
          <p className="text-sm mt-1">Check the FDA Applications tab for complete search.</p>
        </div>
      </div>
    );
  }

  const items = company.fdaApplications.slice(0, 10);
  const visibleCount = 4;
  
  const handlePrev = () => setStartIndex(Math.max(0, startIndex - 1));
  const handleNext = () => setStartIndex(Math.min(items.length - visibleCount, startIndex + 1));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">FDA Drug Applications</h3>
        <button 
          onClick={() => onTabChange && onTabChange('fda')}
          className="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1"
        >
          View All Applications <ArrowRight size={14} />
        </button>
      </div>

      <div className="relative flex items-center gap-4">
        <button 
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all z-10"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-4 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}>
            {items.map((app, i) => (
              <div key={i} className="min-w-[280px] w-1/4 shrink-0 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">
                    {app.type || 'NDA'}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{app.id}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-bold">Brand Name</span>
                    <span className="font-bold text-slate-800 line-clamp-1">{app.brandName || '-'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-bold">Generic Name</span>
                    <span className="font-bold text-slate-800 line-clamp-1">{app.genericName || '-'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-bold">Dosage Form</span>
                    <span className="font-bold text-slate-800 line-clamp-1">{app.dosageForm || '-'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 font-bold">Status</span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <ShieldCheck size={12} /> {app.status}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => onTabChange && onTabChange('fda')}
                  className="mt-auto pt-3 border-t border-slate-100 text-xs font-bold text-primary flex items-center gap-1"
                >
                  View Details <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleNext}
          disabled={startIndex >= items.length - visibleCount}
          className="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
