import React, { useState, useEffect, useRef } from "react";
import { MapPin, Target, Search, RefreshCw, ChevronRight, X, Loader2 } from "lucide-react";
import { ActiveLocation } from "../hooks/useLocation";
import { LocationService, LocationSearchResult } from "../services/location.service";

interface LocationCardProps {
  location: ActiveLocation | null;
  isLoading: boolean;
  proximityStats?: { level: "City" | "District" | "State" | "Nearby" | "Country" | "Global"; count: number };
  onDetectLocation: () => void;
  onSetLocation: (loc: ActiveLocation | null) => void;
}

export function LocationCard({ location, isLoading, proximityStats, onDetectLocation, onSetLocation }: LocationCardProps) {
  const [isChanging, setIsChanging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchQuery.length < 3) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      const results = await LocationService.searchLocation(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery]);

  const handleSelectLocation = (result: LocationSearchResult) => {
    onSetLocation({
      city: result.city,
      state: result.state,
      country: result.country,
      display_name: result.display_name,
      lat: result.lat,
      lon: result.lon
    });
    setIsChanging(false);
    setSearchQuery("");
  };

  if (!location && !isChanging && !isLoading) {
    return null; // Return nothing if no location is active and not changing
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between gap-8 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none transition-transform group-hover:scale-110" />

      {isChanging ? (
        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            if (searchResults.length > 0) {
              handleSelectLocation(searchResults[0]);
            } else if (searchQuery.length >= 3) {
              setIsSearching(true);
              const results = await LocationService.searchLocation(searchQuery);
              if (results.length > 0) {
                handleSelectLocation(results[0]);
              }
              setIsSearching(false);
            }
          }}
          className="flex-1 w-full relative z-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="flex-1 w-full relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for a city, state or country..." 
              autoFocus
              className="w-full pl-12 pr-[100px] py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium text-slate-800 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-inner placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching ? (
              <Loader2 size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary animate-spin" />
            ) : (
              <button
                type="submit"
                disabled={searchQuery.length < 3 || isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              >
                Search
              </button>
            )}
            
            {/* Autocomplete Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 max-h-72 overflow-y-auto overflow-x-hidden p-2">
                {searchResults.map(result => (
                  <button 
                    key={result.id}
                    type="button"
                    onClick={() => handleSelectLocation(result)}
                    className="w-full text-left px-5 py-4 hover:bg-slate-50 rounded-xl transition-colors flex flex-col gap-1 focus:bg-slate-50 focus:outline-none"
                  >
                    <span className="text-base font-bold text-slate-800">{result.city || result.state || result.country}</span>
                    <span className="text-xs text-slate-500 truncate">{result.display_name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" onClick={() => setIsChanging(false)} className="shrink-0 px-6 py-4 font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-start gap-5 z-10 w-full md:w-auto flex-1">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 shadow-inner border border-primary/10">
              {isLoading ? <Loader2 size={28} className="text-primary animate-spin" /> : <MapPin size={28} className="text-primary fill-primary/20" />}
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {isLoading ? "Locating..." : "Proximity Engine Active"}
                </span>
                {!isLoading && location && (
                  <span className="text-xs font-semibold text-slate-400">
                    Auto-detected via IP
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight mb-3">
                {isLoading ? "Detecting your location" : location?.city ? `${location.city}, ${location.country}` : location?.display_name || "Unknown Location"}
              </h3>
              
              {!isLoading && proximityStats && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm font-medium">
                  <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/50 w-fit">
                    <Target size={16} />
                    <span>Prioritizing <strong>{proximityStats.level}</strong> Level Matches</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span><strong>{proximityStats.count}</strong> nearby companies found</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10 mt-2 md:mt-0 md:pl-6 md:border-l md:border-slate-100">
            <button 
              onClick={onDetectLocation}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:text-primary hover:border-primary/50 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
              <span className="hidden sm:inline">Refresh Location</span>
              <span className="sm:hidden">Refresh</span>
            </button>
            
            <button 
              onClick={() => setIsChanging(true)}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-600 transition-all shadow-md shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Change
              <ChevronRight size={18} />
            </button>

            {location && (
              <button 
                onClick={() => onSetLocation(null)} 
                className="flex items-center justify-center p-3.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors focus:outline-none border border-transparent hover:border-rose-100" 
                title="Clear Location"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
