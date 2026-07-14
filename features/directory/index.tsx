"use client";

import React, { useState } from "react";
import { useCompanyDirectory } from "./hooks/useCompanyDirectory";
import { Container } from "../../components/layout/Container";
import { Hero } from "./components/Hero";
import { TopSearchBar } from "./components/TopSearchBar";
import { CategoryHorizontalBar } from "./components/CategoryHorizontalBar";
import { FilterSidebar } from "./components/FilterSidebar";
import { ResultsHeader } from "./components/ResultsHeader";
import { CompanyGrid } from "./components/CompanyGrid";
import { Pagination } from "./components/Pagination";
import { DirectoryCTA } from "./components/DirectoryCTA";

export function DirectoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "compact" | "ag-grid" | "table" | "map">("grid");
  const isSimulatingLoad = false;
  
  const {
    // activeFilters unused directly here
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
    // availableProducts unused directly here
    applyFilters, applyFilterUpdates, clearAllFilters
  } = useCompanyDirectory();

  const availableCertifications = ["FDA Registered", "EU GMP", "WHO GMP", "ISO 9001", "ISO 13485", "USFDA", "EMA", "MHRA", "PMDA", "TGA"];
  const availableRevenueRanges = ["$0 - $1M", "$1M - $10M", "$10M - $50M", "$50M - $100M", "$100M+"];
  const availableEmployeeSizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
  const availableProductsList = ["Pharmaceuticals", "Biotech", "Medical Devices", "Software", "Consulting", "Manufacturing"];

  // removed useEffect to fix lint error
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafe] dark:bg-slate-900 w-full">
      <Hero />
      
      <Container className="relative z-20 -mt-16 pb-32 max-w-[1400px]">
        <div className="flex flex-col gap-8">
          <TopSearchBar 
            searchQuery={draftFilters.searchQuery}
            setSearchQuery={(query) => setDraftFilters({...draftFilters, searchQuery: query})}
            onSearch={applyFilters}
          />
          
          <CategoryHorizontalBar 
            activeCategory={draftFilters.category}
            onSelectCategory={(cat) => {
              applyFilterUpdates({ category: cat });
            }}
          />
          
          <div className="flex flex-col lg:flex-row gap-10 mt-6">
            <div className="w-full lg:w-[280px] shrink-0">
              <FilterSidebar 
                draftFilters={draftFilters}
                setDraftFilters={setDraftFilters}
                availableCategories={availableCategories}
                availableCompanyTypes={availableCompanyTypes}
                availableCertifications={availableCertifications}
                availableProducts={availableProductsList}
                availableRevenueRanges={availableRevenueRanges}
                availableEmployeeSizes={availableEmployeeSizes}
                onApply={applyFilters}
                onClear={clearAllFilters}
              />
            </div>

            <div className="flex-1 flex flex-col gap-6 min-w-0">
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
                activeLocation={null}
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
          </div>

          <DirectoryCTA />
        </div>
      </Container>
    </div>
  );
}
