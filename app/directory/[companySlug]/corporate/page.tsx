import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Building2, Network, Anchor } from 'lucide-react';

export default async function CorporatePage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { subsidiaries: true }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Anchor size={20} className="text-[#2950DA]" /> Legal & Registration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Legal Name</span>
            <span className="text-sm font-bold text-slate-800">{company.name}</span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Incorporation Date</span>
            <span className="text-sm font-bold text-slate-800">
              {company.incorporationDate ? new Date(company.incorporationDate).toLocaleDateString() : 'No verified data available'}
            </span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Stock Exchange</span>
            <span className="text-sm font-bold text-slate-800">{company.stockExchange || 'No verified data available'}</span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ticker Symbol</span>
            <span className="text-sm font-bold text-slate-800">{company.ticker || 'No verified data available'}</span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">ISIN</span>
            <span className="text-sm font-bold text-slate-800">{company.isin || 'No verified data available'}</span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Parent Company</span>
            <span className="text-sm font-bold text-slate-800">{company.parentCompany || 'None / Independent'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Network size={20} className="text-[#2950DA]" /> Subsidiaries & Affiliates
        </h2>
        
        {company.subsidiaries && company.subsidiaries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.subsidiaries.map((sub: any) => (
              <div key={sub.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl bg-slate-50">
                <Building2 size={16} className="text-slate-400 shrink-0" />
                <span className="text-sm font-bold text-slate-700 truncate">{sub.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">No verified subsidiaries available.</p>
        )}
      </div>

    </div>
  );
}