/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { FeaturedCompanyCard } from "./FeaturedCompanyCard";

import pfizerLogo from "@/assets/images/logos/pfizer.png";
import novartisLogo from "@/assets/images/logos/novartis.png";
import rocheLogo from "@/assets/images/logos/roche.png";
import merckLogo from "@/assets/images/logos/merck.png";
import sanofiLogo from "@/assets/images/logos/sanofi.png";

const MOCK_COMPANIES = [
  {
    id: 1,
    company: "Pfizer Inc.",
    location: "New York, USA",
    industry: "Pharma, Biotech",
    rating: "4.8",
    logo: pfizerLogo,
  },
  {
    id: 2,
    company: "Roche Holding AG",
    location: "Basel, Switzerland",
    industry: "Pharma, Diagnostics",
    rating: "4.7",
    logo: rocheLogo,
  },
  {
    id: 3,
    company: "Novartis AG",
    location: "Basel, Switzerland",
    industry: "Pharma, Healthcare",
    rating: "4.6",
    logo: novartisLogo,
  },
  {
    id: 4,
    company: "Sanofi S.A.",
    location: "Paris, France",
    industry: "Pharma, Biotech",
    rating: "4.5",
    logo: sanofiLogo,
  },
  {
    id: 5,
    company: "Merck & Co.",
    location: "New Jersey, USA",
    industry: "Pharma, Biotech",
    rating: "4.6",
    logo: pfizerLogo,
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export function FeaturedCompanies() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
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
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Section id="FeaturedCompanies" className="bg-white py-8 lg:py-10 overflow-hidden">
      <Container>
        <motion.div 
          className="flex flex-col gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          
          <motion.div variants={itemVariants} className="flex items-end justify-between border-b border-slate-100 pb-4">
            <div className="flex flex-col">
              <h2 className="text-xl lg:text-2xl font-black text-slate-900 mb-1 tracking-tight">
                Featured Companies
              </h2>
              <p className="text-slate-500 font-medium text-[13px] lg:text-sm">
                Discover leading pharmaceutical companies worldwide
              </p>
            </div>
            <Link 
              href="/directory" 
              className="flex items-center gap-1 text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors group focus:outline-none mb-1"
              aria-label="View all companies"
            >
              View All Companies
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex items-center group/slider w-full">
            
            <div className="overflow-hidden w-full px-1 py-4" ref={emblaRef}>
              <div className="flex gap-4 lg:gap-6 touch-pan-y">
                {MOCK_COMPANIES.map((company) => (
                  <div key={company.id} className="flex-[0_0_auto]">
                    <FeaturedCompanyCard {...company} />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollNext}
              className="hidden md:flex absolute -right-4 lg:-right-6 z-10 w-10 h-10 rounded-full items-center justify-center bg-white text-slate-400 hover:text-indigo-600 border border-slate-200 shadow-md transition-colors focus:outline-none"
              aria-label="Next companies"
            >
              <ChevronRight size={20} />
            </button>

          </motion.div>

        </motion.div>
      </Container>
    </Section>
  );
}
