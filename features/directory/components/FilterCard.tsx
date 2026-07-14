"use client";
import React from "react";
import { Check, X } from "lucide-react";

interface FilterCardProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  options?: string[]; // includes empty option as first element
  onChange?: (value: string) => void;
  toggle?: boolean; // for boolean switch
  onToggle?: (checked: boolean) => void;
}

export function FilterCard({
  icon,
  label,
  value = "",
  options = [],
  onChange,
  toggle,
  onToggle,

}: FilterCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg bg-white dark:bg-[#0F172A] border-slate-200 dark:border-white/10 min-w-[260px] h-full">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2">
          {icon && <span className="flex items-center">{icon}</span>}
          <span>{label}</span>
        </div>
      </div>
      {options.length > 0 && onChange ? (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt || "Any"}
            </option>
          ))}
        </select>
      ) : null}
      {typeof toggle === "boolean" && onToggle ? (
        <button
          onClick={() => onToggle(!toggle)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${toggle ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {toggle ? <Check size={14} className="stroke-2" /> : <X size={14} className="stroke-2" />}
          {toggle ? "Enabled" : "Disabled"}
        </button>
      ) : null}
    </div>
  );
}

export default FilterCard;
