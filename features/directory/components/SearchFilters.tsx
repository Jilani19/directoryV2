"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Target, ChevronDown, ChevronUp, Loader2, SlidersHorizontal, X, Check } from "lucide-react";
import { FilterChip } from "./FilterChip";
import { FilterState } from "../hooks/useCompanyDirectory";
import { useLocation } from "../hooks/useLocation";
import { motion, AnimatePresence } from "framer-motion";

interface SearchFiltersProps {
  draftFilters: FilterState;
  setDraftFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  activeFilters: FilterState;
  applyFilters: () => void;
  clearAllFilters: () => void;
  resetFiltersToActive: () => void;
  emptyFilters: FilterState;
  availableCountries: string[];
  availableStates: string[];
  availableCities: string[];
  availableCategories: string[];
  availableIndustries: string[];
  availableCompanyTypes: string[];
  availableOwnership: string[];
  availableFoundedYears: string[];
  availableEmployeeSizes: string[];
  locationObj: ReturnType<typeof useLocation>;
}

const CERTIFICATIONS = [
  "FDA Registered", "EU GMP", "WHO GMP", "ISO 9001", "ISO 13485", "USFDA", "EMA", "MHRA", "PMDA", "TGA"
];

export function SearchFilters({
  draftFilters, setDraftFilters,
  activeFilters, applyFilters, clearAllFilters,
  availableCountries, availableCategories,
  availableIndustries, availableCompanyTypes, availableOwnership, availableFoundedYears, availableEmployeeSizes,
  locationObj
}: SearchFiltersProps) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    features: true,
    certifications: false
  });
  const { activeLocation: location, isLoading: isGeoLoading, error: geoError, detectLocation } = locationObj;

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Check if draft differs from active
  const hasUnsavedChanges = JSON.stringify(draftFilters) !== JSON.stringify(activeFilters);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleCertToggle = (cert: string) => {
    setDraftFilters(prev => {
      const isSelected = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: isSelected ? prev.certifications.filter(c => c !== cert) : [...prev.certifications, cert]
      };
    });
  };

  const handleApply = () => {
    applyFilters();
    setIsDrawerOpen(false);
  };

  const handleReset = () => {
    clearAllFilters();
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen]);

  // Generate Active Chips dynamically (excluding search query)
  const activeChips: { id: string; label: string; onRemove: () => void }[] = [];
  Object.entries(activeFilters).forEach(([key, value]) => {
    if (key === "searchQuery") return;
    if (typeof value === "boolean" && value) {
      activeChips.push({
        id: key,
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        onRemove: () => {
          setDraftFilters(prev => ({ ...prev, [key]: false }));
          setTimeout(applyFilters, 0);
        }
      });
    } else if (Array.isArray(value)) {
      value.forEach(cert => {
        activeChips.push({
          id: `cert-${cert}`,
          label: cert,
          onRemove: () => {
            setDraftFilters(prev => ({ ...prev, certifications: prev.certifications.filter(c => c !== cert) }));
            setTimeout(applyFilters, 0);
          }
        });
      });
    } else if (value) {
      activeChips.push({
        id: key,
        label: `${String(value)}`,
        onRemove: () => {
          setDraftFilters(prev => ({ ...prev, [key]: null }));
          setTimeout(applyFilters, 0);
        }
      });
    }
  });

  const filterCount = activeChips.length;

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-8 md:p-10 flex flex-col gap-8 relative z-20 -mt-16 mx-4 md:mx-0">
      
      {/* Top Search Bar Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Search Input */}
        <div className="flex-1 relative flex items-center border border-slate-200 rounded-2xl px-6 py-4 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-sm group">
          <Search size={22} className="text-slate-400 mr-3 shrink-0 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search company name, product or service..." 
            className="w-full bg-transparent border-none outline-none text-base font-medium text-slate-800 placeholder:text-slate-400"
            value={draftFilters.searchQuery}
            onChange={(e) => setDraftFilters({...draftFilters, searchQuery: e.target.value})}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
          />
          {draftFilters.searchQuery && (
            <button onClick={() => {setDraftFilters({...draftFilters, searchQuery: ""}); setTimeout(applyFilters, 0);}} className="text-slate-400 hover:text-slate-600 focus:outline-none">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="lg:w-[320px] relative flex flex-col">
          <button 
            type="button" 
            onClick={() => toggleDropdown("country")}
            className="flex-1 flex items-center justify-between border border-slate-200 rounded-2xl px-6 py-4 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary"
          >
            <div className="flex items-center gap-3 truncate">
              {isGeoLoading ? <Loader2 size={20} className="animate-spin text-primary shrink-0" /> : <MapPin size={20} className="text-primary shrink-0" />}
              <span className="text-base font-semibold text-slate-800 truncate">
                {draftFilters.city ? `${draftFilters.city}, ${draftFilters.country}` : draftFilters.country || "Any Location"}
              </span>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform ${openDropdown === 'country' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {openDropdown === 'country' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                  <button onClick={detectLocation} className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary font-bold text-sm rounded-xl hover:bg-primary/20 transition-colors">
                    <Target size={18} /> Use Current Location
                  </button>
                  {location && (
                    <span className="text-xs text-center text-slate-500 font-medium">Detected: {location.city}, {location.country}</span>
                  )}
                  {geoError && <span className="text-xs text-center text-rose-500 font-medium">{geoError}</span>}
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                  <button onClick={() => { setDraftFilters({...draftFilters, country: null, state: null, city: null}); setOpenDropdown(null); }} className="w-full text-left px-5 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Any Location</button>
                  {availableCountries.map(c => (
                    <button key={c} onClick={() => { setDraftFilters({...draftFilters, country: c, state: null, city: null}); setOpenDropdown(null); }} className="w-full text-left px-5 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">{c}</button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button 
            type="button" 
            onClick={() => setIsDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-2xl px-6 lg:px-8 py-4 bg-white hover:bg-slate-50 hover:text-primary transition-all text-slate-700 font-bold text-base shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10"
          >
            <SlidersHorizontal size={20} />
            Advanced Filters
            {filterCount > 0 && <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold ml-1">{filterCount}</span>}
          </button>
          <button 
            type="button" 
            onClick={handleApply}
            disabled={!hasUnsavedChanges}
            className={`flex-1 flex items-center justify-center rounded-2xl px-6 lg:px-10 py-4 font-bold text-base transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 ${hasUnsavedChanges ? "bg-primary text-white hover:bg-primary-600 shadow-primary/20 shadow-lg" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Active Chips Row */}
      {activeChips.length > 0 && (
        <div className="flex items-center flex-wrap gap-2 pt-2">
          <span className="text-xs font-semibold text-slate-500 mr-1 uppercase tracking-wider">Active:</span>
          {activeChips.map((filter) => (
            <FilterChip key={filter.id} label={filter.label} onRemove={filter.onRemove} />
          ))}
          <button 
            type="button" onClick={clearAllFilters}
            className="text-primary text-xs font-bold hover:text-primary-600 transition-colors ml-2 focus:outline-none underline underline-offset-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Dropdown Overlay */}
      {openDropdown && <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />}

      {/* Advanced Filters Drawer Modal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white z-10 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Directory Filters</h2>
                  <p className="text-sm text-slate-500 mt-1">Refine your company search.</p>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none">
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
                
                {/* Basic Details */}
                <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <button onClick={() => toggleSection("basic")} className="flex items-center justify-between w-full p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Basic Details</h3>
                    {openSections.basic ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {openSections.basic && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-4 pt-2 flex flex-col gap-5 border-t border-slate-100">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-600">Industry</label>
                            <select className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none font-medium"
                              value={draftFilters.industry || ""} onChange={(e) => setDraftFilters({...draftFilters, industry: e.target.value || null})}
                            >
                              <option value="">All Industries</option>
                              {availableIndustries.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                          </div>
                          
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-600">Category</label>
                            <select className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none font-medium"
                              value={draftFilters.category || ""} onChange={(e) => setDraftFilters({...draftFilters, category: e.target.value || null})}
                            >
                              <option value="">All Categories</option>
                              {availableCategories.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                          </div>

                          <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-1.5">
                              <label className="text-sm font-semibold text-slate-600">Company Type</label>
                              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none font-medium"
                                value={draftFilters.companyType || ""} onChange={(e) => setDraftFilters({...draftFilters, companyType: e.target.value || null})}
                              >
                                <option value="">Any</option>
                                {availableCompanyTypes.map(i => <option key={i} value={i}>{i}</option>)}
                              </select>
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                              <label className="text-sm font-semibold text-slate-600">Ownership</label>
                              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none font-medium"
                                value={draftFilters.ownership || ""} onChange={(e) => setDraftFilters({...draftFilters, ownership: e.target.value || null})}
                              >
                                <option value="">Any</option>
                                {availableOwnership.map(i => <option key={i} value={i}>{i}</option>)}
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-1.5">
                              <label className="text-sm font-semibold text-slate-600">Founded</label>
                              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none font-medium"
                                value={draftFilters.foundedYear || ""} onChange={(e) => setDraftFilters({...draftFilters, foundedYear: e.target.value || null})}
                              >
                                <option value="">Any</option>
                                {availableFoundedYears.map(i => <option key={i} value={i}>{i}</option>)}
                              </select>
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                              <label className="text-sm font-semibold text-slate-600">Employees</label>
                              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none font-medium"
                                value={draftFilters.employeeSize || ""} onChange={(e) => setDraftFilters({...draftFilters, employeeSize: e.target.value || null})}
                              >
                                <option value="">Any</option>
                                {availableEmployeeSizes.map(i => <option key={i} value={i}>{i}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Toggles */}
                <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <button onClick={() => toggleSection("features")} className="flex items-center justify-between w-full p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Features & Status</h3>
                    {openSections.features ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {openSections.features && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-4 pt-2 grid grid-cols-2 gap-4 border-t border-slate-100">
                          {[
                            { id: 'verifiedOnly', label: 'Verified Profile' },
                            { id: 'bookmarkedOnly', label: 'Bookmarked' },
                            { id: 'hasWebsite', label: 'Has Website' },
                            { id: 'hasLinkedIn', label: 'Has LinkedIn' },
                            { id: 'hasProducts', label: 'Has Products' },
                            { id: 'hasServices', label: 'Has Services' },
                          ].map(toggle => (
                            <label key={toggle.id} className="flex items-center gap-3 cursor-pointer group">
                              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${draftFilters[toggle.id as keyof FilterState] ? 'bg-primary border-primary' : 'bg-white border-slate-300 group-hover:border-primary'}`}>
                                {draftFilters[toggle.id as keyof FilterState] && <Check size={12} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-sm font-semibold text-slate-700 select-none">{toggle.label}</span>
                              <input type="checkbox" className="hidden" checked={!!draftFilters[toggle.id as keyof FilterState]} onChange={(e) => setDraftFilters({...draftFilters, [toggle.id]: e.target.checked})} />
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Certifications */}
                <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <button onClick={() => toggleSection("certifications")} className="flex items-center justify-between w-full p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Certifications & Regulatory</h3>
                    {openSections.certifications ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {openSections.certifications && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-4 pt-2 grid grid-cols-2 gap-4 border-t border-slate-100">
                          {CERTIFICATIONS.map(cert => {
                            const isSelected = draftFilters.certifications.includes(cert);
                            return (
                              <label key={cert} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${isSelected ? 'bg-primary border-primary' : 'bg-white border-slate-300 group-hover:border-primary'}`}>
                                  {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className="text-sm font-semibold text-slate-700 select-none truncate">{cert}</span>
                                <input type="checkbox" className="hidden" checked={isSelected} onChange={() => handleCertToggle(cert)} />
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Drawer Footer Action Bar */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4 shrink-0">
                <button 
                  type="button" onClick={handleReset}
                  className="flex-1 py-3.5 px-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                >
                  Reset
                </button>
                <button 
                  type="button" onClick={handleApply}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-primary font-bold text-white shadow-md shadow-primary/20 hover:bg-primary-600 transition-colors focus:outline-none"
                >
                  Apply Filters
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
