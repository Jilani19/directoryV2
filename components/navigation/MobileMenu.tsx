"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../constants/navigation";
import { NavigationItem } from "./NavigationItem";
import Link from "next/link";

interface MobileMenuProps { isOpen: boolean; onClose: () => void; }

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg border-b border-slate-200 flex flex-col p-4 gap-4 z-50 md:hidden"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <NavigationItem
                key={link.label}
                href={link.href}
                label={link.label}
                className="text-lg py-2 border-b border-slate-100 last:border-none"
                isActive={isActive}
                onClick={onClose}
                isExternal={link.isExternal}
              />
            );
          })}
          <div className="pt-4 flex flex-col gap-3">
            <Link 
              href="/login" 
              onClick={onClose}
              className="w-full text-center text-lg font-semibold text-slate-800 dark:text-white py-3 border border-slate-200 dark:border-white/10 rounded-xl"
            >
              Sign In
            </Link>
            <Link 
              href="/register"
              onClick={onClose}
              className="w-full text-center text-lg font-semibold bg-primary text-white py-3 rounded-xl shadow-md"
            >
              Join Now
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
