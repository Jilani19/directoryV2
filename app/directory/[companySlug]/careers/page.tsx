import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Briefcase, ExternalLink, MapPin } from 'lucide-react';
import Link from 'next/link';

export default async function CareersPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  
  const company = await prisma.company.findFirst({
    where: { slug: companySlug },
    include: { jobs: { orderBy: { createdAt: 'desc' } } }
  });

  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><Briefcase size={20} className="text-[#2950DA]" /> Open Roles & Careers</span>
          {company.jobs.length > 0 && (
            <span className="px-3 py-1 bg-[#F4F7FB] text-[#2950DA] rounded-full text-[12px] font-bold">
              {company.jobs.length} Jobs
            </span>
          )}
        </h2>
        
        {company.jobs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {company.jobs.map((job: any) => (
              <div key={job.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 leading-snug group-hover:text-[#2950DA] transition-colors mb-2">
                    {job.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                    {job.department && (
                      <span className="bg-slate-100 px-2 py-1 rounded-md">{job.department}</span>
                    )}
                    {job.location && (
                      <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                    )}
                    {job.type && (
                      <span className="border-l border-slate-200 pl-3">{job.type}</span>
                    )}
                  </div>
                </div>
                {job.url && (
                  <Link href={job.url} target="_blank" className="shrink-0 text-sm font-bold text-white bg-slate-900 hover:bg-[#2950DA] px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-center justify-center">
                    Apply Now <ExternalLink size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-slate-500">No verified job openings available.</p>
        )}
      </div>
    </div>
  );
}