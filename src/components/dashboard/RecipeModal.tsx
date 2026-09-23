'use client';

import React from 'react';
import { X, Clock, IndianRupee, Sparkles } from 'lucide-react';
import { MealItem } from '../../types/nutrition';

interface RecipeModalProps {
  meal: MealItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ meal, isOpen, onClose }) => {
  if (!isOpen || !meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-surface-DEFAULT border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-glass max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-surface-100 border border-slate-800 text-slate-400 hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero header */}
        <div className="relative h-48 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-DEFAULT via-surface-DEFAULT/50 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-surface-DEFAULT/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 backdrop-blur-md">
                {meal.mealType}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1.5 drop-shadow">
                {meal.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Score {meal.aiScore}/100</span>
            </div>
          </div>
        </div>

        {/* Nutritional Pill Matrix */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="p-3 rounded-xl bg-surface-100 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Calories</span>
            <span className="text-base font-black text-white">{meal.calories} kcal</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-100 border border-cyan-500/20 text-center">
            <span className="text-[10px] text-cyan-400 uppercase tracking-wider block">Protein</span>
            <span className="text-base font-black text-cyan-300">{meal.proteinG}g</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-100 border border-amber-500/20 text-center">
            <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Carbs</span>
            <span className="text-base font-black text-amber-300">{meal.carbsG}g</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-100 border border-rose-500/20 text-center">
            <span className="text-[10px] text-rose-400 uppercase tracking-wider block">Fats</span>
            <span className="text-base font-black text-rose-300">{meal.fatsG}g</span>
          </div>
        </div>

        {/* Metadata info: prep time & cost */}
        <div className="flex items-center gap-6 mb-6 text-xs text-slate-300 bg-surface-100/50 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Prep Time: <strong>{meal.prepTimeMinutes} mins</strong></span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-amber-400" />
            <span>Cost: <strong>~₹{meal.estimatedCostInr}</strong></span>
          </div>
        </div>

        {/* Ingredients section */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Ingredients & Portions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {meal.ingredients.map((ing, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-surface-100/70 border border-slate-800/80 text-xs"
              >
                <span className="text-slate-200">{ing.name}</span>
                <span className="font-semibold text-emerald-400">{ing.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Step-by-Step Preparation
          </h4>
          <ol className="space-y-3">
            {meal.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-xs text-slate-300 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-100 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center text-[11px]">
                  {idx + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Close Modal CTA */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-surface-100 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
