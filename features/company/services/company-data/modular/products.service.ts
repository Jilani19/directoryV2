import { cache } from 'react';
import { CompanyIdentity } from '../identity.service';
import { getFdaApplications, FdaApplication } from '../openfda.service';
import { getDailyMedProducts } from '../dailymed.service';
import { enhanceProductsWithRxNorm } from '../rxnorm.service';

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

export const getProductsData = cache(async (identity: CompanyIdentity) => {
  const name = identity.legalName || identity.name;
  const [fdaData, dailyMedData] = await Promise.all([
    withTimeout('OpenFDA', name, getFdaApplications(identity, 500), 10000, []),
    withTimeout('DailyMed', name, getDailyMedProducts(identity, 500), 10000, [])
  ]);

  const productsMap = new Map();

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
        manufacturer: app.applicant || name,
        approvalDate: app.approvalDate,
        officialLink: `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=${app.number.replace(/\\D/g,'')}`
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
        approvalStatus: "Marketed",
        manufacturer: name,
        officialLink: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}`
      });
    }
  });

  let productsList = Array.from(productsMap.values());
  if (productsList.length > 0) {
    productsList = await enhanceProductsWithRxNorm(productsList);
  }

  const therapeuticAreas = new Set<string>();
  productsList.forEach(p => {
    if (p.therapeuticArea && p.therapeuticArea !== "Unknown") therapeuticAreas.add(p.therapeuticArea);
  });

  return {
    productsList,
    therapeuticAreas: Array.from(therapeuticAreas),
    totalProducts: productsList.length,
    approvedDrugs: productsList.filter(p => p.approvalStatus === 'Approved' || p.approvalStatus === 'Marketed').length
  };
});
