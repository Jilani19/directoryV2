"use client";
import React, { useState } from "react";
import { Search, X, Loader2, MapPin, Target, ChevronDown, ChevronUp, Check } from "lucide-react";
import { FilterChip } from "./FilterChip";
import { SearchHeader } from "./SearchHeader";
import { SearchBar } from "./SearchBar";
import { FilterGrid } from "./FilterGrid";
import FilterCard from "./FilterCard";
import ActiveFilters from "./ActiveFilters";
import { CERTIFICATIONS } from "../constants";
import { FilterActions } from "./FilterActions";
import { FilterSummary } from "./FilterSummary";
import { Card } from "./design/Card";

interface SearchFiltersProps {
  draftFilters: any;
  setDraftFilters: React.Dispatch<React.SetStateAction<any>>;
  activeFilters: any;
  applyFilters: () => void;
  clearAllFilters: () => void;
  resetFiltersToActive: () => void;
  emptyFilters: any;
  availableCountries: string[];
  availableStates: string[];
  availableCities: string[];
  availableCategories: string[];
  availableIndustries: string[];
  availableCompanyTypes: string[];
  availableOwnership: string[];
  availableFoundedYears: string[];
  availableEmployeeSizes: string[];
  locationObj: any;
}

export function SearchFilters({
  draftFilters,
  setDraftFilters,
  activeFilters,
  applyFilters,
  clearAllFilters,
  availableCountries,
  availableCategories,
  availableIndustries,
  availableCompanyTypes,
  availableOwnership,
  availableFoundedYears,
  availableEmployeeSizes,
  locationObj,
}: SearchFiltersProps) {
  const { activeLocation: location, isLoading: isGeoLoading, error: geoError, detectLocation } = locationObj;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const hasUnsavedChanges = JSON.stringify(draftFilters) !== JSON.stringify(activeFilters);

  const toggleDropdown = (name: string) => setOpenDropdown(openDropdown === name ? null : name);

  const handleCertToggle = (cert: string) => {
    setDraftFilters((prev: any) => {
      const isSelected = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: isSelected ? prev.certifications.filter((c: string) => c !== cert) : [...prev.certifications, cert],
      };
    });
  };

  const handleApply = () => {
    applyFilters();
  };

  const handleReset = () => {
    clearAllFilters();
  };

  // Generate active chips (excluding search query)
  const activeChips = Object.entries(activeFilters).reduce((chips: any[], [key, value]) => {
    if (key === "searchQuery") return chips;
    if (typeof value === "boolean" && value) {
      chips.push({
        id: key,
        label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str: string) => str.toUpperCase()),
        onRemove: () => {
          setDraftFilters((prev: any) => ({ ...prev, [key]: false }));
          setTimeout(applyFilters, 0);
        },
      });
    } else if (Array.isArray(value)) {
      value.forEach((cert: string) => {
        chips.push({
          id: `cert-${cert}`,
          label: cert,
          onRemove: () => {
            setDraftFilters((prev: any) => ({ ...prev, certifications: prev.certifications.filter((c: string) => c !== cert) }));
            setTimeout(applyFilters, 0);
          },
        });
      });
    } else if (value) {
      chips.push({
        id: key,
        label: `${value}`,
        onRemove: () => {
          setDraftFilters((prev: any) => ({ ...prev, [key]: null }));
          setTimeout(applyFilters, 0);
        },
      });
    }
    return chips;
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 flex flex-col gap-6 mx-auto max-w-7xl">
      <SearchHeader />
      <SearchBar
        searchQuery={draftFilters.searchQuery}
        setSearchQuery={(q: string) => setDraftFilters((prev: any) => ({ ...prev, searchQuery: q }))}
        onEnter={handleApply}
        clear={() => { setDraftFilters((prev: any) => ({ ...prev, searchQuery: "" })); setTimeout(applyFilters, 0); }}
      />
      {/* Location Dropdown */}
      <div className="lg:w-[320px] relative flex flex-col">
        <button
          type="button"
          onClick={() => toggleDropdown("country")}
          className="flex-1 flex items-center justify-between border border-slate-200 rounded-xl px-6 py-4 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary"
        >
          <div className="flex items-center gap-3 truncate">
            {isGeoLoading ? <Loader2 size={20} className="animate-spin text-primary shrink-0" /> : <MapPin size={20} className="text-primary shrink-0" />}
            <span className="text-base font-semibold text-slate-800 truncate">
              {draftFilters.city ? `${draftFilters.city}, ${draftFilters.country}` : draftFilters.country || "Any Location"}
            </span>
          </div>
          <ChevronDown size={18} className={`text-slate-400 transition-transform ${openDropdown === 'country' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === "country" && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-10 overflow-hidden max-h-72 overflow-y-auto">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-2">
              <button onClick={detectLocation} className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary font-bold text-sm rounded-xl hover:bg-primary/20 transition-colors">
                <Target size={18} /> Use Current Location
              </button>
              {location && (
                <span className="text-xs text-center text-slate-500 font-medium">Detected: {location.city}, {location.country}</span>
              )}
              {geoError && <span className="text-xs text-center text-rose-500 font-medium">{geoError}</span>}
            </div>
            <div className="p-2">
              <button onClick={() => { setDraftFilters((prev: any) => ({ ...prev, country: null, state: null, city: null })); setOpenDropdown(null); }} className="w-full text-left px-5 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Any Location</button>
              {availableCountries.map((c) => (
                <button key={c} onClick={() => { setDraftFilters((prev: any) => ({ ...prev, country: c, state: null, city: null })); setOpenDropdown(null); }} className="w-full text-left px-5 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">{c}</button>
              ))}
            </div>
          </div>
        )}
      </div>
      <FilterGrid>
        <FilterCard
          icon={<Search size={20} className="text-primary" />}
          label="Industry"
          value={draftFilters.industry || ""}
          options={["", ...availableIndustries]}
          onChange={(v) => setDraftFilters((prev: any) => ({ ...prev, industry: v || null }))}
        />
        <FilterCard
          icon={<Search size={20} className="text-primary" />}
          label="Category"
          value={draftFilters.category || ""}
          options={["", ...availableCategories]}
          onChange={(v) => setDraftFilters((prev: any) => ({ ...prev, category: v || null }))}
        />
        <FilterCard
          icon={<Search size={20} className="text-primary" />}
          label="Company Type"
          value={draftFilters.companyType || ""}
          options={["", ...availableCompanyTypes]}
          onChange={(v) => setDraftFilters((prev: any) => ({ ...prev, companyType: v || null }))}
        />
        <FilterCard
          icon={<Search size={20} className="text-primary" />}
          label="Ownership"
          value={draftFilters.ownership || ""}
          options={["", ...availableOwnership]}
          onChange={(v) => setDraftFilters((prev: any) => ({ ...prev, ownership: v || null }))}
        />
        <FilterCard
          icon={<Search size={20} className="text-primary" />}
          label="Founded"
          value={draftFilters.foundedYear || ""}
          options={["", ...availableFoundedYears]}
          onChange={(v) => setDraftFilters((prev: any) => ({ ...prev, foundedYear: v || null }))}
        />
        <FilterCard
          icon={<Search size={20} className="text-primary" />}
          label="Employees"
          value={draftFilters.employeeSize || ""}
          options={["", ...availableEmployeeSizes]}
          onChange={(v) => setDraftFilters((prev: any) => ({ ...prev, employeeSize: v || null }))}
        />
        {/* Feature toggles as cards with checkboxes */}
        <FilterCard
          icon={<Check size={20} className="text-primary" />}
          label="Verified Profile"
          toggle={draftFilters.verifiedOnly}
          onToggle={(checked) => setDraftFilters((prev: any) => ({ ...prev, verifiedOnly: checked }))}
        />
        <FilterCard
          icon={<Check size={20} className="text-primary" />}
          label="Bookmarked"
          toggle={draftFilters.bookmarkedOnly}
          onToggle={(checked) => setDraftFilters((prev: any) => ({ ...prev, bookmarkedOnly: checked }))}
        />
        <FilterCard
          icon={<Check size={20} className="text-primary" />}
          label="Has Website"
          toggle={draftFilters.hasWebsite}
          onToggle={(checked) => setDraftFilters((prev: any) => ({ ...prev, hasWebsite: checked }))}
        />
        <FilterCard
          icon={<Check size={20} className="text-primary" />}
          label="Has LinkedIn"
          toggle={draftFilters.hasLinkedIn}
          onToggle={(checked) => setDraftFilters((prev: any) => ({ ...prev, hasLinkedIn: checked }))}
        />
        <FilterCard
          icon={<Check size={20} className="text-primary" />}
          label="Has Products"
          toggle={draftFilters.hasProducts}
          onToggle={(checked) => setDraftFilters((prev: any) => ({ ...prev, hasProducts: checked }))}
        />
        <FilterCard
          icon={<Check size={20} className="text-primary" />}
          label="Has Services"
          toggle={draftFilters.hasServices}
          onToggle={(checked) => setDraftFilters((prev: any) => ({ ...prev, hasServices: checked }))}
        />
        {/* Certifications */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => {
              const isSelected = draftFilters.certifications.includes(cert);
              return (
                <label key={cert} className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-primary border-primary' : 'bg-white border-slate-300'}`}>
                    {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-medium text-slate-700 truncate">{cert}</span>
                  <input type="checkbox" className="hidden" checked={isSelected} onChange={() => handleCertToggle(cert)} />
                </label>
              );
            })}
          </div>
        </Card>
      </FilterGrid>
      <ActiveFilters chips={activeChips} clearAll={clearAllFilters} />
      <FilterActions hasUnsavedChanges={hasUnsavedChanges} onApply={handleApply} onReset={handleReset} />
      <FilterSummary />
    </div>
  );
}
export default SearchFilters;
