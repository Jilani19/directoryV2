"use client";

import React, { useState } from 'react';
import { CompanyDetails } from '../../types';
import { BookOpen, Award, ExternalLink, Calendar, Search } from 'lucide-react';
import { Pagination } from '../Pagination';
import { useCompanyData } from '../../hooks/useCompanyData';

interface TabProps {
  company: CompanyDetails;
  onTabChange?: (tabId: string) => void;
}

export function PatentsTab({ company }: TabProps) {
  const { data, isLoading, error } = useCompanyData<{ patents?: any[] }>(company.id, 'patents');
  
  const patents = data?.patents || company.patents || [];
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-slate-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-bold text-slate-800">Loading Patents...</h3>
        <p className="text-slate-500 mt-2">Fetching intellectual property records from USPTO PatentsView</p>
      </div>
    );
  }

  if (error || patents.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <BookOpen size={28} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Data Unavailable</h3>
        <p className="text-slate-500 max-w-md">No intellectual property or patent records could be retrieved from USPTO / PatentsView for this organization.</p>
      </div>
    );
  }

  const startItem = (currentPage - 1) * pageSize;
  const endItem = startItem + pageSize;
  const paginatedPatents = patents.slice(startItem, endItem);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300 pb-12">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Total Granted</p>
            <p className="text-2xl font-black text-slate-900">{patents.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Recent Grants</p>
            <p className="text-2xl font-black text-slate-900">
              {patents.filter(p => p.grantDate && new Date(p.grantDate).getFullYear() >= new Date().getFullYear() - 2).length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-center">
           <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Assignee</p>
           <p className="text-sm font-black text-slate-900 truncate leading-snug">{patents[0]?.assignee || company.name}</p>
        </div>
      </div>

      {/* Patents List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-black text-slate-900">USPTO Intellectual Property</h2>
          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Search size={12}/> PatentsView
          </span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {paginatedPatents.map((patent) => (
            <div key={patent.patentNumber} className="p-6 hover:bg-slate-50 transition-colors group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      US {patent.patentNumber}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                      {patent.status}
                    </span>
                    {patent.grantDate && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <Calendar size={12}/> {patent.grantDate}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 pr-4 group-hover:text-blue-600 transition-colors">
                    {patent.title}
                  </h3>
                  
                  <div className="flex flex-col gap-1.5 text-sm">
                    {patent.inventors.length > 0 && (
                      <div className="flex items-start gap-2 text-slate-500 font-medium">
                        <span className="shrink-0 font-bold text-slate-400">Inventors:</span>
                        <span className="line-clamp-2">{patent.inventors.join(', ')}</span>
                      </div>
                    )}
                    {patent.assignee && (
                      <div className="flex items-start gap-2 text-slate-500 font-medium">
                        <span className="shrink-0 font-bold text-slate-400">Assignee:</span>
                        <span className="line-clamp-1">{patent.assignee}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center md:items-start shrink-0 md:pl-6 md:border-l border-slate-100 pt-2 md:pt-0">
                  <a 
                    href={patent.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:border-blue-300 hover:text-blue-700 hover:shadow-sm transition-all"
                  >
                    View Document <ExternalLink size={14} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
        
        <Pagination 
          currentPage={currentPage}
          totalItems={patents.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

    </div>
  );
}
