import { CompanyIdentity } from './identity.service';

export interface InternationalTrial {
  nctId: string; // Using same interface as clinical trials for easier merging
  title: string;
  phase: string;
  status: string;
  enrollment: number;
  locations: number;
  countries: string[];
  sponsor: string;
  url: string;
}

// Note: WHO ICTRP does not provide a free real-time JSON REST API. 
// This service simulates the integration point for a nightly batch process 
// that would download and parse the WHO ICTRP CSV dumps.
export async function getInternationalTrials(identity: CompanyIdentity): Promise<InternationalTrial[]> {
  if (!identity.legalName && !identity.name) return [];

  const searchQuery = identity.legalName || identity.name;
  console.log(`[WHO ICTRP] Fetching international clinical trials for: ${searchQuery}`);
  
  // In a full production environment, this would query our localized database 
  // populated by a nightly cron job downloading WHO ICTRP CSVs.
  // For real-time execution, we'll gracefully return empty to not block the aggregator,
  // as HTML scraping trialsearch.who.int is too slow and fragile for a real-time SSR load.

  return [];
}
