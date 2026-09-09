import { FoodScanResult } from '../types/nutrition';

export const SAMPLE_SCANS: Record<string, FoodScanResult & { id: string; name: string; imageUrl: string }> = {
  paneer_butter_masala: {
    id: 'paneer_butter_masala',
    name: 'Paneer Butter Masala',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    foodName: 'Paneer Butter Masala',
    confidence: 96,
    servingSize: '1 medium bowl (250g)',
    servingWeightG: 250,
    calories: 420,
    proteinG: 18,
    carbsG: 22,
    fatsG: 29,
    fiberG: 3.5,
    healthScore: 72,
    glycemicIndex: 'Medium',
    aiSummary: 'Rich in dairy protein and calcium from cottage cheese, but high in saturated fat and dairy lipids from heavy butter and cashew gravy.',
    pros: [
      'High quality complete vegetarian protein (18g)',
      'Rich in calcium and phosphorus for bone density',
      'Provides slow-digesting casein protein'
    ],
    cons: [
      'High in saturated dairy fats (29g)',
      'Dense in empty caloric gravy depending on restaurant preparation',
      'Low dietary fiber relative to calories'
    ],
    healthierAlternatives: [
      {
        name: 'Palak Paneer (Light Gravy)',
        calories: 280,
        proteinG: 20,
        whyBetter: 'Replaces heavy cashew cream with iron & fiber-rich spinach puree, saving 140 kcal.'
      },
      {
        name: 'Paneer Tikka with Mint Chutney',
        calories: 260,
        proteinG: 24,
        whyBetter: 'Dry-grilled preparation eliminates cream gravy while boosting protein density.'
      }
    ]
  },
  samosa: {
    id: 'samosa',
    name: 'Spiced Potato Samosa',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    foodName: 'Spiced Potato Samosa (2 pcs)',
    confidence: 98,
    servingSize: '2 medium pieces (160g)',
    servingWeightG: 160,
    calories: 520,
    proteinG: 7,
    carbsG: 64,
    fatsG: 26,
    fiberG: 3.8,
    healthScore: 48,
    glycemicIndex: 'High',
    aiSummary: 'Deep-fried refined flour (maida) crust with spiced potato filling. High in trans-fats and simple starch, low in dietary protein.',
    pros: [
      'Quick instant energy from complex & simple carbs',
      'Contains antioxidant spices like coriander, cumin, ajwain'
    ],
    cons: [
      'Deep fried in reused vegetable oils high in oxidized fats',
      'Low protein to calorie ratio (only 7g protein per 520 kcal)',
      'Spikes blood glucose rapidly'
    ],
    healthierAlternatives: [
      {
        name: 'Air-Fried Moong Dal Samosa',
        calories: 220,
        proteinG: 14,
        whyBetter: 'Air-frying saves 300 kcal while yellow moong dal doubles protein content.'
      },
      {
        name: 'Roasted Sattu & Onion Patty',
        calories: 180,
        proteinG: 11,
        whyBetter: 'Made with whole roasted chana flour, zero maida, and high insoluble fiber.'
      }
    ]
  },
  avocado_toast: {
    id: 'avocado_toast',
    name: 'Sourdough Avocado Toast',
    imageUrl: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
    foodName: 'Sourdough Avocado Toast with Seeds',
    confidence: 94,
    servingSize: '2 thick slices (200g)',
    servingWeightG: 200,
    calories: 340,
    proteinG: 11,
    carbsG: 38,
    fatsG: 16,
    fiberG: 10,
    healthScore: 89,
    glycemicIndex: 'Low',
    aiSummary: 'Outstanding source of heart-healthy monounsaturated fatty acids (MUFAs), potassium, and gut-healthy dietary prebiotic fiber.',
    pros: [
      'Rich in oleic acid and heart-protective fats',
      'Superb dietary fiber (10g) supporting gut microbiome',
      'Low glycemic response on whole wheat sourdough'
    ],
    cons: [
      'Moderate protein content; best paired with boiled eggs or tofu scramble'
    ],
    healthierAlternatives: [
      {
        name: 'Avocado Toast topped with Poached Egg / Tofu',
        calories: 410,
        proteinG: 22,
        whyBetter: 'Adds high biological value protein to balance the macronutrient ratio.'
      }
    ]
  },
  moong_dal_khichdi: {
    id: 'moong_dal_khichdi',
    name: 'Desi Moong Dal Khichdi',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    foodName: 'Ayurvedic Moong Dal Khichdi with Ghee',
    confidence: 95,
    servingSize: '1 large bowl (300g)',
    servingWeightG: 300,
    calories: 360,
    proteinG: 16,
    carbsG: 58,
    fatsG: 7,
    fiberG: 8,
    healthScore: 92,
    glycemicIndex: 'Medium',
    aiSummary: 'Complete amino acid profile formed by combining rice and lentils. Exceptionally easy on digestion with soothing anti-inflammatory spices.',
    pros: [
      'Balanced amino acid profile (lysine from dal + methionine from rice)',
      'Gentle on the GI tract; promotes digestive recovery',
      'High in folate, magnesium, and dietary fiber'
    ],
    cons: [
      'Carb dominant; add steamed soya or paneer if targeting high protein'
    ],
    healthierAlternatives: [
      {
        name: 'Quinoa & Moong Dal Super Khichdi',
        calories: 340,
        proteinG: 20,
        whyBetter: 'Swapping white rice with quinoa boosts protein and lowers glycemic index.'
      }
    ]
  },
  grilled_chicken_salad: {
    id: 'grilled_chicken_salad',
    name: 'Grilled Herb Chicken Salad',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    foodName: 'Mediterranean Grilled Herb Chicken Bowl',
    confidence: 97,
    servingSize: '1 large bowl (280g)',
    servingWeightG: 280,
    calories: 380,
    proteinG: 42,
    carbsG: 14,
    fatsG: 12,
    fiberG: 6,
    healthScore: 95,
    glycemicIndex: 'Low',
    aiSummary: 'Ultra lean protein source paired with vibrant micronutrient-dense leafy greens and extra virgin olive oil dressing.',
    pros: [
      'Exceptional protein-to-calorie ratio (42g protein / 380 kcal)',
      'Rich in vitamin A, vitamin C, and zinc',
      'Virtually zero sugar spikes'
    ],
    cons: [
      'Check dressing for hidden sugars or commercial emulsifiers'
    ],
    healthierAlternatives: [
      {
        name: 'Add Quinoa or Sweet Potato',
        calories: 460,
        proteinG: 44,
        whyBetter: 'Adds clean complex carbs for glycogen replenishment if eating post-workout.'
      }
    ]
  }
};
