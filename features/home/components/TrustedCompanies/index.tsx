"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Section } from "../../../../components/layout/Section";
import { Container } from "../../../../components/layout/Container";

// Native local asset imports
import pfizerLogo from "@/assets/images/logos/pfizer.png";
import novartisLogo from "@/assets/images/logos/novartis.png";
import rocheLogo from "@/assets/images/logos/roche.png";
import merckLogo from "@/assets/images/logos/merck.png";
import astrazenecaLogo from "@/assets/images/logos/astrazeneca.png";
import sanofiLogo from "@/assets/images/logos/sanofi.png";
import gskLogo from "@/assets/images/logos/gsk.png";
import abbvieLogo from "@/assets/images/logos/abbvie.png";

type CompanyType = { name: string; id: string; src: StaticImageData };

const LOCAL_COMPANIES: CompanyType[] = [
  { name: "Pfizer", id: "pfizer", src: pfizerLogo },
  { name: "Roche", id: "roche", src: rocheLogo },
  { name: "Novartis", id: "novartis", src: novartisLogo },
  { name: "Merck & Co.", id: "merck", src: merckLogo },
  { name: "AstraZeneca", id: "astrazeneca", src: astrazenecaLogo },
  { name: "Sanofi", id: "sanofi", src: sanofiLogo },
  { name: "AbbVie", id: "abbvie", src: abbvieLogo },
  { name: "GSK", id: "gsk", src: gskLogo }
];

export function TrustedCompanies() {
  // Duplicate for seamless infinite scroll
  const marqueeItems = [...LOCAL_COMPANIES, ...LOCAL_COMPANIES, ...LOCAL_COMPANIES];

  return (
    <Section className="bg-[#F8FAFC] py-24 lg:py-32 relative overflow-hidden" id="TrustedCompanies">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e120_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e120_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full mix-blend-multiply opacity-60" />
        <div className="absolute bottom-[-10%] right-[10%] w-[35%] h-[50%] bg-teal-500/10 blur-[120px] rounded-full mix-blend-multiply opacity-60" />
      </div>

      <Container className="relative z-10 flex flex-col items-center max-w-[100vw] overflow-hidden px-0">
        <div className="w-full flex flex-col items-center text-center gap-4 mb-16 px-4">
          <h2 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Trusted by Leading <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Life Science Companies</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
            Explore verified pharmaceutical, biotechnology, medical device, and life sciences organizations from around the world.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full flex overflow-hidden group">
          {/* Left/Right Gradient Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
            {marqueeItems.map((company, index) => (
              <Link 
                key={`${company.id}-${index}`}
                href={`/company/${company.id}`}
                className="group/card relative flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl rounded-[24px] border border-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.15)] hover:border-blue-200 hover:-translate-y-2 transition-all duration-300 mx-3 w-[200px] h-[160px] md:w-[240px] md:h-[180px] px-6 py-6"
                title={company.name}
              >
                {/* Logo Area */}
                <div className="relative w-full h-16 md:h-20 flex items-center justify-center mb-4">
                  <Image
                    src={company.src}
                    alt={`${company.name} logo`}
                    className="object-contain w-auto h-full max-w-[85%] drop-shadow-sm group-hover/card:scale-105 transition-transform duration-500"
                    quality={100}
                    placeholder="empty"
                  />
                </div>
                {/* Company Name */}
                <div className="flex flex-col items-center w-full">
                  <h3 className="font-bold text-slate-900 text-sm truncate w-full text-center">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-emerald-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <ShieldCheck size={12} />
                    <span className="text-[10px] font-bold tracking-wide uppercase">Verified Profile</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 px-4">
          <Link 
            href="/directory" 
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-full border border-slate-200 shadow-sm font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-300"
          >
            View All Companies
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

