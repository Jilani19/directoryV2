"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Building2, User, MapPin, Globe, Briefcase, FileUp, ShieldCheck, KeyRound, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Logo } from "../../components/navigation/Logo";

const STEPS = [
  { id: "company", title: "Company", icon: Building2 },
  { id: "contact", title: "Contact", icon: User },
  { id: "address", title: "Address", icon: MapPin },
  { id: "business", title: "Business", icon: Globe },
  { id: "services", title: "Services", icon: Briefcase },
  { id: "files", title: "Files", icon: FileUp },
  { id: "verification", title: "Verification", icon: ShieldCheck },
  { id: "account", title: "Account", icon: KeyRound },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSuccess(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 3D Flip Variants
  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      z: -300,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      transition: { duration: 0.6, type: "spring", bounce: 0.2 },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
      z: -300,
      transition: { duration: 0.6, type: "spring", bounce: 0.2 },
    }),
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl text-center shadow-[0_0_100px_rgba(59,130,246,0.2)]"
        >
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
            <Check size={48} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Registration Complete</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Your company profile has been submitted for verification. We will review your details and activate your listing within 24 hours.
          </p>
          <Link href="/" className="inline-flex items-center justify-center w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">
            Return to Directory
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B132B] flex flex-col overflow-hidden relative">
      {/* Dark Theme Glows */}
      <div className="fixed inset-0 z-0 hidden dark:block pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-purple-900/30 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/30 blur-[120px]" />
      </div>

      <header className="relative z-10 w-full px-8 py-6 flex justify-between items-center bg-white/50 dark:bg-white/5 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <Logo />
        <Link href="/" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          Cancel Setup
        </Link>
      </header>

      <div className="flex-1 flex w-full max-w-7xl mx-auto relative z-10">
        
        {/* Sidebar Progress */}
        <div className="hidden lg:flex flex-col w-72 p-10 border-r border-slate-200 dark:border-white/10">
          <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8">Onboarding</h2>
          <div className="flex flex-col gap-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-white/10">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <div key={step.id} className="relative flex items-center gap-4 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-110" :
                    isPast ? "bg-emerald-500 text-white" :
                    "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400"
                  }`}>
                    {isPast ? <Check size={18} strokeWidth={3} /> : <step.icon size={18} strokeWidth={isActive ? 2.5 : 2} />}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${
                    isActive ? "text-blue-600 dark:text-white" :
                    isPast ? "text-slate-700 dark:text-slate-300" :
                    "text-slate-400 dark:text-slate-600"
                  }`}>{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{ perspective: "1500px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants as any}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full max-w-2xl bg-white dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transform-style-3d"
            >
              
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {STEPS[currentStep].title}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Please provide accurate information to complete your listing.</p>
              </div>

              <div className="flex flex-col gap-5 mb-10">
                {/* Dynamically render inputs based on step (Simplified for mockup) */}
                {currentStep === 0 && (
                  <>
                    <Input label="Legal Company Name" placeholder="e.g. Pfizer Inc." />
                    <Input label="Company Type" placeholder="e.g. Corporation, LLC" />
                    <Input label="Industry" placeholder="e.g. Pharmaceutical" />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Description</label>
                      <textarea className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none h-32" placeholder="Tell us about your company..." />
                    </div>
                  </>
                )}
                {currentStep === 1 && (
                  <>
                    <Input label="Contact Person" />
                    <Input label="Designation / Title" />
                    <Input label="Business Email" type="email" />
                    <Input label="Phone Number" type="tel" />
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Country" />
                      <Input label="State/Province" />
                    </div>
                    <Input label="City" />
                    <Input label="Address Line 1" />
                    <Input label="ZIP / Postal Code" />
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <Input label="Website URL" type="url" />
                    <Input label="LinkedIn Profile" type="url" />
                    <Input label="Founded Year" type="number" />
                    <Input label="Employee Count" />
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <Input label="Primary Products/Services" />
                    <Input label="Manufacturing Capabilities" />
                    <Input label="Certifications & Compliance Standards" />
                  </>
                )}
                {currentStep === 5 && (
                  <>
                    <FileUpload label="Company Logo" />
                    <FileUpload label="Cover Banner" />
                    <FileUpload label="Company Profile (PDF)" />
                  </>
                )}
                {currentStep === 6 && (
                  <>
                    <Input label="GST / VAT Number" />
                    <Input label="Business Registration Number" />
                    <FileUpload label="Upload Business Certificate" />
                  </>
                )}
                {currentStep === 7 && (
                  <>
                    <Input label="Username" />
                    <Input label="Password" type="password" />
                    <Input label="Confirm Password" type="password" />
                    <div className="flex items-start gap-3 mt-4">
                      <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        I accept the <a href="#" className="text-blue-600 dark:text-blue-400 underline">Terms of Service</a> and <a href="#" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</a>, and verify that the information provided is accurate.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/10">
                <button 
                  onClick={prevStep}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    currentStep === 0 ? "opacity-0 pointer-events-none" : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_25px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-0.5"
                >
                  {currentStep === STEPS.length - 1 ? "Submit Registration" : "Continue"} <ArrowRight size={18} />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", placeholder = "" }: { label: string, type?: string, placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 h-12 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-inner dark:shadow-none"
      />
    </div>
  );
}

function FileUpload({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>
      <div className="w-full border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl h-24 flex flex-col items-center justify-center bg-slate-50 dark:bg-black/10 hover:bg-slate-100 dark:hover:bg-black/20 transition-colors cursor-pointer group">
        <FileUp size={24} className="text-slate-400 group-hover:text-blue-500 mb-2 transition-colors" />
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors">Click to upload or drag & drop</span>
      </div>
    </div>
  );
}
