'use client';

import React, { useState } from 'react';
import { Flame, Dumbbell, Wheat, Droplets, Sparkles, ShieldCheck, HeartPulse, Activity } from 'lucide-react';

interface OrbitNode {
  id: string;
  name: string;
  value: string;
  target: string;
  status: string;
  color: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
  angleDeg: number;
  radiusPercent: number;
  bioRole: string;
  tip: string;
}

export const OrbitUniverse: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<OrbitNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<OrbitNode | null>(null);

  const nodes: OrbitNode[] = [
    {
      id: 'calories',
      name: 'Caloric Equilibrium',
      value: '2,400',
      target: '2,400 kcal/day',
      status: 'Target Met (100%)',
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      glowColor: 'shadow-glow-sm',
      icon: <Flame className="w-5 h-5 text-emerald-400" />,
      angleDeg: 0,
      radiusPercent: 36,
      bioRole: 'Cellular ATP energy generation and basal metabolic maintenance.',
      tip: 'Calibrated to +12% surplus for lean hypertrophic growth.'
    },
    {
      id: 'protein',
      name: 'Lean Protein Synthesizer',
      value: '145g',
      target: '2.0g per kg bodyweight',
      status: 'Hypertrophy Optimal',
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      glowColor: 'shadow-glow-cyan',
      icon: <Dumbbell className="w-5 h-5 text-cyan-400" />,
      angleDeg: 51.4,
      radiusPercent: 36,
      bioRole: 'Muscle myofibrillar repair, enzyme creation, and immune antibodies.',
      tip: 'Evenly distributed across 4 daily meals for sustained nitrogen balance.'
    },
    {
      id: 'carbs',
      name: 'Complex Glycogen Carbs',
      value: '265g',
      target: '45% Total Energy',
      status: 'Sustained Stamina',
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      glowColor: 'shadow-amber-500/20',
      icon: <Wheat className="w-5 h-5 text-amber-400" />,
      angleDeg: 102.8,
      radiusPercent: 36,
      bioRole: 'CNS glucose fuel and intramuscular glycogen stores for intense workouts.',
      tip: 'Sourced from oats, brown rice, whole wheat atta, and sweet potatoes.'
    },
    {
      id: 'fats',
      name: 'Essential Lipid Matrix',
      value: '68g',
      target: '26% Total Energy',
      status: 'Hormonal Balance',
      color: 'from-rose-500 to-pink-500',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      glowColor: 'shadow-rose-500/20',
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      angleDeg: 154.2,
      radiusPercent: 36,
      bioRole: 'Testosterone synthesis, cell membrane integrity, and fat-soluble vitamin absorption (A, D, E, K).',
      tip: 'Rich in monounsaturated fats from nuts, seeds, and light cold-pressed oils.'
    },
    {
      id: 'fiber',
      name: 'Prebiotic Dietary Fiber',
      value: '34g',
      target: '> 30g/day',
      status: 'Microbiome Peak',
      color: 'from-teal-400 to-emerald-600',
      textColor: 'text-teal-400',
      borderColor: 'border-teal-500/40',
      glowColor: 'shadow-teal-500/20',
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      angleDeg: 205.6,
      radiusPercent: 36,
      bioRole: 'Short-chain fatty acid (SCFA) gut generation and slow glucose absorption.',
      tip: 'Provides 14.2g fiber per 1,000 kcal for peak GI tract longevity.'
    },
    {
      id: 'water',
      name: 'Cellular Hydration Grid',
      value: '3.2L',
      target: '35-40ml / kg',
      status: '92% Hydrated',
      color: 'from-blue-400 to-cyan-600',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      glowColor: 'shadow-blue-500/20',
      icon: <Droplets className="w-5 h-5 text-blue-400" />,
      angleDeg: 257.0,
      radiusPercent: 36,
      bioRole: 'Electrolyte balance, waste filtration, and blood plasma volume support.',
      tip: 'Includes 500ml pre-workout hydration buffer.'
    },
    {
      id: 'micronutrients',
      name: 'Micro-Immune Bio-Shield',
      value: '100%',
      target: '100% RDA Targets',
      status: 'Full Bioavailability',
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      glowColor: 'shadow-glow-purple',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      angleDeg: 308.4,
      radiusPercent: 36,
      bioRole: 'Zinc, Iron, Magnesium, B12, and Vitamin D3 enzymatic co-factor optimization.',
      tip: 'Covered through dark greens, sattu, lentils, curd, and natural sunlight.'
    }
  ];

  const activeNode = selectedNode || hoveredNode || nodes[0];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* Background Orbit Ring Visualizer */}
      <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] rounded-3xl bg-surface-200/50 border border-emerald-500/20 backdrop-blur-xl p-4 sm:p-6 overflow-hidden flex items-center justify-center shadow-glass">
        
        {/* Glow ambient background rings */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Concentric Orbit Paths */}
        <div className="absolute w-[360px] sm:w-[420px] md:w-[460px] h-[360px] sm:h-[420px] md:h-[460px] rounded-full border border-emerald-500/15 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[260px] sm:w-[320px] md:w-[360px] h-[260px] sm:h-[320px] md:h-[360px] rounded-full border border-cyan-500/15" />
        <div className="absolute w-[160px] sm:w-[200px] md:w-[220px] h-[160px] sm:h-[200px] md:h-[220px] rounded-full border border-teal-500/20" />

        {/* Laser Connecting Lines to Center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          {nodes.map((node) => {
            const rad = (node.angleDeg * Math.PI) / 180;
            const cx = 50;
            const cy = 50;
            const x = cx + Math.cos(rad) * (node.radiusPercent * 0.85);
            const y = cy + Math.sin(rad) * (node.radiusPercent * 0.85);
            return (
              <line
                key={node.id}
                x1={`${cx}%`}
                y1={`${cy}%`}
                x2={`${x}%`}
                y2={`${y}%`}
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Center Node (User Avatar & Bio-Score) */}
        <div 
          onClick={() => setSelectedNode(null)}
          className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-surface-100/90 border-2 border-emerald-400/60 shadow-glow-md flex flex-col items-center justify-center text-center p-3 cursor-pointer group transition-transform duration-300 hover:scale-105"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-30 blur group-hover:opacity-60 transition duration-300 animate-pulse-glow" />
          <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mb-1" />
          <span className="text-xl sm:text-3xl font-black text-white tracking-tight">94<span className="text-xs text-emerald-400 font-medium">/100</span></span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-300 uppercase tracking-widest mt-0.5">Bio-Score</span>
          <span className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5">Arjun • Muscle Gain</span>
        </div>

        {/* Orbiting Satellite Nodes */}
        {nodes.map((node) => {
          const rad = (node.angleDeg * Math.PI) / 180;
          const xPercent = 50 + Math.cos(rad) * node.radiusPercent;
          const yPercent = 50 + Math.sin(rad) * node.radiusPercent;
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNode?.id === node.id;
          const isActive = isSelected || isHovered;

          return (
            <div
              key={node.id}
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node)}
              className={`absolute z-30 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                isActive ? 'scale-115 z-40' : 'hover:scale-105'
              }`}
            >
              {/* Orb button */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl bg-surface-50/90 border ${node.borderColor} ${node.glowColor} flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-200 ${isActive ? 'ring-2 ring-emerald-400/80 ring-offset-2 ring-offset-surface' : ''}`}>
                {node.icon}
              </div>
              <span className={`text-[9px] sm:text-[11px] font-bold mt-1 px-2 py-0.5 rounded-full bg-surface-200/95 border border-slate-700/80 whitespace-nowrap shadow-md ${node.textColor}`}>
                {node.name.split(' ')[0]} : {node.value}
              </span>
            </div>
          );
        })}

      </div>

      {/* Interactive Quick-Switch Node Chips */}
      <div className="mt-3 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {nodes.map((node) => {
          const isCurrent = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-glow-sm scale-105'
                  : 'bg-surface-100/80 text-slate-400 hover:text-slate-200 hover:bg-surface-100 border border-slate-800'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{node.name.split(' ')[0]}</span>
              <span className="opacity-75 font-normal">({node.value})</span>
            </button>
          );
        })}
      </div>

      {/* Dedicated Info Inspection Panel (Cleanly Placed Below, No Overlap) */}
      <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-surface-100/90 border border-emerald-500/30 backdrop-blur-md shadow-glass transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`p-2.5 rounded-xl bg-surface-200/80 border ${activeNode.borderColor} shrink-0`}>
              {activeNode.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white">{activeNode.name}</h4>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-semibold ${activeNode.textColor}`}>
                  {activeNode.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">{activeNode.bioRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 bg-surface-200/80 px-3.5 py-2.5 rounded-xl border border-slate-700/60 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Target Metric</span>
              <span className="text-xs font-bold text-white">{activeNode.target}</span>
            </div>
            <div className="h-7 w-px bg-slate-700" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">AI Strategy</span>
              <span className="text-xs font-medium text-emerald-300 max-w-[220px] truncate block" title={activeNode.tip}>
                {activeNode.tip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
