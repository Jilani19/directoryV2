import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onEnter: () => void;
  clear: () => void;
}

export function SearchBar({ searchQuery, setSearchQuery, onEnter, clear }: SearchBarProps) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-[#0F172A] p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 w-full">
      <div className="relative flex-1 flex items-center h-12">
        <Search size={20} className="absolute left-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnter()}
          placeholder="Search companies, keywords, specialties..."
          className="w-full h-full pl-12 pr-4 bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={clear}
            className="absolute right-2 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-700"
            aria-label="Clear search"
          >
            X
          </button>
        )}
        <button
          onClick={onEnter}
          className="absolute right-10 w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
