import { cache } from 'react';
import { CompanyIdentity } from '../identity.service';
import { getCompanyPublications } from '../pubmed.service';
import { getCompanyEuropePMC } from '../europepmc.service';
import { getCompanyOpenAlex } from '../openalex.service';
import { getCrossrefPublications } from '../crossref.service';
import { getCompanyPatents } from '../patents.service';
import { getCompanyGrants } from '../nih.service';

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> => {
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs))
    ]);
  } catch (err) {
    return fallback;
  }
};

export const getResearchData = cache(async (identity: CompanyIdentity) => {
  const [pubmedData, europepmcData, openalexData, crossrefData, patents, grants] = await Promise.all([
    withTimeout(getCompanyPublications(identity, 100), 10000, []),
    withTimeout(getCompanyEuropePMC(identity, 100), 10000, []),
    withTimeout(getCompanyOpenAlex(identity, 100), 10000, []),
    withTimeout(getCrossrefPublications(identity, 50), 10000, []),
    withTimeout(getCompanyPatents(identity, 200), 10000, []),
    withTimeout(getCompanyGrants(identity, 50), 10000, [])
  ]);

  const allPubs = [...pubmedData, ...europepmcData, ...openalexData, ...crossrefData];
  const uniquePubs = new Map();
  allPubs.forEach(pub => {
    if (pub.pmid && !uniquePubs.has(`pmid-${pub.pmid}`)) uniquePubs.set(`pmid-${pub.pmid}`, pub);
    else if (pub.doi && !uniquePubs.has(`doi-${pub.doi}`)) uniquePubs.set(`doi-${pub.doi}`, pub);
    else if (pub.title && !uniquePubs.has(`title-${pub.title.toLowerCase()}`)) uniquePubs.set(`title-${pub.title.toLowerCase()}`, pub);
  });

  return {
    publications: Array.from(uniquePubs.values()),
    patents,
    grants
  };
});
