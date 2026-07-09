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

const JOBS = [
  {
    company: "Pfizer",
    role: "Regulatory Affairs Specialist",
    location: "New York, USA",
    type: "Full Time",
    experience: "2-5 Yrs Exp"
  },
  {
    company: "IQVIA",
    role: "Clinical Research Associate",
    location: "India",
    type: "Full Time",
    experience: "1-3 Yrs Exp"
  },
  {
    company: "ThermoFisher",
    role: "Quality Assurance Manager",
    location: "Bangalore, India",
    type: "Full Time",
    experience: "3-8 Yrs Exp"
  },
  {
    company: "Merck",
    role: "Research Scientist (Biologics)",
    location: "Boston, USA",
    type: "Full Time",
    experience: "2-6 Yrs Exp"
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
    <Section id="FeaturedCompanies" className="bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        <motion.div 
          className="flex flex-col gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          
          <motion.div variants={itemVariants} className="flex items-end justify-between border-b border-slate-100 pb-4">
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-black text-[#0a192f] mb-2 tracking-tight">
                Top Career Opportunities
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base">
                Discover top hiring companies and job opportunities
              </p>
            </div>
            <Link 
              href="/jobs" 
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors group mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1"
              aria-label="View all placements"
            >
              View all placements
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex items-center group/slider w-full">
            
            <button 
              onClick={scrollPrev}
              className="hidden md:flex absolute -left-5 z-10 w-10 h-10 rounded-full items-center justify-center bg-white text-slate-400 hover:text-primary border border-slate-200 shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Previous opportunities"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="overflow-hidden w-full px-1 py-4" ref={emblaRef}>
              <div className="flex gap-6 touch-pan-y">
                {JOBS.map((job) => (
                  <div key={job.role + job.company} className="flex-[0_0_auto]">
                    <FeaturedCompanyCard {...job} />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollNext}
              className="hidden md:flex absolute -right-5 z-10 w-10 h-10 rounded-full items-center justify-center bg-white text-slate-400 hover:text-primary border border-slate-200 shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Next opportunities"
            >
              <ChevronRight size={20} />
            </button>

          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mt-2" aria-hidden="true">
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
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:hidden flex justify-center mt-2">
            <Link 
              href="/jobs" 
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1"
              aria-label="View all placements"
            >
              View all placements
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </motion.div>
      </Container>
    </Section>
  );
}
