import React from 'react';
import { CompanyDetails } from '../../types';
import { GitMerge } from 'lucide-react';

export function OrganizationStructure({ leadership }: { leadership: NonNullable<CompanyDetails['leadership']> }) {
  // Try to find a CEO or equivalent top level
  const ceo = leadership.find(l => l.role.toLowerCase().includes('ceo') || l.role.toLowerCase().includes('chief executive'));
  const others = leadership.filter(l => l.id !== ceo?.id);

  if (!ceo) return null; // Only show if we can identify a top leader

  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
          <GitMerge size={24} />
        </div>
        <h3 className="text-2xl font-black text-slate-900">Organization Structure</h3>
      </div>
      
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-x-auto hide-scrollbar">
        <div className="min-w-[600px] flex flex-col items-center pt-4">
          {/* Top Level (CEO) */}
          <div className="relative flex flex-col items-center">
            <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg border border-slate-700 flex flex-col items-center w-64 z-10 relative">
              <span className="font-black text-base text-center">{ceo.role}</span>
              <span className="text-sm text-slate-300 font-medium text-center">{ceo.name}</span>
            </div>
            
            {/* Vertical Line from CEO */}
            {others.length > 0 && (
              <div className="w-0.5 h-8 bg-slate-300"></div>
            )}
          </div>

          {/* Direct Reports */}
          {others.length > 0 && (
            <div className="relative flex justify-center w-full">
              {/* Horizontal Connecting Line */}
              <div className="absolute top-0 h-0.5 bg-slate-300" style={{ 
                left: `calc(50% - ${((others.length - 1) / 2) * 180}px)`, 
                width: `${(others.length - 1) * 180}px` 
              }}></div>
              
              <div className="flex justify-center gap-4 w-full">
                {others.map((report, idx) => (
                  <div key={idx} className="flex flex-col items-center relative w-40">
                    {/* Vertical line to report */}
                    <div className="w-0.5 h-6 bg-slate-300"></div>
                    <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center w-full hover:border-primary transition-colors cursor-default">
                      <span className="font-bold text-xs text-slate-900 text-center line-clamp-2" title={report.role}>{report.role}</span>
                      <span className="text-[10px] text-slate-500 font-medium text-center mt-1 truncate w-full" title={report.name}>{report.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
