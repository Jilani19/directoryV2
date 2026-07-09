"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "../../../../assets/images/home/hero/microscope + laboratory glassware.png";
import { Globe, ShieldCheck, Users, TrendingUp } from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-[500px] lg:h-[600px] z-0">
      
      {/* Background Map Placeholder */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        {/* We will use a CSS pattern or a background image here. For now, a subtle radial gradient to mimic the globe map */}
        <div className="w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-transparent" />
      </div>

      {/* Main Central Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="relative w-[80%] h-[80%]">
          <Image
            src={heroImage}
            alt="Life Sciences Directory"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </motion.div>

      {/* Floating Stat Card 1 - Global Presence */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] z-20 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-3 pr-6 flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0046E0]/10 text-[#0046E0]">
          <Globe size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-800">Global Presence</span>
          <span className="text-[10px] text-slate-500 font-medium">150+ Countries</span>
        </div>
      </motion.div>

      {/* Floating Stat Card 2 - Verified Companies */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[35%] right-[5%] z-20 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-3 pr-6 flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0046E0]/10 text-[#0046E0]">
          <ShieldCheck size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-800">Verified Companies</span>
          <span className="text-[10px] text-slate-500 font-medium">20,000+</span>
        </div>
      </motion.div>

      {/* Floating Stat Card 3 - Active Professionals */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[35%] right-[10%] z-20 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-3 pr-6 flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0046E0]/10 text-[#0046E0]">
          <Users size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-800">Active Professionals</span>
          <span className="text-[10px] text-slate-500 font-medium">1M+</span>
        </div>
      </motion.div>

      {/* Floating Stat Card 4 - Growing Network */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[10%] right-[5%] z-20 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-3 pr-6 flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0046E0]/10 text-[#0046E0]">
          <TrendingUp size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-800">Growing Network</span>
          <span className="text-[10px] text-slate-500 font-medium">+12% this month</span>
        </div>
      </motion.div>

    </div>
  );
}
