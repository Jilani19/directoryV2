"use client";
import React from "react";
import { motion } from "framer-motion";
import { Building2, Globe, LayoutGrid, Users, Box } from "lucide-react";
import { Container } from "../../../../components/layout/Container";

export function HeroStatsBar() {
  const stats = [
    { icon: <Building2 size={16} />, value: "20K+", label: "Companies" },
    { icon: <Globe size={16} />, value: "150+", label: "Countries" },
    { icon: <LayoutGrid size={16} />, value: "100+", label: "Categories" },
    { icon: <Users size={16} />, value: "1M+", label: "Professionals" },
    { icon: <Box size={16} />, value: "10K+", label: "Products & Services" },
  ];

  return (
    <Container className="relative z-20 mt-16 mb-8 lg:-mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-6 flex flex-wrap items-center justify-between gap-6 overflow-hidden"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 flex-1 min-w-[150px] justify-center md:justify-start lg:justify-center border-r border-slate-100 last:border-none last:pr-0 pr-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0046E0]/10 text-[#0046E0] shrink-0">
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-800 leading-tight">{stat.value}</span>
              <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </Container>
  );
}
