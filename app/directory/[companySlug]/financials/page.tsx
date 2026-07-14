import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { LineChart, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export default async function FinancialsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug }
  });

  if (!company) notFound();

  const c = company.currency === 'USD' ? '$' : '';

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <LineChart size={20} className="text-[#2950DA]" /> Financial Performance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
              <DollarSign size={18} className="text-[#2950DA]" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Market Cap</span>
            <span className="text-2xl font-black text-slate-900">{company.marketCap ? formatCurrency(company.marketCap, company.currency || 'USD') : 'N/A'}</span>
          </div>
          
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
              <TrendingUp size={18} className="text-emerald-500" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Revenue (TTM)</span>
            <span className="text-2xl font-black text-slate-900">{company.revenue ? formatCurrency(company.revenue, company.currency || 'USD') : 'N/A'}</span>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
              <DollarSign size={18} className="text-purple-500" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Funding</span>
            <span className="text-2xl font-black text-slate-900">{company.funding ? formatCurrency(company.funding, company.currency || 'USD') : 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <DollarSign size={20} className="text-[#2950DA]" /> Additional Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Stock Price</span>
            <span className="text-sm font-bold text-slate-800">{company.stockPrice ? `${c}${company.stockPrice}` : 'No verified data available'}</span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Currency</span>
            <span className="text-sm font-bold text-slate-800">{company.currency || 'No verified data available'}</span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Employee Growth</span>
            <span className="text-sm font-bold text-slate-800">{company.employeeGrowth || 'No verified data available'}</span>
          </div>
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Latest SEC Filing</span>
            <span className="text-sm font-bold text-slate-800">{company.latestSecFiling || 'No verified data available'}</span>
          </div>
        </div>
      </div>

    </div>
  );
}