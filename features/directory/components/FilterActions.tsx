"use client";
import React from "react";
import { Check, X } from "lucide-react";

interface FilterActionsProps {
  hasUnsavedChanges: boolean;
  onApply: () => void;
  onReset: () => void;
}

export function FilterActions({ hasUnsavedChanges, onApply, onReset }: FilterActionsProps) {
  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={onApply}
        disabled={!hasUnsavedChanges}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors 
          ${hasUnsavedChanges ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
      >
        <Check size={16} className="stroke-2" />
        Apply Filters
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-800 border border-slate-300 hover:bg-slate-50"
      >
        <X size={16} className="stroke-2" />
        Reset All
      </button>
    </div>
  );
}

export default FilterActions;
