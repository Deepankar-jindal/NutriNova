import React from 'react';
import Link from 'next/link';
import { Leaf, Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-surface-200/90 border-t border-emerald-500/20 pt-16 pb-12 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-glow-sm">
                <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center relative">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <Sparkles className="w-3 h-3 text-cyan-300 absolute top-1 right-1" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                Nutri<span className="text-emerald-400">Saarthi</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your AI companion for smarter, budget-aware nutrition. Combining biometrics, food intelligence, and real-time adaptivity.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Your nutrition data belongs to you. End-to-end private.</span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Core Engine</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/onboarding" prefetch={true} className="hover:text-emerald-400 transition">AI Diet Generator</Link></li>
              <li><Link href="/dashboard" prefetch={true} className="hover:text-emerald-400 transition">Personal Dashboard</Link></li>
              <li><Link href="/food-scanner" prefetch={true} className="hover:text-emerald-400 transition">AI Food Scanner</Link></li>
              <li><Link href="/what-if" prefetch={true} className="hover:text-emerald-400 transition">What-If? Simulator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/grocery" prefetch={true} className="hover:text-emerald-400 transition">Smart Grocery Optimizer</Link></li>
              <li><Link href="/recipes" prefetch={true} className="hover:text-emerald-400 transition">Recipe Discovery</Link></li>
              <li><Link href="/progress" prefetch={true} className="hover:text-emerald-400 transition">Progress & Analytics</Link></li>
              <li><span className="text-slate-500 cursor-not-allowed">Saarthi Vision API (Beta)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><span className="text-slate-300">Next.js 14 App Router</span></li>
              <li><span className="text-slate-300">Supabase PostgreSQL</span></li>
              <li><span className="text-slate-300">Three.js Bio-Visuals</span></li>
              <li><span className="text-slate-300">Tailwind CSS Glass</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <span className="font-semibold text-slate-400">Medical Disclaimer:</span> NutriSaarthi provides AI-driven nutritional guidance, diet structuring, and macronutrient calculations for informational purposes only. It is not a substitute for clinical diagnosis, personalized physician consultation, or registered medical dietetic therapy.
          </p>
          <div className="flex items-center gap-1 text-slate-400 whitespace-nowrap">
            <span>Crafted for Health & Longevity</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
