import React from "react";
import Link from "next/link";

export interface CategoryCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
  colorClass: string;
  href?: string;
}

export function CategoryCard({ title, count, icon, colorClass,  href = "/categories" }: CategoryCardProps) {
  // Extract just the text color part if possible to use for the icon
  const iconColor = colorClass.includes("text-") ? colorClass.split(' ').find(c => c.startsWith('text-')) : 'text-indigo-600';
  const bgColor = iconColor ? iconColor.replace('text-', 'bg-').replace('-500', '-50').replace('-600', '-50') : 'bg-indigo-50';

  return (
    <Link 
      href={href}
      aria-label={`Explore ${title} category`}
      className="group relative flex flex-col items-center justify-center py-6 px-2 bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_25px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full text-center"
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${bgColor} ${iconColor}`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
          className: "w-7 h-7 stroke-[1.5]" 
        })}
      </div>
      
      <h3 className="text-[13px] font-bold text-slate-900 mb-1.5 leading-tight group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      
      <span className="text-[11px] font-medium text-slate-500">
        {count}
      </span>
    </Link>
  );
}
