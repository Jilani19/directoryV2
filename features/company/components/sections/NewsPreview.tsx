import React from 'react';
import Image from 'next/image';
import { CompanyDetails } from '../../types';
import { ArrowRight, Newspaper } from 'lucide-react';

export function NewsPreview({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  if (!company.latestNews || company.latestNews.length === 0) {
    return null;
  }

  const items = company.latestNews.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">Latest News & Media</h3>
        <button 
          onClick={() => onTabChange && onTabChange('news')}
          className="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1"
        >
          View All News <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((news, i) => (
          <a key={i} href={news.url} target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col group hover:shadow-md transition-all">
            <div className="w-full h-32 bg-slate-100 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
              {news.image ? (
                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <Newspaper size={32} className="text-slate-300" />
              )}
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">{news.date}</span>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">{news.title}</h4>
            <span className="text-xs font-bold text-slate-500 mt-2">{news.source}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
