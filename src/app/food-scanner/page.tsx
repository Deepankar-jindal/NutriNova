'use client';

import React, { useState } from 'react';
import {
  Scan,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  Dumbbell,
  Wheat,
  HeartPulse,
  Bot,
  Plus,
  RefreshCw,
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
    }, 900);
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
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pt-4 border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
          <Scan className="w-3.5 h-3.5" />
          <span>Computer Vision Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          AI Food Scanner &amp; Macro Vision
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Upload or select a meal to instantly analyze portion weights, glycemic impact, macros, and healthier alternatives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Upload & Sample Picker */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Visual Drag-and-Drop Scanner Zone */}
          <div className="relative rounded-3xl bg-surface-200/70 border-2 border-dashed border-cyan-500/40 p-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
            
            {/* Visual Image Preview */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-lg">
              <img
                src={activeResult.imageUrl}
                alt={activeResult.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-DEFAULT/70 to-transparent" />

              {/* Scanning Laser Beam Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-scan-laser absolute" />
                  <div className="p-3 rounded-2xl bg-surface-DEFAULT/90 border border-cyan-500/40 shadow-glow-cyan text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Neural Vision Processing...</span>
                  </div>
                </div>
              )}

              {/* Confidence badge */}
              {!isScanning && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-DEFAULT/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold backdrop-blur-md">
                  {activeResult.confidence}% AI Confidence
                </div>
              )}
            </div>

            {/* Upload Button Trigger */}
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-surface-100 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-2 shadow">
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              <span>Upload Custom Meal Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
            <span className="text-[10px] text-slate-500 mt-2">Supports JPG, PNG, WEBP (Camera capture enabled)</span>
          </div>

          {/* Quick Demo Scan Presets */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
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
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 shadow-glow-cyan'
                        : 'bg-surface-100/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                      <span className="text-[10px] text-slate-400">{item.calories} kcal</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col: AI Food Analysis Output */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-surface-200/80 border border-emerald-500/30 backdrop-blur-xl shadow-glass space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  AI Food Analysis Result
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">{activeResult.foodName}</h3>
                <span className="text-xs text-slate-400">
                  Estimated Serving: <strong className="text-slate-200">{activeResult.servingSize}</strong>
                </span>
              </div>

              {/* Health Score Pill */}
              <div className="p-3 rounded-2xl bg-surface-100 border border-emerald-500/40 text-center shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Health Score</span>
                <span className="text-2xl font-black text-emerald-400">{activeResult.healthScore}<span className="text-xs text-slate-400">/100</span></span>
              </div>
            </div>

            {/* Macro Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-surface-100 border border-slate-800 text-center">
                <Flame className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Calories</span>
                <span className="text-base font-black text-white">{activeResult.calories} kcal</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-100 border border-cyan-500/20 text-center">
                <Dumbbell className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] text-cyan-400 uppercase block font-semibold">Protein</span>
                <span className="text-base font-black text-cyan-300">{activeResult.proteinG}g</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-100 border border-amber-500/20 text-center">
                <Wheat className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[10px] text-amber-400 uppercase block font-semibold">Carbs</span>
                <span className="text-base font-black text-amber-300">{activeResult.carbsG}g</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-100 border border-rose-500/20 text-center">
                <HeartPulse className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                <span className="text-[10px] text-rose-400 uppercase block font-semibold">Fats</span>
                <span className="text-base font-black text-rose-300">{activeResult.fatsG}g</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 rounded-2xl bg-surface-100/90 border border-slate-800">
              <span className="text-xs font-bold text-emerald-300 block mb-1">
                Nutritional Synthesis
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeResult.aiSummary}
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Key Bio-Benefits
                </span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  {activeResult.pros.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Considerations
                </span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  {activeResult.cons.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Healthier Alternatives Section */}
            {activeResult.healthierAlternatives.length > 0 && (
              <div className="p-4 rounded-2xl bg-surface-100/60 border border-cyan-500/30 space-y-3">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  💡 AI Healthier Alternative Recommendations
                </span>
                <div className="space-y-2">
                  {activeResult.healthierAlternatives.map((alt, i) => (
                    <div key={i} className="p-3 rounded-xl bg-surface-200/80 border border-slate-800 flex items-center justify-between gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-white">{alt.name}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{alt.whyBetter}</p>
                      </div>
                      <div className="text-right shrink-0 text-xs">
                        <span className="text-emerald-400 font-bold block">{alt.calories} kcal</span>
                        <span className="text-cyan-400 font-medium">{alt.proteinG}g protein</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Strip */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <button
                onClick={handleLogMeal}
                disabled={isLoggedSuccessfully}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  isLoggedSuccessfully
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-glow-sm hover:from-emerald-300'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{isLoggedSuccessfully ? 'Logged into Daily Dashboard!' : "Add to Today's Log"}</span>
              </button>

              <button
                onClick={handleAskAIAboutFood}
                className="py-3 px-4 rounded-xl bg-surface-100 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Ask Saarthi About This</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
