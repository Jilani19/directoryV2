import React from "react";

interface FilterGridProps {
  children: React.ReactNode;
}

export const FilterGrid: React.FC<FilterGridProps> = ({ children }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
      {children}
    </div>
  );
};
