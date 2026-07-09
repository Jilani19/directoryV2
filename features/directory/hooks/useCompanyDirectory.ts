"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { companies as MOCK_COMPANIES } from "../mock/companies";
import { ActiveLocation } from "./useLocation";
import { useBookmarks } from "./useBookmarks";
import { calculateDistanceKm } from "../../../lib/utils/distance";

export type SortOption = "Recently Added" | "Newest" | "Oldest" | "A-Z" | "Z-A" | "Employees High-Low" | "Employees Low-High" | "Verified First";

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
  certifications: [],
  verifiedOnly: false,
  bookmarkedOnly: false,
  hasWebsite: false,
  hasLinkedIn: false,
  hasProducts: false,
  hasServices: false,
};

export function useCompanyDirectory(activeLocation: ActiveLocation | null = null) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Active filters (applied to data & URL)
  // CRITICAL: We initialize from emptyFilters so that refresh clears all filters
  const [activeFilters, setActiveFilters] = useState<FilterState>(emptyFilters);

  // Draft filters (bound to UI controls)
  const [draftFilters, setDraftFilters] = useState<FilterState>(emptyFilters);
  
  const [sortOption, setSortOption] = useState<SortOption>((searchParams.get("sort") as SortOption) || "Recently Added");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [itemsPerPage, setItemsPerPage] = useState(Number(searchParams.get("pageSize")) || 12);

  // Sync Draft -> Active when applying
  const applyFilters = () => {
    setActiveFilters(draftFilters);
    setCurrentPage(1); // Reset to page 1 on new filter
  };

  const clearAllFilters = () => {
    setDraftFilters(emptyFilters);
    setActiveFilters(emptyFilters);
    setCurrentPage(1);
  };

  const resetFiltersToActive = () => {
    setDraftFilters(activeFilters);
  };

  // Sync state to URL when activeFilters, sortOption, currentPage, or itemsPerPage changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    // We only push filters to URL to allow sharing the link, 
    // but on refresh, Next.js hydration will ignore them per requirements.
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) params.set(key, value.join(","));
      } else if (typeof value === "boolean") {
        if (value) params.set(key, "true");
      } else if (value) {
        params.set(key, value as string);
      }
    });

    if (sortOption !== "Recently Added") params.set("sort", sortOption);
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (itemsPerPage !== 12) params.set("pageSize", itemsPerPage.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [activeFilters, sortOption, currentPage, itemsPerPage, pathname, router]);

  // Derive unique options for dropdowns based on MOCK data
  const availableCountries = useMemo(() => Array.from(new Set(MOCK_COMPANIES.map(c => c.country))), []);
  const availableStates = useMemo(() => Array.from(new Set(MOCK_COMPANIES.filter(c => !draftFilters.country || c.country === draftFilters.country).map(c => c.state))), [draftFilters.country]);
  const availableCities = useMemo(() => Array.from(new Set(MOCK_COMPANIES.filter(c => !draftFilters.state || c.state === draftFilters.state).map(c => c.city))), [draftFilters.state]);
  const availableCategories = useMemo(() => Array.from(new Set(MOCK_COMPANIES.map(c => c.category))), []);
  const availableIndustries = useMemo(() => Array.from(new Set(MOCK_COMPANIES.map(c => c.industry))), []);
  const availableCompanyTypes = useMemo(() => Array.from(new Set(MOCK_COMPANIES.map(c => c.companyType).filter(Boolean) as string[])), []);
  const availableOwnership = useMemo(() => Array.from(new Set(MOCK_COMPANIES.map(c => c.ownership).filter(Boolean) as string[])), []);
  const availableFoundedYears = useMemo(() => Array.from(new Set(MOCK_COMPANIES.map(c => c.founded))).sort(), []);
  const availableEmployeeSizes = useMemo(() => Array.from(new Set(MOCK_COMPANIES.map(c => c.employees))), []);

  const { bookmarkedIds } = useBookmarks();

  // Filter Data (Using ACTIVE filters)
  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter((company) => {
      if (activeFilters.searchQuery) {
        const query = activeFilters.searchQuery.toLowerCase();
        const searchFields = [
          company.name, company.description, company.category, company.industry, 
          company.website, company.country, company.state, company.city,
          ...(company.products || []), ...(company.services || [])
        ].filter(Boolean).map(f => f.toLowerCase());
        
        if (!searchFields.some(f => f.includes(query))) return false;
      }
      if (activeFilters.country && company.country !== activeFilters.country) return false;
      if (activeFilters.state && company.state !== activeFilters.state) return false;
      if (activeFilters.city && company.city !== activeFilters.city) return false;
      if (activeFilters.category && company.category !== activeFilters.category) return false;
      if (activeFilters.industry && company.industry !== activeFilters.industry) return false;
      if (activeFilters.companyType && company.companyType !== activeFilters.companyType) return false;
      if (activeFilters.ownership && company.ownership !== activeFilters.ownership) return false;
      if (activeFilters.foundedYear && company.founded !== activeFilters.foundedYear) return false;
      if (activeFilters.employeeSize && company.employees !== activeFilters.employeeSize) return false;
      
      if (activeFilters.certifications.length > 0) {
        if (!activeFilters.certifications.every(cert => (company.certifications || []).includes(cert))) return false;
      }

      if (activeFilters.verifiedOnly && !company.verified) return false;
      if (activeFilters.hasWebsite && (!company.website || company.website === "")) return false;
      if (activeFilters.hasLinkedIn && (!company.socialLinks?.linkedin)) return false;
      if (activeFilters.hasProducts && (!company.products || company.products.length === 0)) return false;
      if (activeFilters.hasServices && (!company.services || company.services.length === 0)) return false;
      if (activeFilters.bookmarkedOnly && !bookmarkedIds.includes(company.id)) return false;
      
      return true;
    });
  }, [activeFilters, bookmarkedIds]);

  // Sort & Tag Data with Proximity
  const { sortedCompanies, proximityStats } = useMemo(() => {
    let list = [...filteredCompanies];
    let matchLevel: "City" | "District" | "State" | "Nearby" | "Country" | "Global" = "Global";
    let matchCount = list.length; // Default to global count

    if (activeLocation) {
      let cityCount = 0;
      let districtCount = 0;
      let stateCount = 0;
      let nearbyCount = 0;
      let countryCount = 0;

      // Tag companies and calculate distance
      list = list.map(company => {
        let badge: "Near You" | "Country Match" | "Global" = "Global";
        let score = 0;
        let distanceKm: number | undefined = undefined;

        // Calculate distance if both location and company have coordinates
        if (
          activeLocation.lat !== undefined && activeLocation.lon !== undefined &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (company as any).latitude !== undefined && (company as any).longitude !== undefined
        ) {
          distanceKm = calculateDistanceKm(
            activeLocation.lat,
            activeLocation.lon,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (company as any).latitude,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (company as any).longitude
          );
        }

        const isCity = activeLocation.city && company.city === activeLocation.city;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isDistrict = activeLocation.district && (company as any).district === activeLocation.district;
        const isState = activeLocation.state && company.state === activeLocation.state;
        const isNearby = distanceKm !== undefined && distanceKm <= 500;
        const isCountry = activeLocation.country && company.country === activeLocation.country;

        if (isCity) {
          badge = "Near You";
          score = 10000;
          cityCount++;
        } else if (isDistrict) {
          badge = "Near You";
          score = 9000;
          districtCount++;
        } else if (isState) {
          badge = "Near You";
          score = 8000;
          stateCount++;
        } else if (isNearby) {
          badge = "Near You";
          score = 7000;
          nearbyCount++;
        } else if (isCountry) {
          badge = "Country Match";
          score = 5000;
          countryCount++;
        }

        // We temporarily attach the score and distance to sort it easily
        return { ...company, proximityBadge: badge, _proximityScore: score, distanceKm };
      });

      // Determine the Match Level and Count based on priority
      if (activeLocation.city && cityCount > 0) {
        matchLevel = "City";
        matchCount = cityCount;
      } else if (activeLocation.district && districtCount > 0) {
        matchLevel = "District";
        matchCount = districtCount;
      } else if (activeLocation.state && stateCount > 0) {
        matchLevel = "State";
        matchCount = stateCount;
      } else if (nearbyCount > 0) {
        matchLevel = "Nearby";
        matchCount = nearbyCount;
      } else if (activeLocation.country && countryCount > 0) {
        matchLevel = "Country";
        matchCount = countryCount;
      } else {
        matchLevel = "Global";
        matchCount = list.length;
      }
    } else {
      // Default Global badge if no location
      list = list.map(company => ({ ...company, proximityBadge: "Global", _proximityScore: 0 }));
    }

    // STRICT MULTI-FACTOR SORT
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list.sort((a: any, b: any) => {
      // 1. Primary Sort: Proximity Score Tier (Descending)
      if (activeLocation) {
        const scoreA = a._proximityScore || 0;
        const scoreB = b._proximityScore || 0;
        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }
        
        // If they are in the same proximity tier (e.g. both Near You), sort by precise distance
        if (scoreA > 5000 && a.distanceKm !== undefined && b.distanceKm !== undefined) {
          return a.distanceKm - b.distanceKm;
        }
      }

      // 2. Secondary Sort: User Sort Option (applied within their location group)
      switch (sortOption) {
        case "A-Z":
          return a.name.localeCompare(b.name);
        case "Z-A":
          return b.name.localeCompare(a.name);
        case "Newest":
        case "Recently Added":
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case "Oldest":
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        case "Verified First":
          return (a.verified === b.verified ? 0 : a.verified ? -1 : 1);
        case "Employees High-Low":
          return parseInt(b.employees.replace(/\D/g, '')) - parseInt(a.employees.replace(/\D/g, ''));
        case "Employees Low-High":
          return parseInt(a.employees.replace(/\D/g, '')) - parseInt(b.employees.replace(/\D/g, ''));
        default:
          return 0;
      }
    });

    // We do NOT clean up _proximityScore here, we need it to group the companies in the UI.
    // We will clean it up in the rendering layer if needed, or just let it pass through.
    
    return { sortedCompanies: list, proximityStats: { level: matchLevel, count: matchCount } };
  }, [filteredCompanies, sortOption, activeLocation]);
  const totalItems = sortedCompanies.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedCompanies.slice(start, start + itemsPerPage);
  }, [sortedCompanies, currentPage, itemsPerPage]);

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
    availableCountries,
    availableStates,
    availableCities,
    availableCategories,
    availableIndustries,
    availableCompanyTypes,
    availableOwnership,
    availableFoundedYears,
    availableEmployeeSizes,
    applyFilters,
    clearAllFilters,
    resetFiltersToActive,
    emptyFilters,
    proximityStats
  };
}
