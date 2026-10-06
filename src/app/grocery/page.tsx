'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  CheckCircle2,
  Sparkles,
  Salad,
  Dumbbell,
  Apple,
  Wheat,
  ShieldCheck,
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

export default function GroceryPage() {
  const { groceryItems, toggleGroceryItem, optimizeGroceries, profile } = useNutrition();
  const [isOptimized, setIsOptimized] = useState(false);

  const categories = [
    { id: 'protein', label: 'High-Protein Fuel', icon: <Dumbbell className="w-4 h-4 text-gold-700" /> },
    { id: 'vegetables', label: 'Mandi Vegetables & Greens', icon: <Salad className="w-4 h-4 text-primary-700" /> },
    { id: 'fruits', label: 'Antioxidant Fruits', icon: <Apple className="w-4 h-4 text-rose-600" /> },
    { id: 'grains_pantry', label: 'Grains & Complex Carbs', icon: <Wheat className="w-4 h-4 text-amber-700" /> },
    { id: 'dairy', label: 'Dairy & Probiotics', icon: <Sparkles className="w-4 h-4 text-primary-800" /> },
    { id: 'spices_other', label: 'Nuts & Pantry Essentials', icon: <ShieldCheck className="w-4 h-4 text-gold-600" /> },
  ];

  const totalEstimatedCost = groceryItems.reduce((sum, item) => sum + item.estimatedPriceInr, 0);
  const completedItemsCount = groceryItems.filter(i => i.completed).length;

  const handleOptimize = () => {
    optimizeGroceries();
    setIsOptimized(true);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FAF7F2]">
      
      {/* Header */}
      <div className="pt-4 border-b border-surface-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold mb-2 shadow-sm">
            <ShoppingCart className="w-3.5 h-3.5 text-primary-700" />
            <span>Smart Weekly Grocery Cart</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-black text-primary-950 tracking-tight">
            AI-Synchronized Shopping List
          </h1>
          <p className="text-xs sm:text-sm text-primary-900/70 mt-1 font-medium">
            Auto-compiled from your active 7-day meal plan. Track purchasing and optimize your weekly rupee spend.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOptimize}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-luxury-sm cursor-pointer ${
              isOptimized
                ? 'bg-primary-100 text-primary-900 border border-primary-300 cursor-default'
                : 'bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 hover:from-primary-800 text-gold-200 border border-gold-500/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>{isOptimized ? 'Budget Optimized (Saved ₹160!)' : 'Optimize Budget (Save ₹)'}</span>
          </button>
        </div>
      </div>

      {/* Budget Summary Progress Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-gold-600/30 backdrop-blur-xl shadow-luxury-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          
          <div>
            <span className="text-[10px] uppercase font-bold text-primary-900/60 tracking-wider block">
              Estimated Weekly Cart
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-3xl font-black text-primary-950">₹{totalEstimatedCost}</span>
              <span className="text-xs text-primary-900/60 font-medium">/ ₹{profile.weeklyBudgetInr} cap</span>
            </div>
            <span className="text-xs text-primary-800 font-bold mt-1 block">
              ₹{Math.max(0, profile.weeklyBudgetInr - totalEstimatedCost)} under budget ceiling
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-primary-900/60 tracking-wider block">
              Pantry Acquisition Progress
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-xl font-bold text-primary-950">
                {completedItemsCount} of {groceryItems.length} items
              </span>
              <span className="text-xs text-gold-800 font-bold">
                ({Math.round((completedItemsCount / groceryItems.length) * 100)}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-200 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-700 to-gold-500 transition-all duration-500"
                style={{ width: `${(completedItemsCount / groceryItems.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gold-50 border border-gold-200 text-xs text-primary-950">
            <span className="font-serif font-bold text-primary-950 block mb-0.5">💡 Desi Superfood Strategy:</span>
            <span className="font-medium text-primary-900/80">Purchasing dals and seasonal veggies from local mandis ensures fresh phytonutrients at 30% discount.</span>
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
              className="p-5 rounded-3xl bg-white border border-gold-500/25 shadow-luxury-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-surface-200">
                  <div className="p-2 rounded-xl bg-surface-100">{cat.icon}</div>
                  <h3 className="font-serif text-sm font-bold text-primary-950">{cat.label}</h3>
                </div>

                <div className="space-y-2.5">
                  {itemsInCat.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleGroceryItem(item.id)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                        item.completed
                          ? 'bg-surface-100 border-surface-300 opacity-60'
                          : 'bg-surface-50 border-surface-200 hover:border-gold-500/40'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center ${
                          item.completed
                            ? 'bg-primary-700 border-primary-700 text-white'
                            : 'border-surface-300 bg-white'
                        }`}>
                          {item.completed && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                        </div>
                        <div>
                          <span className={`text-xs font-bold block ${
                            item.completed ? 'line-through text-primary-900/50' : 'text-primary-950'
                          }`}>
                            {item.item}
                          </span>
                          <span className="text-[10px] text-primary-900/60 font-medium">{item.quantity}</span>
                          {item.notes && (
                            <span className="text-[10px] text-primary-800 block font-semibold mt-0.5">
                              {item.notes}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-xs font-black text-gold-800 shrink-0">
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
