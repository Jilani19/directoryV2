export interface DocumentItem {
  id: string;
  title: string;
  type: "PDF" | "DOCX" | "PPTX";
  category: "Financial Reports" | "Annual Reports" | "ESG Reports" | "Investor Presentations" | "Brochures" | "Certificates" | "Catalogs" | "Press Kits";
  size: string;
  date: string;
  url: string;
  source: string;
}

export function generateDocumentSearchLinks(companyName: string, ticker?: string): DocumentItem[] {
  const currentYear = new Date().getFullYear();
  
  const documents: DocumentItem[] = [];

  // 1. Annual Report / 10-K
  if (ticker) {
    documents.push({
      id: "doc-10k",
      title: `${currentYear - 1} Annual Report (10-K)`,
      type: "PDF",
      category: "Annual Reports",
      size: "External Link",
      date: `${currentYear}-02-15`,
      url: `https://www.sec.gov/edgar/search/#/q=${ticker}&filter_haslabel=Annual%2520Report`,
      source: "SEC EDGAR Search"
    });
  } else {
    documents.push({
      id: "doc-annual",
      title: `${currentYear - 1} Annual Report`,
      type: "PDF",
      category: "Annual Reports",
      size: "External Link",
      date: `${currentYear}-01-01`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`${companyName} Annual Report ${currentYear - 1} filetype:pdf`)}`,
      source: "Google Search"
    });
  }

  // 2. ESG Report
  documents.push({
    id: "doc-esg",
    title: `${currentYear - 1} ESG / Sustainability Report`,
    type: "PDF",
    category: "ESG Reports",
    size: "External Link",
    date: `${currentYear}-04-01`,
    url: `https://www.google.com/search?q=${encodeURIComponent(`${companyName} ESG Sustainability Report ${currentYear - 1} filetype:pdf`)}`,
    source: "Google Search"
  });

  // 3. Investor Presentation
  documents.push({
    id: "doc-investor",
    title: `Q1 ${currentYear} Investor Presentation`,
    type: "PDF",
    category: "Investor Presentations",
    size: "External Link",
    date: `${currentYear}-05-01`,
    url: `https://www.google.com/search?q=${encodeURIComponent(`${companyName} Investor Presentation ${currentYear} filetype:pdf`)}`,
    source: "Google Search"
  });

  // 4. ISO/GMP Certificate
  documents.push({
    id: "doc-iso",
    title: `ISO 9001 / GMP Certification`,
    type: "PDF",
    category: "Certificates",
    size: "External Link",
    date: "Available on Request",
    url: `https://www.google.com/search?q=${encodeURIComponent(`${companyName} GMP ISO Certificate`)}`,
    source: "Google Search"
  });

  return documents;
}
