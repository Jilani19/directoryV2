"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Package, Search, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function ProductsTab({ company }: { company: CompanyDetails }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = useMemo(() => {
    if (!company.productsList) return ["All"];
    const cats = new Set(company.productsList.map(p => p.category || "Uncategorized"));
    return ["All", ...Array.from(cats)];
  }, [company.productsList]);

  const filteredProducts = useMemo(() => {
    if (!company.productsList) return [];
    return company.productsList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.genericName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory || (!product.category && selectedCategory === "Uncategorized");
      return matchesSearch && matchesCategory;
    });
  }, [company.productsList, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (!company.productsList || company.productsList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <Package size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">No publicly available information</h3>
        <p className="text-slate-500 mt-2">We could not find any public records for products or drugs associated with this company.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Product Portfolio 
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredProducts.length}</span>
          </h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50" tabIndex={0}>
              <div className="relative w-full h-48 bg-slate-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <Package size={48} className="text-slate-300" />
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-sm">
                  {product.type}
                </div>
              </div>
              
              <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-sm font-semibold text-slate-500 mb-4 line-clamp-1">{product.genericName}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Form</span>
                  <span className="font-bold text-slate-800">{product.dosageForm}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Strength</span>
                  <span className="font-bold text-slate-800">{product.strength || "-"}</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2 mt-2">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Therapeutic Area</span>
                  <span className="font-bold text-slate-800">{product.therapeuticArea || "-"}</span>
                </div>
              </div>

              {product.description && (
                <p className="text-xs text-slate-500 line-clamp-2 mt-auto pt-4 border-t border-slate-100">
                  {product.description}
                </p>
              )}
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                View Product Details <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No products found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or category filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mt-4">
          <p className="text-sm font-bold text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-4 py-2 rounded-xl bg-primary/5 text-primary font-bold text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
