"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "../../../../assets/images/home/hero/directory hero.png";

export function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-[700px] lg:h-[900px] z-0 scale-110 lg:scale-125">
      
      {/* Huge subtle glow behind globe - matching the purple background in the image */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent blur-[70px]" />
      </div>

      {/* Main Central Image - Perfectly contained within its box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-[120%] h-[120%] md:w-[130%] md:h-[130%] flex items-center justify-center translate-x-4 lg:translate-x-12"
      >
        <Image 
          src={heroImage}
          alt="cGxP.Directory Global Network"
          fill
          className="object-contain drop-shadow-xl"
          priority
        />
      </motion.div>

      {/* Floating Company Pill 1 - Roche (Mid Left) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute top-[35%] left-[5%] z-20 bg-white rounded-xl shadow-[0_10px_30px_rgb(0,0,0,0.08)] border border-slate-100 px-5 py-2 flex items-center justify-center"
      >
        <span className="text-[14px] font-black tracking-tight text-[#0066cc]">Roche</span>
      </motion.div>

      {/* Floating Company Pill 2 - Pfizer (Top Right) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[18%] right-[35%] z-20 bg-white rounded-xl shadow-[0_10px_30px_rgb(0,0,0,0.08)] border border-slate-100 px-5 py-2 flex items-center justify-center"
      >
        <span className="text-[14px] font-black tracking-tight text-[#0033a0]">Pfizer</span>
      </motion.div>

      {/* Floating Company Pill 3 - Novartis (Mid Right) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute top-[48%] right-[-2%] z-20 bg-white rounded-xl shadow-[0_10px_30px_rgb(0,0,0,0.08)] border border-slate-100 px-5 py-2 flex items-center justify-center"
      >
        <span className="text-[14px] font-black tracking-tight text-[#e65300]">NOVARTIS</span>
      </motion.div>

      {/* Floating Company Pill 4 - Sanofi (Bottom Right) */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[28%] right-[20%] z-20 bg-white rounded-xl shadow-[0_10px_30px_rgb(0,0,0,0.08)] border border-slate-100 px-5 py-2 flex items-center justify-center"
      >
        <span className="text-[14px] font-black tracking-tight text-[#000000]">sanofi</span>
      </motion.div>

      {/* Global Network Stats Card (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-[18%] left-[8%] z-30 bg-white rounded-xl shadow-[0_15px_35px_rgb(0,0,0,0.1)] border border-slate-100 p-4 flex flex-col gap-2 min-w-[180px]"
      >
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Global Network</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black text-[#1a2b49] leading-none">175+</span>
          <span className="text-xs font-bold text-slate-500">Countries</span>
        </div>
        <div className="flex items-center gap-2 mt-1 pt-2 border-t border-slate-100">
          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-slate-200 border border-white" />
            <div className="w-5 h-5 rounded-full bg-slate-300 border border-white" />
            <div className="w-5 h-5 rounded-full bg-slate-400 border border-white" />
          </div>
          <div className="flex flex-col ml-1">
            <span className="text-[12px] font-black leading-none text-[#1a2b49]">10K+</span>
            <span className="text-[9px] font-medium text-slate-500 leading-tight mt-0.5">Active Users</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
