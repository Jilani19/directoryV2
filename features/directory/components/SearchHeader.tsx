import React from "react";

interface SearchHeaderProps {
  title?: string;
  subtitle?: string;
  count?: number;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  title = "Find Companies",
  subtitle = "Search across verified Life Sciences companies using advanced intelligence filters.",
  count = 5659,
}) => {
  return (
    <div className="text-center space-y-2 mb-6">
      <h1 className="text-4xl font-extrabold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-600">{subtitle}</p>
      <p className="text-sm text-primary font-medium">{count.toLocaleString()} Verified Companies</p>
    </div>
  );
};
