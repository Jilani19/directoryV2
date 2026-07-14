"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Globe, ClipboardCheck } from "lucide-react";

export function HeroContent() {

  return (
    <div className="flex flex-col items-start gap-4 z-10 relative w-full max-w-[800px] mt-2 lg:mt-6">
      
      {/* Top Pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1.5 shadow-sm"
      >
        <ShieldCheck size={14} className="text-emerald-500 stroke-[2.5]" />
        <span className="text-[11px] font-bold text-slate-700 tracking-wide">The World&apos;s Most Trusted Pharma Directory</span>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col gap-4 mt-2"
      >
        <h1 className="text-[4rem] sm:text-[4.5rem] lg:text-[5rem] font-black tracking-tight text-[#1a2b49] leading-[1.05]">
          Connecting Global Pharma <span className="text-[#3b48e0]">Excellence</span>
        </h1>
        <p className="max-w-xl text-[16px] sm:text-lg text-slate-600 leading-relaxed font-medium">
          Discover verified pharmaceutical companies, innovative products, and trusted partners worldwide. Your gateway to pharmaceutical excellence.
        </p>
      </motion.div>

      {/* Primary Actions (Replaces Search) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-4 mt-6"
      >
        <Link href="/directory" className="px-8 py-3.5 bg-[#5b52ff] hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all shadow-[0_8px_20px_rgb(91,82,255,0.3)] hover:shadow-[0_12px_25px_rgb(91,82,255,0.4)] hover:-translate-y-0.5">
          Explore Directory
        </Link>
        <button className="px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow hover:-translate-y-0.5">
          Join Network
        </button>
      </motion.div>

      {/* Features Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap items-center gap-x-8 gap-y-4 w-full mt-5 pt-5"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50/80 text-[#3b48e0] border border-indigo-100/50">
            <ShieldCheck size={16} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-slate-900 leading-tight">Verified & Trusted</span>
            <span className="text-[9px] font-medium text-slate-500 leading-tight">Rigorous verification process</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50/80 text-[#0066cc] border border-blue-100/50">
            <Globe size={16} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-slate-900 leading-tight">Global Reach</span>
            <span className="text-[9px] font-medium text-slate-500 leading-tight">175+ countries covered</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-50/80 text-purple-600 border border-purple-100/50">
            <ClipboardCheck size={16} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-slate-900 leading-tight">Real-time Updates</span>
            <span className="text-[9px] font-medium text-slate-500 leading-tight">Latest company information</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
