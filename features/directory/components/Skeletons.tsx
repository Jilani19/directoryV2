import React from "react";

export function CompanyCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative animate-pulse h-full">
      
      {/* Top Header */}
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="flex gap-2">
          <div className="w-20 h-6 bg-slate-200 rounded-full"></div>
          <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
        </div>
        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
      </div>

      {/* Hero Logo Layer */}
      <div className="px-5 pt-4 pb-6 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-slate-200 rounded-2xl mb-4"></div>
        <div className="w-3/4 h-6 bg-slate-200 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
      </div>

      {/* Metadata Grid */}
      <div className="px-5 pb-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-3 bg-slate-200 rounded"></div>
            <div className="w-16 h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl">
            <div className="w-12 h-3 bg-slate-200 rounded"></div>
            <div className="w-14 h-4 bg-slate-200 rounded"></div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="w-full h-10 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export function CompanyListCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgb(0,0,0,0.04)] overflow-hidden relative border-l-4 border-l-slate-200 p-5 gap-6 animate-pulse">
      {/* Logo */}
      <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-200 rounded-2xl shrink-0"></div>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex flex-col w-full">
            <div className="w-1/3 h-6 bg-slate-200 rounded mb-3"></div>
            <div className="w-24 h-5 bg-slate-200 rounded-full mb-3"></div>
          </div>
          <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0"></div>
        </div>
        
        <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
        <div className="w-2/3 h-4 bg-slate-100 rounded mb-5"></div>

        <div className="flex flex-wrap gap-4">
          <div className="w-24 h-6 bg-slate-100 rounded-lg"></div>
          <div className="w-32 h-6 bg-slate-100 rounded-lg"></div>
          <div className="w-28 h-6 bg-slate-100 rounded-lg"></div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
        <div className="w-full md:w-32 h-10 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}
