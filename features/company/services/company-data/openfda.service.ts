/**
 * OpenFDA Collection Service
 * Fetches Drug Approvals, Applications (NDA, ANDA, BLA) from the FDA API.
 */

import { CompanyIdentity } from './identity.service';

const OPENFDA_DRUG_API = 'https://api.fda.gov/drug/drugsfda.json';

export interface FdaApplication {
  id: string;
  type: "NDA" | "ANDA" | "BLA";
  number: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  status: "Approved" | "Pending" | "Withdrawn";
  submissionDate?: string;
  approvalDate?: string;
  applicant?: string;
  strength?: string;
}

export async function getFdaApplications(identity: CompanyIdentity, limit: number = 50): Promise<FdaApplication[]> {
  try {
    const searchTerms = Array.from(new Set([identity.name, identity.legalName, ...identity.aliases, ...identity.subsidiaries])).filter(Boolean);
    if (searchTerms.length === 0) return [];

    const fetchPromises = searchTerms.map(term => {
      // Query both sponsor_name and applicant with exact phrase matching
      const sponsorQuery = `sponsor_name:"${encodeURIComponent(term)}"+OR+openfda.manufacturer_name:"${encodeURIComponent(term)}"`;
      const searchUrl = `${OPENFDA_DRUG_API}?search=(${sponsorQuery})&limit=100`;
      
      return fetch(searchUrl, { next: { revalidate: 3600 } })
        .then(res => res.ok ? res.json() : null)
        .catch(() => null);
    });

    const results = await Promise.allSettled(fetchPromises);
    const applications: FdaApplication[] = [];
    const uniqueApps = new Map();

    for (const res of results) {
      if (res.status === 'fulfilled' && res.value?.results) {
        for (const record of res.value.results) {
          if (!record.products || record.products.length === 0) continue;
          if (uniqueApps.has(record.application_number)) continue;
          
          uniqueApps.set(record.application_number, true);
          
          const primaryProduct = record.products[0];
          const submissions = record.submissions || [];
          const latestSubmission = submissions.length > 0 ? submissions[submissions.length - 1] : null;
          
          let type: "NDA" | "ANDA" | "BLA" = "NDA";
          if (record.application_number?.startsWith('ANDA')) type = "ANDA";
          if (record.application_number?.startsWith('BLA')) type = "BLA";

          applications.push({
            id: record.application_number,
            type: type,
            number: record.application_number,
            brandName: primaryProduct.brand_name || "N/A",
            genericName: primaryProduct.active_ingredients?.map((ai: { name: string, strength: string }) => ai.name).join(', ') || "N/A",
            dosageForm: primaryProduct.dosage_form || "N/A",
            status: latestSubmission?.submission_status === "AP" ? "Approved" : "Pending",
            approvalDate: latestSubmission?.submission_status_date 
              ? `${latestSubmission.submission_status_date.substring(0,4)}-${latestSubmission.submission_status_date.substring(4,6)}-${latestSubmission.submission_status_date.substring(6,8)}` 
              : undefined,
            applicant: record.sponsor_name,
            strength: primaryProduct.active_ingredients?.map((ai: { name: string, strength: string }) => ai.strength).join(', ') || undefined
          });
        }
      }
    }
    
    return applications.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching OpenFDA data for ${identity.name}:`, error);
    return [];
  }
}
