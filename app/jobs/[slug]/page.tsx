"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Building2, CheckCircle2, Share2, Bookmark } from "lucide-react";
import { Container } from "../../../components/layout/Container";
import Link from "next/link";
import Image from "next/image";
import pfizerLogo from "@/assets/images/logos/pfizer.png"; // Placeholder logo

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  // Parse title from slug
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-transparent pt-32 pb-24">
      <Container>
        
        <button 
          onClick={() => router.push("/jobs")}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </button>

        {/* Job Header Card */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center p-4 shrink-0 shadow-inner">
              <Image src={pfizerLogo} alt="Company Logo" width={64} height={64} className="object-contain" />
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{title}</h1>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Pfizer Inc.</div>
                </div>
                
                <div className="flex gap-2">
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <Bookmark size={20} />
                  </button>
                  <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
                  <MapPin size={16} className="text-slate-400" /> New York, USA (Hybrid)
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
                  <Briefcase size={16} className="text-slate-400" /> Full-Time
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
                  <DollarSign size={16} className="text-slate-400" /> $120k - $150k
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
                  <Clock size={16} className="text-slate-400" /> Posted 2 hours ago
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 flex flex-col gap-10">
            {/* Overview */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Job Overview</h2>
              <div className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed space-y-4">
                <p>
                  We are seeking a highly motivated and experienced {title} to join our dynamic team. In this role, you will play a critical part in overseeing and executing clinical trials, ensuring compliance with regulatory standards, and driving innovation in drug development.
                </p>
                <p>
                  The ideal candidate will have a strong background in life sciences, excellent analytical skills, and a proven track record of managing cross-functional projects in a fast-paced environment.
                </p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Key Responsibilities</h2>
              <ul className="flex flex-col gap-4">
                {[
                  "Lead and manage all phases of clinical trials from initiation to closure.",
                  "Ensure compliance with GCP, ICH guidelines, and local regulatory requirements.",
                  "Collaborate with cross-functional teams including regulatory, quality, and R&D.",
                  "Prepare and review clinical study documents, protocols, and reports.",
                  "Monitor trial progress, identify risks, and implement mitigation strategies."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Requirements</h2>
              <ul className="flex flex-col gap-4">
                {[
                  "Bachelor's degree in Life Sciences, Pharmacy, or related field (Master's preferred).",
                  "Minimum of 5 years of experience in clinical research or related area.",
                  "In-depth knowledge of regulatory frameworks and quality standards.",
                  "Strong communication, leadership, and problem-solving skills.",
                  "Willingness to travel up to 20%."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
              <h2 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-indigo-500" /> About the Company
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center p-2 shrink-0">
                  <Image src={pfizerLogo} alt="Pfizer" width={40} height={40} className="object-contain" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Pfizer Inc.</div>
                  <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View Profile</a>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                Pfizer is one of the world's premier innovative biopharmaceutical companies, discovering, developing and providing over 170 different medicines, vaccines and consumer healthcare products to help improve the lives of millions of people around the world every year.
              </p>
              
              <div className="pt-6 border-t border-slate-100 dark:border-white/10">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {["Health Insurance", "401(k) Match", "Remote Options", "Paid Time Off", "Parental Leave"].map(benefit => (
                    <span key={benefit} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.4)] hover:-translate-y-0.5">
              Apply on Company Site
            </button>
          </div>

        </div>
      </Container>
    </div>
  );
}
