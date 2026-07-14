import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BookOpen, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';

export default async function ResearchPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { publications: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><BookOpen size={20} className="text-[#2950DA]" /> Scientific Publications</span>
          {company.publications.length > 0 && (
            <span className="px-3 py-1 bg-[#F4F7FB] text-[#2950DA] rounded-full text-[12px] font-bold">
              {company.publications.length} Papers
            </span>
          )}
        </h2>
        
        {company.publications.length > 0 ? (
          <div className="flex flex-col gap-4">
            {company.publications.map((pub: any) => (
              <div key={pub.id} className="flex flex-col p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h4 className="font-bold text-slate-900 leading-snug group-hover:text-[#2950DA] transition-colors">
                    {pub.title}
                  </h4>
                  {pub.url && (
                    <Link href={pub.url} target="_blank" className="shrink-0 p-2 bg-slate-50 text-slate-400 hover:text-[#2950DA] rounded-lg transition-colors">
                      <ExternalLink size={16} />
                    </Link>
                  )}
                </div>
                
                {pub.authors && (
                  <p className="text-xs font-medium text-slate-600 mb-4 flex items-center gap-1.5 leading-relaxed">
                    <Users size={14} className="text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{pub.authors}</span>
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  {pub.journal && (
                    <span className="bg-[#F8FAFC] border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md">{pub.journal}</span>
                  )}
                  {pub.publicationDate && (
                    <span className="text-slate-500">{pub.publicationDate}</span>
                  )}
                  {pub.pmid && (
                    <span className="text-slate-400 border-l border-slate-200 pl-3">PMID: {pub.pmid}</span>
                  )}
                  {pub.doi && (
                    <span className="text-slate-400 border-l border-slate-200 pl-3">DOI: {pub.doi}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">No verified publication records available.</p>
        )}
      </div>
    </div>
  );
}