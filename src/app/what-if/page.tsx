'use client';

import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Sparkles,
  Flame,
  Dumbbell,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';
import { AIService, WhatIfResult } from '../../lib/ai-service';
import { GoalType, DietaryPreference } from '../../types/nutrition';

export default function WhatIfPage() {
  const { profile, updateProfileFromOnboarding, user } = useNutrition();

  // Sandbox simulation variables
  const [simulatedBudget, setSimulatedBudget] = useState<number>(profile.weeklyBudgetInr || 1800);
  const [simulatedGoal, setSimulatedGoal] = useState<GoalType>(profile.goal || 'muscle_gain');
  const [simulatedDiet, setSimulatedDiet] = useState<DietaryPreference>(profile.dietaryPreference || 'vegetarian');
  const [isApplied, setIsApplied] = useState<boolean>(false);

  // Compute dynamic simulation result in real-time
  const simulation: WhatIfResult = useMemo(() => {
    return AIService.simulateWhatIf(profile, simulatedBudget, simulatedGoal, simulatedDiet);
  }, [profile, simulatedBudget, simulatedGoal, simulatedDiet]);

  const handleApplyToActivePlan = () => {
    updateProfileFromOnboarding({
      name: user.name,
      age: user.age,
      gender: user.gender,
      heightCm: user.heightCm,
      weightKg: user.weightKg,
      goal: simulatedGoal,
      activityLevel: profile.activityLevel,
      dietaryPreference: simulatedDiet,
      cuisinePreferences: profile.cuisinePreferences,
      allergies: profile.allergies,
      weeklyBudgetInr: simulatedBudget,
    });
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 3000);
  };

  const handleResetSandbox = () => {
    setSimulatedBudget(profile.weeklyBudgetInr);
    setSimulatedGoal(profile.goal);
    setSimulatedDiet(profile.dietaryPreference);
    setIsApplied(false);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FAF7F2]">
      
      {/* Header */}
      <div className="pt-4 border-b border-surface-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold mb-2 shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-gold-700" />
            <span>Hackathon Dynamic Simulation Sandbox</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-black text-primary-950 tracking-tight flex items-center gap-2">
            &ldquo;What If?&rdquo; Nutrition &amp; Budget Engine
          </h1>
          <p className="text-xs sm:text-sm text-primary-900/70 mt-1 font-medium">
            Change budget, goals, or diet type to witness instant AI bio-macro recalculation and ingredient substitution.
          </p>
        </div>

        <button
          onClick={handleResetSandbox}
          className="px-4 py-2 rounded-xl bg-white border border-surface-300 text-primary-950 hover:bg-surface-100 text-xs font-bold flex items-center gap-2 transition w-fit shadow-luxury-sm cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-gold-600" />
          <span>Reset Variables</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Simulation Sliders & Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white border border-gold-500/30 backdrop-blur-xl shadow-luxury-md space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-surface-200">
              <span className="text-xs font-bold text-primary-950 uppercase tracking-wider">
                1. Adjust Weekly Budget
              </span>
              <span className="font-serif text-xl font-black text-gold-800">
                ₹{simulatedBudget} <span className="font-sans text-xs text-primary-900/60 font-medium">/ week</span>
              </span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="800"
                max="3200"
                step="100"
                value={simulatedBudget}
                onChange={(e) => setSimulatedBudget(Number(e.target.value))}
                className="w-full accent-gold-600 h-2.5 bg-surface-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-primary-900/60 font-semibold">
                <span>₹800 (Super Budget)</span>
                <span>₹1,800 (Balanced)</span>
                <span>₹3,200 (Gourmet)</span>
              </div>
            </div>

            {/* Quick Budget Preset Pills */}
            <div className="flex gap-2 pt-1">
              {[1000, 1500, 1800, 2400].map((b) => (
                <button
                  key={b}
                  onClick={() => setSimulatedBudget(b)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    simulatedBudget === b
                      ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-200 shadow-luxury-sm border border-gold-500/30'
                      : 'bg-surface-100 text-primary-900/70 hover:text-primary-950 border border-surface-300'
                  }`}
                >
                  ₹{b}
                </button>
              ))}
            </div>

            {/* Goal Switcher */}
            <div className="space-y-3 pt-4 border-t border-surface-200">
              <span className="text-xs font-bold text-primary-950 uppercase tracking-wider block">
                2. Switch Fitness Objective
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'muscle_gain', label: '💪 Muscle Gain', cal: 'Surplus (+12%)' },
                  { id: 'weight_loss', label: '🔥 Weight Loss', cal: 'Deficit (-20%)' },
                  { id: 'better_energy', label: '⚡ All-Day Energy', cal: 'Balanced' },
                  { id: 'general_wellness', label: '🌿 Holistic Health', cal: 'Equilibrium' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSimulatedGoal(g.id as GoalType)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                      simulatedGoal === g.id
                        ? 'bg-primary-50 border-primary-600 shadow-sm'
                        : 'bg-surface-100 text-primary-900/70 border-surface-300 hover:border-gold-500/30'
                    }`}
                  >
                    <span className="font-serif text-xs font-bold text-primary-950 block">{g.label}</span>
                    <span className="text-[10px] text-primary-800 mt-0.5 block font-medium">{g.cal}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference Switcher */}
            <div className="space-y-3 pt-4 border-t border-surface-200">
              <span className="text-xs font-bold text-primary-950 uppercase tracking-wider block">
                3. Switch Dietary Profile
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'vegetarian', label: '🌱 Vegetarian' },
                  { id: 'vegan', label: '🌿 Pure Vegan' },
                  { id: 'eggetarian', label: '🍳 Eggetarian' },
                  { id: 'non_vegetarian', label: '🍗 Non-Veg' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSimulatedDiet(d.id as DietaryPreference)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      simulatedDiet === d.id
                        ? 'bg-gold-100 text-gold-900 border-gold-400 shadow-sm'
                        : 'bg-surface-100 text-primary-900/70 border-surface-300'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Dynamic AI Recalculation Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-gold-600/30 backdrop-blur-xl shadow-luxury-md space-y-6">
            
            {/* Top Delta Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-700 tracking-wider">
                  Live AI Simulation Output
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-primary-950 mt-0.5">
                  &ldquo;Here&apos;s how I optimized your plan.&rdquo;
                </h3>
              </div>

              {/* Cost Savings Pill */}
              <div className={`p-3.5 rounded-2xl border text-center shrink-0 ${
                simulation.costSavingsInr >= 0
                  ? 'bg-primary-50 border-primary-300 text-primary-900'
                  : 'bg-gold-50 border-gold-300 text-gold-900'
              }`}>
                <span className="text-[10px] uppercase font-extrabold block">
                  {simulation.costSavingsInr >= 0 ? 'Weekly Savings' : 'Investment Delta'}
                </span>
                <span className="font-serif text-xl font-black flex items-center justify-center gap-1">
                  {simulation.costSavingsInr >= 0 ? <TrendingDown className="w-4 h-4 text-primary-700" /> : <TrendingUp className="w-4 h-4 text-gold-700" />}
                  ₹{Math.abs(simulation.costSavingsInr)}/wk
                </span>
              </div>
            </div>

            {/* Target Comparison Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-surface-100 border border-surface-200 text-center">
                <Flame className="w-4 h-4 text-primary-700 mx-auto mb-1" />
                <span className="text-[10px] text-primary-900/60 uppercase block font-bold">Calories</span>
                <span className="text-base font-black text-primary-950">{simulation.updatedTargets.calories}</span>
                <span className="text-[10px] text-primary-800 block font-semibold">
                  {simulation.updatedTargets.calories - profile.dailyCalories >= 0
                    ? `+${simulation.updatedTargets.calories - profile.dailyCalories}`
                    : simulation.updatedTargets.calories - profile.dailyCalories} kcal
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gold-50 border border-gold-300/40 text-center">
                <Dumbbell className="w-4 h-4 text-gold-700 mx-auto mb-1" />
                <span className="text-[10px] text-gold-800 uppercase block font-bold">Protein</span>
                <span className="text-base font-black text-gold-800">{simulation.updatedTargets.proteinG}g</span>
                <span className="text-[10px] text-gold-700 block font-bold">
                  {simulation.updatedTargets.proteinG - profile.proteinG >= 0
                    ? `+${simulation.updatedTargets.proteinG - profile.proteinG}g`
                    : `${simulation.updatedTargets.proteinG - profile.proteinG}g`}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300/40 text-center">
                <span className="text-[10px] text-amber-800 uppercase block font-bold">Carbs</span>
                <span className="text-base font-black text-amber-800">{simulation.updatedTargets.carbsG}g</span>
                <span className="text-[10px] text-primary-900/60 block font-medium">Glycogen</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300/40 text-center">
                <span className="text-[10px] text-rose-800 uppercase block font-bold">Fats</span>
                <span className="text-base font-black text-rose-800">{simulation.updatedTargets.fatsG}g</span>
                <span className="text-[10px] text-primary-900/60 block font-medium">Lipid Matrix</span>
              </div>
            </div>

            {/* AI Narrative Explanation */}
            <div className="p-4 rounded-2xl bg-surface-100/90 border border-surface-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary-950">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>AI Optimization Narrative</span>
              </div>
              <p className="text-xs text-primary-900/80 leading-relaxed font-medium">
                {simulation.summaryExplanation}
              </p>
              <div className="p-3 rounded-xl bg-gold-50 text-[11px] text-gold-900 font-semibold border border-gold-300 mt-2">
                💡 {simulation.aiAdvice}
              </div>
            </div>

            {/* Key Item Replacements Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-primary-950 uppercase tracking-wider">
                Simulated Ingredient Substitutions:
              </h4>

              <div className="space-y-2.5">
                {simulation.keyChanges.map((change, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-surface-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gold-800 uppercase block">
                        {change.category}
                      </span>
                      <div className="flex items-center gap-2 text-primary-900 font-medium">
                        <span className="line-through text-primary-900/40">{change.original}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-primary-700 shrink-0" />
                        <strong className="text-primary-950 font-bold">{change.replacement}</strong>
                      </div>
                      <p className="text-[11px] text-primary-900/70">{change.reason}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-surface-100 border border-surface-300 text-primary-900 font-bold text-xs shrink-0 self-start sm:self-center">
                      {change.costImpact}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4 border-t border-surface-200 flex items-center justify-between">
              <span className="text-xs text-primary-900/70 font-medium">
                Want to commit these changes to your daily dashboard?
              </span>

              <button
                onClick={handleApplyToActivePlan}
                disabled={isApplied}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isApplied
                    ? 'bg-primary-800 text-white'
                    : 'bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 hover:from-primary-800 text-gold-200 border border-gold-500/40 shadow-luxury-sm'
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-gold-300" />
                    <span>Plan Applied!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-gold-300 fill-current" />
                    <span>Apply to Dashboard</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
