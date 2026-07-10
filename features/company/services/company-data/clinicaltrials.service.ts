/**
 * ClinicalTrials Collection Service
 * Fetches clinical studies data from ClinicalTrials.gov API v2.
 */

import { CompanyIdentity } from './identity.service';
import { CompanyDetails } from '../../types';

const CLINICAL_TRIALS_API = 'https://clinicaltrials.gov/api/v2/studies';

export async function getClinicalTrials(identity: CompanyIdentity, limit: number = 20): Promise<NonNullable<CompanyDetails['clinicalTrials']>> {
  try {
    if (!identity.name) return [];

    const terms = Array.from(new Set([identity.name, identity.legalName, ...identity.aliases])).filter(Boolean);
    
    // CT.gov v2 API queries
    const fetchPromises: Promise<unknown>[] = [];
    
    terms.forEach(term => {
      // Search by sponsor
      fetchPromises.push(
        fetch(`${CLINICAL_TRIALS_API}?query.sponsor=${encodeURIComponent(term)}&pageSize=100&countTotal=true`, { cache: 'no-store' })
          .then(res => res.ok ? res.json() : null).catch(() => null)
      );
      // Search by term (catches investigator, collaborator, condition)
      fetchPromises.push(
        fetch(`${CLINICAL_TRIALS_API}?query.term=${encodeURIComponent(term)}&pageSize=100&countTotal=true`, { cache: 'no-store' })
          .then(res => res.ok ? res.json() : null).catch(() => null)
      );
    });

    // Wait for all to finish, with a global timeout wrapper around the promise array
    const results = await Promise.allSettled(fetchPromises);
    
    const trials: NonNullable<CompanyDetails['clinicalTrials']> = [];
    const uniqueIds = new Set();
    
    for (const res of results) {
      if (res.status === 'fulfilled' && (res.value as { studies?: unknown[] })?.studies) {
        for (const study of (res.value as { studies: { protocolSection?: unknown }[] }).studies) {
          const protocolSection = study.protocolSection as {
            identificationModule?: { nctId?: string; briefTitle?: string };
            statusModule?: { overallStatus?: string; completionDateStruct?: { date?: string } };
            designModule?: { phases?: string[]; enrollmentInfo?: { count?: number } };
            contactsLocationsModule?: { locations?: { country?: string }[] };
            sponsorCollaboratorsModule?: { responsibleParty?: { investigatorFullName?: string }; leadSponsor?: { name?: string } };
          };
          if (!protocolSection) continue;
          
          const identification = protocolSection.identificationModule;
          const status = protocolSection.statusModule;
          const design = protocolSection.designModule;
          const locationsModule = protocolSection.contactsLocationsModule?.locations || [];
          const sponsorModule = protocolSection.sponsorCollaboratorsModule;
          
          if (!identification?.nctId) continue;
          if (uniqueIds.has(identification.nctId)) continue;
          uniqueIds.add(identification.nctId);
          
          const countries = Array.from(new Set(locationsModule.map((l: { country?: string }) => l.country).filter(Boolean))) as string[];
          
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
