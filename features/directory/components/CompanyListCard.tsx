"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, MapPin, Globe, Users, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { Company } from "../services/company.service";
import { useBookmarks } from "../hooks/useBookmarks";

export const CompanyListCard = React.memo(function CompanyListCard({ company }: { company: Company }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(company.id);
  const [imageError, setImageError] = useState(false);

  const getDomain = (url?: string) => {
    if (!url) return null;
    try { return new URL(url.startsWith('http') ? url : `https://${url}`).hostname; } catch { return null; }
  };
  
  const domain = getDomain(company.website);
  const logoSrc = (!imageError && company.logoUrl) ? company.logoUrl : null;
  const tags = [company.industry, company.category, company.companyType].filter(Boolean).slice(0, 3);

  return (
    <div className="group flex flex-col md:flex-row items-start md:items-center bg-white dark:bg-[#0B1120] rounded-[24px] border border-slate-100/80 dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.3)] transition-all duration-500 overflow-hidden relative p-6 gap-6 md:gap-8 z-0 hover:-translate-y-1">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -ml-16 -mt-16 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>

      {/* Logo Glass Container */}
      <div className="relative z-10 shrink-0 w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-[#0F172A] rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] border border-slate-200/50 dark:border-white/10 flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 overflow-hidden">
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt={company.name} 
            className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-3xl font-black bg-gradient-to-br from-indigo-500 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">{company.name.substring(0,2)}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full relative z-10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {company.name}
              </h3>
              {company.verified && (
                <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full ring-1 ring-inset ring-emerald-500/20 shadow-sm">
                  <CheckCircle2 size={12} />
                  Verified
                </div>
              )}
              {company.tier && (
                <div className="flex items-center px-2.5 py-1 rounded-full bg-[#1E293B] text-amber-400 border border-slate-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
                  Tier {company.tier}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 text-[10px] font-bold border border-slate-100 dark:border-white/5 transition-colors group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 group-hover:border-indigo-100 dark:group-hover:border-indigo-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={() => toggleBookmark(company.id)}
            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${bookmarked ? "bg-indigo-600 border-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-700" : "bg-white dark:bg-black/50 border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-500/30"}`}
            aria-label={bookmarked ? "Remove bookmark" : "Save company"}
          >
            <Bookmark size={18} className={bookmarked ? "fill-current" : ""} />
          </button>
        </div>

        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-2 max-w-4xl leading-relaxed mb-5">
          {company.description || "Providing high-quality solutions for the life sciences industry globally."}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 rounded-xl border border-slate-100 dark:border-white/5">
            <MapPin size={14} className="text-slate-400" />
            <span>{company.city ? `${company.city}, ` : ''}{company.country}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 rounded-xl border border-slate-100 dark:border-white/5">
            <Users size={14} className="text-slate-400" />
            <span>{company.employees || "10-50"} Employees</span>
          </div>
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">
              <Globe size={14} className="shrink-0" />
              Website
            </a>
          )}
          {company.certifications && company.certifications.length > 0 && (
            <>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
              {company.certifications.slice(0, 2).map(cert => (
                <span key={cert} className="px-2.5 py-1.5 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-sm truncate max-w-[120px]">
                  {cert}
                </span>
              ))}
            </>
          )}
          {company.completenessScore && (
            <>
              <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 rounded-xl border border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
                <span className={`text-xs font-black ${
                  company.completenessScore >= 80 ? 'text-emerald-500' : 
                  company.completenessScore >= 50 ? 'text-blue-500' : 'text-amber-500'
                }`}>{company.completenessScore}%</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full md:w-auto shrink-0 flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-slate-100 dark:border-white/10 pt-5 md:pt-0 md:pl-8 mt-2 md:mt-0 group/link relative z-10">
        <Link 
          href={`/directory/${company.slug}/overview`} 
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-400 hover:text-white px-7 py-4 rounded-2xl text-sm font-black transition-all duration-300 shadow-sm hover:shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] border border-indigo-100 dark:border-indigo-500/20 hover:border-transparent"
        >
          View Profile
          <ArrowRight size={18} className="group-hover/link:translate-x-1.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
});
