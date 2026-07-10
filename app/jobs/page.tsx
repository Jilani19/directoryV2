import React from "react";
import { Briefcase } from "lucide-react";

export const metadata = {
  title: "Jobs | Verified Global Life Sciences Directory",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Life Sciences Job Board</h1>
        <p className="text-xl text-slate-500 mb-12">Discover career opportunities at the world&apos;s most innovative companies.</p>
        
        <div className="bg-white rounded-3xl p-12 border border-slate-200 border-dashed text-center">
          <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">Job Board Launching Soon</h3>
          <p className="text-slate-500 mt-2">We are currently partnering with top organizations to bring you the best opportunities.</p>
        </div>
      </div>
    </div>
  );
}
