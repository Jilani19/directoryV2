"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, MapPin, Globe, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { Company } from "../mock/companies";
import { useBookmarks } from "../hooks/useBookmarks";
import { formatDistance } from "../../../lib/utils/distance";

export const CompanyCard = React.memo(function CompanyCard(company: Company & { distanceKm?: number }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(company.id);
  const [imageError, setImageError] = useState(false);

  const getColors = (colorStr: string) => {
    const map: Record<string, { bg: string; text: string }> = {
      "purple-600": { bg: "bg-purple-50", text: "text-purple-700" },
      "blue-600": { bg: "bg-blue-50", text: "text-blue-700" },
      "emerald-600": { bg: "bg-emerald-50", text: "text-emerald-700" },
      "orange-500": { bg: "bg-orange-50", text: "text-orange-600" },
      "rose-600": { bg: "bg-rose-50", text: "text-rose-700" },
      "green-600": { bg: "bg-green-50", text: "text-green-700" },
      "blue-700": { bg: "bg-blue-50", text: "text-blue-800" },
      "yellow-600": { bg: "bg-yellow-50", text: "text-yellow-700" },
      "teal-600": { bg: "bg-teal-50", text: "text-teal-700" },
      "violet-700": { bg: "bg-violet-50", text: "text-violet-800" },
    };
    return map[colorStr] || { bg: "bg-slate-50", text: "text-slate-600" };
  };

  const colors = getColors(company.color);
  const companySlug = company.id;

  return (
    <div className="group flex flex-col bg-white rounded-[2rem] border border-slate-200/70 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1.5 hover:border-primary/30 transition-all duration-300 overflow-hidden relative h-full focus-within:ring-4 focus-within:ring-primary/10">
      
      {/* 1. Header Layer */}
      <div className="flex items-start justify-between p-4 pb-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} ring-1 ring-inset ring-slate-900/5 shadow-sm`}>
            {company.category}
          </span>
          {company.verified && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-500/20 text-[11px] font-bold uppercase tracking-wider shadow-sm" title="Verified Profile">
              <ShieldCheck size={14} className="shrink-0" />
              Verified
            </div>
          )}
          {company.proximityBadge && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset shadow-sm ${
              company.proximityBadge === "Global" 
                ? "bg-slate-50 text-slate-500 ring-slate-500/20" 
                : "bg-indigo-50 text-indigo-700 ring-indigo-500/20"
            }`}>
              {company.proximityBadge === "Global" ? <Globe size={14} className="shrink-0" /> : <MapPin size={14} className="shrink-0" />}
              {company.proximityBadge}
            </div>
          )}
          {company.distanceKm !== undefined && company.proximityBadge === "Near You" && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset shadow-sm bg-indigo-50 text-indigo-700 ring-indigo-500/20">
              <MapPin size={14} className="shrink-0" />
              {formatDistance(company.distanceKm)}
            </div>
          )}
        </div>
        
        <button 
          onClick={() => toggleBookmark(company.id)}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${bookmarked ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110" : "bg-slate-100/80 text-slate-400 hover:bg-slate-200 hover:text-slate-600 hover:scale-105"}`}
          aria-label={bookmarked ? "Remove bookmark" : "Save company"}
          title={bookmarked ? "Remove bookmark" : "Save company"}
        >
          <Bookmark size={18} strokeWidth={bookmarked ? 3 : 2.5} className={bookmarked ? "fill-white" : ""} />
        </button>
      </div>

      {/* 2. Hero Logo Layer */}
      <div className="px-5 pt-4 pb-2 flex flex-col items-center text-center">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl border border-slate-100/80 shadow-sm mb-4 bg-white relative overflow-hidden group-hover:scale-110 group-hover:shadow-md transition-all duration-500 ${(!company.logoUrl || imageError) ? `${colors.bg} ${colors.text}` : ''}`}>
          {(company.logoUrl && !imageError) ? (
            <div className="relative w-full h-full p-2">
              <Image 
                src={company.logoUrl} 
                alt={`${company.name} logo`} 
                fill 
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="64px"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            company.initials
          )}
        </div>
        
        <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {company.name}
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[13px] font-semibold text-slate-500 line-clamp-1">
          <span className="text-slate-700">{company.industry}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <MapPin size={16} className="shrink-0 text-slate-400" />
          <span>{company.city}, {company.country}</span>
        </div>

        {/* Specialties / Tags */}
        {company.certifications && company.certifications.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
            {company.certifications.slice(0, 2).map(cert => (
              <span key={cert} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-semibold text-slate-500 truncate max-w-[120px]">
                {cert}
              </span>
            ))}
            {company.certifications.length > 2 && (
              <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-semibold text-slate-500">
                +{company.certifications.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. Metadata Grid */}
      <div className="px-4 pt-1 pb-4 mt-auto">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-100/50 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Founded</span>
            <span className="text-sm font-black text-slate-800">{company.founded}</span>
          </div>
          <div className="flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-100/50 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Employees</span>
            <span className="text-sm font-black text-slate-800">{company.employees}</span>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="flex items-center justify-center gap-4 border-t border-slate-100 pt-4">
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center flex-1 gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors py-2 rounded-xl hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20">
            <Globe size={16} />
            Website
          </a>
          {company.socialLinks?.linkedin && (
            <a href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center flex-1 gap-2 text-xs font-bold text-slate-600 hover:text-[#0a66c2] transition-colors py-2 rounded-xl hover:bg-[#0a66c2]/5 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/20">
              <ExternalLink size={16} />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* 4. Bottom CTA */}
      <div className="p-3 mt-auto bg-white border-t border-slate-100/60 group-hover:bg-primary/[0.02] transition-colors">
        <Link 
          href={`/company/${companySlug}`} 
          className="flex items-center justify-center w-full py-2.5 rounded-xl text-[13px] font-black text-primary hover:text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 gap-2 group/btn focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
        >
          View Full Profile
          <ArrowRight size={18} className="group-hover/btn:translate-x-1.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
});
