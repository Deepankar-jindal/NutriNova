'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Clock,
  IndianRupee,
  Bookmark,
  BookmarkCheck,
  Flame,
  Dumbbell,
  Filter,
} from 'lucide-react';
import { SAMPLE_RECIPES } from '../../data/sample-recipes';
import { Recipe } from '../../types/nutrition';
import { useNutrition } from '../../context/NutritionContext';
import { RecipeModal } from '../../components/dashboard/RecipeModal';

export default function RecipesPage() {
  const { favorites, toggleFavoriteRecipe } = useNutrition();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const filterTags = [
    'All',
    'High Protein',
    'Budget Friendly',
    'Quick Meals',
    'Vegetarian',
    'Vegan',
    'Post Workout',
    'Low Calorie',
    'Favorites ❤️',
  ];

  const filteredRecipes = SAMPLE_RECIPES.filter((recipe) => {
    // Search query match
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedTag === 'All') return true;
    if (selectedTag === 'Favorites ❤️') return favorites.includes(recipe.id);
    return recipe.tags.includes(selectedTag);
  });

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pt-4 border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Bio-Culinary Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Recipe &amp; Meal Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Nutritionally verified recipes with exact macro splits, preparation steps, and cost per serving.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-100 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Filter Tag Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {filterTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-sm'
                  : 'bg-surface-100 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const isFav = favorites.includes(recipe.id);

          return (
            <div
              key={recipe.id}
              className="group rounded-3xl bg-surface-100/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-transparent to-black/40" />

                {/* Score & Favorite */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-surface-DEFAULT/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>AI Score {recipe.aiNutritionScore}/100</span>
                  </span>

                  <button
                    onClick={() => toggleFavoriteRecipe(recipe.id)}
                    className="p-2 rounded-xl bg-surface-DEFAULT/80 border border-slate-700 text-slate-300 hover:text-rose-400 transition backdrop-blur-md"
                  >
                    {isFav ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-amber-400 bg-surface-DEFAULT/80 px-2 py-0.5 rounded-lg border border-amber-500/20 backdrop-blur-md">
                  {recipe.cuisine}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {recipe.name}
                  </h4>

                  {/* Macro Matrix */}
                  <div className="grid grid-cols-4 gap-1.5 my-3 p-2 rounded-xl bg-surface-200/60 border border-slate-800 text-center">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block font-semibold">Calories</span>
                      <span className="text-xs font-black text-white">{recipe.calories}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-cyan-400 uppercase block font-semibold">Protein</span>
                      <span className="text-xs font-black text-cyan-300">{recipe.proteinG}g</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-amber-400 uppercase block font-semibold">Carbs</span>
                      <span className="text-xs font-black text-amber-300">{recipe.carbsG}g</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-rose-400 uppercase block font-semibold">Fats</span>
                      <span className="text-xs font-black text-rose-300">{recipe.fatsG}g</span>
                    </div>
                  </div>

                  {/* Meta items */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {recipe.prepTimeMinutes} mins
                    </span>
                    <span className="flex items-center gap-0.5 font-bold text-emerald-400">
                      <IndianRupee className="w-3.5 h-3.5" />
                      ~{recipe.costInr} / serving
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setActiveRecipe(recipe)}
                  className="w-full py-2.5 rounded-xl bg-surface-200 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View Recipe &amp; Ingredients</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Modal */}
      {activeRecipe && (
        <RecipeModal
          meal={{
            id: activeRecipe.id,
            mealType: 'breakfast',
            name: activeRecipe.name,
            calories: activeRecipe.calories,
            proteinG: activeRecipe.proteinG,
            carbsG: activeRecipe.carbsG,
            fatsG: activeRecipe.fatsG,
            fiberG: activeRecipe.fiberG,
            prepTimeMinutes: activeRecipe.prepTimeMinutes,
            aiScore: activeRecipe.aiNutritionScore,
            estimatedCostInr: activeRecipe.costInr,
            imageUrl: activeRecipe.imageUrl,
            ingredients: activeRecipe.ingredients,
            instructions: activeRecipe.instructions,
          }}
          isOpen={Boolean(activeRecipe)}
          onClose={() => setActiveRecipe(null)}
        />
      )}

    </div>
  );
}
