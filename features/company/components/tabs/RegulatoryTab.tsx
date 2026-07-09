"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Shield, ShieldAlert, ShieldCheck, Download, Search } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function RegulatoryTab({ company }: { company: CompanyDetails }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCerts = company.certificationsList?.filter(cert => {
    const query = searchQuery.toLowerCase();
    return cert.name.toLowerCase().includes(query) || cert.authority.toLowerCase().includes(query);
  }) || [];

  if (!company.certificationsList || company.certificationsList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <Shield size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">No publicly available information</h3>
        <p className="text-slate-500 mt-2">We could not find any public regulatory or certification records for this company.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Regulatory & Certifications
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredCerts.length}</span>
          </h2>
          <p className="text-slate-600 text-sm mt-1">Official certifications and regulatory clearances obtained by {company.name}.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search certificates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCerts.map((cert) => (
          <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all group flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-primary/50" tabIndex={0}>
            <div className="w-24 h-24 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-inner mb-4 relative group-hover:border-primary/30 transition-colors p-4 shrink-0 overflow-hidden">
              {cert.image ? (
                <Image src={cert.image} alt={cert.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform" />
              ) : (
                <Shield size={40} className="text-slate-300" />
              )}
            </div>
            
            <h3 className="text-lg font-black text-slate-900 mb-1">{cert.name}</h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-4">{cert.authority}</span>
            
            <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-100 mt-auto flex flex-col gap-2">
              <div className="w-full flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Status</span>
                <div className={`flex items-center gap-1 font-bold ${cert.status === 'Active' ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100' : 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100'}`}>
                  {cert.status === 'Active' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                  {cert.status}
                </div>
              </div>
              
              {cert.issueDate && (
                <div className="w-full flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Issued</span>
                  <span className="font-bold text-slate-800">{cert.issueDate}</span>
                </div>
              )}
            </div>

            {cert.downloadUrl && (
              <a 
                href={cert.downloadUrl} 
                download
                className="w-full mt-4 py-2.5 bg-slate-50 hover:bg-primary hover:text-white border border-slate-200 hover:border-primary rounded-xl text-slate-700 font-bold text-sm transition-colors flex items-center justify-center gap-2 group/btn"
              >
                <Download size={16} className="text-slate-400 group-hover/btn:text-white transition-colors" />
                Download PDF
              </a>
            )}
          </div>
        ))}
      </div>

      {filteredCerts.length === 0 && (
        <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          No certificates match your search.
        </div>
      )}
    </div>
  );
}
