'use client';

import React, { useState } from 'react';
import { Flame, Dumbbell, Wheat, Droplets, Sparkles, ShieldCheck, HeartPulse, Activity, Crown } from 'lucide-react';

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
      color: 'from-primary-700 to-primary-600',
      textColor: 'text-primary-800',
      borderColor: 'border-primary-600/40',
      glowColor: 'shadow-luxury-sm',
      icon: <Flame className="w-5 h-5 text-primary-700" />,
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
      color: 'from-gold-600 to-amber-600',
      textColor: 'text-gold-800',
      borderColor: 'border-gold-500/40',
      glowColor: 'shadow-luxury-sm',
      icon: <Dumbbell className="w-5 h-5 text-gold-700" />,
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
      color: 'from-amber-600 to-yellow-600',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-500/40',
      glowColor: 'shadow-luxury-sm',
      icon: <Wheat className="w-5 h-5 text-amber-700" />,
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
      color: 'from-rose-600 to-pink-600',
      textColor: 'text-rose-800',
      borderColor: 'border-rose-500/40',
      glowColor: 'shadow-luxury-sm',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
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
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-primary-800',
      borderColor: 'border-primary-500/40',
      glowColor: 'shadow-luxury-sm',
      icon: <ShieldCheck className="w-5 h-5 text-primary-700" />,
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
      color: 'from-cyan-600 to-blue-700',
      textColor: 'text-cyan-800',
      borderColor: 'border-cyan-500/40',
      glowColor: 'shadow-luxury-sm',
      icon: <Droplets className="w-5 h-5 text-cyan-700" />,
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
      color: 'from-gold-600 to-primary-700',
      textColor: 'text-gold-800',
      borderColor: 'border-gold-500/40',
      glowColor: 'shadow-luxury-sm',
      icon: <Sparkles className="w-5 h-5 text-gold-600" />,
      angleDeg: 308.4,
      radiusPercent: 36,
      bioRole: 'Zinc, Iron, Magnesium, B12, and Vitamin D3 enzymatic co-factor optimization.',
      tip: 'Covered through dark greens, sattu, lentils, curd, and natural sunlight.'
    }
  ];

  const activeNode = selectedNode || hoveredNode || nodes[0];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] rounded-3xl bg-white/70 border border-gold-500/25 backdrop-blur-xl p-4 sm:p-6 overflow-hidden flex items-center justify-center shadow-luxury-md">
        
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,147,29,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(4,120,87,0.04)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Orbit paths */}
        <div className="absolute w-[360px] sm:w-[420px] md:w-[460px] h-[360px] sm:h-[420px] md:h-[460px] rounded-full border border-gold-500/25 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[260px] sm:w-[320px] md:w-[360px] h-[260px] sm:h-[320px] md:h-[360px] rounded-full border border-primary-700/15" />
        <div className="absolute w-[160px] sm:w-[200px] md:w-[220px] h-[160px] sm:h-[200px] md:h-[220px] rounded-full border border-gold-400/20" />

        {/* Node connectors */}
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
                stroke="#c8931d"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                className="transition-all duration-300 opacity-60"
              />
            );
          })}
        </svg>

        {/* Center Bio-Score indicator */}
        <div 
          onClick={() => setSelectedNode(null)}
          className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-white via-[#FCFBF8] to-gold-50/20 border border-gold-400/50 ring-4 ring-white/90 shadow-luxury-md backdrop-blur-sm flex flex-col items-center justify-center text-center p-3 cursor-pointer group transition-transform duration-300 hover:scale-105"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-300/20 via-gold-200/35 to-amber-200/20 opacity-60 blur-md group-hover:opacity-90 transition duration-300" />
          <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mb-0.5 relative z-10" />
          <span className="font-serif text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight leading-none relative z-10">
            94<span className="font-sans text-xs text-gold-600 font-bold ml-0.5">/100</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold text-gold-700 uppercase tracking-widest mt-1 relative z-10">Bio-Score</span>
          <span className="text-[8px] sm:text-[9px] text-primary-900/70 mt-0.5 font-medium relative z-10">Arjun • Muscle Gain</span>
        </div>

        {/* Satellites */}
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
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl bg-white border ${node.borderColor} shadow-luxury-md flex items-center justify-center backdrop-blur-md transition-all duration-200 ${isActive ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-[#FAF7F2]' : ''}`}>
                {node.icon}
              </div>
              <span className={`text-[9px] sm:text-[11px] font-bold mt-1 px-2.5 py-0.5 rounded-full bg-white border border-surface-200 whitespace-nowrap shadow-luxury-sm ${node.textColor}`}>
                {node.name.split(' ')[0]} : {node.value}
              </span>
            </div>
          );
        })}

      </div>

      {/* Node chips */}
      <div className="mt-4 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {nodes.map((node) => {
          const isCurrent = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-primary-900 text-gold-200 border border-gold-500/50 shadow-luxury-sm scale-105'
                  : 'bg-white text-primary-900/70 hover:text-primary-950 hover:bg-surface-100 border border-surface-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{node.name.split(' ')[0]}</span>
              <span className="opacity-80 font-normal">({node.value})</span>
            </button>
          );
        })}
      </div>

      {/* Metric details */}
      <div className="mt-4 p-5 sm:p-6 rounded-3xl bg-white border border-gold-500/30 backdrop-blur-md shadow-luxury-md transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className={`p-3 rounded-2xl bg-surface-100 border ${activeNode.borderColor} shrink-0 shadow-sm`}>
              {activeNode.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-serif text-base sm:text-lg font-bold text-primary-950">{activeNode.name}</h4>
                <span className={`text-[11px] px-3 py-0.5 rounded-full bg-gold-50 border border-gold-300 font-bold ${activeNode.textColor}`}>
                  {activeNode.status}
                </span>
              </div>
              <p className="text-xs text-primary-900/80 mt-1 max-w-xl leading-relaxed">{activeNode.bioRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-surface-100 px-4 py-3 rounded-2xl border border-gold-500/20 shrink-0">
            <div>
              <span className="text-[10px] text-primary-900/60 uppercase tracking-wider block font-bold">Target Metric</span>
              <span className="text-xs font-black text-primary-950">{activeNode.target}</span>
            </div>
            <div className="h-8 w-px bg-surface-300" />
            <div>
              <span className="text-[10px] text-primary-900/60 uppercase tracking-wider block font-bold">Strategy</span>
              <span className="text-xs font-semibold text-primary-800 max-w-[220px] truncate block" title={activeNode.tip}>
                {activeNode.tip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
