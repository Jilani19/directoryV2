import React from "react";
import { Container } from "../../../../components/layout/Container";
import { Section } from "../../../../components/layout/Section";
import { HeroContent } from "./HeroContent";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  return (
    <Section size="lg" className="relative overflow-hidden bg-slate-50/30 dark:bg-navy-950 pb-10 lg:pb-16 pt-0">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/5 blur-[100px] dark:bg-blue-900/20" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <HeroContent />
          <HeroIllustration />
        </div>
      </Container>
    </Section>
  );
}
