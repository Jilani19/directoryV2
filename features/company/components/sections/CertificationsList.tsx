import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function CertificationsList({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  if (!company.certificationsList || company.certificationsList.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">Certifications & Approvals</h2>
        <button 
          onClick={() => onTabChange && onTabChange('regulatory')}
          className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
        >
          View All Certifications <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {company.certificationsList.map((cert, i) => (
          <div key={i} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
            <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm group-hover:border-primary/50 group-hover:shadow-md transition-all">
              <div className="relative w-12 h-12">
                <Image 
                  src={cert.image} 
                  alt={cert.name} 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <div className="text-center">
              <span className="block text-xs font-black text-slate-900">{cert.name}</span>
              <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{cert.authority}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
