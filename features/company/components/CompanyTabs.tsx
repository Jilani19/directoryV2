"use client";

import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Home, Package, FileText, Factory, Shield, File, Newspaper, Users } from 'lucide-react';
import { CompanyDetails } from '../types';

// Lazy loaded tabs
const OverviewTab = dynamic(() => import('./tabs/OverviewTab').then(mod => mod.OverviewTab), {
  loading: () => <TabSkeleton />
});
const ProductsTab = dynamic(() => import('./tabs/ProductsTab').then(mod => mod.ProductsTab), {
  loading: () => <TabSkeleton />
});
const FDAApplicationsTab = dynamic(() => import('./tabs/FDAApplicationsTab').then(mod => mod.FDAApplicationsTab), {
  loading: () => <TabSkeleton />
});
const FacilitiesTab = dynamic(() => import('./tabs/FacilitiesTab').then(mod => mod.FacilitiesTab), {
  loading: () => <TabSkeleton />
});
const RegulatoryTab = dynamic(() => import('./tabs/RegulatoryTab').then(mod => mod.RegulatoryTab), {
  loading: () => <TabSkeleton />
});
const DocumentsTab = dynamic(() => import('./tabs/DocumentsTab').then(mod => mod.DocumentsTab), {
  loading: () => <TabSkeleton />
});
const NewsTab = dynamic(() => import('./tabs/NewsTab').then(mod => mod.NewsTab), {
  loading: () => <TabSkeleton />
});
const ContactsTab = dynamic(() => import('./tabs/ContactsTab').then(mod => mod.ContactsTab), {
  loading: () => <TabSkeleton />
});

function TabSkeleton() {
  return (
    <div className="w-full h-96 bg-white rounded-3xl border border-slate-200 animate-pulse p-8">
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
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentTab = searchParams.get('tab') || 'overview';

  const tabs = useMemo(() => [
    { id: 'overview', label: 'Overview', icon: Home, Component: OverviewTab },
    { id: 'products', label: 'Products & Drugs', icon: Package, Component: ProductsTab },
    { id: 'fda', label: 'FDA Applications', icon: FileText, Component: FDAApplicationsTab },
    { id: 'facilities', label: 'Facilities', icon: Factory, Component: FacilitiesTab },
    { id: 'regulatory', label: 'Regulatory', icon: Shield, Component: RegulatoryTab },
    { id: 'documents', label: 'Documents', icon: File, Component: DocumentsTab },
    { id: 'news', label: 'News & Media', icon: Newspaper, Component: NewsTab },
    { id: 'contacts', label: 'Contacts', icon: Users, Component: ContactsTab },
  ], []);

  const handleTabClick = (tabId: string) => {
    // Scroll near the tabs header smoothly
    const tabsElement = document.getElementById('company-tabs-nav');
    if (tabsElement) {
      const yOffset = -100;
      const y = tabsElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    // Sync to URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const activeTabConfig = tabs.find(t => t.id === currentTab) || tabs[0];
  const ActiveComponent = activeTabConfig.Component;

  if (!mounted) return null;

  return (
    <div className="w-full relative z-30 flex flex-col items-center">
      <div id="company-tabs-nav" className="sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-md pb-4 pt-2 -mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tabs Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex overflow-x-auto hide-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTabClick(tab.id);
                  }
                }}
                tabIndex={0}
                aria-selected={isActive}
                role="tab"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex-1 justify-center min-w-[140px] focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  isActive 
                    ? "bg-primary/10 text-primary shadow-inner ring-1 ring-primary/20" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} className={isActive ? "text-primary" : "text-slate-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Active Tab Content Rendered Exclusively */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 min-h-[500px] animate-in fade-in duration-300">
        <ActiveComponent company={company} onTabChange={handleTabClick} />
      </div>
    </div>
  );
}
