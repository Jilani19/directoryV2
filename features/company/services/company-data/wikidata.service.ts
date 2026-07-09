/**
 * Wikidata Collection Service
 * Fetches structured data (Employees, Revenue, CEO, Headquarters, Founded, etc.) via SPARQL.
 */

const WIKIDATA_SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';

export interface WikidataInfo {
  founded?: string;
  ceo?: string;
  headquarters?: string;
  employees?: string;
  revenue?: string;
  website?: string;
  stockExchange?: string;
  ticker?: string;
  isin?: string;
}

export async function getCompanyFromWikidata(companyName: string): Promise<WikidataInfo | null> {
  // A basic SPARQL query to search for a company by English label and extract common properties
  const sparqlQuery = `
    SELECT ?founded ?ceoLabel ?hqLabel ?employees ?revenue ?website ?exchangeLabel ?ticker ?isin WHERE {
      ?company rdfs:label "${companyName}"@en.
      ?company wdt:P31/wdt:P279* wd:Q4830453. # instance of business/enterprise
      
      OPTIONAL { ?company wdt:P571 ?founded. }
      OPTIONAL { ?company wdt:P169 ?ceo. }
      OPTIONAL { ?company wdt:P159 ?hq. }
      OPTIONAL { ?company wdt:P1128 ?employees. }
      OPTIONAL { ?company wdt:P2139 ?revenue. }
      OPTIONAL { ?company wdt:P856 ?website. }
      OPTIONAL { ?company wdt:P414 ?exchange. }
      OPTIONAL { ?company wdt:P249 ?ticker. }
      OPTIONAL { ?company wdt:P946 ?isin. }
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 1
  `;

  try {
    const url = `${WIKIDATA_SPARQL_ENDPOINT}?query=${encodeURIComponent(sparqlQuery)}&format=json`;
    
    // We send a custom User-Agent as required by Wikidata policy
    const res = await fetch(url, { 
      headers: { 'Accept': 'application/json', 'User-Agent': 'cGxPDirectoryBot/1.0 (contact@cgxp.directory)' },
      next: { revalidate: 86400 } // 24 hr cache
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    const results = data.results?.bindings;
    
    if (!results || results.length === 0) return null;
    
    const binding = results[0];
    
    return {
      founded: binding.founded?.value ? new Date(binding.founded.value).getFullYear().toString() : undefined,
      ceo: binding.ceoLabel?.value,
      headquarters: binding.hqLabel?.value,
      employees: binding.employees?.value,
      revenue: binding.revenue?.value,
      website: binding.website?.value,
      stockExchange: binding.exchangeLabel?.value,
      ticker: binding.ticker?.value,
      isin: binding.isin?.value
    };
  } catch (error) {
    console.error(`Error fetching Wikidata for ${companyName}:`, error);
    return null;
  }
}
