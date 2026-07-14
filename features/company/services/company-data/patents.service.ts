import { CompanyDetails } from "../../types";
import { CompanyIdentity } from "./identity.service";

export async function getCompanyPatents(identity: CompanyIdentity, limit: number = 200): Promise<NonNullable<CompanyDetails['patents']>> {
  try {
    const searchTerms = Array.from(new Set([identity.legalName, identity.name, ...identity.aliases])).filter(Boolean).slice(0, 5);
    if (searchTerms.length === 0) return [];

    const orClauses = searchTerms.map(term => `{"_text_any":{"assignee_organization":"${term}"}}`).join(",");
    
    const qParam = encodeURIComponent(`{"_or":[${orClauses}]}`);
    const fParam = encodeURIComponent(`["patent_number","patent_title","patent_date","assignee_organization","inventor_name_first","inventor_name_last"]`);
    const oParam = encodeURIComponent(`{"per_page":${limit}}`);
    
    // PatentsView API Endpoint
    const url = `https://api.patentsview.org/patents/query?q=${qParam}&f=${fParam}&o=${oParam}`;
    
    const res = await fetch(url, { 
      next: { revalidate: 86400 },
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) return [];

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // PatentsView API retired on May 1, 2025. Will return HTML. Gracefully return empty array.
      return [];
    }

    const data = await res.json();
    if (!data.patents || data.patents.length === 0) return [];

    const uniquePatents = new Map();

     
    data.patents.forEach((p: any) => {
      if (!uniquePatents.has(p.patent_number)) {
         
        const inventors = p.inventors ? p.inventors.map((i: any) => `${i.inventor_name_first} ${i.inventor_name_last}`) : [];
        uniquePatents.set(p.patent_number, {
          patentNumber: p.patent_number,
          title: p.patent_title,
          inventors,
          assignee: p.assignees ? p.assignees[0]?.assignee_organization || identity.name : identity.name,
          grantDate: p.patent_date,
          status: "Granted",
          url: `https://patents.google.com/patent/US${p.patent_number}`
        });
      }
    });

    return Array.from(uniquePatents.values());
  } catch (error) {
    console.error("Patents Service Error:", error);
    return [];
  }
}
