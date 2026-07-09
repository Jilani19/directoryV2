import React from "react";
import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
      <span>{label}</span>
      <button 
        onClick={onRemove}
        className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={14} />
      </button>
    </div>
  );
}
