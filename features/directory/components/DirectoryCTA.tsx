import React from "react";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export function DirectoryCTA() {
  return (
    <div className="w-full bg-indigo-600 rounded-3xl overflow-hidden shadow-xl mt-8 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-8 bg-[url('/grid-pattern.svg')] bg-cover">
        
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Building2 className="text-white w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">List Your Company Today!</h2>
            <p className="text-indigo-100 font-medium">Increase your visibility and connect with global opportunities.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto">
          <Link 
            href="/register" 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-indigo-700 font-bold rounded-xl hover:bg-slate-50 transition-colors focus:outline-none"
          >
            Get Listed Now <ArrowRight size={18} />
          </Link>
          <Link 
            href="/advertise" 
            className="flex-1 md:flex-none flex items-center justify-center px-6 py-3.5 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors focus:outline-none"
          >
            Learn More
          </Link>
        </div>

      </div>
    </div>
  );
}
