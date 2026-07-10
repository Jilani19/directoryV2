import React from "react";
import { Building2, Globe2, ShieldCheck, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Verified Global Life Sciences Directory",
  description: "Learn about our mission to organize the world's Life Sciences ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#0B1120] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 blur-[120px] rounded-full w-[80%] h-[150%] -top-[50%] -left-[10%] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">About Our Mission</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We are building the definitive, verified directory of the global Life Sciences ecosystem. Our platform connects professionals, investors, and researchers with the world&apos;s most innovative pharmaceutical and biotech organizations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Building2 className="text-blue-500" size={32} />}
            title="Global Directory"
            description="Access comprehensive profiles of over 20,000 verified Life Sciences companies spanning 150+ countries."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-emerald-500" size={32} />}
            title="Verified Data"
            description="Our identity resolution engine cross-references FDA, EMA, SEC, and GLEIF databases to ensure absolute accuracy."
          />
          <FeatureCard 
            icon={<Globe2 className="text-indigo-500" size={32} />}
            title="Real-time Intelligence"
            description="Track live clinical trials, manufacturing facilities, product approvals, and regulatory certifications."
          />
          <FeatureCard 
            icon={<Users className="text-purple-500" size={32} />}
            title="Executive Networks"
            description="Discover leadership teams, board members, and connect with key decision-makers across the industry."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col gap-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900">{title}</h3>
      <p className="text-slate-600 font-medium leading-relaxed">{description}</p>
    </div>
  );
}
