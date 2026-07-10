import { CompanyIdentity } from './identity.service';
import { CompanyDetails } from '../../types';

const CHEMBL_API = 'https://www.ebi.ac.uk/chembl/api/data';

export async function getCompanyDrugTargets(products: NonNullable<CompanyDetails['productsList']>): Promise<NonNullable<CompanyDetails['drugTargets']>> {
  try {
    if (!products || products.length === 0) return [];
    
    // We only want to search unique generic names to prevent over-querying
    const uniqueDrugs = Array.from(new Set(products.map(p => p.genericName.split(',')[0].trim().toLowerCase()))).filter(Boolean).slice(0, 5); // Limit to top 5 drugs for speed
    
    const targets: NonNullable<CompanyDetails['drugTargets']> = [];
    const fetchPromises = uniqueDrugs.map(drug => {
      // Find the chembl molecule ID first
      const searchUrl = `${CHEMBL_API}/molecule?pref_name__icontains=${encodeURIComponent(drug)}&format=json`;
      
      return fetch(searchUrl, { next: { revalidate: 3600 } })
        .then(res => res.ok ? res.json() : null)
        .then(async (data) => {
          if (!data?.molecules || data.molecules.length === 0) return null;
          
          const chemblId = data.molecules[0].molecule_chembl_id;
          if (!chemblId) return null;
          
          // Fetch drug indications / targets
          const targetUrl = `${CHEMBL_API}/mechanism?molecule_chembl_id=${chemblId}&format=json`;
          const targetRes = await fetch(targetUrl, { next: { revalidate: 3600 } }).catch(() => null);
          if (!targetRes || !targetRes.ok) return null;
          
          return targetRes.json();
        })
        .catch(() => null);
    });

    const results = await Promise.allSettled(fetchPromises);
    const uniqueTargets = new Set();
    
    for (const res of results) {
      if (res.status === 'fulfilled' && res.value?.mechanisms) {
        for (const mech of res.value.mechanisms) {
          if (!mech.target_chembl_id || uniqueTargets.has(mech.target_chembl_id)) continue;
          uniqueTargets.add(mech.target_chembl_id);
          
          targets.push({
            targetName: mech.mechanism_of_action || 'Unknown Target',
            disease: mech.disease_efficacy ? 'Indicated Disease' : 'Research Target',
            score: mech.max_phase || 1,
            phase: mech.max_phase || undefined
          });
        }
      }
    }
    
    return targets;
  } catch (error) {
    console.error(`Error fetching ChEMBL data:`, error);
    return [];
  }
}
