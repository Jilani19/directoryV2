"use client";

import { useState, useCallback, useEffect } from "react";
import { GeolocationService, GeolocationResult } from "../services/geolocation.service";

export interface ActiveLocation {
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  display_name?: string;
  lat?: number;
  lon?: number;
}

export function useLocation() {
  const [activeLocation, setActiveLocation] = useState<ActiveLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<GeolocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const detectLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result: GeolocationResult = await GeolocationService.getCurrentLocation();
      setActiveLocation({
        city: result.city,
        district: result.district,
        state: result.state,
        country: result.country,
        display_name: result.display_name,
        lat: result.latitude,
        lon: result.longitude
      });
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Failed to detect location");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setManualLocation = useCallback((location: ActiveLocation | null) => {
    setActiveLocation(location);
    setError(null);
    setSuggestions([]); // Clear suggestions when location is manually set
  }, []);

  const searchLocationQuery = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    setError(null);
    try {
      const results = await GeolocationService.searchLocation(query);
      setSuggestions(results);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Failed to search location");
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  // Auto-detect location on initial load only once
  useEffect(() => {
    // Check if we already detected or set a manual location
    if (!activeLocation && !isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      detectLocation();
    }
   
  }, []);

  return { 
    activeLocation, 
    isLoading, 
    error, 
    detectLocation, 
    setManualLocation,
    searchLocationQuery,
    suggestions,
    isSearching,
    clearSuggestions
  };
}
