import React from 'react';
import { CompanyDetails } from '../../types'
import { StatsGrid } from '../sections/StatsGrid';
import { AboutCompany } from '../sections/AboutCompany';
import { TherapeuticAreas } from '../sections/TherapeuticAreas';
import { FDAPreview } from '../sections/FDAPreview';
import { ProductsPreview } from '../sections/ProductsPreview';
import { CertificationsPreview } from '../sections/CertificationsPreview';
import { NewsPreview } from '../sections/NewsPreview';
import { ContactInfo } from '../sidebar/ContactInfo';
import { CompanyPerformance } from '../sidebar/CompanyPerformance';
import { GlobalPresence } from '../sidebar/GlobalPresence';
import { KeyHighlights } from '../sidebar/KeyHighlights';

interface OverviewTabProps {
  company: CompanyDetails;
  onTabChange?: (tabId: string) => void;
}

export function OverviewTab({ company, onTabChange }: OverviewTabProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full min-w-0">
      {/* Main Content Area (Left) */}
      <div className="flex flex-col gap-12 flex-1 w-full min-w-0">
        <StatsGrid company={company} onTabChange={onTabChange} />
        <AboutCompany company={company} />
        <TherapeuticAreas company={company} onTabChange={onTabChange} />
        <FDAPreview company={company} onTabChange={onTabChange} />
        <ProductsPreview company={company} onTabChange={onTabChange} />
        <CertificationsPreview company={company} onTabChange={onTabChange} />
        <NewsPreview company={company} onTabChange={onTabChange} />
      </div>

      {/* Sidebar (Right) */}
      <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-8">
        <div className="sticky top-24 flex flex-col gap-8 max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar pb-8">
          <ContactInfo company={company} />
          <CompanyPerformance performance={company.performance} />
          <GlobalPresence company={company} onTabChange={onTabChange} />
          <KeyHighlights highlights={company.keyHighlights} />
        </div>
      </div>
    </div>
  );
}
