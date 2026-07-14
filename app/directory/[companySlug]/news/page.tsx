import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Newspaper, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function NewsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { news: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><Newspaper size={20} className="text-[#2950DA]" /> News & Press Releases</span>
          {company.news.length > 0 && (
            <span className="px-3 py-1 bg-[#F4F7FB] text-[#2950DA] rounded-full text-[12px] font-bold">
              {company.news.length} Articles
            </span>
          )}
        </h2>
        
        {company.news.length > 0 ? (
          <div className="flex flex-col gap-4">
            {company.news.map((n: any) => (
              <div key={n.id} className="flex flex-col md:flex-row gap-6 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{n.source || 'News'}</span>
                    <span className="text-[10px] font-bold text-slate-400">•</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{n.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#2950DA] transition-colors mb-4">
                    {n.title}
                  </h4>
                  {n.url && (
                    <Link href={n.url} target="_blank" className="text-xs font-bold text-[#2950DA] flex items-center gap-1 mt-auto self-start hover:underline">
                      Read Full Article <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">No verified news records available.</p>
        )}
      </div>
    </div>
  );
}