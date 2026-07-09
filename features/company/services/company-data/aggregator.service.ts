/**
 * Data Aggregator Service
 * Orchestrates fetching from multiple sources (Wikipedia, Wikidata, OpenFDA, ClinicalTrials)
 * and maps the results to the CompanyDetails interface.
 */

import { CompanyDetails } from '../../types';
import { getCompanyFromWikipedia } from './wikipedia.service';
import { getCompanyFromWikidata } from './wikidata.service';
import { getFdaApplications, FdaApplication } from './openfda.service';
import { getCompanyNews } from './news.service';
import { generateDocumentSearchLinks } from './documents.service';
import { Company } from '../../../directory/mock/companies';

/**
 * Main function to aggregate data for a specific company.
 * Takes base company metadata (from directory list) and enriches it.
 */
export async function enrichCompanyData(baseCompany: Company): Promise<CompanyDetails> {
  const companyName = baseCompany.name;

  const [wikiDataResult, wikidataDataResult, fdaDataResult] = await Promise.allSettled([
    getCompanyFromWikipedia(companyName),
    getCompanyFromWikidata(companyName),
    getFdaApplications(companyName)
  ]);

  const wikiData = wikiDataResult.status === 'fulfilled' ? wikiDataResult.value : null;
  const wikidataData = wikidataDataResult.status === 'fulfilled' ? wikidataDataResult.value : null;
  const fdaData = fdaDataResult.status === 'fulfilled' ? fdaDataResult.value : [];

  const tickerSymbol = wikidataData?.ticker;

  const [newsDataResult] = await Promise.allSettled([
    getCompanyNews(tickerSymbol || companyName)
  ]);
  
  const newsData = newsDataResult.status === 'fulfilled' ? newsDataResult.value : [];

  // Merge the data, preferring structured Wikidata where possible, falling back to Wikipedia
  const aboutDescription = wikiData?.description || baseCompany.description;
  const history = wikiData?.history;
  const foundedYear = wikidataData?.founded || wikiData?.founded || baseCompany.founded;
  const employees = wikidataData?.employees || wikiData?.employees || baseCompany.employees;
  const revenue = wikidataData?.revenue;
  const ceo = wikidataData?.ceo;
  const hq = wikidataData?.headquarters || wikiData?.headquarters || (baseCompany.city ? `${baseCompany.city}, ${baseCompany.country}` : undefined);
  const website = wikidataData?.website || wikiData?.website || baseCompany.website;
  
  const stockExchange = wikidataData?.stockExchange;
  const isin = wikidataData?.isin;
  
  // Derive products from FDA applications
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
    description: string;
  }>();
  fdaData.forEach((app: FdaApplication) => {
    if (app.brandName && app.brandName !== "N/A" && !productsMap.has(app.brandName)) {
      productsMap.set(app.brandName, {
        id: `prod-${app.id}`,
        name: app.brandName,
        genericName: app.genericName,
        type: "Prescription",
        category: "Pharmaceuticals",
        dosageForm: app.dosageForm,
        strength: app.strength || "",
        image: "",
        therapeuticArea: "Unknown", // Can't derive easily from OpenFDA
        description: `FDA Application: ${app.number}`
      });
    }
  });
  const productsList = Array.from(productsMap.values());

  // Build the enriched company object
  const enriched: CompanyDetails = {
    ...baseCompany,
    aboutDescription,
    history,
    foundedYear,
    employees,
    revenue,
    headquarters: hq,
    stockExchange,
    tickerSymbol,
    isin,
    
    // Leadership
    leadership: ceo ? [
      { id: "ceo", name: ceo, role: "Chief Executive Officer", image: "" }
    ] : undefined,

    // FDA Data
    fdaApplications: fdaData.length > 0 ? fdaData.map(fda => ({
      id: fda.id,
      type: fda.type,
      number: fda.number,
      brandName: fda.brandName,
      genericName: fda.genericName,
      dosageForm: fda.dosageForm,
      status: fda.status,
      approvalDate: fda.approvalDate,
      applicant: fda.applicant,
      strength: fda.strength
    })) : undefined,
    
    // Products derived from FDA
    productsList: productsList.length > 0 ? productsList : undefined,
    totalProducts: productsList.length > 0 ? productsList.length : undefined,
    totalFdaApplications: fdaData.length > 0 ? fdaData.length : undefined,

    // News
    latestNews: newsData && newsData.length > 0 ? newsData : undefined,
    
    // Contact Info fallback
    contactInfo: hq || website ? {
      address: hq || "",
      email: "",
      phone: "",
      website: website ? website.replace(/^https?:\/\//, '') : "",
      mapCoordinates: { lat: baseCompany.latitude || 0, lng: baseCompany.longitude || 0 }
    } : undefined,

    // Documents
    documents: generateDocumentSearchLinks(companyName, tickerSymbol)
  };

  return enriched;
}
