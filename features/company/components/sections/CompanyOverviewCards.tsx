import React from 'react';
import { CompanyDetails } from '../../types';
import { InfoCard } from '../InfoCard';
import { FileText, Target, Eye, Briefcase, Globe2, Layers, Tag, Building2, Network } from 'lucide-react';

export function CompanyOverviewCards({ company }: { company: CompanyDetails }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {company.aboutDescription && (
        <InfoCard title="Company Description" icon={<FileText size={20} />} className="md:col-span-2">
          {company.aboutDescription}
        </InfoCard>
      )}

      {company.mission && (
        <InfoCard title="Mission" icon={<Target size={20} />}>
          {company.mission}
        </InfoCard>
      )}

      {company.vision && (
        <InfoCard title="Vision" icon={<Eye size={20} />}>
          {company.vision}
        </InfoCard>
      )}

      {company.coreBusiness && company.coreBusiness.length > 0 && (
        <InfoCard title="Core Business" icon={<Briefcase size={20} />}>
          <div className="flex flex-wrap gap-2">
            {company.coreBusiness.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                {item}
              </span>
            ))}
          </div>
        </InfoCard>
      )}

      {company.keyMarkets && company.keyMarkets.length > 0 && (
        <InfoCard title="Key Markets" icon={<Globe2 size={20} />}>
          <div className="flex flex-wrap gap-2">
            {company.keyMarkets.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                {item}
              </span>
            ))}
          </div>
        </InfoCard>
      )}

      {company.businessSegments && company.businessSegments.length > 0 && (
        <InfoCard title="Business Segments" icon={<Layers size={20} />}>
          <ul className="list-disc list-inside space-y-1">
            {company.businessSegments.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </InfoCard>
      )}

      {company.brands && company.brands.length > 0 && (
        <InfoCard title="Major Brands" icon={<Tag size={20} />}>
          <div className="flex flex-wrap gap-2">
            {company.brands.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary-700 text-xs font-bold rounded-full border border-primary/20">
                {item}
              </span>
            ))}
          </div>
        </InfoCard>
      )}

      {company.parentCompany && (
        <InfoCard title="Parent Company" icon={<Building2 size={20} />}>
          <p className="font-bold text-slate-800">{company.parentCompany}</p>
        </InfoCard>
      )}

      {company.subsidiaries && company.subsidiaries.length > 0 && (
        <InfoCard title="Subsidiaries" icon={<Network size={20} />}>
          <div className="flex flex-wrap gap-2">
            {company.subsidiaries.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-md border border-slate-200">
                {item}
              </span>
            ))}
          </div>
        </InfoCard>
      )}

    </div>
  );
}
