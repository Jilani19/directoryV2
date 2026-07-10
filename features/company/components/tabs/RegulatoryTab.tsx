"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Shield, ShieldAlert, ShieldCheck, Download, Search, FileText, Calendar, Activity, Database, ExternalLink } from 'lucide-react';
import { CompanyDetails } from '../../types';
import { Pagination } from '../Pagination';
import { useCompanyData } from '../../hooks/useCompanyData';

export function RegulatoryTab({ company }: { company: CompanyDetails }) {
  const { data, isLoading, error } = useCompanyData<{ regulatory?: any[], fdaApplications?: any[] }>(company.id, 'regulatory');
  
  const fdaApplications = data?.fdaApplications || company.fdaApplications || [];
  const enforcementActions = data?.regulatory || (company as any).fdaEnforcement || [];

  const [activeSubTab, setActiveSubTab] = useState<'applications' | 'certifications'>('applications');
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter Certifications
  const filteredCerts = useMemo(() => {
    return company.certificationsList?.filter(cert => {
      const query = searchQuery.toLowerCase();
      return cert.name.toLowerCase().includes(query) || cert.authority.toLowerCase().includes(query);
    }) || [];
  }, [company.certificationsList, searchQuery]);

  // Filter Applications
  const filteredApps = useMemo(() => {
    if (!fdaApplications) return [];
    return fdaApplications.filter(app => {
      const query = searchQuery.toLowerCase();
      return (
        app.brandName?.toLowerCase().includes(query) ||
        app.genericName?.toLowerCase().includes(query) ||
        app.number?.toLowerCase().includes(query) ||
        app.therapeuticArea?.toLowerCase().includes(query)
      );
    });
  }, [fdaApplications, searchQuery]);

  const startItem = (currentPage - 1) * pageSize;
  const endItem = startItem + pageSize;
  
  const paginatedApps = filteredApps.slice(startItem, endItem);
  const paginatedCerts = filteredCerts.slice(startItem, endItem);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300 pb-12">
      <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Shield className="text-blue-600" size={28} />
              Regulatory Affairs & Certifications
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Official regulatory submissions (FDA, EMA), warning letters, quality clearances, and ISO certifications.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${activeSubTab}...`} 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button 
            onClick={() => { setActiveSubTab('applications'); setCurrentPage(1); setSearchQuery(''); }}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeSubTab === 'applications' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            FDA Applications ({fdaApplications?.length || 0})
          </button>
          <button 
            onClick={() => { setActiveSubTab('certifications'); setCurrentPage(1); setSearchQuery(''); }}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeSubTab === 'certifications' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Certifications & ESG ({company.certificationsList?.length || 0})
          </button>
        </div>
      </div>

      {activeSubTab === 'applications' && (
        <>
          {filteredApps.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Verified Data Unavailable</h3>
              <p className="text-slate-500 mt-2">No FDA application records were found for this organization in the OpenFDA database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedApps.map((item: NonNullable<CompanyDetails['fdaApplications']>[0]) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    item.status === 'Approved' ? 'bg-emerald-500' :
                    item.status === 'Pending' ? 'bg-amber-500' :
                    item.status === 'Withdrawn' ? 'bg-red-500' :
                    'bg-slate-300'
                  }`} />
                  
                  <div className="flex justify-between items-start mb-4 mt-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest border border-slate-200 shadow-sm">
                          {item.type}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-500">{item.id || item.number}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mt-2">{item.brandName || "Unknown Brand"}</h3>
                      <p className="text-sm font-semibold text-slate-600 line-clamp-1">{item.genericName}</p>
                    </div>
                    
                    <div className={`flex items-center gap-1.5 font-bold text-xs px-2.5 py-1.5 rounded-lg border shadow-sm shrink-0 ${
                      item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      item.status === 'Withdrawn' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {item.status === 'Approved' && <ShieldCheck size={14} className="text-emerald-500" />}
                      {item.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]"><Calendar size={12} /> Submission</span>
                      <span className="font-bold text-slate-800">{item.submissionDate || "N/A"}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]"><Calendar size={12} /> Approval</span>
                      <span className="font-bold text-slate-800">{item.approvalDate || "N/A"}</span>
                    </div>
                    {item.therapeuticArea && (
                      <div className="flex flex-col gap-1.5 col-span-2 pt-3 mt-1 border-t border-slate-200/60">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Therapeutic Area</span>
                        <span className="font-bold text-blue-700">{item.therapeuticArea}</span>
                      </div>
                    )}
                  </div>
                  {item.fdaLink && (
                    <a href={item.fdaLink} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-1.5 text-blue-600 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-2.5 rounded-xl transition-colors border border-blue-200/50">
                      View Official FDA Record <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeSubTab === 'certifications' && (
        <>
          {filteredCerts.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
              <Shield size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Verified Data Unavailable</h3>
              <p className="text-slate-500 mt-2">No regulatory clearances or ISO certifications could be automatically verified for this organization.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedCerts.map((cert: NonNullable<CompanyDetails['certificationsList']>[0]) => (
                <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50 mb-4 group-hover:bg-blue-50 transition-colors p-4">
                    {cert.image ? <Image src={cert.image} alt={cert.name} fill className="object-contain p-4" /> : <Shield size={32} className="text-slate-400 group-hover:text-blue-500 transition-colors" />}
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-1">{cert.name}</h3>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-4">{cert.authority}</span>
                  
                  <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-100 mt-auto flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Status</span>
                      <div className={`flex items-center gap-1 font-bold text-[10px] ${cert.status === 'Active' ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100' : 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100'}`}>
                        {cert.status === 'Active' ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
                        {cert.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeSubTab === 'applications' && filteredApps.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredApps.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      )}
      
      {activeSubTab === 'certifications' && filteredCerts.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredCerts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
        />
      )}
    </div>
  );
}
