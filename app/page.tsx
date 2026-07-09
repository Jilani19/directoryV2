import React from "react";
import { Hero } from "../features/home/components/Hero";
import { TrustedCompanies } from "../features/home/components/TrustedCompanies";
import { BrowseCategories } from "../features/home/components/BrowseCategories";
import { FeaturedCompanies } from "../features/home/components/FeaturedCompanies";
import { IndustryInsights } from "../features/home/components/IndustryInsights";
import { CTA } from "../features/home/components/CTA";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustedCompanies />
      <BrowseCategories />
      <FeaturedCompanies />
      <IndustryInsights />
      <CTA />
    </div>
  );
}
