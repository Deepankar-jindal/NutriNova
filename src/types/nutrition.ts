export type GoalType = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'better_energy' | 'general_wellness';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
export type DietaryPreference = 'vegetarian' | 'vegan' | 'eggetarian' | 'non_vegetarian';
export type CuisineType = 'Indian' | 'North Indian' | 'South Indian' | 'Mediterranean' | 'Asian' | 'Custom';
export type BudgetLevel = 'budget' | 'moderate' | 'premium';
export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  createdAt: string;
}

export interface NutritionTargets {
  dailyCalories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  fiberG: number;
  waterLiters: number;
  weeklyBudgetInr: number;
}

export interface NutritionProfile extends NutritionTargets {
  id: string;
  userId: string;
  goal: GoalType;
  activityLevel: ActivityLevel;
  dietaryPreference: DietaryPreference;
  cuisinePreferences: string[];
  allergies: string[];
  foodsToAvoid: string[];
  budgetLevel: BudgetLevel;
  mealSchedule: MealType[];
}

export interface MealIngredient {
  name: string;
  quantity: string;
  calories?: number;
  proteinG?: number;
}

export interface MealItem {
  id: string;
  dietPlanId?: string;
  mealType: MealType;
  name: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  fiberG: number;
  prepTimeMinutes: number;
  aiScore: number;
  estimatedCostInr: number;
  imageUrl: string;
  ingredients: MealIngredient[];
  instructions: string[];
  isLogged?: boolean;
  loggedAt?: string;
  categoryTag?: string;
}

export interface FoodLog {
  id: string;
  userId: string;
  mealId?: string;
  mealName: string;
  mealType: MealType | 'other';
  consumedAt: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  portionSizeG?: number;
  source: 'manual' | 'plan' | 'scanner' | 'swap';
}

export interface ProgressDay {
  date: string;
  dayLabel: string;
  weightKg: number;
  caloriesConsumed: number;
  calorieTarget: number;
  proteinConsumedG: number;
  proteinTargetG: number;
  waterConsumedL: number;
  waterTargetL: number;
  adherenceScore: number; // 0 - 100
  mealsLoggedCount: number;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  dietaryCategory: DietaryPreference;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  fiberG: number;
  prepTimeMinutes: number;
  costInr: number;
  aiNutritionScore: number;
  imageUrl: string;
  ingredients: MealIngredient[];
  instructions: string[];
  tags: string[];
  isFavorite?: boolean;
}

export interface GroceryItem {
  id: string;
  category: 'vegetables' | 'protein' | 'fruits' | 'grains_pantry' | 'dairy' | 'spices_other';
  item: string;
  quantity: string;
  estimatedPriceInr: number;
  completed: boolean;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface FoodScanResult {
  foodName: string;
  confidence: number;
  servingSize: string;
  servingWeightG: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  fiberG: number;
  healthScore: number;
  glycemicIndex: 'Low' | 'Medium' | 'High';
  aiSummary: string;
  pros: string[];
  cons: string[];
  healthierAlternatives: Array<{
    name: string;
    calories: number;
    proteinG: number;
    whyBetter: string;
  }>;
}

export interface SwapOption {
  originalMeal: MealItem;
  alternativeMeal: MealItem;
  reason: string;
  aiRationale: string;
  costDeltaInr: number;
  calorieDelta: number;
  proteinDelta: number;
}
