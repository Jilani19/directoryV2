import { CompanyIdentity } from './identity.service';

const DAILYMED_BASE_URL = 'https://dailymed.nlm.nih.gov/dailymed/services/v2';

export interface DailyMedProduct {
  setid: string;
  spl_version: string;
  title: string;
  published_date: string;
}

export async function getDailyMedProducts(identity: CompanyIdentity, limit: number = 500): Promise<DailyMedProduct[]> {
  try {
    const searchTerms = Array.from(new Set([identity.name, identity.legalName, ...identity.aliases, ...identity.subsidiaries]))
      .filter(Boolean);

    if (searchTerms.length === 0) return [];

    const fetchPromises = searchTerms.map(async (term) => {
      const url = `${DAILYMED_BASE_URL}/spls.json?labeler=${encodeURIComponent(term)}&pagesize=${limit > 100 ? 100 : limit}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' }, cache: 'no-store' });
      if (!res.ok) return [];
      const data = await res.json();
      return data.data || [];
    });

    const results = await Promise.allSettled(fetchPromises);
    
    const allProducts: DailyMedProduct[] = [];
    results.forEach(res => {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        allProducts.push(...res.value);
      }
    });

    // Deduplicate by setid
    const uniqueProducts = new Map();
    allProducts.forEach(prod => {
      if (!uniqueProducts.has(prod.setid)) uniqueProducts.set(prod.setid, prod);
    });

    return Array.from(uniqueProducts.values());
  } catch (error) {
    console.error(`Error fetching DailyMed data for ${identity.name}:`, error);
    return [];
  }
}
