"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { JobCard } from "./JobCard";

import pfizerLogo from "@/assets/images/logos/pfizer.png";
import novartisLogo from "@/assets/images/logos/novartis.png";
import rocheLogo from "@/assets/images/logos/roche.png";
import merckLogo from "@/assets/images/logos/merck.png";

const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Clinical Research Associate",
    company: "Pfizer Inc.",
    logo: pfizerLogo,
    location: "New York, USA",
    type: "Full-Time",
    salary: "$120k - $150k",
    experience: "Senior Level",
    postedTime: "2 hours ago",
    isUrgent: true,
    isRemote: true,
  },
  {
    id: 2,
    title: "Quality Assurance Manager",
    company: "Novartis AG",
    logo: novartisLogo,
    location: "Basel, Switzerland",
    type: "Full-Time",
    experience: "Mid-Senior Level",
    postedTime: "5 hours ago",
    isUrgent: false,
    isRemote: false,
  },
  {
    id: 3,
    title: "Biostatistician",
    company: "Roche Holding AG",
    logo: rocheLogo,
    location: "San Francisco, USA",
    type: "Contract",
    salary: "$90/hr",
    experience: "Mid Level",
    postedTime: "1 day ago",
    isUrgent: false,
    isRemote: true,
  },
  {
    id: 4,
    title: "Regulatory Affairs Specialist",
    company: "Merck & Co.",
    logo: merckLogo,
    location: "New Jersey, USA",
    type: "Full-Time",
    salary: "$95k - $125k",
    experience: "Entry-Mid Level",
    postedTime: "2 days ago",
    isUrgent: false,
    isRemote: false,
  }
];

const FILTERS = ["All Roles", "Clinical Research", "Regulatory", "Manufacturing", "Quality Assurance"];

export function CareerOpportunities() {
  const [activeFilter, setActiveFilter] = React.useState("All Roles");

  const filteredJobs = MOCK_JOBS.filter(job => {
    if (activeFilter === "All Roles") return true;
    // Simple mock logic: match active filter to title keywords
    if (activeFilter === "Clinical Research") return job.title.includes("Clinical") || job.title.includes("Biostatistician");
    if (activeFilter === "Regulatory") return job.title.includes("Regulatory");
    if (activeFilter === "Manufacturing") return false; // Mock data has no manufacturing jobs
    if (activeFilter === "Quality Assurance") return job.title.includes("Quality");
    return true;
  });

  return (
    <Section id="Careers" className="bg-[#F8FAFC] dark:bg-transparent py-8 lg:py-10 border-t border-slate-100 dark:border-white/5">
      <Container>
        <div className="flex flex-col gap-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex flex-col">
              <h2 className="text-xl lg:text-[22px] font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                Explore Career Opportunities
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-[12px] lg:text-[13px] max-w-2xl">
                Discover verified career opportunities from leading pharmaceutical, biotechnology, CRO, CDMO, medical device, laboratory, and healthcare organizations worldwide.
              </p>
            </div>
            <Link 
              href="/jobs" 
              className="flex items-center gap-1 text-[13px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group shrink-0"
            >
              View All Jobs
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide whitespace-nowrap">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-300 ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)] scale-105" 
                        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-md text-[12px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors w-full md:w-auto justify-center">
                <Filter size={14} /> Filters
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="flex flex-col gap-3 min-h-[300px]">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <JobCard {...job} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl"
              >
                <Search size={24} className="text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No jobs found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">There are currently no openings for {activeFilter}.</p>
              </motion.div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-2">
            <Link 
              href="/jobs" 
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm rounded-lg text-[13px] font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-white/10 transition-all"
            >
              Explore 5,000+ More Roles <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </Container>
    </Section>
  );
}
