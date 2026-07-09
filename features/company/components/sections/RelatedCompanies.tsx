"use client";

import React from 'react';
import Image from 'next/image';
import { Building2, ArrowRight, MapPin } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function RelatedCompanies({ company }: { company: CompanyDetails }) {
  if (!company.relatedCompanies || company.relatedCompanies.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Building2 size={24} className="text-primary" /> Competitors & Similar Companies
        </h2>
        <a href="#" className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
          View All Similar <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {company.relatedCompanies.map((related) => (
          <a 
            key={related.id} 
            href={`/company/${related.id}`} 
            className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all group"
          >
            <div className="w-20 h-20 rounded-2xl border border-slate-100 p-2 mb-4 bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="relative w-full h-full">
                <Image src={related.logo} alt={related.name} fill className="object-contain" />
              </div>
            </div>
            
            <h3 className="text-base font-black text-slate-900 mb-1 group-hover:text-primary transition-colors line-clamp-1 w-full">{related.name}</h3>
            
            <div className="flex flex-col gap-1 text-xs text-slate-500 font-bold mt-2 w-full">
              <span className="bg-slate-50 py-1 px-2 rounded-md truncate">{related.industry}</span>
              <span className="flex items-center justify-center gap-1 mt-1 text-slate-400"><MapPin size={12} /> {related.location}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
