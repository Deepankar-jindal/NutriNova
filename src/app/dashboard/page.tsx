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
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FAF7F2]">
      
      {/* Header */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary-800 bg-primary-50 px-3 py-1 rounded-full border border-primary-200 shadow-sm">
              Live AI Nutrition Matrix
            </span>
            <span className="text-xs text-primary-900/60 font-medium">• {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-black text-primary-950 tracking-tight flex items-center gap-2">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-primary-900/70 mt-1 font-medium">
            Your personalized nutrition plan is active and synchronized for <strong className="text-primary-900 font-bold capitalize">{profile.goal.replace('_', ' ')}</strong>.
          </p>
        </div>

        {/* Right Badges Strip */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Nutrition Streak */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold shadow-luxury-sm">
            <span className="text-base">🔥</span>
            <span>{streakDays} Day Streak</span>
          </div>

          {/* Weekly Budget Meter */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gold-500/25 text-xs text-primary-950 font-medium shadow-luxury-sm">
            <IndianRupee className="w-4 h-4 text-gold-600" />
            <span>Budget: <strong className="font-bold text-primary-950">₹{profile.weeklyBudgetInr}</strong> / wk</span>
          </div>

          {isDemoMode && (
            <button
              onClick={resetToDemo}
              className="p-2.5 rounded-xl bg-white border border-surface-300 text-primary-900/60 hover:text-gold-700 transition shadow-luxury-sm cursor-pointer"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Today's nutrition targets */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-primary-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-700 animate-pulse" />
            Today&apos;s Nutrition Targets
          </h2>
          <span className="text-xs text-primary-900/70 font-semibold bg-white px-3 py-1 rounded-full border border-surface-200 shadow-sm">
            {loggedMealsCount} of {meals.length} meals logged today
          </span>
        </div>

        <CalorieRing />
      </section>

      {/* Quick shortcuts */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Shortcut 1: What-If Sandbox */}
        <Link
          href="/what-if"
          prefetch={true}
          className="p-4 rounded-2xl bg-white border border-gold-500/30 hover:border-gold-500/60 shadow-luxury-sm hover:shadow-luxury-md transition flex items-center justify-between group cursor-pointer active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-100 text-gold-700 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-bold text-primary-950">What-If? Optimizer</h4>
              <p className="text-[11px] text-primary-900/60 font-medium">Simulate budget &amp; goal changes</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gold-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Shortcut 2: Food Scanner */}
        <Link
          href="/food-scanner"
          prefetch={true}
          className="p-4 rounded-2xl bg-white border border-primary-600/30 hover:border-primary-600/60 shadow-luxury-sm hover:shadow-luxury-md transition flex items-center justify-between group cursor-pointer active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary-100 text-primary-800 group-hover:scale-110 transition-transform">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-bold text-primary-950">AI Food Scanner</h4>
              <p className="text-[11px] text-primary-900/60 font-medium">Instant meal vision &amp; macros</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-primary-700 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Shortcut 3: Saarthi Chat */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="p-4 rounded-2xl bg-white border border-gold-500/30 hover:border-gold-500/60 shadow-luxury-sm hover:shadow-luxury-md transition flex items-center justify-between text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-100 text-gold-700 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-bold text-primary-950">Ask Saarthi AI</h4>
              <p className="text-[11px] text-primary-900/60 font-medium">Smart meal suggestions &amp; tips</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gold-600 group-hover:translate-x-1 transition-transform" />
        </button>

      </section>

      {/* Curated meals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-primary-950 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-700" />
              Today&apos;s Curated Meals
            </h2>
            <p className="text-xs text-primary-900/70 mt-0.5 font-medium">
              Click <strong>&ldquo;Swap Meal&rdquo;</strong> to generate adaptive AI substitutions.
            </p>
          </div>

          <Link
            href="/recipes"
            className="text-xs font-bold text-primary-800 hover:text-gold-700 transition flex items-center gap-1"
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
