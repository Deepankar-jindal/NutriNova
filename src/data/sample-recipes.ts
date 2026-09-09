import { Recipe } from '../types/nutrition';

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    name: 'Moong Dal & Palak Chilla',
    cuisine: 'North Indian',
    dietaryCategory: 'vegetarian',
    calories: 310,
    proteinG: 22,
    carbsG: 36,
    fatsG: 7,
    fiberG: 9,
    prepTimeMinutes: 15,
    costInr: 35,
    aiNutritionScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tags: ['High Protein', 'Vegetarian', 'Quick Meals', 'Budget Friendly', 'Low Calorie'],
    ingredients: [
      { name: 'Yellow Moong Dal (soaked & ground)', quantity: '70g dry' },
      { name: 'Finely Chopped Spinach (Palak)', quantity: '50g' },
      { name: 'Grated Ginger & Green Chilli', quantity: '1 tsp' },
      { name: 'Ajwain & Hing', quantity: '1/4 tsp' },
      { name: 'Mustard / Olive Oil for roasting', quantity: '1 tsp' }
    ],
    instructions: [
      'Blend soaked moong dal with ginger and green chilli into a smooth, pourable batter.',
      'Fold in finely chopped fresh spinach leaves, salt, and ajwain.',
      'Heat a flat tawa, grease lightly with oil, and spread a ladle of batter in concentric circles.',
      'Cook on medium flame until golden brown and crispy on both sides. Serve with mint chutney.'
    ]
  },
  {
    id: 'rec-2',
    name: 'Grilled Soya Tikka Skewers',
    cuisine: 'North Indian',
    dietaryCategory: 'vegetarian',
    calories: 360,
    proteinG: 38,
    carbsG: 24,
    fatsG: 10,
    fiberG: 8,
    prepTimeMinutes: 20,
    costInr: 45,
    aiNutritionScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    tags: ['High Protein', 'Vegetarian', 'Post Workout', 'Budget Friendly'],
    ingredients: [
      { name: 'Soya Chunks / Soya Chaap', quantity: '80g' },
      { name: 'Thick Hung Curd', quantity: '3 tbsp' },
      { name: 'Tandoori Masala & Kasuri Methi', quantity: '1 tbsp' },
      { name: 'Diced Capsicum & Red Onion', quantity: '80g' },
      { name: 'Lemon Juice & Mustard Oil', quantity: '1 tsp' }
    ],
    instructions: [
      'Boil and thoroughly squeeze soya chunks.',
      'Whisk hung curd with tandoori spices, crushed kasuri methi, lemon juice, and salt.',
      'Toss soya chunks and diced vegetables in the marinade for 15 minutes.',
      'Roast in an air fryer at 200°C for 10 mins or on a grill pan until charred.'
    ]
  },
  {
    id: 'rec-3',
    name: 'Mediterranean Chickpea & Quinoa Bowl',
    cuisine: 'Mediterranean',
    dietaryCategory: 'vegan',
    calories: 440,
    proteinG: 21,
    carbsG: 62,
    fatsG: 12,
    fiberG: 14,
    prepTimeMinutes: 15,
    costInr: 80,
    aiNutritionScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegan', 'High Protein', 'Post Workout', 'Low Calorie'],
    ingredients: [
      { name: 'Cooked Kabuli Chana (Chickpeas)', quantity: '120g' },
      { name: 'Cooked Tri-Color Quinoa', quantity: '100g' },
      { name: 'Cherry Tomatoes & Cucumber', quantity: '80g' },
      { name: 'Kalamata Olives & Lemon Vinaigrette', quantity: '1 tbsp' },
      { name: 'Fresh Parsley & Tahini drizzle', quantity: '1 tbsp' }
    ],
    instructions: [
      'Assemble cooked quinoa and boiled chickpeas in a wide bowl.',
      'Top with diced cucumber, cherry tomatoes, and fresh parsley.',
      'Whisk lemon juice, extra virgin olive oil, minced garlic, and tahini.',
      'Drizzle the dressing over the bowl and toss lightly.'
    ]
  },
  {
    id: 'rec-4',
    name: 'Spiced Sattu Power Drink',
    cuisine: 'North Indian',
    dietaryCategory: 'vegan',
    calories: 190,
    proteinG: 13,
    carbsG: 28,
    fatsG: 3,
    fiberG: 7,
    prepTimeMinutes: 3,
    costInr: 20,
    aiNutritionScore: 99,
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    tags: ['Quick Meals', 'Budget Friendly', 'High Protein', 'Indian', 'Vegan'],
    ingredients: [
      { name: 'Organic Roasted Chana Sattu', quantity: '40g' },
      { name: 'Chilled Water', quantity: '300ml' },
      { name: 'Roasted Cumin Powder (Jeera)', quantity: '1/2 tsp' },
      { name: 'Black Salt & Lemon Juice', quantity: '1/2 lemon' },
      { name: 'Finely chopped Mint & Green chilli', quantity: 'Optional' }
    ],
    instructions: [
      'In a tall glass, add 40g sattu powder.',
      'Add a splash of water and stir into a lump-free paste.',
      'Top up with chilled water, roasted jeera, rock salt, and squeeze fresh lemon juice.',
      'Stir vigorously and drink immediately for instant electrolytes and protein.'
    ]
  },
  {
    id: 'rec-5',
    name: 'Oats & Egg White Omelette Roll',
    cuisine: 'Indian',
    dietaryCategory: 'eggetarian',
    calories: 340,
    proteinG: 30,
    carbsG: 32,
    fatsG: 8,
    fiberG: 5,
    prepTimeMinutes: 10,
    costInr: 45,
    aiNutritionScore: 96,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    tags: ['High Protein', 'Post Workout', 'Quick Meals', 'Budget Friendly'],
    ingredients: [
      { name: 'Egg Whites + 1 Whole Egg', quantity: '4 whites + 1 egg' },
      { name: 'Rolled Oats Powder', quantity: '25g' },
      { name: 'Finely Diced Onions & Tomatoes', quantity: '40g' },
      { name: 'Green Chillies & Coriander', quantity: '1 tbsp' },
      { name: 'Black Pepper & Salt', quantity: 'to taste' }
    ],
    instructions: [
      'Whisk egg whites and whole egg with oats powder until slightly frothy.',
      'Fold in chopped onions, tomatoes, chillies, salt, and cracked black pepper.',
      'Pour onto a preheated non-stick skillet and cook on low heat until firm.',
      'Roll gently and slice into hearty protein roll pinwheels.'
    ]
  },
  {
    id: 'rec-6',
    name: 'Grilled Herbed Tofu with Sautéed Greens',
    cuisine: 'Asian',
    dietaryCategory: 'vegan',
    calories: 320,
    proteinG: 26,
    carbsG: 14,
    fatsG: 18,
    fiberG: 6,
    prepTimeMinutes: 15,
    costInr: 65,
    aiNutritionScore: 95,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegan', 'Low Calorie', 'High Protein', 'Quick Meals'],
    ingredients: [
      { name: 'Firm Organic Tofu (pressed & sliced)', quantity: '150g' },
      { name: 'Baby Spinach, Zucchini & Broccoli', quantity: '120g' },
      { name: 'Soy Sauce, Garlic & Ginger paste', quantity: '1 tbsp' },
      { name: 'Sesame seeds & Chilli flakes', quantity: '1 tsp' },
      { name: 'Cold-pressed Sesame Oil', quantity: '1 tsp' }
    ],
    instructions: [
      'Marinate tofu slabs in low-sodium soy sauce, minced ginger, and garlic for 10 mins.',
      'Sear tofu on high heat in a skillet until crisp and golden on all edges.',
      'In the same pan, flash-sauté broccoli florets, zucchini, and spinach.',
      'Garnish with toasted sesame seeds and crushed chilli flakes.'
    ]
  }
];
