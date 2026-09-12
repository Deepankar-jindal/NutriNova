import type { Metadata } from 'next';
import './globals.css';
import { NutritionProvider } from '../context/NutritionContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SaarthiChat } from '../components/chat/SaarthiChat';

export const metadata: Metadata = {
  title: 'NutriSaarthi — Your AI Companion for Smarter Nutrition',
  description: 'Futuristic AI-powered personalized nutrition and budget-aware diet recommendation platform.',
  keywords: 'AI diet planner, nutrition intelligence, meal planner, calorie tracker, food scanner, healthy recipes, macro tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col min-h-screen">
        <NutritionProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <SaarthiChat />
        </NutritionProvider>
      </body>
    </html>
  );
}
