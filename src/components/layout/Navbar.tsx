'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Leaf, Menu, X, Zap, User, RotateCcw, LogOut, LogIn, ChevronDown } from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';
import { AuthModal } from '../auth/AuthModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isDemoMode, isAuthenticated, resetToDemo, logout, streakDays } = useNutrition();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/food-scanner', label: 'Food Scanner' },
    { href: '/what-if', label: 'What-If? ⚡' },
    { href: '/grocery', label: 'Grocery' },
    { href: '/recipes', label: 'Recipes' },
    { href: '/progress', label: 'Progress' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Eagerly prefetch all routes on mount for zero-latency redirects
    navLinks.forEach((link) => {
      router.prefetch(link.href);
    });
    router.prefetch('/onboarding');

    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-primary-900/10 shadow-luxury-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" prefetch={true} className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-transform">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-800 via-primary-700 to-gold-600 p-0.5 shadow-luxury-sm group-hover:shadow-gold-glow transition-all duration-300">
              <div className="w-full h-full bg-[#FAF7F2] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Leaf className="w-5 h-5 text-primary-800 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-3.5 h-3.5 text-gold-500 absolute top-1 right-1 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary-950 flex items-center gap-1">
                Nutri<span className="text-gradient-emerald-gold font-extrabold italic">Saarthi</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-primary-800/70 font-semibold -mt-1">
                Bio-Nutrition Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/80 border border-primary-900/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-luxury-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-200 shadow-sm border border-gold-500/30'
                      : 'text-primary-900/80 hover:text-primary-950 hover:bg-surface-200/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* User Profile / Status Badge */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-white/90 hover:bg-surface-100 border border-gold-600/30 rounded-full px-3.5 py-1.5 text-xs text-primary-950 shadow-luxury-sm transition cursor-pointer"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                </span>
                <span className="font-bold text-primary-950 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] text-gold-700 font-extrabold bg-gold-100 px-2 py-0.5 rounded-full border border-gold-400/40">
                  🔥 {streakDays}d
                </span>
                <ChevronDown className="w-3 h-3 text-primary-700/60" />
              </button>

              {/* Profile Dropdown */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-gold-600/30 p-2 shadow-luxury-lg backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2.5 border-b border-surface-200 bg-surface-100/50 rounded-xl mb-1">
                    <p className="text-xs font-bold text-primary-950 truncate">{user.name}</p>
                    <p className="text-[11px] text-primary-700 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-primary-50 text-primary-800 font-bold border border-primary-200">
                      {isAuthenticated ? 'Active Profile' : 'Demo Profile'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setAuthModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs text-primary-900 hover:text-primary-950 hover:bg-surface-100 flex items-center gap-2 transition"
                    >
                      <User className="w-3.5 h-3.5 text-primary-700" />
                      <span>{isAuthenticated ? 'Switch Account' : 'Sign In with Email'}</span>
                    </button>

                    {isDemoMode && (
                      <button
                        onClick={() => {
                          resetToDemo();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs text-primary-900 hover:text-primary-950 hover:bg-surface-100 flex items-center gap-2 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-gold-600" />
                        <span>Reset Demo Data</span>
                      </button>
                    )}

                    {isAuthenticated && (
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sign In button if not authenticated */}
            {!isAuthenticated && (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold text-primary-900 hover:text-primary-950 transition flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-gold-600" />
                <span>Sign In</span>
              </button>
            )}

            <Link
              href="/onboarding"
              prefetch={true}
              className="relative group px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 hover:from-primary-800 hover:to-primary-700 border border-gold-500/40 shadow-luxury-sm hover:shadow-gold-glow transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-gold-400 fill-current" />
              <span>Build My Diet</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-primary-900/10 text-primary-900 hover:text-primary-950 shadow-luxury-sm"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2]/98 border-b border-gold-600/20 backdrop-blur-2xl px-6 py-6 space-y-3 animate-in slide-in-from-top-4 duration-300 shadow-luxury-lg">
            <div className="flex items-center justify-between pb-3 border-b border-surface-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-700" />
                <span className="text-sm font-bold text-primary-950">{user.name}</span>
                <span className="text-xs text-gold-800 font-bold bg-gold-100 px-2.5 py-0.5 rounded-full border border-gold-300">
                  🔥 {streakDays}d streak
                </span>
              </div>
              <button
                onClick={() => {
                  resetToDemo();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-primary-700 hover:text-primary-950 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-primary-900 text-gold-200 border border-gold-500/40 shadow-sm'
                        : 'bg-white text-primary-900 hover:bg-surface-200 border border-primary-900/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <Link
                href="/onboarding"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 shadow-luxury-md cursor-pointer active:scale-95 border border-gold-500/30"
              >
                Create New AI Diet Plan
              </Link>
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-primary-900 bg-white border border-primary-900/10 hover:bg-surface-100"
              >
                {isAuthenticated ? 'Switch Profile' : 'Sign In with Email'}
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:text-rose-700"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
