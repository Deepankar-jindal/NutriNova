-- ============================================================================
-- NUTRISAARTHI DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    age INT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    height_cm NUMERIC(5,2),
    weight_kg NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. NUTRITION PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.nutrition_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    goal TEXT CHECK (goal IN ('weight_loss', 'muscle_gain', 'maintenance', 'better_energy', 'general_wellness')) NOT NULL,
    activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active')) NOT NULL,
    dietary_preference TEXT CHECK (dietary_preference IN ('vegetarian', 'vegan', 'eggetarian', 'non_vegetarian')) NOT NULL,
    cuisine_preference TEXT[] DEFAULT ARRAY['Indian'],
    allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
    foods_to_avoid TEXT[] DEFAULT ARRAY[]::TEXT[],
    weekly_budget_inr NUMERIC(10,2) DEFAULT 1500.00,
    daily_calorie_target INT NOT NULL,
    protein_target_g INT NOT NULL,
    carb_target_g INT NOT NULL,
    fat_target_g INT NOT NULL,
    fiber_target_g INT DEFAULT 30,
    water_target_liters NUMERIC(3,1) DEFAULT 2.5,
    meal_schedule TEXT[] DEFAULT ARRAY['breakfast', 'lunch', 'snacks', 'dinner'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. DIET PLANS TABLE
CREATE TABLE IF NOT EXISTS public.diet_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    daily_calories INT NOT NULL,
    daily_protein INT NOT NULL,
    daily_carbs INT NOT NULL,
    daily_fats INT NOT NULL,
    estimated_weekly_cost_inr NUMERIC(10,2),
    ai_generation_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. MEALS TABLE
CREATE TABLE IF NOT EXISTS public.meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diet_plan_id UUID REFERENCES public.diet_plans(id) ON DELETE CASCADE,
    meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')) NOT NULL,
    name TEXT NOT NULL,
    calories INT NOT NULL,
    protein_g NUMERIC(5,1) NOT NULL,
    carbs_g NUMERIC(5,1) NOT NULL,
    fats_g NUMERIC(5,1) NOT NULL,
    fiber_g NUMERIC(5,1) DEFAULT 0,
    prep_time_minutes INT DEFAULT 15,
    ai_score INT DEFAULT 90,
    estimated_cost_inr NUMERIC(6,2),
    image_url TEXT,
    ingredients JSONB DEFAULT '[]'::jsonb,
    instructions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. FOOD LOGS TABLE
CREATE TABLE IF NOT EXISTS public.food_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    meal_id UUID REFERENCES public.meals(id) ON DELETE SET NULL,
    meal_name TEXT NOT NULL,
    meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner', 'other')),
    consumed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    calories INT NOT NULL,
    protein_g NUMERIC(5,1) NOT NULL,
    carbs_g NUMERIC(5,1) NOT NULL,
    fats_g NUMERIC(5,1) NOT NULL,
    portion_size_g INT,
    source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'plan', 'scanner', 'swap')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PROGRESS RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg NUMERIC(5,2),
    calories_consumed INT,
    protein_consumed_g NUMERIC(5,1),
    water_consumed_liters NUMERIC(3,1) DEFAULT 0,
    adherence_score INT DEFAULT 100,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. RECIPES TABLE
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    dietary_category TEXT NOT NULL,
    calories INT NOT NULL,
    protein_g NUMERIC(5,1) NOT NULL,
    carbs_g NUMERIC(5,1) NOT NULL,
    fats_g NUMERIC(5,1) NOT NULL,
    fiber_g NUMERIC(5,1) DEFAULT 4.0,
    preparation_time_minutes INT NOT NULL,
    cost_inr NUMERIC(6,2) NOT NULL,
    ai_nutrition_score INT DEFAULT 92,
    image_url TEXT,
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. GROCERY LISTS TABLE
CREATE TABLE IF NOT EXISTS public.grocery_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    category TEXT CHECK (category IN ('vegetables', 'protein', 'fruits', 'grains_pantry', 'dairy', 'spices_other')) NOT NULL,
    item TEXT NOT NULL,
    quantity TEXT NOT NULL,
    estimated_price_inr NUMERIC(8,2) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. AI CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
    message TEXT NOT NULL,
    context_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Allow users to manage their own records
CREATE POLICY "Users can access own profile" ON public.users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can access own nutrition profile" ON public.nutrition_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own diet plans" ON public.diet_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own food logs" ON public.food_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own progress" ON public.progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own grocery items" ON public.grocery_lists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own chat messages" ON public.ai_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view public recipes" ON public.recipes FOR SELECT USING (true);
