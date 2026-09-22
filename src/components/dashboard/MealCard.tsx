'use client';

import React, { useState } from 'react';
import { Clock, Sparkles, RefreshCw, CheckCircle2, BookOpen, Flame, Dumbbell, IndianRupee } from 'lucide-react';
import { MealItem } from '../../types/nutrition';
import { useNutrition } from '../../context/NutritionContext';
import { RecipeModal } from './RecipeModal';
import { MealSwapModal } from './MealSwapModal';

interface MealCardProps {
  meal: MealItem;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const { logMeal, swapMeal } = useNutrition();

  const mealTypeLabels: Record<string, { label: string; badgeColor: string }> = {
    breakfast: { label: 'Breakfast', badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    lunch: { label: 'Lunch', badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    snacks: { label: 'Snacks & Pre-Workout', badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    dinner: { label: 'Dinner & Recovery', badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  };

  const currentType = mealTypeLabels[meal.mealType] || {
    label: meal.mealType,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  };

  return (
    <>
      <div
        className={`group relative rounded-3xl bg-surface-100/80 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
          meal.isLogged
            ? 'border-emerald-500/40 shadow-glow-sm bg-gradient-to-b from-surface-100/90 to-emerald-950/20'
            : 'border-slate-800/80 hover:border-emerald-500/30 hover:shadow-lg'
        }`}
      >
        {/* Top Image Banner */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-transparent to-black/40" />

          {/* Meal Type & Score Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${currentType.badgeColor}`}>
              {currentType.label}
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-DEFAULT/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold backdrop-blur-md shadow">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>AI {meal.aiScore}/100</span>
            </div>
          </div>

          {/* If Logged Indicator */}
          {meal.isLogged && (
            <div className="absolute bottom-2 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/90 text-slate-950 text-[11px] font-extrabold backdrop-blur-md shadow">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Logged {meal.loggedAt ? `at ${meal.loggedAt}` : 'Today'}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
              {meal.name}
            </h4>

            {meal.categoryTag && (
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{meal.categoryTag}</p>
            )}

            {/* Macro Matrix */}
            <div className="grid grid-cols-4 gap-1.5 my-4 p-2.5 rounded-2xl bg-surface-200/60 border border-slate-800/80 text-center">
              <div>
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Calories</span>
                <span className="text-xs font-black text-white">{meal.calories}</span>
              </div>
              <div>
                <span className="text-[9px] text-cyan-400 uppercase block font-semibold">Protein</span>
                <span className="text-xs font-black text-cyan-300">{meal.proteinG}g</span>
              </div>
              <div>
                <span className="text-[9px] text-amber-400 uppercase block font-semibold">Carbs</span>
                <span className="text-xs font-black text-amber-300">{meal.carbsG}g</span>
              </div>
              <div>
                <span className="text-[9px] text-rose-400 uppercase block font-semibold">Fats</span>
                <span className="text-xs font-black text-rose-300">{meal.fatsG}g</span>
              </div>
            </div>

            {/* Quick meta (time & cost) */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4 px-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {meal.prepTimeMinutes} mins prep
              </span>
              <span className="flex items-center gap-0.5 font-medium text-emerald-400">
                <IndianRupee className="w-3 h-3" />
                ~{meal.estimatedCostInr} / serving
              </span>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setRecipeOpen(true)}
              className="py-2 px-2 rounded-xl bg-surface-200 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Recipe</span>
            </button>

            <button
              onClick={() => setSwapOpen(true)}
              className="py-2 px-2 rounded-xl bg-surface-200 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Swap</span>
            </button>

            <button
              onClick={() => logMeal(meal.id)}
              disabled={meal.isLogged}
              className={`py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                meal.isLogged
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-glow-sm'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{meal.isLogged ? 'Logged' : 'Log Meal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal meal={meal} isOpen={recipeOpen} onClose={() => setRecipeOpen(false)} />

      {/* Meal Swap Modal */}
      <MealSwapModal
        meal={meal}
        isOpen={swapOpen}
        onClose={() => setSwapOpen(false)}
        onConfirmSwap={swapMeal}
      />
    </>
  );
};
