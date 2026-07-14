"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/cn";
import { Logo } from "./Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import Link from "next/link";
import { Globe, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { ThemeSelector } from "./ThemeSelector";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled ? "bg-white/80 dark:bg-navy-950/80 shadow-glass py-3 border-b border-white/20 dark:border-white/10" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8 xl:gap-12">
          <Logo />
          <DesktopNavigation />
        </div>
        
        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center ml-2">
            <Link 
              href="/register"
              className="text-sm font-semibold bg-primary hover:bg-primary/90 text-white transition-colors px-6 py-2.5 rounded-full shadow-md hover:shadow-lg"
            >
              Join Now
            </Link>
          </div>
          
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}

