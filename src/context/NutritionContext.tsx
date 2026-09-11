'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  NutritionProfile,
  MealItem,
  ProgressDay,
  GroceryItem,
  ChatMessage,
  FoodScanResult,
  GoalType,
  ActivityLevel,
  DietaryPreference,
} from '../types/nutrition';
import {
  DEMO_USER,
  DEMO_NUTRITION_PROFILE,
  INITIAL_MEALS,
  PROGRESS_HISTORY,
  INITIAL_GROCERY_ITEMS,
  INITIAL_CHAT_MESSAGES,
} from '../data/demo-profile';
import { AIService } from '../lib/ai-service';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { calculateNutritionTargets } from '../lib/nutrition-calculator';

interface NutritionContextType {
  user: UserProfile;
  profile: NutritionProfile;
  meals: MealItem[];
  progressHistory: ProgressDay[];
  groceryItems: GroceryItem[];
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  favorites: string[];
  consumedCalories: number;
  consumedProtein: number;
  consumedCarbs: number;
  consumedFats: number;
  consumedFiber: number;
  consumedWater: number;
  streakDays: number;
  isDemoMode: boolean;
  isAuthenticated: boolean;
  setIsChatOpen: (open: boolean) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  logMeal: (mealId: string) => void;
  swapMeal: (mealId: string, newMeal: MealItem) => void;
  addWater: (liters: number) => void;
  toggleGroceryItem: (id: string) => void;
  optimizeGroceries: () => void;
  sendChatMessage: (message: string) => Promise<void>;
  updateProfileFromOnboarding: (data: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    heightCm: number;
    weightKg: number;
    goal: GoalType;
    activityLevel: ActivityLevel;
    dietaryPreference: DietaryPreference;
    cuisinePreferences: string[];
    allergies: string[];
    weeklyBudgetInr: number;
  }) => void;
  toggleFavoriteRecipe: (recipeId: string) => void;
  resetToDemo: () => void;
  logScannedFood: (scan: FoodScanResult) => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEMO_USER);
  const [profile, setProfile] = useState<NutritionProfile>(DEMO_NUTRITION_PROFILE);
  const [meals, setMeals] = useState<MealItem[]>(INITIAL_MEALS);
  const [progressHistory, setProgressHistory] = useState<ProgressDay[]>(PROGRESS_HISTORY);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(['rec-1', 'rec-4']);
  const [consumedWater, setConsumedWater] = useState<number>(2.2);
  const [streakDays, setStreakDays] = useState<number>(12);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load persisted user & profile on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nutrisaarthi_user_session');
      const savedProfile = localStorage.getItem('nutrisaarthi_user_profile');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsDemoMode(false);
      }
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch {
      // Ignore storage errors
    }

    // Check live Supabase session if configured
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          const liveUser: UserProfile = {
            id: session.user.id,
            name: userMeta.full_name || userMeta.name || session.user.email?.split('@')[0] || 'Member',
            email: session.user.email || '',
            age: 26,
            gender: 'other',
            heightCm: 175,
            weightKg: 70,
            createdAt: session.user.created_at,
          };
          setUser(liveUser);
          setIsAuthenticated(true);
          setIsDemoMode(false);
          try {
            localStorage.setItem('nutrisaarthi_user_session', JSON.stringify(liveUser));
          } catch {}
        }
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password' };
    }

    // If Supabase is fully configured with live credentials, attempt cloud auth
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.user) {
          const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          const loggedInUser: UserProfile = {
            id: data.user.id,
            name: data.user.user_metadata?.name || data.user.user_metadata?.full_name || nameFromEmail,
            email: data.user.email || email,
            age: 26,
            gender: 'other',
            heightCm: 175,
            weightKg: 70,
            createdAt: data.user.created_at,
          };
          setUser(loggedInUser);
          setIsAuthenticated(true);
          setIsDemoMode(false);
          try {
            localStorage.setItem('nutrisaarthi_user_session', JSON.stringify(loggedInUser));
          } catch {}
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to sign in via Supabase' };
      }
    }

    // Fallback Local Account Authentication:
    // Format a friendly display name from the email (e.g., jindal@gmail.com -> Jindal)
    const rawName = email.split('@')[0].replace(/[._0-9]/g, ' ').trim();
    const formattedName = rawName
      ? rawName.replace(/\b\w/g, c => c.toUpperCase())
      : 'NutriSaarthi Member';

    const localUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: formattedName,
      email: email.trim(),
      age: 26,
      gender: 'male',
      heightCm: 175,
      weightKg: 70,
      createdAt: new Date().toISOString(),
    };

    setUser(localUser);
    setIsAuthenticated(true);
    setIsDemoMode(false);

    try {
      localStorage.setItem('nutrisaarthi_user_session', JSON.stringify(localUser));
    } catch {}

    return { success: true };
  };

  const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: 'Please provide email and password' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name.trim() || email.split('@')[0],
            },
          },
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            name: name.trim() || email.split('@')[0],
            email: data.user.email || email,
            age: 26,
            gender: 'other',
            heightCm: 175,
            weightKg: 70,
            createdAt: data.user.created_at,
          };
          setUser(newUser);
          setIsAuthenticated(true);
          setIsDemoMode(false);
          try {
            localStorage.setItem('nutrisaarthi_user_session', JSON.stringify(newUser));
          } catch {}
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to sign up via Supabase' };
      }
    }

    // Local sign up
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim() || email.split('@')[0].replace(/\b\w/g, c => c.toUpperCase()),
      email: email.trim(),
      age: 26,
      gender: 'male',
      heightCm: 175,
      weightKg: 70,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setIsDemoMode(false);

    try {
      localStorage.setItem('nutrisaarthi_user_session', JSON.stringify(newUser));
    } catch {}

    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    try {
      localStorage.removeItem('nutrisaarthi_user_session');
    } catch {}
    setUser(DEMO_USER);
    setIsAuthenticated(false);
    setIsDemoMode(true);
  };


  // Compute all consumed macros in one pass over logged meals
  const { consumedCalories, consumedProtein, consumedCarbs, consumedFats, consumedFiber } = meals
    .filter(m => m.isLogged)
    .reduce(
      (acc, m) => ({
        consumedCalories: acc.consumedCalories + m.calories,
        consumedProtein: acc.consumedProtein + m.proteinG,
        consumedCarbs: acc.consumedCarbs + m.carbsG,
        consumedFats: acc.consumedFats + m.fatsG,
        consumedFiber: acc.consumedFiber + m.fiberG,
      }),
      { consumedCalories: 0, consumedProtein: 0, consumedCarbs: 0, consumedFats: 0, consumedFiber: 0 }
    );

  const logMeal = (mealId: string) => {
    setMeals(prev =>
      prev.map(m => {
        if (m.id === mealId) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return { ...m, isLogged: true, loggedAt: timeStr };
        }
        return m;
      })
    );

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#10b981', '#14b8a6', '#06b6d4', '#f59e0b']
      });
    } catch {
      // Fallback gracefully
    }
  };

  const swapMeal = (mealId: string, newMeal: MealItem) => {
    setMeals(prev => prev.map(m => (m.id === mealId ? { ...newMeal, id: mealId, isLogged: false } : m)));
  };

  const addWater = (liters: number) => {
    setConsumedWater(prev => Number(Math.min(prev + liters, 6.0).toFixed(1)));
  };

  const toggleGroceryItem = (id: string) => {
    setGroceryItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const optimizeGroceries = () => {
    setGroceryItems(prev =>
      prev.map(item => {
        if (item.id === 'g-14') {
          return {
            ...item,
            item: 'Roasted Peanuts & Pumpkin Seeds (Swapped from Almonds)',
            estimatedPriceInr: 70,
            notes: 'AI Optimized: Saved ₹110 with equal healthy fats & zinc!'
          };
        }
        if (item.id === 'g-13') {
          return {
            ...item,
            item: 'Fresh Local Toned Milk & Homemade Dahi',
            estimatedPriceInr: 120,
            notes: 'AI Optimized: Saved ₹50'
          };
        }
        return item;
      })
    );
  };

  const sendChatMessage = async (userMessage: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Generate intelligent AI reply
    const aiReply = await AIService.askNutritionAI(userMessage, profile, consumedCalories);

    const assistantMsg: ChatMessage = {
      id: `msg-ai-${Date.now()}`,
      role: 'assistant',
      content: aiReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Check today\'s protein progress',
        'Suggest budget meal swap',
        'Show grocery savings'
      ]
    };

    setChatMessages(prev => [...prev, assistantMsg]);
  };

  const updateProfileFromOnboarding = (data: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    heightCm: number;
    weightKg: number;
    goal: GoalType;
    activityLevel: ActivityLevel;
    dietaryPreference: DietaryPreference;
    cuisinePreferences: string[];
    allergies: string[];
    weeklyBudgetInr: number;
  }) => {
    const calculated = calculateNutritionTargets(
      data.gender,
      data.weightKg,
      data.heightCm,
      data.age,
      data.goal,
      data.activityLevel,
      data.weeklyBudgetInr
    );

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: data.name || 'Champion',
      email: `${data.name.toLowerCase().replace(/\s+/g, '')}@nutrisaarthi.app`,
      age: data.age,
      gender: data.gender,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
      createdAt: new Date().toISOString(),
    };

    const newProfile: NutritionProfile = {
      id: `profile-${Date.now()}`,
      userId: newUser.id,
      goal: data.goal,
      activityLevel: data.activityLevel,
      dietaryPreference: data.dietaryPreference,
      cuisinePreferences: data.cuisinePreferences,
      allergies: data.allergies,
      foodsToAvoid: [],
      budgetLevel: data.weeklyBudgetInr <= 1200 ? 'budget' : data.weeklyBudgetInr <= 2200 ? 'moderate' : 'premium',
      mealSchedule: ['breakfast', 'lunch', 'snacks', 'dinner'],
      dailyCalories: calculated.dailyCalories,
      proteinG: calculated.proteinG,
      carbsG: calculated.carbsG,
      fatsG: calculated.fatsG,
      fiberG: calculated.fiberG,
      waterLiters: calculated.waterLiters,
      weeklyBudgetInr: data.weeklyBudgetInr,
    };

    setUser(newUser);
    setProfile(newProfile);
    setIsDemoMode(false);
  };

  const toggleFavoriteRecipe = (recipeId: string) => {
    setFavorites(prev =>
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  const resetToDemo = () => {
    setUser(DEMO_USER);
    setProfile(DEMO_NUTRITION_PROFILE);
    setMeals(INITIAL_MEALS);
    setProgressHistory(PROGRESS_HISTORY);
    setGroceryItems(INITIAL_GROCERY_ITEMS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setConsumedWater(2.2);
    setStreakDays(12);
    setIsDemoMode(true);
  };

  const logScannedFood = (scan: FoodScanResult) => {
    const newLoggedMeal: MealItem = {
      id: `scanned-${Date.now()}`,
      mealType: 'lunch',
      name: `${scan.foodName} (AI Scanned)`,
      calories: scan.calories,
      proteinG: scan.proteinG,
      carbsG: scan.carbsG,
      fatsG: scan.fatsG,
      fiberG: scan.fiberG,
      prepTimeMinutes: 10,
      aiScore: scan.healthScore,
      estimatedCostInr: 80,
      imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      categoryTag: `AI Health Score: ${scan.healthScore}/100`,
      ingredients: [{ name: scan.servingSize, quantity: `${scan.servingWeightG}g` }],
      instructions: ['Logged from AI Food Scanner'],
      isLogged: true,
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMeals(prev => [newLoggedMeal, ...prev]);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#34d399']
      });
    } catch {
      // Ignore
    }
  };

  return (
    <NutritionContext.Provider
      value={{
        user,
        profile,
        meals,
        progressHistory,
        groceryItems,
        chatMessages,
        isChatOpen,
        favorites,
        consumedCalories,
        consumedProtein,
        consumedCarbs,
        consumedFats,
        consumedFiber,
        consumedWater,
        streakDays,
        isDemoMode,
        isAuthenticated,
        setIsChatOpen,
        login,
        signUp,
        logout,
        logMeal,
        swapMeal,
        addWater,
        toggleGroceryItem,
        optimizeGroceries,
        sendChatMessage,
        updateProfileFromOnboarding,
        toggleFavoriteRecipe,
        resetToDemo,
        logScannedFood,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = (): NutritionContextType => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
