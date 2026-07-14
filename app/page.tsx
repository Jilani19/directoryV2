import React from "react";
import { Hero } from "../features/home/components/Hero";
import { FeaturedCompanies } from "../features/home/components/FeaturedCompanies";
import { HeroStatsBar } from "../features/home/components/Hero/HeroStatsBar";
import { BrowseCategories } from "../features/home/components/BrowseCategories";
import { WhyChooseUs } from "../features/home/components/WhyChooseUs";
import { IndustryInsights } from "../features/home/components/IndustryInsights";
import { CareerOpportunities } from "../features/home/components/CareerOpportunities";
import { CTA } from "../features/home/components/CTA";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <HeroStatsBar />
      <BrowseCategories />
      <FeaturedCompanies />
      <WhyChooseUs />
      <IndustryInsights />
      <CareerOpportunities />
      <CTA />
    </div>
  );
}
