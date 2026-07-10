import { CompanyIdentity } from './identity.service';
import { CompanyDetails } from '../../types';

const NIH_REPORTER_API = 'https://api.reporter.nih.gov/v2/projects/search';

export async function getCompanyGrants(identity: CompanyIdentity, limit: number = 50): Promise<NonNullable<CompanyDetails['grants']>> {
  try {
    const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean).slice(0, 5);
    if (searchTerms.length === 0) return [];

    const grants: NonNullable<CompanyDetails['grants']> = [];

    const fetchPromises = searchTerms.map(term => {
      const payload = {
        criteria: {
          org_names: [term]
        },
        limit: 50,
        offset: 0,
        sort_field: "award_amount",
        sort_order: "desc"
      };

      return fetch(NIH_REPORTER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        next: { revalidate: 3600 }
      })
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);
    });

    const results = await Promise.allSettled(fetchPromises);
    const uniqueIds = new Set();

    for (const res of results) {
      if (res.status === 'fulfilled' && res.value?.results) {
        for (const proj of res.value.results) {
          if (!proj.core_project_num || uniqueIds.has(proj.core_project_num)) continue;
          uniqueIds.add(proj.core_project_num);

          grants.push({
            id: proj.core_project_num,
            title: proj.project_title || 'Unknown Project',
            amount: proj.award_amount || 0,
            agency: proj.agency_ic_admin?.name || 'NIH',
            year: proj.fiscal_year?.toString() || 'N/A',
            piName: proj.principal_investigators?.[0]?.last_name ? `${proj.principal_investigators[0].first_name} ${proj.principal_investigators[0].last_name}` : undefined
          });
        }
      }
    }

    // Sort by amount descending
    grants.sort((a, b) => b.amount - a.amount);
    return grants.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching NIH Grants for ${identity.name}:`, error);
    return [];
  }
}
