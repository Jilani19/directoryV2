import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MapPin, Briefcase, Clock, Bookmark, ArrowRight, Sparkles } from "lucide-react";

export interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  logo: StaticImageData | string;
  location: string;
  type: string;
  salary?: string;
  experience: string;
  postedTime: string;
  isUrgent?: boolean;
  isRemote?: boolean;
}

export function JobCard({
  title,
  company,
  logo,
  location,
  type,
  salary,
  experience,
  postedTime,
  isUrgent,
  isRemote,
}: JobCardProps) {
  return (
    <div className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full gap-4">
      
      {/* Left Content */}
      <div className="flex flex-row items-start gap-4 flex-1 w-full md:w-auto">
        <div className="relative w-12 h-12 rounded-lg border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center bg-slate-50 p-2">
          <Image 
            src={logo}
            alt={company}
            fill
            className="object-contain p-1"
          />
        </div>
        
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <h3 className="text-[15px] font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
            {isUrgent && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded text-[9px] font-bold tracking-wider uppercase border border-rose-100">
                <Sparkles size={10} /> Urgent
              </span>
            )}
            {isRemote && (
              <span className="px-1.5 py-0.5 bg-sky-50 text-sky-600 rounded text-[9px] font-bold tracking-wider uppercase border border-sky-100">
                Remote
              </span>
            )}
          </div>
          
          <span className="text-[13px] font-bold text-slate-700">
            {company}
          </span>

          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <MapPin size={12} className="text-slate-400" />
              {location}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <Briefcase size={12} className="text-slate-400" />
              {type} • {experience}
            </div>
            {salary && (
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <span className="font-semibold text-slate-700">{salary}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t border-slate-100 md:border-none mt-2 md:mt-0">
        <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
          <Clock size={12} />
          <span>{postedTime}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-8 h-8 rounded-md bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-100 transition-colors focus:outline-none">
            <Bookmark size={14} />
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white text-[12px] font-bold rounded-md transition-colors focus:outline-none shadow-sm">
            Apply
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

    </div>
  );
}
