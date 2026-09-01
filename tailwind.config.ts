import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#060a0f',
        surface: {
          50: '#152433',
          100: '#101d29',
          200: '#0c1620',
          DEFAULT: '#091118',
          border: 'rgba(16, 185, 129, 0.15)',
          glass: 'rgba(11, 20, 29, 0.65)',
        },
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Emerald
          600: '#059669',
          700: '#047857',
          DEFAULT: '#10b981',
          glow: 'rgba(16, 185, 129, 0.35)',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Teal
          600: '#0d9488',
          DEFAULT: '#14b8a6',
          glow: 'rgba(20, 184, 166, 0.35)',
        },
        accent: {
          cyan: '#06b6d4',
          purple: '#a855f7',
          amber: '#f59e0b',
          rose: '#f43f5e',
          blue: '#3b82f6',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(16, 185, 129, 0.3)',
        'glow-md': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-lg': '0 0 40px -8px rgba(16, 185, 129, 0.5)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        'scan-laser': {
          '0%': { top: '0%' },
          '50%': { top: '95%' },
          '100%': { top: '0%' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan-laser': 'scan-laser 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        orbit: 'orbit 25s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
