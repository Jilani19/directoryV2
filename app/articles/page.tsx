import React from "react";
import { Newspaper } from "lucide-react";

export const metadata = {
  title: "Articles & Insights | Verified Global Life Sciences Directory",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Articles & Industry Insights</h1>
        <p className="text-xl text-slate-500 mb-12">Expert analysis on pharma, biotech, regulatory changes, and market trends.</p>
        
        <div className="bg-white rounded-3xl p-12 border border-slate-200 border-dashed text-center">
          <Newspaper size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">New Content Coming Soon</h3>
          <p className="text-slate-500 mt-2">Our editorial team is preparing the latest industry insights.</p>
        </div>
      </div>
    </div>
  );
}
