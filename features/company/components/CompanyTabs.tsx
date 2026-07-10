"use client";

import React, { useMemo, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Home, Package, FileText, Factory, Shield, File, Newspaper, Users, Activity, BookOpen, ChevronLeft, ChevronRight, Database, TrendingUp, Briefcase, Calendar, Building2, Handshake } from 'lucide-react';
import { CompanyDetails } from '../types';

// Lazy loaded tabs
const OverviewTab = dynamic(() => import('./tabs/OverviewTab').then(mod => mod.OverviewTab), { loading: () => <TabSkeleton /> });
const CorporateTab = dynamic(() => import('./tabs/CorporateTab').then(mod => mod.CorporateTab), { loading: () => <TabSkeleton /> });
const LeadershipTab = dynamic(() => import('./tabs/LeadershipTab').then(mod => mod.LeadershipTab), { loading: () => <TabSkeleton /> });
const FinancialsTab = dynamic(() => import('./tabs/FinancialsTab').then(mod => mod.FinancialsTab), { loading: () => <TabSkeleton /> });
const ProductsTab = dynamic(() => import('./tabs/ProductsTab').then(mod => mod.ProductsTab), { loading: () => <TabSkeleton /> });
const ClinicalTrialsTab = dynamic(() => import('./tabs/ClinicalTrialsTab').then(mod => mod.ClinicalTrialsTab), { loading: () => <TabSkeleton /> });
const RegulatoryTab = dynamic(() => import('./tabs/RegulatoryTab').then(mod => mod.RegulatoryTab), { loading: () => <TabSkeleton /> });
const PublicationsTab = dynamic(() => import('./tabs/PublicationsTab').then(mod => mod.PublicationsTab), { loading: () => <TabSkeleton /> });
const PatentsTab = dynamic(() => import('./tabs/PatentsTab').then(mod => mod.PatentsTab), { loading: () => <TabSkeleton /> });
const PartnershipsTab = dynamic(() => import('./tabs/PartnershipsTab').then(mod => mod.PartnershipsTab), { loading: () => <TabSkeleton /> });
const NewsTab = dynamic(() => import('./tabs/NewsTab').then(mod => mod.NewsTab), { loading: () => <TabSkeleton /> });
const CareersTab = dynamic(() => import('./tabs/CareersTab').then(mod => mod.CareersTab), { loading: () => <TabSkeleton /> });
const ContactsTab = dynamic(() => import('./tabs/ContactsTab').then(mod => mod.ContactsTab), { loading: () => <TabSkeleton /> });
const DocumentsTab = dynamic(() => import('./tabs/DocumentsTab').then(mod => mod.DocumentsTab), { loading: () => <TabSkeleton /> });

function TabSkeleton() {
  return (
    <div className="w-full h-[600px] bg-white rounded-3xl shadow-sm border border-slate-200/60 animate-pulse p-8">
      <div className="w-48 h-8 bg-slate-200 rounded-lg mb-8"></div>
      <div className="w-full h-32 bg-slate-100 rounded-xl mb-4"></div>
      <div className="w-3/4 h-32 bg-slate-100 rounded-xl"></div>
    </div>
  );
}

interface CompanyTabsProps {
  company: CompanyDetails;
}

export function CompanyTabs({ company }: CompanyTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentTab = searchParams.get('tab') || 'overview';

  // Dynamically filter tabs to only show those with authoritative public data available
  const tabs = useMemo(() => {
    const allTabs = [
      { id: 'overview', label: 'Overview', icon: Home, Component: OverviewTab, hasData: true },
      { id: 'corporate', label: 'Corporate', icon: Building2, Component: CorporateTab, hasData: true },
      { id: 'leadership', label: 'Leadership', icon: Users, Component: LeadershipTab, hasData: true },
      { id: 'financials', label: 'Financials', icon: TrendingUp, Component: FinancialsTab, hasData: true },
      { id: 'products', label: 'Products', icon: Package, Component: ProductsTab, hasData: true },
      { id: 'clinical', label: 'Clinical', icon: Activity, Component: ClinicalTrialsTab, hasData: true },
      { id: 'regulatory', label: 'Regulatory', icon: Shield, Component: RegulatoryTab, hasData: true },
      { id: 'publications', label: 'Publications', icon: BookOpen, Component: PublicationsTab, hasData: true },
      { id: 'patents', label: 'Patents', icon: FileText, Component: PatentsTab, hasData: true },
      { id: 'partnerships', label: 'Partnerships', icon: Handshake, Component: PartnershipsTab, hasData: true },
      { id: 'news', label: 'News', icon: Newspaper, Component: NewsTab, hasData: true },
      { id: 'careers', label: 'Careers', icon: Briefcase, Component: CareersTab, hasData: true },
      { id: 'contacts', label: 'Contacts', icon: Users, Component: ContactsTab, hasData: true },
      { id: 'documents', label: 'Documents', icon: File, Component: DocumentsTab, hasData: true },
    ];
    // Always show all tabs to keep 14-tab architecture strict, 
    // empty states will be handled gracefully within the tabs.
    return allTabs;
  }, []);

  // Handle scroll arrows visibility
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [mounted]);

  // Handle auto-scroll to active tab
  useEffect(() => {
    if (!mounted || !scrollContainerRef.current) return;
    const activeElement = scrollContainerRef.current.querySelector('[data-active="true"]');
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [mounted, currentTab]);

  const handleTabClick = (tabId: string) => {
    const tabsElement = document.getElementById('company-tabs-nav');
    if (tabsElement) {
      const yOffset = -80;
      const y = tabsElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const scrollBy = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const activeTabConfig = tabs.find(t => t.id === currentTab) || tabs[0];
  const ActiveComponent = activeTabConfig?.Component;

  if (!mounted || !ActiveComponent) return null;

  return (
    <div className="w-full relative z-30 flex flex-col items-center pb-20">
      
      {/* Sticky Tab Navigation Container */}
      <div id="company-tabs-nav" className="sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-xl pb-4 pt-2 -mt-6 md:-mt-8 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 border-b border-transparent transition-all">
        
        <div className="relative group bg-white/80 rounded-[20px] shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-white">
          
          {/* Scroll Buttons */}
          {showLeftScroll && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent z-10 flex items-center justify-start pl-2 rounded-l-[20px] pointer-events-none">
              <button 
                onClick={() => scrollBy(-200)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-md text-slate-700 hover:text-blue-600 hover:border-blue-300 pointer-events-auto transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} strokeWidth={3} />
              </button>
            </div>
          )}

          {showRightScroll && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/90 to-transparent z-10 flex items-center justify-end pr-2 rounded-r-[20px] pointer-events-none">
              <button 
                onClick={() => scrollBy(200)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-md text-slate-700 hover:text-blue-600 hover:border-blue-300 pointer-events-auto transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} strokeWidth={3} />
              </button>
            </div>
          )}

          {/* Scrollable Tabs */}
          <div 
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory p-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-active={isActive}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-[14px] font-bold text-sm whitespace-nowrap transition-all flex-none min-w-fit snap-center focus:outline-none relative ${
                    isActive 
                      ? "text-slate-900" 
                      : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-white rounded-[14px] shadow-sm border border-slate-200 -z-10 animate-in fade-in zoom-in-95 duration-200"></div>
                  )}
                  <Icon size={18} className={`${isActive ? "text-blue-600" : "text-slate-400"} transition-colors`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>
      
      {/* Active Tab Content Rendered Exclusively */}
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 min-h-[500px] animate-in fade-in duration-500 fill-mode-both slide-in-from-bottom-4">
        <ActiveComponent company={company} onTabChange={handleTabClick} />
      </div>

    </div>
  );
}
