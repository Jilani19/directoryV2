const SEC_TICKER_TO_CIK_URL = 'https://www.sec.gov/files/company_tickers.json';

export interface SecData {
  cik: string;
  name: string;
  ticker?: string;
  exchange?: string;
  sic?: string;
  sicDescription?: string;
  stateOfIncorporation?: string;
  fiscalYearEnd?: string;
  businessAddress?: {
    street1?: string;
    street2?: string;
    city?: string;
    stateOrProvince?: string;
    zipCode?: string;
  };
  filings?: {
    accessionNumber: string[];
    filingDate: string[];
    form: string[];
    primaryDocument: string[];
  };
}

export async function getEntityFromSec(companyName: string, tickerSymbol?: string): Promise<SecData | null> {
  try {
    const fetchOptions = {
      headers: {
        'User-Agent': 'cGxPDirectory contact@cgxp.directory'
      },
      next: { revalidate: 86400 } // 24 hours cache
    };

    // First fetch the CIK mapping to find the company
    const tickerRes = await fetch(SEC_TICKER_TO_CIK_URL, fetchOptions);
    if (!tickerRes.ok) return null;

    const tickerData = await tickerRes.json();
    let cikStr = "";

    // If ticker is provided, try direct match. Otherwise, string match on title
    const searchTarget = (tickerSymbol || companyName).toLowerCase();
    
    for (const key in tickerData) {
      const entry = tickerData[key];
      if (tickerSymbol && entry.ticker.toLowerCase() === searchTarget) {
        cikStr = entry.cik_str.toString().padStart(10, '0');
        break;
      } else if (!tickerSymbol && entry.title.toLowerCase().includes(searchTarget)) {
        cikStr = entry.cik_str.toString().padStart(10, '0');
        break;
      }
    }

    if (!cikStr) return null;

    // Fetch the detailed submission data using the CIK
    const submissionsUrl = `https://data.sec.gov/submissions/CIK${cikStr}.json`;
    const subRes = await fetch(submissionsUrl, fetchOptions);
    
    if (!subRes.ok) return null;

    const subData = await subRes.json();
    
    return {
      cik: cikStr,
      name: subData.name,
      ticker: subData.tickers?.[0],
      exchange: subData.exchanges?.[0],
      sic: subData.sic,
      sicDescription: subData.sicDescription,
      stateOfIncorporation: subData.stateOfIncorporation,
      fiscalYearEnd: subData.fiscalYearEnd,
      businessAddress: subData.addresses?.business,
      filings: subData.filings?.recent ? {
        accessionNumber: subData.filings.recent.accessionNumber,
        filingDate: subData.filings.recent.filingDate,
        form: subData.filings.recent.form,
        primaryDocument: subData.filings.recent.primaryDocument
      } : undefined
    };

  } catch (error) {
    console.error(`Error fetching SEC data for ${companyName}:`, error);
    return null;
  }
}
