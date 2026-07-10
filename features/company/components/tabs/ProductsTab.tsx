"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Package, Search, ArrowRight } from 'lucide-react';
import { CompanyDetails } from '../../types';
import { Pagination } from '../Pagination';
import { useCompanyData } from '../../hooks/useCompanyData';

export function ProductsTab({ company }: { company: CompanyDetails }) {
  const { data, isLoading, error } = useCompanyData<{ products: any[] }>(company.id, 'products');
  const productsList = data?.products || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const categories = useMemo(() => {
    if (!productsList) return ["All"];
    const cats = new Set(productsList.map(p => p.category || "Uncategorized"));
    return ["All", ...Array.from(cats)];
  }, [productsList]);

  const filteredProducts = useMemo(() => {
    if (!productsList) return [];
    return productsList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.genericName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory || (!product.category && selectedCategory === "Uncategorized");
      return matchesSearch && matchesCategory;
    });
  }, [productsList, searchQuery, selectedCategory]);

  const startItem = (currentPage - 1) * pageSize;
  const endItem = startItem + pageSize;
  const paginatedProducts = filteredProducts.slice(startItem, endItem);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-bold text-slate-800">Loading Products...</h3>
        <p className="text-slate-500 mt-2">Fetching realtime data from OpenFDA and DailyMed</p>
      </div>
    );
  }

  if (error || !productsList || productsList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Package size={28} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Data Unavailable</h3>
        <p className="text-slate-500 max-w-md">No product data was successfully aggregated from public registries for this organization.</p>
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
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
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
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50" tabIndex={0}>
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
              
              <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
              <p className="text-sm font-semibold text-slate-500 mb-4 line-clamp-1">{product.genericName}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-4 mt-auto">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Form</span>
                  <span className="font-bold text-slate-800">{product.dosageForm}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Strength</span>
                  <span className="font-bold text-slate-800 line-clamp-1" title={product.strength}>{product.strength || "-"}</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2 mt-2 pt-2 border-t border-slate-100">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Manufacturer</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{product.manufacturer || "-"}</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2 mt-2 pt-2 border-t border-slate-100">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Status</span>
                  <span className={`font-bold w-fit px-2 py-0.5 rounded-full ${product.approvalStatus === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{product.approvalStatus || "Pending"}</span>
                </div>
              </div>

              {product.description && (
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 pt-4 border-t border-slate-100">
                  {product.description}
                </p>
              )}
              
              <a href={product.officialLink || "#"} target="_blank" rel="noreferrer" className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Official FDA Link <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No matches for your search</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search query or category filters to explore the portfolio.</p>
        </div>
      )}

      {/* Drug Targets & Pharmacology from ChEMBL and OpenTargets */}
      {company.drugTargets && company.drugTargets.length > 0 && (
        <div className="mt-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Package size={16} />
            </span>
            Pharmacology & Molecular Targets
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="pb-4 pr-4">Molecular Target / Mechanism</th>
                  <th className="pb-4 pr-4">Indication / Disease</th>
                  <th className="pb-4">Max Phase Score</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {company.drugTargets.map((target, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-4 pr-4 font-bold text-slate-900">{target.targetName}</td>
                    <td className="py-4 pr-4 text-slate-600">{target.disease}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-mono text-xs font-bold border border-slate-200">
                        {target.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
