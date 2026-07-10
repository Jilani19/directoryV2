"use client";

import React from 'react';
import { Package, ShieldCheck, FileText, Factory, Globe, Award, ArrowRight } from 'lucide-react';
import { CompanyDetails } from '../../types'
import { formatNumber } from '../../utils/formatters';

export function StatsGrid({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const statsRaw = [
    { id: "products", label: "Total Products", value: company.totalProducts, icon: <Package size={24} strokeWidth={2} />, color: "text-blue-600", bg: "bg-blue-50", tabId: "products" },
    { id: "drugs", label: "Approved Drugs", value: company.approvedDrugs, icon: <ShieldCheck size={24} strokeWidth={2} />, color: "text-emerald-600", bg: "bg-emerald-50", tabId: "products" },
    { id: "fda", label: "FDA Applications", value: company.totalFdaApplications, icon: <FileText size={24} strokeWidth={2} />, color: "text-blue-500", bg: "bg-blue-50", tabId: "fda" },
    { id: "facilities", label: "Manufacturing Sites", value: company.manufacturingSites, icon: <Factory size={24} strokeWidth={2} />, color: "text-orange-500", bg: "bg-orange-50", tabId: "facilities" },
    { id: "countries", label: "Countries Served", value: company.countriesServed, icon: <Globe size={24} strokeWidth={2} />, color: "text-indigo-600", bg: "bg-indigo-50", tabId: "overview" },
    { id: "certs", label: "Certifications", value: company.certificationsCount, icon: <Award size={24} strokeWidth={2} />, color: "text-teal-600", bg: "bg-teal-50", tabId: "regulatory" },
  ];

  const stats = statsRaw.filter(s => s.value && typeof s.value === 'number' && s.value > 0);

  const handleStatClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
      if (tabId === 'overview') {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, i) => {
        return (
          <button 
            key={i} 
            onClick={() => handleStatClick(stat.tabId)}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center group hover:shadow-md hover:border-primary/30 transition-all cursor-pointer w-full h-full focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[160px]"
            aria-label={`View details for ${stat.label}`}
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shrink-0`}>
              {stat.icon}
            </div>
            <div className="flex flex-col items-center w-full min-w-0 flex-1 justify-center">
              <span className="font-black text-slate-800 mb-1 truncate w-full text-2xl" title={formatNumber(stat.value!)}>
                {formatNumber(stat.value!)}
              </span>
              <span className="text-xs font-bold text-slate-500 mb-2 truncate w-full" title={stat.label}>
                {stat.label}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-auto pt-2 shrink-0">
              View Details <ArrowRight size={12} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
