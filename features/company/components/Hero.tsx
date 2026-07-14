import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, MapPin, Building2, Calendar, Globe, Bookmark, Download, Phone, Mail } from 'lucide-react';
import { Company } from '@prisma/client';

type CompanyWithTagline = Company & { tagline?: string; aboutDescription?: string };

export default function Hero({ company }: { company: any }) {
  // Safe helper to strip URLs
  const cleanUrl = (url?: string | null) => url ? url.replace(/^https?:\/\/(www\.)?/, '') : null;

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden bg-white shadow-sm border border-slate-200 min-h-[440px] flex">
      
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-1/2 h-full bg-white relative z-10"></div>
        <div className="w-1/2 h-full relative">
          <Image 
            src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1200&auto=format&fit=crop"
            alt="HQ Building"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-20 w-full p-10 flex justify-between items-start">
        
        {/* Left Side Content */}
        <div className="flex flex-col w-full max-w-[600px]">
          
          {/* Title Area */}
          <div className="flex items-center gap-4 mb-4 mt-6">
            <h1 className="text-[44px] font-black text-slate-900 tracking-tight leading-none">{company.name}</h1>
            <span className="flex items-center gap-1 bg-[#10B981] text-white px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase">
              <ShieldCheck size={12} className="fill-[#10B981] text-white"/> Verified
            </span>
          </div>

          {company.tagline && (
             <p className="text-lg text-slate-700 mb-4 max-w-[600px]">
               {company.tagline}
             </p>
           )}
           {company.aboutDescription && (
             <p className="text-lg text-slate-700 mb-4 max-w-[600px]">
               {company.aboutDescription}
             </p>
           )}

           {/* Meta Information Grid */}
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-600 mb-6">
            {company.hqAddress ? (
               <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {company.hqAddress.split(',').pop()?.trim()}</span>
            ) : (
               <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> Location unverified</span>
            )}
            
            {company.foundedYear ? (
               <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400"/> Est. {company.foundedYear}</span>
            ) : (
               <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400"/> Founded unverified</span>
            )}

            {company.ownershipType && (
               <span className="flex items-center gap-1.5"><Building2 size={14} className="text-slate-400"/> {company.ownershipType}</span>
            )}
          </div>

          {/* Description */}


          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {company.website && (
              <Link href={company.website} target="_blank" className="bg-[#2950DA] hover:bg-[#1f3eaa] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors">
                Visit Website →
              </Link>
            )}
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-xl text-sm font-bold transition-colors">
              Download Profile
            </button>
            <button className="bg-white border border-slate-300 text-slate-500 hover:bg-slate-50 p-3 rounded-xl transition-colors">
              <Bookmark size={18} />
            </button>
          </div>

        </div>

        {/* Right Side Floating Contact Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40 w-[280px] shrink-0 mt-4 mr-4 flex flex-col gap-6">
           
           <div className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
               <MapPin size={14} className="text-[#2950DA]" />
             </div>
             <div className="flex flex-col">
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Headquarters</span>
               <span className="text-xs font-semibold text-slate-800 leading-snug mt-1">
                 {company.hqAddress || 'No verified data available'}
               </span>
             </div>
           </div>

           <div className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
               <Phone size={14} className="text-[#2950DA]" />
             </div>
             <div className="flex flex-col">
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Phone</span>
               <span className="text-xs font-semibold text-slate-800 leading-snug mt-1">
                 {company.phone || 'No verified data available'}
               </span>
             </div>
           </div>

           <div className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
               <Mail size={14} className="text-[#2950DA]" />
             </div>
             <div className="flex flex-col">
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Email</span>
               <span className="text-xs font-semibold text-slate-800 leading-snug mt-1 truncate max-w-[150px]">
                 {company.email ? company.email : 'No verified data available'}
               </span>
             </div>
           </div>

           <div className="flex items-center justify-center gap-3 pt-2">
              {/* Only rendering SVG icons to avoid missing imports in lucide-react */}
              {company.socialLinkedin && (
                <Link href={company.socialLinkedin} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#2950DA] hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
              )}
              {company.socialTwitter && (
                <Link href={company.socialTwitter} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#2950DA] hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </Link>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
