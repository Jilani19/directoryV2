import React from "react";
import Link from "next/link";
import { cn } from "../../lib/cn";

interface NavigationItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  isExternal?: boolean;
}

export function NavigationItem({ href, label, isActive, className, onClick, isExternal }: NavigationItemProps) {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "relative text-sm font-semibold transition-colors hover:text-primary py-2",
        isActive ? "text-primary" : "text-navy-600 dark:text-navy-300",
        className
      )}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
      )}
    </Link>
  );
}
