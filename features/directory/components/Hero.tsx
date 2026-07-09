import React from "react";
import { Container } from "../../../components/layout/Container";

export function Hero() {
  return (
    <section className="relative w-full bg-[#0a192f] pt-28 pb-32 md:pb-40 overflow-hidden">
      {/* Decorative DNA Background (Abstract) */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
        <svg viewBox="0 0 800 600" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 600,0 C 700,100 700,200 600,300 C 500,400 500,500 600,600" />
            <path d="M 700,0 C 600,100 600,200 700,300 C 800,400 800,500 700,600" />
            <line x1="620" y1="50" x2="680" y2="50" />
            <line x1="650" y1="150" x2="650" y2="150" />
            <line x1="600" y1="250" x2="700" y2="250" />
            <line x1="550" y1="350" x2="750" y2="350" />
            <line x1="520" y1="450" x2="780" y2="450" />
            <line x1="600" y1="550" x2="700" y2="550" />
          </g>
          <g fill="#3b82f6">
            <circle cx="620" cy="50" r="6" />
            <circle cx="680" cy="50" r="6" />
            <circle cx="600" cy="250" r="6" />
            <circle cx="700" cy="250" r="6" />
            <circle cx="550" cy="350" r="6" />
            <circle cx="750" cy="350" r="6" />
            <circle cx="520" cy="450" r="6" />
            <circle cx="780" cy="450" r="6" />
            <circle cx="600" cy="550" r="6" />
            <circle cx="700" cy="550" r="6" />
          </g>
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight">
            Discover <span className="text-primary-400">Life Science</span> Companies
          </h1>
          <p className="text-slate-300 text-base md:text-lg">
            Explore 20,000+ verified life science companies worldwide.
          </p>
        </div>
      </Container>
    </section>
  );
}
