import React from "react";
import { Company } from "../services/company.service";
import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";

export function TableView({ companies }: { companies: Company[] }) {
  return (
    <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {companies.map(company => (
            <tr key={company.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 p-1 overflow-hidden">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="font-bold text-slate-800 text-xs">{company.name.substring(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <Link href={`/directory/${company.slug}/overview`} className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {company.name}
                    </Link>
                    {company.verified && (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase mt-0.5">
                        <ShieldCheck size={12} /> Verified
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{company.city}, {company.country}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{company.industry}</div>
                <div className="text-xs text-slate-500">{company.category}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                  {(company.rating || 4.7).toFixed(1)} <Star size={14} className="text-amber-400 fill-amber-400" />
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <Link 
                  href={`/directory/${company.slug}/overview`}
                  className="px-4 py-2 text-sm font-bold text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-600 rounded-xl transition-all inline-block"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
