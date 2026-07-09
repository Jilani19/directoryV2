import React from 'react';
import { CompanyDetails } from '../../types';
import { User, Landmark } from 'lucide-react';
import Image from 'next/image';

export function BoardOfDirectors({ board }: { board: NonNullable<CompanyDetails['boardOfDirectors']> }) {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Landmark size={24} />
        </div>
        <h3 className="text-2xl font-black text-slate-900">Board of Directors</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {board.map((member) => (
          <div key={member.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-indigo-200 transition-all">
            <div className="relative w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
              {member.image ? (
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <User size={24} className="text-slate-400" />
              )}
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <h4 className="text-base font-black text-slate-900 truncate" title={member.name}>{member.name}</h4>
              <span className="text-xs font-bold text-slate-600 mb-2 truncate" title={member.role}>{member.role}</span>
              
              <span className={`self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border mb-3 ${
                member.type === 'Independent Director' 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : member.type === 'Executive Director'
                    ? 'bg-blue-50 text-blue-600 border-blue-100'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}>
                {member.type}
              </span>

              {member.committeeMemberships && member.committeeMemberships.length > 0 && (
                <div className="flex flex-col gap-1 mt-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Committees</span>
                  <div className="flex flex-wrap gap-1">
                    {member.committeeMemberships.map((committee, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold whitespace-nowrap">
                        {committee}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
