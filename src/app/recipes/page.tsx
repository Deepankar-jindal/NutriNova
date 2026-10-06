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
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FAF7F2]">
      
      {/* Header */}
      <div className="pt-4 border-b border-surface-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold mb-2 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-primary-700" />
            <span>Curated Bio-Culinary Catalog</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-black text-primary-950 tracking-tight">
            Recipe &amp; Meal Discovery
          </h1>
          <p className="text-xs sm:text-sm text-primary-900/70 mt-1 font-medium">
            Nutritionally verified recipes with exact macro splits, preparation steps, and cost per serving.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-primary-700/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-surface-300 rounded-2xl text-xs text-primary-950 placeholder-primary-900/40 focus:outline-none focus:border-gold-600 transition shadow-sm"
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
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-200 border border-gold-500/40 shadow-sm'
                  : 'bg-white text-primary-900/70 hover:text-primary-950 border border-surface-200 shadow-sm'
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
              className="group rounded-3xl bg-white border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-luxury-sm hover:shadow-luxury-md"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />

                {/* Score & Favorite */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/95 border border-gold-500/40 text-gold-900 text-[10px] font-extrabold backdrop-blur-md flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-gold-600" />
                    <span>AI Score {recipe.aiNutritionScore}/100</span>
                  </span>

                  <button
                    onClick={() => toggleFavoriteRecipe(recipe.id)}
                    className="p-2 rounded-xl bg-white/90 border border-surface-300 text-primary-900/60 hover:text-rose-600 transition backdrop-blur-md shadow-sm cursor-pointer"
                  >
                    {isFav ? (
                      <BookmarkCheck className="w-4 h-4 text-primary-700" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-primary-900 bg-white/90 px-2.5 py-0.5 rounded-lg border border-gold-500/30 backdrop-blur-md shadow-sm">
                  {recipe.cuisine}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-primary-950 group-hover:text-gold-700 transition-colors">
                    {recipe.name}
                  </h4>

                  {/* Macro Matrix */}
                  <div className="grid grid-cols-4 gap-1.5 my-3 p-2.5 rounded-2xl bg-surface-100 border border-surface-200 text-center">
                    <div>
                      <span className="text-[9px] text-primary-900/60 uppercase block font-bold">Calories</span>
                      <span className="text-xs font-black text-primary-950">{recipe.calories}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gold-700 uppercase block font-bold">Protein</span>
                      <span className="text-xs font-black text-gold-800">{recipe.proteinG}g</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-amber-700 uppercase block font-bold">Carbs</span>
                      <span className="text-xs font-black text-amber-800">{recipe.carbsG}g</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-rose-700 uppercase block font-bold">Fats</span>
                      <span className="text-xs font-black text-rose-800">{recipe.fatsG}g</span>
                    </div>
                  </div>

                  {/* Meta items */}
                  <div className="flex items-center justify-between text-xs text-primary-900/70 mb-4 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary-700" />
                      {recipe.prepTimeMinutes} mins
                    </span>
                    <span className="flex items-center gap-0.5 font-bold text-primary-950">
                      <IndianRupee className="w-3.5 h-3.5 text-gold-600" />
                      ~{recipe.costInr} / serving
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setActiveRecipe(recipe)}
                  className="w-full py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-300 text-xs font-bold text-primary-950 transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-primary-700" />
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
