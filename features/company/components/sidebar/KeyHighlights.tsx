"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function KeyHighlights({ company }: { company: CompanyDetails }) {
  // Dynamically generate verified highlights
  const dynamicHighlights: { title: string, description: string }[] = [];

  if (company.totalProducts && company.totalProducts > 0) {
    dynamicHighlights.push({
      title: "Extensive Product Portfolio",
      description: `Manufactures and distributes ${company.totalProducts.toLocaleString()} life sciences products globally.`
    });
  }

  if (company.totalFdaApplications && company.totalFdaApplications > 0) {
    dynamicHighlights.push({
      title: "Regulatory Excellence",
      description: `Holds ${company.totalFdaApplications.toLocaleString()} approved FDA applications and clinical submissions.`
    });
  }

  if (company.manufacturingSites && company.manufacturingSites > 0) {
    dynamicHighlights.push({
      title: "Global Supply Chain",
      description: `Operates a verified network of ${company.manufacturingSites.toLocaleString()} manufacturing and R&D facilities.`
    });
  }

  if (company.certificationsCount && company.certificationsCount > 0) {
    dynamicHighlights.push({
      title: "Quality Certifications",
      description: `Maintains ${company.certificationsCount} major international quality certifications including FDA and ISO.`
    });
  }

  // Fallback to static highlights if dynamic ones aren't available
  const highlightsToRender = dynamicHighlights.length > 0 ? dynamicHighlights : (company.keyHighlights || []);

  if (highlightsToRender.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm animate-in fade-in duration-500 hover:shadow-md transition-all">
      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
        <Sparkles size={20} className="text-amber-500" /> Key Highlights
      </h3>
      
      <div className="flex flex-col gap-5 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {highlightsToRender.slice(0, 5).map((highlight, i) => (
          <div key={i} className="relative flex items-start gap-4 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 text-amber-500 border-4 border-white shadow-sm shrink-0 z-10 group-hover:scale-110 transition-transform">
              <span className="text-sm font-black">{i + 1}</span>
            </div>
            <div className="flex flex-col pt-1.5 flex-1">
              <h4 className="text-sm font-black text-slate-900 leading-tight mb-1 tracking-tight">{highlight.title}</h4>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
