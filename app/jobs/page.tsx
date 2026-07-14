"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Briefcase, MapPin, DollarSign, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Container } from "../../components/layout/Container";
import { JobCard } from "../../features/home/components/CareerOpportunities/JobCard";
import Link from "next/link";

import pfizerLogo from "@/assets/images/logos/pfizer.png";
import novartisLogo from "@/assets/images/logos/novartis.png";
import rocheLogo from "@/assets/images/logos/roche.png";
import merckLogo from "@/assets/images/logos/merck.png";

const MOCK_JOBS = [
  { id: 1, title: "Senior Clinical Research Associate", company: "Pfizer Inc.", logo: pfizerLogo, location: "New York, USA", type: "Full-Time", salary: "$120k - $150k", experience: "Senior Level", postedTime: "2 hours ago", isUrgent: true, isRemote: true },
  { id: 2, title: "Quality Assurance Manager", company: "Novartis AG", logo: novartisLogo, location: "Basel, Switzerland", type: "Full-Time", experience: "Mid-Senior Level", postedTime: "5 hours ago", isUrgent: false, isRemote: false },
  { id: 3, title: "Biostatistician", company: "Roche Holding AG", logo: rocheLogo, location: "San Francisco, USA", type: "Contract", salary: "$90/hr", experience: "Mid Level", postedTime: "1 day ago", isUrgent: false, isRemote: true },
  { id: 4, title: "Regulatory Affairs Specialist", company: "Merck & Co.", logo: merckLogo, location: "New Jersey, USA", type: "Full-Time", salary: "$95k - $125k", experience: "Entry-Mid Level", postedTime: "2 days ago", isUrgent: false, isRemote: false },
  { id: 5, title: "Lead Formulations Scientist", company: "Pfizer Inc.", logo: pfizerLogo, location: "Boston, USA", type: "Full-Time", salary: "$130k - $160k", experience: "Senior Level", postedTime: "3 days ago", isUrgent: true, isRemote: false },
  { id: 6, title: "Clinical Trial Manager", company: "Novartis AG", logo: novartisLogo, location: "London, UK", type: "Contract", experience: "Senior Level", postedTime: "4 days ago", isUrgent: false, isRemote: true },
];

const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Remote", "Internship"];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const handleToggleType = (type: string) => {
    setActiveTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredJobs = MOCK_JOBS.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTypes.length === 0 || activeTypes.includes(j.type) || (activeTypes.includes("Remote") && j.isRemote);
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-transparent pt-24 pb-20">
      <Container>
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Career Opportunities</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Find your next role in the global life sciences industry.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Filter size={18} /> Filters
              </h2>
              
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Type</h3>
                <div className="flex flex-col gap-2">
                  {JOB_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        activeTypes.includes(type) 
                          ? "bg-indigo-600 border-indigo-600" 
                          : "border-slate-300 dark:border-slate-600 group-hover:border-indigo-500"
                      }`}>
                        {activeTypes.includes(type) && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Search Bar */}
            <div className="flex items-center bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 rounded-2xl p-3 shadow-sm">
              <div className="relative w-full">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by job title, keyword, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Showing <span className="font-bold text-slate-900 dark:text-white">{filteredJobs.length}</span> jobs
              </span>
            </div>

            {/* Jobs List */}
            {filteredJobs.length > 0 ? (
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Note: JobCard natively wraps with a Link to /jobs/slug if configured.
                          For now, we wrap the JobCard with a direct Link to the dynamic route. */}
                      <Link href={`/jobs/${job.title.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                        <JobCard {...job} />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={28} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  We couldn't find any positions matching your current search and filters. Try adjusting your criteria.
                </p>
                <button onClick={() => { setSearchQuery(""); setActiveTypes([]); }} className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-sm">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-400" disabled>
                  <ChevronLeft size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-sm">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-bold transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

          </div>
        </div>
      </Container>
    </div>
  );
}
