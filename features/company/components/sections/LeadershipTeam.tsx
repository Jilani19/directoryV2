import React from 'react';
import { CompanyDetails } from '../../types';
import { Briefcase, User, Mail, Phone, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export function LeadershipTeam({ leadership }: { leadership: NonNullable<CompanyDetails['leadership']> }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-black text-slate-900">Leadership Team</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {leadership.map((leader) => (
          <div key={leader.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md hover:border-primary/30 transition-all flex flex-col h-full">
            <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
              {leader.image ? (
                <Image 
                  src={leader.image} 
                  alt={leader.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <User size={48} className="text-slate-300" />
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Hover Actions */}
              <div className="absolute bottom-4 right-4 flex gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {leader.linkedin && (
                  <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:bg-white hover:text-[#0A66C2] transition-colors" title="LinkedIn Profile">
                    <Briefcase size={14} />
                  </a>
                )}
                {leader.officialProfile && (
                  <a href={leader.officialProfile} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-colors" title="Official Profile">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h4 className="text-lg font-black text-slate-900 leading-tight mb-1">{leader.name}</h4>
              <span className="text-sm font-bold text-primary mb-2 block">{leader.role}</span>
              
              {leader.department && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4">
                  <Briefcase size={12} />
                  {leader.department}
                </div>
              )}
              
              {leader.bio && (
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {leader.bio}
                </p>
              )}

              {/* Stats / Details */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                {leader.experience && (
                  <span className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-slate-200">
                    {leader.experience} Exp
                  </span>
                )}
                {leader.yearsAtCompany && (
                  <span className="px-2 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider rounded-md border border-primary/20">
                    {leader.yearsAtCompany} at Company
                  </span>
                )}
              </div>

              {/* Contact Info (if public) */}
              {(leader.email || leader.phone) && (
                <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-slate-100">
                  {leader.email && (
                    <a href={`mailto:${leader.email}`} className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition-colors">
                      <Mail size={12} className="text-slate-400" />
                      {leader.email}
                    </a>
                  )}
                  {leader.phone && (
                    <a href={`tel:${leader.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition-colors">
                      <Phone size={12} className="text-slate-400" />
                      {leader.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
