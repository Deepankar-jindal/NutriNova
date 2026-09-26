'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  CheckCircle2,
  Sparkles,
  IndianRupee,
  Salad,
  Dumbbell,
  Apple,
  Wheat,
  RotateCcw,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

export default function GroceryPage() {
  const { groceryItems, toggleGroceryItem, optimizeGroceries, profile } = useNutrition();
  const [isOptimized, setIsOptimized] = useState(false);

  const categories = [
    { id: 'protein', label: 'High-Protein Fuel', icon: <Dumbbell className="w-4 h-4 text-cyan-400" /> },
    { id: 'vegetables', label: 'Mandi Vegetables & Greens', icon: <Salad className="w-4 h-4 text-emerald-400" /> },
    { id: 'fruits', label: 'Antioxidant Fruits', icon: <Apple className="w-4 h-4 text-rose-400" /> },
    { id: 'grains_pantry', label: 'Grains & Complex Carbs', icon: <Wheat className="w-4 h-4 text-amber-400" /> },
    { id: 'dairy', label: 'Dairy & Probiotics', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: 'spices_other', label: 'Nuts & Pantry Essentials', icon: <ShieldCheck className="w-4 h-4 text-teal-400" /> },
  ];

  const totalEstimatedCost = groceryItems.reduce((sum, item) => sum + item.estimatedPriceInr, 0);
  const completedItemsCount = groceryItems.filter(i => i.completed).length;

  const handleOptimize = () => {
    optimizeGroceries();
    setIsOptimized(true);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pt-4 border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Smart Weekly Grocery Cart</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            AI-Synchronized Shopping List
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Auto-compiled from your active 7-day meal plan. Track purchasing and optimize your weekly rupee spend.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOptimize}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-glow-sm ${
              isOptimized
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 hover:from-emerald-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isOptimized ? 'Budget Optimized (Saved ₹160!)' : 'Optimize Budget (Save ₹)'}</span>
          </button>
        </div>
      </div>

      {/* Budget Summary Progress Card */}
      <div className="p-6 rounded-3xl bg-surface-200/80 border border-emerald-500/30 backdrop-blur-xl shadow-glass">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Estimated Weekly Cart
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-white">₹{totalEstimatedCost}</span>
              <span className="text-xs text-slate-400">/ ₹{profile.weeklyBudgetInr} cap</span>
            </div>
            <span className="text-xs text-emerald-400 font-bold mt-1 block">
              ₹{Math.max(0, profile.weeklyBudgetInr - totalEstimatedCost)} under budget ceiling
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Pantry Acquisition Progress
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-white">
                {completedItemsCount} of {groceryItems.length} items
              </span>
              <span className="text-xs text-emerald-400 font-bold">
                ({Math.round((completedItemsCount / groceryItems.length) * 100)}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${(completedItemsCount / groceryItems.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-surface-100 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-white block mb-0.5">💡 Desi Superfood Strategy:</span>
            <span>Purchasing dals and seasonal veggies from local mandis ensures fresh phytonutrients at 30% discount.</span>
          </div>

        </div>
      </div>

      {/* Categorized Grocery List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const itemsInCat = groceryItems.filter(i => i.category === cat.id);
          if (itemsInCat.length === 0) return null;

          return (
            <div
              key={cat.id}
              className="p-5 rounded-3xl bg-surface-100/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800/80">
                  <div className="p-2 rounded-xl bg-surface-200">{cat.icon}</div>
                  <h3 className="text-sm font-bold text-white">{cat.label}</h3>
                </div>

                <div className="space-y-2.5">
                  {itemsInCat.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleGroceryItem(item.id)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                        item.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30 opacity-60'
                          : 'bg-surface-200/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center ${
                          item.completed
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-600'
                        }`}>
                          {item.completed && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                        </div>
                        <div>
                          <span className={`text-xs font-semibold block ${
                            item.completed ? 'line-through text-slate-400' : 'text-slate-200'
                          }`}>
                            {item.item}
                          </span>
                          <span className="text-[10px] text-slate-400">{item.quantity}</span>
                          {item.notes && (
                            <span className="text-[10px] text-emerald-400 block font-medium mt-0.5">
                              {item.notes}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-xs font-bold text-amber-400 shrink-0">
                        ₹{item.estimatedPriceInr}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
