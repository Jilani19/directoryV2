import React from 'react';
import Image from 'next/image';
import { ArrowRight, Building, FlaskConical, DollarSign, Globe, Play } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function AboutSection({ company }: { company: CompanyDetails }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
      
      {/* Left side: Content */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 mb-4">About {company.name}</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
          {company.aboutDescription || "No description available."}
        </p>
        
        <div className="flex flex-wrap gap-x-8 gap-y-6 mb-6">
          <div className="flex flex-col gap-1 min-w-[120px]">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
              <Building size={14} />
              Company Type
            </div>
            <span className="text-sm font-bold text-slate-800 break-words">{company.companyType || "-"}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
              <FlaskConical size={14} />
              Industry
            </div>
            <span className="text-sm font-bold text-slate-800 break-words">{company.industry || "-"}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
              <DollarSign size={14} />
              Revenue ({company.performance?.[0]?.period || 'FY24'})
            </div>
            <span className="text-sm font-bold text-slate-800 break-words">{company.performance?.[0]?.revenueValue || company.revenue || "-"}</span>
          </div>
          <div className="flex flex-col gap-1 min-w-[120px]">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
              <Globe size={14} />
              Global Presence
            </div>
            <span className="text-sm font-bold text-slate-800 break-words">{company.globalPresenceCount || "-"}</span>
          </div>
        </div>

        <button className="flex items-center gap-2 text-primary font-bold text-sm w-fit group">
          Read More About Company
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right side: Video */}
      <div className="w-full md:w-[320px] lg:w-[400px] shrink-0">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-slate-900">
          {company.videoUrl && (
            <Image 
              src={company.videoUrl}
              alt="Corporate Video"
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
              <Play size={24} className="text-white ml-1 fill-white" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <span className="text-white font-bold text-sm shadow-sm">Watch Corporate Video</span>
            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md">{company.videoDuration || "00:00"}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
