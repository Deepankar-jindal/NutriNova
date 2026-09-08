import { NutritionProfile, MealItem, SwapOption, GoalType } from '../types/nutrition';
import { calculateNutritionTargets } from './nutrition-calculator';

export interface WhatIfResult {
  previousBudget: number;
  newBudget: number;
  previousGoal: GoalType;
  newGoal: GoalType;
  updatedTargets: {
    calories: number;
    proteinG: number;
    carbsG: number;
    fatsG: number;
  };
  costSavingsInr: number;
  summaryExplanation: string;
  keyChanges: Array<{
    category: string;
    original: string;
    replacement: string;
    reason: string;
    costImpact: string;
  }>;
  aiAdvice: string;
}

export class AIService {
  static async askNutritionAI(
    userMessage: string,
    profile: NutritionProfile,
    currentCaloriesConsumed: number
  ): Promise<string> {
    const lower = userMessage.toLowerCase();
    const medicalKeywords = ['diabetes', 'thyroid', 'cancer', 'blood pressure', 'hypertension', 'pcos', 'medication', 'insulin', 'kidney stone', 'doctor', 'disease'];
    const hasMedicalQuery = medicalKeywords.some(kw => lower.includes(kw));
    let response = '';

    if (hasMedicalQuery) {
      response = `⚠️ **Medical Guidance Note**:
*Please consult a qualified healthcare professional, physician, or certified clinical dietitian before making significant dietary alterations for any medical condition.*\n\n`;
    }

    if (lower.includes('rice') && lower.includes('dinner')) {
      response += `Yes, absolutely! Having rice at dinner is completely fine for your **${profile.goal.replace('_', ' ')}** goal. 

**Saarthi's Recommendations:**
1. **Portion Control**: Aim for 100g-150g cooked rice (~130-195 kcal).
2. **Protein Pairing**: Combine it with a solid protein anchor (like 100g low-fat paneer, tofu bhurji, or thick moong dal) to slow down gastric emptying and maintain steady overnight blood glucose levels.
3. **Fiber Boost**: Add a bowl of steamed cucumbers, carrots, or spinach.
4. **Current Status**: You have **${Math.max(0, profile.dailyCalories - currentCaloriesConsumed)} kcal** remaining today, easily accommodating a balanced rice dinner!`;
    } else if (lower.includes('breakfast') && (lower.includes('100') || lower.includes('budget') || lower.includes('cheap') || lower.includes('protein'))) {
      response += `Here are **3 High-Protein Indian Breakfasts under ₹75** perfectly suited for your **₹${profile.weeklyBudgetInr}/week** plan:

1. **Moong Dal & Palak Chilla** (Cost: ~₹35 | 22g Protein | 310 kcal)
   - Made from soaked yellow moong dal batter loaded with chopped spinach and ginger.
2. **Roasted Sattu Super Drink + 2 Boiled Eggs/Sprouts** (Cost: ~₹40 | 25g Protein | 330 kcal)
   - 40g Chana Sattu shaken with cold water, roasted jeera, and lemon juice.
3. **Paneer Bhurji with 2 Multigrain Rotis** (Cost: ~₹65 | 28g Protein | 420 kcal)
   - 100g crumbled fresh paneer tossed with onions, tomatoes, and green chillies.`;
    } else if (lower.includes('workout') || lower.includes('post-workout') || lower.includes('gym')) {
      response += `For your **Muscle Gain** focus (targeting **${profile.proteinG}g protein/day**), here is the optimal post-workout protocol:

- **Timing**: Consume within 45–90 minutes post-training.
- **Ideal Ratio**: 25–35g rapid/moderate digesting protein + 40–60g carbohydrates to replenish muscle glycogen.
- **Top Picks**:
  1. **Roasted Chana Sattu Shake with Milk & 1 Banana** (26g Protein | 380 kcal | ₹35)
  2. **Paneer / Tofu Toast on Whole Grain Bread** (24g Protein | 340 kcal | ₹55)
  3. **4 Egg White Omelette with Oats Pinwheel** (28g Protein | 320 kcal | ₹45)`;
    } else if (lower.includes('samosa') || lower.includes('junk') || lower.includes('cravings') || lower.includes('snack')) {
      response += `Standard fried samosas pack **260-300 kcal each** with **14g+ oxidized fats** and almost no protein.

Here are **3 guilt-free alternatives** that satisfy the crunchy, savory craving:
1. **Air-Fried Moong Dal Samosa / Patties**: 120 kcal, 8g protein, 80% less fat.
2. **Spiced Roasted Makhana & Peanuts**: Tossed in 1/2 tsp ghee with chaat masala and black pepper (180 kcal, 6g protein, high magnesium).
3. **Air-Crisped Paneer Tikka Cubes**: Marinated in tandoori spices and lemon (220 kcal, 18g protein).`;
    } else if (lower.includes('budget') || lower.includes('money') || lower.includes('cost')) {
      response += `Your weekly budget is set to **₹${profile.weeklyBudgetInr}** (~₹${Math.round(profile.weeklyBudgetInr / 7)}/day).

**Top AI Budget Nutrition Hacks:**
- **Sattu over Imported Whey**: ₹75/500g provides over 100g of pure plant protein.
- **Soya Chunks**: At ₹60/400g with 52% protein density, it is India's most cost-effective protein source.
- **Seasonal Local Veggies**: Buy local spinach, gourds, and carrots from weekly mandi to save 30-40% compared to supermarkets.`;
    } else {
      response += `Great question regarding your nutrition! Based on your target of **${profile.dailyCalories} kcal** and **${profile.proteinG}g protein**:

- Make sure to prioritize whole-food protein distribution across all 4 meals (~30-35g per meal).
- Drink at least **${profile.waterLiters}L of water** throughout the day to support nutrient partitioning.
- You can use the **What-If Optimizer** in the navigation to simulate different budget or goal scenarios in real-time!

Is there a specific meal or ingredient you'd like me to analyze for you?`;
    }

    return response;
  }
  static getMealSwapOptions(originalMeal: MealItem, reason: string): SwapOption[] {
    const swapCatalog: Record<string, MealItem[]> = {
      lower_calories: [
        {
          id: `swap-lowcal-${Date.now()}-1`,
          mealType: originalMeal.mealType,
          name: 'Moong Dal Spinach Chilla with Mint Raita',
          calories: Math.max(220, originalMeal.calories - 140),
          proteinG: Math.max(18, originalMeal.proteinG - 4),
          carbsG: 32,
          fatsG: 6,
          fiberG: 9,
          prepTimeMinutes: 12,
          aiScore: 97,
          estimatedCostInr: 40,
          imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
          categoryTag: 'Calorie Deficit Friendly • High Fiber',
          ingredients: [
            { name: 'Yellow Moong Dal Batter', quantity: '60g dry', calories: 180, proteinG: 14 },
            { name: 'Fresh Spinach & Herbs', quantity: '50g', calories: 20, proteinG: 1 },
            { name: 'Low-Fat Curd Dip', quantity: '50g', calories: 40, proteinG: 3 }
          ],
          instructions: [
            'Spread thin chilla batter on hot non-stick tawa with minimal oil.',
            'Cook till crisp on both sides and serve with cooling curd dip.'
          ]
        },
        {
          id: `swap-lowcal-${Date.now()}-2`,
          mealType: originalMeal.mealType,
          name: 'Grilled Herbed Tofu & Vegetable Stir-Fry',
          calories: Math.max(240, originalMeal.calories - 120),
          proteinG: Math.max(22, originalMeal.proteinG + 2),
          carbsG: 18,
          fatsG: 9,
          fiberG: 7,
          prepTimeMinutes: 15,
          aiScore: 95,
          estimatedCostInr: 55,
          imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
          categoryTag: 'Lean Protein • Low Calorie',
          ingredients: [
            { name: 'Organic Firm Tofu', quantity: '140g', calories: 160, proteinG: 19 },
            { name: 'Broccoli, Zucchini & Bell Peppers', quantity: '120g', calories: 50, proteinG: 3 }
          ],
          instructions: [
            'Pan sear tofu cubes in 1/2 tsp cold pressed oil with ginger and garlic.',
            'Toss with flash-steamed veggies and a splash of soy sauce.'
          ]
        }
      ],
      higher_protein: [
        {
          id: `swap-highprot-${Date.now()}-1`,
          mealType: originalMeal.mealType,
          name: 'Double-Protein Soya & Paneer Scramble Bowl',
          calories: originalMeal.calories + 40,
          proteinG: Math.round(originalMeal.proteinG * 1.35),
          carbsG: 35,
          fatsG: 15,
          fiberG: 10,
          prepTimeMinutes: 18,
          aiScore: 99,
          estimatedCostInr: 60,
          imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
          categoryTag: 'Hypertrophy Booster • 40g+ Protein',
          ingredients: [
            { name: 'Soya Chunks (minced)', quantity: '40g dry', calories: 140, proteinG: 21 },
            { name: 'Low-Fat Paneer', quantity: '100g', calories: 190, proteinG: 18 },
            { name: 'Spices & Tomatoes', quantity: '60g', calories: 35, proteinG: 1 }
          ],
          instructions: [
            'Sauté minced soya and paneer with cumin, turmeric, and chopped tomatoes until fragrant.'
          ]
        }
      ],
      cheaper: [
        {
          id: `swap-cheap-${Date.now()}-1`,
          mealType: originalMeal.mealType,
          name: 'Spiced Roasted Sattu Bowl & Mixed Sprouts',
          calories: originalMeal.calories - 20,
          proteinG: Math.round(originalMeal.proteinG * 0.95),
          carbsG: 45,
          fatsG: 6,
          fiberG: 12,
          prepTimeMinutes: 5,
          aiScore: 94,
          estimatedCostInr: 22,
          imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
          categoryTag: 'Budget Champion • Cost < ₹25',
          ingredients: [
            { name: 'Chana Sattu Powder', quantity: '50g', calories: 190, proteinG: 14 },
            { name: 'Moong Sprouts', quantity: '80g', calories: 80, proteinG: 8 }
          ],
          instructions: [
            'Toss fresh sprouts with lemon juice, rock salt, and drink spiced sattu alongside.'
          ]
        }
      ]
    };

    const targetList = swapCatalog[reason] || swapCatalog['lower_calories'];

    return targetList.map(alt => {
      const calorieDelta = alt.calories - originalMeal.calories;
      const proteinDelta = alt.proteinG - originalMeal.proteinG;
      const costDeltaInr = alt.estimatedCostInr - originalMeal.estimatedCostInr;

      let aiRationale = '';
      if (reason === 'lower_calories') {
        aiRationale = `Swapped for a nutrient-dense alternative saving ${Math.abs(calorieDelta)} kcal while maintaining ${alt.proteinG}g protein to preserve lean muscle mass.`;
      } else if (reason === 'higher_protein') {
        aiRationale = `Boosts protein by +${proteinDelta}g using high biological value vegetarian proteins with minimal extra caloric load.`;
      } else if (reason === 'cheaper') {
        aiRationale = `Saves ₹${Math.abs(costDeltaInr)} per serving by utilizing local superfoods like Sattu and Moong without compromising total protein.`;
      } else {
        aiRationale = `Optimized for balanced macronutrients and superior dietary fiber adherence.`;
      }

      return {
        originalMeal,
        alternativeMeal: alt,
        reason,
        aiRationale,
        costDeltaInr,
        calorieDelta,
        proteinDelta,
      };
    });
  }

  /**
   * Real-time "What-If?" Simulation Engine
   */
  static simulateWhatIf(
    currentProfile: NutritionProfile,
    newBudget: number,
    newGoal: GoalType,
    newDietPreference: 'vegetarian' | 'vegan' | 'eggetarian' | 'non_vegetarian'
  ): WhatIfResult {
    const updatedTargets = calculateNutritionTargets(
      'male',
      74, // weight
      178, // height
      26, // age
      newGoal,
      currentProfile.activityLevel,
      newBudget
    );

    const costSavingsInr = currentProfile.weeklyBudgetInr - newBudget;

    let summaryExplanation = '';
    const keyChanges: WhatIfResult['keyChanges'] = [];

    if (newBudget < currentProfile.weeklyBudgetInr) {
      summaryExplanation = `By adjusting your weekly budget from ₹${currentProfile.weeklyBudgetInr} to ₹${newBudget} (saving ₹${costSavingsInr}/wk), Saarthi dynamically optimizes your grocery list by swapping premium items (like imported whey, exotic berries, and high-end nuts) with potent Indian superfoods (like Chana Sattu, Roasted Peanuts, Soya Chunks, and Seasonal Mandi Greens).`;

      keyChanges.push({
        category: 'Protein Sources',
        original: 'Imported Whey / Premium Greek Yogurt (₹180/wk)',
        replacement: 'Desi Roasted Chana Sattu + Soya Chunks (₹60/wk)',
        reason: 'Maintains 100% of protein targets at 1/3rd of the cost.',
        costImpact: '- ₹120/week'
      });

      keyChanges.push({
        category: 'Healthy Fats & Snacks',
        original: 'California Almonds & Walnuts (₹200/wk)',
        replacement: 'Roasted Peanuts & White Sesame Seeds (₹65/wk)',
        reason: 'Delivers equivalent healthy monounsaturated fats and zinc.',
        costImpact: '- ₹135/week'
      });

      keyChanges.push({
        category: 'Fruits & Berries',
        original: 'Blueberries & Avocados (₹250/wk)',
        replacement: 'Local Papaya, Guava & Bananas (₹90/wk)',
        reason: 'Superior Vitamin C and digestive enzymes at local market rates.',
        costImpact: '- ₹160/week'
      });
    } else {
      summaryExplanation = `With an expanded budget of ₹${newBudget}/week, Saarthi introduces gourmet nutritional diversity including organic cold-pressed oils, premium Greek yogurts, artisanal sourdoughs, and antioxidant-rich berry blends.`;

      keyChanges.push({
        category: 'Superfoods',
        original: 'Standard Cooking Oil',
        replacement: 'Cold-Pressed Extra Virgin Olive Oil & A2 Cow Ghee',
        reason: 'Optimizes anti-inflammatory omega-3 to omega-6 ratio.',
        costImpact: '+ ₹150/week'
      });
    }

    let aiAdvice = '';
    if (newGoal === 'weight_loss') {
      aiAdvice = `Targeting a **20% caloric deficit (${updatedTargets.dailyCalories} kcal)** with elevated protein (**${updatedTargets.proteinG}g**) ensures you burn adipose fat while preserving lean metabolic tissue.`;
    } else if (newGoal === 'muscle_gain') {
      aiAdvice = `A clean **12% caloric surplus (${updatedTargets.dailyCalories} kcal)** coupled with **${updatedTargets.proteinG}g protein** fuels muscle protein synthesis and progressive overload recovery.`;
    } else {
      aiAdvice = `Maintains **euglycemic energy balance** with balanced macro partitioning to sustain all-day mental focus and stamina.`;
    }

    return {
      previousBudget: currentProfile.weeklyBudgetInr,
      newBudget,
      previousGoal: currentProfile.goal,
      newGoal,
      updatedTargets: {
        calories: updatedTargets.dailyCalories,
        proteinG: updatedTargets.proteinG,
        carbsG: updatedTargets.carbsG,
        fatsG: updatedTargets.fatsG,
      },

    };
  }
}
