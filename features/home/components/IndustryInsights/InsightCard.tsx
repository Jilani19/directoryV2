import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import pfizerLogo from "../../../../assets/images/logos/pfizer.png";

export interface InsightCardProps {
  category: string;
  title: string;
  description?: string;
  date: string;
  readTime: string;
  href?: string;
}

export function InsightCard({
  category,
  title,
  description,
  date,
  readTime,
  href = `/article/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}: InsightCardProps) {
  return (
    <Link href={href} className="group flex flex-row bg-white rounded-2xl border border-slate-200 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full min-h-[140px]">
      <div className="relative w-[38%] shrink-0 bg-slate-100 overflow-hidden">
        <Image 
          src={pfizerLogo}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="flex flex-col flex-1 p-4 lg:p-5 justify-between">
        <div className="flex flex-col items-start mb-2">
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-black tracking-wider uppercase mb-2">
            {category}
          </span>
          <h3 className="text-[14px] lg:text-[15px] font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-3">
            {title}
          </h3>
        </div>
        
        {description && (
          <p className="text-[11px] lg:text-[12px] text-slate-500 line-clamp-2 font-medium leading-relaxed mb-3">
            {description}
          </p>
        )}
        
        <div className="flex items-center gap-3 mt-auto text-[10px] lg:text-[11px] font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-slate-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-slate-400" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
