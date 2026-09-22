'use client';

import React from 'react';
import { Flame, Dumbbell, Wheat, Droplet, ShieldCheck, HeartPulse, Plus } from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

export const CalorieRing: React.FC = () => {
  const {
    profile,
    consumedCalories,
    consumedProtein,
    consumedCarbs,
    consumedFats,
    consumedFiber,
    consumedWater,
    addWater,
  } = useNutrition();

  // Calculations for Calorie Circular Progress
  const targetCalories = profile.dailyCalories || 2400;
  const calPercent = Math.min(100, Math.round((consumedCalories / targetCalories) * 100));
  const remainingCalories = Math.max(0, targetCalories - consumedCalories);

  // Circular gauge SVG metrics
  const size = 180;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calPercent / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8 rounded-3xl bg-surface-200/70 border border-emerald-500/20 backdrop-blur-xl shadow-glass">
      
      {/* Left Calorie Circle Dial */}
      <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-800/80">
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="url(#calorieGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center stats */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <Flame className="w-6 h-6 text-emerald-400 mb-0.5 animate-pulse" />
            <span className="text-3xl font-black text-white tracking-tight">
              {consumedCalories}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 -mt-0.5">
              / {targetCalories} kcal
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1 border border-emerald-500/20">
              {calPercent}% of Goal
            </span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-slate-400">
            <strong className="text-emerald-400 font-bold">{remainingCalories} kcal</strong> remaining for today
          </span>
        </div>
      </div>

      {/* Right Macro & Micronutrient Grid */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Protein Card */}
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-cyan-500/20 flex flex-col justify-between shadow-sm hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">Protein</span>
            </div>
            <span className="text-xs font-bold text-cyan-400">
              {Math.min(100, Math.round((consumedProtein / profile.proteinG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-white">{consumedProtein}g</span>
              <span className="text-slate-400">/ {profile.proteinG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedProtein / profile.proteinG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-cyan-300 font-medium">Hypertrophy Target: 2.0g/kg</span>
        </div>

        {/* Carbs Card */}
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-amber-500/20 flex flex-col justify-between shadow-sm hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Wheat className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">Carbs</span>
            </div>
            <span className="text-xs font-bold text-amber-400">
              {Math.min(100, Math.round((consumedCarbs / profile.carbsG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-white">{consumedCarbs}g</span>
              <span className="text-slate-400">/ {profile.carbsG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedCarbs / profile.carbsG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-amber-300 font-medium">Complex Glycogen Fuel</span>
        </div>

        {/* Fats Card */}
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-rose-500/20 flex flex-col justify-between shadow-sm hover:border-rose-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">Healthy Fats</span>
            </div>
            <span className="text-xs font-bold text-rose-400">
              {Math.min(100, Math.round((consumedFats / profile.fatsG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-white">{consumedFats}g</span>
              <span className="text-slate-400">/ {profile.fatsG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedFats / profile.fatsG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-rose-300 font-medium">Hormonal & Joint Matrix</span>
        </div>

        {/* Fiber Card */}
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-teal-500/20 flex flex-col justify-between shadow-sm hover:border-teal-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-200">Fiber</span>
            </div>
            <span className="text-xs font-bold text-teal-400">
              {Math.min(100, Math.round((consumedFiber / profile.fiberG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-white">{consumedFiber}g</span>
              <span className="text-slate-400">/ {profile.fiberG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedFiber / profile.fiberG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-teal-300 font-medium">Prebiotic Gut Health</span>
        </div>

        {/* Water Tracker Card */}
        <div className="p-4 rounded-2xl bg-surface-100/80 border border-blue-500/20 flex flex-col justify-between shadow-sm hover:border-blue-500/40 transition sm:col-span-2 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200">Hydration Grid</span>
                <span className="text-[10px] text-slate-400 block">Target: {profile.waterLiters}L</span>
              </div>
            </div>
            <button
              onClick={() => addWater(0.25)}
              className="flex items-center gap-1 px-3 py-1 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> +250ml
            </button>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-xl font-black text-white">{consumedWater}L</span>
              <span className="text-slate-400">/ {profile.waterLiters}L</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (consumedWater / profile.waterLiters) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Cellular Osmotic Balance</span>
            <span className="text-blue-400 font-semibold">{Math.round((consumedWater / profile.waterLiters) * 100)}% Reached</span>
          </div>
        </div>

      </div>

    </div>
  );
};
