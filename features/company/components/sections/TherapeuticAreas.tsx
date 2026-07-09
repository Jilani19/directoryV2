import React from 'react';
import { ArrowRight, ChevronRight, Heart, Droplets, Dna, Brain, Hand, Wind, Activity } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function TherapeuticAreas({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  if (!company.therapeuticAreas || company.therapeuticAreas.length === 0) return null;

  // Simple icon mapper
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'heart': return Heart;
      case 'droplets': return Droplets;
      case 'dna': return Dna;
      case 'brain': return Brain;
      case 'hand': return Hand;
      case 'wind': return Wind;
      default: return Activity;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">Therapeutic Areas</h2>
        <button 
          onClick={() => onTabChange && onTabChange('products')}
          className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
        >
          View All Areas <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {company.therapeuticAreas.map((area, i) => {
          const Icon = getIcon(area.icon);
          return (
            <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-sm group-hover:shadow-md">
                <Icon size={32} strokeWidth={1.5} className="text-rose-500 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{area.name}</span>
            </div>
          );
        })}
        
        {/* Next Button inside the carousel */}
        <div className="flex flex-col items-center gap-4 shrink-0 justify-center h-[120px] ml-4">
          <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm">
            <ChevronRight size={24} className="text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
