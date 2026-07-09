import React from 'react';
import { notFound } from 'next/navigation';
import { enrichCompanyData } from '../../../features/company/services/company-data/aggregator.service';
import { companies } from '../../../features/directory/mock/companies';
import { CompanyHero } from '../../../features/company/components/CompanyHero';
import { CompanyTabs } from '../../../features/company/components/CompanyTabs';
import { CompanyJobs } from '../../../features/company/components/sections/CompanyJobs';
import { RelatedCompanies } from '../../../features/company/components/sections/RelatedCompanies';


import type { Metadata, ResolvingMetadata } from 'next'

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

  const company = await enrichCompanyData(baseCompany);
  
  if (!company) {
    return { title: 'Company Not Found' };
  }

  return {
    title: `${company.name} - Global Life Sciences Directory`,
    description: company.aboutDescription?.substring(0, 160) || `${company.name} profile on the Global Life Sciences Directory.`,
    openGraph: {
      title: `${company.name} | Verified Profile`,
      description: company.aboutDescription?.substring(0, 160),
      images: [company.coverImage || ''],
    },
    twitter: {
      card: 'summary_large_image',
    }
  }
}

export default async function CompanyDetailsPage(props: CompanyPageProps) {
  const params = await props.params;
  const baseCompany = companies.find(c => c.id === params.slug);

  if (!baseCompany) {
    notFound();
  }

  const company = await enrichCompanyData(baseCompany);

  if (!company) {
    notFound();
  }

  // Enhanced JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: company.name,
    description: company.aboutDescription,
    url: company.contactInfo?.website ? `https://${company.contactInfo.website}` : undefined,
    logo: company.logoUrl,
    image: company.coverImage,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressRegion: company.state,
      addressCountry: company.country,
      streetAddress: company.contactInfo?.address,
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: company.employees?.replace(/[^0-9-]/g, '') || undefined
    },
    contactPoint: company.contactInfo ? {
      '@type': 'ContactPoint',
      telephone: company.contactInfo.phone,
      contactType: 'customer service',
      email: company.contactInfo.email,
      availableLanguage: ['English']
    } : undefined,
    sameAs: [
      company.socialLinks?.linkedin,
      company.socialLinks?.twitter,
      company.socialLinks?.facebook,
      company.socialLinks?.youtube
    ].filter(Boolean)
  };

  return (
    <div id="company-profile-content" className="flex flex-col min-h-screen bg-[#F8FAFC] w-full pb-20 print:pb-0 print:bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompanyHero company={company} />
      <CompanyTabs company={company} />
      
      {/* Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 print:hidden space-y-12">
        <CompanyJobs company={company} />
        <RelatedCompanies company={company} />
      </div>
    </div>
  );
}
