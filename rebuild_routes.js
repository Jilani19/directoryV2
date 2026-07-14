const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname);
const appDir = path.join(clientDir, 'app', 'directory', '[companySlug]');

// Create rich specific routes

const routes = {
  corporate: `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Target, Flag, Scale } from 'lucide-react';

export default async function CorporatePage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await prisma.company.findFirst({ where: { slug: companySlug } });
  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100">
        <h2 className="text-[24px] font-black text-slate-900 mb-6">About Company</h2>
        <div className="prose prose-sm text-slate-600 max-w-none leading-relaxed mb-8">
          {company.history || company.businessOverview || company.aboutDescription || company.description || "Detailed corporate information is being synchronized."}
        </div>
        
      </div>
      
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100">
        <h3 className="text-[16px] font-black text-slate-900 mb-6 flex items-center gap-2"><Scale size={18}/> Legal & Entity Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-400 uppercase">Legal Name</span><span className="text-[13px] font-bold text-slate-800">{company.legalName || company.name}</span></div>
           <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-400 uppercase">Founded</span><span className="text-[13px] font-bold text-slate-800">{company.foundedYear || '-'}</span></div>
           <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-400 uppercase">Founder</span><span className="text-[13px] font-bold text-slate-800">{company.founder || '-'}</span></div>
           <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-400 uppercase">Ownership</span><span className="text-[13px] font-bold text-slate-800">{company.ownershipType || 'Public'}</span></div>
           <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-400 uppercase">Jurisdiction</span><span className="text-[13px] font-bold text-slate-800">{company.jurisdiction || 'Global'}</span></div>
           <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-400 uppercase">Status</span><span className="text-[13px] font-bold text-emerald-600">Active</span></div>
        </div>
      </div>
    </div>
  );
}`,
  financials: `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CircleDollarSign, TrendingUp, Briefcase } from 'lucide-react';

export default async function FinancialsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await prisma.company.findFirst({ where: { slug: companySlug } });
  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between">
        <h2 className="text-[24px] font-black text-slate-900">Financials & Market Data</h2>
        {company.ticker && <span className="bg-[#2950DA] text-white px-3 py-1 rounded-md text-[13px] font-bold tracking-widest">{company.stockExchange}: {company.ticker}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-3 items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#2950DA] flex items-center justify-center mb-2"><TrendingUp size={24}/></div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Market Cap</span>
            <span className="text-[32px] font-black text-slate-900 leading-none">{company.currency || '$'}{company.marketCap || '-'}</span>
         </div>
         <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-3 items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2"><CircleDollarSign size={24}/></div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Annual Revenue</span>
            <span className="text-[32px] font-black text-slate-900 leading-none">{company.currency || '$'}{company.revenue || '-'}</span>
         </div>
         <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-3 items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2"><Briefcase size={24}/></div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Funding</span>
            <span className="text-[32px] font-black text-slate-900 leading-none">{company.currency || '$'}{company.funding || '-'}</span>
         </div>
      </div>
    </div>
  );
}`,
  facilities: `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Factory, FlaskConical, MapPin } from 'lucide-react';

export default async function FacilitiesPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await prisma.company.findFirst({ 
    where: { slug: companySlug },
    include: { facilities: true }
  });
  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between">
        <h2 className="text-[24px] font-black text-slate-900">Facilities & Infrastructure</h2>
        <span className="bg-[#F4F7FB] text-[#2950DA] px-3 py-1 rounded-full text-[12px] font-bold">{company.facilities.length} Locations</span>
      </div>

      {company.facilities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.facilities.map((f: any) => (
             <div key={f.id} className="bg-white p-6 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col">
               <div className="flex items-center gap-3 mb-4">
                  <div className={\`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 \${f.type?.includes('R&D') ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}\`}>
                    {f.type?.includes('R&D') ? <FlaskConical size={18}/> : <Factory size={18}/>}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{f.name}</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{f.type || 'Facility'}</span>
                  </div>
               </div>
               <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2 text-[12px] font-bold text-slate-600">
                  <MapPin size={14} className="text-slate-400" /> {f.city}, {f.country}
               </div>
             </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-12 text-center text-slate-500 font-semibold border border-slate-100">No facilities synchronized yet.</div>
      )}
    </div>
  );
}`,
  news: `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function NewsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await prisma.company.findFirst({ 
    where: { slug: companySlug },
    include: { news: { orderBy: { createdAt: 'desc' } } }
  });
  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100">
        <h2 className="text-[24px] font-black text-slate-900">Latest News & Press Releases</h2>
      </div>

      {company.news.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {company.news.map((n: any) => (
             <div key={n.id} className="bg-white p-6 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow cursor-pointer">
               <div className="w-full md:w-48 h-32 bg-slate-100 rounded-xl overflow-hidden relative shrink-0">
                 <Image src={n.imageUrl || "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop"} alt="News" fill className="object-cover" />
               </div>
               <div className="flex flex-col justify-center">
                 <span className="text-[10px] font-black text-[#2950DA] uppercase tracking-wider mb-2">{n.source || 'Corporate News'} • {n.date || new Date().toLocaleDateString()}</span>
                 <h4 className="text-[18px] font-bold text-slate-900 leading-tight mb-3">{n.title}</h4>
                 <button className="text-[12px] font-bold text-slate-500 flex items-center gap-1.5 self-start hover:text-[#2950DA]">Read Article →</button>
               </div>
             </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-12 text-center text-slate-500 font-semibold border border-slate-100">No recent news synchronized.</div>
      )}
    </div>
  );
}`,
  careers: `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export default async function CareersPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await prisma.company.findFirst({ 
    where: { slug: companySlug },
    include: { jobs: true }
  });
  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex justify-between items-center">
        <h2 className="text-[24px] font-black text-slate-900">Careers & Open Positions</h2>
        <span className="bg-[#F4F7FB] text-[#2950DA] px-3 py-1 rounded-full text-[12px] font-bold">{company.jobs.length} Openings</span>
      </div>

      {company.jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {company.jobs.map((j: any) => (
             <div key={j.id} className="bg-white p-6 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-indigo-100 transition-colors flex flex-col">
               <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">{j.department || 'General'}</span>
               <h4 className="text-[16px] font-bold text-slate-900 leading-tight mb-4">{j.title}</h4>
               <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-slate-50">
                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500"><MapPin size={14}/> {j.location || 'Global'}</div>
                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500"><Clock size={14}/> {j.type || 'Full-time'}</div>
               </div>
             </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-12 text-center text-slate-500 font-semibold border border-slate-100">No open positions currently published.</div>
      )}
    </div>
  );
}`,
  contacts: `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { MapPin, Phone, Mail, Globe, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';

export default async function ContactsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await prisma.company.findFirst({ where: { slug: companySlug } });
  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100">
        <h2 className="text-[24px] font-black text-slate-900 mb-8">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="flex flex-col gap-6">
              {company.hqAddress && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0"><MapPin size={20} className="text-[#2950DA]" /></div>
                  <div className="pt-1"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Headquarters</p><p className="text-[14px] font-bold text-slate-800 leading-relaxed">{company.hqAddress}</p></div>
                </div>
              )}
              {company.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0"><Phone size={20} className="text-[#2950DA]" /></div>
                  <div className="pt-1"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone</p><p className="text-[14px] font-bold text-slate-800">{company.phone}</p></div>
                </div>
              )}
              {company.email && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0"><Mail size={20} className="text-[#2950DA]" /></div>
                  <div className="pt-1"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</p><p className="text-[14px] font-bold text-slate-800">{company.email}</p></div>
                </div>
              )}
              {company.website && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0"><Globe size={20} className="text-[#2950DA]" /></div>
                  <div className="pt-1"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Website</p><Link href={company.website} target="_blank" className="text-[14px] font-bold text-[#2950DA] hover:underline">{company.website}</Link></div>
                </div>
              )}
           </div>

           <div className="bg-[#F4F7FB] rounded-[20px] p-6 flex flex-col justify-center items-center text-center border border-slate-100">
             <h4 className="text-[14px] font-black text-slate-900 mb-6">Official Social Channels</h4>
             <div className="flex items-center gap-4">
               {company.socialLinkedin && <Link href={company.socialLinkedin} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0077b5] shadow-sm hover:scale-110 transition-transform"><Linkedin size={20}/></Link>}
               {company.socialTwitter && <Link href={company.socialTwitter} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1DA1F2] shadow-sm hover:scale-110 transition-transform"><Twitter size={20}/></Link>}
               {company.socialFacebook && <Link href={company.socialFacebook} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1877F2] shadow-sm hover:scale-110 transition-transform"><Facebook size={20}/></Link>}
               {company.socialYoutube && <Link href={company.socialYoutube} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF0000] shadow-sm hover:scale-110 transition-transform"><Youtube size={20}/></Link>}
             </div>
             {!company.socialLinkedin && !company.socialTwitter && <p className="text-[12px] font-medium text-slate-500 mt-4">No social profiles configured.</p>}
           </div>
        </div>
      </div>
    </div>
  );
}`,
  documents: `import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FileText, Download } from 'lucide-react';

export default async function DocumentsPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await prisma.company.findFirst({ 
    where: { slug: companySlug },
    include: { documents: true }
  });
  if (!company) notFound();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex justify-between items-center">
        <h2 className="text-[24px] font-black text-slate-900">Compliance & Regulatory Documents</h2>
        <span className="bg-[#F4F7FB] text-[#2950DA] px-3 py-1 rounded-full text-[12px] font-bold">{company.documents.length} Files</span>
      </div>

      {company.documents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {company.documents.map((d: any) => (
             <div key={d.id} className="bg-white p-5 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between group hover:border-[#2950DA] transition-colors cursor-pointer">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                   <FileText size={20} className="text-red-500"/>
                 </div>
                 <div>
                   <h4 className="text-[14px] font-bold text-slate-900 leading-tight mb-1">{d.title}</h4>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{d.category || 'Document'} • {d.type || 'PDF'}</span>
                 </div>
               </div>
               <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#2950DA] group-hover:text-white transition-colors">
                 <Download size={16}/>
               </div>
             </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[24px] p-12 text-center text-slate-500 font-semibold border border-slate-100">No documents synchronized.</div>
      )}
    </div>
  );
}`
};

Object.keys(routes).forEach(r => {
  const routePath = path.join(appDir, r);
  if (!fs.existsSync(routePath)) fs.mkdirSync(routePath, { recursive: true });
  fs.writeFileSync(path.join(routePath, 'page.tsx'), routes[r]);
});

console.log('Successfully generated specific rich routes.');
