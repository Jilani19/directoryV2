import React, { useEffect, useState } from "react";
import { LayoutGrid, Dna, Activity, HeartPulse, Layers, FlaskConical, Pill } from "lucide-react";
import { categoryService, Category } from "../services/category.service";

interface CategoryHorizontalBarProps {
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryHorizontalBar({ activeCategory, onSelectCategory }: CategoryHorizontalBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getCategories().then(data => {
      if (data && data.length > 0) {
        setCategories(data.filter((c: Category) => !c.name.includes("API") && !c.name.includes("Bulk Drugs")));
      }
    }).catch(() => {
      // Fallback dummy data if API fails/not ready
      setCategories([
        { id: "1", name: "Pharmaceuticals", slug: "pharmaceuticals", companyCount: 12451 },
        { id: "2", name: "Biotech", slug: "biotech", companyCount: 8245 },
        { id: "3", name: "Injectables", slug: "injectables", companyCount: 3214 },
        { id: "4", name: "Nutraceuticals", slug: "nutraceuticals", companyCount: 2145 },
        { id: "6", name: "Medical Devices", slug: "medical-devices", companyCount: 3521 },
      ]);
    });
  }, []);

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("pharma")) return <Layers size={20} />;
    if (n.includes("biotech")) return <Dna size={20} />;
    if (n.includes("inject")) return <Activity size={20} />;
    if (n.includes("nutra")) return <Pill size={20} />;
    if (n.includes("api") || n.includes("bulk")) return <FlaskConical size={20} />;
    if (n.includes("device")) return <HeartPulse size={20} />;
    return <Layers size={20} />;
  };

  const getIconColorClass = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("pharma")) return "text-blue-500";
    if (n.includes("biotech")) return "text-purple-500";
    if (n.includes("inject")) return "text-teal-500";
    if (n.includes("nutra")) return "text-lime-500";
    if (n.includes("api") || n.includes("bulk")) return "text-sky-500";
    if (n.includes("device")) return "text-rose-500";
    return "text-slate-500";
  };

  return (
    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-1">
      {/* All Categories Button */}
      <button 
        onClick={() => onSelectCategory(null)}
        className={`flex flex-col items-center justify-center min-w-[120px] p-4 rounded-2xl border transition-all ${
          activeCategory === null 
            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm" 
            : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F172A] hover:border-indigo-300"
        }`}
      >
        <LayoutGrid size={24} className={activeCategory === null ? "text-indigo-600" : "text-slate-400"} />
        <span className={`text-sm font-bold mt-2 ${activeCategory === null ? "text-indigo-700 dark:text-indigo-300" : "text-slate-900 dark:text-white"}`}>All Categories</span>
        <span className="text-[10px] text-indigo-600 font-bold mt-1">View All</span>
      </button>

      {/* Dynamic Categories */}
      {categories.map((cat) => {
        const isActive = activeCategory === cat.name;
        return (
          <button 
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex flex-col items-center justify-center min-w-[140px] p-4 rounded-2xl border transition-all ${
              isActive 
                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm" 
                : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F172A] hover:border-indigo-300"
            }`}
          >
            <div className={getIconColorClass(cat.name)}>
              {getIconForCategory(cat.name)}
            </div>
            <span className={`text-sm font-bold mt-2 truncate w-full text-center ${isActive ? "text-indigo-700 dark:text-indigo-300" : "text-slate-900 dark:text-white"}`}>
              {cat.name}
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-1">
              {cat.companyCount.toLocaleString()} Companies
            </span>
          </button>
        );
      })}


    </div>
  );
}
