import { api } from "../../../lib/axios";

export interface Company {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  website?: string;
  verified: boolean;
  country: string;
 state?: string;
  city?: string;
  category: string;
  industry: string;
  companyType?: string;
  ownership?: string;
  founded: string;
  employees: string;
  certifications?: string[];
  products?: string[];
  services?: string[];
  rating?: number;
  reviewCount?: number;
  addedAt: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
 pageSize: number;
  totalPages: number;
}

export interface CompanyFilters {
  search?: string;
  country?: string;
  state?: string;
  city?: string;
  category?: string;
  industry?: string;
  companyType?: string;
  certifications?: string[];
  employeeSize?: string;
  revenueRange?: string;
  products?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
}

export const companyService = {
  getCompanies: async (filters: CompanyFilters): Promise<PaginatedResponse<Company>> => {
    const response = await api.get("/api/v1/company", {
      params: filters,
    });

    return response.data;
  },

  getCompanyBySlug: async (slug: string): Promise<Company> => {
    const response = await api.get(`/api/v1/company/${slug}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/api/v1/company/stats");
    return response.data;
  },
};
