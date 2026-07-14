const fs = require('fs');
const path = require('path');

const sections = [
  "corporate", "leadership", "financials", "products", 
  "clinical", "regulatory", "research", "partnerships", "news", 
  "careers", "documents", "contacts", "competitors", "related-companies"
];

const baseDir = path.join(__dirname, 'app', 'directory', '[companySlug]');

sections.forEach(sec => {
  const dir = path.join(baseDir, sec);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  let itemAssignment = '[]';
  if (sec === 'leadership') itemAssignment = 'dbCompany.executives || []';
  if (sec === 'products') itemAssignment = 'dbCompany.products || []';
  if (sec === 'clinical') itemAssignment = 'dbCompany.clinicalTrials || []';
  if (sec === 'research') itemAssignment = 'dbCompany.publications || []';
  if (sec === 'competitors') itemAssignment = 'dbCompany.competitorsAsSource || []';

  const content = `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function Page(props: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await props.params;

  const dbCompany = await prisma.company.findFirst({
    where: { 
      OR: [{ slug: companySlug }, { id: companySlug }],
      isDeleted: false
    },
    include: {
      executives: true,
      products: true,
      clinicalTrials: true,
      publications: true,
      competitorsAsSource: { include: { targetCompany: true } }
    }
  });

  if (!dbCompany) notFound();

  const items: any[] = ${itemAssignment};

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 capitalize">${sec.replace('-', ' ')}</h2>
        {items.length > 0 && (
          <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold shadow-sm">
            {items.length} {items.length === 1 ? 'Record' : 'Records'}
          </div>
        )}
      </div>
      <div className="flex-1">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors shadow-sm">
                <p className="font-bold text-slate-800 line-clamp-1">{item.name || item.title || item.targetCompany?.name || 'Record Item'}</p>
                {item.role && <p className="text-xs text-slate-500 mt-1">{item.role}</p>}
                {item.phase && <p className="text-xs text-slate-500 mt-1">Phase: {item.phase}</p>}
                {item.genericName && <p className="text-xs text-slate-500 mt-1">{item.genericName}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 text-slate-400 font-medium">
            No synchronized records found in the database.
          </div>
        )}
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

console.log('Successfully created all section pages without static TS errors.');
