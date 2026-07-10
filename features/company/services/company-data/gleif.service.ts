import { CompanyIdentity } from './identity.service';

const GLEIF_BASE_URL = 'https://api.gleif.org/api/v1';

export interface GleifEntity {
  id: string;
  legalName: string;
  headquartersAddress?: string;
  headquartersCity?: string;
  headquartersCountry?: string;
  legalAddress?: string;
  legalCity?: string;
  legalCountry?: string;
  entityStatus?: string;
  entityCategory?: string;
  jurisdiction?: string;
}

export async function getEntityFromGleif(identity: CompanyIdentity): Promise<GleifEntity | null> {
  const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean);

  for (const term of searchTerms) {
    try {
      // GLEIF requires exact or fuzzy matching, we try to use the fuzzy text query
      const url = `${GLEIF_BASE_URL}/fuzzycompletions?field=entity.legalName&q=${encodeURIComponent(term)}`;
    const res = await fetch(url, {
      headers: { 'Accept': 'application/vnd.api+json' },
      next: { revalidate: 86400 } // 24 hour cache
    });

    if (!res.ok) {
      return null;
    }

      const data = await res.json();
      if (!data.data || data.data.length === 0) {
        continue;
      }

    // Take the first match
    const entityRecord = data.data[0];
    const attributes = entityRecord.attributes;
    const entity = attributes.entity;

    return {
      id: entityRecord.id,
      legalName: entity?.legalName?.name,
      headquartersAddress: entity?.headquartersAddress?.addressLines?.[0],
      headquartersCity: entity?.headquartersAddress?.city,
      headquartersCountry: entity?.headquartersAddress?.country,
      legalAddress: entity?.legalAddress?.addressLines?.[0],
      legalCity: entity?.legalAddress?.city,
      legalCountry: entity?.legalAddress?.country,
      entityStatus: entity?.status,
      entityCategory: entity?.category,
      jurisdiction: entity?.jurisdiction
    };
    } catch (error) {
      console.error(`Error fetching GLEIF data for ${term}:`, error);
    }
  }
  return null;
}
