import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Swords, Building2 } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import Link from 'next/link';

export default async function CompetitorsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { 
      competitorsAsSource: { include: { targetCompany: true } },
      competitorsAsTarget: { include: { sourceCompany: true } }
    }
  });

  if (!company) notFound();

  // Combine competitors from both relations
  const competitors = [
    ...company.competitorsAsSource.map(c => c.targetCompany),
    ...company.competitorsAsTarget.map(c => c.sourceCompany)
  ].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i); // deduplicate

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><Swords size={20} className="text-[#2950DA]" /> Competitors & Market Landscape</span>
          {competitors.length > 0 && (
            <span className="px-3 py-1 bg-[#F4F7FB] text-[#2950DA] rounded-full text-[12px] font-bold">
              {competitors.length} Competitors
            </span>
          )}
        </h2>
        
        {competitors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {competitors.map((comp: any) => (
              <Link href={`/directory/${comp.slug}/overview`} key={comp.id} className="flex flex-col p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-[#2950DA]/30 transition-all group">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl mb-4 flex items-center justify-center shrink-0 overflow-hidden">
                  {comp.logoUrl ? (
                    <img src={comp.logoUrl} alt={comp.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <Building2 size={24} className="text-slate-300" />
                  )}
                </div>
                <h4 className="font-black text-slate-900 leading-snug group-hover:text-[#2950DA] transition-colors mb-1 truncate">
                  {comp.name}
                </h4>
                <div className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
                  {comp.hqAddress ? (
                    <span className="truncate">{comp.hqAddress}</span>
                  ) : (
                    <span>Location Unavailable</span>
                  )}
                  {comp.revenue && (
                    <span className="text-[#2950DA]">Revenue: {formatCurrency(comp.revenue, comp.currency || 'USD')}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">No verified competitor records available.</p>
        )}
      </div>
    </div>
  );
}