"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pill, Dna, HeartPulse, FlaskConical, Microscope, Package, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { Button } from "../../../../components/ui/Button";
import { CategoryCard } from "./CategoryCard";

const CATEGORIES = [
  {
    title: "Pharmaceuticals",
    count: "2,345 Companies",
    icon: <Pill size={28} strokeWidth={2} />,
    colorClass: "bg-blue-100 text-blue-600",
  },
  {
    title: "Biotechnology",
    count: "1,676 Companies",
    icon: <Dna size={28} strokeWidth={2} />,
    colorClass: "bg-purple-100 text-purple-600",
  },
  {
    title: "Medical Devices",
    count: "1,455 Companies",
    icon: <HeartPulse size={28} strokeWidth={2} />,
    colorClass: "bg-rose-100 text-rose-500",
  },
  {
    title: "Diagnostics",
    count: "957 Companies",
    icon: <FlaskConical size={28} strokeWidth={2} />,
    colorClass: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Research Services",
    count: "654 Companies",
    icon: <Microscope size={28} strokeWidth={2} />,
    colorClass: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Packaging",
    count: "543 Companies",
    icon: <Package size={28} strokeWidth={2} />,
    colorClass: "bg-orange-100 text-orange-500",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

export function BrowseCategories() {
  const router = useRouter();
  
  return (
    <Section id="BrowseCategories" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Ultra-premium background layer: subtle grid + ambient glows */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100/40 via-purple-100/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>
      
      <Container className="relative z-10">
        <motion.div 
          className="flex flex-col items-center w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200/60 px-4 py-1.5 text-xs font-bold text-slate-600 tracking-widest uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Industries
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] max-w-3xl">
              Explore Life Sciences by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600">Category</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
              Navigate through thousands of verified companies across specialized industry segments and global verticals.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mb-16">
            {CATEGORIES.map((category) => (
              <motion.div key={category.title} variants={itemVariants} className="h-full">
                <CategoryCard 
                  title={category.title}
                  count={category.count}
                  icon={category.icon}
                  colorClass={category.colorClass}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button 
              size="lg" 
              className="rounded-full font-bold px-10 shadow-xl shadow-primary/25 bg-primary hover:bg-primary-600 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 h-14 text-base"
              rightIcon={<ArrowRight size={20} strokeWidth={2.5} />}
              aria-label="View all categories"
              onClick={() => router.push("/categories")}
            >
              View All Categories
            </Button>
          </motion.div>

        </motion.div>
      </Container>
    </Section>
  );
}
