"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { Container } from "../../../components/layout/Container";
import Link from "next/link";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  // Simple formatting for the slug
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-transparent pt-32 pb-24">
      <Container>
        
        <button 
          onClick={() => router.push("/categories")}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Categories
        </button>

        <div className="bg-indigo-900 rounded-3xl p-10 lg:p-16 text-center text-white mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-blue-900 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              Category Directory
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{title}</h1>
            <p className="text-lg text-indigo-200 font-medium max-w-2xl">
              Browse top-rated companies, manufacturers, and service providers specializing in {title.toLowerCase()}.
            </p>
          </div>
        </div>

        {/* Directory Layout Placeholder */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Filter size={18} /> Sub-categories
              </h2>
              <div className="flex flex-col gap-3">
                <div className="h-4 w-3/4 bg-slate-100 dark:bg-white/10 rounded" />
                <div className="h-4 w-1/2 bg-slate-100 dark:bg-white/10 rounded" />
                <div className="h-4 w-2/3 bg-slate-100 dark:bg-white/10 rounded" />
                <div className="h-4 w-3/4 bg-slate-100 dark:bg-white/10 rounded" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center justify-between bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3">
              <div className="relative w-full max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={`Search in ${title}...`}
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl border-dashed">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Category Data Loading</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                Companies tagged with {title} will populate here from the database.
              </p>
              <Link href="/directory" className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold">
                View Full Directory
              </Link>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}
