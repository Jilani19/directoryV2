"use client";

import React, { useState } from 'react';
import { CompanyDetails } from '../../types';
import { Newspaper, ExternalLink, Calendar, Search, TrendingUp, AlertCircle, Clock, History, Presentation, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function NewsTab({ company }: { company: CompanyDetails }) {
  const [activeTab, setActiveTab] = useState<'news' | 'calendars'>('news');
  const news = company.latestNews || [];

  const calendarSections = [
    { title: "Catalyst Calendar", data: company.catalystCalendar, icon: TrendingUp, emptyMsg: "No upcoming catalysts tracked" },
    { title: "PDUFA Calendar", data: company.pdufaCalendar, icon: Calendar, emptyMsg: "No upcoming PDUFA dates tracked" },
    { title: "Historical PDUFA Data", data: company.historicalPdufa, icon: History, emptyMsg: "No historical PDUFA outcomes found" },
    { title: "Bio Pharma Meetings & Events", data: company.bioPharmaMeetings, icon: Presentation, emptyMsg: "No scheduled corporate events or scientific meetings" },
  ];

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-12">
      <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Newspaper className="text-blue-600" size={28} />
              News, Media & Events
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Aggregated press releases, intelligence feeds, FDA PDUFA action dates, and corporate calendars.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search news & events..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('news')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'news' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Intelligence & Media ({news.length})
          </button>
          <button 
            onClick={() => setActiveTab('calendars')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'calendars' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Corporate Calendars
          </button>
        </div>
      </div>

      {activeTab === 'news' && (
        <>
          {news.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
              <Newspaper size={48} className="text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Verified Intelligence Found</h3>
              <p className="text-slate-500 text-center max-w-md">We are currently aggregating news, press releases, and intelligence feeds.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Featured News */}
              <a href={news[0].url || "#"} target="_blank" rel="noopener noreferrer" className="group block bg-slate-900 rounded-[2rem] overflow-hidden relative shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
                {news[0].image && (
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                    <Image src={news[0].image} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                  </div>
                )}
                <div className="relative z-10 p-8 md:p-12 flex flex-col h-full min-h-[300px] justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg">{news[0].category || "Featured"}</span>
                    <span className="flex items-center gap-1.5 text-slate-300 text-sm font-medium"><Clock size={14} /> {news[0].date}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight group-hover:text-blue-300 transition-colors mb-3">{news[0].title}</h3>
                  {news[0].summary && <p className="text-slate-300 text-base line-clamp-2 max-w-3xl mb-6">{news[0].summary}</p>}
                </div>
              </a>

              {/* Grid List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {news.slice(1).map((item, idx) => (
                  <a key={item.id || idx} href={item.url || "#"} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row gap-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                    {item.image ? (
                      <div className="w-full sm:w-40 h-40 sm:h-full min-h-[140px] rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200/50">
                        <Image src={item.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="w-full sm:w-40 h-40 sm:h-full min-h-[140px] rounded-2xl shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-300 transition-colors">
                        <Newspaper size={32} />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{item.category || "Press Release"}</span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">{item.title}</h4>
                      {item.summary && <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{item.summary}</p>}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'calendars' && (
        <div className="flex flex-col gap-6">
          {company.ipoTracker && (
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[2rem] border border-blue-800 shadow-lg p-6 md:p-8 flex items-center justify-between text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-blue-200 uppercase tracking-widest mb-1">IPO Tracker</h3>
                <p className="text-2xl md:text-3xl font-black">{company.ipoTracker}</p>
              </div>
              <div className="relative z-10 hidden md:block">
                <TrendingUp size={48} className="text-blue-400 opacity-50" />
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {calendarSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-blue-200 transition-colors">
                  <div className="bg-slate-900 px-6 py-4 border-b border-slate-200/50 flex items-center gap-3">
                    <Icon size={18} className="text-blue-400" />
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">{section.title}</h3>
                  </div>
                  <div className="p-6 flex-1">
                    {section.data && section.data.length > 0 ? (
                      <ul className="space-y-4">
                        {section.data.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                            <p className="text-sm text-slate-700 leading-relaxed font-medium">{item}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[150px]">
                        <Calendar size={32} className="mb-3 opacity-20" />
                        <p className="text-sm font-medium italic">{section.emptyMsg}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
