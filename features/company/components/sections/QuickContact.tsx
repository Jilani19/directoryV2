import React from 'react';
import { CompanyDetails } from '../../types';
import { Phone, Mail, Building2, Users, MessageCircle, Briefcase, Video, ExternalLink } from 'lucide-react';

export function QuickContact({ company }: { company: CompanyDetails }) {
  const contacts = company.quickContacts || [];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm h-full flex flex-col">
      <h3 className="text-2xl font-black text-slate-900 mb-6">Quick Contacts</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Main Headquarters Contact */}
        {company.contactInfo && (
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Building2 size={16} className="text-primary" />
              <span className="font-black text-slate-900 text-sm">Corporate Headquarters</span>
            </div>
            {company.contactInfo.phone && (
              <a href={`tel:${company.contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
                <Phone size={14} className="text-slate-400" />
                {company.contactInfo.phone}
              </a>
            )}
            {company.contactInfo.email && (
              <a href={`mailto:${company.contactInfo.email}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
                <Mail size={14} className="text-slate-400" />
                {company.contactInfo.email}
              </a>
            )}
          </div>
        )}

        {/* Additional Departments */}
        {contacts.map((contact, idx) => (
          <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              <span className="font-black text-slate-900 text-sm">{contact.department}</span>
            </div>
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
                <Phone size={14} className="text-slate-400" />
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors">
                <Mail size={14} className="text-slate-400" />
                {contact.email}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Official Channels</h4>
        <div className="flex flex-wrap items-center gap-3">
          {company.contactInfo?.website && (
            <a href={`https://${company.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 hover:bg-primary transition-colors">
              Visit Website <ExternalLink size={14} />
            </a>
          )}
          {company.socialLinks?.linkedin && (
            <a href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors" title="LinkedIn">
              <Briefcase size={18} />
            </a>
          )}
          {company.socialLinks?.twitter && (
            <a href={company.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900/10 text-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors" title="X (Twitter)">
              <MessageCircle size={18} />
            </a>
          )}
          {company.socialLinks?.facebook && (
            <a href={company.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors" title="Facebook">
              <Users size={18} />
            </a>
          )}
          {company.socialLinks?.youtube && (
            <a href={company.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors" title="YouTube">
              <Video size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
