import React from 'react';
import { CompanyDetails } from '../../types';
import { Users, HeartHandshake, Briefcase, ExternalLink } from 'lucide-react';

export function CareersTab({ company }: { company: CompanyDetails }) {
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="text-blue-600" size={32} />
            Careers & Culture
          </h2>
          <p className="text-slate-500 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            Corporate culture, environmental, social, and governance (ESG) commitments, and global career opportunities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Corporate Culture & ESG */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-200/50 flex items-center gap-3">
            <HeartHandshake size={18} className="text-blue-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Corporate Culture & ESG</h3>
          </div>
          <div className="p-6 md:p-8">
            {company.culture ? (
              <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-line">{company.culture}</p>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 py-12">
                <HeartHandshake size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium italic">Environmental, Social, and Governance (ESG) culture statements are currently being synced.</p>
              </div>
            )}
          </div>
        </div>

        {/* Careers Portal */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-200/50 flex items-center gap-3">
            <Briefcase size={18} className="text-blue-400" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Open Positions</h3>
          </div>
          <div className="p-6 md:p-8 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
            {company.careersPage ? (
              <>
                <Briefcase size={48} className="text-blue-200 mb-6" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Explore Opportunities at {company.name}</h4>
                <p className="text-slate-500 mb-8 max-w-sm">Browse open roles and learn more about life at the company through their official careers portal.</p>
                <a 
                  href={company.careersPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-xl"
                >
                  Visit Careers Portal <ExternalLink size={18} />
                </a>
              </>
            ) : (
              <>
                <Briefcase size={48} className="text-slate-200 mb-6" />
                <h4 className="text-xl font-bold text-slate-400 mb-2">Careers Portal Unavailable</h4>
                <p className="text-slate-400 text-sm italic">An official careers portal could not be automatically resolved.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
