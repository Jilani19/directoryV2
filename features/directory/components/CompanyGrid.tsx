import React from "react";
import { CompanyCard } from "./CompanyCard";
import { CompanyListCard } from "./CompanyListCard";
import { CompanyCardSkeleton, CompanyListCardSkeleton } from "./Skeletons";
import { Company } from "../mock/companies";

import { ActiveLocation } from "../hooks/useLocation";

interface CompanyGridProps {
  companies: Company[];
  viewMode: "grid" | "list";
  isLoading?: boolean;
  activeLocation?: ActiveLocation | null;
}

export function CompanyGrid({ companies, viewMode, isLoading, activeLocation }: CompanyGridProps) {
  
  if (isLoading) {
    if (viewMode === "list") {
      return (
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <CompanyListCardSkeleton key={i} />
          ))}
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <CompanyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center border border-dashed border-slate-300 rounded-3xl bg-slate-50 w-full">
        <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 flex items-center justify-center">
          <span className="text-4xl opacity-50">🔍</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">No companies found</h3>
        <p className="text-slate-500 max-w-md text-sm leading-relaxed mb-6">
          We couldn&apos;t find any companies matching your current filters. Try adjusting your search criteria, removing some filters, or clearing everything.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-4 w-full">
        {companies.map((company) => (
          <CompanyListCard key={company.id} {...company} />
        ))}
      </div>
    );
  }

  // Separate companies into the 3 proximity tiers
  const nearYouCompanies = companies.filter(c => c.proximityBadge === "Near You");
  const countryCompanies = companies.filter(c => c.proximityBadge === "Country Match");
  const globalCompanies = companies.filter(c => !c.proximityBadge || c.proximityBadge === "Global");

  const hasLocation = !!activeLocation;

  const renderSection = (title: string, subtitle: string | React.ReactNode, list: Company[]) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-12">
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-base font-semibold text-slate-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-8 w-full">
          {list.map((company) => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </div>
      </div>
    );
  };

  if (hasLocation && (nearYouCompanies.length > 0 || countryCompanies.length > 0)) {
    return (
      <div className="flex flex-col gap-8 w-full">
        {nearYouCompanies.length === 0 && activeLocation.city && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-4">
            <h4 className="text-amber-900 font-bold text-lg mb-1">No companies found near {activeLocation.city}</h4>
            <p className="text-amber-700 font-medium">
              Showing companies from {activeLocation.country || "other regions"} instead.
            </p>
          </div>
        )}

        {renderSection(
          "📍 Companies Near You",
          activeLocation.city ? `Based in or around ${activeLocation.city}, ${activeLocation.country}` : `Based around your location`,
          nearYouCompanies
        )}
        
        {renderSection(
          `🏳️ Other Companies in ${activeLocation.country || "Your Country"}`,
          "",
          countryCompanies
        )}

        {renderSection(
          "🌍 Global Companies",
          "International companies outside your region",
          globalCompanies
        )}
      </div>
    );
  }

  // Fallback for purely homogeneous lists (no active location or only global)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-8 w-full">
      {companies.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  );
}
