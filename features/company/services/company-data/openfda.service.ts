/**
 * OpenFDA Collection Service
 * Fetches Drug Approvals, Applications (NDA, ANDA, BLA) from the FDA API.
 */

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

export async function getFdaApplications(companyName: string, limit: number = 20): Promise<FdaApplication[]> {
  try {
    // Search by sponsor name
    // Enclose company name in quotes for exact match phrase, though OpenFDA search is finicky.
    // e.g. sponsor_name:"Pfizer"
    const searchUrl = `${OPENFDA_DRUG_API}?search=sponsor_name:"${encodeURIComponent(companyName)}"&limit=${limit}`;
    
    const res = await fetch(searchUrl, { next: { revalidate: 86400 } });
    
    if (!res.ok) {
      if (res.status === 404) return []; // No records found
      return [];
    }
    
    const data = await res.json();
    if (!data.results) return [];
    
    const applications: FdaApplication[] = [];
    
    // Map the complex OpenFDA structure to our simpler interface
    for (const record of data.results) {
      if (!record.products || record.products.length === 0) continue;
      
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
    
    return applications;
  } catch (error) {
    console.error(`Error fetching OpenFDA data for ${companyName}:`, error);
    return [];
  }
}
