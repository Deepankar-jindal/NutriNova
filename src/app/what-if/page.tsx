'use client';

import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Sparkles,
  IndianRupee,
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
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pt-4 border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Hackathon Dynamic Simulation Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
            &ldquo;What If?&rdquo; Nutrition &amp; Budget Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Change budget, goals, or diet type to witness instant AI bio-macro recalculation and ingredient substitution.
          </p>
        </div>

        <button
          onClick={handleResetSandbox}
          className="px-4 py-2 rounded-xl bg-surface-100 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Variables</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Simulation Sliders & Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-surface-200/80 border border-amber-500/30 backdrop-blur-xl shadow-glass space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                1. Adjust Weekly Budget
              </span>
              <span className="text-xl font-black text-amber-400">
                ₹{simulatedBudget} <span className="text-xs text-slate-400 font-normal">/ week</span>
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
                className="w-full accent-amber-400 h-2.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
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
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition ${
                    simulatedBudget === b
                      ? 'bg-amber-400 text-slate-950 shadow-glow-sm'
                      : 'bg-surface-100 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  ₹{b}
                </button>
              ))}
            </div>

            {/* Goal Switcher */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
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
                    className={`p-3 rounded-2xl border text-left transition ${
                      simulatedGoal === g.id
                        ? 'bg-emerald-950/40 border-emerald-400 shadow-glow-sm'
                        : 'bg-surface-100 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">{g.label}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{g.cal}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference Switcher */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
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
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      simulatedDiet === d.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-surface-100 text-slate-400 border-slate-800'
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
          <div className="p-6 md:p-8 rounded-3xl bg-surface-200/80 border border-emerald-500/30 backdrop-blur-xl shadow-glass space-y-6">
            
            {/* Top Delta Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Live AI Simulation Output
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  &ldquo;Here&apos;s how I optimized your plan.&rdquo;
                </h3>
              </div>

              {/* Cost Savings Pill */}
              <div className={`p-3 rounded-2xl border text-center shrink-0 ${
                simulation.costSavingsInr >= 0
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-400'
              }`}>
                <span className="text-[10px] uppercase font-bold block">
                  {simulation.costSavingsInr >= 0 ? 'Weekly Savings' : 'Investment Delta'}
                </span>
                <span className="text-xl font-black flex items-center justify-center gap-1">
                  {simulation.costSavingsInr >= 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  ₹{Math.abs(simulation.costSavingsInr)}/wk
                </span>
              </div>
            </div>

            {/* Target Comparison Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-surface-100 border border-slate-800 text-center">
                <Flame className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Calories</span>
                <span className="text-base font-black text-white">{simulation.updatedTargets.calories}</span>
                <span className="text-[10px] text-slate-500 block">
                  {simulation.updatedTargets.calories - profile.dailyCalories >= 0
                    ? `+${simulation.updatedTargets.calories - profile.dailyCalories}`
                    : simulation.updatedTargets.calories - profile.dailyCalories} kcal
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-100 border border-cyan-500/20 text-center">
                <Dumbbell className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] text-cyan-400 uppercase block font-semibold">Protein</span>
                <span className="text-base font-black text-cyan-300">{simulation.updatedTargets.proteinG}g</span>
                <span className="text-[10px] text-cyan-400 block font-semibold">
                  {simulation.updatedTargets.proteinG - profile.proteinG >= 0
                    ? `+${simulation.updatedTargets.proteinG - profile.proteinG}g`
                    : `${simulation.updatedTargets.proteinG - profile.proteinG}g`}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-100 border border-amber-500/20 text-center">
                <span className="text-[10px] text-amber-400 uppercase block font-semibold">Carbs</span>
                <span className="text-base font-black text-amber-300">{simulation.updatedTargets.carbsG}g</span>
                <span className="text-[10px] text-slate-400 block">Glycogen</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-100 border border-rose-500/20 text-center">
                <span className="text-[10px] text-rose-400 uppercase block font-semibold">Fats</span>
                <span className="text-base font-black text-rose-300">{simulation.updatedTargets.fatsG}g</span>
                <span className="text-[10px] text-slate-400 block">Lipid Matrix</span>
              </div>
            </div>

            {/* AI Narrative Explanation */}
            <div className="p-4 rounded-2xl bg-surface-100/90 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Optimization Narrative</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {simulation.summaryExplanation}
              </p>
              <div className="p-2.5 rounded-xl bg-surface-200/80 text-[11px] text-emerald-300/90 border border-emerald-500/20 mt-2">
                💡 {simulation.aiAdvice}
              </div>
            </div>

            {/* Key Item Replacements Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Simulated Ingredient Substitutions:
              </h4>

              <div className="space-y-2.5">
                {simulation.keyChanges.map((change, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-surface-100/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase block">
                        {change.category}
                      </span>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="line-through text-slate-500">{change.original}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <strong className="text-white font-bold">{change.replacement}</strong>
                      </div>
                      <p className="text-[11px] text-slate-400">{change.reason}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-surface-200 border border-slate-700 text-emerald-400 font-bold text-xs shrink-0 self-start sm:self-center">
                      {change.costImpact}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Want to commit these changes to your daily dashboard?
              </span>

              <button
                onClick={handleApplyToActivePlan}
                disabled={isApplied}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isApplied
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 text-slate-950 shadow-glow-sm'
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Plan Applied!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
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
