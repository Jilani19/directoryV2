import React from "react";
import Link from "next/link";

export interface CategoryCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
  colorClass: string;
  href?: string;
}

export function CategoryCard({ title, count, icon, colorClass,  href = "/categories",
}: CategoryCardProps) {
  return (
    <Link 
      href={href}
      aria-label={`Explore ${title} category`}
      className="group relative flex flex-col p-6 lg:p-8 bg-white/90 backdrop-blur-xl rounded-[1.5rem] border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 h-full"
    >
      {/* Subtle decorative background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/80 z-0"></div>
      <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full ${colorClass.split(" ")[0]} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 z-0`}></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/50 ${colorClass}`}>
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
            className: "w-7 h-7 group-hover:scale-110 transition-transform duration-500" 
          })}
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className="text-sm font-semibold text-slate-500">
            {count}
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
