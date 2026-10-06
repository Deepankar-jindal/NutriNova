import React from 'react';
import Link from 'next/link';
import { Leaf, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#FAF7F2] border-t border-gold-600/20 pt-16 pb-12 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-700/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-surface-200">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-800 to-gold-600 p-0.5 shadow-luxury-sm">
                <div className="w-full h-full bg-[#FAF7F2] rounded-[10px] flex items-center justify-center relative">
                  <Leaf className="w-4 h-4 text-primary-800" />
                  <Sparkles className="w-3 h-3 text-gold-500 absolute top-1 right-1" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold text-primary-950">
                Nutri<span className="text-gradient-emerald-gold italic">Saarthi</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-primary-900/70 max-w-sm leading-relaxed">
              Your AI companion for smarter, budget-aware nutrition. Combining biometrics, food intelligence, and real-time adaptivity in an elegant bio-adaptive system.
            </p>

            <div className="flex items-center gap-2 text-xs text-primary-900 bg-white border border-gold-600/25 px-3.5 py-2 rounded-xl shadow-luxury-sm w-fit">
              <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
              <span className="font-medium">Your nutrition data belongs to you. End-to-end private.</span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-bold text-primary-950 uppercase tracking-[0.15em] mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
              Core Engine
            </h4>
            <ul className="space-y-2.5 text-xs text-primary-900/75 font-medium">
              <li><Link href="/onboarding" prefetch={true} className="hover:text-gold-700 transition">AI Diet Generator</Link></li>
              <li><Link href="/dashboard" prefetch={true} className="hover:text-gold-700 transition">Personal Dashboard</Link></li>
              <li><Link href="/food-scanner" prefetch={true} className="hover:text-gold-700 transition">AI Food Scanner</Link></li>
              <li><Link href="/what-if" prefetch={true} className="hover:text-gold-700 transition">What-If? Simulator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-primary-950 uppercase tracking-[0.15em] mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-700" />
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-primary-900/75 font-medium">
              <li><Link href="/grocery" prefetch={true} className="hover:text-gold-700 transition">Smart Grocery Optimizer</Link></li>
              <li><Link href="/recipes" prefetch={true} className="hover:text-gold-700 transition">Recipe Discovery</Link></li>
              <li><Link href="/progress" prefetch={true} className="hover:text-gold-700 transition">Progress & Analytics</Link></li>
              <li><span className="text-primary-800/40 cursor-not-allowed">Saarthi Vision API (Beta)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-primary-950 uppercase tracking-[0.15em] mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-primary-900/75 font-medium">
              <li><span className="text-primary-950 font-semibold">Next.js 14 App Router</span></li>
              <li><span className="text-primary-950 font-semibold">Supabase PostgreSQL</span></li>
              <li><span className="text-primary-950 font-semibold">Three.js Bio-Visuals</span></li>
              <li><span className="text-primary-950 font-semibold">Emerald & Gold Palette</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-900/60">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <span className="font-semibold text-primary-950">Medical Disclaimer:</span> NutriSaarthi provides AI-driven nutritional guidance, diet structuring, and macronutrient calculations for informational purposes only. It is not a substitute for clinical diagnosis, personalized physician consultation, or registered medical dietetic therapy.
          </p>
          <div className="flex items-center gap-1.5 text-primary-950 font-semibold whitespace-nowrap bg-white px-3 py-1.5 rounded-full border border-gold-600/20 shadow-luxury-sm">
            <span>Crafted for Health & Longevity</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current ml-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};
