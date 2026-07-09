import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function LatestNews({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  if (!company.latestNews || company.latestNews.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">Latest News & Media</h2>
        <button 
          onClick={() => onTabChange && onTabChange('news')}
          className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
        >
          View All News <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {company.latestNews.map((news, i) => (
          <div key={i} className="flex items-start gap-4 group cursor-pointer">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm group-hover:border-primary/30 transition-colors">
              <Image 
                src={news.image} 
                alt={news.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col py-1">
              <span className="text-xs font-bold text-slate-500 mb-1">{news.date}</span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {news.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
