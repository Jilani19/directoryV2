import React from "react";
import { Search, ChevronDown, RotateCcw } from "lucide-react";
import { FilterState } from "../hooks/useCompanyDirectory";

interface FilterSidebarProps {
  draftFilters: FilterState;
  setDraftFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableCategories: string[];
  availableCompanyTypes: string[];
  availableCertifications: string[];
  availableProducts: string[];
  availableRevenueRanges: string[];
  availableEmployeeSizes: string[];
  onApply: () => void;
  onClear: () => void;
}

export function FilterSidebar({
  draftFilters, setDraftFilters,
  availableCategories, availableCompanyTypes, availableCertifications,
  availableProducts, availableRevenueRanges, availableEmployeeSizes,
  onApply, onClear
}: FilterSidebarProps) {
  // Location filtering has been removed per master prompt constraints
  return (
    <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 p-6 flex flex-col gap-6 w-full max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-md overflow-y-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
        <h3 className="font-bold text-slate-900 dark:text-white">Refine Your Search</h3>
        <button onClick={onClear} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Clear All</button>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-col gap-5 border-t border-slate-100 dark:border-white/10 pt-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-900 dark:text-white">Category</label>
          <div className="relative">
            <select 
              value={draftFilters.category || ""}
              onChange={e => setDraftFilters(prev => ({...prev, category: e.target.value || null}))}
              className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="">All Categories</option>
              {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-900 dark:text-white">Company Type</label>
          <div className="relative">
            <select 
              value={draftFilters.companyType || ""}
              onChange={e => setDraftFilters(prev => ({...prev, companyType: e.target.value || null}))}
              className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="">All Types</option>
              {availableCompanyTypes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-900 dark:text-white">Certifications</label>
          <div className="relative">
            <select 
              value={draftFilters.certifications[0] || ""}
              onChange={e => setDraftFilters(prev => ({...prev, certifications: e.target.value ? [e.target.value] : []}))}
              className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="">All Certifications</option>
              {availableCertifications.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-900 dark:text-white">Products / Services</label>
          <div className="relative">
            <select 
              value=""
              onChange={() => {}}
              className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="">All Products</option>
              {availableProducts.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-900 dark:text-white">Revenue Range</label>
          <div className="relative">
            <select 
              value={draftFilters.revenueRange || ""}
              onChange={e => setDraftFilters(prev => ({...prev, revenueRange: e.target.value || null}))}
              className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="">All Revenue Ranges</option>
              {availableRevenueRanges.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-900 dark:text-white">Employee Size</label>
          <div className="relative">
            <select 
              value={draftFilters.employeeSize || ""}
              onChange={e => setDraftFilters(prev => ({...prev, employeeSize: e.target.value || null}))}
              className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="">All Employee Sizes</option>
              {availableEmployeeSizes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-3 mt-2 border-t border-slate-100 dark:border-white/10 pt-6">
        <button
          onClick={onApply}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
        <button
          onClick={onClear}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <RotateCcw size={16} /> Reset Filters
        </button>
      </div>

    </div>
  );
}
