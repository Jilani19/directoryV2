"use client";

import React from 'react';
import { CompanyDetails } from '../../types';
import { ContactInfo } from '../sidebar/ContactInfo';
import { LeadershipTeam } from '../sections/LeadershipTeam';
import { BoardOfDirectors } from '../sections/BoardOfDirectors';
import { OrganizationStructure } from '../sections/OrganizationStructure';
import { QuickContact } from '../sections/QuickContact';

export function ContactsTab({ company }: { company: CompanyDetails }) {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-300 pb-12">
      
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col gap-3">
        <h2 className="text-3xl font-black text-slate-900">Executive Directory & Contacts</h2>
        <p className="text-slate-600 font-medium">Explore {company.name}&apos;s leadership team, board members, organizational structure, and official contact channels.</p>
      </div>

      {company.leadership && company.leadership.length > 0 && (
        <LeadershipTeam leadership={company.leadership} />
      )}

      {company.boardOfDirectors && company.boardOfDirectors.length > 0 && (
        <BoardOfDirectors board={company.boardOfDirectors} />
      )}

      {company.leadership && company.leadership.length > 0 && (
        <OrganizationStructure leadership={company.leadership} />
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1">
          <QuickContact company={company} />
        </div>
        <div className="w-full lg:w-[400px] shrink-0">
          <ContactInfo company={company} />
        </div>
      </div>
      
    </div>
  );
}
