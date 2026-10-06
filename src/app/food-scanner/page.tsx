'use client';

import React, { useState } from 'react';
import {
  Scan,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Dumbbell,
  Wheat,
  HeartPulse,
  Bot,
  Plus,
} from 'lucide-react';
import { SAMPLE_SCANS } from '../../data/sample-scans';
import { FoodScanResult } from '../../types/nutrition';
import { useNutrition } from '../../context/NutritionContext';

export default function FoodScannerPage() {
  const { logScannedFood, setIsChatOpen, sendChatMessage } = useNutrition();

  const [selectedScanKey, setSelectedScanKey] = useState<string>('paneer_butter_masala');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeResult, setActiveResult] = useState<FoodScanResult & { name: string; imageUrl: string }>(
    SAMPLE_SCANS['paneer_butter_masala']
  );
  const [isLoggedSuccessfully, setIsLoggedSuccessfully] = useState<boolean>(false);

  const handleSelectSample = (key: string) => {
    setSelectedScanKey(key);
    setIsScanning(true);
    setIsLoggedSuccessfully(false);

    setTimeout(() => {
      setActiveResult(SAMPLE_SCANS[key]);
      setIsScanning(false);
    }, 850);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      setIsLoggedSuccessfully(false);

      // Simulate vision AI processing for the uploaded file
      setTimeout(() => {
        setActiveResult(SAMPLE_SCANS['paneer_butter_masala']);
        setIsScanning(false);
      }, 1200);
    }
  };

  const handleLogMeal = () => {
    logScannedFood(activeResult);
    setIsLoggedSuccessfully(true);
  };

  const handleAskAIAboutFood = async () => {
    setIsChatOpen(true);
    await sendChatMessage(`Can you analyze ${activeResult.foodName} (${activeResult.calories} kcal, ${activeResult.proteinG}g protein) for my daily nutrition goals?`);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FAF7F2]">
      
      {/* Header */}
      <div className="pt-4 border-b border-surface-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-800 text-xs font-bold mb-2 shadow-sm">
          <Scan className="w-3.5 h-3.5" />
          <span>Computer Vision Intelligence</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-black text-primary-950 tracking-tight">
          AI Food Scanner &amp; Macro Vision
        </h1>
        <p className="text-xs sm:text-sm text-primary-900/70 mt-1 font-medium">
          Upload or select a meal to instantly analyze portion weights, glycemic impact, macros, and healthier alternatives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Upload & Sample Picker */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Visual Drag-and-Drop Scanner Zone */}
          <div className="relative rounded-3xl bg-white border-2 border-dashed border-gold-500/40 p-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[320px] shadow-luxury-sm">
            
            {/* Visual Image Preview */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-luxury-md">
              <img
                src={activeResult.imageUrl}
                alt={activeResult.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Scanning Laser Beam Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-gold-400/20 backdrop-blur-[1px] flex flex-col items-center justify-center">
                  <div className="w-full h-1.5 bg-gold-400 shadow-[0_0_15px_#f59e0b] animate-scan-laser absolute" />
                  <div className="p-3 rounded-2xl bg-white/95 border border-gold-500/40 shadow-luxury-md text-xs font-bold text-primary-950 flex items-center gap-2">
                    <div className="spinner-border spinner-border-sm" />
                    <span>Neural Vision Processing...</span>
                  </div>
                </div>
              )}

              {/* Confidence badge */}
              {!isScanning && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 border border-gold-500/40 text-gold-900 text-[10px] font-extrabold backdrop-blur-md shadow-sm">
                  {activeResult.confidence}% AI Confidence
                </div>
              )}
            </div>

            {/* Upload Button Trigger */}
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-300 text-xs font-bold text-primary-950 transition flex items-center gap-2 shadow-sm">
              <UploadCloud className="w-4 h-4 text-gold-600" />
              <span>Upload Custom Meal Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
            <span className="text-[10px] text-primary-900/60 mt-2 font-medium">Supports JPG, PNG, WEBP (Camera capture enabled)</span>
          </div>

          {/* Quick Demo Scan Presets */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-primary-950 uppercase tracking-wider">
              Quick Scan Showcases:
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(SAMPLE_SCANS).map(key => {
                const item = SAMPLE_SCANS[key];
                const isSelected = selectedScanKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectSample(key)}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition shadow-sm cursor-pointer ${
                      isSelected
                        ? 'bg-gold-50 border-gold-500 shadow-luxury-sm font-bold'
                        : 'bg-white border-surface-200 hover:border-gold-500/30'
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                    <div className="overflow-hidden">
                      <span className="font-serif text-xs font-bold text-primary-950 block truncate">{item.name}</span>
                      <span className="text-[10px] text-primary-900/60 font-medium">{item.calories} kcal</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col: AI Food Analysis Output */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-gold-600/30 backdrop-blur-xl shadow-luxury-md space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-700 tracking-wider">
                  AI Food Analysis Result
                </span>
                <h3 className="font-serif text-2xl font-black text-primary-950 mt-0.5">{activeResult.foodName}</h3>
                <span className="text-xs text-primary-900/70 font-medium">
                  Estimated Serving: <strong className="text-primary-950">{activeResult.servingSize}</strong>
                </span>
              </div>

              {/* Health Score Pill */}
              <div className="p-3.5 rounded-2xl bg-primary-50 border border-primary-200 text-center shrink-0 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-primary-900/70 block">Health Score</span>
                <span className="font-serif text-2xl font-black text-primary-800">{activeResult.healthScore}<span className="text-xs text-primary-900/60">/100</span></span>
              </div>
            </div>

            {/* Macro Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-surface-100 border border-surface-200 text-center">
                <Flame className="w-4 h-4 text-primary-700 mx-auto mb-1" />
                <span className="text-[10px] text-primary-900/60 uppercase block font-bold">Calories</span>
                <span className="text-base font-black text-primary-950">{activeResult.calories} kcal</span>
              </div>
              <div className="p-3 rounded-2xl bg-gold-50 border border-gold-300/40 text-center">
                <Dumbbell className="w-4 h-4 text-gold-700 mx-auto mb-1" />
                <span className="text-[10px] text-gold-800 uppercase block font-bold">Protein</span>
                <span className="text-base font-black text-gold-800">{activeResult.proteinG}g</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300/40 text-center">
                <Wheat className="w-4 h-4 text-amber-700 mx-auto mb-1" />
                <span className="text-[10px] text-amber-800 uppercase block font-bold">Carbs</span>
                <span className="text-base font-black text-amber-800">{activeResult.carbsG}g</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300/40 text-center">
                <HeartPulse className="w-4 h-4 text-rose-700 mx-auto mb-1" />
                <span className="text-[10px] text-rose-800 uppercase block font-bold">Fats</span>
                <span className="text-base font-black text-rose-800">{activeResult.fatsG}g</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 rounded-2xl bg-surface-100/80 border border-surface-200">
              <span className="text-xs font-bold text-primary-950 block mb-1">
                Nutritional Synthesis
              </span>
              <p className="text-xs text-primary-900/80 leading-relaxed font-medium">
                {activeResult.aiSummary}
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-primary-50/70 border border-primary-200 space-y-2">
                <span className="font-bold text-primary-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-700" />
                  Key Bio-Benefits
                </span>
                <ul className="space-y-1.5 text-primary-900/80 text-[11px] font-medium">
                  {activeResult.pros.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Considerations
                </span>
                <ul className="space-y-1.5 text-rose-900/80 text-[11px] font-medium">
                  {activeResult.cons.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Healthier Alternatives Section */}
            {activeResult.healthierAlternatives.length > 0 && (
              <div className="p-4 rounded-2xl bg-gold-50/50 border border-gold-300/50 space-y-3">
                <span className="text-xs font-bold text-gold-900 uppercase tracking-wider block">
                  💡 AI Healthier Alternative Recommendations
                </span>
                <div className="space-y-2">
                  {activeResult.healthierAlternatives.map((alt, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-gold-500/20 flex items-center justify-between gap-4 shadow-sm">
                      <div>
                        <h5 className="font-serif text-xs font-bold text-primary-950">{alt.name}</h5>
                        <p className="text-[11px] text-primary-900/70 mt-0.5 font-medium">{alt.whyBetter}</p>
                      </div>
                      <div className="text-right shrink-0 text-xs">
                        <span className="text-primary-800 font-bold block">{alt.calories} kcal</span>
                        <span className="text-gold-700 font-bold">{alt.proteinG}g protein</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Strip */}
            <div className="pt-4 border-t border-surface-200 flex flex-wrap items-center gap-3">
              <button
                onClick={handleLogMeal}
                disabled={isLoggedSuccessfully}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  isLoggedSuccessfully
                    ? 'bg-primary-100 text-primary-800 border border-primary-300 cursor-default'
                    : 'bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 hover:from-primary-800 text-gold-200 border border-gold-500/40 shadow-luxury-sm'
                }`}
              >
                <Plus className="w-4 h-4 text-gold-300" />
                <span>{isLoggedSuccessfully ? 'Logged into Daily Dashboard!' : "Add to Today's Log"}</span>
              </button>

              <button
                onClick={handleAskAIAboutFood}
                className="py-3 px-4 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-300 text-primary-950 text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Bot className="w-4 h-4 text-primary-700" />
                <span>Ask Saarthi About This</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
