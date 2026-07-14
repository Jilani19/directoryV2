import React from 'react';
import { Company } from '@prisma/client';
import { Users, Package, Factory, CircleDollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export default function KPIBar({ company, kpiCounts }: { company: Company, kpiCounts: any }) {
  
  const kpis = [];
  
  if (company.employees) kpis.push({ 
    label: 'Employees', 
    value: company.employees.toLocaleString() + '+',
    icon: Users
  });
  
  if (kpiCounts.products > 0) kpis.push({ 
    label: 'Products', 
    value: kpiCounts.products + '+',
    icon: Package
  });
  
  if (kpiCounts.facilities > 0) kpis.push({ 
    label: 'Manufacturing Sites', 
    value: kpiCounts.facilities,
    icon: Factory
  });
  
  if (company.revenue) kpis.push({ 
    label: `Revenue (${new Date().getFullYear() - 1})`, 
    value: formatCurrency(company.revenue, company.currency || 'USD'),
    icon: CircleDollarSign
  });
  
  if (kpis.length === 0) return null;

  return (
    <div className="w-full bg-[#2950DA] rounded-2xl shadow-lg mt-2 mb-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2950DA] to-[#1f3eaa]"></div>
      <div className="relative px-8 py-5 flex items-center overflow-x-auto no-scrollbar gap-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="flex items-center gap-4 shrink-0 pr-8 border-r border-white/20 last:border-0 last:pr-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-black text-white leading-none mb-1">{kpi.value}</span>
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{kpi.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
