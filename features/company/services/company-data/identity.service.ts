import { getEntityFromGleif } from './gleif.service';

const WIKIDATA_API_URL = 'https://www.wikidata.org/w/api.php';
const WIKIDATA_SPARQL_URL = 'https://query.wikidata.org/sparql';

export interface CompanyIdentity {
  name: string;
  legalName: string;
  aliases: string[];
  subsidiaries: string[];
  website?: string;
  ticker?: string;
  wikidataId?: string;
  lei?: string; // Add Legal Entity Identifier
}

export async function resolveCompanyIdentity(companyName: string): Promise<CompanyIdentity> {
  const identity: CompanyIdentity = {
    name: companyName,
    legalName: companyName,
    aliases: [companyName],
    subsidiaries: []
  };

  try {
    // 0. Query GLEIF for Global Entity Identity and Legal Name validation
    const gleifEntity = await getEntityFromGleif(identity);
    if (gleifEntity) {
      identity.lei = gleifEntity.id;
      if (gleifEntity.legalName) {
        identity.legalName = gleifEntity.legalName;
        identity.aliases.push(gleifEntity.legalName);
      }
    }

    // 1. Search Wikidata API for the entity ID
    const searchUrl = `${WIKIDATA_API_URL}?action=wbsearchentities&search=${encodeURIComponent(companyName)}&language=en&format=json`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } });
    const searchData = await searchRes.json();
    
    if (searchData.search && searchData.search.length > 0) {
      const wikidataId = searchData.search[0].id;
      identity.wikidataId = wikidataId;

      // 2. Fetch full entity details using SPARQL to get aliases, legal name, ticker, and subsidiaries
      const sparqlQuery = `
        SELECT ?legalName ?ticker ?website
        (GROUP_CONCAT(DISTINCT ?alias; SEPARATOR="|") AS ?aliases)
        (GROUP_CONCAT(DISTINCT ?subsidiaryName; SEPARATOR="|") AS ?subsidiaries)
        WHERE {
          BIND(wd:${wikidataId} AS ?company)
          
          OPTIONAL { ?company wdt:P1448 ?legalName. }
          OPTIONAL { ?company wdt:P414 ?exchange. ?company wdt:P249 ?ticker. }
          OPTIONAL { ?company wdt:P856 ?website. }
          OPTIONAL { ?company skos:altLabel ?alias. FILTER(LANG(?alias) = "en") }
          OPTIONAL { ?company wdt:P355 ?subsidiary. ?subsidiary rdfs:label ?subsidiaryName. FILTER(LANG(?subsidiaryName) = "en") }
        }
        GROUP BY ?legalName ?ticker ?website
        LIMIT 1
      `;

      const sparqlRes = await fetch(`${WIKIDATA_SPARQL_URL}?query=${encodeURIComponent(sparqlQuery)}`, {
        headers: {
          'Accept': 'application/sparql-results+json',
          'User-Agent': 'cGxPDirectory contact@cgxp.directory'
        },
        next: { revalidate: 86400 }
      });

      if (sparqlRes.ok) {
        const sparqlData = await sparqlRes.json();
        const bindings = sparqlData.results.bindings[0];

        if (bindings) {
          if (bindings.legalName) identity.legalName = bindings.legalName.value;
          if (bindings.ticker) identity.ticker = bindings.ticker.value;
          if (bindings.website) identity.website = bindings.website.value;
          
          if (bindings.aliases && bindings.aliases.value) {
            const fetchedAliases = bindings.aliases.value.split('|').filter(Boolean);
            identity.aliases = Array.from(new Set([...identity.aliases, ...fetchedAliases, identity.legalName]));
          }
          
          if (bindings.subsidiaries && bindings.subsidiaries.value) {
            identity.subsidiaries = bindings.subsidiaries.value.split('|').filter(Boolean);
          }
        }
      }
    }
    
    // Custom manual overrides for major pharmaceutical aliases
    const customAliases: Record<string, string[]> = {
      'Johnson & Johnson': ['J&J', 'JNJ', 'Janssen', 'Johnson and Johnson'],
      'Merck': ['MSD', 'Merck Sharp & Dohme', 'Merck & Co.', 'Merck Group'],
      'GlaxoSmithKline': ['GSK'],
      'Bristol Myers Squibb': ['BMS', 'Bristol-Myers Squibb'],
      'Novo Nordisk': ['Novo'],
      'AstraZeneca': ['AZN'],
      'Sanofi': ['Sanofi-Aventis', 'Sanofi Pasteur'],
      'Novartis': ['Sandoz', 'Alcon (formerly)'],
      'Takeda': ['Takeda Pharmaceutical', 'Shire'],
      'AbbVie': ['Allergan'],
      'Roche': ['Hoffmann-La Roche', 'Genentech'],
      'IQVIA': ['Quintiles', 'IMS Health', 'QuintilesIMS', 'Q2 Solutions', 'Q² Solutions'],
      'Thermo Fisher': ['Thermo Fisher Scientific', 'Life Technologies', 'Patheon', 'PPD', 'Thermo Electron', 'Fisher Scientific'],
      'Lonza': ['Lonza Group', 'Capsugel'],
      'Catalent': ['Catalent Pharma Solutions', 'Paragon Bioservices'],
      'Aurobindo': ['Aurobindo Pharma'],
      'Sun Pharma': ['Sun Pharmaceutical Industries', 'Ranbaxy'],
      'Dr. Reddy\'s': ['Dr. Reddys', 'Dr. Reddy\'s Laboratories', 'DRL'],
      'Cipla': ['Cipla Ltd'],
      'Pfizer': ['Wyeth', 'Upjohn', 'Hospira', 'Warner-Lambert', 'Pharmacia'],
      'Amgen': ['Immunex', 'Onyx Pharmaceuticals', 'Horizon Therapeutics']
    };

    // If companyName matches a custom override, add those aliases
    for (const [key, variants] of Object.entries(customAliases)) {
      if (companyName.toLowerCase().includes(key.toLowerCase()) || variants.some(v => companyName.toLowerCase() === v.toLowerCase())) {
        identity.aliases = [...identity.aliases, key, ...variants];
      }
    }

    // Add common generic variations
    const genericTerms = [' Inc.', ' Corp.', ' Pharmaceuticals', ' Pharma', ' Laboratories', ' Labs', ' LLC', ' Ltd.', ' PLC', ' Group', ' Incorporated', ' Limited', ' Company', ' Co.'];
    const baseAliases = [...identity.aliases];
    
    baseAliases.forEach(alias => {
      genericTerms.forEach(term => {
        if (alias.endsWith(term)) {
          const stripped = alias.replace(term, '').trim();
          if (!identity.aliases.includes(stripped)) identity.aliases.push(stripped);
        } else {
          const added = `${alias}${term}`;
          if (!identity.aliases.includes(added)) identity.aliases.push(added);
        }
      });
      // Handle "and" vs "&"
      if (alias.includes(' & ')) identity.aliases.push(alias.replace(' & ', ' and '));
      if (alias.includes(' and ')) identity.aliases.push(alias.replace(' and ', ' & '));
    });
    
    identity.aliases = Array.from(new Set(identity.aliases)).filter(a => a.length > 2);
    
    return identity;
  } catch (error) {
    console.error(`Error resolving identity for ${companyName}:`, error);
    return identity;
  }
}
