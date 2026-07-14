"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Palette, Check, Sun, Moon, Waves, TreePine, Sunset } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const THEMES = [
  { id: "light", name: "Light", icon: Sun, color: "#FFFFFF", border: "#E2E8F0" },
  { id: "dark", name: "Luxury Dark", icon: Moon, color: "#2E2348", border: "#6C3FF5" },
  { id: "ocean", name: "Deep Ocean", icon: Waves, color: "#001B2E", border: "#014F86" },
  { id: "forest", name: "Forest Night", icon: TreePine, color: "#0B1C10", border: "#40916C" },
  { id: "sunset", name: "Sunset Glow", icon: Sunset, color: "#2C0710", border: "#F72585" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse"></div>;

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all dark:text-slate-300 dark:hover:text-white rounded-full p-2 hover:bg-slate-100 dark:hover:bg-white/10"
        aria-label="Select Theme"
        title="Select Theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-2 flex flex-col gap-1">
              {THEMES.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.id;
                
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center border"
                        style={{ backgroundColor: t.color, borderColor: t.border }}
                      />
                      {t.name}
                    </div>
                    {isActive && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
