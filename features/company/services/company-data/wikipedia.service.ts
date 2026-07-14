/**
 * Wikipedia Data Collection Service
 * Fetches company overview, history, and basic stats via Wikipedia REST API.
 */

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/w/api.php';

export interface WikipediaData {
  description: string;
  history?: string;
  founded?: string;
  headquarters?: string;
  website?: string;
  founders?: string[];
  employees?: string;
}

/**
 * Searches for a company on Wikipedia and attempts to extract an overview and infobox data.
 */
export async function getCompanyFromWikipedia(companyName: string): Promise<WikipediaData | null> {
  try {
    // 1. Search for the exact page title
    const searchUrl = `${WIKIPEDIA_API_BASE}?action=query&list=search&srsearch=${encodeURIComponent(companyName)}&utf8=&format=json&origin=*`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } }); // Cache for 24 hours
    
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    
    if (!searchData.query?.search?.length) return null;
    
    // Get the most relevant page title
    const pageTitle = searchData.query.search[0].title;
    
    // 2. Fetch the page extract (intro)
    const extractUrl = `${WIKIPEDIA_API_BASE}?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(pageTitle)}&format=json&origin=*`;
    const extractRes = await fetch(extractUrl, { next: { revalidate: 86400 } });
    const extractData = await extractRes.json();
    
    const pages = extractData.query?.pages;
    if (!pages) return null;
    
    const pageId = Object.keys(pages)[0];
    const extract = pages[pageId]?.extract;
    
    if (!extract) return null;

    // VALIDATION: Ensure this is actually a company and matches our search
    const cleanCompanyName = companyName.toLowerCase().replace(/(inc\.|corp\.|ltd\.|plc|llc|group|company|pharma|pharmaceuticals)/gi, '').trim();
    const cleanPageTitle = pageTitle.toLowerCase().replace(/(inc\.|corp\.|ltd\.|plc|llc|group|company|pharma|pharmaceuticals)/gi, '').trim();
    const firstPara = extract.split('\n')[0].toLowerCase();
    
    // If titles are totally different, check for corporate keywords in the first paragraph
    const corporateKeywords = ['company', 'corporation', 'manufacturer', 'subsidiary', 'firm', 'enterprise', 'business', 'pharmaceutical', 'biotechnology'];
    const hasCorporateKeyword = corporateKeywords.some(kw => firstPara.includes(kw));
    
    if (!cleanPageTitle.includes(cleanCompanyName) && !cleanCompanyName.includes(cleanPageTitle)) {
      if (!hasCorporateKeyword) {
        console.warn(`Wikipedia result for ${companyName} rejected. Title: ${pageTitle}. No corporate keywords found.`);
        return null;
      }
    }
    
    if (!hasCorporateKeyword && !firstPara.includes(cleanCompanyName)) {
      console.warn(`Wikipedia result for ${companyName} rejected. Not recognized as a company.`);
      return null;
    }

    // TODO: In a full implementation, we would also query the infobox via the 'prop=revisions' or Wikidata
    // for exact structured data like founded year, employees, etc. 
    // Since Wikidata is another service we are building, we will delegate structured fields to Wikidata 
    // and use Wikipedia primarily for the descriptive text and history.

    return {
      description: extract.split('\n')[0], // Return the first paragraph as description
      history: extract.substring(extract.indexOf('\n') + 1) || undefined // Return the rest as history
    };

  } catch (error) {
    console.error(`Error fetching Wikipedia data for ${companyName}:`, error);
    return null;
  }
}
