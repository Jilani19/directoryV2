"use client";

import React from 'react';
import { ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { CompanyDetails } from '../types';
import { useBookmarks } from '../../directory/hooks/useBookmarks';

export function CompanyHeroActions({ company }: { company: CompanyDetails }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(company.id);

  const handleToggleBookmark = () => {
    toggleBookmark(company.id);
  };

  const websiteUrl = company.contactInfo?.website || company.website;

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
      
      {/* Primary Action: Visit Website */}
      {websiteUrl && (
        <a 
          href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
        >
          Visit Website
          <ExternalLink size={18} />
        </a>
      )}

      {/* Secondary Action: Save Company */}
      <button 
        onClick={handleToggleBookmark}
        title="Bookmark Company"
        className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl transition-all border backdrop-blur-sm shadow-sm hover:-translate-y-0.5 ${
          bookmarked 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-bold hover:bg-amber-500/20' 
            : 'bg-white/5 border-white/10 text-white hover:bg-white/10 font-bold'
        }`}
      >
        {bookmarked ? (
          <>
            <BookmarkCheck size={18} className="fill-amber-400" /> Saved
          </>
        ) : (
          <>
            <Bookmark size={18} /> Save Company
          </>
        )}
      </button>

    </div>
  );
}
