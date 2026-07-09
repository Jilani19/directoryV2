import React from 'react';
import { MapPin, Mail, Phone, Globe, ExternalLink } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function ContactInfo({ company }: { company: CompanyDetails }) {
  const contact = company.contactInfo;
  const socials = company.socialLinks;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
      <h3 className="text-xl font-black text-slate-900 mb-6">Contact Information</h3>
      
      {!contact ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 font-medium p-6 text-center">
          Contact information not available.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-primary" />
          </div>
          <div className="flex flex-col pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Headquarters</span>
            <span className="text-sm text-slate-700 leading-relaxed font-bold">{contact.address}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Mail size={18} className="text-primary" />
          </div>
          <div className="flex flex-col pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</span>
            <a href={`mailto:${contact.email}`} className="text-sm font-bold text-slate-900 hover:text-primary transition-colors">{contact.email}</a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Phone size={18} className="text-primary" />
          </div>
          <div className="flex flex-col pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</span>
            <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-bold text-slate-900 hover:text-primary transition-colors">{contact.phone}</a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Globe size={18} className="text-primary" />
          </div>
          <div className="flex flex-col pt-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Website</span>
            <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-900 hover:text-primary transition-colors">{contact.website}</a>
          </div>
        </div>
      </div>

      {/* Social Links */}
      {socials && (
        <div className="mb-8 pt-6 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Connect on Social Media</h4>
          <div className="flex items-center gap-3">
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900/10 text-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
            {socials.facebook && (
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
            {socials.youtube && (
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      )}
        
          {/* Map Embed */}
          {contact.mapCoordinates && (
            <div className="mt-auto w-full h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                referrerPolicy="no-referrer-when-downgrade" 
                src={`https://www.google.com/maps?q=${contact.mapCoordinates.lat},${contact.mapCoordinates.lng}&hl=es;z=14&output=embed`}
              ></iframe>
            </div>
          )}
        </>
      )}
    </div>
  );
}
