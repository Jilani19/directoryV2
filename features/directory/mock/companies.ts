export interface Company {
  id: string;
  name: string;
  category: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  logoUrl?: string;
  initials: string;
  color: string;
  verified: boolean;
  proximityBadge?: string;
  founded: string;
  employees: string;
  website: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  description: string;
  certifications?: string[];
  products?: string[];
  services?: string[];
  companyType?: string;
  ownership?: string;
  latitude?: number;
  longitude?: number;
  district?: string;
}



export const companies: Company[] = [
  {
    "id": "pfizer-357",
    "name": "Pfizer",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "United States",
    "state": "New York",
    "city": "New York",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Pfizer_logo.svg",
    "initials": "PF",
    "color": "violet-700",
    "verified": true,
    "founded": "1849",
    "employees": "50000+",
    "website": "https://www.pfizer.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/pfizer"
    },
    "description": "A premier innovative biopharmaceutical company, discovering and developing medicines.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 40.7127281,
    "longitude": -74.0060152,
    "district": "New York"
  },
  {
    "id": "johnson---johnson-32",
    "name": "Johnson & Johnson",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "United States",
    "state": "New Jersey",
    "city": "New Brunswick",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Johnson_%26_Johnson_Logo.svg",
    "initials": "JO",
    "color": "teal-600",
    "verified": true,
    "founded": "1886",
    "employees": "50000+",
    "website": "https://www.jnj.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/jnj"
    },
    "description": "A leading broad-based healthcare company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 40.4936119,
    "longitude": -74.4436416,
    "district": "Middlesex County"
  },
  {
    "id": "novartis-520",
    "name": "Novartis",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Switzerland",
    "state": "Basel-Stadt",
    "city": "Basel",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Novartis-Logo.svg",
    "initials": "NO",
    "color": "violet-700",
    "verified": true,
    "founded": "1996",
    "employees": "50000+",
    "website": "https://www.novartis.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/novartis"
    },
    "description": "Reimagining medicine to improve and extend people's lives.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 47.5581077,
    "longitude": 7.5878261,
    "district": "Basel"
  },
  {
    "id": "roche-431",
    "name": "Roche",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Switzerland",
    "state": "Basel-Stadt",
    "city": "Basel",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Hoffmann-La_Roche_logo.svg",
    "initials": "RO",
    "color": "rose-600",
    "verified": true,
    "founded": "1896",
    "employees": "50000+",
    "website": "https://www.roche.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/roche"
    },
    "description": "A pioneer in healthcare, providing medicines and diagnostics.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 47.5581077,
    "longitude": 7.5878261,
    "district": "Basel"
  },
  {
    "id": "merck---co--122",
    "name": "Merck & Co.",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "United States",
    "state": "New Jersey",
    "city": "Rahway",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Merck_%26_Co.svg",
    "initials": "ME",
    "color": "purple-600",
    "verified": true,
    "founded": "1891",
    "employees": "50000+",
    "website": "https://www.merck.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/merck"
    },
    "description": "Using the power of leading-edge science to save and improve lives.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 40.6081591,
    "longitude": -74.2776468,
    "district": "Union County"
  },
  {
    "id": "abbvie-33",
    "name": "AbbVie",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Illinois",
    "city": "North Chicago",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/8/86/AbbVie_logo.svg",
    "initials": "AB",
    "color": "orange-500",
    "verified": false,
    "founded": "2013",
    "employees": "50000+",
    "website": "https://www.abbvie.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/abbvie"
    },
    "description": "A highly focused research-driven biopharmaceutical company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 42.327724,
    "longitude": -87.8394189,
    "district": "Lake County"
  },
  {
    "id": "sanofi-820",
    "name": "Sanofi",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "France",
    "state": "Île-de-France",
    "city": "Paris",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Sanofi_logo.svg",
    "initials": "SA",
    "color": "teal-600",
    "verified": false,
    "founded": "1973",
    "employees": "50000+",
    "website": "https://www.sanofi.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/sanofi"
    },
    "description": "An innovative global healthcare company, driven by one purpose: we chase the miracles of science to improve people's lives.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 48.8534951,
    "longitude": 2.3483915,
    "district": "Paris"
  },
  {
    "id": "astrazeneca-381",
    "name": "AstraZeneca",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "United Kingdom",
    "state": "England",
    "city": "Cambridge",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/9/95/AstraZeneca_logo.svg",
    "initials": "AS",
    "color": "blue-600",
    "verified": true,
    "founded": "1999",
    "employees": "50000+",
    "website": "https://www.astrazeneca.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/astrazeneca"
    },
    "description": "A global, science-led biopharmaceutical company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 52.1975846,
    "longitude": 0.1391537,
    "district": "Cambridgeshire"
  },
  {
    "id": "bristol-myers-squibb-82",
    "name": "Bristol Myers Squibb",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "United States",
    "state": "New York",
    "city": "New York",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Bristol-Myers_Squibb_logo.svg",
    "initials": "BR",
    "color": "teal-600",
    "verified": true,
    "founded": "1887",
    "employees": "10000+",
    "website": "https://www.bms.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bms"
    },
    "description": "To discover, develop and deliver innovative medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 40.7127281,
    "longitude": -74.0060152,
    "district": "New York"
  },
  {
    "id": "gsk-823",
    "name": "GSK",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "United Kingdom",
    "state": "England",
    "city": "London",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/GSK_logo_2022.svg",
    "initials": "GS",
    "color": "orange-500",
    "verified": true,
    "founded": "2000",
    "employees": "50000+",
    "website": "https://www.gsk.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/gsk"
    },
    "description": "A global biopharma company with a purpose to unite science, technology and talent to get ahead of disease together.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 51.5074456,
    "longitude": -0.1277653,
    "district": "London"
  },
  {
    "id": "eli-lilly-and-company-532",
    "name": "Eli Lilly and Company",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "United States",
    "state": "Indiana",
    "city": "Indianapolis",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Lilly_%28pharmaceutical_company%29_logo.svg",
    "initials": "EL",
    "color": "rose-600",
    "verified": false,
    "founded": "1876",
    "employees": "10000+",
    "website": "https://www.lilly.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/lilly"
    },
    "description": "Uniting caring with discovery to create medicines that make life better.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 39.7683331,
    "longitude": -86.1583502,
    "district": "Marion County"
  },
  {
    "id": "novo-nordisk-765",
    "name": "Novo Nordisk",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Denmark",
    "state": "Capital Region",
    "city": "Bagsværd",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/9/93/Novo_Nordisk_Logo_RGB.svg",
    "initials": "NO",
    "color": "teal-600",
    "verified": true,
    "founded": "1923",
    "employees": "50000+",
    "website": "https://www.novonordisk.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/novonordisk"
    },
    "description": "Driving change to defeat serious chronic diseases.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 55.7583936,
    "longitude": 12.4573112,
    "district": "Bagsværd"
  },
  {
    "id": "amgen-216",
    "name": "Amgen",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "California",
    "city": "Thousand Oaks",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/7/71/Amgen_logo.svg",
    "initials": "AM",
    "color": "violet-700",
    "verified": true,
    "founded": "1980",
    "employees": "10000+",
    "website": "https://www.amgen.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/amgen"
    },
    "description": "A pioneer in the science of using living cells to make biologic medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 34.1705609,
    "longitude": -118.8375937,
    "district": "Ventura County"
  },
  {
    "id": "gilead-sciences-340",
    "name": "Gilead Sciences",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "California",
    "city": "Foster City",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/40/Gilead_Sciences_logo.svg",
    "initials": "GI",
    "color": "emerald-600",
    "verified": false,
    "founded": "1987",
    "employees": "10000+",
    "website": "https://www.gilead.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/gilead"
    },
    "description": "A biopharmaceutical company that has pursued and achieved breakthroughs in medicine.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 37.5600336,
    "longitude": -122.2688522,
    "district": "San Mateo County"
  },
  {
    "id": "takeda-pharmaceutical-492",
    "name": "Takeda Pharmaceutical",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Tokyo",
    "city": "Tokyo",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Takeda_Pharmaceutical_Company.svg",
    "initials": "TA",
    "color": "purple-600",
    "verified": false,
    "founded": "1781",
    "employees": "50000+",
    "website": "https://www.takeda.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/takeda"
    },
    "description": "A patient-focused, values-based, R&D-driven global biopharmaceutical company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 35.6812546,
    "longitude": 139.766706,
    "district": "Tokyo"
  },
  {
    "id": "bayer-687",
    "name": "Bayer",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Germany",
    "state": "North Rhine-Westphalia",
    "city": "Leverkusen",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/5/50/Bayer.svg",
    "initials": "BA",
    "color": "blue-600",
    "verified": true,
    "founded": "1863",
    "employees": "50000+",
    "website": "https://www.bayer.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bayer"
    },
    "description": "A life science company with a more than 150-year history.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 51.0324743,
    "longitude": 6.9881194,
    "district": "Leverkusen"
  },
  {
    "id": "boehringer-ingelheim-185",
    "name": "Boehringer Ingelheim",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Germany",
    "state": "Rhineland-Palatinate",
    "city": "Ingelheim am Rhein",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Boehringer-Ingelheim-Logo.svg",
    "initials": "BO",
    "color": "emerald-600",
    "verified": false,
    "founded": "1885",
    "employees": "50000+",
    "website": "https://www.boehringer-ingelheim.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/boehringer-ingelheim"
    },
    "description": "Research-driven pharmaceutical company.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 49.9752749,
    "longitude": 8.0547274,
    "district": "Landkreis Mainz-Bingen"
  },
  {
    "id": "thermo-fisher-scientific-417",
    "name": "Thermo Fisher Scientific",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Waltham",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/8/82/Thermo_Fisher_Scientific_logo.svg",
    "initials": "TH",
    "color": "teal-600",
    "verified": false,
    "founded": "1956",
    "employees": "50000+",
    "website": "https://www.thermofisher.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/thermofisher"
    },
    "description": "The world leader in serving science.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 42.3762385,
    "longitude": -71.2355644,
    "district": "Middlesex County"
  },
  {
    "id": "danaher-761",
    "name": "Danaher",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "United States",
    "state": "Washington, D.C.",
    "city": "Washington",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/1/17/Danaher_Corporation_logo.svg",
    "initials": "DA",
    "color": "purple-600",
    "verified": true,
    "founded": "1969",
    "employees": "50000+",
    "website": "https://www.danaher.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/danaher"
    },
    "description": "A global science and technology innovator committed to helping our customers solve complex challenges.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 38.8898398,
    "longitude": -77.0402691,
    "district": "Washington"
  },
  {
    "id": "medtronic-249",
    "name": "Medtronic",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "Ireland",
    "state": "Leinster",
    "city": "Dublin",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/47/Medtronic_logo.svg",
    "initials": "ME",
    "color": "violet-700",
    "verified": true,
    "founded": "1949",
    "employees": "50000+",
    "website": "https://www.medtronic.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/medtronic"
    },
    "description": "Transforming healthcare through technology.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 53.3493795,
    "longitude": -6.2605593,
    "district": "County Dublin"
  },
  {
    "id": "stryker-387",
    "name": "Stryker",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "Michigan",
    "city": "Kalamazoo",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Stryker_Corporation_logo.svg",
    "initials": "ST",
    "color": "emerald-600",
    "verified": true,
    "founded": "1941",
    "employees": "10000+",
    "website": "https://www.stryker.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/stryker"
    },
    "description": "One of the world's leading medical technology companies.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 42.291707,
    "longitude": -85.5872286,
    "district": "Kalamazoo County"
  },
  {
    "id": "abbott-42",
    "name": "Abbott",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "Illinois",
    "city": "Abbott Park",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Abbott_Laboratories_logo.svg",
    "initials": "AB",
    "color": "teal-600",
    "verified": false,
    "founded": "1888",
    "employees": "50000+",
    "website": "https://www.abbott.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/abbott"
    },
    "description": "Creating breakthrough products – in diagnostics, medical devices, nutrition and branded generic pharmaceuticals.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 41.7196165,
    "longitude": -87.6220913,
    "district": "Cook County"
  },
  {
    "id": "siemens-healthineers-109",
    "name": "Siemens Healthineers",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "Germany",
    "state": "Bavaria",
    "city": "Erlangen",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/7/71/Siemens_Healthineers_logo.svg",
    "initials": "SI",
    "color": "violet-700",
    "verified": false,
    "founded": "2015",
    "employees": "50000+",
    "website": "https://www.siemens-healthineers.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/siemens-healthineers"
    },
    "description": "Pioneering breakthroughs in healthcare.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 49.5891571,
    "longitude": 10.9812072,
    "district": "Erlangen"
  },
  {
    "id": "becton-dickinson-8",
    "name": "Becton Dickinson",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "New Jersey",
    "city": "Franklin Lakes",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Becton_Dickinson_logo.svg",
    "initials": "BE",
    "color": "teal-600",
    "verified": true,
    "founded": "1897",
    "employees": "50000+",
    "website": "https://www.bd.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bd"
    },
    "description": "Advancing the world of health.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 41.0167639,
    "longitude": -74.2057012,
    "district": "Bergen County"
  },
  {
    "id": "illumina-427",
    "name": "Illumina",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "California",
    "city": "San Diego",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Illumina_logo.svg",
    "initials": "IL",
    "color": "rose-600",
    "verified": true,
    "founded": "1998",
    "employees": "5000-10000",
    "website": "https://www.illumina.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/illumina"
    },
    "description": "Improving human health by unlocking the power of the genome.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 32.7174202,
    "longitude": -117.162772,
    "district": "San Diego County"
  },
  {
    "id": "moderna-304",
    "name": "Moderna",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Cambridge",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Moderna_logo.svg",
    "initials": "MO",
    "color": "purple-600",
    "verified": true,
    "founded": "2010",
    "employees": "1000-5000",
    "website": "https://www.modernatx.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/modernatx"
    },
    "description": "Pioneering a new class of medicines made of messenger RNA.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 42.3656347,
    "longitude": -71.1040018,
    "district": "Middlesex County"
  },
  {
    "id": "biontech-756",
    "name": "BioNTech",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Germany",
    "state": "Rhineland-Palatinate",
    "city": "Mainz",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7c/BioNTech_logo.svg",
    "initials": "BI",
    "color": "purple-600",
    "verified": true,
    "founded": "2008",
    "employees": "1000-5000",
    "website": "https://www.biontech.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/biontech"
    },
    "description": "Translating science into survival.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 49.9995205,
    "longitude": 8.2736253,
    "district": "Mainz"
  },
  {
    "id": "vertex-pharmaceuticals-631",
    "name": "Vertex Pharmaceuticals",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Boston",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Vertex_Pharmaceuticals_logo.svg",
    "initials": "VE",
    "color": "purple-600",
    "verified": true,
    "founded": "1989",
    "employees": "1000-5000",
    "website": "https://www.vrtx.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/vrtx"
    },
    "description": "Investing in scientific innovation to create transformative medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 42.3588336,
    "longitude": -71.0578303,
    "district": "Suffolk County"
  },
  {
    "id": "regeneron-461",
    "name": "Regeneron",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "New York",
    "city": "Tarrytown",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Regeneron_Pharmaceuticals_logo.svg",
    "initials": "RE",
    "color": "blue-600",
    "verified": true,
    "founded": "1988",
    "employees": "5000-10000",
    "website": "https://www.regeneron.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/regeneron"
    },
    "description": "A leading science-based biopharmaceutical company.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 41.0762077,
    "longitude": -73.8587461,
    "district": "Westchester County"
  },
  {
    "id": "biogen-867",
    "name": "Biogen",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Cambridge",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Biogen_Idec.svg",
    "initials": "BI",
    "color": "emerald-600",
    "verified": false,
    "founded": "1978",
    "employees": "5000-10000",
    "website": "https://www.biogen.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/biogen"
    },
    "description": "Pioneering in neuroscience.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 42.3656347,
    "longitude": -71.1040018,
    "district": "Middlesex County"
  },
  {
    "id": "csl-limited-541",
    "name": "CSL Limited",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Australia",
    "state": "Victoria",
    "city": "Melbourne",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/CSL_Limited_logo.svg",
    "initials": "CS",
    "color": "violet-700",
    "verified": true,
    "founded": "1916",
    "employees": "10000+",
    "website": "https://www.csl.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/csl"
    },
    "description": "Driven by our promise to save and improve lives.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": -37.8142454,
    "longitude": 144.9631732,
    "district": "Melbourne"
  },
  {
    "id": "lonza-746",
    "name": "Lonza",
    "category": "Pharmaceuticals",
    "industry": "Contract Manufacturing",
    "country": "Switzerland",
    "state": "Basel-Stadt",
    "city": "Basel",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Lonza-Logo.svg",
    "initials": "LO",
    "color": "orange-500",
    "verified": false,
    "founded": "1897",
    "employees": "10000+",
    "website": "https://www.lonza.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/lonza"
    },
    "description": "A preferred global partner to the pharmaceutical, biotech and nutrition markets.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 47.5581077,
    "longitude": 7.5878261,
    "district": "Basel"
  },
  {
    "id": "catalent-332",
    "name": "Catalent",
    "category": "Pharmaceuticals",
    "industry": "Contract Manufacturing",
    "country": "United States",
    "state": "New Jersey",
    "city": "Somerset",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Catalent_Logo.svg",
    "initials": "CA",
    "color": "blue-600",
    "verified": true,
    "founded": "2007",
    "employees": "10000+",
    "website": "https://www.catalent.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/catalent"
    },
    "description": "The leading global provider of advanced delivery technologies, development, and manufacturing solutions.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 40.5675084,
    "longitude": -74.6189556,
    "district": "Somerset County"
  },
  {
    "id": "iqvia-331",
    "name": "IQVIA",
    "category": "Clinical Research",
    "industry": "Clinical Research",
    "country": "United States",
    "state": "North Carolina",
    "city": "Durham",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/6/60/IQVIA_Logo.svg",
    "initials": "IQ",
    "color": "teal-600",
    "verified": false,
    "founded": "1982",
    "employees": "50000+",
    "website": "https://www.iqvia.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/iqvia"
    },
    "description": "A leading global provider of advanced analytics, technology solutions and clinical research services.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 35.996653,
    "longitude": -78.9018053,
    "district": "Durham County"
  },
  {
    "id": "labcorp-23",
    "name": "LabCorp",
    "category": "Medical Devices",
    "industry": "Diagnostics",
    "country": "United States",
    "state": "North Carolina",
    "city": "Burlington",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/3/38/Labcorp_logo.svg",
    "initials": "LA",
    "color": "teal-600",
    "verified": true,
    "founded": "1978",
    "employees": "50000+",
    "website": "https://www.labcorp.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/labcorp"
    },
    "description": "A leading global life sciences company that is deeply integrated in guiding patient care.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 36.0956918,
    "longitude": -79.4377991,
    "district": "Alamance County"
  },
  {
    "id": "quest-diagnostics-352",
    "name": "Quest Diagnostics",
    "category": "Medical Devices",
    "industry": "Diagnostics",
    "country": "United States",
    "state": "New Jersey",
    "city": "Secaucus",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Quest_Diagnostics_logo.svg",
    "initials": "QU",
    "color": "rose-600",
    "verified": false,
    "founded": "1967",
    "employees": "10000+",
    "website": "https://www.questdiagnostics.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/questdiagnostics"
    },
    "description": "Empowering people to take action to improve health outcomes.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 40.7899291,
    "longitude": -74.0566735,
    "district": "Hudson County"
  },
  {
    "id": "charles-river-laboratories-641",
    "name": "Charles River Laboratories",
    "category": "Clinical Research",
    "industry": "Clinical Research",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Wilmington",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/0/04/Charles_River_Laboratories_logo.svg",
    "initials": "CH",
    "color": "emerald-600",
    "verified": false,
    "founded": "1947",
    "employees": "10000+",
    "website": "https://www.criver.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/criver"
    },
    "description": "Partnering with clients from discovery to market.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 42.5464828,
    "longitude": -71.1736669,
    "district": "Middlesex County"
  },
  {
    "id": "syneos-health-669",
    "name": "Syneos Health",
    "category": "Clinical Research",
    "industry": "Clinical Research",
    "country": "United States",
    "state": "North Carolina",
    "city": "Morrisville",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Syneos_Health_logo.svg",
    "initials": "SY",
    "color": "emerald-600",
    "verified": false,
    "founded": "1998",
    "employees": "10000+",
    "website": "https://www.syneoshealth.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/syneoshealth"
    },
    "description": "A fully integrated biopharmaceutical solutions organization.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 35.824341,
    "longitude": -78.8300321,
    "district": "Wake County"
  },
  {
    "id": "pra-health-sciences-737",
    "name": "PRA Health Sciences",
    "category": "Clinical Research",
    "industry": "Clinical Research",
    "country": "United States",
    "state": "North Carolina",
    "city": "Raleigh",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/PRA_Health_Sciences_logo.svg",
    "initials": "PR",
    "color": "rose-600",
    "verified": true,
    "founded": "1976",
    "employees": "10000+",
    "website": "https://www.prahs.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/prahs"
    },
    "description": "An ICON plc company, delivering clinical development services.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 35.7803977,
    "longitude": -78.6390989,
    "district": "Wake County"
  },
  {
    "id": "parexel-528",
    "name": "Parexel",
    "category": "Clinical Research",
    "industry": "Clinical Research",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Newton",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/48/Parexel_Logo.svg",
    "initials": "PA",
    "color": "teal-600",
    "verified": true,
    "founded": "1982",
    "employees": "10000+",
    "website": "https://www.parexel.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/parexel"
    },
    "description": "We do it with heart.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 42.3300435,
    "longitude": -71.194862,
    "district": "Middlesex County"
  },
  {
    "id": "ppd-616",
    "name": "PPD",
    "category": "Clinical Research",
    "industry": "Clinical Research",
    "country": "United States",
    "state": "North Carolina",
    "city": "Wilmington",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/PPD_logo.svg",
    "initials": "PP",
    "color": "violet-700",
    "verified": false,
    "founded": "1985",
    "employees": "10000+",
    "website": "https://www.ppd.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/ppd"
    },
    "description": "A leading global contract research organization.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 34.2352853,
    "longitude": -77.9487284,
    "district": "New Hanover County"
  },
  {
    "id": "icon-plc-98",
    "name": "Icon plc",
    "category": "Clinical Research",
    "industry": "Clinical Research",
    "country": "Ireland",
    "state": "Leinster",
    "city": "Dublin",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7c/ICON_plc_logo.svg",
    "initials": "IC",
    "color": "blue-600",
    "verified": false,
    "founded": "1990",
    "employees": "10000+",
    "website": "https://www.iconplc.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/iconplc"
    },
    "description": "A global provider of outsourced development services to the pharmaceutical, biotechnology and medical device industries.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 53.3493795,
    "longitude": -6.2605593,
    "district": "County Dublin"
  },
  {
    "id": "veeva-systems-828",
    "name": "Veeva Systems",
    "category": "Medical Devices",
    "industry": "Digital Health",
    "country": "United States",
    "state": "California",
    "city": "Pleasanton",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/7/71/Veeva_Systems_logo.svg",
    "initials": "VE",
    "color": "blue-600",
    "verified": true,
    "founded": "2007",
    "employees": "5000-10000",
    "website": "https://www.veeva.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/veeva"
    },
    "description": "Cloud-based software for the global life sciences industry.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 37.6624312,
    "longitude": -121.8746789,
    "district": "Alameda County"
  },
  {
    "id": "dexcom-2",
    "name": "Dexcom",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "California",
    "city": "San Diego",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Dexcom_logo.svg",
    "initials": "DE",
    "color": "violet-700",
    "verified": false,
    "founded": "1999",
    "employees": "5000-10000",
    "website": "https://www.dexcom.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/dexcom"
    },
    "description": "Empowering people to take control of diabetes.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 32.7174202,
    "longitude": -117.162772,
    "district": "San Diego County"
  },
  {
    "id": "resmed-966",
    "name": "ResMed",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "California",
    "city": "San Diego",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f0/ResMed_logo.svg",
    "initials": "RE",
    "color": "rose-600",
    "verified": false,
    "founded": "1989",
    "employees": "5000-10000",
    "website": "https://www.resmed.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/resmed"
    },
    "description": "Pioneering innovative solutions that treat and keep people out of the hospital.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 32.7174202,
    "longitude": -117.162772,
    "district": "San Diego County"
  },
  {
    "id": "edwards-lifesciences-116",
    "name": "Edwards Lifesciences",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "California",
    "city": "Irvine",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/b/be/Edwards_Lifesciences_logo.svg",
    "initials": "ED",
    "color": "orange-500",
    "verified": true,
    "founded": "1958",
    "employees": "10000+",
    "website": "https://www.edwards.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/edwards"
    },
    "description": "The global leader in patient-focused medical innovations for structural heart disease.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 33.6856969,
    "longitude": -117.825981,
    "district": "Orange County"
  },
  {
    "id": "boston-scientific-28",
    "name": "Boston Scientific",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Marlborough",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Boston_Scientific_logo.svg",
    "initials": "BO",
    "color": "orange-500",
    "verified": true,
    "founded": "1979",
    "employees": "10000+",
    "website": "https://www.bostonscientific.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bostonscientific"
    },
    "description": "Transforming lives through innovative medical solutions.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 42.3468589,
    "longitude": -71.5525188,
    "district": "Middlesex County"
  },
  {
    "id": "zimmer-biomet-438",
    "name": "Zimmer Biomet",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "Indiana",
    "city": "Warsaw",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Zimmer_Biomet_logo.svg",
    "initials": "ZI",
    "color": "violet-700",
    "verified": false,
    "founded": "1927",
    "employees": "10000+",
    "website": "https://www.zimmerbiomet.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/zimmerbiomet"
    },
    "description": "A global medical technology leader.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 41.2381017,
    "longitude": -85.8530544,
    "district": "Kosciusko County"
  },
  {
    "id": "alcon-647",
    "name": "Alcon",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "Switzerland",
    "state": "Geneva",
    "city": "Geneva",
    "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/b/be/Alcon_logo.svg",
    "initials": "AL",
    "color": "orange-500",
    "verified": false,
    "founded": "1945",
    "employees": "10000+",
    "website": "https://www.alcon.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/alcon"
    },
    "description": "Helping people see brilliantly.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 46.2017559,
    "longitude": 6.1466014,
    "district": "Geneva"
  },
  {
    "id": "bausch-health-332",
    "name": "Bausch Health",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Canada",
    "state": "Quebec",
    "city": "Laval",
    "logoUrl": "",
    "initials": "BA",
    "color": "violet-700",
    "verified": false,
    "founded": "1959",
    "employees": "10000+",
    "website": "https://www.bauschhealth.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bauschhealth"
    },
    "description": "Delivering on our commitments to patients, healthcare providers, stakeholders and society.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 45.5571125,
    "longitude": -73.7211779,
    "district": "Laval (région administrative)"
  },
  {
    "id": "teva-pharmaceuticals-265",
    "name": "Teva Pharmaceuticals",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Israel",
    "state": "Tel Aviv",
    "city": "Tel Aviv",
    "logoUrl": "",
    "initials": "TE",
    "color": "violet-700",
    "verified": false,
    "founded": "1901",
    "employees": "10000+",
    "website": "https://www.tevapharm.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/tevapharm"
    },
    "description": "A global leader in generic and specialty medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 32.0852997,
    "longitude": 34.7818064,
    "district": "נפת תל אביב"
  },
  {
    "id": "sun-pharma-932",
    "name": "Sun Pharma",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Maharashtra",
    "city": "Mumbai",
    "logoUrl": "",
    "initials": "SU",
    "color": "purple-600",
    "verified": true,
    "founded": "1983",
    "employees": "10000+",
    "website": "https://www.sunpharma.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/sunpharma"
    },
    "description": "An international specialty pharmaceutical company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 19.054999,
    "longitude": 72.8692035,
    "district": "Mumbai Suburban District"
  },
  {
    "id": "dr--reddy-s-laboratories-878",
    "name": "Dr. Reddy's Laboratories",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "DR",
    "color": "teal-600",
    "verified": true,
    "founded": "1984",
    "employees": "10000+",
    "website": "https://www.drreddys.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/drreddys"
    },
    "description": "Good Health Can't Wait.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "aurobindo-pharma-569",
    "name": "Aurobindo Pharma",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "AU",
    "color": "violet-700",
    "verified": true,
    "founded": "1986",
    "employees": "10000+",
    "website": "https://www.aurobindo.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/aurobindo"
    },
    "description": "Committed to delivering a healthier tomorrow.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "cipla-771",
    "name": "Cipla",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Maharashtra",
    "city": "Mumbai",
    "logoUrl": "",
    "initials": "CI",
    "color": "violet-700",
    "verified": true,
    "founded": "1935",
    "employees": "10000+",
    "website": "https://www.cipla.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/cipla"
    },
    "description": "Caring for Life.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 19.054999,
    "longitude": 72.8692035,
    "district": "Mumbai Suburban District"
  },
  {
    "id": "lupin-575",
    "name": "Lupin",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Maharashtra",
    "city": "Mumbai",
    "logoUrl": "",
    "initials": "LU",
    "color": "blue-600",
    "verified": true,
    "founded": "1968",
    "employees": "10000+",
    "website": "https://www.lupin.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/lupin"
    },
    "description": "Innovation led transnational pharmaceutical company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 19.054999,
    "longitude": 72.8692035,
    "district": "Mumbai Suburban District"
  },
  {
    "id": "zydus-lifesciences-644",
    "name": "Zydus Lifesciences",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "logoUrl": "",
    "initials": "ZY",
    "color": "teal-600",
    "verified": true,
    "founded": "1952",
    "employees": "10000+",
    "website": "https://www.zyduslife.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/zyduslife"
    },
    "description": "Dedicated to life in all its dimensions.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 23.0215374,
    "longitude": 72.5800568,
    "district": "Ahmedabad"
  },
  {
    "id": "biocon-475",
    "name": "Biocon",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "India",
    "state": "Karnataka",
    "city": "Bengaluru",
    "logoUrl": "",
    "initials": "BI",
    "color": "blue-600",
    "verified": true,
    "founded": "1978",
    "employees": "10000+",
    "website": "https://www.biocon.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/biocon"
    },
    "description": "Enhancing global healthcare through innovative and affordable biopharmaceuticals.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 12.9767936,
    "longitude": 77.590082,
    "district": "Bangalore North"
  },
  {
    "id": "bharat-biotech-131",
    "name": "Bharat Biotech",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "BH",
    "color": "blue-600",
    "verified": true,
    "founded": "1996",
    "employees": "1000-5000",
    "website": "https://www.bharatbiotech.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bharatbiotech"
    },
    "description": "Lead innovation in vaccines and bio-therapeutics.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "serum-institute-of-india-191",
    "name": "Serum Institute of India",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "India",
    "state": "Maharashtra",
    "city": "Pune",
    "logoUrl": "",
    "initials": "SE",
    "color": "orange-500",
    "verified": false,
    "founded": "1966",
    "employees": "5000-10000",
    "website": "https://www.seruminstitute.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/seruminstitute"
    },
    "description": "The world's largest vaccine manufacturer by number of doses produced.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 18.5213738,
    "longitude": 73.8545071,
    "district": "Pune City Subdistrict"
  },
  {
    "id": "alnylam-pharmaceuticals-43",
    "name": "Alnylam Pharmaceuticals",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Cambridge",
    "logoUrl": "",
    "initials": "AL",
    "color": "blue-600",
    "verified": true,
    "founded": "2002",
    "employees": "1000-5000",
    "website": "https://www.alnylam.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/alnylam"
    },
    "description": "Leading the translation of RNA interference into a new class of innovative medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 42.3656347,
    "longitude": -71.1040018,
    "district": "Middlesex County"
  },
  {
    "id": "sarepta-therapeutics-927",
    "name": "Sarepta Therapeutics",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Cambridge",
    "logoUrl": "",
    "initials": "SA",
    "color": "emerald-600",
    "verified": true,
    "founded": "1980",
    "employees": "1000-5000",
    "website": "https://www.sarepta.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/sarepta"
    },
    "description": "Working to rescue lives devastated by rare diseases.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 42.3656347,
    "longitude": -71.1040018,
    "district": "Middlesex County"
  },
  {
    "id": "exact-sciences-435",
    "name": "Exact Sciences",
    "category": "Medical Devices",
    "industry": "Diagnostics",
    "country": "United States",
    "state": "Wisconsin",
    "city": "Madison",
    "logoUrl": "",
    "initials": "EX",
    "color": "purple-600",
    "verified": true,
    "founded": "1995",
    "employees": "5000-10000",
    "website": "https://www.exactsciences.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/exactsciences"
    },
    "description": "Relentless pursuit of smarter solutions providing the clarity to take life-changing action, earlier.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 43.07469,
    "longitude": -89.3841663,
    "district": "Dane County"
  },
  {
    "id": "natera-613",
    "name": "Natera",
    "category": "Medical Devices",
    "industry": "Diagnostics",
    "country": "United States",
    "state": "California",
    "city": "Austin",
    "logoUrl": "",
    "initials": "NA",
    "color": "orange-500",
    "verified": true,
    "founded": "2004",
    "employees": "1000-5000",
    "website": "https://www.natera.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/natera"
    },
    "description": "A global leader in cell-free DNA testing.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 37.242444,
    "longitude": -121.9982914,
    "district": "Santa Clara County"
  },
  {
    "id": "guardant-health-837",
    "name": "Guardant Health",
    "category": "Medical Devices",
    "industry": "Diagnostics",
    "country": "United States",
    "state": "California",
    "city": "Palo Alto",
    "logoUrl": "",
    "initials": "GU",
    "color": "rose-600",
    "verified": true,
    "founded": "2012",
    "employees": "1000-5000",
    "website": "https://www.guardanthealth.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/guardanthealth"
    },
    "description": "Conquering cancer with data.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 37.4443293,
    "longitude": -122.1598465,
    "district": "Santa Clara County"
  },
  {
    "id": "seagen-548",
    "name": "Seagen",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Washington",
    "city": "Bothell",
    "logoUrl": "",
    "initials": "SE",
    "color": "blue-600",
    "verified": true,
    "founded": "1997",
    "employees": "1000-5000",
    "website": "https://www.seagen.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/seagen"
    },
    "description": "A global biotechnology company that discovers, develops and commercializes transformative cancer medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 47.7623204,
    "longitude": -122.2054035,
    "district": "King County"
  },
  {
    "id": "incyte-378",
    "name": "Incyte",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Delaware",
    "city": "Wilmington",
    "logoUrl": "",
    "initials": "IN",
    "color": "purple-600",
    "verified": false,
    "founded": "2002",
    "employees": "1000-5000",
    "website": "https://www.incyte.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/incyte"
    },
    "description": "Solving danger, discovering answers.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 39.7459468,
    "longitude": -75.546589,
    "district": "New Castle County"
  },
  {
    "id": "biomarin-417",
    "name": "BioMarin",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "California",
    "city": "San Rafael",
    "logoUrl": "",
    "initials": "BI",
    "color": "purple-600",
    "verified": true,
    "founded": "1997",
    "employees": "1000-5000",
    "website": "https://www.biomarin.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/biomarin"
    },
    "description": "Driven by research that brings new hope to patients.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 37.9747795,
    "longitude": -122.5316686,
    "district": "Marin County"
  },
  {
    "id": "exelixis-398",
    "name": "Exelixis",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "California",
    "city": "Alameda",
    "logoUrl": "",
    "initials": "EX",
    "color": "blue-600",
    "verified": true,
    "founded": "1994",
    "employees": "1000-5000",
    "website": "https://www.exelixis.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/exelixis"
    },
    "description": "Committed to accelerating the discovery, development and commercialization of new medicines for difficult-to-treat cancers.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 37.6090291,
    "longitude": -121.899142,
    "district": "Alameda County"
  },
  {
    "id": "agilent-technologies-832",
    "name": "Agilent Technologies",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "United States",
    "state": "California",
    "city": "Santa Clara",
    "logoUrl": "",
    "initials": "AG",
    "color": "blue-600",
    "verified": false,
    "founded": "1999",
    "employees": "10000+",
    "website": "https://www.agilent.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/agilent"
    },
    "description": "Providing life sciences, diagnostics and applied chemical markets with a full laboratory solution.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 37.2333253,
    "longitude": -121.6846349,
    "district": "Santa Clara County"
  },
  {
    "id": "waters-corporation-628",
    "name": "Waters Corporation",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Milford",
    "logoUrl": "",
    "initials": "WA",
    "color": "violet-700",
    "verified": false,
    "founded": "1958",
    "employees": "5000-10000",
    "website": "https://www.waters.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/waters"
    },
    "description": "Delivering practical and sustainable scientific innovation to enable significant advancement.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 42.1428913,
    "longitude": -71.5164618,
    "district": "Worcester County"
  },
  {
    "id": "mettler-toledo-497",
    "name": "Mettler Toledo",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "Switzerland",
    "state": "Zurich",
    "city": "Greifensee",
    "logoUrl": "",
    "initials": "ME",
    "color": "orange-500",
    "verified": false,
    "founded": "1945",
    "employees": "10000+",
    "website": "https://www.mt.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/mt"
    },
    "description": "A leading global manufacturer of precision instruments.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 47.3662476,
    "longitude": 8.6786693,
    "district": "Bezirk Uster"
  },
  {
    "id": "perkinelmer-890",
    "name": "PerkinElmer",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Waltham",
    "logoUrl": "",
    "initials": "PE",
    "color": "rose-600",
    "verified": true,
    "founded": "1937",
    "employees": "10000+",
    "website": "https://www.perkinelmer.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/perkinelmer"
    },
    "description": "Innovating for a healthier world.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 42.3762385,
    "longitude": -71.2355644,
    "district": "Middlesex County"
  },
  {
    "id": "bio-rad-laboratories-110",
    "name": "Bio-Rad Laboratories",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "United States",
    "state": "California",
    "city": "Hercules",
    "logoUrl": "",
    "initials": "BI",
    "color": "emerald-600",
    "verified": true,
    "founded": "1952",
    "employees": "5000-10000",
    "website": "https://www.bio-rad.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bio-rad"
    },
    "description": "Advancing scientific discovery and improving healthcare.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 38.0171441,
    "longitude": -122.2885808,
    "district": "Contra Costa County"
  },
  {
    "id": "sartorius-239",
    "name": "Sartorius",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "Germany",
    "state": "Lower Saxony",
    "city": "Göttingen",
    "logoUrl": "",
    "initials": "SA",
    "color": "orange-500",
    "verified": true,
    "founded": "1870",
    "employees": "10000+",
    "website": "https://www.sartorius.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/sartorius"
    },
    "description": "Simplifying progress in the biopharmaceutical industry.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 51.5328328,
    "longitude": 9.9351811,
    "district": "Landkreis Göttingen"
  },
  {
    "id": "eppendorf-876",
    "name": "Eppendorf",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "Germany",
    "state": "Hamburg",
    "city": "Hamburg",
    "logoUrl": "",
    "initials": "EP",
    "color": "violet-700",
    "verified": true,
    "founded": "1945",
    "employees": "1000-5000",
    "website": "https://www.eppendorf.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/eppendorf"
    },
    "description": "A leading life science company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 53.5909051,
    "longitude": 9.9753758,
    "district": "Hamburg"
  },
  {
    "id": "west-pharmaceutical-services-515",
    "name": "West Pharmaceutical Services",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "United States",
    "state": "Pennsylvania",
    "city": "Exton",
    "logoUrl": "",
    "initials": "WE",
    "color": "blue-600",
    "verified": true,
    "founded": "1923",
    "employees": "10000+",
    "website": "https://www.westpharma.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/westpharma"
    },
    "description": "A leading manufacturer of packaging components and delivery systems for injectable drugs.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 40.0299755,
    "longitude": -75.6290436,
    "district": "Chester County"
  },
  {
    "id": "align-technology-552",
    "name": "Align Technology",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "Arizona",
    "city": "Tempe",
    "logoUrl": "",
    "initials": "AL",
    "color": "emerald-600",
    "verified": true,
    "founded": "1997",
    "employees": "10000+",
    "website": "https://www.aligntech.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/aligntech"
    },
    "description": "Transforming smiles and changing lives.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 33.4255117,
    "longitude": -111.940016,
    "district": "Maricopa County"
  },
  {
    "id": "coopercompanies-710",
    "name": "CooperCompanies",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "California",
    "city": "San Ramon",
    "logoUrl": "",
    "initials": "CO",
    "color": "blue-600",
    "verified": false,
    "founded": "1958",
    "employees": "10000+",
    "website": "https://www.coopercos.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/coopercos"
    },
    "description": "A global medical device company publicly traded on the NYSE.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 37.7648021,
    "longitude": -121.9544387,
    "district": "Contra Costa County"
  },
  {
    "id": "teleflex-283",
    "name": "Teleflex",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "Pennsylvania",
    "city": "Wayne",
    "logoUrl": "",
    "initials": "TE",
    "color": "purple-600",
    "verified": true,
    "founded": "1943",
    "employees": "10000+",
    "website": "https://www.teleflex.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/teleflex"
    },
    "description": "Providing medical technologies designed to improve the health and quality of people's lives.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 41.6264414,
    "longitude": -75.3045103,
    "district": "Wayne County"
  },
  {
    "id": "hologic-962",
    "name": "Hologic",
    "category": "Medical Devices",
    "industry": "Medical Devices",
    "country": "United States",
    "state": "Massachusetts",
    "city": "Marlborough",
    "logoUrl": "",
    "initials": "HO",
    "color": "teal-600",
    "verified": true,
    "founded": "1985",
    "employees": "5000-10000",
    "website": "https://www.hologic.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/hologic"
    },
    "description": "An innovative medical technology company primarily focused on improving women's health and well-being.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 42.3468589,
    "longitude": -71.5525188,
    "district": "Middlesex County"
  },
  {
    "id": "qiagen-590",
    "name": "Qiagen",
    "category": "Life Sciences",
    "industry": "Life Sciences",
    "country": "Netherlands",
    "state": "Limburg",
    "city": "Venlo",
    "logoUrl": "",
    "initials": "QI",
    "color": "violet-700",
    "verified": true,
    "founded": "1984",
    "employees": "5000-10000",
    "website": "https://www.qiagen.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/qiagen"
    },
    "description": "Sample to Insight solutions.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 51.3924489,
    "longitude": 6.1511724,
    "district": "Venlo"
  },
  {
    "id": "grifols-124",
    "name": "Grifols",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Spain",
    "state": "Catalonia",
    "city": "Barcelona",
    "logoUrl": "",
    "initials": "GR",
    "color": "rose-600",
    "verified": true,
    "founded": "1909",
    "employees": "10000+",
    "website": "https://www.grifols.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/grifols"
    },
    "description": "A global healthcare company that produces plasma-derived medicines and innovative diagnostic solutions.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 41.3825802,
    "longitude": 2.177073,
    "district": "Barcelonès"
  },
  {
    "id": "csl-behring-535",
    "name": "CSL Behring",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United States",
    "state": "Pennsylvania",
    "city": "King of Prussia",
    "logoUrl": "",
    "initials": "CS",
    "color": "emerald-600",
    "verified": true,
    "founded": "1904",
    "employees": "10000+",
    "website": "https://www.cslbehring.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/cslbehring"
    },
    "description": "A global leader in biotherapeutics.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 40.0947625,
    "longitude": -75.3851334,
    "district": "Montgomery County"
  },
  {
    "id": "octapharma-399",
    "name": "Octapharma",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Switzerland",
    "state": "Schwyz",
    "city": "Lachen",
    "logoUrl": "",
    "initials": "OC",
    "color": "orange-500",
    "verified": true,
    "founded": "1983",
    "employees": "10000+",
    "website": "https://www.octapharma.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/octapharma"
    },
    "description": "For the safe and optimal use of human proteins.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 47.1923827,
    "longitude": 8.8523833,
    "district": "March"
  },
  {
    "id": "kedrion-529",
    "name": "Kedrion",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Italy",
    "state": "Tuscany",
    "city": "Barga",
    "logoUrl": "",
    "initials": "KE",
    "color": "emerald-600",
    "verified": false,
    "founded": "2001",
    "employees": "1000-5000",
    "website": "https://www.kedrion.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/kedrion"
    },
    "description": "Keep Life Flowing.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 44.0739178,
    "longitude": 10.484263,
    "district": "Lucca"
  },
  {
    "id": "bpl--bio-products-laboratory--750",
    "name": "BPL (Bio Products Laboratory)",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "United Kingdom",
    "state": "Hertfordshire",
    "city": "Elstree",
    "logoUrl": "",
    "initials": "BP",
    "color": "violet-700",
    "verified": false,
    "founded": "1954",
    "employees": "1000-5000",
    "website": "https://www.bpl.co.uk",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bpl"
    },
    "description": "Delivering high-quality plasma-derived medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 51.6437729,
    "longitude": -0.2989349,
    "district": "Hertfordshire"
  },
  {
    "id": "astellas-pharma-148",
    "name": "Astellas Pharma",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Tokyo",
    "city": "Tokyo",
    "logoUrl": "",
    "initials": "AS",
    "color": "emerald-600",
    "verified": false,
    "founded": "2005",
    "employees": "10000+",
    "website": "https://www.astellas.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/astellas"
    },
    "description": "Turning innovative science into value for patients.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 35.6812546,
    "longitude": 139.766706,
    "district": "Tokyo"
  },
  {
    "id": "daiichi-sankyo-542",
    "name": "Daiichi Sankyo",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Tokyo",
    "city": "Tokyo",
    "logoUrl": "",
    "initials": "DA",
    "color": "orange-500",
    "verified": true,
    "founded": "2005",
    "employees": "10000+",
    "website": "https://www.daiichisankyo.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/daiichisankyo"
    },
    "description": "Creating new standards of care for patients with cancer.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 35.6812546,
    "longitude": 139.766706,
    "district": "Tokyo"
  },
  {
    "id": "eisai-170",
    "name": "Eisai",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Tokyo",
    "city": "Tokyo",
    "logoUrl": "",
    "initials": "EI",
    "color": "teal-600",
    "verified": true,
    "founded": "1941",
    "employees": "10000+",
    "website": "https://www.eisai.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/eisai"
    },
    "description": "Human health care (hhc) concept.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 35.6812546,
    "longitude": 139.766706,
    "district": "Tokyo"
  },
  {
    "id": "otsuka-pharmaceutical-263",
    "name": "Otsuka Pharmaceutical",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Tokyo",
    "city": "Tokyo",
    "logoUrl": "",
    "initials": "OT",
    "color": "blue-600",
    "verified": true,
    "founded": "1921",
    "employees": "10000+",
    "website": "https://www.otsuka.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/otsuka"
    },
    "description": "Otsuka-people creating new products for better health worldwide.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 35.6812546,
    "longitude": 139.766706,
    "district": "Tokyo"
  },
  {
    "id": "chugai-pharmaceutical-670",
    "name": "Chugai Pharmaceutical",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Tokyo",
    "city": "Tokyo",
    "logoUrl": "",
    "initials": "CH",
    "color": "orange-500",
    "verified": true,
    "founded": "1925",
    "employees": "5000-10000",
    "website": "https://www.chugai-pharm.co.jp",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/chugai-pharm"
    },
    "description": "Innovation all for the patients.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 35.6812546,
    "longitude": 139.766706,
    "district": "Tokyo"
  },
  {
    "id": "shionogi-432",
    "name": "Shionogi",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Osaka",
    "city": "Osaka",
    "logoUrl": "",
    "initials": "SH",
    "color": "rose-600",
    "verified": false,
    "founded": "1878",
    "employees": "5000-10000",
    "website": "https://www.shionogi.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/shionogi"
    },
    "description": "Supply the best possible medicine to protect the health and wellbeing of the patients we serve.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 34.6937569,
    "longitude": 135.5014539,
    "district": "Osaka"
  },
  {
    "id": "sumitomo-pharma-633",
    "name": "Sumitomo Pharma",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Osaka",
    "city": "Osaka",
    "logoUrl": "",
    "initials": "SU",
    "color": "purple-600",
    "verified": true,
    "founded": "1897",
    "employees": "5000-10000",
    "website": "https://www.sumitomo-pharma.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/sumitomo-pharma"
    },
    "description": "To broadly contribute to society through value creation based on innovative research and development activities.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 34.6937569,
    "longitude": 135.5014539,
    "district": "Osaka"
  },
  {
    "id": "mitsubishi-tanabe-pharma-451",
    "name": "Mitsubishi Tanabe Pharma",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "Japan",
    "state": "Osaka",
    "city": "Osaka",
    "logoUrl": "",
    "initials": "MI",
    "color": "rose-600",
    "verified": true,
    "founded": "2007",
    "employees": "5000-10000",
    "website": "https://www.mt-pharma.co.jp",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/mt-pharma"
    },
    "description": "Creating hope for all facing illness.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 34.6937569,
    "longitude": 135.5014539,
    "district": "Osaka"
  },
  {
    "id": "genmab-308",
    "name": "Genmab",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Denmark",
    "state": "Capital Region",
    "city": "Copenhagen",
    "logoUrl": "",
    "initials": "GE",
    "color": "orange-500",
    "verified": true,
    "founded": "1999",
    "employees": "1000-5000",
    "website": "https://www.genmab.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/genmab"
    },
    "description": "Creating and developing differentiated antibody therapeutics.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 55.6867243,
    "longitude": 12.5700724,
    "district": "Copenhagen"
  },
  {
    "id": "ascendis-pharma-804",
    "name": "Ascendis Pharma",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Denmark",
    "state": "Capital Region",
    "city": "Hellerup",
    "logoUrl": "",
    "initials": "AS",
    "color": "rose-600",
    "verified": true,
    "founded": "2006",
    "employees": "500-1000",
    "website": "https://www.ascendispharma.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/ascendispharma"
    },
    "description": "Applying our TransCon technology to build a leading, fully integrated biopharmaceutical company.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics"
    ],
    "services": [
      "Research"
    ],
    "latitude": 55.7336657,
    "longitude": 12.5655408,
    "district": "Hellerup"
  },
  {
    "id": "bavarian-nordic-927",
    "name": "Bavarian Nordic",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Denmark",
    "state": "Capital Region",
    "city": "Hellerup",
    "logoUrl": "",
    "initials": "BA",
    "color": "rose-600",
    "verified": true,
    "founded": "1994",
    "employees": "1000-5000",
    "website": "https://www.bavarian-nordic.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/bavarian-nordic"
    },
    "description": "A fully integrated vaccines company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 55.7336657,
    "longitude": 12.5655408,
    "district": "Hellerup"
  },
  {
    "id": "zealand-pharma-20",
    "name": "Zealand Pharma",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Denmark",
    "state": "Capital Region",
    "city": "Søborg",
    "logoUrl": "",
    "initials": "ZE",
    "color": "orange-500",
    "verified": false,
    "founded": "1998",
    "employees": "100-500",
    "website": "https://www.zealandpharma.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/zealandpharma"
    },
    "description": "Discovering and developing innovative peptide-based medicines.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 55.736468,
    "longitude": 12.5088728,
    "district": "Søborg"
  },
  {
    "id": "symphogen-122",
    "name": "Symphogen",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "Denmark",
    "state": "Capital Region",
    "city": "Ballerup",
    "logoUrl": "",
    "initials": "SY",
    "color": "purple-600",
    "verified": true,
    "founded": "2000",
    "employees": "100-500",
    "website": "https://www.symphogen.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/symphogen"
    },
    "description": "An antibody center of excellence.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 55.7303589,
    "longitude": 12.3612313,
    "district": "Ballerup"
  },
  {
    "id": "granules-india-634",
    "name": "Granules India",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "GR",
    "color": "emerald-600",
    "verified": true,
    "founded": "1984",
    "employees": "1000-5000",
    "website": "https://www.granulesindia.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/granulesindia"
    },
    "description": "A vertically integrated fast growing Indian pharmaceutical company.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "hetero-drugs-100",
    "name": "Hetero Drugs",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "HE",
    "color": "rose-600",
    "verified": false,
    "founded": "1993",
    "employees": "10000+",
    "website": "https://www.heteroworld.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/heteroworld"
    },
    "description": "One of India's leading generic pharmaceutical companies.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "biological-e-815",
    "name": "Biological E",
    "category": "Biotechnology",
    "industry": "Biotechnology",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "BI",
    "color": "purple-600",
    "verified": true,
    "founded": "1953",
    "employees": "1000-5000",
    "website": "https://www.biologicale.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/biologicale"
    },
    "description": "Pioneering biologicals and vaccines in India.",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals"
    ],
    "services": [
      "Research",
      "Development"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "natco-pharma-819",
    "name": "Natco Pharma",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "NA",
    "color": "emerald-600",
    "verified": false,
    "founded": "1981",
    "employees": "5000-10000",
    "website": "https://www.natcopharma.co.in",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/natcopharma"
    },
    "description": "A research driven, vertically integrated pharmaceutical company.",
    "certifications": [
      "ISO 13485",
      "FDA Registered",
      "GMP Certified"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "laurus-labs-494",
    "name": "Laurus Labs",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "LA",
    "color": "teal-600",
    "verified": true,
    "founded": "2005",
    "employees": "5000-10000",
    "website": "https://www.lauruslabs.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/lauruslabs"
    },
    "description": "A leading research driven Pharmaceutical Manufacturing Company in India.",
    "certifications": [
      "ISO 13485"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research",
      "Development",
      "Manufacturing"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  },
  {
    "id": "divi-s-laboratories-688",
    "name": "Divi's Laboratories",
    "category": "Pharmaceuticals",
    "industry": "Pharmaceuticals",
    "country": "India",
    "state": "Telangana",
    "city": "Hyderabad",
    "logoUrl": "",
    "initials": "DI",
    "color": "purple-600",
    "verified": true,
    "founded": "1990",
    "employees": "10000+",
    "website": "https://www.divislabs.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/company/divislabs"
    },
    "description": "A leading manufacturer of APIs(Active pharmaceuticals ingredients).",
    "certifications": [
      "ISO 13485",
      "FDA Registered"
    ],
    "products": [
      "Pharmaceuticals",
      "Biologics",
      "Medical Devices"
    ],
    "services": [
      "Research"
    ],
    "latitude": 17.360589,
    "longitude": 78.4740613,
    "district": "Bahadurpura mandal"
  }
];
