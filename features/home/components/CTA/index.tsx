"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";

export function CTA() {
  return (
    <Section id="CTA" className="py-16 lg:py-24 bg-white dark:bg-navy-900">
      <Container>
        <motion.div 
          className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 shadow-2xl shadow-indigo-900/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-24 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Join cGxP.Directory
            </h2>
            <p className="text-blue-100/80 text-base md:text-lg mb-10 max-w-2xl font-medium leading-relaxed">
              Become part of the world&apos;s trusted Life Sciences business directory. Register your company, showcase your products and services, and connect with global customers.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-blue-900 font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Register Your Company <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white/20 font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Learn More <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
