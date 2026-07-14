import axios from "axios";

export interface Company {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  employees: string;
  website?: string;
  certifications?: string[];
  verified: boolean;
  logoUrl?: string;
  color: string;
  initials: string;
  proximityBadge?: string;
  distanceKm?: number;
  companyType?: string;
  rating?: number;
  completenessScore?: number;
  tier?: string;
  reviewCount?: number;
  products?: string[];
  [key: string]: unknown;
}

export interface CompanyFilters {
  search?: string;
  country?: string;
  state?: string;
  city?: string;
  category?: string;
  industry?: string;
  companyType?: string;
  employeeSize?: string;
  revenueRange?: string;
  certifications?: string[];
  page?: number;
  pageSize?: number;
  sort?: string;
}

export interface CompanyResponse {
  data: Company[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

class CompanyService {
  async getCompanies(filters: CompanyFilters): Promise<CompanyResponse> {
    try {
      const response = await axios.get("/api/companies", { params: filters });
      return response.data;
    } catch (error) {
      console.error("API error fetching companies:", error);
      return { data: [], total: 0, page: 1, pageSize: 12, totalPages: 1 };
    }
  }

  async getStats() {
    try {
      const response = await axios.get("/api/companies?stats=true");
      return response.data;
    } catch (e) {
      return {
        total: 0,
        pharmaceuticals: 0,
        biotech: 0,
        injectables: 0,
        medicalDevices: 0
      };
    }
  }
}

export const companyService = new CompanyService();
