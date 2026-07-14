"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, LineChart, FileText, Newspaper, 
  MapPin, Stethoscope, Factory, Users, 
  Briefcase, Package, BarChart3, Link as LinkIcon
} from 'lucide-react';
import { buildSidebarLinks } from '@/utils/sidebarBuilder';
export default function SidebarNavigation({ 
  companySlug, 
  kpiCounts,
  company 
}: { 
  companySlug: string, 
  kpiCounts: any,
  company?: any 
}) {
  const pathname = usePathname();


  const sidebarLinks = buildSidebarLinks({ company, kpiCounts, companySlug }).filter(link => link.show !== false);

  return (
    <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-col">
      {sidebarLinks.map((link, idx) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

        return (
          <Link 
            key={idx} 
            href={link.href}
            className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-colors group ${isActive ? 'bg-[#2950DA]/10 text-[#2950DA]' : 'text-slate-600 hover:bg-[#F4F7FB] hover:text-[#2950DA]'}`}
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className={isActive ? 'text-[#2950DA]' : 'text-slate-400 group-hover:text-[#2950DA]'} />
              {link.name}
            </div>
            {link.badge && (
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${isActive ? 'bg-[#2950DA] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-[#2950DA]/10 group-hover:text-[#2950DA]'}`}>
                {link.badge}
              </span>
            )}
          </Link>
        )
      })}
    </div>
  );
}
