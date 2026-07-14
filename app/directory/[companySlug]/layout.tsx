import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Hero from '@/features/company/components/Hero';
import KPIBar from '@/features/company/components/KPIBar';
import SidebarNavigation from '@/features/company/components/SidebarNavigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, LineChart, FileText, Newspaper, 
  MapPin, Stethoscope, Factory, Users, 
  Briefcase, Package, BarChart3, ChevronRight, CheckCircle2, ArrowRight, Link as LinkIcon
} from 'lucide-react';

async function getCompanyData(slug: string) {
  const company = await prisma.company.findFirst({
    where: { slug },
    include: {
      _count: {
        select: {
          subsidiaries: true,
          products: true,
          clinicalTrials: true,
          patents: true,
          news: true,
          jobs: true,
          documents: true,
          facilities: true,
        }
      }
    }
  });
  return company;
}

export default async function CompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companySlug: string }>;
}) {
  const { companySlug } = await params;
  console.log('DEBUG: companySlug =', companySlug);
  const company = await getCompanyData(companySlug);
  console.log('DEBUG: company data =', company);

  if (!company) {
    console.log('DEBUG: company not found, invoking notFound');
    notFound();
  }

  const kpiCounts = company._count;



  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] w-full font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
           
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
             <Link href="/directory" className="hover:text-[#2950DA] transition-colors flex items-center gap-1">
               <ChevronRight size={14} className="rotate-180"/> Companies
             </Link>
             <ChevronRight size={14} className="text-slate-300"/>
             <span className="text-slate-800 truncate max-w-[150px]">{company.name}</span>
           </div>

           {/* Logo Card */}
           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex items-center justify-center aspect-square relative w-full overflow-hidden">
              {company.logoUrl ? (
                <Image src={company.logoUrl} alt={company.name} fill className="object-contain p-8" />
              ) : (
                <span className="text-6xl font-black text-slate-300">{company.name.charAt(0)}</span>
              )}
           </div>

           {/* Verification Status */}
           <div className="flex flex-col items-center justify-center gap-1">
             <div className="flex items-center gap-1.5 text-[#10B981] font-bold text-sm">
               <CheckCircle2 size={16} className="fill-[#10B981] text-white" /> Verified Company
             </div>
             {company.updatedAt && (
               <p className="text-[10px] text-slate-400 font-medium">Last Synced: {new Date(company.updatedAt).toLocaleDateString()}</p>
             )}
           </div>

           {/* Navigation Menu */}
           <SidebarNavigation companySlug={companySlug} kpiCounts={kpiCounts} company={company} />

           {/* Legal Identifiers Card */}
           <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
             <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 mb-2">Identifiers</h4>
             
             {company.cik ? (
               <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-500 font-medium">SEC CIK</span>
                 <span className="text-slate-800 font-bold">{company.cik}</span>
               </div>
             ) : null}

             {company.lei ? (
               <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-500 font-medium">LEI</span>
                 <span className="text-slate-800 font-bold truncate max-w-[120px]">{company.lei}</span>
               </div>
             ) : null}

             {company.ticker ? (
               <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-500 font-medium">Ticker</span>
                 <span className="text-slate-800 font-bold">{company.ticker}</span>
               </div>
             ) : null}

             {!company.cik && !company.lei && !company.ticker && (
               <p className="text-xs text-slate-400 italic">No verified identifiers available.</p>
             )}
           </div>

        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <Hero company={company} />
          <KPIBar company={company} kpiCounts={kpiCounts} />
          <div className="mt-2">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}