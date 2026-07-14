import React from "react";
import { CompanyCard } from "./CompanyCard";
import { CompanyListCard } from "./CompanyListCard";
import { TableView } from "./TableView";
import { AGGridTable } from "./AGGridTable";
import { CompanyCardSkeleton, CompanyListCardSkeleton } from "./Skeletons";
import { Company } from "../services/company.service";

import { ActiveLocation } from "../hooks/useLocation";

interface CompanyGridProps {
  companies: Company[];
  viewMode: "grid" | "compact" | "ag-grid" | "table" | "map";
  isLoading?: boolean;
  activeLocation?: ActiveLocation | null;
}

export function CompanyGrid({ companies, viewMode, isLoading, activeLocation }: CompanyGridProps) {
  
  if (isLoading) {
    if (viewMode === "compact" || viewMode === "table") {
      return (
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <CompanyListCardSkeleton key={i} />
          ))}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <CompanyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center border border-dashed border-slate-300 dark:border-white/20 rounded-3xl bg-slate-50 dark:bg-white/5 w-full">
        <div className="w-24 h-24 mb-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
          <span className="text-4xl opacity-50">🔍</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No companies found</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm leading-relaxed mb-6">
          We couldn&apos;t find any companies matching your current filters. Try adjusting your search criteria, removing some filters, or clearing everything.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  if (viewMode === "compact") {
    return (
      <div className="flex flex-col gap-4 w-full">
        {companies.map((company) => (
          <CompanyListCard key={company.id} company={company} />
        ))}
      </div>
    );
  }

  if (viewMode === "table") {
    return <TableView companies={companies} />;
  }

  if (viewMode === "ag-grid") {
    return <AGGridTable companies={companies} />;
  }

  if (viewMode === "map") {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center border border-slate-200 dark:border-white/10 rounded-3xl bg-slate-50 dark:bg-slate-900/50 w-full">
        <span className="text-6xl mb-6">🗺️</span>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Map View</h3>
        <p className="text-slate-500 dark:text-slate-400">Map integration is loading...</p>
      </div>
    );
  }

  // Fallback to "grid" view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
