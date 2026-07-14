"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, Book, MessageCircle, FileText, Users, Mail, Phone, ExternalLink, Activity } from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";

export default function SupportPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-transparent">
      
      {/* 1. Hero & Search */}
      <Section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-indigo-900 dark:bg-transparent dark:border-b dark:border-white/5">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900 to-blue-900 dark:from-transparent dark:to-transparent pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            How can we help you?
          </h1>
          
          <div className="w-full relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for articles, guides, or troubleshooting..." 
              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border-2 border-transparent focus:border-indigo-500 focus:outline-none text-lg text-slate-800 placeholder:text-slate-400 shadow-xl transition-all"
            />
          </div>
          <div className="flex items-center gap-3 mt-6 text-sm text-indigo-200 font-medium">
            <span>Popular:</span>
            <span className="cursor-pointer hover:text-white underline decoration-indigo-400/50 underline-offset-4">Claim Company</span>
            <span className="cursor-pointer hover:text-white underline decoration-indigo-400/50 underline-offset-4">Update Listing</span>
            <span className="cursor-pointer hover:text-white underline decoration-indigo-400/50 underline-offset-4">Billing</span>
          </div>
        </Container>
      </Section>

      {/* 2. Help Categories */}
      <Section className="py-16 -mt-8 relative z-20 bg-transparent">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Getting Started", desc: "Guides for new companies joining the directory.", icon: Book, color: "text-emerald-500" },
              { title: "Account & Billing", desc: "Manage your profile, subscriptions, and invoices.", icon: Users, color: "text-blue-500" },
              { title: "API Documentation", desc: "Integrate with our B2B lead generation API.", icon: FileText, color: "text-purple-500" },
            ].map((cat, i) => (
              <div key={i} className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-xl dark:hover:bg-white/5 transition-all duration-300 cursor-pointer group">
                <div className={`w-10 h-10 rounded-lg bg-slate-50 dark:bg-white/5 ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cat.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{cat.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Contact Support & Status */}
      <Section className="py-16 bg-white dark:bg-transparent border-t border-slate-100 dark:border-white/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Left: Contact Options */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Contact Support</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Our global team is available 24/7 to assist you.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer">
                  <MessageCircle className="text-indigo-600 dark:text-indigo-400 mb-4" size={24} />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Live Chat</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Chat instantly with a support agent.</p>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">Start Chat <ExternalLink size={14}/></span>
                </div>
                
                <div className="p-6 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer">
                  <Mail className="text-indigo-600 dark:text-indigo-400 mb-4" size={24} />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email Support</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Send us a detailed ticket.</p>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">Submit Ticket <ExternalLink size={14}/></span>
                </div>
              </div>
            </div>

            {/* Right: Phone */}
            <div className="flex flex-col gap-6 h-full">
              <div className="p-8 border border-slate-200 dark:border-white/10 rounded-2xl bg-indigo-600 text-white shadow-xl h-full flex flex-col justify-center">
                <Phone className="mb-6 text-indigo-300" size={32} />
                <h3 className="text-xl font-bold mb-2">Enterprise Phone Support</h3>
                <p className="text-indigo-200 mb-6 leading-relaxed flex-1">Available exclusively for our Enterprise advertising partners. Call us directly for immediate assistance.</p>
                <div className="text-2xl font-black tracking-tight">+1 (800) 555-0199</div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

    </div>
  );
}
