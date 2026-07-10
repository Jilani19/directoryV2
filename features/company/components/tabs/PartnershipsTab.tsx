import React from 'react';
import { CompanyDetails } from '../../types';
import { Briefcase, Handshake, Network, Award, CheckCircle2 } from 'lucide-react';

export function PartnershipsTab({ company }: { company: CompanyDetails }) {
  const sections = [
    { title: "M&A Activity", data: company.mergersAcquisitions, icon: Network, emptyMsg: "No recent mergers or acquisitions disclosed" },
    { title: "Licensing Deals", data: company.licensingDeals, icon: Handshake, emptyMsg: "No public licensing deals tracked" },
    { title: "Partnership & Collaboration History", data: company.partnershipHistory, icon: Handshake, emptyMsg: "No strategic partnerships publicly verified" },
    { title: "Contract Services Offered", data: company.contractServices, icon: Briefcase, emptyMsg: "Not categorized as a contract service provider" },
    { title: "Awards & Recognitions", data: company.awards, icon: Award, emptyMsg: "No official awards tracking available" },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Handshake className="text-blue-600" size={32} />
            Strategic Partnerships & M&A
          </h2>
          <p className="text-slate-500 mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
            Strategic alliances, mergers, acquisitions, and licensing transactions verified from press releases and financial disclosures.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-blue-200 transition-colors">
              <div className="bg-slate-900 px-6 py-4 border-b border-slate-200/50 flex items-center gap-3">
                <Icon size={18} className="text-blue-400" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">{section.title}</h3>
              </div>
              <div className="p-6 flex-1">
                {section.data && section.data.length > 0 ? (
                  <ul className="space-y-4">
                    {section.data.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">{item}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[120px]">
                    <Icon size={32} className="mb-3 opacity-20" />
                    <p className="text-sm font-medium italic">{section.emptyMsg}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
