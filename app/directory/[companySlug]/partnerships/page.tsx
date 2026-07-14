import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Handshake } from 'lucide-react';

export default async function PartnershipsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Handshake size={20} className="text-[#2950DA]" /> Strategic Partnerships
        </h2>
        
        {company.recentPartnerships ? (
          <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
            {company.recentPartnerships}
          </p>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-500">No verified partnership records available.</p>
          </div>
        )}
      </div>
    </div>
  );
}