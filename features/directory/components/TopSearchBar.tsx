import React from "react";
import { Search, Map, Bookmark } from "lucide-react";

interface TopSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export function TopSearchBar({ searchQuery, setSearchQuery, onSearch }: TopSearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-[#0F172A] p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 w-full">
      <div className="relative flex-1 flex items-center h-12 w-full">
        <Search size={20} className="absolute left-4 text-slate-400" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Search company by name, keyword, or specialization..."
          className="w-full h-full pl-12 pr-4 bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-400"
        />
        <button 
          onClick={onSearch}
          className="absolute right-1 w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
        >
          <Search size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto shrink-0">

        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-12 px-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
          <Map size={18} className="text-indigo-500" /> Map View
        </button>
      </div>
    </div>
  );
}
