import React, { useState } from 'react';
import Image from 'next/image';
import { CompanyDetails } from '../../types';
import { ChevronLeft, ChevronRight, ArrowRight, Package } from 'lucide-react';

export function ProductsPreview({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const [startIndex, setStartIndex] = useState(0);
  
  if (!company.productsList || company.productsList.length === 0) {
    return null;
  }

  const items = company.productsList.slice(0, 10);
  const visibleCount = 4;
  
  const handlePrev = () => setStartIndex(Math.max(0, startIndex - 1));
  const handleNext = () => setStartIndex(Math.min(items.length - visibleCount, startIndex + 1));

  return (
    <div className="flex flex-col gap-5 mt-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Latest Approved Products</h3>
        <button 
          onClick={() => onTabChange && onTabChange('products')}
          className="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1.5"
        >
          View All {company.totalProducts || items.length} Products <ArrowRight size={14} />
        </button>
      </div>

      <div className="relative flex items-center gap-4 group/carousel">
        <button 
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute -left-4 w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-0 transition-all z-20 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}>
            {items.map((product, i) => (
              <div key={i} className="min-w-[280px] w-1/4 shrink-0 bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all flex flex-col items-center text-center group cursor-pointer" onClick={() => onTabChange && onTabChange('products')}>
                <div className="w-full h-32 bg-slate-50/50 rounded-xl mb-4 relative flex items-center justify-center border border-slate-100 group-hover:bg-primary/5 transition-colors">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                  ) : (
                    <Package size={32} className="text-slate-300 group-hover:text-primary/40 transition-colors" />
                  )}
                </div>
                
                <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight line-clamp-1">{product.name}</h4>
                <p className="text-xs font-bold text-slate-500 mb-3 line-clamp-1">{product.genericName || product.dosageForm}</p>
                <div className="mt-auto flex gap-2">
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">{product.dosageForm || 'DRUG'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleNext}
          disabled={startIndex >= items.length - visibleCount}
          className="absolute -right-4 w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-0 transition-all z-20 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
