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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-gold-600/30 rounded-3xl p-6 md:p-8 shadow-luxury-lg max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/90 border border-surface-300 text-primary-900/60 hover:text-primary-950 transition z-10 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero header */}
        <div className="relative h-52 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary-900 bg-white/90 px-3 py-1 rounded-lg border border-gold-500/40 backdrop-blur-md shadow-sm">
                {meal.mealType}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-primary-950 mt-2 drop-shadow-sm">
                {meal.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 border border-gold-500/40 text-gold-800 text-xs font-bold backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>AI Score {meal.aiScore}/100</span>
            </div>
          </div>
        </div>

        {/* Nutritional Pill Matrix */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="p-3 rounded-2xl bg-surface-100 border border-surface-200 text-center">
            <span className="text-[10px] text-primary-900/60 uppercase tracking-wider block font-bold">Calories</span>
            <span className="text-base font-black text-primary-950">{meal.calories} kcal</span>
          </div>
          <div className="p-3 rounded-2xl bg-gold-50 border border-gold-300/40 text-center">
            <span className="text-[10px] text-gold-800 uppercase tracking-wider block font-bold">Protein</span>
            <span className="text-base font-black text-gold-800">{meal.proteinG}g</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300/40 text-center">
            <span className="text-[10px] text-amber-800 uppercase tracking-wider block font-bold">Carbs</span>
            <span className="text-base font-black text-amber-800">{meal.carbsG}g</span>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300/40 text-center">
            <span className="text-[10px] text-rose-800 uppercase tracking-wider block font-bold">Fats</span>
            <span className="text-base font-black text-rose-800">{meal.fatsG}g</span>
          </div>
        </div>

        {/* Metadata info: prep time & cost */}
        <div className="flex items-center gap-6 mb-6 text-xs text-primary-900 bg-surface-100 p-3.5 rounded-2xl border border-surface-200 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-800" />
            <span>Prep Time: <strong className="font-bold text-primary-950">{meal.prepTimeMinutes} mins</strong></span>
          </div>
          <div className="h-4 w-px bg-surface-300" />
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-gold-600" />
            <span>Cost: <strong className="font-bold text-primary-950">~₹{meal.estimatedCostInr}</strong></span>
          </div>
        </div>

        {/* Ingredients section */}
        <div className="mb-6">
          <h4 className="font-serif text-sm font-bold text-primary-950 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-600" />
            Ingredients &amp; Portions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {meal.ingredients.map((ing, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-surface-100/70 border border-surface-200 text-xs"
              >
                <span className="text-primary-900 font-medium">{ing.name}</span>
                <span className="font-bold text-primary-950">{ing.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="font-serif text-sm font-bold text-primary-950 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-700" />
            Step-by-Step Preparation
          </h4>
          <ol className="space-y-3">
            {meal.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-xs text-primary-900/80 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 border border-primary-200 text-primary-800 font-bold flex items-center justify-center text-[11px] shadow-sm">
                  {idx + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Close Modal CTA */}
        <div className="mt-8 pt-4 border-t border-surface-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 text-gold-200 border border-gold-500/40 text-xs font-bold transition shadow-luxury-sm"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
