import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";

interface RegisterCompanyButtonProps { className?: string; }

export function RegisterCompanyButton({ className }: RegisterCompanyButtonProps) {
  return (
    <Link 
      href="/register"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50",
        className
      )}
    >
      Register <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
