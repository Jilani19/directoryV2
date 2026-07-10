import { CompanyIdentity } from './identity.service';
import { CompanyDetails } from '../../types';

const OPENTARGETS_GRAPHQL = 'https://api.platform.opentargets.org/api/v4/graphql';

export async function getOpenTargets(identity: CompanyIdentity): Promise<NonNullable<CompanyDetails['drugTargets']>> {
  try {
    const searchTerms = Array.from(new Set([identity.name, identity.legalName, ...identity.aliases])).filter(Boolean).slice(0, 3);
    if (searchTerms.length === 0) return [];
    
    const targets: NonNullable<CompanyDetails['drugTargets']> = [];
    
    const fetchPromises = searchTerms.map(term => {
      // Basic GraphQL query to search for the company sponsor and extract targets
      const query = `
        query sponsorSearch {
          search(queryString: "${term}", entityNames: ["target", "disease", "drug"], page: {index: 0, size: 20}) {
            hits {
              id
              name
              description
              entity
            }
          }
        }
      `;
      
      return fetch(OPENTARGETS_GRAPHQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }
      })
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);
    });

    const results = await Promise.allSettled(fetchPromises);
    const uniqueTargets = new Set();
    
    for (const res of results) {
      if (res.status === 'fulfilled' && res.value?.data?.search?.hits) {
        for (const hit of res.value.data.search.hits) {
          if (hit.entity === 'target' && !uniqueTargets.has(hit.id)) {
            uniqueTargets.add(hit.id);
            targets.push({
              targetName: hit.name,
              disease: hit.description?.substring(0, 100) || "Associated Target",
              score: 0.95
            });
          }
        }
      }
    }
    
    return targets;
  } catch (error) {
    console.error(`Error fetching OpenTargets data for ${identity.name}:`, error);
    return [];
  }
}
