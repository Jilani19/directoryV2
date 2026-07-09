import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import pfizerLogo from "../../../../assets/images/logos/pfizer.png";

export interface InsightCardProps {
  category: string;
  title: string;
  date: string;
  readTime: string;
  href?: string;
}

export function InsightCard({
  category,
  title,
  date,
  readTime,
  href = `/article/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}: InsightCardProps) {
  return (
    <Link href={href} className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="relative w-full h-[200px] bg-slate-100 overflow-hidden">
        <Image 
          src={pfizerLogo}
          alt={title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary rounded-sm text-[10px] font-bold tracking-wider uppercase shadow-sm">
            {category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 mt-auto text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
