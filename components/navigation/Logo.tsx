import React from "react";
import Link from "next/link";
import { cn } from "../../lib/cn";

interface LogoProps { className?: string; dark?: boolean; }

export function Logo({ className, dark }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Home">
      <div className={cn("text-2xl font-black tracking-tighter transition-colors", "text-primary", dark && "text-white")}>
        cGxP
        <span className={cn("text-blue-500", dark && "text-white/80")}>.Directory</span>
      </div>
    </Link>
  );
}
