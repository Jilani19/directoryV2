/**
 * Data Aggregator Service
 * Orchestrates fetching from multiple sources (Wikipedia, Wikidata, OpenFDA, ClinicalTrials, Patents, PubMed)
 * and maps the results to the rigorously typed CompanyDetails interface.
 */

import { CompanyDetails } from '../../types';
import { getCompanyFromWikipedia } from './wikipedia.service';
import { getCompanyFromWikidata } from './wikidata.service';
import { getFdaApplications, FdaApplication } from './openfda.service';
import { getCompanyNews } from './news.service';
import { Company } from '../../../directory/mock/companies';
import { getDailyMedProducts } from './dailymed.service';
import { getEntityFromSec } from './sec.service';
import { getEntityFromGleif } from './gleif.service';
import { getClinicalTrials } from './clinicaltrials.service';
import { getCompanyPublications } from './pubmed.service';
import { getCompanyEuropePMC } from './europepmc.service';
import { getCompanyOpenAlex } from './openalex.service';
import { getCompanyPatents } from './patents.service';
import { resolveCompanyIdentity } from './identity.service';
import { getCoordinates } from './nominatim.service';
import { getCompanyGrants } from './nih.service';
import { getOpenTargets } from './opentargets.service';
import { getCompanyResearchers } from './orcid.service';
import { getCrossrefPublications } from './crossref.service';
import { getCompanyDrugTargets } from './chembl.service';
import { enhanceProductsWithRxNorm } from './rxnorm.service';
import { getRorAffiliations } from './ror.service';
import { getFdaEnforcement } from './fda-enforcement.service';
import { getOpenCorporatesData } from './opencorporates.service';
import { getInternationalTrials } from './who-ictrp.service';

import { cache } from 'react';

const withTimeout = <T>(name: string, promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    const timer = setTimeout(() => {
      console.warn(`[TIMEOUT] ${name} timed out after ${timeoutMs}ms`);
      resolve(fallback);
    }, timeoutMs);
    
    promise.then((result) => {
      clearTimeout(timer);
      console.log(`[SUCCESS] ${name} completed`);
      resolve(result);
    }).catch((err) => {
      clearTimeout(timer);
      console.error(`[ERROR] ${name} failed:`, err);
      resolve(fallback);
    });
  });
};

export const enrichCompanyData = cache(async (baseCompany: Company, activeTab?: string): Promise<CompanyDetails> => {
  const companyName = baseCompany.name;
  console.log(`\n--- Starting aggregation for ${companyName} (Tab: ${activeTab || 'overview'}) ---`);

  // STEP 1: Execute Identity Resolution
  const identityFallback = { name: companyName, legalName: companyName, aliases: [], subsidiaries: [] };
  const identity = await withTimeout('Identity Resolution', resolveCompanyIdentity(companyName), 8000, identityFallback);

  // STEP 2: Use resolved identity to query APIs concurrently, filtered by active tab
  console.log(`[LOG] Starting targeted API fetches for ${identity.legalName || identity.name}`);
  
  // ALWAYS fetch base identity/profile data (used by Hero/Overview)
  const basePromises = [
    withTimeout('Wikipedia', getCompanyFromWikipedia(identity.legalName || identity.name), 20000, null),
    withTimeout('Wikidata', getCompanyFromWikidata(identity.legalName || identity.name), 20000, null),
    withTimeout('GLEIF', getEntityFromGleif(identity), 15000, null),
    withTimeout('OpenCorporates', getOpenCorporatesData(identity), 15000, null),
    withTimeout('ROR', getRorAffiliations(identity), 20000, null),
  ];

  // Tab-specific fetches
  const isTab = (t: string) => !activeTab || activeTab === t || activeTab === 'overview'; // load some stuff on overview too

  const results = await Promise.allSettled([
    ...basePromises,
    // Index 5: OpenFDA (Products, Regulatory)
    (isTab('products') || isTab('regulatory')) ? withTimeout('OpenFDA', getFdaApplications(identity, 500), 25000, []) : Promise.resolve([]),
    // Index 6: DailyMed (Products)
    isTab('products') ? withTimeout('DailyMed', getDailyMedProducts(identity, 500), 25000, []) : Promise.resolve([]),
    // Index 7: SEC (Financials, Corporate, Documents)
    (isTab('financials') || isTab('corporate') || isTab('documents') || isTab('overview')) ? withTimeout('SEC EDGAR', getEntityFromSec(identity.legalName || identity.name, identity.ticker), 20000, null) : Promise.resolve(null),
    // Index 8: Clinical Trials (Clinical)
    isTab('clinical') ? withTimeout('Clinical Trials', getClinicalTrials(identity, 100), 30000, []) : Promise.resolve([]),
    // Index 9: PubMed (Publications)
    isTab('publications') ? withTimeout('PubMed', getCompanyPublications(identity, 200), 25000, []) : Promise.resolve([]),
    // Index 10: EuropePMC (Publications)
    isTab('publications') ? withTimeout('EuropePMC', getCompanyEuropePMC(identity, 200), 25000, []) : Promise.resolve([]),
    // Index 11: OpenAlex (Publications)
    isTab('publications') ? withTimeout('OpenAlex', getCompanyOpenAlex(identity, 200), 25000, []) : Promise.resolve([]),
    // Index 12: Patents (Patents)
    isTab('patents') ? withTimeout('Patents', getCompanyPatents(identity, 500), 20000, []) : Promise.resolve([]),
    // Index 13: NIH (Financials, Corporate)
    (isTab('financials') || isTab('corporate')) ? withTimeout('NIH RePORTER', getCompanyGrants(identity, 50), 20000, []) : Promise.resolve([]),
    // Index 14: OpenTargets (Clinical, Overview)
    (isTab('clinical') || isTab('overview')) ? withTimeout('OpenTargets', getOpenTargets(identity), 25000, []) : Promise.resolve([]),
    // Index 15: ORCID (Leadership)
    isTab('leadership') ? withTimeout('ORCID', getCompanyResearchers(identity), 20000, []) : Promise.resolve([]),
    // Index 16: CrossRef (Publications)
    isTab('publications') ? withTimeout('CrossRef', getCrossrefPublications(identity, 50), 20000, []) : Promise.resolve([]),
    // Index 17: FDA Enforcement (Regulatory)
    isTab('regulatory') ? withTimeout('FDA Enforcement', getFdaEnforcement(identity), 20000, null) : Promise.resolve(null),
    // Index 18: WHO ICTRP (Clinical)
    isTab('clinical') ? withTimeout('WHO ICTRP', getInternationalTrials(identity), 15000, []) : Promise.resolve([]),
  ]);

  const wikiData = results[0].status === 'fulfilled' ? results[0].value : null;
  const wikidataData = results[1].status === 'fulfilled' ? results[1].value : null;
  const gleifData = results[2].status === 'fulfilled' ? results[2].value : null;
  const openCorporatesData = results[3].status === 'fulfilled' ? results[3].value : null;
  const rorData = results[4].status === 'fulfilled' ? results[4].value : null;
  
  const fdaData = results[5].status === 'fulfilled' ? results[5].value : [];
  const dailyMedData = results[6].status === 'fulfilled' ? results[6].value : [];
  const secData = results[7].status === 'fulfilled' ? results[7].value : null;
  const clinicalTrialsData = results[8].status === 'fulfilled' ? results[8].value : [];
  const pubmedData = results[9].status === 'fulfilled' ? results[9].value : [];
  const europepmcData = results[10].status === 'fulfilled' ? results[10].value : [];
  const openalexData = results[11].status === 'fulfilled' ? results[11].value : [];
  const patentsData = results[12].status === 'fulfilled' ? results[12].value : [];
  const grantsData = results[13].status === 'fulfilled' ? results[13].value : [];
  const openTargetsData = results[14].status === 'fulfilled' ? results[14].value : [];
  const orcidData = results[15].status === 'fulfilled' ? results[15].value : [];
  const crossrefData = results[16].status === 'fulfilled' ? results[16].value : [];
  const fdaEnforcementData = results[17].status === 'fulfilled' ? results[17].value : null;
  const whoIctrpData = results[18].status === 'fulfilled' ? results[18].value : [];

  // Merge publication datasets and deduplicate by PMID / DOI
  const allPubs = [...pubmedData, ...europepmcData, ...openalexData, ...crossrefData];
  const uniquePubs = new Map();
  allPubs.forEach(pub => {
    if (pub.pmid && !uniquePubs.has(`pmid-${pub.pmid}`)) {
      uniquePubs.set(`pmid-${pub.pmid}`, pub);
    } else if (pub.doi && !uniquePubs.has(`doi-${pub.doi}`)) {
      uniquePubs.set(`doi-${pub.doi}`, pub);
    } else if (!pub.pmid && !pub.doi && pub.title && !uniquePubs.has(`title-${pub.title.toLowerCase()}`)) {
      uniquePubs.set(`title-${pub.title.toLowerCase()}`, pub);
    }
  });
  const publicationsData = Array.from(uniquePubs.values());

  const tickerSymbol = identity.ticker || wikidataData?.ticker || secData?.ticker;

  const newsResults = await Promise.allSettled([
    withTimeout('News', getCompanyNews(tickerSymbol || identity.legalName || companyName), 10000, [])
  ]);
  
  const newsData = newsResults[0].status === 'fulfilled' ? newsResults[0].value : [];
  
  console.log(`--- Finished aggregation for ${companyName} ---\n`);

  const aboutDescription = wikiData?.description || baseCompany.description;
  const history = wikiData?.history;
  const foundedYear = wikidataData?.founded || wikiData?.founded || baseCompany.founded;
  const employees = wikidataData?.employees || wikiData?.employees || baseCompany.employees;
  const revenue = wikidataData?.revenue;
  const ceo = wikidataData?.ceo;
  
  const hqString = gleifData?.headquartersCity 
    ? `${gleifData.headquartersCity}, ${gleifData.headquartersCountry}`
    : secData?.businessAddress?.city 
      ? `${secData.businessAddress.city}, ${secData.businessAddress.stateOrProvince || ''}`
      : wikidataData?.headquarters || wikiData?.headquarters || (baseCompany.city ? `${baseCompany.city}, ${baseCompany.country}` : undefined);
      
  const mapCoords = await getCoordinates(hqString || identity.legalName || companyName);
  
  const website = identity.website || wikidataData?.website || wikiData?.website || baseCompany.website;
  const stockExchange = wikidataData?.stockExchange || secData?.exchange;
  const isin = wikidataData?.isin;

  // Resolve company logo: prefer existing Wikimedia/SVG URL > Clearbit domain-based logo
  const existingLogo = baseCompany.logoUrl && !baseCompany.logoUrl.startsWith('/logos/') ? baseCompany.logoUrl : undefined;
  const clearbitLogo = website ? `https://logo.clearbit.com/${(() => { try { return new URL(website.startsWith('http') ? website : `https://${website}`).hostname; } catch { return ''; } })()}` : undefined;
  const resolvedLogo = existingLogo || clearbitLogo;

  
  const productsMap = new Map<string, {
    id: string;
    name: string;
    genericName: string;
    type: string;
    category: string;
    dosageForm: string;
    strength: string;
    image: string;
    therapeuticArea: string;
    description?: string;
    approvalStatus?: string;
    manufacturer?: string;
    approvalDate?: string;
    officialLink?: string;
  }>();

  fdaData.forEach((app: FdaApplication) => {
    if (app.brandName && app.brandName !== "N/A" && !productsMap.has(app.brandName.toLowerCase())) {
      productsMap.set(app.brandName.toLowerCase(), {
        id: `prod-fda-${app.id}`,
        name: app.brandName,
        genericName: app.genericName,
        type: app.type.includes("NDA") ? "Prescription" : "Generic",
        category: "Pharmaceuticals",
        dosageForm: app.dosageForm,
        strength: app.strength || "",
        image: "",
        therapeuticArea: "Unknown",
        description: `FDA Application: ${app.number}`,
        approvalStatus: app.status,
        manufacturer: app.applicant || identity.name,
        approvalDate: app.approvalDate,
        officialLink: `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=${app.number.replace(/\D/g,'')}`
      });
    }
  });

  dailyMedData.forEach((spl: { title?: string, setid?: string, spl_version?: number | string }) => {
    const title = spl.title || '';
    const setid = spl.setid || '';
    const spl_version = spl.spl_version?.toString() || '';

    if (title && !productsMap.has(title.toLowerCase())) {
      productsMap.set(title.toLowerCase(), {
        id: `prod-dm-${setid}`,
        name: title,
        genericName: title,
        type: "Labeled Product",
        category: "Pharmaceuticals",
        dosageForm: "Various",
        strength: "",
        image: "",
        therapeuticArea: "Unknown",
        description: `DailyMed SPL Version: ${spl_version}`,
        approvalStatus: "Marketed",
        manufacturer: identity.name,
        officialLink: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`
      });
    }
  });

  let productsList = Array.from(productsMap.values());
  
  // Post-process products with RxNorm and ChEMBL
  productsList = await enhanceProductsWithRxNorm(productsList);
  const chemblTargets = await getCompanyDrugTargets(productsList);
  
  // Merge OpenTargets and ChEMBL Targets
  const allTargets = [...openTargetsData, ...chemblTargets];
  const uniqueTargetNames = new Set();
  const drugTargetsData = [];
  for (const t of allTargets) {
    if (!uniqueTargetNames.has(t.targetName)) {
      uniqueTargetNames.add(t.targetName);
      drugTargetsData.push(t);
    }
  }

  const leadership = wikidataData?.executives?.map((exec: { name: string; role: string; image?: string; education?: string; appointmentDate?: string }, idx: number) => ({
    id: `exec-${idx}`,
    name: exec.name,
    role: exec.role,
    department: exec.role.includes("Finance") ? "Finance" : exec.role.includes("Medical") ? "Medical Affairs" : "Executive",
    image: exec.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(exec.name)}&background=0D8ABC&color=fff`,
    linkedin: `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(exec.name + " " + identity.name)}`,
    education: exec.education,
    appointmentDate: exec.appointmentDate,
    source: 'Wikidata'
  })) || [];

  if (ceo && !leadership.find((l: { role: string }) => l.role === 'Chief Executive Officer')) {
    leadership.unshift({
      id: 'ceo',
      name: ceo,
      role: 'Chief Executive Officer',
      department: 'Executive',
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(ceo)}&background=0D8ABC&color=fff`,
      linkedin: `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(ceo + " " + identity.name)}`,
      education: undefined,
      appointmentDate: undefined,
      source: 'Wikidata'
    });
  }

  const boardOfDirectors = wikidataData?.boardMembers?.map((board: { name: string; role: string; image?: string; education?: string; appointmentDate?: string }, idx: number) => ({
    id: `board-${idx}`,
    name: board.name,
    role: board.role,
    type: "Independent Director" as const,
    image: board.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(board.name)}&background=1E293B&color=fff`,
    education: board.education,
    appointmentDate: board.appointmentDate,
    source: 'Wikidata'
  })) || [];

  const formatCurrency = (val?: string) => {
    if (!val) return undefined;
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)} Billion`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)} Million`;
    return `$${num.toLocaleString()}`;
  };

  const formattedRevenue = formatCurrency(revenue);

  // STEP 3: Map Facilities using GLEIF Data (NO MOCK DATA)
  const facilitiesList = gleifData?.headquartersCity ? [{
    id: `fac-gleif-${gleifData.id}`,
    name: `${identity.name} Headquarters`,
    type: "Headquarters",
    address: gleifData.headquartersAddress || "N/A",
    city: gleifData.headquartersCity || "N/A",
    country: gleifData.headquartersCountry || "N/A",
    certifications: [],
    capacity: "Corporate Global HQ"
  }] : undefined;
  
  if (facilitiesList && gleifData?.legalAddress && gleifData?.legalCity !== gleifData?.headquartersCity) {
    facilitiesList.push({
      id: `fac-gleif-legal-${gleifData.id}`,
      name: `${identity.name} Registered Office`,
      type: "Corporate Office",
      address: gleifData.legalAddress || "N/A",
      city: gleifData.legalCity || "N/A",
      country: gleifData.legalCountry || "N/A",
      certifications: [],
      capacity: "Legal Registrant"
    });
  }

  const enriched: CompanyDetails = {
    ...baseCompany,
    name: identity.legalName || identity.name,
    logoUrl: resolvedLogo || baseCompany.logoUrl,
    aboutDescription,
    history,
    foundedYear,
    employees,
    revenue: formattedRevenue,
    headquarters: hqString,
    stockExchange,
    tickerSymbol,
    isin,
    parentCompany: wikidataData?.parentCompany || gleifData?.legalName,
    
    jurisdiction: openCorporatesData?.jurisdiction_code?.toUpperCase(),
    incorporationDate: openCorporatesData?.incorporation_date,
    
    leadership: leadership.length > 0 ? leadership : undefined,
    boardOfDirectors: boardOfDirectors.length > 0 ? boardOfDirectors : undefined,
    researchers: orcidData.length > 0 ? orcidData : undefined,

    fdaApplications: fdaData.length > 0 ? fdaData.map((fda: FdaApplication) => ({
      ...fda,
      fdaLink: `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=${fda.number.replace(/\D/g,'')}`
    })) : undefined,
    
    productsList: productsList.length > 0 ? productsList : undefined,
    totalProducts: productsList.length > 0 ? productsList.length : undefined,
    approvedDrugs: productsList.filter((p: { approvalStatus?: string }) => p.approvalStatus === 'Approved' || p.approvalStatus === 'Marketed').length || undefined,
    totalFdaApplications: fdaData.length > 0 ? fdaData.length : undefined,
    
    facilitiesList,
    certificationsList: undefined, // Removed mock scraping
    manufacturingSites: facilitiesList ? facilitiesList.length : undefined,
    certificationsCount: undefined, // Removed mock scraping

    clinicalTrials: [...clinicalTrialsData, ...whoIctrpData].length > 0 ? [...clinicalTrialsData, ...whoIctrpData] : undefined,
    patents: patentsData.length > 0 ? patentsData : undefined,
    publications: publicationsData.length > 0 ? publicationsData : undefined,
    grants: grantsData.length > 0 ? grantsData : undefined,
    drugTargets: drugTargetsData.length > 0 ? drugTargetsData : undefined,
    
    // Custom mapping for new data points
    warningLettersCount: fdaEnforcementData ? fdaEnforcementData.length : undefined,
    culture: rorData?.types ? `Research Focus: ${rorData.types.join(', ')}` : undefined,
    
    financials: secData || wikidataData?.revenue ? {
      revenue: formattedRevenue,
      marketCap: formatCurrency(wikidataData?.marketCap)
    } : undefined,

    countriesServed: clinicalTrialsData.length > 0 ? Array.from(new Set(clinicalTrialsData.flatMap((t: any) => t.countries || []))).length : undefined,
    globalPresence: undefined,
    performance: undefined,
    subsidiaries: wikidataData?.subsidiaries ? wikidataData.subsidiaries.split(', ') : undefined,
    therapeuticAreas: (() => {
      const areas = new Set<string>();
      if (productsList) {
        productsList.forEach(p => {
          if (p.therapeuticArea && p.therapeuticArea !== "Unknown") areas.add(p.therapeuticArea);
        });
      }
      return Array.from(areas).map(area => ({
        id: `area-${area.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: area,
        icon: 'activity'
      }));
    })(),

    latestNews: newsData && newsData.length > 0 ? newsData : undefined,
    
    contactInfo: hqString || website ? {
      address: hqString || "",
      email: undefined,
      phone: undefined,
      website: website ? website.replace(/^https?:\/\//, '') : "",
      mapCoordinates: mapCoords || { lat: baseCompany.latitude || 0, lng: baseCompany.longitude || 0 }
    } : undefined,

    documents: secData?.filings ? (() => {
      const docs = [];
      const filings = secData.filings;
      if (!filings || !filings.form) return undefined;
      for (let i = 0; i < filings.form.length && docs.length < 10; i++) {
        const formType = filings.form[i];
        if (formType === '10-K' || formType === '10-Q' || formType === '8-K') {
          const accessionBase = filings.accessionNumber[i].replace(/-/g, '');
          docs.push({
            id: `sec-${filings.accessionNumber[i]}`,
            title: `SEC Form ${formType}`,
            type: "PDF" as const,
            category: formType === '10-K' ? "Annual Reports" as const : "Financial Reports" as const,
            size: "Available Online",
            date: filings.filingDate[i],
            url: `https://www.sec.gov/Archives/edgar/data/${secData.cik}/${accessionBase}/${filings.primaryDocument[i]}`
          });
        }
      }
      return docs.length > 0 ? docs : undefined;
    })() : undefined
  };

  return enriched;
});
