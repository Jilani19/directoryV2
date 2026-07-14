import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ShieldAlert, FileBadge, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function RegulatoryPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { 
      patents: { orderBy: { createdAt: 'desc' } },
      documents: { where: { type: { in: ['Enforcement', 'Recall', 'Warning Letter'] } } }
    }
  });

  if (!company) notFound();

  const regulatoryDocs = company.documents;

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Regulatory Compliance Placeholder for verified data */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <ShieldAlert size={20} className="text-[#2950DA]" /> Compliance & Certifications
        </h2>
        {regulatoryDocs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {regulatoryDocs.map((doc: any) => (
              <div key={doc.id} className="flex flex-col p-4 border border-slate-100 rounded-xl bg-slate-50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{doc.title}</h4>
                    <span className="inline-block mt-2 px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-bold uppercase tracking-wider">{doc.type}</span>
                  </div>
                  {doc.url && (
                    <Link href={doc.url} target="_blank" className="shrink-0 text-slate-400 hover:text-[#2950DA]">
                      <ExternalLink size={16} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-slate-500">No verified regulatory compliance records (Warning Letters, Recalls, Certifications) available.</p>
          </div>
        )}
      </div>

      {/* Patents Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><FileBadge size={20} className="text-[#2950DA]" /> Patents & Intellectual Property</span>
          {company.patents.length > 0 && (
            <span className="px-3 py-1 bg-[#F4F7FB] text-[#2950DA] rounded-full text-[12px] font-bold">
              {company.patents.length} Patents
            </span>
          )}
        </h2>
        
        {company.patents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {company.patents.map((patent: any) => (
              <div key={patent.id} className="flex flex-col p-5 border border-slate-100 rounded-2xl bg-slate-50 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h4 className="font-bold text-slate-900 leading-snug group-hover:text-[#2950DA] transition-colors line-clamp-2">
                    {patent.title}
                  </h4>
                  {patent.url && (
                    <Link href={patent.url} target="_blank" className="shrink-0 text-slate-400 hover:text-[#2950DA] transition-colors">
                      <ExternalLink size={16} />
                    </Link>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mt-auto pt-4">
                  <span className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md">{patent.patentNumber}</span>
                  {patent.status && (
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">{patent.status}</span>
                  )}
                  {patent.filingDate && (
                    <span className="text-slate-500 ml-auto">Filed: {patent.filingDate}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">No verified patent records available.</p>
        )}
      </div>
    </div>
  );
}