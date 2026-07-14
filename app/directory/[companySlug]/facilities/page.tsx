import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Factory, MapPin, Globe2 } from 'lucide-react';
import GlobalMap from '@/features/company/components/GlobalMap';
import { DataProvenanceTooltip } from '@/components/ui/DataProvenanceTooltip';

export default async function FacilitiesPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { facilities: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  const facilities = company.facilities;

  // Compute analytics
  const countries = Array.from(new Set(facilities.map(f => f.country).filter(Boolean)));
  const hqCount = facilities.filter(f => f.type?.toLowerCase().includes('headquarter')).length;
  const mfgCount = facilities.filter(f => f.type?.toLowerCase().includes('manufacturing')).length;
  const rdCount = facilities.filter(f => f.type?.toLowerCase().includes('research') || f.type?.toLowerCase().includes('r&d')).length;

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Analytics Row */}
      {facilities.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-2xl font-black text-slate-900">{facilities.length}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Total Facilities</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-2xl font-black text-slate-900">{countries.length}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Countries</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-2xl font-black text-[#2950DA]">{hqCount}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Headquarters</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-2xl font-black text-[#10B981]">{mfgCount}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Manufacturing</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-2xl font-black text-[#8B5CF6]">{rdCount}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">R&D Centers</span>
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="bg-white rounded-3xl p-2 border border-slate-200 shadow-sm">
        <GlobalMap facilities={facilities} />
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Factory size={24} className="text-[#2950DA]" /> Facility Directory
          </h2>
          <DataProvenanceTooltip 
            source="Wikidata / OpenFDA" 
            date={company.updatedAt?.toISOString()}
          >
            <span className="text-xs font-bold text-slate-400">Data Source</span>
          </DataProvenanceTooltip>
        </div>
        
        {facilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac: any) => (
              <div key={fac.id} className="flex flex-col p-6 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${fac.type?.toLowerCase().includes('headquarter') ? 'bg-[#2950DA]' : fac.type?.toLowerCase().includes('manufacturing') ? 'bg-[#10B981]' : 'bg-slate-300'}`}></div>
                <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-[#2950DA] transition-colors mb-2 line-clamp-2">
                  {fac.name}
                </h4>
                
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{fac.city ? `${fac.city}, ` : ''}{fac.country || 'Unknown Location'}</span>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {fac.type || 'Facility'}
                  </span>
                  
                  {fac.source && (
                    <DataProvenanceTooltip source={fac.source} date={fac.verifiedDate}>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest cursor-pointer">Verified</span>
                    </DataProvenanceTooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
             <Globe2 size={48} className="text-slate-200 mb-4" />
             <p className="text-base font-bold text-slate-500">No verified facility records available.</p>
             <p className="text-sm font-medium text-slate-400 mt-2 max-w-md">Our global engines are continuously synchronizing geospatial data from verified corporate disclosures.</p>
          </div>
        )}
      </div>
    </div>
  );
}