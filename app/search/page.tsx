import React from "react";
import { Search } from "lucide-react";

export const metadata = {
  title: "Search | Verified Global Life Sciences Directory",
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Search Directory</h1>
        
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex items-center max-w-2xl mx-auto mb-12 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="text-slate-400 ml-4" size={20} />
          <input 
            type="text" 
            placeholder="Search companies, products, or categories..." 
            className="flex-1 bg-transparent border-none px-4 py-3 focus:outline-none text-slate-900 font-medium"
            autoFocus
          />
          <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors">
            Search
          </button>
        </div>

        <div className="bg-white rounded-3xl p-12 border border-slate-200 border-dashed text-center">
          <Search size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">Ready to search</h3>
          <p className="text-slate-500 mt-2">Enter a query above to explore our global Life Sciences directory.</p>
        </div>
      </div>
    </div>
  );
}
