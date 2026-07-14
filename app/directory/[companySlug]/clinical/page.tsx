import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Stethoscope, ExternalLink, Activity, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import { DataProvenanceTooltip } from '@/components/ui/DataProvenanceTooltip';

export default async function ClinicalPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { clinicalTrials: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  const trials = company.clinicalTrials;

  const sponsorTrials = trials.filter((t: any) => t.trialCategory === 'SPONSOR_REGISTERED' || !t.trialCategory);
  const companyTrials = trials.filter((t: any) => t.trialCategory === 'COMPANY_REPORTED');

  // Phase Distribution Analytics
  const getPhaseCount = (phaseNum: string) => sponsorTrials.filter((t: any) => {
    if (!t.phase) return false;
    const normalized = t.phase.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    return normalized.includes(`PHASE${phaseNum}`);
  }).length;
  
  const phase1 = getPhaseCount('1');
  const phase2 = getPhaseCount('2');
  const phase3 = getPhaseCount('3');
  const phase4 = getPhaseCount('4');
  
  const totalWithPhase = phase1 + phase2 + phase3 + phase4;

  const TrialCard = ({ trial }: { trial: any }) => (
    <div key={trial.id} className="flex flex-col p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${
        trial.status?.toLowerCase().includes('completed') ? 'bg-emerald-500' :
        trial.status?.toLowerCase().includes('recruiting') ? 'bg-[#2950DA]' :
        'bg-amber-400'
      }`}></div>

      <div className="flex justify-between items-start mb-4 gap-4 pl-2">
        <h4 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-[#2950DA] transition-colors pr-8">
          {trial.title}
        </h4>
        {trial.url && (
          <Link href={trial.url} target="_blank" className="shrink-0 p-2 bg-slate-50 border border-slate-100 text-slate-400 hover:text-[#2950DA] hover:bg-[#F4F7FB] rounded-xl transition-all shadow-sm">
            <ExternalLink size={16} />
          </Link>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider pl-2 mb-6">
        {trial.nctId && (
          <span className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-md">{trial.nctId}</span>
        )}
        {trial.phase && (
          <span className="bg-purple-50 border border-purple-100 text-purple-600 px-3 py-1 rounded-md">{trial.phase}</span>
        )}
        {trial.status && (
          <span className={`px-3 py-1 rounded-md border ${
            trial.status.toLowerCase().includes('completed') ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
            trial.status.toLowerCase().includes('recruiting') ? 'bg-blue-50 border-blue-100 text-[#2950DA]' :
            'bg-amber-50 border-amber-100 text-amber-600'
          }`}>
            {trial.status}
          </span>
        )}
        {trial.enrollment !== null && (
          <span className="bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1 rounded-md flex items-center gap-1.5">
            <Users size={12} /> {trial.enrollment.toLocaleString()} Enrolled
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto pt-5 border-t border-slate-100 pl-2">
         <div className="flex flex-col gap-1 text-xs">
           <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Sponsor</span>
           <span className="text-slate-700 font-semibold truncate bg-slate-50 px-2 py-1.5 rounded-md border border-slate-100 w-fit max-w-full">
             {company.name}
           </span>
         </div>
         <div className="flex flex-col gap-1 text-xs">
           <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Conditions / Interventions</span>
           <span className="text-slate-700 font-semibold truncate bg-slate-50 px-2 py-1.5 rounded-md border border-slate-100 w-fit max-w-full">
             Primary Medical Indication
           </span>
         </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* Analytics Row */}
      {sponsorTrials.length > 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col flex-1">
             <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Government Registered Clinical Trials</span>
             <span className="text-4xl font-black text-slate-900">{sponsorTrials.length}</span>
             <span className="text-xs font-semibold text-emerald-500 mt-2">Active Pipeline</span>
          </div>
          
          <div className="flex-1 w-full flex flex-col gap-3">
             <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Phase Distribution</span>
             
             <div className="flex flex-col gap-2">
               {[
                 { label: 'Phase 1', count: phase1, color: 'bg-blue-400' },
                 { label: 'Phase 2', count: phase2, color: 'bg-indigo-400' },
                 { label: 'Phase 3', count: phase3, color: 'bg-purple-500' },
                 { label: 'Phase 4', count: phase4, color: 'bg-emerald-400' },
               ].map(p => (
                 <div key={p.label} className="flex items-center gap-3 text-xs">
                   <span className="w-14 font-bold text-slate-600 shrink-0">{p.label}</span>
                   <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                     <div 
                       className={`h-full ${p.color} rounded-full`} 
                       style={{ width: `${totalWithPhase > 0 ? (p.count / totalWithPhase) * 100 : 0}%` }}
                     ></div>
                   </div>
                   <span className="w-8 font-bold text-slate-400 text-right shrink-0">{p.count}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* Dashboard A */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope size={24} className="text-[#2950DA]" /> Official Government Registered Trials
          </h2>
          <DataProvenanceTooltip 
            source="ClinicalTrials.gov API / WHO ICTRP / EU CTIS" 
            date={company.updatedAt?.toISOString()}
          >
            <span className="text-xs font-bold text-slate-400">Data Source</span>
          </DataProvenanceTooltip>
        </div>
        
        {sponsorTrials.length > 0 ? (
          <div className="flex flex-col gap-6">
            {sponsorTrials.map((trial: any) => <TrialCard key={trial.id} trial={trial} />)}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
             <Activity size={48} className="text-slate-200 mb-4" />
             <p className="text-base font-bold text-slate-500">No verified clinical trial records available.</p>
          </div>
        )}
      </div>

      {/* Dashboard B */}
      {companyTrials.length > 0 && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Stethoscope size={24} className="text-emerald-600" /> Company Reported Programs
            </h2>
            <DataProvenanceTooltip 
              source="Official Corporate Reports" 
              date={company.updatedAt?.toISOString()}
            >
              <span className="text-xs font-bold text-slate-400">Data Source</span>
            </DataProvenanceTooltip>
          </div>
          
          <div className="flex flex-col gap-6">
            {companyTrials.map((trial: any) => <TrialCard key={trial.id} trial={trial} />)}
          </div>
        </div>
      )}
    </div>
  );
}