import { Company as BaseCompany } from "../../directory/mock/companies";

export interface CompanyDetails extends BaseCompany {
  tagline?: string;
  coverImage?: string;
  totalProducts?: number;
  approvedDrugs?: number;
  totalFdaApplications?: number;
  manufacturingSites?: number;
  countriesServed?: number;
  certificationsCount?: number;
  
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
  }[];

  boardOfDirectors?: {
    id: string;
    name: string;
    role: string;
    type: "Independent Director" | "Executive Director" | "Non-Executive Director";
    image: string;
    committeeMemberships?: string[];
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
    category: string; // e.g. Tablets, Capsules, Injectables, Vaccines, Biologics, API, Medical Devices
    dosageForm: string;
    strength: string;
    image: string;
    therapeuticArea: string;
    description?: string;
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
    certifications: string[]; // e.g. ["USFDA", "EMA"]
    image?: string;
    productsManufactured?: string[];
    capacity?: string;
    googleMapsLink?: string;
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
    email: string;
    phone: string;
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

  relatedCompanies?: {
    id: string;
    name: string;
    logo: string;
    industry: string;
    location: string;
  }[];
}
