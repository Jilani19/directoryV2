/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { InsightCard } from "./InsightCard";

const INSIGHTS = [
  {
    category: "INDUSTRY NEWS",
    title: "Global Pharmaceutical Market Trends 2024",
    description: "Analysis of key trends shaping the pharmaceutical industry this year.",
    date: "May 15, 2024",
    readTime: "5 min read"
  },
  {
    category: "REGULATORY",
    title: "New FDA Guidelines for Drug Manufacturing",
    description: "Key updates to FDA guidelines impacting pharmaceutical manufacturers.",
    date: "May 12, 2024",
    readTime: "7 min read"
  },
  {
    category: "MARKET INSIGHTS",
    title: "Biologics Market Growth Analysis",
    description: "In-depth analysis of biologics market growth and opportunities.",
    date: "May 10, 2024",
    readTime: "6 min read"
  }
];

export function IndustryInsights() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", dragFree: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
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
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Section id="IndustryInsights" className="bg-white py-8 lg:py-10 overflow-hidden">
      <Container>
        <div className="flex flex-col gap-6">

          <div className="flex items-end justify-between border-b border-slate-100 pb-3">
            <div className="flex flex-col">
              <h2 className="text-xl lg:text-[22px] font-black text-slate-900 mb-0.5 tracking-tight">
                Latest Insights & Resources
              </h2>
              <p className="text-slate-500 font-medium text-[12px] lg:text-[13px]">
                Stay updated with the latest industry news and insights
              </p>
            </div>
            <Link href="/articles" className="hidden md:flex items-center gap-1 text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors group mb-1 focus:outline-none">
              View All Articles
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative group/slider w-full">
            
            <button 
              onClick={scrollPrev}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center bg-white text-slate-400 hover:text-primary border border-slate-200 shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Previous insight"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="overflow-hidden w-full px-1 py-4" ref={emblaRef}>
              <div className="flex gap-6 touch-pan-y">
                {INSIGHTS.map((insight) => (
                  <div 
                    key={insight.title}
                    className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <InsightCard {...insight} />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollNext}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center bg-white text-slate-400 hover:text-primary border border-slate-200 shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Next insight"
            >
              <ChevronRight size={20} />
            </button>

          </div>

          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-primary" : "bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>

          <Link href="/articles" className="md:hidden flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors group mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1">
            View all articles
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </Container>
    </Section>
  );
}
