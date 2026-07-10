"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Factory, MapPin, ExternalLink, Package, Activity, Award, Building2, Landmark, Users } from 'lucide-react';
import { CompanyDetails } from '../../types';
import { Pagination } from '../Pagination';

export function CorporateTab({ company }: { company: CompanyDetails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const facilities = company.facilitiesList || [];
  const startItem = (currentPage - 1) * pageSize;
  const paginatedFacilities = facilities.slice(startItem, startItem + pageSize);

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-300 pb-12">
      
      {/* Corporate Identity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-blue-600" size={28} />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Corporate Identity</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Legal Name</p>
              <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
            </div>
            
            {company.lei && (
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Legal Entity Identifier (LEI)</p>
                <h3 className="text-lg font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-lg w-fit border border-slate-200">
                  {company.lei}
                </h3>
              </div>
            )}

            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Global Headquarters</p>
              <h3 className="text-sm font-semibold text-slate-700 leading-relaxed">
                {company.headquarters || company.contactInfo?.address || "Data not publicly disclosed"}
              </h3>
            </div>
            
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ownership / Type</p>
              <h3 className="text-sm font-semibold text-slate-700">
                {company.ownership || company.companyType || "Undisclosed"}
              </h3>
            </div>
            {company.jurisdiction && (
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Jurisdiction</p>
                <h3 className="text-sm font-semibold text-slate-700">
                  {company.jurisdiction}
                </h3>
              </div>
            )}
            
            {company.incorporationDate && (
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Incorporation Date</p>
                <h3 className="text-sm font-semibold text-slate-700">
                  {company.incorporationDate}
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-xl flex flex-col relative overflow-hidden group">
          <Landmark className="absolute -right-6 -bottom-6 text-slate-800 opacity-50" size={160} />
          <div className="relative z-10 h-full flex flex-col">
            <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1">Corporate Hierarchy</p>
            <h3 className="text-4xl font-black text-white tracking-tight mt-4">
              {company.subsidiaries ? company.subsidiaries.length : 0}
            </h3>
            <p className="text-sm font-medium text-slate-400 mt-2">Known Subsidiaries</p>
            
            <div className="mt-auto pt-6 border-t border-slate-800">
              <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">Primary Operating Regions</p>
              <p className="text-sm font-bold text-slate-200">{company.countriesServed || "Global"} Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Manufacturing & Facilities */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Factory className="text-slate-700" size={24} />
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Verified Facilities & Manufacturing</h2>
        </div>
        
        {facilities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paginatedFacilities.map((facility) => (
                <div key={facility.id} className="bg-white rounded-[1.5rem] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="relative w-full sm:w-40 h-40 sm:h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                      {facility.image ? (
                        <Image src={facility.image} alt={facility.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Factory size={32} className="text-slate-300" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-sm">
                        {facility.type}
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight">{facility.name}</h3>
                      <div className="flex items-start gap-1.5 mb-3 mt-1">
                        <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-slate-600 leading-snug font-medium">
                          {facility.address}<br />
                          {facility.city}, {facility.country}
                        </span>
                      </div>
                      {facility.googleMapsLink && (
                        <a 
                          href={facility.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 font-bold text-xs hover:underline mt-auto w-fit"
                        >
                          View Map <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  {(facility.productsManufactured?.length || facility.certifications?.length) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 rounded-xl p-4 border border-slate-100 mt-auto">
                      {facility.productsManufactured && facility.productsManufactured.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <span className="flex items-center gap-1 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                            <Package size={12} /> Products
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {facility.productsManufactured.map((prod, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 bg-white border border-slate-200">
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {facility.certifications && facility.certifications.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <span className="flex items-center gap-1 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                            <Award size={12} /> Certifications
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {facility.certifications.map((cert, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            
            <Pagination 
              currentPage={currentPage}
              totalItems={facilities.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
            />
          </>
        ) : (
          <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-200 shadow-sm">
            <Factory size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">No Facilities Found</h3>
            <p className="text-slate-500 mt-2">No global manufacturing sites or research facilities could be automatically verified for this organization.</p>
          </div>
        )}
      </div>
    </div>
  );
}
