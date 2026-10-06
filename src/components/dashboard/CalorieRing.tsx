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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8 rounded-3xl bg-white border border-gold-600/25 backdrop-blur-xl shadow-luxury-md">
      
      {/* Left Calorie Circle Dial */}
      <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-surface-200">
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="rgba(6, 78, 59, 0.08)"
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
                <stop offset="0%" stopColor="#047857" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#c8931d" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center stats */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <Flame className="w-6 h-6 text-gold-600 mb-0.5 animate-pulse" />
            <span className="font-serif text-3xl font-black text-primary-950 tracking-tight leading-none">
              {consumedCalories}
            </span>
            <span className="text-[11px] font-semibold text-primary-900/60 mt-0.5">
              / {targetCalories} kcal
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-primary-800 bg-primary-50 px-2.5 py-0.5 rounded-full mt-1.5 border border-primary-200 shadow-sm">
              {calPercent}% of Goal
            </span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-primary-900/70">
            <strong className="text-primary-950 font-bold">{remainingCalories} kcal</strong> remaining for today
          </span>
        </div>
      </div>

      {/* Right Macro & Micronutrient Grid */}
      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Protein Card */}
        <div className="p-4 rounded-2xl bg-surface-100/70 border border-gold-500/30 flex flex-col justify-between shadow-luxury-sm hover:border-gold-500/60 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gold-100 text-gold-700">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-primary-950">Protein</span>
            </div>
            <span className="text-xs font-black text-gold-700">
              {Math.min(100, Math.round((consumedProtein / profile.proteinG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-primary-950">{consumedProtein}g</span>
              <span className="text-primary-900/60 font-medium">/ {profile.proteinG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-200 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-amber-600 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedProtein / profile.proteinG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-gold-800 font-semibold">Hypertrophy Target: 2.0g/kg</span>
        </div>

        {/* Carbs Card */}
        <div className="p-4 rounded-2xl bg-surface-100/70 border border-amber-500/30 flex flex-col justify-between shadow-luxury-sm hover:border-amber-500/60 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Wheat className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-primary-950">Carbs</span>
            </div>
            <span className="text-xs font-black text-amber-700">
              {Math.min(100, Math.round((consumedCarbs / profile.carbsG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-primary-950">{consumedCarbs}g</span>
              <span className="text-primary-900/60 font-medium">/ {profile.carbsG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-200 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedCarbs / profile.carbsG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-amber-800 font-semibold">Complex Glycogen Fuel</span>
        </div>

        {/* Fats Card */}
        <div className="p-4 rounded-2xl bg-surface-100/70 border border-rose-500/30 flex flex-col justify-between shadow-luxury-sm hover:border-rose-500/60 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-primary-950">Healthy Fats</span>
            </div>
            <span className="text-xs font-black text-rose-700">
              {Math.min(100, Math.round((consumedFats / profile.fatsG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-primary-950">{consumedFats}g</span>
              <span className="text-primary-900/60 font-medium">/ {profile.fatsG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-200 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedFats / profile.fatsG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-rose-800 font-semibold">Hormonal & Joint Matrix</span>
        </div>

        {/* Fiber Card */}
        <div className="p-4 rounded-2xl bg-surface-100/70 border border-primary-500/30 flex flex-col justify-between shadow-luxury-sm hover:border-primary-500/60 transition">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary-100 text-primary-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-primary-950">Fiber</span>
            </div>
            <span className="text-xs font-black text-primary-800">
              {Math.min(100, Math.round((consumedFiber / profile.fiberG) * 100))}%
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-lg font-black text-primary-950">{consumedFiber}g</span>
              <span className="text-primary-900/60 font-medium">/ {profile.fiberG}g</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-200 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-700 transition-all duration-700"
                style={{ width: `${Math.min(100, (consumedFiber / profile.fiberG) * 100)}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-primary-900 font-semibold">Prebiotic Gut Health</span>
        </div>

        {/* Water Tracker Card */}
        <div className="p-4 rounded-2xl bg-surface-100/70 border border-blue-500/30 flex flex-col justify-between shadow-luxury-sm hover:border-blue-500/60 transition sm:col-span-2 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary-950">Hydration Grid</span>
                <span className="text-[10px] text-primary-900/60 block font-medium">Target: {profile.waterLiters}L</span>
              </div>
            </div>
            <button
              onClick={() => addWater(0.25)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> +250ml
            </button>
          </div>
          <div className="my-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-xl font-black text-primary-950">{consumedWater}L</span>
              <span className="text-primary-900/60 font-medium">/ {profile.waterLiters}L</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-surface-200 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (consumedWater / profile.waterLiters) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-primary-900/60 font-medium">
            <span>Cellular Osmotic Balance</span>
            <span className="text-blue-700 font-bold">{Math.round((consumedWater / profile.waterLiters) * 100)}% Reached</span>
          </div>
        </div>

      </div>

    </div>
  );
};
