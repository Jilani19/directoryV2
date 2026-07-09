import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { MobileMenu } from "./MobileMenu";

interface MobileNavigationProps { className?: string; }

export function MobileNavigation({ className }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("flex md:hidden items-center gap-2", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        className={cn("p-2 rounded-md transition-colors text-slate-800 hover:bg-slate-100")}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
