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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-surface-DEFAULT border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-glass max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-surface-100 border border-slate-800 text-slate-400 hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-glow-sm">
            <RefreshCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              AI Intelligent Meal Swap
              <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Adaptive
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Swapping: <strong className="text-white">{meal.name}</strong> ({meal.calories} kcal • {meal.proteinG}g protein)
            </p>
          </div>
        </div>

        {/* Swap Reason Selector */}
        <div className="mb-6">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
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
                      ? 'bg-emerald-500 text-slate-950 shadow-glow-sm font-bold'
                      : 'bg-surface-100 text-slate-300 border border-slate-800 hover:border-slate-700'
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
            <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
            <p className="text-xs font-medium text-slate-300">
              AI is computing bio-equivalent macro alternatives...
            </p>
          </div>
        ) : currentSwap ? (
          <div className="space-y-4">
            
            {/* Side by side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Original Meal */}
              <div className="p-4 rounded-2xl bg-surface-100/60 border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Current Meal
                </span>
                <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{meal.name}</h4>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs py-2 bg-surface-200/50 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Calories</span>
                    <span className="font-bold text-slate-300">{meal.calories}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Protein</span>
                    <span className="font-bold text-cyan-300">{meal.proteinG}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Cost</span>
                    <span className="font-bold text-amber-300">₹{meal.estimatedCostInr}</span>
                  </div>
                </div>
              </div>

              {/* AI Recommended Swap */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/50 shadow-glow-sm relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    AI Alternative
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    Score: {currentSwap.alternativeMeal.aiScore}/100
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">
                  {currentSwap.alternativeMeal.name}
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs py-2 bg-surface-100/80 rounded-xl border border-emerald-500/20">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Calories</span>
                    <span className={`font-bold ${currentSwap.calorieDelta < 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {currentSwap.alternativeMeal.calories} ({currentSwap.calorieDelta > 0 ? `+${currentSwap.calorieDelta}` : currentSwap.calorieDelta})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Protein</span>
                    <span className={`font-bold ${currentSwap.proteinDelta >= 0 ? 'text-cyan-400' : 'text-slate-200'}`}>
                      {currentSwap.alternativeMeal.proteinG}g ({currentSwap.proteinDelta > 0 ? `+${currentSwap.proteinDelta}` : currentSwap.proteinDelta})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Cost</span>
                    <span className={`font-bold ${currentSwap.costDeltaInr < 0 ? 'text-amber-400' : 'text-slate-200'}`}>
                      ₹{currentSwap.alternativeMeal.estimatedCostInr}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* AI Explanation Callout */}
            <div className="p-4 rounded-2xl bg-surface-100/90 border border-emerald-500/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-300 block mb-0.5">
                  Saarthi Nutritionist Rationale
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentSwap.aiRationale}
                </p>
              </div>
            </div>

            {/* If multiple alternatives exist */}
            {swapOptions.length > 1 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-slate-400 font-medium">Other AI Suggestions:</span>
                {swapOptions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSwapIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedSwapIndex === idx
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-surface-100 text-slate-400 hover:text-white'
                    }`}
                  >
                    Option #{idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-surface-100 hover:bg-slate-800 text-xs font-semibold text-slate-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySwap}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-xs font-bold transition shadow-glow-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Confirm AI Swap
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};
