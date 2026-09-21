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
  Zap,
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
    <div className="min-h-[88vh] py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col justify-center">
      
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span className="text-emerald-400">{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-surface-200/80 border border-emerald-500/30 backdrop-blur-xl shadow-glass">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />

        {isProcessingAI ? (
          /* Processing State Animation */
          <div className="py-16 text-center space-y-6 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <div className="absolute inset-3 rounded-full border-4 border-cyan-500/20 border-b-cyan-400 animate-spin-slow" />
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-2xl font-black text-white">Synthesizing Your AI Nutrition Plan</h3>
              <p className="text-sm font-medium text-emerald-400 animate-pulse">
                {aiStages[processingStage]}
              </p>
            </div>

            {/* Live calculated chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <span className="px-3 py-1.5 rounded-xl bg-surface-100 border border-slate-700 text-xs text-slate-300">
                🔥 {previewTargets.dailyCalories} kcal Target
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-surface-100 border border-slate-700 text-xs text-cyan-300">
                💪 {previewTargets.proteinG}g Protein
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-surface-100 border border-slate-700 text-xs text-amber-300">
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Personal Biometrics</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Tell us about your body</h2>
                  <p className="text-xs text-slate-400 mt-1">Used to compute your baseline Basal Metabolic Rate (BMR).</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Gender</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['male', 'female', 'other'] as const).map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData({ ...formData, gender: g })}
                          className={`py-3 rounded-xl text-xs font-bold uppercase transition ${
                            formData.gender === g
                              ? 'bg-emerald-500 text-slate-950 shadow-glow-sm'
                              : 'bg-surface-100 text-slate-300 border border-slate-800'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Age (Years)</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.heightCm}
                      onChange={e => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weightKg}
                      onChange={e => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* BMI Calculation Card */}
                  <div className="p-3.5 rounded-xl bg-surface-100/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Calculated BMI</span>
                      <span className="text-lg font-black text-emerald-400">{bmi}</span>
                    </div>
                    <span className="text-xs text-slate-300 font-medium">
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
                    <Target className="w-3.5 h-3.5" />
                    <span>Primary Objective</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">What is your primary health goal?</h2>
                  <p className="text-xs text-slate-400 mt-1">Saarthi will balance macro ratios and caloric energy accordingly.</p>
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
                      className={`p-4 rounded-2xl border text-left transition ${
                        formData.goal === item.id
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-glow-sm'
                          : 'bg-surface-100/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Lifestyle */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Physical Activity</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">What does your routine look like?</h2>
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
                      className={`p-4 rounded-2xl border text-left transition ${
                        formData.activityLevel === act.id
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-glow-sm'
                          : 'bg-surface-100/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-white mb-1">{act.title}</h4>
                      <p className="text-xs text-slate-400">{act.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Food Preference */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
                    <Salad className="w-3.5 h-3.5" />
                    <span>Dietary Identity</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Select your dietary preference</h2>
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
                      className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                        formData.dietaryPreference === pref.id
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-glow-sm'
                          : 'bg-surface-100/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm font-bold text-white mb-1">{pref.label}</span>
                      <span className="text-[11px] text-slate-400">{pref.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Cuisine */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Flavor & Regional Palette</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Choose your preferred cuisines</h2>
                  <p className="text-xs text-slate-400 mt-1">Select one or more for diverse meal suggestions.</p>
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
                        className={`p-4 rounded-2xl border text-center font-bold text-xs transition ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-glow-sm'
                            : 'bg-surface-100/70 text-slate-300 border-slate-800 hover:border-slate-700'
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>Budget Calibration (USP)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">What is your weekly food budget?</h2>
                  <p className="text-xs text-slate-400 mt-1">Saarthi will optimize ingredients to maximize nutrition per rupee spent.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-100 border border-emerald-500/30">
                    <span className="text-sm font-bold text-slate-300">Target Weekly Grocery Budget:</span>
                    <span className="text-2xl font-black text-emerald-400">₹{formData.weeklyBudgetInr}</span>
                  </div>

                  <input
                    type="range"
                    min="800"
                    max="3500"
                    step="100"
                    value={formData.weeklyBudgetInr}
                    onChange={e => setFormData({ ...formData, weeklyBudgetInr: Number(e.target.value) })}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
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
                        className={`p-3 rounded-2xl border text-left transition ${
                          formData.weeklyBudgetInr === b.amount
                            ? 'bg-emerald-950/40 border-emerald-500'
                            : 'bg-surface-100/70 border-slate-800'
                        }`}
                      >
                        <span className="text-xs font-bold text-white block mb-1">{b.label}</span>
                        <span className="text-[10px] text-slate-400 block">{b.sub}</span>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Sensitivities & Restrictions</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Any food allergies or exclusions?</h2>
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
                        className={`p-3.5 rounded-2xl border text-center text-xs font-bold transition ${
                          isSelected
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow'
                            : 'bg-surface-100/70 text-slate-300 border-slate-800'
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Daily Structure</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Confirm your daily meal rhythm</h2>
                  <p className="text-xs text-slate-400 mt-1">Saarthi will partition daily calories and protein across your selected meals.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'breakfast', label: 'Breakfast', time: '08:00 AM' },
                    { id: 'lunch', label: 'Lunch', time: '01:00 PM' },
                    { id: 'snacks', label: 'Snacks / Fuel', time: '05:00 PM' },
                    { id: 'dinner', label: 'Dinner', time: '08:30 PM' },
                  ].map(m => (
                    <div key={m.id} className="p-4 rounded-2xl bg-surface-100 border border-emerald-500/30 text-center">
                      <Check className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                      <span className="text-xs font-bold text-white block">{m.label}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{m.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-5 py-3 rounded-xl bg-surface-100 disabled:opacity-30 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs transition shadow-glow-sm flex items-center gap-2"
              >
                <span>{currentStep === totalSteps ? 'Generate My AI Diet' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
