import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Users, UserCircle2, Briefcase } from 'lucide-react';
import { DataProvenanceTooltip } from '@/components/ui/DataProvenanceTooltip';

export default async function LeadershipPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { executives: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  const leadership = company.executives.filter((e: any) => e.type === 'LEADERSHIP');
  const board = company.executives.filter((e: any) => e.type === 'BOARD');

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* Executive Leadership Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Briefcase size={24} className="text-[#2950DA]" /> Executive Leadership
          </h2>
          <DataProvenanceTooltip 
            source="Wikidata / Public Records" 
            date={company.updatedAt?.toISOString()}
          >
            <span className="text-xs font-bold text-slate-400">Data Source</span>
          </DataProvenanceTooltip>
        </div>
        
        {leadership.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {leadership.map((exec: any) => (
              <div key={exec.id} className="flex flex-col gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-[#2950DA]/30 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 shadow-inner overflow-hidden relative">
                    {exec.photoUrl ? (
                      <img src={exec.photoUrl} alt={exec.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 size={32} className="text-slate-300" />
                    )}
                  </div>
                  <div className="flex flex-col pt-1 flex-1 min-w-0">
                    <span className="text-base font-black text-slate-900 leading-tight truncate group-hover:text-[#2950DA] transition-colors">{exec.name}</span>
                    <span className="text-xs font-bold text-[#2950DA] mt-1 truncate">{exec.title || 'Executive'}</span>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-bold tracking-widest uppercase border border-slate-100">
                         {exec.department || 'C-Suite'}
                       </span>
                    </div>
                  </div>
                </div>
                
                {exec.biography && (
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mt-2">{exec.biography}</p>
                )}
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      {exec.linkedinUrl && (
                        <a href={exec.linkedinUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#2950DA] hover:underline">LinkedIn</a>
                      )}
                      {exec.officialProfileUrl && (
                        <a href={exec.officialProfileUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#2950DA] hover:underline">Profile</a>
                      )}
                   </div>
                   <DataProvenanceTooltip source="Official Corporate Data" date={exec.updatedAt?.toISOString()}>
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest cursor-help">Verified</span>
                   </DataProvenanceTooltip>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
             <Briefcase size={48} className="text-slate-200 mb-4" />
             <p className="text-base font-bold text-slate-500">No verified executive records available.</p>
          </div>
        )}
      </div>

      {/* Board of Directors Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users size={24} className="text-purple-600" /> Board of Directors
          </h2>
          <DataProvenanceTooltip 
            source="Wikidata / Public Records" 
            date={company.updatedAt?.toISOString()}
          >
            <span className="text-xs font-bold text-slate-400">Data Source</span>
          </DataProvenanceTooltip>
        </div>
        
        {board.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {board.map((exec: any) => (
              <div key={exec.id} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-purple-600/30 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 shadow-inner overflow-hidden relative">
                  <UserCircle2 size={32} className="text-slate-300" />
                  <div className="absolute bottom-0 w-full bg-black/40 text-[8px] text-center text-white font-bold py-0.5">No Photo</div>
                </div>
                <div className="flex flex-col pt-1 flex-1 min-w-0">
                  <span className="text-base font-black text-slate-900 leading-tight truncate group-hover:text-purple-600 transition-colors">{exec.name}</span>
                  <span className="text-xs font-bold text-purple-600 mt-1 truncate">{exec.title || 'Board Member'}</span>
                  <div className="flex items-center justify-between mt-4">
                    <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded text-[10px] font-bold tracking-widest uppercase border border-slate-100">Director</span>
                    <DataProvenanceTooltip source="Wikidata / Verified Profile">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center cursor-pointer">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      </span>
                    </DataProvenanceTooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
             <Users size={48} className="text-slate-200 mb-4" />
             <p className="text-base font-bold text-slate-500">No verified board member records available.</p>
          </div>
        )}
      </div>

    </div>
  );
}