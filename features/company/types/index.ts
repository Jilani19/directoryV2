import { Company as BaseCompany } from "../../directory/mock/companies";

// Internal metadata tracking for verified fields
export interface IntelligenceField<T> {
  value: T;
  source: string; // e.g., 'Wikidata', 'SEC EDGAR', 'OpenFDA'
  sourceUrl?: string; // Direct link to the source if applicable
  lastUpdated?: string; // When the source claims it was updated
  lastSynced: string; // When our engine fetched it
  verificationStatus: "Verified" | "Unverified" | "Conflict";
  confidenceScore: number; // 0.0 to 1.0
  dataFreshness?: string; // e.g., 'Real-time', 'Daily', 'Weekly'
  apiUsed?: string; // Which API endpoint provided this
}

// Helper to easily define an intelligence array
export type IntelligenceArray<T> = IntelligenceField<T[]>;

export interface CompanyDetails extends BaseCompany {
  tagline?: string;
  coverImage?: string;
  totalProducts?: number;
  approvedDrugs?: number;
  totalFdaApplications?: number;
  manufacturingSites?: number;
  countriesServed?: number;
  certificationsCount?: number;
  rdCenters?: number;
  globalOffices?: number;
  
  aboutDescription?: string;
  mission?: string;
  vision?: string;
  coreBusiness?: string[];
  keyMarkets?: string[];
  businessSegments?: string[];
  brands?: string[];
  parentCompany?: string;
  subsidiaries?: string[];
  
  history?: string;
  videoUrl?: string;
  videoDuration?: string;
  revenue?: string;
  marketCap?: string;
  globalPresenceCount?: string;
  
  // Hero Metadata
  verified: boolean;
  rating?: number;
  profileCompletion?: number;
  companyType?: string; // e.g. Public, Private
  ownership?: string;
  stockExchange?: string;
  isin?: string;
  tickerSymbol?: string;
  foundedYear?: string;
  headquarters?: string;
  
  // Leadership / Contacts
  leadership?: {
    id: string;
    name: string;
    role: string;
    department?: string;
    yearsAtCompany?: string;
    experience?: string;
    image: string;
    linkedin?: string;
    officialProfile?: string;
    email?: string;
    phone?: string;
    bio?: string;
    education?: string;
    appointmentDate?: string;
    source?: string;
  }[];

  boardOfDirectors?: {
    id: string;
    name: string;
    role: string;
    type: "Independent Director" | "Executive Director" | "Non-Executive Director";
    image: string;
    committeeMemberships?: string[];
    bio?: string;
    education?: string;
    appointmentDate?: string;
    linkedin?: string;
    source?: string;
  }[];

  quickContacts?: {
    department: string;
    email?: string;
    phone?: string;
  }[];

  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
  
  therapeuticAreas?: {
    id: string;
    name: string;
    icon: string;
  }[];
  
  fdaApplications?: {
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
    therapeuticArea?: string;
    fdaLink?: string;
  }[];
  
  // Products List (for Products Tab)
  productsList?: {
    id: string;
    name: string;
    genericName: string;
    type: string; // e.g. "Prescription", "OTC", "API"
    category: string;
    dosageForm: string;
    strength: string;
    image: string;
    therapeuticArea: string;
    description?: string;
    approvalStatus?: string;
    manufacturer?: string;
    officialLink?: string;
    approvalDate?: string;
  }[];
  
  featuredProducts?: {
    id: string;
    name: string;
    genericName: string;
    dosageForm: string;
    image: string;
  }[];

  // Facilities
  facilitiesList?: {
    id: string;
    name: string;
    type: string; // e.g. "Manufacturing", "R&D", "Headquarters"
    address: string;
    city: string;
    country: string;
    certifications: string[]; 
    image?: string;
    productsManufactured?: string[];
    capacity?: string;
    googleMapsLink?: string;
    coordinates?: { lat: number, lng: number };
  }[];
  
  certificationsList?: {
    id: string;
    name: string;
    authority: string;
    image: string;
    issueDate?: string;
    validUntil?: string;
    status: "Active" | "Expired";
    downloadUrl?: string;
  }[];
  
  latestNews?: {
    id: string;
    title: string;
    date: string;
    image: string;
    category: "Press Releases" | "Investor News" | "Media Coverage" | "Awards" | "Acquisitions" | "Research";
    summary?: string;
    source?: string;
    url?: string;
  }[];

  documents?: {
    id: string;
    title: string;
    type: "PDF" | "DOCX" | "PPTX";
    category: "Financial Reports" | "Annual Reports" | "ESG Reports" | "Investor Presentations" | "Brochures" | "Certificates" | "Catalogs" | "Press Kits";
    size: string;
    date: string;
    url: string;
  }[];
  
  contactInfo?: {
    address: string;
    email?: string;
    phone?: string;
    website: string;
    mapCoordinates: { lat: number; lng: number };
  };
  
  performance?: {
    period: string; // e.g. "FY2023-24"
    revenueValue: string;
    revenueGrowth: string;
    profitValue: string;
    profitGrowth: string;
    chartData: { month: string; value: number }[];
    kpis: { label: string; value: string; trend: "up" | "down" | "neutral" }[];
  }[];

  financials?: {
    revenue?: string;
    netIncome?: string;
    ebitda?: string;
    marketCap?: string;
    assets?: string;
    cashFlow?: string;
    ipoDate?: string;
  };
  
  keyHighlights?: {
    icon: string;
    title: string;
    description: string;
  }[];

  timeline?: {
    year: string;
    title: string;
    description: string;
    type: "Founded" | "Major Expansions" | "FDA Milestones" | "Acquisitions" | "New Facilities" | "Awards" | "Current Status";
  }[];

  gallery?: {
    url: string;
    caption: string;
    category: "Corporate Office" | "Manufacturing" | "Laboratories" | "Warehouses" | "Packaging" | "Research Centers";
  }[];

  globalPresence?: {
    region: string;
    facilities: number;
    employees: string;
    products: number;
    regionalOffices: number;
    manufacturingSites: number;
    countries: string[];
  }[];

  jobs?: {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    postedAt: string;
    applyUrl: string;
  }[];
  careersPage?: string;

  // Requested Data Sheet Fields
  tradeName?: string;
  lei?: string;
  cik?: string;
  duns?: string;
  jurisdiction?: string;
  incorporationDate?: string;
  ceoLinkedIn?: string;
  fundingStage?: string;
  fundingTotal?: string;
  vcPeInvestors?: string[];
  revenueGrowth?: string;
  openJobCount?: number;
  productStage?: string;
  technologyPlatform?: string;
  targetMolecule?: string[];
  patientPopulation?: string;
  gxpCompliance?: string[];
  regulatoryAgencies?: string[];
  whoPrequalification?: boolean;
  ichCompliance?: boolean;
  dmfCount?: number;
  warningLettersCount?: number;
  partnershipHistory?: string[];
  mergersAcquisitions?: string[];
  licensingDeals?: string[];
  contractServices?: string[];
  awards?: string[];
  profileCompletenessScore?: number;
  
  // Calendars & Activity
  ipoTracker?: string;
  catalystCalendar?: string[];
  pdufaCalendar?: string[];
  historicalPdufa?: string[];
  bioPharmaMeetings?: string[];
  bioTechInvestors?: string[];
  fundingActivity?: string[];
  culture?: string;
  articles?: string[];
  events?: string[];
  library?: string[];
  
  // R&D
  drugsInDevelopment?: number;
  fdfDossiers?: number;
  fdaAudited?: boolean;

  relatedCompanies?: {
    id: string;
    name: string;
    logo: string;
    industry: string;
    location: string;
  }[];

  // Clinical Trials
  clinicalTrials?: {
    nctId: string;
    title: string;
    phase: string;
    status: string;
    enrollment: number;
    locations: number;
    countries: string[];
    investigator?: string;
    sponsor: string;
    completionDate?: string;
    url: string;
  }[];

  // Patents
  patents?: {
    patentNumber: string;
    title: string;
    inventors: string[];
    assignee: string;
    grantDate: string;
    status: string;
    url: string;
  }[];

  // Publications
  publications?: {
    pmid: string;
    title: string;
    journal: string;
    authors: string[];
    publicationDate: string;
    doi?: string;
    abstract?: string;
    url: string;
  }[];

  // NIH RePORTER Grants
  grants?: {
    id: string;
    title: string;
    amount: number;
    agency: string;
    year: string;
    piName?: string;
  }[];

  // Open Targets / ChEMBL
  drugTargets?: {
    targetName: string;
    disease: string;
    score: number;
    phase?: number;
  }[];

  // ORCID Researchers
  researchers?: {
    orcid: string;
    name: string;
    affiliation: string;
    url: string;
  }[];
}
