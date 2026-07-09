import React, { useState } from 'react';
import Image from 'next/image';
import { CompanyDetails } from '../../types';
import { ChevronLeft, ChevronRight, ArrowRight, Package } from 'lucide-react';

export function ProductsPreview({ company, onTabChange }: { company: CompanyDetails, onTabChange?: (tabId: string) => void }) {
  const [startIndex, setStartIndex] = useState(0);
  
  if (!company.productsList || company.productsList.length === 0) {
    return (
      <div className="flex flex-col gap-4 mt-8">
        <h3 className="text-xl font-black text-slate-900">Featured Products</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center text-slate-500">
          <Package size={32} className="mb-3 text-slate-300" />
          <p className="font-bold">No public products found</p>
          <p className="text-sm mt-1">Check the Products tab for complete search.</p>
        </div>
      </div>
    );
  }

  const items = company.productsList.slice(0, 10);
  const visibleCount = 4;
  
  const handlePrev = () => setStartIndex(Math.max(0, startIndex - 1));
  const handleNext = () => setStartIndex(Math.min(items.length - visibleCount, startIndex + 1));

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">Featured Products</h3>
        <button 
          onClick={() => onTabChange && onTabChange('products')}
          className="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-1"
        >
          View All Products <ArrowRight size={14} />
        </button>
      </div>

      <div className="relative flex items-center gap-4">
        <button 
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all z-10"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-4 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${startIndex * (100 / visibleCount)}%)` }}>
            {items.map((product, i) => (
              <div key={i} className="min-w-[280px] w-1/4 shrink-0 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-full h-32 bg-slate-50 rounded-xl mb-4 relative flex items-center justify-center">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-contain p-4" />
                  ) : (
                    <Package size={32} className="text-slate-300" />
                  )}
                </div>
                
                <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{product.name}</h4>
                <p className="text-xs font-bold text-slate-500 mb-2">{product.genericName || product.dosageForm}</p>
                <p className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{product.dosageForm}</p>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={handleNext}
          disabled={startIndex >= items.length - visibleCount}
          className="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
