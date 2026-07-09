import React from "react";
import Link from "next/link";
import { cn } from "../../lib/cn";

interface NavigationItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function NavigationItem({ href, label, isActive, className, onClick }: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-slate-600",
        className
      )}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
