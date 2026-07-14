"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Database, Search, ShieldCheck, Globe, Clock, Lock } from "lucide-react";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";

const FEATURES = [
  {
    title: "Global Network",
    description: "Access thousands of verified life sciences companies worldwide",
    icon: <Globe size={24} strokeWidth={1.5} />,
  },
  {
    title: "Real-time Analytics",
    description: "Track market trends and industry analytics instantly",
    icon: <Search size={24} strokeWidth={1.5} />,
  },
  {
    title: "Secure Messaging",
    description: "Connect directly with partners through our secure platform",
    icon: <Lock size={24} strokeWidth={1.5} />,
  },
  {
    title: "Verified Companies",
    description: "Rigorous background checks for all listed businesses",
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
  },
  {
    title: "Industry Insights",
    description: "Stay updated with the latest news and market reports",
    icon: <Database size={24} strokeWidth={1.5} />,
  },
  {
    title: "Premium Support",
    description: "24/7 dedicated assistance from industry experts",
    icon: <Clock size={24} strokeWidth={1.5} />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export function WhyChooseUs() {
  return (
    <Section id="WhyChooseUs" className="bg-slate-50 py-16 lg:py-24">
      <Container>
        <motion.div 
          className="flex flex-col gap-10 bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col mb-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Why Choose cGxP.Directory?
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Built for pharmaceutical professionals, by industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {FEATURES.map((feature, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex gap-4 group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="text-base font-bold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
