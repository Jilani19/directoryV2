import { cache } from 'react';
import { CompanyIdentity } from '../identity.service';
import { getClinicalTrials } from '../clinicaltrials.service';
import { getOpenTargets } from '../opentargets.service';
import { getInternationalTrials } from '../who-ictrp.service';

const withTimeout = async <T>(name: string, companyName: string, promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> => {
  const start = Date.now();
  try {
    const result = await Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs))
    ]);
    return result;
  } catch (err) {
    return fallback;
  }
};

export const getClinicalData = cache(async (identity: CompanyIdentity) => {
  const name = identity.legalName || identity.name;
  const [trials, openTargets, whoTrials] = await Promise.all([
    withTimeout('ClinicalTrials', name, getClinicalTrials(identity, 100), 10000, []),
    withTimeout('OpenTargets', name, getOpenTargets(identity), 10000, []),
    withTimeout('WHO ICTRP', name, getInternationalTrials(identity), 10000, [])
  ]);

  const allTrials = [...trials, ...whoTrials];
  const uniqueTrials = new Map();
  allTrials.forEach(t => {
    if (t.nctId && !uniqueTrials.has(t.nctId)) uniqueTrials.set(t.nctId, t);
  });

  return {
    clinicalTrials: Array.from(uniqueTrials.values()),
    openTargetsData: openTargets,
    totalTrials: uniqueTrials.size
  };
});
