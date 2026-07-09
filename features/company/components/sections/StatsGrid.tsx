"use client";

import React from 'react';
import { Package, ShieldCheck, FileText, Factory, Globe, Award, ArrowRight } from 'lucide-react';
import { CompanyDetails } from '../../types'
import { formatNumber } from '../../utils/formatters';

export function StatsGrid({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const stats = [
    { id: "products", label: "Total Products", value: company.totalProducts ? `${formatNumber(company.totalProducts)}+` : "No public data", icon: <Package size={24} strokeWidth={2} />, color: company.totalProducts ? "text-blue-600" : "text-slate-400", bg: company.totalProducts ? "bg-blue-50" : "bg-slate-100", tabId: "products" },
    { id: "drugs", label: "Approved Drugs", value: company.approvedDrugs ? formatNumber(company.approvedDrugs) : "No public data", icon: <ShieldCheck size={24} strokeWidth={2} />, color: company.approvedDrugs ? "text-emerald-600" : "text-slate-400", bg: company.approvedDrugs ? "bg-emerald-50" : "bg-slate-100", tabId: "products" },
    { id: "fda", label: "FDA Applications", value: company.totalFdaApplications ? formatNumber(company.totalFdaApplications) : "No public data", icon: <FileText size={24} strokeWidth={2} />, color: company.totalFdaApplications ? "text-blue-500" : "text-slate-400", bg: company.totalFdaApplications ? "bg-blue-50" : "bg-slate-100", tabId: "fda" },
    { id: "facilities", label: "Manufacturing Sites", value: company.manufacturingSites ? formatNumber(company.manufacturingSites) : "No public data", icon: <Factory size={24} strokeWidth={2} />, color: company.manufacturingSites ? "text-orange-500" : "text-slate-400", bg: company.manufacturingSites ? "bg-orange-50" : "bg-slate-100", tabId: "facilities" },
    { id: "countries", label: "Countries Served", value: company.countriesServed ? `${formatNumber(company.countriesServed)}+` : "No public data", icon: <Globe size={24} strokeWidth={2} />, color: company.countriesServed ? "text-indigo-600" : "text-slate-400", bg: company.countriesServed ? "bg-indigo-50" : "bg-slate-100", tabId: "overview" },
    { id: "certs", label: "Certifications", value: company.certificationsCount ? `${formatNumber(company.certificationsCount)}+` : "No public data", icon: <Award size={24} strokeWidth={2} />, color: company.certificationsCount ? "text-teal-600" : "text-slate-400", bg: company.certificationsCount ? "bg-teal-50" : "bg-slate-100", tabId: "regulatory" },
  ];

  const handleStatClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
      // For global presence which is on the overview tab, we scroll
      if (tabId === 'overview') {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, i) => {
        return (
          <button 
            key={i} 
            onClick={() => handleStatClick(stat.tabId)}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center group hover:shadow-md hover:border-primary/30 transition-all cursor-pointer w-full h-full focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[180px]"
            aria-label={`View details for ${stat.label}`}
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shrink-0`}>
              {stat.icon}
            </div>
            <div className="flex flex-col items-center w-full min-w-0 flex-1 justify-center">
              <span className={`font-black text-slate-800 mb-1 truncate w-full ${stat.value === 'No public data' ? 'text-sm text-slate-400' : 'text-2xl'}`} title={stat.value}>
                {stat.value}
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
