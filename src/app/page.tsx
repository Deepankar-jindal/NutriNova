'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Activity,
  Scan,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Bot,
  Flame,
  Dumbbell,
  HeartPulse,
} from 'lucide-react';
import { NutritionSphere3D } from '../components/3d/NutritionSphere3D';
import { OrbitUniverse } from '../components/3d/OrbitUniverse';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Eagerly prefetch key routes for instant click redirects
    router.prefetch('/dashboard');
    router.prefetch('/food-scanner');
    router.prefetch('/what-if');
    router.prefetch('/onboarding');
    router.prefetch('/recipes');
    router.prefetch('/grocery');
    router.prefetch('/progress');
  }, [router]);

  return (
    <div className="relative overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION (3D BIO-ECOSYSTEM & DYNAMIC FLOATING CARDS)
      ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[90px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-20">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Next-Generation Bio-Adaptive Nutrition</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Eat smarter. <br />
              <span className="text-gradient-emerald">Live better.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              NutriSaarthi uses AI to build nutrition plans that evolve with your goals, food preferences, and real-life weekly budget.
            </p>

            {/* Floating AI Recommendation Callout */}
            <div className="max-w-md mx-auto lg:mx-0 p-3.5 rounded-2xl bg-surface-100/80 border border-emerald-500/30 backdrop-blur-md shadow-glass flex items-start gap-3 text-left">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Saarthi Live Adaptation
                </span>
                <p className="text-xs text-slate-200 mt-0.5">
                  &ldquo;Based on your muscle gain focus, I&apos;ve increased your protein target by <strong className="text-emerald-300">+12%</strong> while preserving your ₹1,800/wk budget.&rdquo;
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/onboarding"
                prefetch={true}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-sm tracking-wide shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Create My Nutrition Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                prefetch={true}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-surface-100/90 hover:bg-slate-800 border border-slate-700/80 text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Explore Live Demo</span>
              </Link>
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Personalized Bio-Math</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-amber-400" />
                <span>Budget-Aware Indian Diets</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Adaptive &ldquo;What-If&rdquo; Engine</span>
              </div>
            </div>

          </div>

          {/* Right Hero 3D Ecosystem & Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* 3D Three.js Molecular Sphere */}
            <NutritionSphere3D />

            {/* Floating Metric Card: Calorie Target */}
            <div className="absolute -top-4 -left-4 sm:left-4 p-3.5 rounded-2xl bg-surface-DEFAULT/90 border border-emerald-500/30 backdrop-blur-xl shadow-glass animate-float hidden sm:flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Daily Fuel</span>
                <span className="text-sm font-black text-white">2,400 kcal</span>
              </div>
            </div>

            {/* Floating Metric Card: Protein Hypertrophy */}
            <div className="absolute -bottom-6 -right-2 sm:right-4 p-3.5 rounded-2xl bg-surface-DEFAULT/90 border border-cyan-500/30 backdrop-blur-xl shadow-glass animate-float-slow hidden sm:flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Protein Synthesis</span>
                <span className="text-sm font-black text-cyan-300">145g / Day</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE NUTRITION ORBIT ("YOUR NUTRITION UNIVERSE")
      ========================================================================= */}
      <section id="nutrition-universe" className="py-14 sm:py-16 relative border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Bio-Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Your Nutrition Universe
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-2">
            Every macro, micronutrient, and calorie node connects in real-time to fuel cellular vitality. Hover or click any node to inspect your bio-targets.
          </p>
        </div>

        <OrbitUniverse />
      </section>

      {/* =========================================================================
          VALUE PILLARS ("BUILT FOR REAL-LIFE NUTRITION")
      ========================================================================= */}
      <section className="py-20 bg-surface-200/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Built for real-life nutrition
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Forget rigid, generic meal templates. NutriSaarthi creates an adaptive health ecosystem tailored to your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Personalized</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Plans dynamically adapt to your exact BMR, activity level, dietary preference, and physical fitness goals.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Affordable</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Budget-aware meal recommendations leveraging high-protein Indian superfoods like Sattu, Soya Chunks, and Moong Dal.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI-Powered</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Intelligent conversational assistance, computer-vision food scanning, and instant reason-based meal substitutions.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Data-Driven</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive analytics tracking weight trends, caloric adherence, hydration grids, and automated AI weekly reviews.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY HACKATHON INNOVATIONS (WHAT-IF & FOOD SCANNER PREVIEWS)
      ========================================================================= */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Feature 1: The "What-If" Dynamic Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>Hackathon Innovation</span>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">
                The &ldquo;What-If?&rdquo; Dynamic Simulator
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                What if your monthly grocery budget changes? Or you switch from fat loss to muscle hypertrophy? Adjust sliders in real-time to watch Saarthi dynamically swap foods, re-calculate macros, and save money without dropping protein.
              </p>
              <Link
                href="/what-if"
                prefetch={true}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition cursor-pointer active:scale-95"
              >
                <span>Launch What-If Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-6 p-6 rounded-3xl bg-surface-100/90 border border-amber-500/30 shadow-glass space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Live Simulation Sandbox</span>
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Instant Recalculation
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Weekly Budget</span>
                  <strong className="text-amber-400">₹1,800 ➔ ₹1,000 / week</strong>
                </div>
                <div className="p-3 rounded-xl bg-surface-200/80 border border-slate-800">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-1">
                    AI Auto-Optimization
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Swapped imported almonds &amp; whey with roasted sattu powder &amp; local peanuts. Maintained <strong>145g protein</strong> while saving <strong>₹800/week</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: AI Food Scanner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 p-6 rounded-3xl bg-surface-100/90 border border-cyan-500/30 shadow-glass space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Scan className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">AI Vision Analysis</span>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  96% Confidence
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80"
                  alt="Paneer Butter Masala"
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">Paneer Butter Masala (250g)</h4>
                  <div className="flex gap-2 text-[11px] text-slate-400 mt-1">
                    <span>420 kcal</span> • <span className="text-cyan-400">18g Protein</span> • <span className="text-amber-400">22g Carbs</span>
                  </div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-200 text-[11px] text-slate-300 border border-slate-800">
                💡 <strong className="text-emerald-400">Healthier Alternative:</strong> Swap to Palak Paneer to save 140 kcal with 20g protein.
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                <Scan className="w-3.5 h-3.5" />
                <span>Food Intelligence</span>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">
                AI Vision Food Scanner
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Upload or snap a photo of any meal. NutriSaarthi computes portion weights, macro breakdowns, health scores (e.g. 72/100), and discovers healthier local alternatives.
              </p>
              <Link
                href="/food-scanner"
                prefetch={true}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition cursor-pointer active:scale-95"
              >
                <span>Try Food Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CINEMATIC FINAL CTA (SECTION 29)
      ========================================================================= */}
      <section className="py-20 relative overflow-hidden border-t border-emerald-500/20">
        
        {/* Glowing backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-200/50 via-emerald-950/20 to-surface-DEFAULT pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/15 blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="w-14 h-14 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-glow-sm">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Your healthier future starts with one meal.
          </h2>

          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Let AI build a nutrition plan designed around your body, your taste, and your real-life budget.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              prefetch={true}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Start My Nutrition Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              prefetch={true}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-surface-100/90 border border-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition cursor-pointer active:scale-95"
            >
              View Arjun Demo Dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
