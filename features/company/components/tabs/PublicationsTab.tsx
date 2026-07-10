"use client";

import React, { useState, useMemo } from 'react';
import { BookOpen, ExternalLink, Search } from 'lucide-react';
import { CompanyDetails } from '../../types';
import { Pagination } from '../Pagination';
import { useCompanyData } from '../../hooks/useCompanyData';

export function PublicationsTab({ company }: { company: CompanyDetails }) {
  const { data, isLoading, error } = useCompanyData<{ publications?: any[] }>(company.id, 'publications');
  
  const publications = data?.publications || company.publications || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const query = searchQuery.toLowerCase();
      return (
        pub.title?.toLowerCase().includes(query) ||
        pub.journal?.toLowerCase().includes(query) ||
        pub.pmid?.toLowerCase().includes(query)
      );
    });
  }, [publications, searchQuery]);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-bold text-slate-800">Loading Publications...</h3>
        <p className="text-slate-500 mt-2">Fetching scientific literature from PubMed, OpenAlex, and EuropePMC</p>
      </div>
    );
  }

  if (error || publications.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">Verified Data Unavailable</h3>
        <p className="text-slate-500 mt-2">No publications were found for this organization in public repositories.</p>
      </div>
    );
  }

  const startItem = (currentPage - 1) * pageSize;
  const endItem = startItem + pageSize;
  const paginatedPubs = filteredPublications.slice(startItem, endItem);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          Scientific Publications
          <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredPublications.length}</span>
        </h2>
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search publications..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {paginatedPubs.map((pub) => (
          <div key={pub.pmid} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-[10px] font-black uppercase tracking-widest border border-purple-200">
                    PubMed
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">PMID: {pub.pmid}</span>
                  {pub.doi && (
                    <span className="text-xs font-mono font-bold text-slate-500 border-l border-slate-200 pl-2">DOI: {pub.doi}</span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {pub.title}
                </h3>
                
                <p className="text-sm text-slate-600 mt-2 font-medium">
                  {pub.authors?.join(', ')}
                </p>
                
                <div className="flex items-center gap-4 mt-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    <BookOpen size={14} className="text-slate-400" /> {pub.journal}
                  </span>
                  <span>Published: {pub.publicationDate}</span>
                </div>
              </div>
              
              <a 
                href={pub.url || `https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          No publications match your search.
        </div>
      )}

      {filteredPublications.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalItems={filteredPublications.length}
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
