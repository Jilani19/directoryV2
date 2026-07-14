"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { ShieldCheck, Globe2, Layers, CheckCircle2 } from "lucide-react";

export function Hero() {
  const [stats, setStats] = useState({
    total: 0,
    pharmaceuticals: 0,
    biotech: 0,
    injectables: 0,
    medicalDevices: 0,
    countries: [] as {name: string, count: number}[],
    totalCategories: 0
  });

  useEffect(() => {
    fetch('/api/companies?stats=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.total !== undefined) {
          setStats(data);
        }
      })
      .catch(err => console.error("Failed to fetch live stats", err));
  }, []);

  return (
    <section className="relative w-full bg-[#f8fafe] dark:bg-transparent pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden border-b border-indigo-50 dark:border-white/5 min-h-[700px] flex items-center">
      {/* Background Globe Pattern */}
      <div className="absolute top-0 right-0 w-[50%] h-full opacity-30 pointer-events-none mix-blend-multiply dark:mix-blend-screen mt-20">
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#6366f1" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4">
            <circle cx="400" cy="300" r="250" />
            <ellipse cx="400" cy="300" rx="100" ry="250" />
            <ellipse cx="400" cy="300" rx="250" ry="100" />
          </g>
          <g fill="#4f46e5">
            <circle cx="550" cy="200" r="4" />
            <circle cx="300" cy="150" r="4" />
            <circle cx="600" cy="400" r="4" />
            <circle cx="250" cy="350" r="4" />
            <circle cx="450" cy="450" r="4" />
          </g>
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-4">
          
          {/* Left Content */}
            <div className="flex flex-col w-full lg:w-1/2">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] uppercase tracking-wider w-fit border border-indigo-100 dark:border-indigo-800/30">
              <ShieldCheck size={14} className="text-indigo-500" /> The World&apos;s Most Trusted Pharma Directory
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[64px] font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight">
              Explore Verified<br/>
              <span className="text-indigo-600 dark:text-indigo-400">Pharma & Biotech</span><br/>
              Companies
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed mt-2">
              Discover {stats.total > 0 ? stats.total.toLocaleString() : 'thousands of'} verified pharmaceutical, biotech and healthcare companies worldwide. Connect, collaborate and grow together.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 p-6 rounded-3xl bg-white dark:bg-[#0B1120] border border-slate-100 dark:border-white/5 shadow-xl shadow-indigo-500/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 dark:text-white text-xl">{stats.total > 0 ? stats.total.toLocaleString() : '20,000+'}</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Companies</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Globe2 size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 dark:text-white text-xl">{stats.countries?.length > 0 ? stats.countries.length + '+' : '100+'}</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Countries</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Layers size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 dark:text-white text-xl">{stats.totalCategories ? stats.totalCategories + '+' : '15+'}</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Segments</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 dark:text-white text-xl">99.9%</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Accuracy</span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Content - MASSIVE Hero Image */}
          <div className="relative w-full lg:w-1/2 flex justify-end items-center h-[500px] lg:h-[650px] pointer-events-none">
            <div className="absolute top-1/2 -translate-y-1/2 right-[-5%] w-[120%] lg:w-[140%] max-w-[1000px]">
              <img 
                src="/assets/directory-hero.png" 
                alt="Life Sciences Directory" 
                className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(79,70,229,0.2)] dark:drop-shadow-[0_30px_60px_rgba(79,70,229,0.4)] scale-110 lg:scale-125 transform-gpu origin-right" 
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
