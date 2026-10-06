'use client';

import React, { useState } from 'react';
import { Clock, Sparkles, RefreshCw, CheckCircle2, BookOpen, IndianRupee } from 'lucide-react';
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
    breakfast: { label: 'Breakfast', badgeColor: 'text-amber-800 bg-amber-50 border-amber-300' },
    lunch: { label: 'Lunch', badgeColor: 'text-primary-800 bg-primary-50 border-primary-300' },
    snacks: { label: 'Snacks & Pre-Workout', badgeColor: 'text-gold-800 bg-gold-50 border-gold-300' },
    dinner: { label: 'Dinner & Recovery', badgeColor: 'text-emerald-900 bg-emerald-50 border-emerald-300' },
  };

  const currentType = mealTypeLabels[meal.mealType] || {
    label: meal.mealType,
    badgeColor: 'text-primary-800 bg-primary-50 border-primary-300',
  };

  return (
    <>
      <div
        className={`group relative rounded-3xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
          meal.isLogged
            ? 'border-primary-600/50 shadow-luxury-md bg-gradient-to-b from-white to-primary-50/30'
            : 'border-gold-500/20 hover:border-gold-500/50 hover:shadow-luxury-md'
        }`}
      >
        {/* Top Image Banner */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />

          {/* Meal Type & Score Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${currentType.badgeColor}`}>
              {currentType.label}
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-gold-500/40 text-gold-800 text-[10px] font-extrabold backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3 text-gold-600" />
              <span>AI {meal.aiScore}/100</span>
            </div>
          </div>

          {/* If Logged Indicator */}
          {meal.isLogged && (
            <div className="absolute bottom-2 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-700 text-white text-[11px] font-bold backdrop-blur-md shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-300" />
              <span>Logged {meal.loggedAt ? `at ${meal.loggedAt}` : 'Today'}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-base font-bold text-primary-950 group-hover:text-gold-700 transition-colors line-clamp-1">
              {meal.name}
            </h4>

            {meal.categoryTag && (
              <p className="text-[11px] text-primary-900/60 mt-0.5 line-clamp-1 font-medium">{meal.categoryTag}</p>
            )}

            {/* Macro Matrix */}
            <div className="grid grid-cols-4 gap-1.5 my-4 p-2.5 rounded-2xl bg-surface-100 border border-surface-200 text-center">
              <div>
                <span className="text-[9px] text-primary-900/60 uppercase block font-bold">Calories</span>
                <span className="text-xs font-black text-primary-950">{meal.calories}</span>
              </div>
              <div>
                <span className="text-[9px] text-gold-700 uppercase block font-bold">Protein</span>
                <span className="text-xs font-black text-gold-800">{meal.proteinG}g</span>
              </div>
              <div>
                <span className="text-[9px] text-amber-700 uppercase block font-bold">Carbs</span>
                <span className="text-xs font-black text-amber-800">{meal.carbsG}g</span>
              </div>
              <div>
                <span className="text-[9px] text-rose-700 uppercase block font-bold">Fats</span>
                <span className="text-xs font-black text-rose-800">{meal.fatsG}g</span>
              </div>
            </div>

            {/* Quick meta (time & cost) */}
            <div className="flex items-center justify-between text-[11px] text-primary-900/70 mb-4 px-1 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary-700" />
                {meal.prepTimeMinutes} mins prep
              </span>
              <span className="flex items-center gap-0.5 font-bold text-primary-900">
                <IndianRupee className="w-3 h-3 text-gold-600" />
                ~{meal.estimatedCostInr} / serving
              </span>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-surface-200">
            <button
              onClick={() => setRecipeOpen(true)}
              className="py-2 px-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-300 text-primary-950 text-[11px] font-bold flex items-center justify-center gap-1 transition shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-primary-700" />
              <span>Recipe</span>
            </button>

            <button
              onClick={() => setSwapOpen(true)}
              className="py-2 px-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-300 text-primary-950 text-[11px] font-bold flex items-center justify-center gap-1 transition shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gold-600" />
              <span>Swap</span>
            </button>

            <button
              onClick={() => logMeal(meal.id)}
              disabled={meal.isLogged}
              className={`py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                meal.isLogged
                  ? 'bg-primary-100 text-primary-800 border border-primary-300 cursor-default'
                  : 'bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 hover:to-primary-700 text-white shadow-luxury-sm border border-gold-500/30'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-300" />
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
