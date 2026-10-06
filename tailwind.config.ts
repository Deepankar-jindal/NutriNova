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
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Cinzel', 'Playfair Display', 'serif'],
      },
      colors: {
        background: '#FAF7F2', // Luxurious warm ivory / porcelain cream
        foreground: '#132A1E', // Deep emerald charcoal for crisp readability
        surface: {
          50: '#FFFFFF',       // Pure crisp card white
          100: '#F5EFEB',      // Soft warm pearl
          200: '#EFE7DE',      // Creamy linen
          300: '#E3D8CB',      // Accent cream border
          DEFAULT: '#FAF7F2',
          border: 'rgba(6, 78, 59, 0.12)',
          goldBorder: 'rgba(217, 119, 6, 0.22)',
          glass: 'rgba(255, 255, 255, 0.82)',
          glassDark: 'rgba(13, 40, 24, 0.92)',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b', // Deep Imperial Emerald
          950: '#022c22',
          DEFAULT: '#047857',
          glow: 'rgba(4, 120, 87, 0.25)',
        },
        gold: {
          50: '#fffdf5',
          100: '#fef9e7',
          200: '#fdf0c5',
          300: '#fae39d',
          400: '#f4ce6b',
          500: '#e5b338',
          600: '#c8931d', // Rich Royal Gold
          700: '#a37114',
          800: '#845716',
          900: '#6f4717',
          DEFAULT: '#c8931d',
          glow: 'rgba(200, 147, 29, 0.35)',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0d9488',
          600: '#0f766e',
          DEFAULT: '#0f766e',
          glow: 'rgba(15, 118, 110, 0.25)',
        },
        accent: {
          gold: '#c8931d',
          amber: '#d97706',
          emerald: '#047857',
          sage: '#4b6354',
          rose: '#be123c',
          blue: '#1d4ed8',
          cyan: '#0e7490',
        },
      },
      boxShadow: {
        'luxury-sm': '0 2px 8px -1px rgba(6, 78, 59, 0.06), 0 1px 3px -1px rgba(200, 147, 29, 0.08)',
        'luxury-md': '0 8px 24px -4px rgba(6, 78, 59, 0.08), 0 2px 6px -2px rgba(200, 147, 29, 0.1)',
        'luxury-lg': '0 20px 40px -12px rgba(6, 78, 59, 0.12), 0 4px 16px -4px rgba(200, 147, 29, 0.12)',
        'gold-glow': '0 0 25px -4px rgba(200, 147, 29, 0.35)',
        'emerald-glow': '0 0 25px -4px rgba(4, 120, 87, 0.3)',
        'glass-luxury': '0 8px 32px 0 rgba(13, 40, 24, 0.06)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
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
        },
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
