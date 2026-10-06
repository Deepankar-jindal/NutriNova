'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Target,
  Activity,
  Salad,
  Globe,
  IndianRupee,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';
import { GoalType, ActivityLevel, DietaryPreference } from '../../types/nutrition';
import { calculateNutritionTargets } from '../../lib/nutrition-calculator';

export default function OnboardingPage() {
  const router = useRouter();
  const { updateProfileFromOnboarding } = useNutrition();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Kavita Roy',
    age: 24,
    gender: 'female' as 'male' | 'female' | 'other',
    heightCm: 165,
    weightKg: 58,
    goal: 'better_energy' as GoalType,
    activityLevel: 'moderately_active' as ActivityLevel,
    dietaryPreference: 'vegetarian' as DietaryPreference,
    cuisinePreferences: ['North Indian', 'Mediterranean'],
    weeklyBudgetInr: 1500,
    allergies: [] as string[],
    mealSchedule: ['breakfast', 'lunch', 'snacks', 'dinner'],
  });

  const totalSteps = 8;

  // Processing animations messages
  const aiStages = [
    'Analyzing your biometrics and metabolic rate...',
    'Calibrating daily calories & macronutrient split...',
    'Optimizing Indian superfoods and recipe matrix...',
    'Applying budget and dietary restrictions...',
    'Finalizing your personalized AI nutrition ecosystem!',
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      triggerAIGeneration();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const triggerAIGeneration = () => {
    setIsProcessingAI(true);

    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      if (stage < aiStages.length) {
        setProcessingStage(stage);
      } else {
        clearInterval(interval);
        // Save profile and redirect
        updateProfileFromOnboarding({
          name: formData.name,
          age: Number(formData.age),
          gender: formData.gender,
          heightCm: Number(formData.heightCm),
          weightKg: Number(formData.weightKg),
          goal: formData.goal,
          activityLevel: formData.activityLevel,
          dietaryPreference: formData.dietaryPreference,
          cuisinePreferences: formData.cuisinePreferences,
          allergies: formData.allergies,
          weeklyBudgetInr: Number(formData.weeklyBudgetInr),
        });
        router.push('/dashboard');
      }
    }, 850);
  };

  // Live BMI estimate
  const heightMeters = formData.heightCm / 100;
  const bmi = Number((formData.weightKg / (heightMeters * heightMeters)).toFixed(1));

  // Quick live calculated target
  const previewTargets = calculateNutritionTargets(
    formData.gender,
    formData.weightKg,
    formData.heightCm,
    formData.age,
    formData.goal,
    formData.activityLevel,
    formData.weeklyBudgetInr
  );

  return (
    <div className="min-h-[88vh] py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col justify-center bg-[#FAF7F2]">
      
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-primary-900/70 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span className="text-primary-800 font-extrabold">{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-800 via-primary-700 to-gold-500 transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-white border border-gold-600/30 backdrop-blur-xl shadow-luxury-md">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 blur-3xl pointer-events-none" />

        {isProcessingAI ? (
          /* Processing State Animation */
          <div className="py-16 text-center space-y-6 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="spinner-border w-20 h-20 border-[3px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-gold-600 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="font-serif text-2xl font-black text-primary-950">Synthesizing Your AI Nutrition Plan</h3>
              <p className="text-sm font-bold text-primary-800 animate-pulse">
                {aiStages[processingStage]}
              </p>
            </div>

            {/* Live calculated chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <span className="px-3.5 py-1.5 rounded-xl bg-surface-100 border border-surface-300 text-xs text-primary-950 font-bold shadow-sm">
                🔥 {previewTargets.dailyCalories} kcal Target
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-gold-50 border border-gold-300 text-xs text-gold-900 font-bold shadow-sm">
                💪 {previewTargets.proteinG}g Protein
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-primary-50 border border-primary-300 text-xs text-primary-900 font-bold shadow-sm">
                💰 ₹{formData.weeklyBudgetInr}/wk Budget
              </span>
            </div>
          </div>
        ) : (
          /* Step-by-Step Forms */
          <div className="space-y-8">
            
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold mb-2 shadow-sm">
                    <User className="w-3.5 h-3.5 text-primary-700" />
                    <span>Personal Biometrics</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">Tell us about your body</h2>
                  <p className="text-xs text-primary-900/70 mt-1 font-medium">Used to compute your baseline Basal Metabolic Rate (BMR).</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-primary-950 block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-surface-300 text-sm text-primary-950 focus:outline-none focus:border-gold-600 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-primary-950 block mb-1.5">Gender</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['male', 'female', 'other'] as const).map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData({ ...formData, gender: g })}
                          className={`py-3 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                            formData.gender === g
                              ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-200 border border-gold-500/40 shadow-sm'
                              : 'bg-surface-100 text-primary-900/70 border border-surface-300'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-primary-950 block mb-1.5">Age (Years)</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-surface-300 text-sm text-primary-950 focus:outline-none focus:border-gold-600 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-primary-950 block mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.heightCm}
                      onChange={e => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-surface-300 text-sm text-primary-950 focus:outline-none focus:border-gold-600 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-primary-950 block mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weightKg}
                      onChange={e => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-surface-300 text-sm text-primary-950 focus:outline-none focus:border-gold-600 transition"
                    />
                  </div>

                  {/* BMI Calculation Card */}
                  <div className="p-3.5 rounded-xl bg-gold-50 border border-gold-300/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gold-900 uppercase font-bold block">Calculated BMI</span>
                      <span className="font-serif text-lg font-black text-primary-950">{bmi}</span>
                    </div>
                    <span className="text-xs text-primary-900 font-bold">
                      {bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal Weight' : 'Overweight'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Goal */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold mb-2 shadow-sm">
                    <Target className="w-3.5 h-3.5 text-gold-700" />
                    <span>Primary Objective</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">What is your primary health goal?</h2>
                  <p className="text-xs text-primary-900/70 mt-1 font-medium">Saarthi will balance macro ratios and caloric energy accordingly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'weight_loss', title: 'Weight Loss & Fat Reduction', desc: '-20% Calorie deficit with muscle protection' },
                    { id: 'muscle_gain', title: 'Muscle Gain & Hypertrophy', desc: '+12% Clean surplus & 2.0g/kg high protein' },
                    { id: 'maintenance', title: 'Maintenance & Longevity', desc: 'Precise TDEE caloric equilibrium' },
                    { id: 'better_energy', title: 'Better Energy & Focus', desc: 'Glycemic stabilization and micronutrient balance' },
                    { id: 'general_wellness', title: 'General Holistic Wellness', desc: 'Prebiotic gut health & immune optimization' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: item.id as GoalType })}
                      className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                        formData.goal === item.id
                          ? 'bg-primary-50 border-primary-600 shadow-sm'
                          : 'bg-surface-100 text-primary-900/80 border-surface-300 hover:border-gold-500/30'
                      }`}
                    >
                      <h4 className="font-serif text-sm font-bold text-primary-950 mb-1">{item.title}</h4>
                      <p className="text-xs text-primary-900/70 font-medium">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Lifestyle */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold mb-2 shadow-sm">
                    <Activity className="w-3.5 h-3.5 text-primary-700" />
                    <span>Physical Activity</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">What does your routine look like?</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'sedentary', title: 'Sedentary', desc: 'Desk job, little to no formal exercise' },
                    { id: 'lightly_active', title: 'Lightly Active', desc: 'Light exercise / yoga 1-3 days/week' },
                    { id: 'moderately_active', title: 'Moderately Active', desc: 'Moderate workouts / gym 3-5 days/week' },
                    { id: 'very_active', title: 'Very Active', desc: 'Hard daily training or physical labor' },
                  ].map(act => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, activityLevel: act.id as ActivityLevel })}
                      className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                        formData.activityLevel === act.id
                          ? 'bg-primary-50 border-primary-600 shadow-sm'
                          : 'bg-surface-100 text-primary-900/80 border-surface-300 hover:border-gold-500/30'
                      }`}
                    >
                      <h4 className="font-serif text-sm font-bold text-primary-950 mb-1">{act.title}</h4>
                      <p className="text-xs text-primary-900/70 font-medium">{act.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Food Preference */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold mb-2 shadow-sm">
                    <Salad className="w-3.5 h-3.5 text-primary-700" />
                    <span>Dietary Identity</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">Select your dietary preference</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'vegetarian', label: '🌱 Vegetarian', desc: 'Dairy, pulses, grains, no meat' },
                    { id: 'vegan', label: '🌿 100% Vegan', desc: 'Pure plant-based, zero dairy' },
                    { id: 'eggetarian', label: '🍳 Eggetarian', desc: 'Vegetarian + whole eggs' },
                    { id: 'non_vegetarian', label: '🍗 Non-Vegetarian', desc: 'Chicken, fish, eggs, dairy' },
                  ].map(pref => (
                    <button
                      key={pref.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, dietaryPreference: pref.id as DietaryPreference })}
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                        formData.dietaryPreference === pref.id
                          ? 'bg-primary-50 border-primary-600 shadow-sm'
                          : 'bg-surface-100 text-primary-900/80 border-surface-300 hover:border-gold-500/30'
                      }`}
                    >
                      <span className="font-serif text-sm font-bold text-primary-950 mb-1">{pref.label}</span>
                      <span className="text-[11px] text-primary-900/70 font-medium">{pref.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Cuisine */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold mb-2 shadow-sm">
                    <Globe className="w-3.5 h-3.5 text-gold-700" />
                    <span>Flavor &amp; Regional Palette</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">Choose your preferred cuisines</h2>
                  <p className="text-xs text-primary-900/70 mt-1 font-medium">Select one or more for diverse meal suggestions.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['North Indian', 'South Indian', 'Mediterranean', 'Asian / Stir Fry', 'Desi Home Style', 'Global Fusion'].map(cuisine => {
                    const isSelected = formData.cuisinePreferences.includes(cuisine);
                    return (
                      <button
                        key={cuisine}
                        type="button"
                        onClick={() => {
                          const exists = formData.cuisinePreferences.includes(cuisine);
                          setFormData({
                            ...formData,
                            cuisinePreferences: exists
                              ? formData.cuisinePreferences.filter(c => c !== cuisine)
                              : [...formData.cuisinePreferences, cuisine]
                          });
                        }}
                        className={`p-4 rounded-2xl border text-center font-bold text-xs transition cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-200 border-gold-500/40 shadow-sm'
                            : 'bg-surface-100 text-primary-900/80 border-surface-300 hover:border-gold-500/30'
                        }`}
                      >
                        {cuisine}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: Budget */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-bold mb-2 shadow-sm">
                    <IndianRupee className="w-3.5 h-3.5 text-gold-700" />
                    <span>Budget Calibration (USP)</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">What is your weekly food budget?</h2>
                  <p className="text-xs text-primary-900/70 mt-1 font-medium">Saarthi will optimize ingredients to maximize nutrition per rupee spent.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-100 border border-gold-500/30">
                    <span className="text-sm font-bold text-primary-950">Target Weekly Grocery Budget:</span>
                    <span className="font-serif text-2xl font-black text-gold-800">₹{formData.weeklyBudgetInr}</span>
                  </div>

                  <input
                    type="range"
                    min="800"
                    max="3500"
                    step="100"
                    value={formData.weeklyBudgetInr}
                    onChange={e => setFormData({ ...formData, weeklyBudgetInr: Number(e.target.value) })}
                    className="w-full accent-gold-600 h-2 bg-surface-200 rounded-lg cursor-pointer"
                  />

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { amount: 1000, label: 'Budget Smart (₹1,000/wk)', sub: 'Sattu, Soya, Dals & Mandi Greens' },
                      { amount: 1800, label: 'Balanced (₹1,800/wk)', sub: 'Paneer, Tofu, Yogurt & Nuts' },
                      { amount: 2600, label: 'Gourmet / Premium (₹2,600/wk)', sub: 'Quinoa, Olive Oil, Berries' },
                    ].map(b => (
                      <button
                        key={b.amount}
                        type="button"
                        onClick={() => setFormData({ ...formData, weeklyBudgetInr: b.amount })}
                        className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                          formData.weeklyBudgetInr === b.amount
                            ? 'bg-gold-100 border-gold-500 shadow-sm'
                            : 'bg-surface-100 text-primary-900/80 border-surface-300'
                        }`}
                      >
                        <span className="font-serif text-xs font-bold text-primary-950 block mb-1">{b.label}</span>
                        <span className="text-[10px] text-primary-900/70 block font-medium">{b.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Restrictions */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold mb-2 shadow-sm">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sensitivities &amp; Restrictions</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">Any food allergies or exclusions?</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Lactose Intolerant', 'Gluten Sensitive', 'Peanut Allergy', 'No Mushroom', 'No Onion & Garlic (Jain)', 'Low Sodium'].map(tag => {
                    const isSelected = formData.allergies.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const exists = formData.allergies.includes(tag);
                          setFormData({
                            ...formData,
                            allergies: exists
                              ? formData.allergies.filter(a => a !== tag)
                              : [...formData.allergies, tag]
                          });
                        }}
                        className={`p-3.5 rounded-2xl border text-center text-xs font-bold transition cursor-pointer ${
                          isSelected
                            ? 'bg-rose-100 text-rose-900 border-rose-400 shadow-sm'
                            : 'bg-surface-100 text-primary-900/80 border-surface-300 hover:border-gold-500/30'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 8: Meal Schedule */}
            {currentStep === 8 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold mb-2 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-primary-700" />
                    <span>Daily Structure</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-950">Confirm your daily meal rhythm</h2>
                  <p className="text-xs text-primary-900/70 mt-1 font-medium">Saarthi will partition daily calories and protein across your selected meals.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'breakfast', label: 'Breakfast', time: '08:00 AM' },
                    { id: 'lunch', label: 'Lunch', time: '01:00 PM' },
                    { id: 'snacks', label: 'Snacks / Fuel', time: '05:00 PM' },
                    { id: 'dinner', label: 'Dinner', time: '08:30 PM' },
                  ].map(m => (
                    <div key={m.id} className="p-4 rounded-2xl bg-surface-100 border border-gold-500/30 text-center shadow-sm">
                      <Check className="w-4 h-4 text-primary-700 mx-auto mb-1" />
                      <span className="font-serif text-xs font-bold text-primary-950 block">{m.label}</span>
                      <span className="text-[10px] text-primary-900/60 mt-0.5 block font-medium">{m.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="pt-6 border-t border-surface-200 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-5 py-3 rounded-xl bg-surface-100 disabled:opacity-40 border border-surface-300 text-primary-950 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 hover:from-primary-800 text-gold-200 border border-gold-500/40 font-bold text-xs transition shadow-luxury-sm flex items-center gap-2 cursor-pointer"
              >
                <span>{currentStep === totalSteps ? 'Generate My AI Diet' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
