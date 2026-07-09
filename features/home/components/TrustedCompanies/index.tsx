/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { CompanyFeatureCard } from "./CompanyFeatureCard";
import { companies as MOCK_COMPANIES } from "../../../directory/mock/companies";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "All",
  "Pharmaceuticals",
  "Biotechnology",
  "Medical Devices"
];

export function TrustedCompanies() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCompanies = useMemo(() => {
    // We filter MOCK_COMPANIES for those that match the category, or all if "All" is selected.
    // Also, prioritize verified companies or sort them dynamically so the best show up.
    let list = [...MOCK_COMPANIES];
    if (activeCategory !== "All") {
      list = list.filter(c => c.industry.includes(activeCategory) || c.category.includes(activeCategory));
    }
    // Return a curated selection of max 12 items for the carousel for performance
    return list.slice(0, 12);
  }, [activeCategory]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, breakpoints: { '(min-width: 768px)': { align: 'start' } } },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: NonNullable<ReturnType<typeof useEmblaCarousel>[1]>) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: NonNullable<ReturnType<typeof useEmblaCarousel>[1]>) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, filteredCompanies]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Section className="bg-[#050b14] py-12 lg:py-16 overflow-hidden relative" id="TrustedCompanies">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-[100%] opacity-50" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 -left-[200px] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
        
        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }} />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col gap-8">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Discover Verified Global <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary text-glow">Life Sciences Leaders</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              Explore verified pharmaceutical, biotechnology, CRO, CDMO, medical device, laboratory, and healthcare companies from around the world.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-0 hide-scrollbar w-full max-w-6xl mx-auto px-4 md:px-0">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 w-max mx-auto shadow-xl">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none whitespace-nowrap ${
                    activeCategory === category 
                      ? "bg-primary text-white shadow-lg shadow-primary/25" 
                      : "text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Section */}
          <div className="relative group/slider w-full max-w-[1600px] mx-auto mt-0">
            
            <button 
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary text-white transition-all duration-300 border border-white/20 shadow-2xl backdrop-blur-md opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 focus:outline-none focus:ring-4 focus:ring-white/20 -translate-x-4 group-hover/slider:translate-x-0"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            <div className="overflow-hidden w-full px-4 md:px-6 py-4" ref={emblaRef}>
              <div className="flex gap-6 md:gap-8 lg:gap-10 touch-pan-y">
                <AnimatePresence mode="popLayout">
                  {filteredCompanies.map((company) => (
                    <motion.div 
                      key={company.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="flex-[0_0_100%] sm:flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0"
                    >
                      <CompanyFeatureCard company={company} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <button 
              onClick={scrollNext}
              aria-label="Next slide"
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary text-white transition-all duration-300 border border-white/20 shadow-2xl backdrop-blur-md opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 focus:outline-none focus:ring-4 focus:ring-white/20 translate-x-4 group-hover/slider:translate-x-0"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>

          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-3">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? "bg-primary w-8" 
                    : "bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-2">
            <Link 
              href="/directory" 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-slate-900 bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-primary/30 group focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              Explore Full Directory
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </Container>
    </Section>
  );
}
