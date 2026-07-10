import React from "react";
import { Beaker, Briefcase, Pill, Microscope, Stethoscope, Factory, FileSearch, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Categories | Verified Global Life Sciences Directory",
};

const CATEGORIES = [
  { name: "Pharmaceuticals", icon: <Pill size={24} />, slug: "pharmaceuticals", count: 8432 },
  { name: "Biotechnology", icon: <Microscope size={24} />, slug: "biotechnology", count: 6210 },
  { name: "Medical Devices", icon: <Stethoscope size={24} />, slug: "medical-devices", count: 4190 },
  { name: "Clinical Research (CRO)", icon: <FileSearch size={24} />, slug: "cro", count: 1845 },
  { name: "Contract Manufacturing (CDMO)", icon: <Factory size={24} />, slug: "cdmo", count: 1250 },
  { name: "Laboratory Equipment", icon: <Beaker size={24} />, slug: "laboratory", count: 980 },
  { name: "Regulatory & Compliance", icon: <Shield size={24} />, slug: "regulatory", count: 650 },
  { name: "Consulting Services", icon: <Briefcase size={24} />, slug: "consulting", count: 820 },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#0B1120] text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Browse by Category</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore our comprehensive directory of life sciences organizations organized by their primary industry focus.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link key={i} href={`/directory?category=${cat.slug}`} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                <p className="text-sm font-bold text-slate-500 mt-1">{cat.count.toLocaleString()} Companies</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
