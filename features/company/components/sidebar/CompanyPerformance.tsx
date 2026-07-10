"use client";

import React, { useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function CompanyPerformance({ performance }: { performance: CompanyDetails['performance'] }) {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'profit'>('revenue');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const performanceArray = Array.isArray(performance) ? performance : (performance ? [performance] : []);
  
  // Default to the first item if none is selected or selected is invalid
  const currentPerformance = performanceArray.find(p => p.period === selectedPeriod) || performanceArray[0];

  if (!currentPerformance) {
    return null;
  }

  // Standard UI Bars Chart logic
  const chartData = currentPerformance.chartData || [];
  const maxData = Math.max(...chartData.map(d => d.value), 1); // Avoid division by zero
  
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm animate-in fade-in duration-500 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900">Company Performance</h3>
        {performanceArray.length > 1 && (
          <div className="relative">
            <select 
              value={currentPerformance.period}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              {performanceArray.map((p, i) => (
                <option key={i} value={p.period}>{p.period}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Metrics Selector */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div 
          className={`flex flex-col gap-2 cursor-pointer p-4 rounded-2xl transition-all border ${activeMetric === 'revenue' ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/20' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
          onClick={() => setActiveMetric('revenue')}
        >
          <div className="flex items-center gap-2 text-slate-500">
            <DollarSign size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Revenue</span>
          </div>
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-2xl font-black text-slate-900">{currentPerformance.revenueValue}</span>
            <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border ${
              currentPerformance.revenueGrowth.includes('-') 
                ? 'text-rose-600 bg-rose-50 border-rose-100' 
                : 'text-emerald-600 bg-emerald-50 border-emerald-100'
            }`}>
              {currentPerformance.revenueGrowth.includes('-') ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
              {currentPerformance.revenueGrowth.replace('-', '')}
            </span>
          </div>
        </div>
        
        <div 
          className={`flex flex-col gap-2 cursor-pointer p-4 rounded-2xl transition-all border ${activeMetric === 'profit' ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/20' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
          onClick={() => setActiveMetric('profit')}
        >
          <div className="flex items-center gap-2 text-slate-500">
            <DollarSign size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Net Income</span>
          </div>
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-2xl font-black text-slate-900">{currentPerformance.profitValue}</span>
            <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md border ${
              currentPerformance.profitGrowth.includes('-') 
                ? 'text-rose-600 bg-rose-50 border-rose-100' 
                : 'text-emerald-600 bg-emerald-50 border-emerald-100'
            }`}>
              {currentPerformance.profitGrowth.includes('-') ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
              {currentPerformance.profitGrowth.replace('-', '')}
            </span>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 min-h-[200px] flex flex-col justify-end">
        <div className="flex items-end justify-between h-[160px] gap-2 pb-4 border-b border-slate-100 relative pt-6">
          {chartData.map((data, i) => {
            const heightPercent = `${(data.value / maxData) * 100}%`;
            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full flex justify-center relative h-full items-end">
                  {/* Tooltip */}
                  <div className="absolute -top-8 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none">
                    {data.value.toLocaleString('en-US')}
                  </div>
                  {/* Bar */}
                  <div 
                    className="w-full max-w-[2rem] bg-primary/20 rounded-t-md group-hover:bg-primary transition-colors relative overflow-hidden" 
                    style={{ height: heightPercent }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/40 h-1"></div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPIs */}
      {currentPerformance.kpis && currentPerformance.kpis.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
          {currentPerformance.kpis.map((kpi, idx) => (
            <div key={idx} className="flex flex-col gap-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-800">{kpi.value}</span>
                {kpi.trend !== "neutral" && (
                  <span className={`${kpi.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                    {kpi.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
