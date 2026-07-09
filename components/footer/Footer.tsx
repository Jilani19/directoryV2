"use client";
import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Logo } from "../navigation/Logo";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press & Media", href: "/press" },
  { label: "Contact", href: "/contact" },
];

const CATEGORIES = [
  { label: "Pharmaceuticals", href: "/pharma" },
  { label: "Biotechnology", href: "/biotech" },
  { label: "Medical Devices", href: "/devices" },
  { label: "Research Services", href: "/research" },
];

const SUPPORT = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a192f] pt-20 pb-10 text-white border-t border-slate-800">
      <Container>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-6">
              <Logo dark />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
              The world&apos;s largest directory of Life Science Companies and industry professionals. Connecting global innovation.
            </p>
            <div className="flex items-center gap-4">
              {["in", "tw", "fb", "ig", "yt"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-colors text-white uppercase text-xs font-bold">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="flex flex-col gap-4">
              {CATEGORIES.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="flex flex-col gap-4">
              {SUPPORT.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe for updates and insights.</p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <Input 
                id="newsletter-email" 
                name="email" 
                placeholder="Email address" 
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-11" 
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white h-11">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2024 cGxP.Directory. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-white text-xs transition-colors">Terms</Link>
            <Link href="/sitemap" className="text-slate-500 hover:text-white text-xs transition-colors">Sitemap</Link>
          </div>
        </div>

      </Container>
    </footer>
  );
}
