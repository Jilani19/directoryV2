/**
 * Wikidata Collection Service
 * Fetches structured data (Employees, Revenue, CEO, Headquarters, Founded, etc.) via SPARQL.
 */

const WIKIDATA_SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';

export function getWikidataValue(result: Record<string, { value: string }> | undefined, key: string): string | undefined {
  return result?.[key]?.value;
}

export interface WikidataExecutive {
  name: string;
  role: string;
  image?: string;
  education?: string;
  appointmentDate?: string;
}

export interface WikidataInfo {
  founded?: string;
  ceo?: string;
  headquarters?: string;
  employees?: string;
  revenue?: string;
  marketCap?: string;
  website?: string;
  stockExchange?: string;
  ticker?: string;
  isin?: string;
  parentCompany?: string;
  subsidiaries?: string;
  executives?: WikidataExecutive[];
  boardMembers?: WikidataExecutive[];
}

export async function getCompanyFromWikidata(companyName: string): Promise<WikidataInfo | null> {
  const sparqlQuery = `
    SELECT ?founded ?ceoLabel ?hqLabel ?employees ?revenue ?marketCap ?website ?exchangeLabel ?ticker ?isin ?parentLabel (GROUP_CONCAT(DISTINCT ?subsidiaryLabel; separator=", ") AS ?subsidiaries) WHERE {
      ?company rdfs:label "${companyName}"@en.
      ?company wdt:P31/wdt:P279* wd:Q4830453. # instance of business/enterprise
      
      OPTIONAL { ?company wdt:P571 ?founded. }
      OPTIONAL { ?company wdt:P169 ?ceo. }
      OPTIONAL { ?company wdt:P159 ?hq. }
      OPTIONAL { ?company wdt:P1128 ?employees. }
      OPTIONAL { ?company wdt:P2139 ?revenue. }
      OPTIONAL { ?company wdt:P2226 ?marketCap. }
      OPTIONAL { ?company wdt:P856 ?website. }
      OPTIONAL { ?company wdt:P414 ?exchange. }
      OPTIONAL { ?company wdt:P249 ?ticker. }
      OPTIONAL { ?company wdt:P946 ?isin. }
      OPTIONAL { ?company wdt:P749 ?parent. }
      OPTIONAL { ?company wdt:P355 ?subsidiary. }
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". 
                               ?ceo rdfs:label ?ceoLabel.
                               ?hq rdfs:label ?hqLabel.
                               ?exchange rdfs:label ?exchangeLabel.
                               ?parent rdfs:label ?parentLabel.
                               ?subsidiary rdfs:label ?subsidiaryLabel. }
    }
    GROUP BY ?founded ?ceoLabel ?hqLabel ?employees ?revenue ?marketCap ?website ?exchangeLabel ?ticker ?isin ?parentLabel
    LIMIT 1
  `;

  // Second query for executives (CEO, Chairperson, Board Members)
  const execQuery = `
    SELECT ?personLabel ?roleLabel ?image ?educationLabel ?startTime WHERE {
      ?company rdfs:label "${companyName}"@en.
      ?company wdt:P31/wdt:P279* wd:Q4830453.
      
      {
        ?company p:P169 ?statement.
        ?statement ps:P169 ?person.
        BIND("Chief Executive Officer" AS ?roleLabel)
      } UNION {
        ?company p:P488 ?statement.
        ?statement ps:P488 ?person.
        BIND("Chairperson" AS ?roleLabel)
      } UNION {
        ?company p:P3320 ?statement.
        ?statement ps:P3320 ?person.
        BIND("Board Member" AS ?roleLabel)
      } UNION {
        ?company p:P1037 ?statement.
        ?statement ps:P1037 ?person.
        BIND("Executive" AS ?roleLabel)
      }
      
      OPTIONAL { ?person wdt:P18 ?image. }
      OPTIONAL { ?person wdt:P69 ?education. }
      OPTIONAL { ?statement pq:P580 ?startTime. }
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 30
  `;

  try {
    const fetchOptions = { 
      headers: { 'Accept': 'application/json', 'User-Agent': 'cGxPDirectoryBot/1.0 (contact@cgxp.directory)' },
      next: { revalidate: 86400 }
    };

    const [mainRes, execRes] = await Promise.all([
      fetch(`${WIKIDATA_SPARQL_ENDPOINT}?query=${encodeURIComponent(sparqlQuery)}&format=json`, fetchOptions),
      fetch(`${WIKIDATA_SPARQL_ENDPOINT}?query=${encodeURIComponent(execQuery)}&format=json`, fetchOptions)
    ]);
    
    if (!mainRes.ok) return null;
    
    const data = await mainRes.json();
    const results = data.results?.bindings;
    if (!results || results.length === 0) return null;
    
    const binding = results[0];

    const execData = execRes.ok ? await execRes.json() : { results: { bindings: [] } };
    const execBindings = execData.results?.bindings || [];

    const executives: WikidataExecutive[] = [];
    const boardMembers: WikidataExecutive[] = [];

    execBindings.forEach((eb: Record<string, { value: string }>) => {
      const name = eb.personLabel?.value;
      const role = eb.roleLabel?.value;
      const image = eb.image?.value;
      const education = eb.educationLabel?.value;
      const appointmentDate = eb.startTime?.value ? eb.startTime.value.substring(0, 10) : undefined;

      if (!name || name.startsWith('http') || /^Q\d+$/.test(name)) return;

      const person = { name, role, image, education, appointmentDate };
      if (role === 'Board Member') {
        const existing = boardMembers.find(b => b.name === name);
        if (!existing) boardMembers.push(person);
        else if (education && !existing.education) existing.education = education;
      } else {
        const existing = executives.find(e => e.name === name);
        if (!existing) executives.push(person);
        else if (education && !existing.education) existing.education = education;
      }
    });
    
    return {
      founded: binding.founded?.value ? new Date(binding.founded.value).getFullYear().toString() : undefined,
      ceo: binding.ceoLabel?.value,
      headquarters: binding.hqLabel?.value,
      employees: binding.employees?.value,
      revenue: binding.revenue?.value,
      marketCap: binding.marketCap?.value,
      website: binding.website?.value,
      stockExchange: binding.exchangeLabel?.value,
      ticker: binding.ticker?.value,
      isin: binding.isin?.value,
      parentCompany: binding.parentLabel?.value,
      subsidiaries: binding.subsidiaries?.value,
      executives,
      boardMembers
    };
  } catch (error) {
    console.error(`Error fetching Wikidata for ${companyName}:`, error);
    return null;
  }
}

