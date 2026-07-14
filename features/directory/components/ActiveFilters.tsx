"use client";
import React from "react";
import { X } from "lucide-react";

interface Chip {
  id: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersProps {
  chips: Chip[];
  clearAll: () => void;
}

export function ActiveFilters({ chips, clearAll }: ActiveFiltersProps) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map((chip) => (
        <div
          key={chip.id}
          className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm text-slate-800 dark:text-slate-200"
        >
          <span>{chip.label}</span>
          <button
            onClick={chip.onRemove}
            className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={12} className="stroke-2" />
          </button>
        </div>
      ))}
      <button
        onClick={clearAll}
        className="ml-auto text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}

export default ActiveFilters;
