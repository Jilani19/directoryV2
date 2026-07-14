import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

interface DataProvenanceTooltipProps {
  source?: string;
  date?: string;
  url?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  children: React.ReactNode;
  className?: string;
}

export function DataProvenanceTooltip({
  source = 'Verified Platform Database',
  date,
  url,
  confidence = 'HIGH',
  children,
  className = ''
}: DataProvenanceTooltipProps) {
  return (
    <div className={`relative group flex items-center gap-1.5 w-fit ${className}`}>
      {children}
      <div className="text-slate-300 hover:text-[#2950DA] transition-colors cursor-help">
        <Info size={14} />
      </div>

      <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:-translate-y-1 scale-95 group-hover:scale-100 origin-bottom pointer-events-none">
        <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700 flex flex-col gap-2">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
            <CheckCircle2 size={14} className={confidence === 'HIGH' ? 'text-emerald-400' : 'text-amber-400'} />
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-300">
              Verified Data
            </span>
          </div>
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Source:</span>
              <span className="font-medium text-slate-100 truncate max-w-[120px]">{source}</span>
            </div>
            {date && (
              <div className="flex justify-between">
                <span className="text-slate-400">Synced:</span>
                <span className="font-medium text-slate-100">{new Date(date).toLocaleDateString()}</span>
              </div>
            )}
            {url && (
              <div className="flex justify-between">
                <span className="text-slate-400">URL:</span>
                <span className="font-medium text-[#3B82F6] truncate max-w-[120px]">{url}</span>
              </div>
            )}
          </div>
        </div>
        {/* Triangle Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  );
}
