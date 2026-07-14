import { cache } from 'react';
import { resolveCompanyIdentity, CompanyIdentity } from '../identity.service';
import { getCompanyFromWikipedia } from '../wikipedia.service';
import { getCompanyFromWikidata } from '../wikidata.service';
import { getEntityFromGleif } from '../gleif.service';
import { getEntityFromSec } from '../sec.service';
import { getOpenCorporatesData } from '../opencorporates.service';
import { getRorAffiliations } from '../ror.service';

const withTimeout = async <T>(name: string, companyName: string, promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> => {
  const start = Date.now();
  try {
    const result = await Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs))
    ]);
    const timeTaken = Date.now() - start;
    const records = Array.isArray(result) ? result.length : (result && typeof result === 'object' && Object.keys(result).length > 0 ? 1 : 0);
    console.log(`[API_AUDIT] API: ${name} | Company: ${companyName} | Status: SUCCESS | Records: ${records} | Time: ${timeTaken}ms`);
    return result;
  } catch (err: any) {
    const timeTaken = Date.now() - start;
    console.warn(`[API_AUDIT] API: ${name} | Company: ${companyName} | Status: FAILED | Records: 0 | Time: ${timeTaken}ms | Error: ${err.message}`);
    return fallback;
  }
};

export const getGoldenIdentity = cache(async (companyName: string) => {
  return await withTimeout('Identity Resolution', companyName, resolveCompanyIdentity(companyName), 10000, {
    name: companyName, legalName: companyName, aliases: [], subsidiaries: []
  });
});

export const getCorporateData = cache(async (identity: CompanyIdentity) => {
  const name = identity.legalName || identity.name;
  const [wikiData, wikidataData, gleifData, openCorporatesData, rorData, secData] = await Promise.all([
    withTimeout('Wikipedia', name, getCompanyFromWikipedia(name), 15000, null),
    withTimeout('Wikidata', name, getCompanyFromWikidata(name), 15000, null),
    withTimeout('GLEIF', name, getEntityFromGleif(identity), 10000, null),
    withTimeout('OpenCorporates', name, getOpenCorporatesData(identity), 10000, null),
    withTimeout('ROR', name, getRorAffiliations(identity), 10000, null),
    withTimeout('SEC', name, getEntityFromSec(name, identity.ticker), 10000, null)
  ]);

  const openCorp = openCorporatesData as any;
  const gleif = gleifData as any;
  const sec = secData as any;
  const ror = rorData as any;
  const wiki = wikiData as any;
  const wikidata = wikidataData as any;

  return {
    aboutDescription: wiki?.description || null,
    history: wiki?.history || null,
    foundedYear: openCorp?.incorporation_date?.substring(0, 4) 
      || gleif?.incorporationDate?.substring(0, 4) 
      || sec?.incorporationDate?.substring(0, 4) 
      || wikidata?.founded || wiki?.founded || null,
    employees: openCorp?.employees || gleif?.employees || sec?.employees 
      || wiki?.employees || wikidata?.employees || ror?.employees || null,
    revenue: sec?.revenue || openCorp?.revenue || wikidata?.revenue || null,
    ceo: wikidata?.ceo || ror?.ceo || null,
    hqString: openCorp?.registered_address_in_full 
      || (gleif?.headquartersCity ? `${gleif.headquartersCity}, ${gleif.headquartersCountry}` : undefined)
      || (sec?.businessAddress?.city ? `${sec.businessAddress.city}, ${sec.businessAddress.stateOrProvince || ''}` : undefined)
      || wikidata?.headquarters || wiki?.headquarters || null,
    website: identity.website || wikidata?.website || wiki?.website || ror?.links?.[0] || null,
    email: sec?.businessAddress?.email || gleif?.email || wikidata?.email || ror?.email || null,
    phone: sec?.businessAddress?.phone || gleif?.phone || wikidata?.phone || null,
    stockExchange: wikidata?.stockExchange || sec?.exchange || null,
    ticker: identity.ticker || wikidata?.ticker || sec?.ticker || null,
    isin: wikidata?.isin || null,
    lei: identity.lei || gleif?.id || null,
    cik: sec?.cik || null,
    jurisdiction: openCorp?.jurisdiction_code?.toUpperCase() || gleif?.legalJurisdiction || wikidata?.jurisdiction || null,
    incorporationDate: openCorp?.incorporation_date || sec?.incorporationDate || gleif?.incorporationDate || null,
    tradeName: gleif?.tradeName || wikidata?.tradeName || null,
    parentCompany: wikidata?.parentCompany || gleif?.legalName || null,
    subsidiaries: wikidata?.subsidiaries ? wikidata.subsidiaries.split(', ') : [],
    leadership: wikidata?.executives || [],
    boardOfDirectors: wikidata?.boardMembers || []
  };
});
