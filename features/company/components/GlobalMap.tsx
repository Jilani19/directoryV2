"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const Map = dynamic(
  () => import('./GlobalMapRenderer'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-[500px] bg-slate-50 flex items-center justify-center rounded-2xl border border-slate-100">
        <Loader2 className="animate-spin text-[#2950DA]" size={32} />
        <span className="ml-3 text-sm font-bold text-slate-500">Loading Map Data...</span>
      </div>
    )
  }
);

interface GlobalMapProps {
  facilities: any[];
}

export default function GlobalMap({ facilities }: GlobalMapProps) {
  // Pass the raw facilities to the dynamic component
  return <Map facilities={facilities} />;
}
