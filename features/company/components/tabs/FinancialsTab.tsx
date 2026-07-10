"use client";

import React from 'react';
import { CompanyDetails } from '../../types';
import { TrendingUp, DollarSign, Users, Briefcase, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { useCompanyData } from '../../hooks/useCompanyData';

interface FinancialsTabProps {
  company: CompanyDetails;
}

export function FinancialsTab({ company }: FinancialsTabProps) {
  const { data, isLoading } = useCompanyData<{ financials?: any }>(company.id, 'financials');

  const financials = data?.financials || company.financials || {};

  const formatValue = (val: unknown) => {
    if (!val || val === "N/A" || val === "Unknown") return null;
    return val as React.ReactNode;
  };

  const metrics = [
    { label: "Annual Revenue Band", value: formatValue(company.revenue), icon: DollarSign },
    { label: "Revenue Growth %", value: formatValue(company.revenueGrowth), icon: TrendingUp },
    { label: "Market Capitalisation", value: formatValue(company.marketCap), icon: Activity },
    { label: "Total Funding Raised", value: formatValue(company.fundingTotal), icon: DollarSign },
    { label: "Funding Stage", value: formatValue(company.fundingStage), icon: Activity },
    { label: "Employee Count Band", value: formatValue(company.employees), icon: Users },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <TrendingUp className="text-blue-600" size={32} />
            Financials & Performance
          </h2>
          <p className="text-slate-500 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            Market capitalization, revenue growth, institutional investors, and IPO tracking aggregated from SEC Edgar and corporate disclosures.
          </p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Icon size={20} />
                </div>
              </div>
              <div>
                {metric.value ? (
                  <h4 className="text-2xl font-black text-slate-900">{metric.value}</h4>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <XCircle size={16} />
                    <span className="text-sm font-medium italic">Pending Verification</span>
                  </div>
                )}
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tables & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investors */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-200/50">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">VC / PE Investors</h3>
          </div>
          <div className="p-6 flex-1">
            {company.vcPeInvestors && company.vcPeInvestors.length > 0 ? (
              <ul className="space-y-3">
                {company.vcPeInvestors.map((investor, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                    <Briefcase size={16} className="text-slate-400" />
                    {investor}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[150px]">
                <Briefcase size={32} className="mb-3 opacity-20" />
                <p className="text-sm font-medium italic">No public institutional investor data found</p>
              </div>
            )}
          </div>
        </div>

        {/* Funding Activity */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-200/50">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Recent Funding Activity</h3>
          </div>
          <div className="p-6 flex-1">
            {company.fundingActivity && company.fundingActivity.length > 0 ? (
              <ul className="space-y-4">
                {company.fundingActivity.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{activity}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[150px]">
                <TrendingUp size={32} className="mb-3 opacity-20" />
                <p className="text-sm font-medium italic">No recent funding rounds publicly disclosed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
