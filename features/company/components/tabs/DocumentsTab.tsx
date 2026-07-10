"use client";

import React, { useState, useMemo } from 'react';
import { File, Download, Search, FileText, FileSpreadsheet, Presentation, Eye } from 'lucide-react';
import { CompanyDetails } from '../../types';
import { Pagination } from '../Pagination';

export function DocumentsTab({ company }: { company: CompanyDetails }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const categories = useMemo(() => {
    if (!company.documents) return ["All"];
    const cats = new Set(company.documents.map(d => d.category));
    return ["All", ...Array.from(cats)];
  }, [company.documents]);

  const filteredDocs = useMemo(() => {
    if (!company.documents) return [];
    return company.documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [company.documents, searchQuery, selectedCategory]);

  const startItem = (currentPage - 1) * pageSize;
  const endItem = startItem + pageSize;
  const paginatedDocs = filteredDocs.slice(startItem, endItem);

  if (!company.documents || company.documents.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
        <File size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">Verified Data Unavailable</h3>
        <p className="text-slate-500 mt-2">No SEC EDGAR filings, Annual Reports, or ESG reports could be retrieved for this organization.</p>
      </div>
    );
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText size={24} className="text-rose-500" />;
      case 'DOCX': return <FileText size={24} className="text-blue-500" />;
      case 'PPTX': return <Presentation size={24} className="text-orange-500" />;
      case 'XLSX': return <FileSpreadsheet size={24} className="text-emerald-500" />;
      default: return <File size={24} className="text-slate-500" />;
    }
  };

  const handlePreview = (docUrl: string) => {
    window.open(docUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Document Center
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredDocs.length}</span>
          </h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search documents..." 
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
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedDocs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between group focus-within:ring-2 focus-within:ring-blue-500/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                {getFileIcon(doc.type)}
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-base font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{doc.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span className="px-2 py-1 rounded bg-slate-100">{doc.category}</span>
                  <span className="flex items-center before:content-[''] before:w-1 before:h-1 before:bg-slate-300 before:rounded-full before:mr-2">{doc.size}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
              <span className="text-xs font-bold text-slate-400">{doc.date}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePreview(doc.url)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-bold text-xs transition-colors border border-slate-200"
                >
                  <Eye size={14} /> Preview
                </button>
                <a 
                  href={doc.url} 
                  download 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors border border-blue-200/50 hover:border-blue-600"
                >
                  <Download size={14} /> Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          No documents match your search.
        </div>
      )}

      {filteredDocs.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredDocs.length}
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
