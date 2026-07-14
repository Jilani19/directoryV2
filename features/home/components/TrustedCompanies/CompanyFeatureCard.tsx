"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, ExternalLink, Globe, MapPin, ShieldCheck } from "lucide-react";
import { Company } from "../../../directory/mock/companies";
import { useBookmarks } from "../../../directory/hooks/useBookmarks";

interface CompanyFeatureCardProps {
  company: Company;
}

export function CompanyFeatureCard({ company }: CompanyFeatureCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(company.id);
  const [imageError, setImageError] = React.useState(false);
  const companySlug = company.id;

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

  return (
    <div className="group flex flex-col bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/10 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative h-full w-[340px] sm:w-[420px] md:w-[460px] lg:w-[380px] xl:w-[420px] 2xl:w-[460px] mx-auto focus-within:ring-4 focus-within:ring-white/20">
      
      {/* Dynamic Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Header & Logo Area */}
      <div className="relative p-6 pb-0 flex justify-between items-start">
        <div className="flex flex-col gap-3 z-10 w-full">
          <div className="flex justify-between w-full">
            {company.verified ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider group-hover:bg-emerald-500/20 transition-colors shadow-sm" title="Verified Profile">
                <ShieldCheck size={14} className="shrink-0" />
                Verified
              </div>
            ) : (
              <div /> // Spacer
            )}
            <button 
              onClick={(e) => { e.preventDefault(); toggleBookmark(company.id); }}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 z-20 border ${bookmarked ? "bg-primary text-white border-primary shadow-lg shadow-primary/40 scale-110" : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/20 hover:text-white hover:scale-110"}`}
              aria-label={bookmarked ? "Remove bookmark" : "Save company"}
              title={bookmarked ? "Remove bookmark" : "Save company"}
            >
              <Bookmark size={18} strokeWidth={bookmarked ? 3 : 2} className={bookmarked ? "fill-white" : ""} />
            </button>
          </div>

          <div className="flex justify-center mt-2 mb-6">
            <div className={`w-32 h-32 rounded-3xl flex items-center justify-center font-bold text-3xl border border-white/20 shadow-xl bg-white relative overflow-hidden group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 z-10 ${(!company.logoUrl || imageError) ? `${colors.bg} ${colors.text}` : ''}`}>
              {(company.logoUrl && !imageError) ? (
                <div className="relative w-full h-full p-4">
                  <Image 
                    src={company.logoUrl} 
                    alt={`${company.name} logo`} 
                    fill 
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="128px"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                company.initials
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 flex flex-col flex-1 z-10">
        <h3 className="text-2xl font-black text-white leading-tight mb-2 line-clamp-1 group-hover:text-primary-100 transition-colors duration-300 text-center">
          {company.name}
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm font-semibold text-slate-300 mb-4 line-clamp-1">
          <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{company.industry}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <MapPin size={16} className="shrink-0 text-slate-400" />
          <span>{company.city}, {company.country}</span>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 text-center leading-relaxed mb-6 font-medium">
          {company.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Founded</span>
            <span className="text-sm font-black text-white">{company.founded}</span>
          </div>
          <div className="flex flex-col p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Employees</span>
            <span className="text-sm font-black text-white">{company.employees}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-auto mb-6">
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center flex-1 gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors py-3 rounded-xl hover:bg-white/10 bg-white/5 border border-white/5 focus:outline-none focus:ring-2 focus:ring-white/20">
            <Globe size={18} />
            Website
          </a>
          {company.socialLinks?.linkedin && (
            <a href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center flex-1 gap-2 text-sm font-bold text-slate-300 hover:text-[#0a66c2] transition-colors py-3 rounded-xl hover:bg-[#0a66c2]/10 bg-white/5 border border-white/5 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/40">
              <ExternalLink size={18} />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-3 mt-auto bg-white/5 border-t border-white/10 group-hover:bg-white/10 transition-colors z-10">
        <Link 
          href={`/directory/${companySlug}/overview`}
          prefetch={false}
          className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-black text-slate-900 bg-white hover:bg-primary-50 hover:text-primary shadow-lg transition-all duration-300 gap-2 group/btn focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
        >
          View Full Profile
          <ArrowRight size={20} className="group-hover/btn:translate-x-1.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
