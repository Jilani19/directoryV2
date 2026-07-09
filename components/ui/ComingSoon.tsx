import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { Button } from "./Button";
import { ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  title: string;
}

export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <Section className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 py-20">
      <Container className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-800">{title}</span>
        </div>
        
        <div className="p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-md w-full">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Coming Soon</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We are working hard to bring you this page. Please check back later.
          </p>
          <Link href="/">
            <Button variant="outline" className="w-full" leftIcon={<ArrowLeft size={16} />}>
              Return to Home
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
