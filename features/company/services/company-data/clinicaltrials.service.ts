import { CompanyIdentity } from './identity.service';
import { CompanyDetails } from '../../types';

const CLINICAL_TRIALS_API = 'https://clinicaltrials.gov/api/v2/studies';

async function fetchAllPages(url: string): Promise<any[]> {
  let allStudies: any[] = [];
  let nextPageToken: string | null = null;
  do {
    const tokenParam: string = nextPageToken ? `&pageToken=${nextPageToken}` : '';
    try {
      const res = await fetch(`${url}${tokenParam}`, { cache: 'no-store' });
      if (!res.ok) break;
      const data = await res.json();
      if (data.studies) {
        allStudies = allStudies.concat(data.studies);
      }
      nextPageToken = data.nextPageToken || null;
    } catch (err) {
      break;
    }
  } while (nextPageToken && allStudies.length < 500); // safety limit
  return allStudies;
}

export async function getClinicalTrials(identity: CompanyIdentity, limit: number = 500): Promise<NonNullable<CompanyDetails['clinicalTrials']>> {
  try {
    if (!identity.name) return [];

    const terms = Array.from(new Set([identity.name, identity.legalName, ...identity.aliases])).filter(Boolean);
    const fetchPromises: Promise<any[]>[] = [];
    
    terms.forEach(term => {
      fetchPromises.push(fetchAllPages(`${CLINICAL_TRIALS_API}?query.sponsor=${encodeURIComponent(term)}&pageSize=100&countTotal=true`));
      fetchPromises.push(fetchAllPages(`${CLINICAL_TRIALS_API}?query.term=${encodeURIComponent(term)}&pageSize=100&countTotal=true`));
    });

    const results = await Promise.allSettled(fetchPromises);
    const trials: NonNullable<CompanyDetails['clinicalTrials']> = [];
    const uniqueIds = new Set();
    
    for (const res of results) {
      if (res.status === 'fulfilled' && res.value) {
        for (const study of res.value) {
          const protocolSection = study.protocolSection;
          if (!protocolSection) continue;
          
          const identification = protocolSection.identificationModule;
          const status = protocolSection.statusModule;
          const design = protocolSection.designModule;
          const locationsModule = protocolSection.contactsLocationsModule?.locations || [];
          const sponsorModule = protocolSection.sponsorCollaboratorsModule;
          
          if (!identification?.nctId) continue;
          if (uniqueIds.has(identification.nctId)) continue;
          uniqueIds.add(identification.nctId);
          
          const countries = Array.from(new Set(locationsModule.map((l: any) => l.country).filter(Boolean))) as string[];
          
          trials.push({
            nctId: identification.nctId,
            title: identification.briefTitle || "N/A",
            status: status?.overallStatus || "Unknown",
            phase: design?.phases ? design.phases.join(', ') : "Unknown",
            enrollment: design?.enrollmentInfo?.count || 0,
            locations: locationsModule.length,
            countries: countries,
            investigator: sponsorModule?.responsibleParty?.investigatorFullName,
            sponsor: sponsorModule?.leadSponsor?.name || identity.name,
            completionDate: status?.completionDateStruct?.date,
            url: `https://clinicaltrials.gov/study/${identification.nctId}`
          });
        }
      }
    }
    
    return trials.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching Clinical Trials data for ${identity.name}:`, error);
    return [];
  }
}
