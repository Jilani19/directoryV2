import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange
}: PaginationProps) {
  
  if (totalItems === 0) return null;

  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with ellipses logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex logic for > 5 pages
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-slate-100 gap-6 mt-8">
      
      {/* Left Text */}
      <div className="text-sm font-medium text-slate-500">
        Showing <span className="font-bold text-slate-800">{startItem}–{endItem}</span> of <span className="font-bold text-slate-800">{totalItems.toLocaleString('en-US')}</span> companies
      </div>

      {/* Center Controls */}
      <div className="flex items-center gap-1.5">
        <button 
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-10 h-10 md:w-12 md:h-12 hidden sm:flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          aria-label="First page"
        >
          <ChevronsLeft size={20} />
        </button>

        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="w-10 flex items-center justify-center text-slate-400 font-bold tracking-widest">
                ...
              </span>
            );
          }

          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-base font-black transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${
                currentPage === page 
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
        
        <button 
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 md:w-12 md:h-12 hidden sm:flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          aria-label="Last page"
        >
          <ChevronsRight size={20} />
        </button>
      </div>

      {/* Right Dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-500">Show</span>
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="appearance-none flex items-center gap-2 border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer bg-white"
          >
            {[10, 12, 25, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <ChevronDown size={14} className="text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <span className="text-sm font-medium text-slate-500">per page</span>
      </div>

    </div>
  );
}
