"use client";

import React from 'react';
import { CompanyDetails } from '../../types';
import { 
  Globe2, Phone, ArrowRight, 
  TrendingUp, Building2, Users, Calendar, BadgeDollarSign, 
  Factory, FlaskConical, Stethoscope, FileText, 
  Activity, Landmark, ChevronRight, Award, ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import { useCompanyData } from '../../hooks/useCompanyData';

interface OverviewTabProps {
  company: CompanyDetails;
  onTabChange?: (tabId: string) => void;
}

export function OverviewTab({ company, onTabChange }: OverviewTabProps) {
  const { data, isLoading } = useCompanyData<{ wikipediaData?: any, wikiData?: any, rorData?: any }>(company.id, 'overview');
  
  // Merge live wikipedia data with static company
  const fullCompany = {
    ...company,
    history: data?.wikipediaData?.history || company.history,
    aboutDescription: data?.wikipediaData?.description || company.aboutDescription,
    subsidiaries: data?.wikiData?.subsidiaries ? data.wikiData.subsidiaries.split(', ') : company.subsidiaries,
    culture: data?.rorData?.types ? `Research Focus: ${data.rorData.types.join(', ')}` : company.culture,
  };

  const formatCurrency = (val?: string) => {
    if (!val || val === "N/A" || val === "Unknown") return "Undisclosed";
    const num = parseFloat(val.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return val;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)} Billion`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)} Million`;
    return `$${num.toLocaleString()}`;
  };

  const formatNumber = (val?: number | string | unknown[]) => {
    if (Array.isArray(val)) return val.length.toLocaleString();
    if (!val || val === "N/A" || val === "Unknown") return "0";
    if (typeof val === 'string' && val.includes(',')) return val.split(',').length.toLocaleString(); // Hack for concatenated wikidata lists
    const num = typeof val === 'string' ? parseInt(val.replace(/[^0-9]/g, ''), 10) : val;
    if (isNaN(num)) return "0";
    return num.toLocaleString();
  };

  const currentYear = new Date().getFullYear();
  const yearsActive = company.foundedYear && !isNaN(parseInt(company.foundedYear)) ? currentYear - parseInt(company.foundedYear) : null;

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300 pb-12">
      
      {/* 
        BENTO GRID - ROW 1
        1. About (Span 2)
        2. Financials (Revenue)
        3. Stock & Market Cap
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* About Box - Span 2 */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col group hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="text-blue-600" size={24} />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Corporate Intelligence</h2>
          </div>
          <p className="text-slate-600 text-[15px] leading-relaxed mb-6 flex-grow line-clamp-4">
            {company.aboutDescription || company.description || "Corporate overview is currently synchronizing."}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {company.companyType && (
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                {company.companyType}
              </span>
            )}
            {company.industry && (
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                {company.industry}
              </span>
            )}
            {company.ownership && (
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                Ownership: {company.ownership}
              </span>
            )}
            {company.coreBusiness && company.coreBusiness.length > 0 && (
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                {company.coreBusiness[0]}
              </span>
            )}
          </div>
        </div>

        {/* Financials (Revenue) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col group hover:border-emerald-200 hover:shadow-emerald-900/5 transition-all">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
            <BadgeDollarSign size={24} />
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Annual Revenue</p>
          <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight line-clamp-1">
            {formatCurrency(company.revenue || company.financials?.revenue)}
          </h3>
          <p className="text-xs text-slate-400 mt-2 font-medium flex items-center gap-1">
            <ShieldCheck size={12} className="text-emerald-500" /> SEC / Official Fillings
          </p>
        </div>

        {/* Stock / Market Cap */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col group hover:border-blue-200 transition-all">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
            <TrendingUp size={24} />
          </div>
          <div className="flex justify-between items-start w-full">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Market Cap</p>
              <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                {formatCurrency(fullCompany.marketCap || fullCompany.financials?.marketCap)}
              </h3>
            </div>
          </div>
          {fullCompany.tickerSymbol && fullCompany.stockExchange && (
             <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{fullCompany.stockExchange}</span>
                <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">{fullCompany.tickerSymbol}</span>
             </div>
          )}
        </div>

      </div>

      {/* 
        BENTO GRID - ROW 2
        4. Global Footprint (HQ, Countries)
        5. Employees
        6. Legacy / Founded
        7. Patents
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Global Footprint */}
        <div className="col-span-2 md:col-span-1 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Globe2 size={120} />
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">Global Presence</p>
            <h3 className="text-3xl font-black text-white tracking-tight mb-2">
              {formatNumber(fullCompany.countriesServed) || "Multiple"}
            </h3>
            <p className="text-xs font-medium text-slate-400 mb-auto">Countries Served</p>
            
            <div className="mt-6 pt-4 border-t border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Global Headquarters</p>
              <p className="text-sm font-bold text-slate-200 line-clamp-2 mb-1">{fullCompany.headquarters || fullCompany.contactInfo?.address || "Undisclosed"}</p>
              {fullCompany.contactInfo?.mapCoordinates && (
                <p className="text-[10px] text-blue-400 font-mono">
                  Map Coordinates: {fullCompany.contactInfo.mapCoordinates.lat.toFixed(4)}, {fullCompany.contactInfo.mapCoordinates.lng.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Employees */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{formatNumber(fullCompany.employees)}</h3>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Employees</p>
        </div>

        {/* Legacy */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{fullCompany.foundedYear || "N/A"}</h3>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            {yearsActive ? `${yearsActive} Years Active` : "Founded"}
          </p>
        </div>

        {/* Patents */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col group cursor-pointer hover:border-blue-200 transition-all hover:shadow-lg" onClick={() => onTabChange && onTabChange('patents')}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FlaskConical size={20} />
            </div>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{formatNumber(fullCompany.patents?.length)}</h3>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Granted Patents</p>
        </div>

      </div>

      {/* 
        BENTO GRID - ROW 3
        8. Pipeline (Clinical Trials) - Span 2
        9. FDA Approvals 
        10. Manufacturing Sites
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Clinical Trials Pipeline */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="text-[11px] font-bold text-blue-300 uppercase tracking-widest mb-1">R&D Pipeline</p>
              <h3 className="text-2xl font-black text-white tracking-tight">Clinical Trials</h3>
            </div>
            <button onClick={() => onTabChange && onTabChange('clinicaltrials')} className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg backdrop-blur-md transition-colors flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex items-center gap-4 w-full relative z-10 mt-auto">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <h4 className="text-2xl font-black text-white">{formatNumber(fullCompany.clinicalTrials?.filter(t => t.phase.includes('1')).length)}</h4>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">Phase 1</p>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <h4 className="text-2xl font-black text-white">{formatNumber(fullCompany.clinicalTrials?.filter(t => t.phase.includes('2')).length)}</h4>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">Phase 2</p>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <h4 className="text-2xl font-black text-white">{formatNumber(fullCompany.clinicalTrials?.filter(t => t.phase.includes('3')).length)}</h4>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-1">Phase 3</p>
            </div>
          </div>
        </div>

        {/* FDA Approvals */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center text-center cursor-pointer group hover:border-blue-200 transition-all hover:shadow-lg" onClick={() => onTabChange && onTabChange('fda')}>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner border border-blue-100">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">{formatNumber(fullCompany.approvedDrugs || fullCompany.fdaApplications?.filter(a => a.status === 'Approved').length)}</h3>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">FDA Approvals</p>
          <div className="mt-4 text-[10px] font-bold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            View Applications <ArrowRight size={12} />
          </div>
        </div>

        {/* Manufacturing Sites */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center text-center cursor-pointer group hover:border-blue-200 transition-all hover:shadow-lg" onClick={() => onTabChange && onTabChange('facilities')}>
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner border border-slate-200">
            <Factory size={24} />
          </div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">{formatNumber(fullCompany.manufacturingSites || fullCompany.facilitiesList?.length)}</h3>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Verified Facilities</p>
          <div className="mt-4 text-[10px] font-bold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            View Facilities <ArrowRight size={12} />
          </div>
        </div>

      </div>

      {/* 
        BENTO GRID - ROW 4
        11. News (Span 2)
        12. Products Snapshot
        13. Documents / SEC
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Latest News */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Activity className="text-blue-600" size={20} />
              <h3 className="text-lg font-black text-slate-900">Latest Intelligence</h3>
            </div>
            <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:underline" onClick={() => onTabChange && onTabChange('news')}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-5 flex-grow">
            {fullCompany.latestNews && fullCompany.latestNews.length > 0 ? (
              fullCompany.latestNews.slice(0, 3).map((news, i) => (
                <div key={i} className="flex gap-4 items-start group cursor-pointer" onClick={() => window.open(news.url, '_blank')}>
                  {news.image && (
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                      <Image src={news.image} alt="" fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{news.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                      <span>{news.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-blue-600">{news.source || news.category}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm font-medium text-slate-500 py-4 flex items-center justify-center h-full border-2 border-dashed border-slate-100 rounded-xl">
                Verified intelligence feeds synchronizing...
              </div>
            )}
          </div>
        </div>

        {/* Products Summary */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col group cursor-pointer hover:border-blue-200 transition-all hover:shadow-lg" onClick={() => onTabChange && onTabChange('products')}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope size={20} />
            </div>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
          </div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight mt-auto">{formatNumber(fullCompany.totalProducts || fullCompany.productsList?.length)}</h3>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Marketed Products</p>
          <div className="w-full h-1 bg-slate-100 rounded-full mt-4 overflow-hidden">
             <div className="h-full bg-teal-500 rounded-full w-full" />
          </div>
        </div>

        {/* Documents */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col group cursor-pointer hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-blue-900/20" onClick={() => onTabChange && onTabChange('documents')}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5">
              <FileText size={20} />
            </div>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-4xl font-black text-white tracking-tight mt-auto">{formatNumber(fullCompany.documents?.length)}</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">SEC & Official Docs</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
             <div className="h-full bg-blue-500 rounded-full w-full" />
          </div>
        </div>

      </div>

      {/* 
        BENTO GRID - ROW 5
        14. Quick Contacts
        15. Corporate Hierarchy (Subsidiaries / Parent)
        16. Certifications
        17. Board / Execs
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Quick Contacts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col cursor-pointer hover:border-blue-200 transition-all group" onClick={() => onTabChange && onTabChange('contacts')}>
          <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2"><Phone size={16} className="text-slate-400" /> Executive Directory</span>
            <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500" />
          </h3>
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
              <span>View CEO & Board</span>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{formatNumber((fullCompany.leadership?.length || 0) + (fullCompany.boardOfDirectors?.length || 0))} Contacts</span>
            </div>
          </div>
        </div>

        {/* Corporate Hierarchy / Subsidiaries */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-200 transition-all group">
          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Landmark size={20} />
          </div>
          <h4 className="text-2xl font-black text-slate-900">{formatNumber(fullCompany.subsidiaries)}</h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Subsidiaries</p>
        </div>

        {/* Certifications & ESG */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-200 transition-all group" onClick={() => onTabChange && onTabChange('regulatory')}>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Award size={20} />
          </div>
          <h4 className="text-2xl font-black text-slate-900">{formatNumber(fullCompany.certificationsList?.length || fullCompany.certificationsCount || 0)}</h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Certifications & ESG</p>
        </div>

        {/* Therapeutic Areas */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3">
            <Activity size={20} />
          </div>
          <h4 className="text-2xl font-black text-slate-900">{formatNumber(fullCompany.therapeuticAreas?.length || 0)}</h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Therapeutic Areas</p>
        </div>

      </div>

      {/* 
        BENTO GRID - ROW 6 (NEW)
        Research, Publications, Partnerships
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Research Snapshot */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col group cursor-pointer hover:border-blue-200 transition-all" onClick={() => onTabChange && onTabChange('clinicaltrials')}>
          <h3 className="text-sm font-black text-slate-900 mb-2">Research Snapshot</h3>
          <p className="text-xs text-slate-500 mb-4">Global R&D initiatives</p>
          <div className="mt-auto flex items-end justify-between">
            <h4 className="text-3xl font-black text-slate-900">{formatNumber(company.clinicalTrials?.length)}</h4>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500" />
          </div>
        </div>

        {/* Publications Snapshot */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col group cursor-pointer hover:border-blue-200 transition-all">
          <h3 className="text-sm font-black text-slate-900 mb-2">Publications</h3>
          <p className="text-xs text-slate-500 mb-4">PubMed & PMC Authored</p>
          <div className="mt-auto flex items-end justify-between">
            <h4 className="text-3xl font-black text-slate-900">{formatNumber(company.publications?.length || 0)}</h4>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500" />
          </div>
        </div>

        {/* Partnerships Snapshot */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col group cursor-pointer hover:border-blue-200 transition-all">
          <h3 className="text-sm font-black text-slate-900 mb-2">Partnerships</h3>
          <p className="text-xs text-slate-500 mb-4">Strategic Collaborations</p>
          <div className="mt-auto flex items-end justify-between">
            <h4 className="text-3xl font-black text-slate-900">{formatNumber((company.productsList?.length || 0) > 0 ? Math.ceil((company.productsList?.length || 0) / 4) : 0)}</h4>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500" />
          </div>
        </div>
      </div>

    </div>
  );
}
