import { CompanyDetails } from "../types";
import { companies } from "../../directory/mock/companies";

export const getCompanyBySlug = (slug: string): CompanyDetails | null => {
  const baseCompany = companies.find(c => c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) || companies[0];
  
  if (!baseCompany) return null;

  return {
    ...baseCompany,
    name: "Pfizer Inc.",
    tagline: "Breakthroughs that change patients' lives.",
    coverImage: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&q=80&w=2000",
    logoUrl: "/images/logos/pfizer.svg",
    verified: true,
    rating: 4.8,
    profileCompletion: 95,
    category: "Pharmaceuticals",
    companyType: "Public (NYSE: PFE)",
    ownership: "Publicly Traded",
    stockExchange: "NYSE",
    isin: "US7170811035",
    tickerSymbol: "PFE",
    foundedYear: "1849",
    employees: "88,000+",
    revenue: "$58.5 Billion USD",
    headquarters: "New York, NY",
    
    city: "New York",
    state: "NY",
    country: "USA",
    founded: "Founded 1849",
    certifications: ["FDA Approved", "EMA Approved", "WHO GMP"],
    
    totalProducts: 350,
    approvedDrugs: 320,
    totalFdaApplications: 450,
    manufacturingSites: 35,
    countriesServed: 185,
    certificationsCount: 120,
    
    aboutDescription: "Pfizer Inc. is an American multinational pharmaceutical and biotechnology corporation headquartered in Manhattan, New York City. Pfizer develops and produces medicines and vaccines for immunology, oncology, cardiology, endocrinology, and neurology.",
    mission: "To be the premier, innovative biopharmaceutical company.",
    vision: "Breakthroughs that change patients' lives.",
    coreBusiness: ["Biopharmaceuticals", "Vaccines", "Oncology", "Internal Medicine", "Inflammation & Immunology"],
    keyMarkets: ["North America", "Europe", "Asia Pacific", "Latin America"],
    businessSegments: ["Primary Care", "Specialty Care", "Oncology"],
    brands: ["Prevnar 13", "Eliquis", "Ibrance", "Xeljanz", "Vyndaqel/Vyndamax", "Enbrel", "Braftovi"],
    parentCompany: "Pfizer Inc.",
    subsidiaries: ["Hospira", "Agouron Pharmaceuticals", "Arena Pharmaceuticals", "Global Blood Therapeutics"],
    
    history: "Pfizer was founded in 1849 by Charles Pfizer and Charles F. Erhart in New York City. The company experienced significant growth during World War II with the mass production of penicillin. Over the decades, Pfizer has grown through major acquisitions, including Warner-Lambert, Pharmacia, and Wyeth, becoming one of the world's largest pharmaceutical companies.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder
    videoDuration: "02:15",
    globalPresenceCount: "185 Countries",
    industry: "Pharmaceuticals",
    
    socialLinks: {
      linkedin: "https://linkedin.com/company/pfizer",
      twitter: "https://twitter.com/pfizer",
      facebook: "https://facebook.com/Pfizer",
      youtube: "https://youtube.com/user/Pfizer",
    },

    leadership: [
      { id: "1", name: "Albert Bourla", role: "Chairman and Chief Executive Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200", linkedin: "https://linkedin.com/in/albertbourla", bio: "Albert Bourla, DVM, Ph.D., is Chairman and CEO of Pfizer." },
      { id: "2", name: "David Denton", role: "Chief Financial Officer and Executive Vice President", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200", linkedin: "https://linkedin.com/in/daviddenton", bio: "David Denton serves as CFO and EVP." },
      { id: "3", name: "Mikael Dolsten", role: "Chief Scientific Officer, President, Pfizer Worldwide Research, Development and Medical", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200", bio: "Mikael Dolsten focuses on advancing the company's scientific leadership." },
      { id: "4", name: "Aamir Malik", role: "Chief U.S. Commercial Officer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200", linkedin: "https://linkedin.com/in/aamirmalik", bio: "Aamir Malik leads the U.S. commercial business." },
    ],

    therapeuticAreas: [
      { id: "1", name: "Oncology", icon: "Dna" },
      { id: "2", name: "Vaccines", icon: "Shield" },
      { id: "3", name: "Internal Medicine", icon: "Activity" },
      { id: "4", name: "Inflammation & Immunology", icon: "Users" },
      { id: "5", name: "Rare Disease", icon: "Star" },
    ],
    
    fdaApplications: [
      { id: "BLA125514", type: "BLA", number: "125514", brandName: "COMIRNATY", genericName: "COVID-19 Vaccine, mRNA", dosageForm: "Injection", status: "Approved", submissionDate: "2021-05-18", approvalDate: "2021-08-23", applicant: "BioNTech Manufacturing GmbH", strength: "30 mcg/0.3 mL", therapeuticArea: "Vaccines", fdaLink: "https://www.fda.gov/" },
      { id: "NDA022512", type: "NDA", number: "022512", brandName: "ELIQUIS", genericName: "Apixaban", dosageForm: "Tablet", status: "Approved", submissionDate: "2012-09-28", approvalDate: "2012-12-28", applicant: "Bristol Myers Squibb Co", strength: "2.5 mg, 5 mg", therapeuticArea: "Cardiology", fdaLink: "https://www.fda.gov/" },
      { id: "NDA207103", type: "NDA", number: "207103", brandName: "IBRANCE", genericName: "Palbociclib", dosageForm: "Capsule", status: "Approved", submissionDate: "2014-08-15", approvalDate: "2015-02-03", applicant: "Pfizer Inc", strength: "75 mg, 100 mg, 125 mg", therapeuticArea: "Oncology", fdaLink: "https://www.fda.gov/" },
      { id: "NDA203214", type: "NDA", number: "203214", brandName: "XELJANZ", genericName: "Tofacitinib Citrate", dosageForm: "Tablet", status: "Approved", submissionDate: "2011-12-21", approvalDate: "2012-11-06", applicant: "Pfizer Inc", strength: "5 mg, 10 mg", therapeuticArea: "Immunology", fdaLink: "https://www.fda.gov/" },
    ],
    
    productsList: [
      { id: "1", name: "COMIRNATY", genericName: "COVID-19 Vaccine, mRNA", type: "Prescription", category: "Vaccines", dosageForm: "Injection", strength: "30 mcg/0.3 mL", image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=200", therapeuticArea: "Infectious Disease", description: "Vaccine for active immunization to prevent COVID-19." },
      { id: "2", name: "ELIQUIS", genericName: "Apixaban", type: "Prescription", category: "Tablets", dosageForm: "Tablet", strength: "5 mg", image: "https://images.unsplash.com/photo-1584308666744-24d5e4a053c8?auto=format&fit=crop&q=80&w=200", therapeuticArea: "Cardiology", description: "Anticoagulant used to treat and prevent blood clots and to prevent stroke in people with nonvalvular atrial fibrillation." },
      { id: "3", name: "IBRANCE", genericName: "Palbociclib", type: "Prescription", category: "Capsules", dosageForm: "Capsule", strength: "125 mg", image: "https://images.unsplash.com/photo-1579549925206-ee0618ff077c?auto=format&fit=crop&q=80&w=200", therapeuticArea: "Oncology", description: "Kinase inhibitor indicated for the treatment of HR-positive, HER2-negative advanced or metastatic breast cancer." },
      { id: "4", name: "XELJANZ", genericName: "Tofacitinib", type: "Prescription", category: "Tablets", dosageForm: "Tablet", strength: "10 mg", image: "https://images.unsplash.com/photo-1550572017-edb380387431?auto=format&fit=crop&q=80&w=200", therapeuticArea: "Immunology", description: "Janus kinase (JAK) inhibitor used to treat rheumatoid arthritis, psoriatic arthritis, and ulcerative colitis." },
      { id: "5", name: "PREVNAR 20", genericName: "Pneumococcal 20-valent Conjugate Vaccine", type: "Prescription", category: "Vaccines", dosageForm: "Injection", strength: "0.5 mL", image: "https://images.unsplash.com/photo-1550572017-edb380387431?auto=format&fit=crop&q=80&w=200", therapeuticArea: "Infectious Disease", description: "Vaccine for active immunization for the prevention of pneumonia and invasive disease caused by Streptococcus pneumoniae." },
    ],

    featuredProducts: [
      { id: "1", name: "COMIRNATY", genericName: "COVID-19 Vaccine, mRNA", dosageForm: "Injection", image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=200" },
      { id: "2", name: "ELIQUIS", genericName: "Apixaban", dosageForm: "Tablet", image: "https://images.unsplash.com/photo-1584308666744-24d5e4a053c8?auto=format&fit=crop&q=80&w=200" },
      { id: "3", name: "IBRANCE", genericName: "Palbociclib", dosageForm: "Capsule", image: "https://images.unsplash.com/photo-1579549925206-ee0618ff077c?auto=format&fit=crop&q=80&w=200" },
      { id: "4", name: "XELJANZ", genericName: "Tofacitinib", dosageForm: "Tablet", image: "https://images.unsplash.com/photo-1550572017-edb380387431?auto=format&fit=crop&q=80&w=200" },
    ],

    facilitiesList: [
      { id: "1", name: "Kalamazoo Manufacturing Site", type: "Manufacturing", address: "7000 Portage Road", city: "Kalamazoo", country: "USA", certifications: ["USFDA", "EMA"], image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", productsManufactured: ["API", "Sterile Injectables", "Solid Oral Dose"], capacity: "3.5 Billion Doses/Year", googleMapsLink: "https://maps.google.com/?q=Kalamazoo+MI" },
      { id: "2", name: "Puurs Manufacturing Plant", type: "Manufacturing", address: "Rijksweg 12", city: "Puurs", country: "Belgium", certifications: ["USFDA", "EMA", "FAMHP"], image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400", productsManufactured: ["Vaccines", "Sterile Injectables"], capacity: "400 Million Vials/Year", googleMapsLink: "https://maps.google.com/?q=Puurs+Belgium" },
      { id: "3", name: "Ringaskiddy API Site", type: "Manufacturing", address: "Ringaskiddy", city: "Cork", country: "Ireland", certifications: ["USFDA", "EMA", "HPRA"], image: "https://images.unsplash.com/photo-1563261765-a681c20632a6?auto=format&fit=crop&q=80&w=400", productsManufactured: ["API"], capacity: "2000 Metric Tons/Year", googleMapsLink: "https://maps.google.com/?q=Ringaskiddy+Ireland" },
    ],
    
    certificationsList: [
      { id: "1", name: "US FDA", authority: "US Food and Drug Administration", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/FDA_logo.svg/300px-FDA_logo.svg.png", status: "Active", issueDate: "2010-01-01", downloadUrl: "#" },
      { id: "2", name: "EMA", authority: "European Medicines Agency", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/European_Medicines_Agency_logo.svg", status: "Active", issueDate: "2012-05-15", downloadUrl: "#" },
      { id: "3", name: "WHO GMP", authority: "World Health Organization", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/300px-WHO_logo.svg.png", status: "Active", issueDate: "2015-11-20", downloadUrl: "#" },
      { id: "4", name: "ISO 9001:2015", authority: "International Organization for Standardization", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ISO_Logo_%28Red_square%29.svg/200px-ISO_Logo_%28Red_square%29.svg.png", status: "Active", downloadUrl: "#" },
    ],
    
    latestNews: [
      { id: "1", title: "Pfizer Announces Strong Fourth-Quarter and Full-Year 2023 Results", date: "January 30, 2024", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=300", category: "Investor News", summary: "Pfizer reported solid operational revenue growth for the full year 2023, excluding COVID-19 products.", source: "Pfizer Press", url: "#" },
      { id: "2", title: "Pfizer Receives FDA Approval for Novel Oncology Therapy", date: "February 15, 2024", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300", category: "Press Releases", summary: "The FDA has approved Pfizer's new targeted therapy for the treatment of advanced solid tumors.", source: "Reuters", url: "#" },
      { id: "3", title: "Pfizer Completes Acquisition of Seagen", date: "December 14, 2023", image: "https://images.unsplash.com/photo-1507675920812-be2069bf6fa3?auto=format&fit=crop&q=80&w=300", category: "Acquisitions", summary: "Pfizer successfully completed the acquisition of Seagen Inc., significantly expanding its oncology portfolio.", source: "Bloomberg", url: "#" },
    ],

    documents: [
      { id: "1", title: "2023 Annual Report", type: "PDF", category: "Annual Reports", size: "12.4 MB", date: "March 15, 2024", url: "#" },
      { id: "2", title: "Q4 2023 Earnings Presentation", type: "PPTX", category: "Investor Presentations", size: "8.1 MB", date: "January 30, 2024", url: "#" },
      { id: "3", title: "2023 ESG Report", type: "PDF", category: "ESG Reports", size: "5.5 MB", date: "July 10, 2023", url: "#" },
      { id: "doc-5", title: "NORVASC Prescribing Information", type: "PDF", category: "Certificates", size: "1.2 MB", date: "August 20, 2022", url: "#" },
      { id: "doc-6", title: "Global Code of Conduct", type: "PDF", category: "Brochures", size: "1.8 MB", date: "January 15, 2023", url: "#" },
    ],
    
    contactInfo: {
      address: "66 Hudson Boulevard East, New York, NY 10001-2192",
      email: "contact@pfizer.com",
      phone: "+1 (212) 733-2323",
      website: "www.pfizer.com",
      mapCoordinates: { lat: 40.7551, lng: -74.0011 }
    },
    
    performance: [
      {
        period: "FY 2023",
        revenueValue: "$58.5B",
        revenueGrowth: "-41%",
        profitValue: "$2.1B",
        profitGrowth: "-93%",
        chartData: [
          { month: 'Q1', value: 18.28 },
          { month: 'Q2', value: 12.73 },
          { month: 'Q3', value: 13.23 },
          { month: 'Q4', value: 14.25 },
        ],
        kpis: [
          { label: "Operational Growth (Non-COVID)", value: "+7%", trend: "up" },
          { label: "R&D Expense", value: "$10.7B", trend: "up" },
          { label: "Diluted EPS", value: "$0.37", trend: "down" }
        ]
      },
      {
        period: "FY 2022",
        revenueValue: "$100.3B",
        revenueGrowth: "+23%",
        profitValue: "$31.4B",
        profitGrowth: "+43%",
        chartData: [
          { month: 'Q1', value: 25.66 },
          { month: 'Q2', value: 27.74 },
          { month: 'Q3', value: 22.64 },
          { month: 'Q4', value: 24.29 },
        ],
        kpis: [
          { label: "Operational Growth", value: "+30%", trend: "up" },
          { label: "R&D Expense", value: "$11.4B", trend: "up" },
          { label: "Diluted EPS", value: "$5.47", trend: "up" }
        ]
      }
    ],
    
    keyHighlights: [
      { icon: "Trophy", title: "Top Pharmaceutical Company", description: "Consistently ranked among the world's leading biopharmaceutical companies." },
      { icon: "FlaskConical", title: "$10.7B+ in R&D", description: "Significant investment in research and development to discover new treatments." },
      { icon: "Globe", title: "185 Countries", description: "Global reach, providing medicines to patients in over 185 countries." },
      { icon: "HeartPulse", title: "Hundreds of Clinical Trials", description: "Robust pipeline spanning multiple therapeutic areas." },
    ],

    timeline: [
      { year: "1849", title: "Founded", description: "Charles Pfizer and Charles F. Erhart found Charles Pfizer & Company in Brooklyn, New York.", type: "Founded" },
      { year: "1944", title: "Penicillin Production", description: "Pfizer pioneers the mass production of penicillin, using deep-tank fermentation, supplying the Allied forces during WWII.", type: "Major Expansions" },
      { year: "1950", title: "Terramycin Approval", description: "Pfizer's first proprietary pharmaceutical product, Terramycin (oxytetracycline), is approved.", type: "FDA Milestones" },
      { year: "2000", title: "Warner-Lambert Acquisition", description: "Pfizer acquires Warner-Lambert for $111.8 billion, gaining Lipitor.", type: "Acquisitions" },
      { year: "2009", title: "Wyeth Acquisition", description: "Pfizer acquires Wyeth for $68 billion, expanding its biopharmaceutical and vaccine capabilities.", type: "Acquisitions" },
      { year: "2020", title: "COVID-19 Vaccine", description: "Pfizer and BioNTech develop and receive authorization for the first mRNA COVID-19 vaccine.", type: "FDA Milestones" },
      { year: "2023", title: "Seagen Acquisition", description: "Pfizer acquires Seagen for $43 billion to bolster its oncology pipeline.", type: "Acquisitions" },
    ],

    gallery: [
      { url: "https://images.unsplash.com/photo-1563261765-a681c20632a6?auto=format&fit=crop&q=80&w=800", caption: "Global Headquarters, New York", category: "Corporate Office" },
      { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", caption: "Advanced Manufacturing Facility", category: "Manufacturing" },
      { url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800", caption: "R&D Laboratory", category: "Laboratories" },
      { url: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&q=80&w=800", caption: "Clean Room Packaging", category: "Packaging" },
    ],

    globalPresence: [
      { region: "North America", facilities: 15, employees: "30,000+", products: 300, regionalOffices: 5, manufacturingSites: 10, countries: ["USA", "Canada", "Mexico"] },
      { region: "Europe", facilities: 12, employees: "25,000+", products: 280, regionalOffices: 8, manufacturingSites: 8, countries: ["UK", "Germany", "France", "Belgium", "Ireland"] },
      { region: "Asia Pacific", facilities: 8, employees: "20,000+", products: 250, regionalOffices: 6, manufacturingSites: 5, countries: ["China", "Japan", "India", "Australia"] },
    ],

    jobs: [
      { id: "1", title: "Senior Research Scientist - Oncology", department: "Research & Development", location: "La Jolla, CA", type: "Full-Time", postedAt: "2 days ago", applyUrl: "#" },
      { id: "2", title: "Director, Clinical Operations", department: "Clinical Trials", location: "New York, NY", type: "Full-Time", postedAt: "1 week ago", applyUrl: "#" },
      { id: "3", title: "Manufacturing Technician", department: "Manufacturing", location: "Kalamazoo, MI", type: "Full-Time", postedAt: "3 days ago", applyUrl: "#" },
      { id: "4", title: "Regulatory Affairs Manager", department: "Regulatory", location: "Remote / USA", type: "Full-Time", postedAt: "5 days ago", applyUrl: "#" },
    ],

    relatedCompanies: [
      { id: "johnson-johnson", name: "Johnson & Johnson", logo: "/images/logos/pfizer.svg", industry: "Pharmaceuticals", location: "New Brunswick, NJ" }, // Using pfizer logo as placeholder
      { id: "merck", name: "Merck & Co.", logo: "/images/logos/merck.svg", industry: "Pharmaceuticals", location: "Rahway, NJ" },
      { id: "novartis", name: "Novartis", logo: "/images/logos/iqvia.svg", industry: "Pharmaceuticals", location: "Basel, Switzerland" },
      { id: "roche", name: "Roche", logo: "/images/logos/thermofisher.svg", industry: "Pharmaceuticals", location: "Basel, Switzerland" },
    ]
  };
};
