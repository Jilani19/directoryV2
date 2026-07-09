"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, MapPin, Globe, Users, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { Company } from "../mock/companies";
import { useBookmarks } from "../hooks/useBookmarks";
import { formatDistance } from "../../../lib/utils/distance";

export const CompanyListCard = React.memo(function CompanyListCard(company: Company & { distanceKm?: number }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(company.id);
  const [imageError, setImageError] = useState(false);

  const getColors = (colorStr: string) => {
    const map: Record<string, { border: string; bg: string; text: string }> = {
      "purple-600": { border: "border-l-[#7c3aed]", bg: "bg-purple-50", text: "text-purple-700" },
      "blue-600": { border: "border-l-[#2563eb]", bg: "bg-blue-50", text: "text-blue-700" },
      "emerald-600": { border: "border-l-[#059669]", bg: "bg-emerald-50", text: "text-emerald-700" },
      "orange-500": { border: "border-l-[#f97316]", bg: "bg-orange-50", text: "text-orange-600" },
      "rose-600": { border: "border-l-[#e11d48]", bg: "bg-rose-50", text: "text-rose-700" },
      "green-600": { border: "border-l-[#16a34a]", bg: "bg-green-50", text: "text-green-700" },
      "blue-700": { border: "border-l-[#1d4ed8]", bg: "bg-blue-50", text: "text-blue-800" },
      "yellow-600": { border: "border-l-[#ca8a04]", bg: "bg-yellow-50", text: "text-yellow-700" },
      "teal-600": { border: "border-l-[#0d9488]", bg: "bg-teal-50", text: "text-teal-700" },
      "violet-700": { border: "border-l-[#6d28d9]", bg: "bg-violet-50", text: "text-violet-800" },
    };
    return map[colorStr] || { border: "border-l-slate-200", bg: "bg-slate-50", text: "text-slate-600" };
  };

  const colors = getColors(company.color);
  const companySlug = company.id;

  return (
    <div className={`group flex flex-col md:flex-row items-start md:items-center bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 overflow-hidden relative border-l-4 ${colors.border} p-6 gap-6 md:gap-8`}>
      
      {/* Logo */}
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center font-bold text-3xl border border-slate-100 shrink-0 shadow-md overflow-hidden bg-white group-hover:scale-105 group-hover:shadow-lg transition-all duration-500 ${(!company.logoUrl || imageError) ? `${colors.bg} ${colors.text}` : ''}`}>
        {(company.logoUrl && !imageError) ? (
          <div className="relative w-full h-full p-3">
            <Image 
              src={company.logoUrl} 
              alt={`${company.name} logo`} 
              fill 
              className="object-contain transition-transform duration-500"
              sizes="(max-width: 768px) 80px, 96px"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          company.initials
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-1.5">
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors duration-300">
                {company.name}
              </h3>
              {company.verified && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full ring-1 ring-inset ring-emerald-600/20 shadow-sm">
                  <CheckCircle2 size={12} />
                  Verified
                </div>
              )}
              {company.proximityBadge && (
                <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset shadow-sm ${
                  company.proximityBadge === "Global"
                    ? "bg-slate-50 text-slate-500 ring-slate-500/20"
                    : "bg-indigo-50 text-indigo-700 ring-indigo-500/20"
                }`}>
                  {company.proximityBadge === "Global" ? <Globe size={12} /> : <MapPin size={12} />}
                  {company.proximityBadge}
                </div>
              )}
              {company.distanceKm !== undefined && company.proximityBadge === "Near You" && (
                <div className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset shadow-sm bg-indigo-50 text-indigo-700 ring-indigo-500/20">
                  <MapPin size={12} />
                  {formatDistance(company.distanceKm)}
                </div>
              )}
            </div>
            
            <span className={`self-start px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} ring-1 ring-inset ring-slate-900/5 mb-3 shadow-sm`}>
              {company.category}
            </span>
          </div>

          <button 
            onClick={() => toggleBookmark(company.id)}
            className={`transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 p-2.5 rounded-full ${bookmarked ? "bg-primary shadow-lg shadow-primary/30 scale-110" : "bg-slate-50 text-slate-400 hover:bg-slate-200 hover:text-slate-600 hover:scale-110"}`}
            aria-label={bookmarked ? "Remove bookmark" : "Save company"}
            title={bookmarked ? "Remove bookmark" : "Save company"}
          >
            <Bookmark size={20} strokeWidth={bookmarked ? 3 : 2} className={bookmarked ? "fill-white text-white" : ""} />
          </button>
        </div>

        <p className="text-sm font-medium text-slate-600 line-clamp-2 mb-4 max-w-4xl leading-relaxed">
          {company.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <MapPin size={14} className="text-slate-400" />
            <span>{company.city}, {company.country}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <Users size={14} className="text-slate-400" />
            <span>{company.employees} Employees</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <Building2 size={14} className="text-slate-400" />
            <span>HQ: {company.state}</span>
          </div>
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/20">
              <Globe size={14} className="shrink-0" />
              Website
            </a>
          )}
          {company.certifications && company.certifications.length > 0 && (
            <>
              <div className="w-px h-6 bg-slate-200 mx-1"></div>
              {company.certifications.slice(0, 2).map(cert => (
                <span key={cert} className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm truncate max-w-[120px]">
                  {cert}
                </span>
              ))}
            </>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full md:w-auto shrink-0 flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-8 mt-2 md:mt-0 group/link">
        <Link 
          href={`/company/${companySlug}`} 
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-3.5 rounded-2xl text-sm font-black transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 shadow-sm hover:shadow-lg hover:shadow-primary/30"
        >
          View Profile
          <ArrowRight size={18} className="group-hover/link:translate-x-1.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
});
