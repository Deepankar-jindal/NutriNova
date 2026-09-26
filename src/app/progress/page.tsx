'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  Dumbbell,
  Droplet,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Activity,
  Award,
} from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

export default function ProgressPage() {
  const { progressHistory, streakDays, user, profile } = useNutrition();
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '3m'>('7d');

  const avgAdherence = Math.round(
    progressHistory.reduce((sum, d) => sum + d.adherenceScore, 0) / progressHistory.length
  );

  const avgProtein = Math.round(
    progressHistory.reduce((sum, d) => sum + d.proteinConsumedG, 0) / progressHistory.length
  );

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pt-4 border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Health &amp; Nutrition Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Progress &amp; Adherence Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualizing metabolic consistency, weekly macro fidelity, and automated AI nutritional reviews.
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex bg-surface-100 p-1 rounded-2xl border border-slate-800 w-fit">
          {[
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: '30 Days' },
            { id: '3m', label: '3 Months' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeframe(t.id as '7d' | '30d' | '3m')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                timeframe === t.id
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
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
        <div className="p-6 rounded-3xl bg-surface-200/80 border border-amber-500/30 backdrop-blur-xl shadow-glass flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
              Nutrition Streak
            </span>
            <span className="text-3xl font-black text-white mt-1 block">
              🔥 {streakDays} Days
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">Consistent logging &amp; macro balance</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
            <Award className="w-8 h-8" />
          </div>
        </div>

        {/* Weekly Score */}
        <div className="p-6 rounded-3xl bg-surface-200/80 border border-emerald-500/30 backdrop-blur-xl shadow-glass flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
              Weekly Bio-Score
            </span>
            <span className="text-3xl font-black text-emerald-400 mt-1 block">
              {avgAdherence}<span className="text-xs text-slate-400 font-normal">/100</span>
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">Top 5% adherence in community</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <Activity className="w-8 h-8" />
          </div>
        </div>

        {/* Goal Progress */}
        <div className="p-6 rounded-3xl bg-surface-200/80 border border-cyan-500/30 backdrop-blur-xl shadow-glass flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
              Muscle Phase Progress
            </span>
            <span className="text-3xl font-black text-cyan-300 mt-1 block">
              68% Completed
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">74.0 kg • Targeting 76.5 kg</span>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Dumbbell className="w-8 h-8" />
          </div>
        </div>

      </div>

      {/* Interactive Daily Calorie & Protein Chart */}
      <div className="p-6 md:p-8 rounded-3xl bg-surface-200/80 border border-emerald-500/30 backdrop-blur-xl shadow-glass space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">Daily Calorie &amp; Protein Fidelity</h3>
            <p className="text-xs text-slate-400">Comparing actual logged calories against target over the past week.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" /> Calorie Intake
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block" /> Protein (g)
            </span>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div className="grid grid-cols-7 gap-3 pt-4 items-end h-56 border-b border-slate-800 pb-4">
          {progressHistory.map((day, i) => {
            const calHeightPercent = Math.min(100, Math.round((day.caloriesConsumed / 2600) * 100));
            const protHeightPercent = Math.min(100, Math.round((day.proteinConsumedG / 160) * 100));

            return (
              <div key={i} className="flex flex-col items-center h-full justify-end group">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-surface-DEFAULT border border-slate-700 p-1.5 rounded-lg text-[10px] text-center mb-2 shadow-xl whitespace-nowrap">
                  <span className="font-bold text-white block">{day.caloriesConsumed} kcal</span>
                  <span className="text-cyan-400 block">{day.proteinConsumedG}g prot</span>
                </div>

                {/* Bars side-by-side */}
                <div className="flex items-end gap-1 w-full max-w-[40px] h-full justify-center">
                  <div
                    style={{ height: `${calHeightPercent}%` }}
                    className="w-3.5 rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-500"
                  />
                  <div
                    style={{ height: `${protHeightPercent}%` }}
                    className="w-3.5 rounded-t-lg bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all duration-500"
                  />
                </div>

                <span className="text-[11px] font-bold text-slate-400 mt-2 block">
                  {day.dayLabel.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI WEEKLY REVIEW (SECTION 18) */}
      <div className="p-6 md:p-8 rounded-3xl bg-surface-200/80 border border-emerald-500/30 backdrop-blur-xl shadow-glass space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 shadow-glow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Your AI Nutrition Review</h3>
            <p className="text-xs text-slate-400">Weekly automated synthesis computed by Saarthi Engine</p>
          </div>
        </div>

        {/* 3 Columns: What Went Well, What Can Improve, AI Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Col 1 */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              What Went Well
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Your protein intake improved by <strong>+14%</strong> this week.</li>
              <li>• You logged meals on <strong>6 of 7 days</strong> with high fidelity.</li>
              <li>• Average calorie consumption was within <strong>3%</strong> of target.</li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              What Can Improve
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Fiber intake dipped slightly on Friday (22g vs 34g target).</li>
              <li>• Water hydration lagged on weekend mornings.</li>
              <li>• Snack timing fluctuated on high-workload days.</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              AI Recommendations
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
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
