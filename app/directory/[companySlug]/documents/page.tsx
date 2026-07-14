import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FileText, Download } from 'lucide-react';
import Link from 'next/link';

export default async function DocumentsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { documents: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><FileText size={20} className="text-[#2950DA]" /> SEC Filings & Documents</span>
          {company.documents.length > 0 && (
            <span className="px-3 py-1 bg-[#F4F7FB] text-[#2950DA] rounded-full text-[12px] font-bold">
              {company.documents.length} Files
            </span>
          )}
        </h2>
        
        {company.documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {company.documents.map((doc: any) => (
              <div key={doc.id} className="flex items-start gap-4 p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-rose-600" />
                </div>
                <div className="flex flex-col flex-1">
                  <h4 className="font-bold text-slate-900 leading-snug group-hover:text-[#2950DA] transition-colors line-clamp-2 mb-1">
                    {doc.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                    <span className="uppercase">{doc.type || 'PDF'}</span>
                    {doc.category && <span className="border-l border-slate-200 pl-2">{doc.category}</span>}
                  </div>
                  {doc.url && (
                    <Link href={doc.url} target="_blank" className="text-xs font-bold text-[#2950DA] flex items-center gap-1 hover:underline w-max">
                      <Download size={14} /> View Document
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">No verified document records available.</p>
        )}
      </div>
    </div>
  );
}