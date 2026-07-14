"use client";
import React from "react";
import { motion } from "framer-motion";
import { Building2, Globe, LayoutGrid, Users, Box, Activity } from "lucide-react";
import { Container } from "../../../../components/layout/Container";

export function HeroStatsBar() {
  const stats = [
    { icon: <Building2 size={20} strokeWidth={1.5} />, value: "160+", label: "Companies" },
    { icon: <Box size={20} strokeWidth={1.5} />, value: "520+", label: "Products" },
    { icon: <Activity size={20} strokeWidth={1.5} />, value: "24+", label: "APIs" },
    { icon: <LayoutGrid size={20} strokeWidth={1.5} />, value: "32+", label: "Categories" },
    { icon: <Globe size={20} strokeWidth={1.5} />, value: "14+", label: "Countries" },
    { icon: <Users size={20} strokeWidth={1.5} />, value: "1.2K+", label: "Daily Users" },
  ];

  return (
    <Container className="relative z-20 -mt-2 sm:-mt-4 lg:mt-0 mb-6 lg:mb-10">
      <div className="relative w-full bg-[#0a192f] dark:bg-navy-950 py-5 lg:py-6 px-6 rounded-[20px] overflow-hidden shadow-xl shadow-indigo-900/10">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-6 gap-x-4 w-full"
        >
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`flex items-center gap-3.5 justify-start xl:justify-center ${idx !== stats.length - 1 && idx % 3 !== 2 ? 'xl:border-r xl:border-white/10' : ''}`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-[#40C4FF] shrink-0">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] md:text-[19px] font-black text-white leading-tight tracking-wide">{stat.value}</span>
                <span className="text-[11px] md:text-[12px] text-slate-300 font-medium">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Container>
  );
}
