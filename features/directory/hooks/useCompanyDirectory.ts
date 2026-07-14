"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { companyService, Company, CompanyFilters } from "../services/company.service";

export type SortOption = 
  | "Featured" 
  | "Newest" 
  | "Revenue"
  | "Employees"
  | "Recently Updated"
  | "A-Z"
  | "Z-A" 
  | "Employees High-Low" 
  | "Employees Low-High" 
  | "Verified First";

export interface FilterState {
  searchQuery: string;
  country: string | null;
  state: string | null;
  city: string | null;
  category: string | null;
  industry: string | null;
  companyType: string | null;
  ownership: string | null;
  foundedYear: string | null;
  employeeSize: string | null;
  revenueRange: string | null;
  certifications: string[];
  verifiedOnly: boolean;
  bookmarkedOnly: boolean;
  hasWebsite: boolean;
  hasLinkedIn: boolean;
  hasProducts: boolean;
  hasServices: boolean;
}

const emptyFilters: FilterState = {
  searchQuery: "",
  country: null,
  state: null,
  city: null,
  category: null,
  industry: null,
  companyType: null,
  ownership: null,
  foundedYear: null,
  employeeSize: null,
  revenueRange: null,
  certifications: [],
  verifiedOnly: false,
  bookmarkedOnly: false,
  hasWebsite: false,
  hasLinkedIn: false,
  hasProducts: false,
  hasServices: false,
};

export function useCompanyDirectory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [activeFilters, setActiveFilters] = useState<FilterState>(emptyFilters);
  const [draftFilters, setDraftFilters] = useState<FilterState>(emptyFilters);
  
  const [sortOption, setSortOption] = useState<SortOption>((searchParams.get("sort") as SortOption) || "Featured");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(Number(searchParams.get("pageSize")) || 12);

  // Sync Draft -> Active
  const applyFilters = () => {
    setActiveFilters(draftFilters);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setDraftFilters(emptyFilters);
    setActiveFilters(emptyFilters);
    setCurrentPage(1);
  };

  const resetFiltersToActive = () => {
    setDraftFilters(activeFilters);
  };

  const applyFilterUpdates = (updates: Partial<FilterState>) => {
    const newState = { ...draftFilters, ...updates };
    setDraftFilters(newState);
    setActiveFilters(newState);
    setCurrentPage(1);
  };

  // Build query params for the API request based on active filters
  const apiFilters: CompanyFilters = useMemo(() => {
    return {
      search: activeFilters.searchQuery || undefined,
      country: activeFilters.country || undefined,
      state: activeFilters.state || undefined,
      city: activeFilters.city || undefined,
      category: activeFilters.category || undefined,
      industry: activeFilters.industry || undefined,
      companyType: activeFilters.companyType || undefined,
      employeeSize: activeFilters.employeeSize || undefined,
      revenueRange: activeFilters.revenueRange || undefined,
      certifications: activeFilters.certifications.length > 0 ? activeFilters.certifications : undefined,
      page: currentPage,
      pageSize: itemsPerPage,
      sort: sortOption
    };
  }, [activeFilters, currentPage, itemsPerPage, sortOption]);

  // Fetch Companies from Real Backend API
  const { data: queryData, isLoading, error } = useQuery({
    queryKey: ['companies', apiFilters],
    queryFn: () => companyService.getCompanies(apiFilters),
    // Fallback while API is potentially missing in development
    retry: false
  });

  // Sync state to URL 
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) params.set(key, value.join(","));
      } else if (typeof value === "boolean") {
        if (value) params.set(key, "true");
      } else if (value) {
        params.set(key, value as string);
      }
    });

    if (sortOption !== "Featured") params.set("sort", sortOption);
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (itemsPerPage !== 12) params.set("pageSize", itemsPerPage.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [activeFilters, sortOption, currentPage, itemsPerPage, pathname, router]);

  // Use actual response from backend or fallback to empty state
  const paginatedCompanies: Company[] = useMemo(() => queryData?.data || [], [queryData?.data]);
  const totalItems = queryData?.total || 0;
  const totalPages = queryData?.totalPages || 1;

  // Derived dynamically from paginated data for now (ideally from a facets API endpoint)
  const availableCategories = useMemo(() => Array.from(new Set(paginatedCompanies.map((c: Company) => c.category).filter((cat) => cat && cat !== "API / Bulk Drugs"))), [paginatedCompanies]);
  const availableCompanyTypes = useMemo(() => Array.from(new Set(paginatedCompanies.map((c: Company) => c.industry).filter(Boolean))), [paginatedCompanies]);
  const availableProducts = useMemo(() => Array.from(new Set(paginatedCompanies.flatMap((c: Company) => c.products || []).filter(Boolean))), [paginatedCompanies]);

  return {
    activeFilters,
    draftFilters,
    setDraftFilters,
    sortOption, setSortOption,
    currentPage, setCurrentPage,
    itemsPerPage, setItemsPerPage,
    totalItems,
    totalPages,
    paginatedCompanies,
    availableCategories,
    availableCompanyTypes,
    availableProducts,
    applyFilters,
    applyFilterUpdates,
    clearAllFilters,
    resetFiltersToActive,
    emptyFilters,
    isLoading,
    error
  };
}
