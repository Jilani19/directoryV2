"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Newspaper, ExternalLink, Search, ArrowRight } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function NewsTab({ company }: { company: CompanyDetails }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    if (!company.latestNews) return ["All"];
    const cats = new Set(company.latestNews.map(n => n.category || "Uncategorized"));
    return ["All", ...Array.from(cats)];
  }, [company.latestNews]);

  const filteredNews = useMemo(() => {
    if (!company.latestNews) return [];
    return company.latestNews.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            news.summary?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || news.category === selectedCategory || (!news.category && selectedCategory === "Uncategorized");
      return matchesSearch && matchesCategory;
    });
  }, [company.latestNews, searchQuery, selectedCategory]);

  if (!company.latestNews || company.latestNews.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <Newspaper size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">No publicly available information</h3>
        <p className="text-slate-500 mt-2">We could not find any recent news articles or press releases for this company.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            News & Media 
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredNews.length}</span>
          </h2>
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <a key={news.id} href={news.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary/50">
            <div className="relative w-full h-48 bg-slate-100 shrink-0 overflow-hidden">
              <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-sm">
                {news.category || "News"}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{news.date}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  {news.source}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">{news.title}</h3>
              {news.summary && (
                <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-1">{news.summary}</p>
              )}
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-primary font-bold text-xs flex items-center gap-1">
                  Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <ExternalLink size={14} className="text-slate-400" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          No news articles match your search.
        </div>
      )}
    </div>
  );
}
