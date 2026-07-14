"use client";
import React, { useState } from "react";
import { availableEmployeeSizes, CERTIFICATIONS } from "../../features/directory/constants";
import { Hero } from "../../features/directory/components/Hero";
import { TopSearchBar } from "../../features/directory/components/TopSearchBar";
import { CategoryHorizontalBar } from "../../features/directory/components/CategoryHorizontalBar";
import { FilterSidebar } from "../../features/directory/components/FilterSidebar";
import { availableRevenueRanges, availableProductsList } from "../../features/directory/constants";
import { ResultsHeader } from "../../features/directory/components/ResultsHeader";
import { Container } from "../../components/layout/Container";
import { CompanyCard } from "../../features/directory/components/CompanyCard";
import { CompanyListCard } from "../../features/directory/components/CompanyListCard";
import { AGGridTable } from "../../features/directory/components/AGGridTable";
import { TableView } from "../../features/directory/components/TableView";
import { Pagination } from "../../features/directory/components/Pagination";
import { DirectoryCTA } from "../../features/directory/components/DirectoryCTA";
import { useCompanyDirectory } from "../../features/directory/hooks/useCompanyDirectory";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../../features/directory/components/MapView"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center">Loading Map...</div>
});

function DirectoryContent() {
  const [viewMode, setViewMode] = useState<"grid" | "compact" | "ag-grid" | "table" | "map">("grid");

  const {
    activeFilters,
    draftFilters,
    setDraftFilters,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    totalPages,
    paginatedCompanies,
    availableCategories,
    availableCompanyTypes,
    availableProducts,
    applyFilters,
    clearAllFilters,
  } = useCompanyDirectory();


  // Handle Search Execution
  const handleSearch = () => {
    applyFilters();
  };

  const renderContent = () => {
    if (paginatedCompanies.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 rounded-2xl w-full">
          <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Search size={28} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No companies found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
            We couldn't find any companies matching your current filters. Try adjusting your search criteria or clearing filters.
          </p>
          <button 
            onClick={clearAllFilters} 
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-sm"
          >
            Clear All Filters
          </button>
        </div>
      );
    }

    switch (viewMode) {
      case "ag-grid":
        return <AGGridTable companies={paginatedCompanies} />;
      case "table":
        return <TableView companies={paginatedCompanies} />;
      case "map":
        return <MapView companies={paginatedCompanies} />;
      case "compact":
        return (
          <div className="flex flex-col gap-4 w-full">
            <AnimatePresence mode="popLayout">
              {paginatedCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <CompanyListCard company={company} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );
      case "grid":
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {paginatedCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <CompanyCard company={company} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-transparent pb-20">
      
      {/* 1. Hero Section */}
      <Hero />

      <Container className="-mt-14 relative z-20">
        
        {/* 2. Search Section */}
        <div className="mb-6">
          <TopSearchBar 
            searchQuery={draftFilters.searchQuery}
            setSearchQuery={(val) => setDraftFilters(prev => ({ ...prev, searchQuery: val }))}
            onSearch={handleSearch}
          />
        </div>

        {/* 3. Category Strip */}
        <div className="mb-10">
          <CategoryHorizontalBar 
            activeCategory={draftFilters.category}
            onSelectCategory={(val) => {
              setDraftFilters(prev => ({ ...prev, category: val }));
              applyFilters();
            }}
          />
        </div>

        {/* 4. Directory Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 5. Filter Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 sticky top-[90px] h-[calc(100vh-100px)] overflow-y-auto hide-scrollbar rounded-xl border border-transparent">
            <FilterSidebar
              draftFilters={draftFilters}
              setDraftFilters={setDraftFilters}
              availableCategories={availableCategories}
              availableCompanyTypes={availableCompanyTypes}
              availableCertifications={CERTIFICATIONS}
              availableProducts={availableProductsList}
              availableRevenueRanges={availableRevenueRanges}
              availableEmployeeSizes={availableEmployeeSizes}
              onApply={applyFilters}
              onClear={clearAllFilters}
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col w-full overflow-hidden">
            
            {/* 6. Results Header & View Toggles */}
            <ResultsHeader 
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              totalCompanies={totalItems}
            />

            {/* Content Area */}
            <div className="mt-4 min-h-[500px]">
              {renderContent()}
            </div>

            {/* 7. Pagination */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={setItemsPerPage}
            />

            {/* 8. CTA Banner */}
            <DirectoryCTA />

          </div>
        </div>

      </Container>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Directory...</div>}>
      <DirectoryContent />
    </React.Suspense>
  );
}
