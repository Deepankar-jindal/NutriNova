import { GoalType, ActivityLevel, DietaryPreference, NutritionTargets } from '../types/nutrition';

export function calculateBMR(gender: 'male' | 'female' | 'other', weightKg: number, heightCm: number, age: number): number {
  // Mifflin-St Jeor Formula
  if (gender === 'female') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
  }
  // Male & other fallback
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
}

export function getActivityMultiplier(activity: ActivityLevel): number {
  switch (activity) {
    case 'sedentary':
      return 1.2;
    case 'lightly_active':
      return 1.375;
    case 'moderately_active':
      return 1.55;
    case 'very_active':
      return 1.725;
    default:
      return 1.375;
  }
}

export function calculateNutritionTargets(
  gender: 'male' | 'female' | 'other',
  weightKg: number,
  heightCm: number,
  age: number,
  goal: GoalType,
  activity: ActivityLevel,
  weeklyBudgetInr: number = 1800
): NutritionTargets {
  const bmr = calculateBMR(gender, weightKg, heightCm, age);
  const tdee = Math.round(bmr * getActivityMultiplier(activity));

  let dailyCalories = tdee;
  let proteinRatio = 1.6; // grams per kg

  switch (goal) {
    case 'weight_loss':
      dailyCalories = Math.max(1300, Math.round(tdee * 0.8)); // 20% deficit
      proteinRatio = 1.8; // higher protein to preserve muscle
      break;
    case 'muscle_gain':
      dailyCalories = Math.round(tdee * 1.12); // 12% surplus
      proteinRatio = 2.0; // high protein for hypertrophy
      break;
    case 'better_energy':
      dailyCalories = Math.round(tdee * 1.02);
      proteinRatio = 1.5;
      break;
    case 'general_wellness':
    case 'maintenance':
    default:
      dailyCalories = tdee;
      proteinRatio = 1.4;
      break;
  }

  // Protein calculations
  const proteinG = Math.round(weightKg * proteinRatio);
  const proteinCalories = proteinG * 4;

  // Fat calculation (25-30% of total calories)
  const fatCalories = Math.round(dailyCalories * 0.26);
  const fatsG = Math.round(fatCalories / 9);

  // Remainder is Carbohydrates
  const remainingCalories = Math.max(0, dailyCalories - proteinCalories - fatCalories);
  const carbsG = Math.round(remainingCalories / 4);

  // Fiber: ~14g per 1000 kcal
  const fiberG = Math.round(Math.max(25, (dailyCalories / 1000) * 14));

  // Water: ~38ml per kg body weight + bonus for activity
  const activityWaterBonus = activity === 'very_active' ? 0.7 : activity === 'moderately_active' ? 0.4 : 0.2;
  const waterLiters = Number(((weightKg * 0.038) + activityWaterBonus).toFixed(1));

  return {
    dailyCalories,
    proteinG,
    carbsG,
    fatsG,
    fiberG,
    waterLiters,
    weeklyBudgetInr,
  };
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
