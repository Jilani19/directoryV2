"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", duration = 2, label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * value));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  // Format with commas (e.g. 20000 -> 20,000)
  const formattedCount = count.toLocaleString('en-US');

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-baseline gap-1"
      >
        <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
          {formattedCount}{suffix}
        </span>
      </motion.div>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm md:text-base font-semibold text-slate-400 mt-1 uppercase tracking-wider"
      >
        {label}
      </motion.span>
    </div>
  );
}
