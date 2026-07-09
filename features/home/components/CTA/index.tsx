"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { Button } from "../../../../components/ui/Button";

export function CTA() {
  const router = useRouter();
  return (
    <Section id="CTA" className="bg-slate-50 py-16 lg:py-24">
      <Container>
        <div className="relative w-full rounded-3xl bg-[#0a192f] overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 lg:py-28">
          
          {/* Subtle background gradient / pattern simulation */}
          <div className="absolute inset-0 z-0 opacity-30" 
               style={{ backgroundImage: 'radial-gradient(circle at center, #1e3a8a 0%, transparent 60%)' }}
          ></div>
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/map-dots.svg')] bg-center bg-no-repeat bg-cover mix-blend-overlay"></div>

          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Join the World&apos;s Largest Life Science Network
            </h2>
            <p className="text-slate-300 font-medium text-lg md:text-xl mb-10 max-w-2xl">
              Register your company today to connect with global partners, expand your reach, and accelerate growth.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <Button 
                size="lg" 
                className="rounded-md font-semibold px-10 shadow-lg shadow-primary/30 bg-[#0046E0] hover:bg-[#003bb8] text-base h-14"
                rightIcon={<ArrowRight size={20} strokeWidth={2.5} />}
                onClick={() => router.push("/register")}
              >
                Register Your Business
              </Button>
              
              <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline">
                Already registered? Sign in
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
