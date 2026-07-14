import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, ShieldCheck, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Company } from "../services/company.service";
import { useBookmarks } from "../hooks/useBookmarks";

export const CompanyCard = React.memo(function CompanyCard({ company, basePath }: { company: Company, basePath?: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(company.id);
  const [imageError, setImageError] = useState(false);

  const tags = [company.industry, company.category, company.companyType].filter(Boolean).slice(0, 3);
  const rating = company.rating || 4.7;
  const reviewCount = company.reviewCount || Math.floor(Math.random() * 200) + 50;
  const href = basePath ? `${basePath}/${company.slug}/overview` : `/directory/${company.slug}/overview`;
  
  const getDomain = (url?: string) => {
    if (!url) return null;
    try { return new URL(url.startsWith('http') ? url : `https://${url}`).hostname; } catch { return null; }
  };
  
  const domain = getDomain(company.website);
  const logoSrc = (!imageError && company.logoUrl) ? company.logoUrl : null;

  return (
    <div className="flex flex-col bg-white dark:bg-[#0B1120] rounded-[24px] border border-slate-100/80 dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.3)] transition-all duration-500 overflow-hidden group relative z-0 hover:-translate-y-1">
      
      {/* Top Image Area */}
      <div className="relative w-full h-[140px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-[#0F172A] p-5 flex items-start justify-between border-b border-slate-100 dark:border-white/5 overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[30px] -ml-8 -mb-8 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>

        <div className="flex items-start justify-between w-full z-10 relative">
          {/* Logo Glass Container */}
          <div className="w-[84px] h-[84px] bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] border border-white dark:border-white/10 flex items-center justify-center p-3 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
            {logoSrc ? (
              <img 
                src={logoSrc} 
                alt={company.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-2xl font-black bg-gradient-to-br from-indigo-500 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">{company.name.substring(0,2)}</span>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <button 
              onClick={(e) => { e.preventDefault(); toggleBookmark(company.id); }}
              className={`w-9 h-9 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white dark:border-white/10 transition-all duration-300 hover:scale-110 ${bookmarked ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-indigo-600'}`}
            >
              <Bookmark size={16} className={bookmarked ? "fill-current" : ""} />
            </button>
            <div className="flex flex-col gap-1 items-end">
              {company.verified && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <CheckCircle2 size={12} />
                  Verified
                </div>
              )}
              {company.tier && (
                <div className="flex items-center px-2.5 py-0.5 rounded-full bg-[#1E293B] text-amber-400 border border-slate-700 text-[9px] font-black uppercase tracking-widest shadow-sm">
                  Tier {company.tier}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1 bg-white dark:bg-transparent relative z-10">
        
        {/* Title & Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{company.name}</h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span>
            {company.city ? `${company.city}, ` : ''}{company.country}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-300 text-[10px] font-bold border border-slate-100 dark:border-white/5 transition-colors group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 group-hover:border-indigo-100 dark:group-hover:border-indigo-500/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & Completeness */}
        <div className="flex items-center justify-between mb-6 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-slate-900 dark:text-white">{rating.toFixed(1)}</span>
            <div className="flex gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-current" : "text-slate-200 dark:text-slate-700"} />
              ))}
            </div>
          </div>
          {company.completenessScore && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
              <span className={`text-xs font-black ${
                company.completenessScore >= 80 ? 'text-emerald-500' : 
                company.completenessScore >= 50 ? 'text-blue-500' : 'text-amber-500'
              }`}>{company.completenessScore}%</span>
            </div>
          )}
        </div>

        <Link 
          href={href}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/[0.03] hover:bg-indigo-600 hover:text-white hover:shadow-[0_8px_16px_-4px_rgba(79,70,229,0.3)] rounded-xl transition-all duration-300 border border-slate-100 dark:border-white/5 hover:border-transparent group/btn"
        >
          View Profile <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
});
