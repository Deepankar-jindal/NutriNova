import type { Metadata } from 'next';
import './globals.css';
import { NutritionProvider } from '../context/NutritionContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SaarthiChat } from '../components/chat/SaarthiChat';

export const metadata: Metadata = {
  title: 'NutriSaarthi — AI Bio-Adaptive Nutrition & Diet Intelligence',
  description: 'Luxury AI-powered personalized nutrition and budget-aware diet recommendation platform crafted with bio-intelligence.',
  keywords: 'AI diet planner, nutrition intelligence, meal planner, calorie tracker, food scanner, healthy recipes, macro tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-background text-foreground antialiased selection:bg-gold-500 selection:text-white flex flex-col min-h-screen">
        <NutritionProvider>
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <SaarthiChat />
        </NutritionProvider>
      </body>
    </html>
  );
}
