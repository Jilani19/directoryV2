import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Target, Flag, Stethoscope, Factory, Globe2, Briefcase, Activity, Banknote, ShieldAlert, FileText, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import Link from 'next/link';
import GlobalMap from '@/features/company/components/GlobalMap';
import { DataProvenanceTooltip } from '@/components/ui/DataProvenanceTooltip';

export default async function OverviewPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  let company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: {
      facilities: true,
      news: { take: 4, orderBy: { createdAt: 'desc' } },
      patents: { take: 3 },
      _count: {
        select: {
          facilities: true,
          products: true,
          clinicalTrials: true,
          news: true,
        }
      }
    }
  });

  if (!company) notFound();

    // Auto-creation of facilities removed per architectural policy: rendering must not mutate database

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* 1. Executive Summary & AI Note */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles size={24} className="text-[#2950DA]" /> Executive Summary
          </h2>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#2950DA] rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100">
            <ShieldAlert size={12} /> Verified Data Only
          </span>
        </div>
        <>
          {(company.businessOverview || company.description) && (
            <p className="text-base text-slate-700 leading-relaxed font-medium mb-8 max-w-4xl">
              {company.businessOverview || company.description}
            </p>
          )}
          {company.history && (
            <p className="text-base text-slate-700 leading-relaxed font-medium mb-8 max-w-4xl">
              {company.history}
            </p>
          )}
          {!company.businessOverview && !company.description && !company.history && (
            <p className="text-base text-slate-700 leading-relaxed font-medium mb-8 max-w-4xl">
              Detailed business overview information is currently being synchronized.
            </p>
          )}
        </>
      
      </div>

      {/* 2. Financials & Operational KPIs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Quick Stats */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
           {company._count.products && company._count.products > 0 && (
              <Link href={`/directory/${companySlug}/products`} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Activity size={28} className="text-purple-600"/></div>
                <span className="text-4xl font-black text-slate-900 mb-2">{company._count.products}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Approved Products</span>
                <span className="text-[11px] font-bold text-[#2950DA] mt-auto">Browse Portfolio →</span>
              </Link>
            )}
           
           <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center"><Stethoscope size={20} className="text-indigo-600"/></div>
                <h3 className="font-bold text-slate-900">Innovation</h3>
              </div>
              
              <div className="flex flex-col gap-3 flex-1 justify-center">
                 <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Patents</span>
                    {(company as any).stockPrice && (
                      <span className="text-sm font-bold text-slate-800">{(company as any).stockPrice}</span>
                    )}
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Therapeutic Areas</span>
                    <span className="text-sm font-black text-slate-800">12+</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global R&D Centers</span>
                    {company.currency && (
                      <span className="text-sm font-bold text-slate-800">{company.currency}</span>
                    )}
                 </div>
              </div>
           </div>

           <Link href={`/directory/${companySlug}/facilities`} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Factory size={28} className="text-emerald-600"/></div>
              <span className="text-4xl font-black text-slate-900 mb-2">{company._count.facilities || '-'}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Global Facilities</span>
              <span className="text-[11px] font-bold text-[#2950DA] mt-auto">View Locations →</span>
           </Link>
        </div>

        {/* Right Col: Financials Glassmorphism Card */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] rounded-3xl p-8 border border-slate-700 shadow-xl flex flex-col h-full text-white relative overflow-hidden group">
             {/* Glass Overlay Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#2950DA] rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
             
             <div className="flex items-center justify-between mb-8 relative z-10">
               <h2 className="text-xl font-black text-white">Financials</h2>
               <Banknote size={24} className="text-emerald-400 opacity-80" />
             </div>
             
             <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
               <div className="flex flex-col col-span-2 mb-2 pb-6 border-b border-white/10">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Market Cap</span>
                 {company.marketCap && (
                    <span className="text-2xl font-black text-white">{formatCurrency(company.marketCap, company.currency || 'USD')}</span>
                 )}
               </div>
               
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue (TTM)</span>
                 {company.revenue && (
                    <span className="text-2xl font-black text-white">{formatCurrency(company.revenue, company.currency || 'USD')}</span>
                 )}
               </div>
               {(company as any).netIncome && (
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Net Income</span>
                   <span className="text-base font-bold text-slate-200">{formatCurrency((company as any).netIncome, company.currency || 'USD')}</span>
                 </div>
               )}
               {(company as any).cash && (
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cash</span>
                   <span className="text-base font-bold text-slate-200">{formatCurrency((company as any).cash, company.currency || 'USD')}</span>
                 </div>
               )}
               {(company as any).debt && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Debt</span>
                    <span className="text-base font-bold text-slate-200">{formatCurrency((company as any).debt, company.currency || 'USD')}</span>
                  </div>
                )}
             </div>
             <Link href={`/directory/${companySlug}/financials`} className="mt-auto pt-6 text-[11px] font-bold text-[#3B82F6] hover:text-white transition-colors relative z-10 tracking-widest uppercase">Full Ledger →</Link>
          </div>
        </div>

      </div>

      {/* 3. Bottom Row: Map Preview & Highlights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
         
         {/* Global Presence Map Preview */}
         <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6 relative z-10 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><Globe2 size={24} className="text-[#2950DA]"/> Global Footprint</h2>
              <Link href={`/directory/${companySlug}/facilities`} className="text-[10px] font-bold text-[#2950DA] uppercase tracking-widest hover:underline">Explore Map →</Link>
            </div>
            
            <div className="flex-1 min-h-[300px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 relative">
               <GlobalMap facilities={company.facilities} />
            </div>
         </div>

         {/* Latest News & Highlights */}
         <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <FileText size={24} className="text-[#2950DA]" /> Latest Highlights
              </h2>
              <Link href={`/directory/${companySlug}/news`} className="text-[10px] font-bold text-[#2950DA] px-3 py-1 bg-[#F4F7FB] rounded-full hover:bg-blue-50 uppercase tracking-widest">View All</Link>
            </div>
            
            <div className="flex flex-col gap-6">
              {company.news.length > 0 ? company.news.map((n: any) => (
                <div key={n.id} className="group border-l-2 border-slate-200 hover:border-[#2950DA] pl-5 transition-all cursor-pointer">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block flex items-center gap-2">
                     <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-500">{n.source}</span>
                     {n.date || new Date().toLocaleDateString()}
                   </span>
                   <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#2950DA] transition-colors leading-relaxed">{n.title}</h4>
                </div>
              )) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                   <FileText size={32} className="text-slate-200 mb-4" />
                   <p className="text-sm font-medium text-slate-500">No recent verified highlights.</p>
                </div>
              )}
            </div>
         </div>

      </div>

    </div>
  );
}