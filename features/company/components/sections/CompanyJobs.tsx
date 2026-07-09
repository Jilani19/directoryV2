"use client";

import React from 'react';
import { Briefcase, ArrowRight, MapPin, Clock } from 'lucide-react';
import { CompanyDetails } from '../../types';

export function CompanyJobs({ company }: { company: CompanyDetails }) {
  if (!company.jobs || company.jobs.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Briefcase size={24} className="text-primary" /> Career Opportunities
        </h2>
        <a href="#" className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
          View All Jobs <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {company.jobs.map((job) => (
          <a 
            key={job.id} 
            href={job.applyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">{job.department}</span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12} /> {job.postedAt}</span>
            </div>
            
            <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{job.title}</h3>
            
            <div className="flex items-center gap-4 text-sm text-slate-600 mt-auto pt-4 font-medium">
              <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-slate-400" /> {job.type}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
