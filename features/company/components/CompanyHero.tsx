"use client";

import React from 'react';
import Image from 'next/image';
import { CompanyDetails } from '../types';
import { 
  ShieldCheck, MapPin, Globe, Building2, Users, Calendar, 
  BadgeDollarSign, Award, Activity, FileText, 
  Factory, FlaskConical, ExternalLink, Download,
  LayoutGrid, ChevronRight, PlayCircle
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  company: CompanyDetails;
}

export function CompanyHero({ company }: Props) {
  // Use unique cover image fetched from Wikipedia/Wikidata or fallback to a dynamic generated one
  const bgImage = company.coverImage || `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop`;

  // Calculations for dynamic floating card
  const foundedYear = parseInt(company.foundedYear || "0");
  const yearsActive = foundedYear ? new Date().getFullYear() - foundedYear : null;
  const floatingCardTop = yearsActive 
    ? { value: `${yearsActive}+`, label: "Years of Scientific Excellence", icon: <Award className="text-purple-400" size={24} /> } 
    : (company.countriesServed 
        ? { value: `${company.countriesServed}+`, label: "Countries Served", icon: <Globe className="text-purple-400" size={24} /> } 
        : { value: "Top Tier", label: "Global Healthcare Leader", icon: <Award className="text-purple-400" size={24} /> });

  // Metrics Strip Data
  const metrics = [
    { icon: <Calendar size={18} className="text-blue-500" />, label: "Founded", value: company.foundedYear || "N/A" },
    { icon: <Users size={18} className="text-blue-500" />, label: "Employees", value: company.employees ? `${company.employees.toLocaleString()}+` : "N/A" },
    { icon: <BadgeDollarSign size={18} className="text-emerald-500" />, label: "Revenue (2023)", value: company.revenue || company.financials?.revenue || "N/A" },
    { icon: <Factory size={18} className="text-slate-400" />, label: "R&D Centers", value: company.manufacturingSites || "N/A" },
    { icon: <Globe size={18} className="text-purple-500" />, label: "Countries", value: company.countriesServed ? `${company.countriesServed}+` : "N/A" },
    { icon: <FlaskConical size={18} className="text-rose-500" />, label: "Patents Worldwide", value: company.patents?.length ? `${company.patents.length.toLocaleString()}+` : "N/A" },
  ].filter(m => m.value !== "N/A").slice(0, 6);

  return (
    <div className="relative w-full bg-[#f8fafc] font-sans">
       {/* Hero container */}
       <div className="relative w-full min-h-[650px] flex overflow-hidden rounded-bl-3xl lg:rounded-bl-[60px] rounded-br-3xl lg:rounded-br-[60px] bg-[#060b14]">
          
          {/* Right side Image */}
          <div className="absolute inset-0 w-full h-full lg:w-[65%] lg:left-auto lg:right-0">
            {bgImage ? (
              <Image
                src={bgImage}
                alt={`${company.name} headquarters`}
                fill
                priority
                className="object-cover object-center"
                quality={100}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-slate-900/80" />
            )}
            {/* Gradient overlay for small screens to make text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/80 to-transparent lg:hidden" />
          </div>

          {/* SVG Curve Divider for Desktop */}
          <div className="hidden lg:block absolute top-0 left-[55%] h-full w-[250px] text-[#060b14] z-10 drop-shadow-[15px_0_15px_rgba(0,0,0,0.6)]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-current">
              <path d="M0,0 L100,0 C100,0 20,50 100,100 L0,100 Z" />
            </svg>
          </div>

          {/* Left side Dark Background for Desktop */}
          <div className="hidden lg:block absolute top-0 left-0 h-full w-[55%] bg-[#060b14] z-10" />

          {/* Content wrapper */}
          <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-start pt-8 pb-32">
             
             {/* Top Header Row (Breadcrumb & Watch Video) */}
             <div className="w-full flex justify-between items-center mb-10">
               <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                 <LayoutGrid size={16} />
                 <ChevronRight size={14} className="opacity-50" />
                 <span>Companies</span>
                 <ChevronRight size={14} className="opacity-50" />
                 <span className="text-blue-400">{company.name}</span>
               </div>
               
               <button className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors backdrop-blur-md">
                 <PlayCircle size={18} /> Watch Video
               </button>
             </div>

             {/* Left Content Area */}
             <div className="w-full lg:w-[50%] flex flex-col gap-6 text-white pt-2">
                {/* Badge */}
                {company.verified && (
                  <div className="inline-flex items-center gap-2 bg-[#064e3b]/40 border border-[#059669]/30 text-[#34d399] px-3.5 py-1.5 rounded-full w-fit">
                    <ShieldCheck size={16} />
                    <span className="text-[13px] font-semibold tracking-wide">Verified Company</span>
                  </div>
                )}

                {/* Company Logo */}
                {company.logoUrl && (
                  <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg border border-white/10 mb-2 mt-2">
                    <Image 
                      src={company.logoUrl} 
                      alt={`${company.name} logo`} 
                      width={64} 
                      height={64} 
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Company Name */}
                <h1 className="text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mt-2">
                  {company.name}<span className="text-blue-500">.</span>
                </h1>

                {/* Tagline */}
                {company.tagline && (
                  <h2 className="text-xl lg:text-2xl font-medium text-slate-200 mt-2 tracking-wide">
                    {company.tagline}
                  </h2>
                )}

                {/* Summary */}
                <p className="text-slate-400 text-base leading-relaxed line-clamp-3 mt-2 pr-4">
                  {company.aboutDescription || company.description}
                </p>

                {/* Comprehensive Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] font-medium text-slate-300 mt-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit">
                  {company.headquarters && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      <span title="Headquarters">{company.headquarters}</span>
                    </div>
                  )}
                  {company.contactInfo?.website && (
                    <Link href={`https://${company.contactInfo.website.replace('https://', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                      <Globe size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                      <span title="Official Website">{company.contactInfo.website.replace('https://', '')}</span>
                    </Link>
                  )}
                  {company.industry && (
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-slate-400" />
                      <span title="Industry">{company.industry}</span>
                    </div>
                  )}
                  {company.stockExchange && company.tickerSymbol && (
                    <div className="flex items-center gap-2">
                      <Activity size={16} className="text-slate-400" />
                      <span title="Stock Exchange & Ticker">{company.stockExchange}: {company.tickerSymbol}</span>
                    </div>
                  )}
                  {company.isin && (
                    <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                      <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">ISIN</span>
                      <span className="font-mono">{company.isin}</span>
                    </div>
                  )}
                  {company.financials?.marketCap && (
                    <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                      <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">Mkt Cap</span>
                      <span>{company.financials.marketCap}</span>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  {company.contactInfo?.website && (
                    <Link 
                      href={`https://${company.contactInfo.website.replace('https://', '')}`}
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#4338ca] hover:bg-[#3730a3] text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all shadow-[0_10px_30px_rgba(67,56,202,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(67,56,202,0.4)]"
                    >
                      Visit Website <ExternalLink size={16} />
                    </Link>
                  )}
                  <button className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/20 text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5">
                    Follow Company
                  </button>
                </div>

                {/* Mission Card */}
                {company.mission && (
                  <div className="mt-8 bg-[#0a1224] rounded-2xl p-5 flex items-start gap-4 border border-white/5 w-full max-w-[550px]">
                    <div className="w-12 h-12 rounded-xl bg-[#1e1b4b] flex items-center justify-center shrink-0 border border-indigo-500/20">
                      <Award size={24} className="text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-white mb-1">Our Mission</h4>
                      <p className="text-[13px] text-slate-400 leading-relaxed">{company.mission}</p>
                    </div>
                  </div>
                )}
             </div>

             {/* Right Floating Card */}
             <div className="hidden lg:flex absolute bottom-[100px] right-12 xl:right-16 bg-[#0f172a]/70 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[260px] items-center gap-4 group cursor-default z-20">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0 border border-indigo-500/30">
                  {floatingCardTop.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white leading-tight">{floatingCardTop.value}</h4>
                  <p className="text-[12px] font-medium text-slate-300 mt-1">{floatingCardTop.label}</p>
                </div>
             </div>
          </div>
       </div>

       {/* Floating White Metrics Strip - Specifically overlapping the bottom of the hero */}
       <div className="relative z-30 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 -mt-[50px] mb-16">
          <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-6 md:p-8 flex items-center justify-between gap-6 overflow-x-auto hide-scrollbar border border-slate-100">
            {metrics.map((m, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col min-w-[120px] group cursor-default shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center">
                      {m.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">{m.value}</span>
                      <span className="text-[11px] font-semibold text-slate-500 tracking-wide mt-0.5">{m.label}</span>
                    </div>
                  </div>
                </div>
                {idx < metrics.length - 1 && (
                  <div className="w-px h-12 bg-slate-200 shrink-0 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
       </div>

    </div>
  );
}
