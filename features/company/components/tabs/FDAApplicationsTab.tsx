"use client";

import React, { useState, useMemo } from 'react';
import { FileText, Search, ShieldCheck, Calendar, Activity, Database, ExternalLink } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function FDAApplicationsTab({ company }: { company: CompanyDetails }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = useMemo(() => {
    if (!company.fdaApplications) return [];
    return company.fdaApplications.filter(app => {
      const query = searchQuery.toLowerCase();
      return (
        app.brandName?.toLowerCase().includes(query) ||
        app.genericName?.toLowerCase().includes(query) ||
        app.number?.toLowerCase().includes(query) ||
        app.therapeuticArea?.toLowerCase().includes(query)
      );
    });
  }, [company.fdaApplications, searchQuery]);

  if (!company.fdaApplications || company.fdaApplications.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <FileText size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">No publicly available information</h3>
        <p className="text-slate-500 mt-2">We could not find any public FDA applications or approvals associated with this company.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          FDA Applications
          <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredApps.length}</span>
        </h2>
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search applications..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col group relative overflow-hidden">
            {/* Status Strip */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              app.status === 'Approved' ? 'bg-emerald-500' :
              app.status === 'Pending' ? 'bg-amber-500' :
              app.status === 'Withdrawn' ? 'bg-red-500' :
              'bg-slate-300'
            }`} />
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest border border-slate-200 shadow-sm">
                    {app.type}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-500">{app.id || app.number}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-2">{app.brandName || "Unknown Brand"}</h3>
                <p className="text-sm font-semibold text-slate-600 line-clamp-1">{app.genericName}</p>
              </div>
              
              <div className={`flex items-center gap-1.5 font-bold text-xs px-2.5 py-1.5 rounded-lg border shadow-sm shrink-0 ${
                app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                app.status === 'Withdrawn' ? 'bg-red-50 text-red-700 border-red-200' :
                'bg-slate-50 text-slate-700 border-slate-200'
              }`}>
                {app.status === 'Approved' && <ShieldCheck size={14} className="text-emerald-500" />}
                {app.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs mt-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <Calendar size={12} /> Submission Date
                </span>
                <span className="font-bold text-slate-800">{app.submissionDate || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <Calendar size={12} /> Approval Date
                </span>
                <span className="font-bold text-slate-800">{app.approvalDate || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <Database size={12} /> Dosage Form
                </span>
                <span className="font-bold text-slate-800">{app.dosageForm || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <Activity size={12} /> Strength
                </span>
                <span className="font-bold text-slate-800 line-clamp-1" title={app.strength}>{app.strength || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 pt-3 mt-1 border-t border-slate-200/60">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Therapeutic Area</span>
                <span className="font-bold text-primary-700">{app.therapeuticArea || "N/A"}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 line-clamp-1 pr-4">Applicant: {app.applicant || company.name}</span>
              {app.fdaLink && (
                <a 
                  href={app.fdaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-primary font-bold text-xs bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  FDA View <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredApps.length === 0 && (
        <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          No applications match your search.
        </div>
      )}
    </div>
  );
}
