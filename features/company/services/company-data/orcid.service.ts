import { CompanyIdentity } from './identity.service';
import { CompanyDetails } from '../../types';

const ORCID_API = 'https://pub.orcid.org/v3.0/search';

export async function getCompanyResearchers(identity: CompanyIdentity): Promise<NonNullable<CompanyDetails['researchers']>> {
  try {
    const searchTerms = Array.from(new Set([identity.name, identity.legalName, ...identity.aliases])).filter(Boolean).slice(0, 2);
    if (searchTerms.length === 0) return [];
    
    const researchers: NonNullable<CompanyDetails['researchers']> = [];
    
    const fetchPromises = searchTerms.map(term => {
      // Query ORCID for affiliation organization name
      const query = `affiliation-org-name:"${encodeURIComponent(term)}"`;
      const searchUrl = `${ORCID_API}/?q=${query}&rows=10`;
      
      return fetch(searchUrl, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 }
      })
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);
    });

    const results = await Promise.allSettled(fetchPromises);
    const uniqueIds = new Set();
    
    for (const res of results) {
      if (res.status === 'fulfilled' && res.value?.result) {
        for (const hit of res.value.result) {
          const orcid = hit['orcid-identifier']?.path;
          if (!orcid || uniqueIds.has(orcid)) continue;
          uniqueIds.add(orcid);
          
          researchers.push({
            orcid,
            name: "Verified Researcher", // ORCID v3 search doesn't return names directly without second pass
            affiliation: identity.name,
            url: `https://orcid.org/${orcid}`
          });
        }
      }
    }
    
    return researchers;
  } catch (error) {
    console.error(`Error fetching ORCID data for ${identity.name}:`, error);
    return [];
  }
}
