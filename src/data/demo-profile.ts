import { UserProfile, NutritionProfile, MealItem, ProgressDay, GroceryItem, ChatMessage } from '../types/nutrition';

export const DEMO_USER: UserProfile = {
  id: 'demo-user-arjun',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@example.com',
  age: 26,
  gender: 'male',
  heightCm: 178,
  weightKg: 74,
  createdAt: '2026-08-10T08:00:00Z',
};

export const DEMO_NUTRITION_PROFILE: NutritionProfile = {
  id: 'demo-profile-arjun',
  userId: 'demo-user-arjun',
  goal: 'muscle_gain',
  activityLevel: 'moderately_active',
  dietaryPreference: 'vegetarian',
  cuisinePreferences: ['North Indian', 'Mediterranean', 'Indian'],
  allergies: [],
  foodsToAvoid: [],
  budgetLevel: 'moderate',
  weeklyBudgetInr: 1800,
  dailyCalories: 2400,
  proteinG: 145,
  carbsG: 265,
  fatsG: 68,
  fiberG: 34,
  waterLiters: 3.2,
  mealSchedule: ['breakfast', 'lunch', 'snacks', 'dinner'],
};

export const INITIAL_MEALS: MealItem[] = [
  {
    id: 'meal-1-breakfast',
    mealType: 'breakfast',
    name: 'High-Protein Paneer Vegetable Wrap',
    calories: 420,
    proteinG: 28,
    carbsG: 38,
    fatsG: 14,
    fiberG: 6,
    prepTimeMinutes: 15,
    aiScore: 95,
    estimatedCostInr: 65,
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    categoryTag: 'High Protein • Post-Workout Fuel',
    ingredients: [
      { name: 'Low-fat Paneer (crumbled)', quantity: '100g', calories: 200, proteinG: 18 },
      { name: 'Whole Wheat Roti / Tortilla', quantity: '1 piece', calories: 110, proteinG: 3 },
      { name: 'Bell Peppers & Onions', quantity: '60g', calories: 30, proteinG: 1 },
      { name: 'Hung Curd Green Mint Chutney', quantity: '2 tbsp', calories: 45, proteinG: 4 },
      { name: 'Olive oil drizzle & Chaat Masala', quantity: '1 tsp', calories: 35, proteinG: 0 }
    ],
    instructions: [
      'Sauté bell peppers, onions, and crumbled paneer on a non-stick pan with light olive oil and spice blend for 3-4 mins.',
      'Warm the whole wheat roti on a tawa.',
      'Spread mint-yogurt chutney, fill with spiced paneer mix, roll tightly, and slice diagonally.'
    ],
    isLogged: true,
    loggedAt: '08:30 AM'
  },
  {
    id: 'meal-2-lunch',
    mealType: 'lunch',
    name: 'Soya Chunk Biryani & Cucumber Raita',
    calories: 680,
    proteinG: 46,
    carbsG: 82,
    fatsG: 16,
    fiberG: 11,
    prepTimeMinutes: 25,
    aiScore: 96,
    estimatedCostInr: 75,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    categoryTag: 'Lean Plant Protein • Sustained Energy',
    ingredients: [
      { name: 'Soya Chunks (boiled & squeezed)', quantity: '65g dry', calories: 230, proteinG: 34 },
      { name: 'Basmati Rice (cooked with whole spices)', quantity: '150g', calories: 210, proteinG: 4 },
      { name: 'Low-fat Greek Yogurt / Curd', quantity: '100g', calories: 70, proteinG: 6 },
      { name: 'Finely Chopped Cucumber & Mint', quantity: '50g', calories: 15, proteinG: 0.5 },
      { name: 'Carrots, Peas & Biryani Masala', quantity: '80g', calories: 65, proteinG: 2 }
    ],
    instructions: [
      'Boil soya chunks in salted water, drain and squeeze excess water completely.',
      'Marinate soya chunks with yogurt, biryani spices, and a pinch of turmeric for 10 minutes.',
      'Sauté onions, tomatoes, and mixed veggies; layer cooked basmati rice and marinated soya chunks.',
      'Cover with lid on low heat for 8 minutes. Serve hot with chilled cucumber raita.'
    ],
    isLogged: true,
    loggedAt: '01:15 PM'
  },
  {
    id: 'meal-3-snacks',
    mealType: 'snacks',
    name: 'Roasted Sattu Protein Shake & Mixed Nuts',
    calories: 380,
    proteinG: 24,
    carbsG: 42,
    fatsG: 12,
    fiberG: 8,
    prepTimeMinutes: 5,
    aiScore: 92,
    estimatedCostInr: 40,
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    categoryTag: 'Desi Superfood • Budget Protein Powerhouse',
    ingredients: [
      { name: 'Chana Sattu Powder', quantity: '40g', calories: 160, proteinG: 11 },
      { name: 'Skimmed Milk / Soy Milk', quantity: '250ml', calories: 90, proteinG: 8 },
      { name: 'Roasted Almonds & Walnuts', quantity: '15g', calories: 95, proteinG: 3 },
      { name: 'Roasted Cumin & Black Salt / Dash of Honey', quantity: '1 pinch', calories: 20, proteinG: 0 }
    ],
    instructions: [
      'Add sattu powder and cold milk or water into a shaker with roasted jeera powder and rock salt.',
      'Shake vigorously until smooth and frothy.',
      'Enjoy chilled alongside a handful of crunchy roasted almonds and walnuts.'
    ],
    isLogged: false
  },
  {
    id: 'meal-4-dinner',
    mealType: 'dinner',
    name: 'Yellow Dal Tadka, Tofu Bhurji & Multigrain Rotis',
    calories: 620,
    proteinG: 44,
    carbsG: 70,
    fatsG: 18,
    fiberG: 12,
    prepTimeMinutes: 20,
    aiScore: 94,
    estimatedCostInr: 68,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    categoryTag: 'Nighttime Recovery • Easy Digestion',
    ingredients: [
      { name: 'Organic Tofu / Paneer (scrambled)', quantity: '120g', calories: 180, proteinG: 20 },
      { name: 'Yellow Moong Dal (cooked)', quantity: '1 bowl / 200ml', calories: 190, proteinG: 14 },
      { name: 'Multigrain Rotis (Oats + Wheat)', quantity: '2 pieces', calories: 170, proteinG: 6 },
      { name: 'Ghee Tadka (Cumin, Garlic, Hing)', quantity: '1 tsp', calories: 45, proteinG: 0 },
      { name: 'Fresh Coriander & Lemon', quantity: 'Garnish', calories: 10, proteinG: 0 }
    ],
    instructions: [
      'Prepare light yellow moong dal with turmeric, ginger, and finish with a fragrant garlic-cumin tadka.',
      'Crumble fresh tofu/paneer and toss with chopped onions, tomatoes, green chillies, and turmeric.',
      'Serve warm with 2 fresh multigrain rotis and green salad.'
    ],
    isLogged: false
  }
];

export const PROGRESS_HISTORY: ProgressDay[] = [
  {
    date: '2026-08-18',
    dayLabel: 'Mon',
    weightKg: 74.8,
    caloriesConsumed: 2360,
    calorieTarget: 2400,
    proteinConsumedG: 142,
    proteinTargetG: 145,
    waterConsumedL: 3.1,
    waterTargetL: 3.2,
    adherenceScore: 96,
    mealsLoggedCount: 4
  },
  {
    date: '2026-08-19',
    dayLabel: 'Tue',
    weightKg: 74.6,
    caloriesConsumed: 2420,
    calorieTarget: 2400,
    proteinConsumedG: 148,
    proteinTargetG: 145,
    waterConsumedL: 3.4,
    waterTargetL: 3.2,
    adherenceScore: 98,
    mealsLoggedCount: 4
  },
  {
    date: '2026-08-20',
    dayLabel: 'Wed',
    weightKg: 74.5,
    caloriesConsumed: 2390,
    calorieTarget: 2400,
    proteinConsumedG: 140,
    proteinTargetG: 145,
    waterConsumedL: 3.0,
    waterTargetL: 3.2,
    adherenceScore: 94,
    mealsLoggedCount: 4
  },
  {
    date: '2026-08-21',
    dayLabel: 'Thu',
    weightKg: 74.3,
    caloriesConsumed: 2440,
    calorieTarget: 2400,
    proteinConsumedG: 152,
    proteinTargetG: 145,
    waterConsumedL: 3.3,
    waterTargetL: 3.2,
    adherenceScore: 97,
    mealsLoggedCount: 4
  },
  {
    date: '2026-08-22',
    dayLabel: 'Fri',
    weightKg: 74.2,
    caloriesConsumed: 2310,
    calorieTarget: 2400,
    proteinConsumedG: 138,
    proteinTargetG: 145,
    waterConsumedL: 2.9,
    waterTargetL: 3.2,
    adherenceScore: 91,
    mealsLoggedCount: 4
  },
  {
    date: '2026-08-23',
    dayLabel: 'Sat',
    weightKg: 74.1,
    caloriesConsumed: 2450,
    calorieTarget: 2400,
    proteinConsumedG: 149,
    proteinTargetG: 145,
    waterConsumedL: 3.5,
    waterTargetL: 3.2,
    adherenceScore: 99,
    mealsLoggedCount: 4
  },
  {
    date: '2026-08-24',
    dayLabel: 'Sun (Today)',
    weightKg: 74.0,
    caloriesConsumed: 1100, // Partial day logged
    calorieTarget: 2400,
    proteinConsumedG: 74,
    proteinTargetG: 145,
    waterConsumedL: 2.2,
    waterTargetL: 3.2,
    adherenceScore: 95,
    mealsLoggedCount: 2
  }
];

export const INITIAL_GROCERY_ITEMS: GroceryItem[] = [
  { id: 'g-1', category: 'protein', item: 'Low-Fat Paneer / Tofu', quantity: '500g', estimatedPriceInr: 160, completed: true },
  { id: 'g-2', category: 'protein', item: 'Organic Soya Chunks', quantity: '400g pack', estimatedPriceInr: 65, completed: true },
  { id: 'g-3', category: 'protein', item: 'Chana Sattu Powder', quantity: '500g', estimatedPriceInr: 75, completed: false },
  { id: 'g-4', category: 'protein', item: 'Yellow Moong Dal & Chana Dal', quantity: '1 kg', estimatedPriceInr: 130, completed: false },
  { id: 'g-5', category: 'vegetables', item: 'Spinach / Palak & Broccoli', quantity: '500g', estimatedPriceInr: 60, completed: true },
  { id: 'g-6', category: 'vegetables', item: 'Bell Peppers & Carrots', quantity: '600g', estimatedPriceInr: 55, completed: false },
  { id: 'g-7', category: 'vegetables', item: 'Tomatoes & Red Onions', quantity: '2 kg', estimatedPriceInr: 70, completed: true },
  { id: 'g-8', category: 'vegetables', item: 'Cucumbers & Fresh Mint', quantity: '500g', estimatedPriceInr: 30, completed: false },
  { id: 'g-9', category: 'fruits', item: 'Bananas & Green Apples', quantity: '1 dozen / 4 pcs', estimatedPriceInr: 120, completed: false },
  { id: 'g-10', category: 'fruits', item: 'Papaya / Seasonal Berries', quantity: '1 kg', estimatedPriceInr: 85, completed: false },
  { id: 'g-11', category: 'grains_pantry', item: 'Whole Wheat Flour (Atta) + Rolled Oats', quantity: '2 kg', estimatedPriceInr: 140, completed: true },
  { id: 'g-12', category: 'grains_pantry', item: 'Basmati Brown/White Rice', quantity: '1 kg', estimatedPriceInr: 95, completed: true },
  { id: 'g-13', category: 'dairy', item: 'Toned Milk & Curd/Greek Yogurt', quantity: '3 Liters / 500g', estimatedPriceInr: 170, completed: false },
  { id: 'g-14', category: 'spices_other', item: 'Raw Almonds & Walnuts', quantity: '200g', estimatedPriceInr: 180, completed: true }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "Namaste Arjun! 🙏 I'm **Saarthi AI**, your personal nutrition intelligence companion.\n\nI've calibrated your muscle gain plan for **2,400 kcal** with **145g protein** on a budget of **₹1,800/week**. How can I assist your nutrition journey today?",
    timestamp: '10:00 AM',
    suggestedActions: [
      'Can I eat rice for dinner?',
      'High-protein Indian breakfast under ₹100',
      'What can I eat after my workout?',
      'Suggest a healthy alternative to samosa'
    ]
  }
];
