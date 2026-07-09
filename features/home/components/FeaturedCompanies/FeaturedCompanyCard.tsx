import React from "react";
import Image from "next/image";
import Link from "next/link";
import pfizerLogo from "../../../../assets/images/logos/pfizer.png";

export interface FeaturedCompanyCardProps {
  company: string;
  role: string;
  location: string;
  type: string;
  experience: string;
  href?: string;
}

export function FeaturedCompanyCard({
  company,
  role,
  location,
  type,
  experience,
  href = `/job/${role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}: FeaturedCompanyCardProps) {
  return (
    <Link 
      href={href} 
      aria-label={`View ${role} opportunity at ${company}`}
      className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 w-[280px] md:w-[320px] shrink-0 cursor-pointer snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative w-[100px] h-[30px] mb-6">
        <Image 
          src={pfizerLogo}
          alt={company}
          fill
          className="object-contain object-left"
        />
      </div>
      
      <h3 className="text-[17px] font-bold text-slate-800 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
        {role}
      </h3>
      
      <p className="text-sm font-medium text-slate-500 mb-6">
        {location}
      </p>
      
      <div className="flex items-center gap-2 mt-auto">
        <span className="px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-semibold">
          {type}
        </span>
        <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-semibold">
          {experience}
        </span>
      </div>
    </Link>
  );
}
