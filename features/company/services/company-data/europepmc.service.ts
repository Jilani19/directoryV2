import { CompanyDetails } from "../../types";
import { CompanyIdentity } from "./identity.service";

/**
 * Europe PMC Service
 * Fetches publications from Europe PubMed Central (Open REST API)
 */
export async function getCompanyEuropePMC(identity: CompanyIdentity, limit: number = 200): Promise<NonNullable<CompanyDetails['publications']>> {
  try {
    const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean).slice(0, 3);
    if (searchTerms.length === 0) return [];

    const queryParts = searchTerms.map(term => `AFF:"${term}"`);
    const searchQuery = encodeURIComponent(`(${queryParts.join(' OR ')})`);
    
    const searchUrl = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${searchQuery}&format=json&resultType=lite&cursorMark=*&pageSize=${limit}`;
    
    // NOTE: No internal AbortController here — the aggregator's withTimeout() already
    // enforces an 8-second deadline. A second internal abort creates a race condition
    // where AbortError escapes the catch block before it can return [].
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
    
    if (!searchRes.ok) return [];
    
    const searchData = await searchRes.json();
    const results = searchData.resultList?.result || [];
    
    const publications = results.map((pub: { pmid?: string; id?: string; title?: string; journalTitle?: string; authorString?: string; firstPublicationDate?: string; pubYear?: string; doi?: string }) => ({
      pmid: pub.pmid || pub.id,
      title: pub.title,
      journal: pub.journalTitle,
      authors: pub.authorString ? pub.authorString.split(', ') : [],
      publicationDate: pub.firstPublicationDate || pub.pubYear,
      doi: pub.doi,
      url: pub.pmid ? `https://europepmc.org/article/MED/${pub.pmid}` : (pub.doi ? `https://doi.org/${pub.doi}` : undefined)
    }));

    return publications;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.warn('Europe PMC request was aborted (timeout)');
    } else {
      console.error("Europe PMC Service Error:", error);
    }
    return [];
  }
}

