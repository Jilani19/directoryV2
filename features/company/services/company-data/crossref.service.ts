import { CompanyIdentity } from './identity.service';
import { CompanyDetails } from '../../types';

const CROSSREF_API = 'https://api.crossref.org/works';

export async function getCrossrefPublications(identity: CompanyIdentity, limit: number = 20): Promise<NonNullable<CompanyDetails['publications']>> {
  try {
    const searchTerms = Array.from(new Set([identity.name, identity.legalName, ...identity.aliases])).filter(Boolean).slice(0, 3);
    if (searchTerms.length === 0) return [];
    
    const publications: NonNullable<CompanyDetails['publications']> = [];
    
    const fetchPromises = searchTerms.map(term => {
      // Query CrossRef for works affiliated with the company
      const searchUrl = `${CROSSREF_API}?query.affiliation=${encodeURIComponent(term)}&select=DOI,title,author,published,container-title,abstract&rows=${limit}`;
      
      return fetch(searchUrl, { next: { revalidate: 3600 } })
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);
    });

    const results = await Promise.allSettled(fetchPromises);
    const uniqueDois = new Set();
    
    for (const res of results) {
      if (res.status === 'fulfilled' && res.value?.message?.items) {
        for (const item of res.value.message.items) {
          const doi = item.DOI;
          if (!doi || uniqueDois.has(doi)) continue;
          uniqueDois.add(doi);
          
          let pubDate = 'Unknown';
          if (item.published && item.published['date-parts']) {
            pubDate = item.published['date-parts'][0].join('-');
          }
          
          publications.push({
            pmid: '',
            title: item.title?.[0] || 'Untitled Work',
            journal: item['container-title']?.[0] || 'Unknown Publication',
            authors: item.author ? item.author.map((a: { given?: string; family?: string }) => `${a.given || ''} ${a.family || ''}`.trim()) : [],
            publicationDate: pubDate,
            doi: doi,
            abstract: item.abstract,
            url: `https://doi.org/${doi}`
          });
        }
      }
    }
    
    return publications.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching CrossRef data for ${identity.name}:`, error);
    return [];
  }
}
