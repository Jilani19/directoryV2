import axios from "axios";

export interface Category {
  id: string;
  name: string;
  slug: string;
  companyCount: number;
}

class CategoryService {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get("/api/companies?stats=true");
      const stats = response.data;
      
      return [
        { id: "1", name: "Pharmaceuticals", slug: "pharmaceuticals", companyCount: stats.pharmaceuticals || 0 },
        { id: "2", name: "Biotech", slug: "biotech", companyCount: stats.biotech || 0 },
        { id: "3", name: "Injectables", slug: "injectables", companyCount: stats.injectables || 0 },
        { id: "4", name: "Medical Devices", slug: "medical-devices", companyCount: stats.medicalDevices || 0 },
      ].filter(c => c.companyCount > 0);
    } catch (error) {
      console.error("Failed to fetch real category stats:", error);
      return [];
    }
  }
}

export const categoryService = new CategoryService();
