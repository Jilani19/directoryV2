"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/cn";
import { Logo } from "./Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { RegisterCompanyButton } from "./RegisterCompanyButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8 xl:gap-12">
          <Logo />
          <DesktopNavigation />
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <RegisterCompanyButton className="hidden md:flex" />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
