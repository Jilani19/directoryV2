import { BarChart3, Building2, FileText, Factory, Briefcase, Link as LinkIcon, LineChart, Newspaper, Stethoscope, Users, Package, Target, Flag } from 'lucide-react';

/**
 * Build the sidebar navigation links dynamically based on the available data.
 *
 * @param params.company - The full company record (may include related fields).
 * @param params.kpiCounts - Pre‑computed counts for various sections (e.g., products, facilities).
 * @param params.companySlug - URL slug for the company.
 * @returns An array of link definitions used by SidebarNavigation.
 */
export function buildSidebarLinks({
  company,
  kpiCounts,
  companySlug,
}: {
  company: any;
  kpiCounts: any;
  companySlug: string;
}) {
  // Helper to create badge only when count is > 0
  const badgeIf = (count: any) => (count && count > 0 ? count : null);

  const links = [
    { name: 'Overview', href: `/directory/${companySlug}/overview`, icon: BarChart3, badge: null, show: true },
    { name: 'Corporate Info', href: `/directory/${companySlug}/corporate`, icon: Building2, badge: null, show: true },
    { name: 'Leadership', href: `/directory/${companySlug}/leadership`, icon: Users, badge: null, show: true },
    { name: 'Financials', href: `/directory/${companySlug}/financials`, icon: LineChart, badge: null, show: !!company?.marketCap || !!company?.revenue },
    { name: 'Products', href: `/directory/${companySlug}/products`, icon: Package, badge: badgeIf(kpiCounts?.products), show: !!badgeIf(kpiCounts?.products) },
    { name: 'Clinical Trials', href: `/directory/${companySlug}/clinical`, icon: Stethoscope, badge: badgeIf(kpiCounts?.clinicalTrials), show: !!badgeIf(kpiCounts?.clinicalTrials) },
    { name: 'Regulatory', href: `/directory/${companySlug}/regulatory`, icon: FileText, badge: badgeIf(kpiCounts?.patents), show: !!badgeIf(kpiCounts?.patents) },
    { name: 'Research', href: `/directory/${companySlug}/research`, icon: FileText, badge: null, show: true },
    { name: 'Partnerships', href: `/directory/${companySlug}/partnerships`, icon: LinkIcon, badge: null, show: !!company?.recentPartnerships },
    { name: 'Facilities', href: `/directory/${companySlug}/facilities`, icon: Factory, badge: badgeIf(kpiCounts?.facilities), show: !!badgeIf(kpiCounts?.facilities) },
    { name: 'News', href: `/directory/${companySlug}/news`, icon: Newspaper, badge: badgeIf(kpiCounts?.news), show: !!badgeIf(kpiCounts?.news) },
    { name: 'Careers', href: `/directory/${companySlug}/careers`, icon: Briefcase, badge: badgeIf(kpiCounts?.jobs), show: !!badgeIf(kpiCounts?.jobs) },
    { name: 'Documents', href: `/directory/${companySlug}/documents`, icon: FileText, badge: badgeIf(kpiCounts?.documents), show: !!badgeIf(kpiCounts?.documents) },
    { name: 'Contacts', href: `/directory/${companySlug}/contacts`, icon: Target, badge: null, show: true },
    { name: 'Competitors', href: `/directory/${companySlug}/competitors`, icon: Users, badge: null, show: true },
    { name: 'Related', href: `/directory/${companySlug}/related-companies`, icon: LinkIcon, badge: null, show: true },
  ];

  // Filter out any entries explicitly marked not to show (though most already respect that).
  return links.filter((link) => link.show !== false);
}
