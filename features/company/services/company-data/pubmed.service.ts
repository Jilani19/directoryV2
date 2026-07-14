import { CompanyDetails } from "../../types";
import { CompanyIdentity } from "./identity.service";

export async function getCompanyPublications(identity: CompanyIdentity, limit: number = 200): Promise<NonNullable<CompanyDetails['publications']>> {
  try {
    const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean).slice(0, 5);
    if (searchTerms.length === 0) return [];

    const queryParts = searchTerms.map(term => `"${term}"[Affiliation]`);
    const searchQuery = encodeURIComponent(`(${queryParts.join(' OR ')})`);
    
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${searchQuery}&retmax=${limit}&retmode=json`;
    
    const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } });
    if (!searchRes.ok) return [];
    
    const searchData = await searchRes.json();
    const pmids = searchData.esearchresult?.idlist || [];
    
    if (pmids.length === 0) return [];

    const publications = [];
    
    // Fetch summaries in chunks of 50 to avoid URI too long errors
    for (let i = 0; i < pmids.length; i += 50) {
      const chunk = pmids.slice(i, i + 50);
      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${chunk.join(',')}&retmode=json`;
      const summaryRes = await fetch(summaryUrl, { next: { revalidate: 86400 } });
      if (!summaryRes.ok) continue;

      const summaryData = await summaryRes.json();
      const result = summaryData.result || {};

      for (const pmid of chunk) {
        const pub = result[pmid];
        if (!pub) continue;
        
        publications.push({
          pmid,
          title: pub.title,
          journal: pub.fulljournalname,
           
          authors: pub.authors ? pub.authors.map((a: any) => a.name) : [],
          publicationDate: pub.pubdate,
          doi: pub.elocationid && pub.elocationid.includes('doi') ? pub.elocationid.replace('doi: ', '') : undefined,
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
        });
      }
    }

    return publications;
  } catch (error) {
    console.error("PubMed Service Error:", error);
    return [];
  }
}
