import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Package, ShieldCheck, FlaskConical, ExternalLink, Activity } from 'lucide-react';
import Link from 'next/link';
import { DataProvenanceTooltip } from '@/components/ui/DataProvenanceTooltip';

export default async function ProductsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { products: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Analytics Row */}
      {company.products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-2xl font-black text-slate-900">{company.products.length}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Total Products</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <span className="text-2xl font-black text-emerald-500">
              {company.products.filter((p: any) => p.approvalStatus === 'Approved').length}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">FDA Approved</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Package size={24} className="text-[#2950DA]" /> Product Portfolio
          </h2>
          <span className="text-xs font-bold text-slate-400">Data Source</span>
        </div>
        
        {company.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {company.products.map((item: any) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full group relative overflow-hidden">
                {/* Status Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 ${item.approvalStatus === 'Approved' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black text-slate-900 text-lg leading-tight group-hover:text-[#2950DA] transition-colors line-clamp-2 pr-2">
                    {item.name}
                  </h4>
                  {item.approvalStatus === 'Approved' && (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 shrink-0 cursor-default">
                      <ShieldCheck size={12} />
                      Approved
                    </div>
                  )}
                </div>
                
                {item.genericName && (
                  <div className="flex items-center gap-2 mb-4">
                    <FlaskConical size={14} className="text-slate-400" />
                    <p className="text-xs font-bold text-slate-500 truncate">{item.genericName}</p>
                  </div>
                )}

                {item.therapeuticArea && (
                  <div className="mb-4">
                    <span className="inline-block px-2.5 py-1 bg-[#F4F7FB] text-[#2950DA] text-[10px] font-bold uppercase tracking-wider rounded-md border border-[#E5EDF8]">
                      {item.therapeuticArea}
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col gap-3 mt-auto pt-5 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    {item.dosageForm && (
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Format</span>
                        <span className="text-slate-700 font-semibold truncate">{item.dosageForm}</span>
                      </div>
                    )}
                    {item.route && (
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Route</span>
                        <span className="text-slate-700 font-semibold truncate">{item.route}</span>
                      </div>
                    )}
                  </div>
                  
                  {item.manufacturer && (
                    <div className="flex flex-col gap-1 text-[10px] mt-2">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Manufacturer</span>
                      <span className="text-slate-600 font-semibold truncate bg-slate-50 px-2 py-1 rounded">{item.manufacturer}</span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                     {item.rxNorm && (
                       <Link href={`https://mor.nlm.nih.gov/RxNav/search?searchBy=RXCUI&searchTerm=${item.rxNorm}`} target="_blank" className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[9px] font-bold text-slate-500 hover:text-[#2950DA] transition-colors">
                         RxNorm <ExternalLink size={10} />
                       </Link>
                     )}
                     <Link href={`https://open.fda.gov/apis/drug/label/?search=openfda.brand_name:"${item.name}"`} target="_blank" className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[9px] font-bold text-slate-500 hover:text-[#2950DA] transition-colors">
                       OpenFDA <ExternalLink size={10} />
                     </Link>
                     <span className="ml-auto text-[9px] font-bold text-slate-400 uppercase tracking-widest">Source</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
             <Package size={48} className="text-slate-200 mb-4" />
             <p className="text-base font-bold text-slate-500">No verified product records available.</p>
          </div>
        )}
      </div>
    </div>
  );
}