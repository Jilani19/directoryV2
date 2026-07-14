import React, { useState } from "react";
import { LayoutGrid, List, TableProperties, Map, ChevronDown, LayoutList } from "lucide-react";
import { cn } from "../../../lib/cn";
import { SortOption } from "../hooks/useCompanyDirectory";

interface ResultsHeaderProps {
  viewMode: "grid" | "compact" | "ag-grid" | "table" | "map";
  setViewMode: (mode: "grid" | "compact" | "ag-grid" | "table" | "map") => void;
  sortOption: SortOption;
  setSortOption: (val: SortOption) => void;
  totalCompanies?: number;
}

export function ResultsHeader({ viewMode, setViewMode, sortOption, setSortOption, totalCompanies = 20000 }: ResultsHeaderProps) {
  const [openSort, setOpenSort] = useState(false);
  const sortOptions: SortOption[] = [
    "Featured",
    "Newest",
    "Revenue",
    "Employees",
    "Recently Updated",
    "A-Z"
  ];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 w-full border-b border-slate-200 dark:border-white/10 mb-2">
      
      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Showing 1 – 12 of {totalCompanies > 20000 ? "20,000+" : totalCompanies.toLocaleString()} companies
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto relative z-10">
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0 relative">
          <span className="text-xs font-semibold text-slate-500">Sort by:</span>
          <button 
            onClick={() => setOpenSort(!openSort)}
            className="flex items-center justify-between min-w-[140px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 dark:text-white shadow-sm transition-all focus:outline-none"
          >
            {sortOption}
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${openSort ? 'rotate-180' : ''}`} />
          </button>
          
          {openSort && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0F172A] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/10 py-1 z-50">
              {sortOptions.map(option => (
                <button
                  key={option}
                  onClick={() => { setSortOption(option); setOpenSort(false); }}
                  className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${sortOption === option ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Toggles */}
        <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-lg p-1 shrink-0">
          <button 
            onClick={() => setViewMode("grid")}
            className={cn("p-1.5 rounded-md transition-all focus:outline-none", viewMode === "grid" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            title="Grid View"
          >
            <LayoutGrid size={16} />
          </button>
          <button 
            onClick={() => setViewMode("compact")}
            className={cn("p-1.5 rounded-md transition-all focus:outline-none", viewMode === "compact" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            title="Compact View"
          >
            <List size={16} />
          </button>
          <button 
            onClick={() => setViewMode("table")}
            className={cn("p-1.5 rounded-md transition-all focus:outline-none", viewMode === "table" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            title="Table View"
          >
            <LayoutList size={16} />
          </button>
          <button 
            onClick={() => setViewMode("ag-grid")}
            className={cn("p-1.5 rounded-md transition-all focus:outline-none", viewMode === "ag-grid" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            title="AG Grid View"
          >
            <TableProperties size={16} />
          </button>
          <button 
            onClick={() => setViewMode("map")}
            className={cn("p-1.5 rounded-md transition-all focus:outline-none", viewMode === "map" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            title="Map View"
          >
            <Map size={16} />
          </button>
        </div>

      </div>
      {openSort && <div className="fixed inset-0 z-[5]" onClick={() => setOpenSort(false)} />}
    </div>
  );
}
