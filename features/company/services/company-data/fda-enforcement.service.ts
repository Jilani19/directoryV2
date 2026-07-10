import { CompanyIdentity } from './identity.service';

const OPENFDA_ENFORCEMENT_API = 'https://api.fda.gov/drug/enforcement.json';

export async function getFdaEnforcement(identity: CompanyIdentity) {
  try {
    const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean).slice(0, 3);
    if (searchTerms.length === 0) return null;
    
    for (const term of searchTerms) {
      // Search FDA recalls and enforcement reports for the recalling firm
      const searchUrl = `${OPENFDA_ENFORCEMENT_API}?search=recalling_firm:"${encodeURIComponent(term)}"&limit=10`;
      
      const res = await fetch(searchUrl, { next: { revalidate: 3600 } }).catch(() => null);
      
      if (res && res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const warnings = data.results.map((r: { recall_number: string; status: string; reason_for_recall: string; classification: string; report_date: string; recalling_firm: string }) => ({
            id: r.recall_number,
            status: r.status,
            reason: r.reason_for_recall,
            classification: r.classification,
            reportDate: r.report_date,
            firm: r.recalling_firm
          }));
          return warnings;
        }
      }
    }
    
    return null;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error(`Error fetching FDA Enforcement data for ${identity.name}:`, error);
    }
    return null;
  }
}

