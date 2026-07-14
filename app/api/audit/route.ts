import { NextResponse } from 'next/server';
import { getGoldenIdentity, getCorporateData } from '@/features/company/services/company-data/modular/corporate.service';
import { getProductsData } from '@/features/company/services/company-data/modular/products.service';
import { getClinicalData } from '@/features/company/services/company-data/modular/clinical.service';
import { getResearchData } from '@/features/company/services/company-data/modular/research.service';

const companiesToTest = [
  "Pfizer", "Johnson & Johnson", "Roche", "Novartis", "Sanofi", 
  "Merck", "AbbVie", "Amgen", "Thermo Fisher", "IQVIA", 
  "Lonza", "Catalent", "WuXi AppTec", "Dr. Reddy's", "Sun Pharma", 
  "Cipla", "Aurobindo", "Lupin", "Biocon", "Zydus"
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const skip = parseInt(url.searchParams.get('skip') || '0');
  const limit = parseInt(url.searchParams.get('limit') || '5');
  
  const testSet = companiesToTest.slice(skip, skip + limit);
  const results = [];

  for (const companyName of testSet) {
    try {
      const start = Date.now();
      
      const identity = await getGoldenIdentity(companyName);
      
      const [corporate, products, clinical, research] = await Promise.all([
        getCorporateData(identity),
        getProductsData(identity),
        getClinicalData(identity),
        getResearchData(identity)
      ]);
      
      const end = Date.now();
      
      results.push({
        company: companyName,
        timeMs: end - start,
        success: true,
        summary: {
          goldenIdentity: identity.legalName || identity.name,
          headquarters: corporate.hqString,
          employees: corporate.employees,
          revenue: corporate.revenue,
          products: products.totalProducts,
          clinicalTrials: clinical.totalTrials,
          publications: research.publications.length,
          patents: research.patents?.length || 0,
        }
      });
    } catch (err: any) {
      results.push({
        company: companyName,
        success: false,
        error: err.message
      });
    }
  }
  
  return NextResponse.json({ results });
}
