import React from 'react';
import { CompanyDetails } from '../../types';
import { ArrowRight, Award } from 'lucide-react';

export function CertificationsPreview({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  if (!company.certificationsList || company.certificationsList.length === 0) {
    return (
      <div className="flex flex-col gap-4 mt-8">
        <h3 className="text-xl font-black text-slate-900">Certifications & Approvals</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center flex flex-col items-center justify-center text-slate-500">
          <Award size={24} className="mb-2 text-slate-300" />
          <p className="font-bold text-sm">No public certifications found</p>
        </div>
      </div>
    );
  }

  const items = company.certificationsList.slice(0, 6);

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">Certifications & Approvals</h3>
        <button 
          onClick={() => onTabChange && onTabChange('regulatory')}
          className="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1"
        >
          View All Certifications <ArrowRight size={14} />
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between overflow-x-auto hide-scrollbar gap-8">
        {items.map((cert, i) => (
          <div key={i} className="flex flex-col items-center gap-3 min-w-[100px]">
            <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm relative">
              {/* Outer dashed ring to look like a seal */}
              <div className="absolute inset-1 border border-dashed border-blue-200 rounded-full"></div>
              <Award size={24} />
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-black text-slate-900">{cert.name}</span>
              <span className="text-[10px] font-bold text-slate-500">{cert.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
