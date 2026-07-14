"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import { NAV_LINKS } from "../../constants/navigation";

interface DesktopNavigationProps { className?: string; }

export function DesktopNavigation({ className }: DesktopNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={`hidden md:flex items-center gap-6 ${className || ""}`}>
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <NavigationItem
            key={link.label}
            href={link.href}
            label={link.label}
            isActive={isActive}
            isExternal={link.isExternal}
          />
        );
      })}
    </nav>
  );
}
