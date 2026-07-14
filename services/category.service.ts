import { api } from "../lib/axios";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  companyCount: number;
}

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/category');
    return response.data;
  }
};
