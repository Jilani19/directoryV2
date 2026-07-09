"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Users, Calendar, Banknote, Briefcase, BarChart3, Fingerprint, Building, Globe, Mail, Phone, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { CompanyDetails } from '../types';
import { CompanyHeroActions } from './CompanyHeroActions';

// Import local assets
import heroBg from '@/assets/images/company/hero/pharma-bg.png';
import pfizerLogo from '@/assets/images/logos/pfizer.png';

interface CompanyHeroProps {
  company: CompanyDetails;
}

export function CompanyHero({ company }: CompanyHeroProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  // Use local pfizer logo if it's pfizer, else fallback to company.logoUrl (assuming we only have pfizer mock logo right now, but will make it dynamic later)
  // For now, if id includes pfizer, use pfizerLogo
  const isPfizer = company.id.toLowerCase().includes('pfizer');
  const displayLogo = isPfizer ? pfizerLogo : company.logoUrl;

  const coreBusiness = company.coreBusiness || [];
  const visibleTagsCount = 3;
  const hasMoreTags = coreBusiness.length > visibleTagsCount;
  const visibleTags = showAllTags ? coreBusiness : coreBusiness.slice(0, visibleTagsCount);
  return (
    <div className="relative w-full bg-[#0F172A] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent z-10" />
        <Image
          src={heroBg}
          alt="Pharmaceutical Background"
          fill
          className="object-cover object-center opacity-40 mix-blend-luminosity"
          priority
          placeholder="blur"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        
        {/* Left Side: Company Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-start lg:items-center">
          {/* Logo Box */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-3xl p-4 shadow-xl flex items-center justify-center relative overflow-hidden">
              {displayLogo ? (
                <Image 
                  src={displayLogo} 
                  alt={company.name}
                  fill
                  className="object-contain p-3"
                  priority
                />
              ) : (
                <span className="text-4xl font-bold text-slate-300">{company.initials}</span>
              )}
            </div>
            {/* Profile Completion Indicator */}
            {company.profileCompletion && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${company.profileCompletion}%` }}></div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">{company.profileCompletion}% Profile Score</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {company.verified && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                  <ShieldCheck size={14} />
                  Verified Company
                </div>
              )}
              {company.rating && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  {company.rating} Rating
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {company.name}
              </h1>
              {company.verified && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0" title="Verified Profile">
                  <ShieldCheck size={14} className="text-white" />
                </div>
              )}
            </div>
            
            {company.tagline && (
              <p className="text-lg font-medium text-slate-300">
                {company.tagline}
              </p>
            )}

            {/* Quick Contact Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-primary-300 mt-1">
              {company.contactInfo?.website && (
                <a href={`https://${company.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Globe size={16} />
                  {company.contactInfo.website}
                </a>
              )}
              {company.socialLinks?.linkedin && (
                <a href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              )}
              {company.contactInfo?.email && (
                <a href={`mailto:${company.contactInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail size={16} />
                  {company.contactInfo.email}
                </a>
              )}
              {company.contactInfo?.phone && (
                <a href={`tel:${company.contactInfo.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Phone size={16} />
                  {company.contactInfo.phone}
                </a>
              )}
            </div>

            {/* Extended Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 text-sm font-medium text-slate-300 mt-2">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-slate-500" />
                <span className="text-slate-400">HQ:</span>
                <span className="text-white">{company.headquarters || `${company.city}, ${company.country}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-slate-500" />
                <span className="text-slate-400">Employees:</span>
                <span className="text-white">{company.employees}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-500" />
                <span className="text-slate-400">Founded:</span>
                <span className="text-white">{company.foundedYear || company.founded}</span>
              </div>
              {company.revenue && (
                <div className="flex items-center gap-2">
                  <Banknote size={16} className="text-slate-500" />
                  <span className="text-slate-400">Revenue:</span>
                  <span className="text-white">{company.revenue}</span>
                </div>
              )}
              {company.companyType && (
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-500" />
                  <span className="text-slate-400">Type:</span>
                  <span className="text-white">{company.companyType}</span>
                </div>
              )}
              {company.stockExchange && company.tickerSymbol && (
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-slate-500" />
                  <span className="text-slate-400">Stock:</span>
                  <span className="text-white">{company.stockExchange}: {company.tickerSymbol}</span>
                </div>
              )}
              {company.isin && (
                <div className="flex items-center gap-2">
                  <Fingerprint size={16} className="text-slate-500" />
                  <span className="text-slate-400">ISIN:</span>
                  <span className="text-white">{company.isin}</span>
                </div>
              )}
              {company.ownership && (
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-slate-500" />
                  <span className="text-slate-400">Ownership:</span>
                  <span className="text-white">{company.ownership}</span>
                </div>
              )}
            </div>

            {/* Industry / Category Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-4 relative">
              <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary-200 border border-primary/30 text-xs font-bold">
                {company.category || company.industry}
              </span>
              
              {/* Animated Interactive Tags Container */}
              <div className="flex flex-wrap items-center gap-2 transition-all duration-300 ease-in-out overflow-hidden">
                {visibleTags.map((biz, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-slate-200 border border-white/10 text-xs font-semibold cursor-default"
                  >
                    {biz}
                  </span>
                ))}
              </div>

              {/* Expand/Collapse Button */}
              {hasMoreTags && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 transition-colors text-xs font-bold"
                >
                  {showAllTags ? (
                    <>
                      Show Less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      +{coreBusiness.length - visibleTagsCount} More <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: CTA Buttons */}
        <CompanyHeroActions company={company} />
      </div>
    </div>
  );
}
