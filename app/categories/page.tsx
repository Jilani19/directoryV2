"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pill, Dna, HeartPulse, Activity, Factory, Package, Search, ArrowRight } from "lucide-react";
import { Container } from "../../components/layout/Container";
import Link from "next/link";

const CATEGORIES = [
  { slug: "formulation", title: "Formulation", count: "18 Companies", icon: Pill, color: "text-blue-500", bg: "bg-blue-50", desc: "Solid, liquid, and semi-solid dosage form manufacturing and development." },
  { slug: "biologics", title: "Biologics", count: "11 Companies", icon: Dna, color: "text-purple-500", bg: "bg-purple-50", desc: "Large molecule therapies, biosimilars, and advanced therapy medicinal products." },
  { slug: "injectables", title: "Injectables", count: "9 Companies", icon: Activity, color: "text-teal-500", bg: "bg-teal-50", desc: "Sterile manufacturing, pre-filled syringes, and lyophilized products." },
  { slug: "medical-devices", title: "Medical Devices", count: "22 Companies", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-50", desc: "Diagnostic, therapeutic, and surgical medical equipment manufacturers." },
  { slug: "nutraceuticals", title: "Nutraceuticals", count: "14 Companies", icon: Factory, color: "text-lime-500", bg: "bg-lime-50", desc: "Dietary supplements, functional foods, and vitamins." },
  { slug: "packaging", title: "Packaging", count: "7 Companies", icon: Package, color: "text-sky-500", bg: "bg-sky-50", desc: "Primary and secondary pharmaceutical packaging materials." },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = CATEGORIES.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-transparent pt-32 pb-24">
      <Container>
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Explore Categories</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Browse our comprehensive directory of life science organizations organized by specialization.</p>
          </div>
          <div className="relative w-full md:w-80 shrink-0">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={`/categories/${cat.slug}`}
                  className="flex flex-col h-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl ${cat.bg} dark:bg-white/10 ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <cat.icon size={28} strokeWidth={1.5} />
                    </div>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">{cat.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 flex-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-auto">
                    View Category <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
            <Search size={32} className="text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No categories found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">We couldn't find any categories matching "{search}".</p>
          </div>
        )}

      </Container>
    </div>
  );
}
