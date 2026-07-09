"use client";

import React, { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { SearchFilters } from "./components/SearchFilters";
import { ResultsHeader } from "./components/ResultsHeader";
import { CompanyGrid } from "./components/CompanyGrid";
import { Pagination } from "./components/Pagination";
import { Container } from "../../components/layout/Container";
import { useCompanyDirectory } from "./hooks/useCompanyDirectory";
import { useLocation } from "./hooks/useLocation";
import { LocationCard } from "./components/LocationCard";

export function DirectoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  
  const locationObj = useLocation();

  const {
    activeFilters,
    draftFilters,
    setDraftFilters,
    sortOption, setSortOption,
    currentPage, setCurrentPage,
    itemsPerPage, setItemsPerPage,
    totalItems,
    totalPages,
    paginatedCompanies,
    availableCountries, availableStates, availableCities, availableCategories,
    availableIndustries, availableCompanyTypes, availableOwnership, availableFoundedYears, availableEmployeeSizes,
    applyFilters, clearAllFilters, resetFiltersToActive, emptyFilters,
    proximityStats
  } = useCompanyDirectory(locationObj.activeLocation);

  // Simulate network latency when filters/sort/page changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSimulatingLoad(true);
    const timer = setTimeout(() => {
      setIsSimulatingLoad(false);
    }, 600); // 600ms fake load to show skeletons
    return () => clearTimeout(timer);
  }, [activeFilters, sortOption, currentPage, viewMode]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 w-full">
      <Hero />
      
      <Container>
        <div className="flex flex-col w-full">
          <SearchFilters 
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
            activeFilters={activeFilters}
            applyFilters={applyFilters}
            clearAllFilters={clearAllFilters}
            resetFiltersToActive={resetFiltersToActive}
            emptyFilters={emptyFilters}
            availableCountries={availableCountries}
            availableStates={availableStates}
            availableCities={availableCities}
            availableCategories={availableCategories}
            availableIndustries={availableIndustries}
            availableCompanyTypes={availableCompanyTypes}
            availableOwnership={availableOwnership}
            availableFoundedYears={availableFoundedYears}
            availableEmployeeSizes={availableEmployeeSizes}
            locationObj={locationObj}
          />

          <LocationCard 
            location={locationObj.activeLocation}
            isLoading={locationObj.isLoading}
            proximityStats={proximityStats}
            onDetectLocation={locationObj.detectLocation}
            onSetLocation={locationObj.setManualLocation}
          />
          
          <ResultsHeader 
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          
          <CompanyGrid 
            companies={paginatedCompanies}
            viewMode={viewMode}
            isLoading={isSimulatingLoad}
            activeLocation={locationObj.activeLocation}
          />

          {totalItems > 0 && (
            <Pagination 
               currentPage={currentPage}
               totalPages={totalPages}
               totalItems={totalItems}
               itemsPerPage={itemsPerPage}
               onPageChange={setCurrentPage}
               onPageSizeChange={setItemsPerPage}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
