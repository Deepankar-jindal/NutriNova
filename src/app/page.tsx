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
    <div className="relative overflow-hidden bg-[#FAF7F2]">
      
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Warm Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-gold-300/20 via-primary-200/15 to-transparent blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-primary-100/30 blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-20">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-gold-500/30 text-primary-900 text-xs font-bold backdrop-blur-md shadow-luxury-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>Next-Generation Bio-Adaptive Nutrition</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-primary-950 tracking-tight leading-[1.12]">
              Eat smarter. <br />
              <span className="text-gradient-emerald-gold italic font-bold">Live better.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-primary-900/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              NutriSaarthi fuses biometrics and artificial intelligence to design nutrition plans that seamlessly evolve with your physique goals, dietary habits, and real-life weekly budget.
            </p>

            {/* Floating AI Recommendation Callout */}
            <div className="max-w-md mx-auto lg:mx-0 p-4 rounded-2xl bg-white/95 border border-gold-500/30 backdrop-blur-md shadow-luxury-md flex items-start gap-3.5 text-left">
              <div className="p-2.5 rounded-xl bg-gold-50 border border-gold-300 text-gold-700 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gold-800 uppercase tracking-wider block">
                  Saarthi Live Adaptation
                </span>
                <p className="text-xs text-primary-950 mt-0.5 leading-relaxed font-medium">
                  &ldquo;Based on your muscle gain focus, I&apos;ve increased your protein target by <strong className="text-primary-800 font-extrabold">+12%</strong> while preserving your ₹1,800/wk budget.&rdquo;
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/onboarding"
                prefetch={true}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 hover:from-primary-800 hover:to-primary-700 text-gold-200 border border-gold-500/40 font-bold text-sm tracking-wide shadow-luxury-md hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Create My Nutrition Plan</span>
                <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                prefetch={true}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-surface-100 border border-gold-600/30 text-primary-950 font-bold text-sm shadow-luxury-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Activity className="w-4 h-4 text-primary-700" />
                <span>Explore Live Demo</span>
              </Link>
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-xs text-primary-900/70 border-t border-surface-200 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-700" />
                <span>Personalized Bio-Math</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-gold-600" />
                <span>Budget-Aware Indian Diets</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-800" />
                <span>Adaptive &ldquo;What-If&rdquo; Engine</span>
              </div>
            </div>

          </div>

          {/* Right Hero 3D Ecosystem & Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* 3D Three.js Molecular Sphere */}
            <NutritionSphere3D />

            {/* Floating Metric Card: Calorie Target */}
            <div className="absolute -top-4 -left-4 sm:left-4 p-3.5 rounded-2xl bg-white/95 border border-gold-500/30 backdrop-blur-xl shadow-luxury-md animate-float hidden sm:flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gold-50 text-gold-700 border border-gold-200">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-primary-900/60 uppercase font-bold block">Daily Fuel</span>
                <span className="font-serif text-sm font-bold text-primary-950">2,400 kcal</span>
              </div>
            </div>

            {/* Floating Metric Card: Protein Hypertrophy */}
            <div className="absolute -bottom-6 -right-2 sm:right-4 p-3.5 rounded-2xl bg-white/95 border border-primary-600/30 backdrop-blur-xl shadow-luxury-md animate-float-slow hidden sm:flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary-50 text-primary-800 border border-primary-200">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-primary-900/60 uppercase font-bold block">Protein Synthesis</span>
                <span className="font-serif text-sm font-bold text-primary-900">145g / Day</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Nutrition Universe */}
      <section id="nutrition-universe" className="py-16 sm:py-20 relative border-t border-surface-200 bg-gradient-to-b from-[#FAF7F2] via-surface-100/60 to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-500/30 text-gold-800 text-xs font-bold mb-3 shadow-luxury-sm">
            <Activity className="w-3.5 h-3.5 text-gold-600" />
            <span>Interactive Bio-Matrix</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary-950 tracking-tight">
            Your Nutrition Universe
          </h2>
          <p className="text-sm sm:text-base text-primary-900/70 max-w-2xl mx-auto mt-2 leading-relaxed">
            Every macro, micronutrient, and calorie node connects in real-time to fuel cellular vitality. Hover or click any node to inspect your personalized targets.
          </p>
        </div>

        <OrbitUniverse />
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary-950 tracking-tight">
              Built for real-life nutrition
            </h2>
            <p className="text-sm text-primary-900/70 mt-2 leading-relaxed">
              Forget rigid, generic meal templates. NutriSaarthi creates an adaptive health ecosystem tailored to your lifestyle and palate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-primary-900/10 hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-luxury-sm hover:shadow-luxury-md">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-800 mb-4 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-primary-950 mb-2">Personalized</h3>
              <p className="text-xs text-primary-900/70 leading-relaxed font-medium">
                Plans dynamically adapt to your exact BMR, activity level, dietary preference, and physical fitness goals.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-primary-900/10 hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-luxury-sm hover:shadow-luxury-md">
              <div className="w-12 h-12 rounded-2xl bg-gold-100 border border-gold-200 flex items-center justify-center text-gold-700 mb-4 group-hover:scale-110 transition-transform">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-primary-950 mb-2">Affordable</h3>
              <p className="text-xs text-primary-900/70 leading-relaxed font-medium">
                Budget-aware meal recommendations leveraging high-protein Indian superfoods like Sattu, Soya Chunks, and Moong Dal.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-primary-900/10 hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-luxury-sm hover:shadow-luxury-md">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-800 mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-primary-950 mb-2">AI-Powered</h3>
              <p className="text-xs text-primary-900/70 leading-relaxed font-medium">
                Intelligent conversational assistance, computer-vision food scanning, and instant reason-based meal substitutions.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl bg-surface-100/70 border border-primary-900/10 hover:border-gold-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-luxury-sm hover:shadow-luxury-md">
              <div className="w-12 h-12 rounded-2xl bg-gold-100 border border-gold-200 flex items-center justify-center text-gold-700 mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-primary-950 mb-2">Data-Driven</h3>
              <p className="text-xs text-primary-900/70 leading-relaxed font-medium">
                Comprehensive analytics tracking weight trends, caloric adherence, hydration grids, and automated AI weekly reviews.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-20 border-t border-surface-200 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Feature 1: The "What-If" Dynamic Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold">
                <Sliders className="w-3.5 h-3.5 text-gold-700" />
                <span>Hackathon Innovation</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-primary-950 tracking-tight">
                The &ldquo;What-If?&rdquo; Dynamic Simulator
              </h3>
              <p className="text-sm text-primary-900/80 leading-relaxed">
                What if your monthly grocery budget changes? Or you switch from fat loss to muscle hypertrophy? Adjust sliders in real-time to watch Saarthi dynamically swap foods, re-calculate macros, and save money without dropping protein.
              </p>
              <Link
                href="/what-if"
                prefetch={true}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary-800 hover:text-gold-700 transition cursor-pointer active:scale-95"
              >
                <span>Launch What-If Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-gold-500/30 shadow-luxury-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-200">
                <span className="text-xs font-bold text-primary-950">Live Simulation Sandbox</span>
                <span className="text-[10px] uppercase font-bold text-gold-800 bg-gold-100 px-2 py-0.5 rounded border border-gold-300">
                  Instant Recalculation
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-primary-900 font-medium">
                  <span>Weekly Budget</span>
                  <strong className="text-gold-800">₹1,800 ➔ ₹1,000 / week</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-100 border border-surface-300">
                  <span className="text-[10px] text-primary-800 font-bold uppercase block mb-1">
                    AI Auto-Optimization
                  </span>
                  <p className="text-[11px] text-primary-950 font-medium leading-relaxed">
                    Swapped imported almonds &amp; whey with roasted sattu powder &amp; local peanuts. Maintained <strong>145g protein</strong> while saving <strong>₹800/week</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: AI Food Scanner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 p-6 rounded-3xl bg-white border border-primary-600/25 shadow-luxury-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-200">
                <div className="flex items-center gap-2">
                  <Scan className="w-4 h-4 text-primary-800" />
                  <span className="text-xs font-bold text-primary-950">AI Vision Analysis</span>
                </div>
                <span className="text-[10px] font-bold text-primary-800 bg-primary-100 px-2.5 py-0.5 rounded-full border border-primary-200">
                  96% Confidence
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80"
                  alt="Paneer Butter Masala"
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary-950">Paneer Butter Masala (250g)</h4>
                  <div className="flex gap-2 text-[11px] text-primary-900/70 mt-1 font-medium">
                    <span>420 kcal</span> • <span className="text-primary-800 font-bold">18g Protein</span> • <span className="text-gold-700 font-bold">22g Carbs</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-surface-100 text-[11px] text-primary-950 font-medium border border-surface-200">
                💡 <strong className="text-primary-800">Healthier Alternative:</strong> Swap to Palak Paneer to save 140 kcal with 20g protein.
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-800 text-xs font-bold">
                <Scan className="w-3.5 h-3.5" />
                <span>Food Intelligence</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-primary-950 tracking-tight">
                AI Vision Food Scanner
              </h3>
              <p className="text-sm text-primary-900/80 leading-relaxed">
                Upload or snap a photo of any meal. NutriSaarthi computes portion weights, macro breakdowns, health scores (e.g. 72/100), and discovers healthier local alternatives.
              </p>
              <Link
                href="/food-scanner"
                prefetch={true}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary-800 hover:text-gold-700 transition cursor-pointer active:scale-95"
              >
                <span>Try Food Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden border-t border-gold-600/25 bg-gradient-to-b from-[#FAF7F2] to-surface-100">
        
        {/* Glowing backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-400/15 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="w-14 h-14 rounded-3xl bg-gold-50 border border-gold-400/40 flex items-center justify-center mx-auto text-gold-700 shadow-luxury-md">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-primary-950 tracking-tight leading-tight">
            Your healthier future starts with one meal.
          </h2>

          <p className="text-base text-primary-900/80 max-w-xl mx-auto leading-relaxed font-medium">
            Let AI build a nutrition plan designed around your body, your taste, and your real-life budget.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              prefetch={true}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 hover:from-primary-800 hover:to-primary-700 text-gold-200 border border-gold-500/40 font-bold text-sm shadow-luxury-md hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Start My Nutrition Journey</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </Link>

            <Link
              href="/dashboard"
              prefetch={true}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white border border-gold-600/30 text-primary-950 font-bold text-sm hover:bg-surface-100 transition cursor-pointer active:scale-95 shadow-luxury-sm"
            >
              View Arjun Demo Dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
