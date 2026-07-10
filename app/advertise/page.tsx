import React from "react";
import { Megaphone, TrendingUp, Target, BarChart } from "lucide-react";

export const metadata = {
  title: "Advertise | Verified Global Life Sciences Directory",
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#0B1120] text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Reach the Global Life Sciences Industry</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Connect with millions of professionals, researchers, and decision-makers across pharmaceutical, biotech, and medical device sectors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <StatCard icon={<TrendingUp size={32} className="text-emerald-500" />} title="2M+" desc="Monthly Active Users" />
          <StatCard icon={<Target size={32} className="text-blue-500" />} title="150+" desc="Countries Reached" />
          <StatCard icon={<BarChart size={32} className="text-purple-500" />} title="85%" desc="Decision Maker Audience" />
        </div>

        <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto">
          <Megaphone size={64} className="mx-auto text-primary mb-6" />
          <h2 className="text-3xl font-black text-slate-900 mb-4">Ready to start your campaign?</h2>
          <p className="text-slate-600 mb-8">Contact our advertising team to explore custom sponsorship opportunities and featured placements.</p>
          <a href="/contact" className="inline-block bg-primary text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20">
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 mx-auto flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-4xl font-black text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 font-bold uppercase tracking-wider">{desc}</p>
    </div>
  );
}
