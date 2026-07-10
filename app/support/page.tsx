import React from "react";
import { Mail, MessageSquare, Book, LifeBuoy } from "lucide-react";

export const metadata = {
  title: "Support Center | Verified Global Life Sciences Directory",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#0B1120] text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">How can we help?</h1>
          <div className="max-w-2xl mx-auto bg-white/10 rounded-2xl p-2 border border-white/20 flex backdrop-blur-md">
            <input type="text" placeholder="Search knowledge base..." className="flex-1 bg-transparent border-none text-white px-4 py-2 focus:outline-none placeholder-slate-400" />
            <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold">Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SupportCard icon={<Book size={32} className="text-blue-500" />} title="Documentation" desc="Learn how to use the platform effectively." />
          <SupportCard icon={<MessageSquare size={32} className="text-emerald-500" />} title="FAQs" desc="Answers to commonly asked questions." />
          <SupportCard icon={<LifeBuoy size={32} className="text-purple-500" />} title="API Access" desc="Technical guides for our enterprise APIs." />
          <SupportCard icon={<Mail size={32} className="text-rose-500" />} title="Contact Us" desc="Reach out directly to our support team." />
        </div>
      </div>
    </div>
  );
}

function SupportCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 font-medium">{desc}</p>
    </div>
  );
}
