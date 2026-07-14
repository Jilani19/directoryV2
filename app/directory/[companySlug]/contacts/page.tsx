import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Phone, Mail, Globe, MapPin, Share2 } from 'lucide-react';
import Link from 'next/link';

export default async function ContactsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Phone size={20} className="text-[#2950DA]" /> Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Headquarters</span>
                <span className="text-sm font-bold text-slate-800 leading-relaxed">{company.hqAddress || 'No verified address available'}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <Phone size={20} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</span>
                <span className="text-sm font-bold text-slate-800 leading-relaxed">{company.phone || 'No verified phone available'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={20} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</span>
                <span className="text-sm font-bold text-slate-800 leading-relaxed">{company.email || 'No verified email available'}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                <Globe size={20} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Website</span>
                {company.website ? (
                  <Link href={company.website} target="_blank" className="text-sm font-bold text-[#2950DA] hover:underline leading-relaxed">
                    {company.website}
                  </Link>
                ) : (
                  <span className="text-sm font-bold text-slate-800 leading-relaxed">No verified website available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Share2 size={20} className="text-[#2950DA]" /> Social Profiles
        </h2>
        
        <div className="flex flex-wrap items-center gap-4">
          {company.socialLinkedin && (
            <Link href={company.socialLinkedin} target="_blank" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:border-[#2950DA] hover:text-[#2950DA] transition-colors font-semibold text-slate-700 text-sm">
              LinkedIn
            </Link>
          )}
          {company.socialTwitter && (
            <Link href={company.socialTwitter} target="_blank" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:border-[#2950DA] hover:text-[#2950DA] transition-colors font-semibold text-slate-700 text-sm">
              Twitter / X
            </Link>
          )}
          {company.socialFacebook && (
            <Link href={company.socialFacebook} target="_blank" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:border-[#2950DA] hover:text-[#2950DA] transition-colors font-semibold text-slate-700 text-sm">
              Facebook
            </Link>
          )}
          {company.socialYoutube && (
            <Link href={company.socialYoutube} target="_blank" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:border-[#2950DA] hover:text-[#2950DA] transition-colors font-semibold text-slate-700 text-sm">
              YouTube
            </Link>
          )}
          {!company.socialLinkedin && !company.socialTwitter && !company.socialFacebook && !company.socialYoutube && (
            <p className="text-sm font-medium text-slate-500">No verified social profiles available.</p>
          )}
        </div>
      </div>

    </div>
  );
}