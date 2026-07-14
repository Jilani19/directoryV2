import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

export interface FeaturedCompanyCardProps {
  company: string;
  location: string;
  industry: string;
  rating: string;
  logo: StaticImageData | string;
  href?: string;
}

export function FeaturedCompanyCard({
  company,
  location,
  industry,
  rating,
  logo,
  href = `/directory/${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/overview`
}: FeaturedCompanyCardProps) {
  return (
    <div className="group flex flex-col p-5 bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-[260px] md:w-[280px] shrink-0 snap-center">
      
      <div className="flex items-start justify-between mb-5">
        <div className="relative w-[110px] h-[36px] flex items-center justify-start">
          <Image 
            src={logo}
            alt={company}
            fill
            className="object-contain object-left"
          />
        </div>
        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">
          <ShieldCheck size={12} strokeWidth={2.5} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Verified</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="text-[16px] font-black text-slate-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
          {company}
        </h3>
        
        <div className="flex flex-col gap-0.5 mb-4">
          <span className="text-[12px] text-slate-500 font-medium leading-tight">
            {location}
          </span>
          <span className="text-[12px] text-slate-500 font-medium leading-tight">
            {industry}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[13px] font-bold text-slate-900">{rating}</span>
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={11} fill={star <= Number(rating) ? "currentColor" : "none"} className={star > Number(rating) ? "text-slate-300" : ""} />
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-1">
          <Link 
            href={href}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View Profile <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
