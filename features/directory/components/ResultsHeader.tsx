import React, { useState } from "react";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import { cn } from "../../../lib/cn";
import { SortOption } from "../hooks/useCompanyDirectory";

interface ResultsHeaderProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortOption: SortOption;
  setSortOption: (val: SortOption) => void;
}

export function ResultsHeader({ viewMode, setViewMode, sortOption, setSortOption }: ResultsHeaderProps) {
  const [openSort, setOpenSort] = useState(false);
  const sortOptions: SortOption[] = [
    "Recently Added",
    "Newest",
    "Oldest",
    "A-Z",
    "Z-A",
    "Employees High-Low",
    "Employees Low-High",
    "Verified First"
  ];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8">
      
      {/* Spacer or empty div to push Toggles & Sort to the right if needed, or remove completely. 
          The user requested to remove the count & info. We will leave a blank div so flex-between works or just rely on ml-auto */}
      <div className="hidden md:block" />

      {/* Toggles & Sort */}
      <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
        
        {/* View Toggle */}
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm shrink-0">
          <button 
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              viewMode === "grid" 
                ? "bg-primary text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            )}
            aria-label="Grid View"
          >
            <LayoutGrid size={16} />
            <span className="hidden sm:inline">Card View</span>
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              viewMode === "list" 
                ? "bg-primary text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            )}
            aria-label="List View"
          >
            <List size={18} />
            <span className="hidden sm:inline">List View</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-2 relative">
          <span className="text-sm font-medium text-slate-500 hidden sm:inline">Sort by:</span>
          <button 
            onClick={() => setOpenSort(!openSort)}
            className="flex items-center justify-between min-w-[160px] bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {sortOption}
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${openSort ? 'rotate-180' : ''}`} />
          </button>
          
          {openSort && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
              {sortOptions.map(option => (
                <button
                  key={option}
                  onClick={() => { setSortOption(option); setOpenSort(false); }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${sortOption === option ? 'bg-primary/5 text-primary font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {openSort && <div className="fixed inset-0 z-[5]" onClick={() => setOpenSort(false)} />}
    </div>
  );
}
