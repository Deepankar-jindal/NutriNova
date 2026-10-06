'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, RefreshCw } from 'lucide-react';
import { MealItem, SwapOption } from '../../types/nutrition';
import { AIService } from '../../lib/ai-service';

interface MealSwapModalProps {
  meal: MealItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSwap: (originalMealId: string, newMeal: MealItem) => void;
}

export const MealSwapModal: React.FC<MealSwapModalProps> = ({
  meal,
  isOpen,
  onClose,
  onConfirmSwap,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('lower_calories');
  const [swapOptions, setSwapOptions] = useState<SwapOption[]>([]);
  const [selectedSwapIndex, setSelectedSwapIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const swapReasons = [
    { id: 'lower_calories', label: '🔥 Lower Calories' },
    { id: 'higher_protein', label: '💪 Higher Protein' },
    { id: 'cheaper', label: '💰 Cheaper / Budget' },
    { id: 'faster_prep', label: '⚡ Faster Preparation' },
    { id: 'vegetarian', label: '🌱 Pure Plant/Vegan' },
  ];

  useEffect(() => {
    if (!meal || !isOpen) return;

    setIsGenerating(true);
    const timer = setTimeout(() => {
      const options = AIService.getMealSwapOptions(meal, selectedReason);
      setSwapOptions(options);
      setSelectedSwapIndex(0);
      setIsGenerating(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [meal, selectedReason, isOpen]);

  if (!isOpen || !meal) return null;

  const currentSwap = swapOptions[selectedSwapIndex];

  const handleApplySwap = () => {
    if (currentSwap) {
      onConfirmSwap(meal.id, currentSwap.alternativeMeal);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-gold-600/30 rounded-3xl p-6 md:p-8 shadow-luxury-lg max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-surface-100 border border-surface-300 text-primary-900/60 hover:text-primary-950 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gold-50 border border-gold-400/40 text-gold-700 shadow-luxury-sm">
            <RefreshCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-primary-950 flex items-center gap-2">
              AI Intelligent Meal Swap
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-primary-50 text-primary-800 border border-primary-200 px-2.5 py-0.5 rounded-full">
                Adaptive
              </span>
            </h3>
            <p className="text-xs text-primary-900/70 mt-0.5">
              Swapping: <strong className="text-primary-950">{meal.name}</strong> ({meal.calories} kcal • {meal.proteinG}g protein)
            </p>
          </div>
        </div>

        {/* Swap Reason Selector */}
        <div className="mb-6">
          <label className="text-xs font-bold text-primary-950 uppercase tracking-wider block mb-2.5">
            Why do you want to swap?
          </label>
          <div className="flex flex-wrap gap-2">
            {swapReasons.map((reason) => {
              const isSelected = selectedReason === reason.id;
              return (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-200 border border-gold-500/40 shadow-sm font-bold'
                      : 'bg-surface-100 text-primary-900/80 border border-surface-300 hover:border-gold-500/30'
                  }`}
                >
                  {reason.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Processing / Alternatives View */}
        {isGenerating ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="spinner-border mb-3" />
            <p className="text-xs font-semibold text-primary-900">
              AI is computing bio-equivalent macro alternatives...
            </p>
          </div>
        ) : currentSwap ? (
          <div className="space-y-4">
            
            {/* Side by side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Original Meal */}
              <div className="p-4 rounded-2xl bg-surface-100/70 border border-surface-300">
                <span className="text-[10px] uppercase font-bold text-primary-900/60 tracking-wider block mb-1">
                  Current Meal
                </span>
                <h4 className="font-serif text-sm font-bold text-primary-950 mb-2 line-clamp-1">{meal.name}</h4>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs py-2 bg-white rounded-xl border border-surface-200">
                  <div>
                    <span className="text-[10px] text-primary-900/60 block font-medium">Calories</span>
                    <span className="font-bold text-primary-950">{meal.calories}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-primary-900/60 block font-medium">Protein</span>
                    <span className="font-bold text-gold-800">{meal.proteinG}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-primary-900/60 block font-medium">Cost</span>
                    <span className="font-bold text-primary-900">₹{meal.estimatedCostInr}</span>
                  </div>
                </div>
              </div>

              {/* AI Recommended Swap */}
              <div className="p-4 rounded-2xl bg-gold-50/50 border-2 border-gold-500/60 shadow-luxury-sm relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-gold-800 tracking-wider">
                    AI Alternative
                  </span>
                  <span className="text-[10px] font-bold text-primary-900 bg-primary-100 px-2 py-0.5 rounded-full border border-primary-200">
                    Score: {currentSwap.alternativeMeal.aiScore}/100
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-primary-950 mb-2 line-clamp-1">
                  {currentSwap.alternativeMeal.name}
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs py-2 bg-white rounded-xl border border-gold-500/20">
                  <div>
                    <span className="text-[10px] text-primary-900/60 block font-medium">Calories</span>
                    <span className={`font-bold ${currentSwap.calorieDelta < 0 ? 'text-primary-800' : 'text-primary-950'}`}>
                      {currentSwap.alternativeMeal.calories} ({currentSwap.calorieDelta > 0 ? `+${currentSwap.calorieDelta}` : currentSwap.calorieDelta})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-primary-900/60 block font-medium">Protein</span>
                    <span className={`font-bold ${currentSwap.proteinDelta >= 0 ? 'text-gold-700' : 'text-primary-950'}`}>
                      {currentSwap.alternativeMeal.proteinG}g ({currentSwap.proteinDelta > 0 ? `+${currentSwap.proteinDelta}` : currentSwap.proteinDelta})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-primary-900/60 block font-medium">Cost</span>
                    <span className={`font-bold ${currentSwap.costDeltaInr < 0 ? 'text-emerald-700' : 'text-primary-950'}`}>
                      ₹{currentSwap.alternativeMeal.estimatedCostInr}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* AI Explanation Callout */}
            <div className="p-4 rounded-2xl bg-white border border-gold-600/30 flex items-start gap-3 shadow-luxury-sm">
              <Sparkles className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-primary-950 block mb-0.5">
                  Saarthi Nutritionist Rationale
                </span>
                <p className="text-xs text-primary-900/80 leading-relaxed">
                  {currentSwap.aiRationale}
                </p>
              </div>
            </div>

            {/* If multiple alternatives exist */}
            {swapOptions.length > 1 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-primary-900/70 font-semibold">Other AI Suggestions:</span>
                {swapOptions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSwapIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedSwapIndex === idx
                        ? 'bg-primary-900 text-gold-200 border border-gold-500/40'
                        : 'bg-surface-100 text-primary-900/70 hover:text-primary-950 border border-surface-300'
                    }`}
                  >
                    Option #{idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-200">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 text-xs font-bold text-primary-900 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySwap}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 text-gold-200 border border-gold-500/40 text-xs font-bold transition shadow-luxury-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-gold-300" />
                Confirm AI Swap
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};
