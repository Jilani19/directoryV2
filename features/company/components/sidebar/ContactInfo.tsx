import React from 'react';
import { MapPin, Phone, Globe, ExternalLink, FileText } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function ContactInfo({ company }: { company: CompanyDetails }) {
  const contact = company.contactInfo;
  const socials = company.socialLinks;

  if (!contact && !socials) return null;

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Corporate Directory</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        
        {/* Corporate Headquarters */}
        {contact?.address && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:text-primary transition-colors text-slate-500">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Corporate Headquarters</span>
              <span className="text-sm font-bold text-slate-800 leading-tight">{contact.address}</span>
            </div>
          </div>
        )}

        {/* Global Website */}
        {(contact?.website || company.website) && (
          <a href={`https://${contact?.website || company.website}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-slate-500">
              <Globe size={18} />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Official Website</span>
              <span className="text-sm font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">{contact?.website || company.website}</span>
            </div>
          </a>
        )}

        {/* Investor Relations */}
        {contact?.email && (
          <a href={`mailto:${contact.email}`} className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all group flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 transition-colors text-slate-500">
              <FileText size={18} />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Investor Relations</span>
              <span className="text-sm font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">{contact.email}</span>
            </div>
          </a>
        )}

        {/* General Support / Phone */}
        {contact?.phone && (
          <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all group flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:text-blue-600 transition-colors text-slate-500">
              <Phone size={18} />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Corporate Switchboard</span>
              <span className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{contact.phone}</span>
            </div>
          </a>
        )}

        {/* LinkedIn */}
        {socials?.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#0A66C2]/30 transition-all group flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2]/10 group-hover:text-[#0A66C2] transition-colors text-slate-500">
              <ExternalLink size={18} />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">LinkedIn Profile</span>
              <span className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#0A66C2] transition-colors">View Company Page</span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
