'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  IndianRupee,
  Scan,
  Sliders,
  Calendar,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';
import { CalorieRing } from '../../components/dashboard/CalorieRing';
import { MealCard } from '../../components/dashboard/MealCard';

export default function DashboardPage() {
  const { user, profile, meals, streakDays, isDemoMode, resetToDemo, setIsChatOpen } = useNutrition();

  const loggedMealsCount = meals.filter(m => m.isLogged).length;

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* =========================================================================
          DASHBOARD HEADER (GREETING & QUICK STATUS)
      ========================================================================= */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Live AI Nutrition Matrix
            </span>
            <span className="text-xs text-slate-400">• {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your personalized nutrition plan is active and synchronized for <strong className="text-emerald-300">{profile.goal.replace('_', ' ')}</strong>.
          </p>
        </div>

        {/* Right Badges Strip */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Nutrition Streak */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-sm">
            <span className="text-base">🔥</span>
            <span>{streakDays} Day Streak</span>
          </div>

          {/* Weekly Budget Meter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface-100 border border-slate-800 text-xs text-slate-300">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span>Budget: <strong>₹{profile.weeklyBudgetInr}</strong> / wk</span>
          </div>

          {isDemoMode && (
            <button
              onClick={resetToDemo}
              className="p-2 rounded-xl bg-surface-100 border border-slate-800 text-slate-400 hover:text-emerald-400 transition"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          TODAY'S NUTRITION (CALORIE RING & MACRONUTRIENT GAUGES)
      ========================================================================= */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Today&apos;s Nutrition Targets
          </h2>
          <span className="text-xs text-slate-400">
            {loggedMealsCount} of {meals.length} meals logged today
          </span>
        </div>

        <CalorieRing />
      </section>

      {/* =========================================================================
          QUICK ACTION SHORTCUTS (WHAT-IF, SCANNER, AI CHAT)
      ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Shortcut 1: What-If Sandbox */}
        <Link
          href="/what-if"
          prefetch={true}
          className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-surface-100 border border-amber-500/30 hover:border-amber-500/60 shadow-glass transition flex items-center justify-between group cursor-pointer active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">What-If? Optimizer</h4>
              <p className="text-[11px] text-slate-400">Simulate budget &amp; goal changes</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Shortcut 2: Food Scanner */}
        <Link
          href="/food-scanner"
          prefetch={true}
          className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-surface-100 border border-cyan-500/30 hover:border-cyan-500/60 shadow-glass transition flex items-center justify-between group cursor-pointer active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">AI Food Scanner</h4>
              <p className="text-[11px] text-slate-400">Instant meal vision &amp; macros</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Shortcut 3: Saarthi Chat */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-surface-100 border border-emerald-500/30 hover:border-emerald-500/60 shadow-glass transition flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Ask Saarthi AI</h4>
              <p className="text-[11px] text-slate-400">Smart meal suggestions &amp; tips</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>

      </section>

      {/* =========================================================================
          TODAY'S MEAL TIMELINE (CARDS WITH SWAP & RECIPE)
      ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              Today&apos;s Curated Meals
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click <strong>&ldquo;Swap Meal&rdquo;</strong> to generate adaptive AI substitutions.
            </p>
          </div>

          <Link
            href="/recipes"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
          >
            <span>Explore Recipe Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Meal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </section>

    </div>
  );
}
