import { CompanyDetails } from "../../types";
import { CompanyIdentity } from "./identity.service";

/**
 * OpenAlex Service
 * Fetches publication metadata from OpenAlex API
 */
export async function getCompanyOpenAlex(identity: CompanyIdentity, limit: number = 200): Promise<NonNullable<CompanyDetails['publications']>> {
  try {
    const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean).slice(0, 3);
    if (searchTerms.length === 0) return [];

    // First search for the institution ID
    let institutionId = null;
    for (const term of searchTerms) {
      const instSearchUrl = `https://api.openalex.org/institutions?search=${encodeURIComponent(term)}`;
      const instRes = await fetch(instSearchUrl, { next: { revalidate: 3600 } }).catch(() => null);
      if (instRes && instRes.ok) {
        const instData = await instRes.json();
        if (instData.results && instData.results.length > 0) {
          institutionId = instData.results[0].id; // e.g. "https://openalex.org/I123456"
          break;
        }
      }
    }

    if (!institutionId) return [];

    const instIdRaw = institutionId.split('/').pop();

    const searchUrl = `https://api.openalex.org/works?filter=institutions.id:${instIdRaw}&per-page=${limit > 100 ? 100 : limit}`;

    // NOTE: No internal AbortController — the aggregator's withTimeout() already enforces deadline.
    // Using a second abort signal creates a race condition causing AbortError to escape the catch.
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } }).catch(() => null);

    if (!searchRes || !searchRes.ok) return [];

    const searchData = await searchRes.json();
    const results = searchData.results || [];

    const publications = results.map((pub: { ids?: { pmid?: string; doi?: string }; title?: string; primary_location?: { source?: { display_name?: string } }; authorships?: { author?: { display_name?: string } }[]; publication_date?: string; id?: string }) => ({
      pmid: pub.ids?.pmid ? pub.ids.pmid.replace('https://pubmed.ncbi.nlm.nih.gov/', '') : undefined,
      title: pub.title,
      journal: pub.primary_location?.source?.display_name,
      authors: pub.authorships ? pub.authorships.map((a: { author?: { display_name?: string } }) => a.author?.display_name) : [],
      publicationDate: pub.publication_date,
      doi: pub.ids?.doi ? pub.ids.doi.replace('https://doi.org/', '') : undefined,
      url: pub.ids?.doi || pub.id
    }));

    return publications;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.warn('OpenAlex request was aborted (timeout)');
    } else {
      console.error("OpenAlex Service Error:", error);
    }
    return [];
  }
}

