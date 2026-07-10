import { NextResponse } from 'next/server';
import { companies, Company } from '@/features/directory/mock/companies';
import { resolveCompanyIdentity } from '@/features/company/services/company-data/identity.service';
import { getClinicalTrials } from '@/features/company/services/company-data/clinicaltrials.service';
import { getInternationalTrials } from '@/features/company/services/company-data/who-ictrp.service';
import { getFdaApplications } from '@/features/company/services/company-data/openfda.service';
import { getDailyMedProducts } from '@/features/company/services/company-data/dailymed.service';
import { getCompanyPublications } from '@/features/company/services/company-data/pubmed.service';
import { getCompanyEuropePMC } from '@/features/company/services/company-data/europepmc.service';
import { getCompanyOpenAlex } from '@/features/company/services/company-data/openalex.service';
import { getCrossrefPublications } from '@/features/company/services/company-data/crossref.service';
import { getCompanyPatents } from '@/features/company/services/company-data/patents.service';
import { getFdaEnforcement } from '@/features/company/services/company-data/fda-enforcement.service';
import { getOpenCorporatesData } from '@/features/company/services/company-data/opencorporates.service';
import { getEntityFromSec } from '@/features/company/services/company-data/sec.service';
import { getCompanyFromWikidata } from '@/features/company/services/company-data/wikidata.service';
import { getCompanyFromWikipedia } from '@/features/company/services/company-data/wikipedia.service';
import { getRorAffiliations } from '@/features/company/services/company-data/ror.service';

const withTimeout = <T>(name: string, promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    const timer = setTimeout(() => {
      console.warn(`[API TIMEOUT] ${name} timed out after ${timeoutMs}ms`);
      resolve(fallback);
    }, timeoutMs);
    promise.then((result) => {
      clearTimeout(timer);
      resolve(result);
    }).catch((err) => {
      clearTimeout(timer);
      console.error(`[API ERROR] ${name} failed:`, err);
      resolve(fallback);
    });
  });
};

export async function GET(request: Request, props: { params: Promise<{ slug: string, category: string }> }) {
  const params = await props.params;
  const { slug, category } = params;
  
  const baseCompany = companies.find(c => c.id === slug);
  if (!baseCompany) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  // Fetch identity (this should be cached by Next.js if we use unstable_cache inside the service, 
  // but we can just use the memory cache or fast await here)
  const identity = await withTimeout('Identity', resolveCompanyIdentity(baseCompany.name), 8000, {
    name: baseCompany.name,
    legalName: baseCompany.name,
    aliases: [],
    subsidiaries: []
  });

  let data: any = {};

  try {
    switch (category) {
      case 'overview': {
        const [wikiData, wikipediaData, rorData] = await Promise.all([
          withTimeout('Wikidata', getCompanyFromWikidata(identity.legalName || identity.name), 10000, null),
          withTimeout('Wikipedia', getCompanyFromWikipedia(identity.legalName || identity.name), 10000, null),
          withTimeout('ROR', getRorAffiliations(identity), 10000, null),
        ]);
        data = { wikiData, wikipediaData, rorData };
        break;
      }
      
      case 'clinical': {
        const [clinicalTrialsData, internationalTrialsData] = await Promise.all([
          withTimeout('ClinicalTrials', getClinicalTrials(identity), 15000, []),
          withTimeout('WHO', getInternationalTrials(identity), 10000, [])
        ]);
        
        // Merge clinical trials safely
        const allTrialsMap = new Map();
        clinicalTrialsData.forEach((t: any) => allTrialsMap.set(t.id, t));
        internationalTrialsData.forEach((t: any) => {
          if (!allTrialsMap.has(t.id)) allTrialsMap.set(t.id, t);
        });
        
        data = { clinicalTrials: Array.from(allTrialsMap.values()) };
        break;
      }
      
      case 'products': {
        const [fdaData, dailyMedData] = await Promise.all([
          withTimeout('OpenFDA', getFdaApplications(identity), 15000, []),
          withTimeout('DailyMed', getDailyMedProducts(identity), 15000, [])
        ]);
        
        const productsMap = new Map<string, any>();
        fdaData.forEach((app: any) => {
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
              approvalDate: app.approvalDate,
              manufacturer: app.applicant || identity.name,
              officialLink: `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=${app.number.replace(/\D/g,'')}`
            });
          }
        });

        dailyMedData.forEach((spl: any) => {
          const title = spl.title || '';
          const setid = spl.setid || '';
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
              description: `DailyMed SPL Version: ${spl.spl_version || ''}`,
              approvalStatus: "Marketed",
              manufacturer: identity.name,
              officialLink: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`
            });
          }
        });

        data = { products: Array.from(productsMap.values()) };
        break;
      }
      
      case 'financials': {
        const secData = await withTimeout('SEC', getEntityFromSec(identity.name, undefined), 15000, null);
        data = { financials: secData };
        break;
      }
      
      case 'leadership': {
        const openCorporates = await withTimeout('OpenCorporates', getOpenCorporatesData(identity), 15000, null);
        data = { openCorporates };
        break;
      }
      
      case 'publications': {
        const [pubmedData, europepmcData, openalexData, crossrefData] = await Promise.all([
          withTimeout('PubMed', getCompanyPublications(identity), 15000, []),
          withTimeout('EuropePMC', getCompanyEuropePMC(identity), 15000, []),
          withTimeout('OpenAlex', getCompanyOpenAlex(identity), 15000, []),
          withTimeout('Crossref', getCrossrefPublications(identity), 15000, [])
        ]);
        
        const publicationsMap = new Map();
        [...pubmedData, ...europepmcData, ...openalexData, ...crossrefData].forEach((pub: any) => {
          if (!publicationsMap.has(pub.id)) {
            publicationsMap.set(pub.id, pub);
          }
        });
        
        data = { publications: Array.from(publicationsMap.values()) };
        break;
      }
      
      case 'patents': {
        const patentsData = await withTimeout('PatentsView', getCompanyPatents(identity), 15000, []);
        data = { patents: patentsData };
        break;
      }

      case 'regulatory': {
        const [fdaEnforcementData, fdaApplicationsData] = await Promise.all([
          withTimeout('FDAEnforcement', getFdaEnforcement(identity), 15000, []),
          withTimeout('OpenFDA_Applications', getFdaApplications(identity), 15000, [])
        ]);
        data = { 
          regulatory: fdaEnforcementData,
          fdaApplications: fdaApplicationsData
        };
        break;
      }
      
      default:
        data = { message: 'Category not implemented yet' };
    }
  } catch (error) {
    console.error(`Error aggregating category ${category}:`, error);
    return NextResponse.json({ error: 'Failed to aggregate data' }, { status: 500 });
  }

  // Set Cache-Control header for API caching (e.g., 24 hours)
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
    }
  });
}
