import React from 'react';
import { CompanyDetails } from '../../types';
import { Briefcase, Mail, Phone, ExternalLink, GraduationCap, MapPin, Search, Filter } from 'lucide-react';
import Image from 'next/image';

interface ContactsTabProps {
  company: CompanyDetails;
}

export function ContactsTab({ company }: ContactsTabProps) {
  // Combine leadership, board, and quickContacts into a unified Executive Directory
  const executives = [
    ...(company.leadership || []).map(l => ({ ...l, type: 'Executive' })),
    ...(company.boardOfDirectors || []).map(b => ({ ...b, department: 'Board of Directors' }))
  ];

  if (executives.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
        <Briefcase size={48} className="text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Executive Contacts Found</h3>
        <p className="text-slate-500 text-center max-w-md">
          We are currently aggregating leadership and contact information for {company.name}.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Executive Directory</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Authoritative leadership and departmental contacts for {company.name}.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search executives..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {executives.map((exec, idx) => (
          <div key={exec.id || idx} className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 overflow-hidden">
            
            {/* Top Pattern / Cover */}
            <div className="h-20 bg-gradient-to-br from-slate-100 to-slate-50 border-b border-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #94a3b8 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            </div>

            {/* Profile Content */}
            <div className="px-6 pb-6 relative flex flex-col flex-1">
              
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md bg-white absolute -top-10 left-6 overflow-hidden z-10 group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src={exec.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(exec.name)}&background=f1f5f9&color=64748b`} 
                  alt={exec.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Department Badge */}
              <div className="flex justify-end pt-3 mb-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-blue-100/50">
                  {exec.department || exec.role}
                </span>
              </div>

              {/* Name & Role */}
              <div className="mt-2 mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                  {exec.name}
                </h3>
                <p className="text-sm font-semibold text-slate-500 line-clamp-2">
                  {exec.role}
                </p>
              </div>

              {/* Details List */}
              <div className="space-y-2 mb-6 mt-auto">
                {exec.education && (
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <GraduationCap size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{exec.education}</span>
                  </div>
                )}
                {company.headquarters && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{company.headquarters.split(',')[0]}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                <a 
                  href={exec.linkedin ? exec.linkedin : `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(exec.name + " " + company.name)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-[#0a66c2]/10 hover:text-[#0a66c2] text-slate-600 text-xs font-bold rounded-xl transition-colors border border-transparent hover:border-[#0a66c2]/20"
                >
                  <ExternalLink size={14} />
                  LinkedIn
                </a>
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors border border-transparent hover:border-slate-200">
                  <Mail size={16} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Global Contacts Matrix */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 md:p-8 mt-12">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <MapPin className="text-blue-600" size={24} />
          Corporate Directory & Global Contacts
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Corporate Headquarters</h4>
            <p className="text-sm font-bold text-slate-900 mb-1">{company.name} HQ</p>
            <p className="text-sm text-slate-600">{company.contactInfo?.address || company.headquarters}</p>
            {company.contactInfo?.mapCoordinates && (
              <p className="text-xs font-mono text-blue-600 mt-2 border-t border-slate-200 pt-2">
                Coords: {company.contactInfo.mapCoordinates.lat.toFixed(4)}, {company.contactInfo.mapCoordinates.lng.toFixed(4)}
              </p>
            )}
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Digital Presence</h4>
            <div className="space-y-3">
              <a href={`https://${company.contactInfo?.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline">
                <ExternalLink size={14} /> Official Website
              </a>
              <a href={company.socialLinks?.linkedin || `https://linkedin.com/company/${company.name.toLowerCase().replace(/\s/g,'-')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-600 font-semibold hover:text-blue-600">
                <Briefcase size={14} /> LinkedIn Company Page
              </a>
            </div>
          </div>
          
          {['Investor Relations', 'Media Relations', 'Medical Information', 'Compliance', 'Business Development', 'HR & Careers'].map(dept => (
            <div key={dept} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-center items-center text-center">
              <Mail className="text-slate-300 mb-2" size={24} />
              <h4 className="text-sm font-bold text-slate-900">{dept}</h4>
              <p className="text-xs text-slate-500 mt-1">Contact via official portal</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
