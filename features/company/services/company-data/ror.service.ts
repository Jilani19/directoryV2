import { CompanyIdentity } from './identity.service';

const ROR_API = 'https://api.ror.org/organizations';

export async function getRorAffiliations(identity: CompanyIdentity) {
  try {
    const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean).slice(0, 2);
    if (searchTerms.length === 0) return null;
    
    for (const term of searchTerms) {
      const searchUrl = `${ROR_API}?query.advanced=name:"${encodeURIComponent(term)}"`;
      
      const res = await fetch(searchUrl, { next: { revalidate: 3600 } }).catch(() => null);
      
      if (res && res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const ror = data.items[0];
          return {
            rorId: ror.id,
            types: ror.types,
            aliases: ror.aliases,
            acronyms: ror.acronyms,
            links: ror.links,
            country: ror.country?.country_name
          };
        }
      }
    }
    
    return null;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error(`Error fetching ROR data for ${identity.name}:`, error);
    }
    return null;
  }
}

