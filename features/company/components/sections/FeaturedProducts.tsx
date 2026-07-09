"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CompanyDetails } from '../../types'

export function FeaturedProducts({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!company.featuredProducts || company.featuredProducts.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">Featured Products</h2>
        <button 
          onClick={() => onTabChange && onTabChange('products')}
          className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
        >
          View All Products <ArrowRight size={16} />
        </button>
      </div>

      <div className="relative group">
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 px-2"
        >
          {company.featuredProducts.map((product, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[280px] bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all snap-start flex flex-col cursor-pointer group/card">
              
              <div className="relative w-full h-40 mb-6 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover/card:scale-105 transition-transform"
                />
              </div>
              
              <h3 className="text-lg font-black text-slate-900 mb-1">{product.name}</h3>
              <p className="text-sm font-semibold text-slate-600 mb-1">{product.genericName}</p>
              <p className="text-sm text-slate-500">{product.dosageForm}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
