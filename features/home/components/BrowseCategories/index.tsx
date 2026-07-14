"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Pill, Dna, HeartPulse, Activity, Factory, Package, Microscope, ShieldCheck, ArrowRight, LayoutGrid } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { Button } from "../../../../components/ui/Button";
import { CategoryCard } from "./CategoryCard";

const CATEGORIES = [
  {
    title: "Formulation",
    count: "18 Companies",
    icon: <Pill size={24} strokeWidth={1.5} />,
    colorClass: "text-blue-500",
    href: "/categories/formulation",
  },
  {
    title: "Biologics",
    count: "11 Companies",
    icon: <Dna size={24} strokeWidth={1.5} />,
    colorClass: "text-purple-500",
    href: "/categories/biologics",
  },
  {
    title: "Injectables",
    count: "9 Companies",
    icon: <Activity size={24} strokeWidth={1.5} />,
    colorClass: "text-teal-500",
    href: "/categories/injectables",
  },
  {
    title: "Medical Devices",
    count: "22 Companies",
    icon: <HeartPulse size={24} strokeWidth={1.5} />,
    colorClass: "text-rose-500",
    href: "/categories/medical-devices",
  },
  {
    title: "Nutraceuticals",
    count: "14 Companies",
    icon: <Factory size={24} strokeWidth={1.5} />,
    colorClass: "text-lime-500",
    href: "/categories/nutraceuticals",
  },
  {
    title: "Packaging",
    count: "7 Companies",
    icon: <Package size={24} strokeWidth={1.5} />,
    colorClass: "text-sky-500",
    href: "/categories/packaging",
  },
  {
    title: "More Categories",
    count: "View All",
    icon: <LayoutGrid size={24} strokeWidth={1.5} />,
    colorClass: "text-indigo-500",
    href: "/categories",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export function BrowseCategories() {
  const router = useRouter();
  
  return (
    <Section id="BrowseCategories" className="relative bg-white pt-5 pb-8 lg:pt-8 lg:pb-12 overflow-hidden">
      
      <Container className="relative z-10">
        <motion.div 
          className="flex flex-col w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          
          <motion.div variants={itemVariants} className="flex items-end justify-between border-b border-slate-100 pb-3 mb-5">
            <div className="flex flex-col">
              <h2 className="text-xl lg:text-[22px] font-black text-slate-900 mb-0.5 tracking-tight">
                Explore by Categories
              </h2>
              <p className="text-slate-500 font-medium text-[12px] lg:text-[13px]">
                Browse companies and products by key pharmaceutical categories
              </p>
            </div>
            <button 
              onClick={() => router.push("/categories")}
              className="flex items-center gap-1 text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors group mb-1 focus:outline-none"
            >
              View All Categories
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4 w-full">
            {CATEGORIES.map((category) => (
              <motion.div key={category.title} variants={itemVariants} className="h-full">
                <CategoryCard 
                  title={category.title}
                  count={category.count}
                  icon={category.icon}
                  colorClass={category.colorClass}
                  href={category.href}
                />
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </Container>
    </Section>
  );
}
