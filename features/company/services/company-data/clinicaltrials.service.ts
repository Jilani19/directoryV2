/**
 * ClinicalTrials Collection Service
 * Fetches clinical studies data from ClinicalTrials.gov API v2.
 */

const CLINICAL_TRIALS_API = 'https://clinicaltrials.gov/api/v2/studies';

export interface ClinicalTrial {
  nctId: string;
  title: string;
  status: string;
  phases: string[];
  conditions: string[];
  interventions: string[];
  locations: number;
  url: string;
}

export async function getClinicalTrials(companyName: string, limit: number = 20): Promise<ClinicalTrial[]> {
  try {
    // Search by sponsor
    const searchUrl = `${CLINICAL_TRIALS_API}?query.sponsor=${encodeURIComponent(companyName)}&pageSize=${limit}`;
    
    const res = await fetch(searchUrl, { next: { revalidate: 86400 } });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    if (!data.studies) return [];
    
    const trials: ClinicalTrial[] = [];
    
    for (const study of data.studies) {
      const protocolSection = study.protocolSection;
      if (!protocolSection) continue;
      
      const identification = protocolSection.identificationModule;
      const status = protocolSection.statusModule;
      const design = protocolSection.designModule;
      const conditions = protocolSection.conditionsModule;
      const interventions = protocolSection.armsInterventionsModule;
      const locations = protocolSection.contactsLocationsModule?.locations || [];
      
      if (!identification?.nctId) continue;
      
      trials.push({
        nctId: identification.nctId,
        title: identification.briefTitle || "N/A",
        status: status?.overallStatus || "Unknown",
        phases: design?.phases || [],
        conditions: conditions?.conditions || [],
        interventions: interventions?.interventions?.map((i: { name: string }) => i.name) || [],
        locations: locations.length,
        url: `https://clinicaltrials.gov/study/${identification.nctId}`
      });
    }
    
    return trials;
  } catch (error) {
    console.error(`Error fetching Clinical Trials data for ${companyName}:`, error);
    return [];
  }
}
