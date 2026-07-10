"use client";

import React, { useState } from 'react';
import { CompanyDetails } from '../../types';
import { Activity, Globe2, Target, Clock, ExternalLink, Search } from 'lucide-react';
import { Pagination } from '../Pagination';
import { useCompanyData } from '../../hooks/useCompanyData';

interface TabProps {
  company: CompanyDetails;
  onTabChange?: (tabId: string) => void;
}

export function ClinicalTrialsTab({ company }: TabProps) {
  const { data, isLoading, error } = useCompanyData<{ clinicalTrials: any[] }>(company.id, 'clinical');
  const trials = data?.clinicalTrials || [];
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [phaseFilter, setPhaseFilter] = useState('ALL');

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-bold text-slate-800">Loading Clinical Trials...</h3>
        <p className="text-slate-500 mt-2">Fetching realtime data from ClinicalTrials.gov and WHO ICTRP</p>
      </div>
    );
  }

  if (error || trials.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Activity size={28} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Data Unavailable</h3>
        <p className="text-slate-500 max-w-md">No clinical trial data was successfully aggregated from public registries for this organization.</p>
      </div>
    );
  }

  // Filter Logic
  const filteredTrials = trials.filter(trial => {
    const matchesSearch = 
      trial.nctId.toLowerCase().includes(searchQuery.toLowerCase()) || 
      trial.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || trial.status === statusFilter;
    const matchesPhase = phaseFilter === 'ALL' || (trial.phase && trial.phase.includes(phaseFilter));

    return matchesSearch && matchesStatus && matchesPhase;
  });

  const startItem = (currentPage - 1) * pageSize;
  const endItem = startItem + pageSize;
  const paginatedTrials = filteredTrials.slice(startItem, endItem);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300 pb-12">
      
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Total Trials</p>
            <p className="text-2xl font-black text-slate-900">{trials.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Phase 3</p>
            <p className="text-2xl font-black text-slate-900">{trials.filter(t => t.phase.includes('3')).length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
            <Globe2 size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Global Locations</p>
            <p className="text-2xl font-black text-slate-900">{trials.reduce((sum, t) => sum + t.locations, 0)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Active Trials</p>
            <p className="text-2xl font-black text-slate-900">{trials.filter(t => t.status === 'RECRUITING' || t.status === 'ACTIVE_NOT_RECRUITING').length}</p>
          </div>
        </div>
      </div>

      {/* Trials List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-black text-slate-900">Clinical Studies Repository</h2>
            <span className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1">
              Source: <span className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">ClinicalTrials.gov</span>
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search Trial ID or Title..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="RECRUITING">Recruiting</option>
              <option value="ACTIVE_NOT_RECRUITING">Active (Not Recruiting)</option>
              <option value="COMPLETED">Completed</option>
              <option value="TERMINATED">Terminated</option>
            </select>
            <select 
              value={phaseFilter}
              onChange={(e) => {
                setPhaseFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="ALL">All Phases</option>
              <option value="1">Phase 1</option>
              <option value="2">Phase 2</option>
              <option value="3">Phase 3</option>
              <option value="4">Phase 4</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {paginatedTrials.map((trial) => (
            <div key={trial.nctId} className="p-6 hover:bg-slate-50 transition-colors group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {trial.nctId}
                    </span>
                    
                    <StatusBadge status={trial.status} />
                    
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                      Phase: {trial.phase || 'N/A'}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 pr-4 group-hover:text-blue-600 transition-colors">
                    {trial.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 font-medium mt-auto">
                    {trial.sponsor && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"/> Sponsor: {trial.sponsor}
                      </div>
                    )}
                    {trial.enrollment > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"/> Enrollment: {trial.enrollment.toLocaleString()}
                      </div>
                    )}
                    {trial.locations > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"/> Locations: {trial.locations}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center shrink-0 md:pl-6 md:border-l border-slate-100">
                  {trial.completionDate && (
                    <div className="text-right mb-4 hidden md:block">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Completion</p>
                      <p className="text-sm font-semibold text-slate-900">{trial.completionDate}</p>
                    </div>
                  )}
                  
                  <a 
                    href={trial.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:border-blue-300 hover:text-blue-700 hover:shadow-sm transition-all"
                  >
                    View Registry <ExternalLink size={14} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
        
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredTrials.length}
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

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase().replace(/_/g, ' ');
  
  let colorClass = "bg-slate-100 text-slate-700 border-slate-200";
  
  if (normalized.includes('RECRUITING') && !normalized.includes('NOT')) {
    colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (normalized.includes('COMPLETED')) {
    colorClass = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (normalized.includes('ACTIVE')) {
    colorClass = "bg-indigo-50 text-indigo-700 border-indigo-200";
  } else if (normalized.includes('TERMINATED') || normalized.includes('WITHDRAWN')) {
    colorClass = "bg-rose-50 text-rose-700 border-rose-200";
  }

  return (
    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colorClass}`}>
      {normalized}
    </span>
  );
}
