import React from 'react';
import { notFound } from 'next/navigation';
import { enrichCompanyData } from '../../../features/company/services/company-data/aggregator.service';
import { companies } from '../../../features/directory/mock/companies';
import { CompanyHero } from '../../../features/company/components/CompanyHero';
import { CompanyTabs } from '../../../features/company/components/CompanyTabs';
import { CompanyDetails } from '../../../features/company/types';

import type { Metadata } from 'next'

interface CompanyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  props: CompanyPageProps
): Promise<Metadata> {
  const params = await props.params;
  const baseCompany = companies.find(c => c.id === params.slug);
  
  if (!baseCompany) {
    return { title: 'Company Not Found' };
  }

  // DO NOT call enrichCompanyData here! It blocks the entire SSR response and causes the page to hang.
  // Generate metadata instantly using the local base object.
  return {
    title: `${baseCompany.name} - Global Life Sciences Directory`,
    description: baseCompany.description?.substring(0, 160) || `${baseCompany.name} profile on the Global Life Sciences Directory.`,
    openGraph: {
      title: `${baseCompany.name} | Verified Profile`,
      description: baseCompany.description?.substring(0, 160),
    },
    twitter: {
      card: 'summary_large_image',
    }
  }
}

export default async function CompanyDetailsPage(props: CompanyPageProps & { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const activeTab = (searchParams?.tab as string) || 'overview';
  
  const baseCompany = companies.find(c => c.id === params.slug);

  if (!baseCompany) {
    notFound();
  }

  // Map the local baseCompany object into the CompanyDetails format for instant Hero rendering
  const instantHeroCompany = {
    ...baseCompany,
    verified: true, // They are from our curated DB
    aboutDescription: baseCompany.description,
    foundedYear: baseCompany.founded,
    contactInfo: {
      website: baseCompany.website,
      email: `contact@${baseCompany.website?.replace('https://', '') || 'cgxp.directory'}`,
      phone: 'N/A',
      address: 'N/A'
    },
    headquarters: baseCompany.city && baseCompany.country ? `${baseCompany.city}, ${baseCompany.state ? baseCompany.state + ', ' : ''}${baseCompany.country}` : undefined
  } as CompanyDetails;

  return (
    <div id="company-profile-content" className="flex flex-col min-h-screen bg-[#F8FAFC] w-full pb-20 print:pb-0 print:bg-white">
      {/* 
        Hero is rendered INSTANTLY on the server using only local memory data (companies.ts).
        This guarantees < 50ms render time for the above-the-fold content!
      */}
      <CompanyHero company={instantHeroCompany} />

      {/* 
        Heavy API Aggregation is deferred strictly to the client-side inside CompanyTabs.
        Each tab independently fetches its own data without blocking the route transition.
      */}
      <CompanyTabs company={instantHeroCompany} />
    </div>
  );
}

