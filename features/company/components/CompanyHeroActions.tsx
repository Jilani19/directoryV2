/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import { ExternalLink, Mail, Download, Share2, X, CheckCircle2, Bookmark, BookmarkCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CompanyDetails } from '../types';
import { useBookmarks } from '../../directory/hooks/useBookmarks';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function CompanyHeroActions({ company }: { company: CompanyDetails }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isContactSuccess, setIsContactSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(company.id);

  useEffect(() => {
    // Load persisted state
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleToggleBookmark = () => {
    toggleBookmark(company.id);
  };

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmitContact = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsContactSuccess(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setIsContactSuccess(false);
      reset();
    }, 2500);
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('company-profile-content') || document.body;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${company.name.replace(/\s+/g, '-').toLowerCase()}-profile.pdf`);
    } catch (error) {
      console.error("PDF generation failed", error);
      alert("Failed to generate PDF profile. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${company.name} - Company Profile`,
          text: company.aboutDescription || `Check out ${company.name} on the Global Life Sciences Directory`,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      setIsShareOpen(!isShareOpen);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
    setIsShareOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full lg:w-64 shrink-0">
      
      {/* Primary Actions Row */}
      <div className="flex items-center gap-2">
        <button 
          onClick={handleToggleBookmark}
          title="Bookmark Company"
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors border shadow-sm ${bookmarked ? 'bg-amber-50 border-amber-200 text-amber-500 font-bold' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 font-bold'}`}
        >
          {bookmarked ? (
            <>
              <BookmarkCheck size={18} className="fill-amber-500" /> Saved
            </>
          ) : (
            <>
              <Bookmark size={18} /> Save Company
            </>
          )}
        </button>
      </div>

      <a href={`https://${company.contactInfo?.website || company.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20">
        <ExternalLink size={18} />
        Visit Website
      </a>
      
      <button onClick={() => setIsContactOpen(true)} className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm border border-slate-200">
        <Mail size={18} />
        Contact Company
      </button>
      
      <button onClick={handleDownloadPdf} disabled={isDownloading} className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm border border-slate-200 disabled:opacity-70">
        <Download size={18} />
        {isDownloading ? "Generating PDF..." : "Download Profile"}
      </button>
      
      <div className="relative">
        <button onClick={handleShare} className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-800 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm border border-slate-200">
          <Share2 size={18} />
          Share Company
        </button>
        
        {/* Fallback Share Dropdown */}
        {isShareOpen && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 flex flex-col gap-1">
            <button onClick={copyLink} className="w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg">Copy Link</button>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-full text-left px-3 py-2 text-sm font-bold text-[#0A66C2] hover:bg-slate-50 rounded-lg">Share on LinkedIn</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out ${company.name}`} target="_blank" rel="noopener noreferrer" className="w-full text-left px-3 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50 rounded-lg">Share on X</a>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsContactOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10">
              <X size={18} />
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Contact {company.name}</h2>
              <p className="text-sm text-slate-500 mb-6 font-medium">Send a direct message to their official representative.</p>
              
              {isContactSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-slate-600">They will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitContact)} className="flex flex-col gap-4 animate-in fade-in duration-300">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input 
                      {...register("name")} 
                      className={`px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-4`}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-xs font-bold text-red-500">{errors.name.message}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-700">Work Email</label>
                    <input 
                      {...register("email")} 
                      type="email"
                      className={`px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-4`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <span className="text-xs font-bold text-red-500">{errors.email.message}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-700">Message</label>
                    <textarea 
                      {...register("message")} 
                      rows={4}
                      className={`px-4 py-2.5 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-4 resize-none`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <span className="text-xs font-bold text-red-500">{errors.message.message}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-2 w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
