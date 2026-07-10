import { CompanyIdentity } from './identity.service';

export interface OpenCorporatesData {
  jurisdiction_code?: string;
  incorporation_date?: string;
  company_type?: string;
  registry_url?: string;
  branch_status?: string;
  inactive?: boolean;
}

const OPENCORPORATES_API_URL = 'https://api.opencorporates.com/v0.4/companies/search';

export async function getOpenCorporatesData(identity: CompanyIdentity): Promise<OpenCorporatesData | null> {
  if (!identity.legalName && !identity.name) return null;

  const searchQuery = identity.legalName || identity.name;

  try {
    const res = await fetch(`${OPENCORPORATES_API_URL}?q=${encodeURIComponent(searchQuery)}&per_page=1`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'cGxPDirectory contact@cgxp.directory'
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 429) {
        console.warn('OpenCorporates API rate limit or key required.');
      }
      return null;
    }

    const data = await res.json();
    
    if (data && data.results && data.results.companies && data.results.companies.length > 0) {
      const company = data.results.companies[0].company;
      return {
        jurisdiction_code: company.jurisdiction_code,
        incorporation_date: company.incorporation_date,
        company_type: company.company_type,
        registry_url: company.registry_url,
        branch_status: company.branch_status,
        inactive: company.inactive
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching OpenCorporates data for ${searchQuery}:`, error);
    return null;
  }
}
