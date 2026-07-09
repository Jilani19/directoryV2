import React from 'react';
import { CompanyDetails } from '../../types';
import { Building2, Briefcase, Banknote, Globe2, ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { formatCurrency } from '../../utils/formatters';

export function AboutCompany({ company }: { company: CompanyDetails }) {
  if (!company.aboutDescription) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Text and Metadata */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">About {company.name}</h3>
            <p className="text-slate-600 leading-relaxed font-medium mb-8">
              {company.aboutDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Building2 size={18} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company Type</span>
                <span className="text-sm font-bold text-slate-800 truncate">{company.companyType || 'No public data'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Briefcase size={18} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Industry</span>
                <span className="text-sm font-bold text-slate-800 truncate">{company.industry || company.category || 'No public data'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Banknote size={18} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Revenue</span>
                <span className="text-sm font-bold text-slate-800 truncate">{company.revenue ? formatCurrency(company.revenue) : 'No public data'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Globe2 size={18} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Global Presence</span>
                <span className="text-sm font-bold text-slate-800 truncate">{company.countriesServed ? `${company.countriesServed}+ Countries` : 'No public data'}</span>
              </div>
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-primary font-bold hover:text-primary-600 transition-colors self-start group">
            Read More About Company 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Side: Corporate Video Thumbnail */}
        <div className="w-full lg:w-[400px] h-[240px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0">
          <Image 
            src={company.coverImage || '/images/placeholders/video-thumb.jpg'} 
            alt="Corporate Video" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
              <PlayCircle size={32} className="ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent flex items-center justify-between text-white font-bold text-sm">
            <span>Watch Corporate Video</span>
            <span>02:15</span>
          </div>
        </div>
      </div>
    </div>
  );
}
