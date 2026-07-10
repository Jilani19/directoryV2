import React from 'react';
import { CompanyDetails } from '../../types';
import { ArrowRight, Award } from 'lucide-react';

export function CertificationsPreview({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  if (!company.certificationsList || company.certificationsList.length === 0) {
    return null;
  }

  const items = company.certificationsList.slice(0, 6);

  return (
    <div className="flex flex-col gap-5 mt-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Major Certifications</h3>
        <button 
          onClick={() => onTabChange && onTabChange('regulatory')}
          className="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1.5"
        >
          View All {company.certificationsCount || items.length} Certifications <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((cert, i) => (
          <div key={i} className="bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/30 transition-all cursor-pointer group" onClick={() => onTabChange && onTabChange('regulatory')}>
            <div className="w-16 h-16 rounded-full bg-blue-50/50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm relative group-hover:scale-110 transition-transform">
              <div className="absolute inset-1 border border-dashed border-blue-200 rounded-full group-hover:border-blue-400 transition-colors"></div>
              <Award size={24} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-black text-slate-900 tracking-tight mb-1">{cert.name}</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">{cert.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
