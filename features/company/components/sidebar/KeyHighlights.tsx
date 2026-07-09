"use client";

import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function KeyHighlights({ highlights }: { highlights: CompanyDetails['keyHighlights'] }) {
  if (!highlights || highlights.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Sparkles size={20} className="text-amber-500" /> Key Highlights
        </h3>
        <div className="flex-1 flex items-center justify-center text-slate-400 font-medium p-6 text-center">
          Key highlights not available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
        <Sparkles size={20} className="text-amber-500" /> Key Highlights
      </h3>
      
      <div className="flex flex-col gap-5 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {highlights.map((highlight, i) => (
          <div key={i} className="relative flex items-start gap-4 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 text-amber-500 border-4 border-white shadow-sm shrink-0 z-10 group-hover:scale-110 transition-transform">
              <span className="text-sm font-black">{i + 1}</span>
            </div>
            <div className="flex flex-col pt-1.5 flex-1">
              <h4 className="text-sm font-black text-slate-900 leading-tight mb-1">{highlight.title}</h4>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl transition-colors">
        View Full Timeline <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
