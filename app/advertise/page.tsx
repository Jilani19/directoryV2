"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart, Users, Target, Zap, CheckCircle2, Megaphone, Star, MonitorSmartphone, Layers } from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import Link from "next/link";

export default function AdvertisePage() {
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-transparent">
      
      {/* 1. Hero Section */}
      <Section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-transparent dark:to-transparent pointer-events-none" />
        <Container className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold text-[11px] uppercase tracking-wider mb-6 border border-blue-100 dark:border-blue-800/30">
            <Megaphone size={14} /> For Businesses & Brands
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
            Reach the Global <span className="text-indigo-600 dark:text-indigo-400">Life Sciences</span> Decision Makers
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Amplify your brand, generate high-quality B2B leads, and showcase your solutions to over 500,000 pharmaceutical professionals worldwide.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              View Pricing Plans
            </button>
            <button className="px-8 py-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5">
              Contact Sales Team
            </button>
          </motion.div>
        </Container>
      </Section>

      {/* 2. Audience Statistics */}
      <Section className="py-16 bg-white dark:bg-transparent">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100 dark:divide-white/10 border border-slate-100 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-md p-8 shadow-sm">
            {[
              { label: "Monthly Active Users", value: "500K+", icon: Users },
              { label: "Countries Reached", value: "175+", icon: Target },
              { label: "B2B Impressions", value: "12M+", icon: BarChart },
              { label: "Lead Conversion", value: "4.8%", icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <stat.icon size={20} />
                </div>
                <span className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Advertising Solutions */}
      <Section className="py-16 lg:py-24 bg-slate-50 dark:bg-transparent border-t border-slate-100 dark:border-white/5">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Comprehensive Advertising Solutions</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">Target your ideal buyers exactly where they are searching, browsing, and researching.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Sponsored Company Listings", desc: "Pin your company to the top of category and search results.", icon: Star, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
              { title: "Display Advertising", desc: "High-visibility banner placements across the directory network.", icon: MonitorSmartphone, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
              { title: "Category Promotion", desc: "Dominate specific industry verticals and product categories.", icon: Layers, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
            ].map((solution, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 hover:shadow-xl dark:hover:bg-white/10 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${solution.bg} ${solution.color} flex items-center justify-center mb-6`}>
                  <solution.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{solution.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">{solution.desc}</p>
                <Link href="#" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>


      {/* 5. Final CTA */}
      <Section className="py-20 lg:py-32 bg-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to dominate your industry?</h2>
          <p className="text-indigo-200 font-medium text-lg mb-10">Join thousands of pharmaceutical brands that trust cGxP.Directory to drive B2B growth and global visibility.</p>
          <button className="px-10 py-4 bg-white text-indigo-900 font-black rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl">
            Start Advertising Today
          </button>
        </Container>
      </Section>

    </div>
  );
}
