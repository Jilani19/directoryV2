"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export function HeroContent() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 z-10 relative w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center rounded-sm bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-primary tracking-wider uppercase"
      >
        THE WORLD&apos;S LARGEST
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0a192f] leading-[1.1]">
          Discover. Connect. <br />
          <span className="text-primary">Advance Life Sciences.</span>
        </h1>
        <p className="max-w-lg text-[15px] text-slate-500 leading-relaxed font-medium">
          The most comprehensive directory of verified life science companies, products, services and professionals worldwide.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full mt-4"
      >
        <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-xl h-14 rounded-lg bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-1.5 pl-5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, products, services..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
          />
          <button type="submit" className="flex items-center justify-center w-11 h-11 bg-primary hover:bg-primary-600 transition-colors rounded-md text-white shrink-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1">
            <Search size={18} strokeWidth={2.5} />
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-3 w-full mt-2"
      >
        <Button
          size="lg"
          className="rounded-md font-semibold px-6 shadow-sm shadow-primary/20 bg-[#0046E0] hover:bg-[#003bb8]"
          rightIcon={<ArrowRight size={16} strokeWidth={2.5} />}
          onClick={() => router.push("/directory")}
        >
          Browse Companies
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-md font-semibold px-6 text-[#0046E0] border-[#0046E0]/20 bg-white hover:bg-[#0046E0]/5"
          rightIcon={<LayoutGrid size={16} strokeWidth={2.5} />}
          onClick={() => router.push("/categories")}
        >
          Explore Categories
        </Button>
      </motion.div>
    </div>
  );
}
