"use client";

import React, { useState } from 'react';
import { CompanyDetails } from '../../types';
import Image from 'next/image';
import { Link as LinkIcon, Globe2, Briefcase, GraduationCap, Calendar, Users, Target, BookOpen } from 'lucide-react';
import { Pagination } from '../Pagination';
import { useCompanyData } from '../../hooks/useCompanyData';

interface TabProps {
  company: CompanyDetails;
  onTabChange?: (tabId: string) => void;
}

export function LeadershipTab({ company }: TabProps) {
  const { data, isLoading, error } = useCompanyData<{ openCorporates?: any }>(company.id, 'leadership');
  
  // Combine local data with any fetched API directors
  const executives = company.leadership || [];
  const board = data?.openCorporates?.officers || company.boardOfDirectors || [];

  const [execPage, setExecPage] = useState(1);
  const [execPageSize, setExecPageSize] = useState(10);
  
  const [boardPage, setBoardPage] = useState(1);
  const [boardPageSize, setBoardPageSize] = useState(10);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-bold text-slate-800">Loading Leadership Data...</h3>
        <p className="text-slate-500 mt-2">Fetching corporate governance records from OpenCorporates and SEC</p>
      </div>
    );
  }

  if ((error || executives.length === 0) && board.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Users size={28} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Data Unavailable</h3>
        <p className="text-slate-500 max-w-md">No executive leadership or board of director records could be automatically verified for this organization.</p>
      </div>
    );
  }

  const paginatedExecs = executives.slice((execPage - 1) * execPageSize, execPage * execPageSize);
  const paginatedBoard = board.slice((boardPage - 1) * boardPageSize, boardPage * boardPageSize);

  return (
    <div className="flex flex-col gap-12 w-full animate-in fade-in duration-300 pb-12">
      
      {/* Executive Leadership Section */}
      {executives.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <Target className="text-blue-600" /> Executive Leadership
              </h2>
              <p className="text-slate-500 text-sm mt-1">Key management and executive team members.</p>
            </div>
            <div className="px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
              {executives.length} Executives
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {paginatedExecs.map((exec) => (
              <ExecutiveCard key={exec.id} person={exec} />
            ))}
          </div>

          {executives.length > 0 && (
            <Pagination 
              currentPage={execPage}
              totalItems={executives.length}
              pageSize={execPageSize}
              onPageChange={setExecPage}
              onPageSizeChange={(size) => {
                setExecPageSize(size);
                setExecPage(1);
              }}
            />
          )}
        </section>
      )}

      {/* Board of Directors Section */}
      {board.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8 pt-8 border-t border-slate-200/60">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <Users className="text-purple-600" /> Board of Directors
              </h2>
              <p className="text-slate-500 text-sm mt-1">Corporate governance and independent directors.</p>
            </div>
            <div className="px-4 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">
              {board.length} Members
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {paginatedBoard.map((member: any) => (
              <ExecutiveCard key={member.id} person={member} isBoard />
            ))}
          </div>

          {board.length > 0 && (
            <Pagination 
              currentPage={boardPage}
              totalItems={board.length}
              pageSize={boardPageSize}
              onPageChange={setBoardPage}
              onPageSizeChange={(size) => {
                setBoardPageSize(size);
                setBoardPage(1);
              }}
            />
          )}
        </section>
      )}

    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExecutiveCard({ person, isBoard = false }: { person: any, isBoard?: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col hover:shadow-lg hover:border-blue-200 transition-all group h-full">
      
      {/* Header Profile */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 group-hover:border-blue-100 transition-colors">
          <Image 
            src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=f8fafc&color=0f172a`}
            alt={person.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{person.name}</h3>
          <p className="text-sm font-semibold text-slate-600 mt-1 line-clamp-2">{person.role}</p>
          {!isBoard && person.department && (
            <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-sm mt-1.5 tracking-wide">
              {person.department}
            </span>
          )}
        </div>
      </div>

      {/* Meta Details */}
      <div className="flex flex-col gap-2 mt-auto text-xs text-slate-500 font-medium pt-4 border-t border-slate-100">
        {person.appointmentDate && (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-slate-400" /> Appointed: {person.appointmentDate}
          </div>
        )}
        {person.education && (
          <div className="flex items-start gap-2">
            <GraduationCap size={14} className="text-slate-400 shrink-0 mt-0.5" /> 
            <span className="line-clamp-2">{person.education}</span>
          </div>
        )}
        {person.bio && (
          <div className="flex items-start gap-2">
            <BookOpen size={14} className="text-slate-400 shrink-0 mt-0.5" /> 
            <span className="line-clamp-3 italic">&quot;{person.bio}&quot;</span>
          </div>
        )}
        {person.committeeMemberships && person.committeeMemberships.length > 0 && (
          <div className="flex items-start gap-2">
            <Briefcase size={14} className="text-slate-400 shrink-0 mt-0.5" /> 
            <span className="line-clamp-2">{person.committeeMemberships.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 w-full">
        {person.linkedin && (
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0077b5]/10 text-[#0077b5] rounded-lg hover:bg-[#0077b5] hover:text-white transition-colors flex-1 flex justify-center items-center gap-2 text-xs font-bold">
            <LinkIcon size={14} /> LinkedIn
          </a>
        )}
        {person.officialProfile && (
          <a href={person.officialProfile} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex-1 flex justify-center items-center gap-2 text-xs font-bold">
            <Globe2 size={14} /> Profile
          </a>
        )}
      </div>
    </div>
  );
}
