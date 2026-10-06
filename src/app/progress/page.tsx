'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Dumbbell,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Activity,
  Award,
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

export default function ProgressPage() {
  const { progressHistory, streakDays } = useNutrition();
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '3m'>('7d');

  const avgAdherence = Math.round(
    progressHistory.reduce((sum, d) => sum + d.adherenceScore, 0) / progressHistory.length
  );

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FAF7F2]">
      
      {/* Header */}
      <div className="pt-4 border-b border-surface-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold mb-2 shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-primary-700" />
            <span>Health &amp; Nutrition Analytics</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-black text-primary-950 tracking-tight">
            Progress &amp; Adherence Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-primary-900/70 mt-1 font-medium">
            Visualizing metabolic consistency, weekly macro fidelity, and automated AI nutritional reviews.
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex bg-white p-1 rounded-2xl border border-surface-300 w-fit shadow-sm">
          {[
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '3m', label: '3 Months' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeframe(t.id as '7d' | '30d' | '3m')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                timeframe === t.id
                  ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-200 border border-gold-500/40 shadow-sm'
                  : 'text-primary-900/70 hover:text-primary-950'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Core KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Streak Card */}
        <div className="p-6 rounded-3xl bg-white border border-gold-500/30 backdrop-blur-xl shadow-luxury-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-gold-800 tracking-wider block">
              Nutrition Streak
            </span>
            <span className="font-serif text-3xl font-black text-primary-950 mt-1 block">
              🔥 {streakDays} Days
            </span>
            <span className="text-xs text-primary-900/70 mt-0.5 block font-medium">Consistent logging &amp; macro balance</span>
          </div>
          <div className="p-3 rounded-2xl bg-gold-100 text-gold-700">
            <Award className="w-8 h-8" />
          </div>
        </div>

        {/* Weekly Score */}
        <div className="p-6 rounded-3xl bg-white border border-primary-600/30 backdrop-blur-xl shadow-luxury-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-primary-800 tracking-wider block">
              Weekly Bio-Score
            </span>
            <span className="font-serif text-3xl font-black text-primary-900 mt-1 block">
              {avgAdherence}<span className="text-xs text-primary-900/60 font-medium">/100</span>
            </span>
            <span className="text-xs text-primary-900/70 mt-0.5 block font-medium">Top 5% adherence in community</span>
          </div>
          <div className="p-3 rounded-2xl bg-primary-100 text-primary-800">
            <Activity className="w-8 h-8" />
          </div>
        </div>

        {/* Goal Progress */}
        <div className="p-6 rounded-3xl bg-white border border-gold-500/30 backdrop-blur-xl shadow-luxury-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-gold-800 tracking-wider block">
              Muscle Phase Progress
            </span>
            <span className="font-serif text-3xl font-black text-gold-800 mt-1 block">
              68% Completed
            </span>
            <span className="text-xs text-primary-900/70 mt-0.5 block font-medium">74.0 kg • Targeting 76.5 kg</span>
          </div>
          <div className="p-3 rounded-2xl bg-gold-100 text-gold-700">
            <Dumbbell className="w-8 h-8" />
          </div>
        </div>

      </div>

      {/* Interactive Daily Calorie & Protein Chart */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-gold-600/30 backdrop-blur-xl shadow-luxury-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary-950">Daily Calorie &amp; Protein Fidelity</h3>
            <p className="text-xs text-primary-900/70 font-medium">Comparing actual logged calories against target over the past week.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-primary-800">
              <span className="w-3 h-3 rounded-sm bg-primary-700 inline-block" /> Calorie Intake
            </span>
            <span className="flex items-center gap-1.5 text-gold-700">
              <span className="w-3 h-3 rounded-sm bg-gold-500 inline-block" /> Protein (g)
            </span>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div className="grid grid-cols-7 gap-3 pt-4 items-end h-56 border-b border-surface-200 pb-4">
          {progressHistory.map((day, i) => {
            const calHeightPercent = Math.min(100, Math.round((day.caloriesConsumed / 2600) * 100));
            const protHeightPercent = Math.min(100, Math.round((day.proteinConsumedG / 160) * 100));

            return (
              <div key={i} className="flex flex-col items-center h-full justify-end group">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary-950 text-white p-2 rounded-xl text-[10px] text-center mb-2 shadow-xl whitespace-nowrap">
                  <span className="font-bold block">{day.caloriesConsumed} kcal</span>
                  <span className="text-gold-300 block">{day.proteinConsumedG}g prot</span>
                </div>

                {/* Bars side-by-side */}
                <div className="flex items-end gap-1 w-full max-w-[40px] h-full justify-center">
                  <div
                    style={{ height: `${calHeightPercent}%` }}
                    className="w-3.5 rounded-t-lg bg-gradient-to-t from-primary-800 to-primary-600 transition-all duration-500"
                  />
                  <div
                    style={{ height: `${protHeightPercent}%` }}
                    className="w-3.5 rounded-t-lg bg-gradient-to-t from-gold-600 to-gold-400 transition-all duration-500"
                  />
                </div>

                <span className="text-[11px] font-bold text-primary-900/70 mt-2 block">
                  {day.dayLabel.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI WEEKLY REVIEW */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-gold-600/30 backdrop-blur-xl shadow-luxury-md space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-surface-200">
          <div className="p-2.5 rounded-2xl bg-gold-50 border border-gold-300 text-gold-700 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-primary-950">Your AI Nutrition Review</h3>
            <p className="text-xs text-primary-900/70 font-medium">Weekly automated synthesis computed by Saarthi Engine</p>
          </div>
        </div>

        {/* 3 Columns: What Went Well, What Can Improve, AI Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Col 1 */}
          <div className="p-4 rounded-2xl bg-primary-50/70 border border-primary-200 space-y-3">
            <span className="text-xs font-bold text-primary-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary-700" />
              What Went Well
            </span>
            <ul className="space-y-2 text-xs text-primary-900/80 font-medium">
              <li>• Your protein intake improved by <strong>+14%</strong> this week.</li>
              <li>• You logged meals on <strong>6 of 7 days</strong> with high fidelity.</li>
              <li>• Average calorie consumption was within <strong>3%</strong> of target.</li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="p-4 rounded-2xl bg-gold-50/70 border border-gold-200 space-y-3">
            <span className="text-xs font-bold text-gold-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-gold-700" />
              What Can Improve
            </span>
            <ul className="space-y-2 text-xs text-primary-900/80 font-medium">
              <li>• Fiber intake dipped slightly on Friday (22g vs 34g target).</li>
              <li>• Water hydration lagged on weekend mornings.</li>
              <li>• Snack timing fluctuated on high-workload days.</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="p-4 rounded-2xl bg-surface-100 border border-surface-300 space-y-3">
            <span className="text-xs font-bold text-primary-950 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-600" />
              AI Recommendations
            </span>
            <ul className="space-y-2 text-xs text-primary-900/80 font-medium">
              <li>• Add 1 bowl of steamed broccoli / palak to dinner for prebiotic fiber.</li>
              <li>• Set a 500ml hydration buffer immediately post-waking.</li>
              <li>• Keep roasted sattu &amp; nuts pre-portioned for seamless snacking.</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
