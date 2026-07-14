import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  const baseClasses = "bg-white rounded-2xl shadow-lg p-4 transition-transform duration-200 hover:shadow-xl hover:-translate-y-1";
  return <div className={`${baseClasses} ${className || ""}`}>{children}</div>;
};
