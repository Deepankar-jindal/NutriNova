'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Leaf, Menu, X, Bot, Zap, User, RotateCcw, LogOut, LogIn, ChevronDown } from 'lucide-react';
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
            ? 'bg-surface-200/80 backdrop-blur-xl border-b border-emerald-500/20 shadow-glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" prefetch={true} className="flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-transform">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-0.5 shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
              <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Leaf className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 absolute top-1.5 right-1.5 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Nutri<span className="text-emerald-400 font-extrabold">Saarthi</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">AI Nutrition Intelligence</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-100/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
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
                className="flex items-center gap-2 bg-surface-100/80 hover:bg-surface-100 border border-emerald-500/30 rounded-full px-3 py-1 text-xs transition cursor-pointer"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-slate-100 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">🔥 {streakDays}d</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-surface-100 border border-emerald-500/30 p-2 shadow-glass backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-emerald-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
                      {isAuthenticated ? 'Active Profile' : 'Demo Profile'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setAuthModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isAuthenticated ? 'Switch Account' : 'Sign In with Email'}</span>
                    </button>

                    {isDemoMode && (
                      <button
                        onClick={() => {
                          resetToDemo();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Reset Demo Data</span>
                      </button>
                    )}

                    {isAuthenticated && (
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-left text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition"
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
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sign In</span>
              </button>
            )}

            <Link
              href="/onboarding"
              prefetch={true}
              className="relative group px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950 fill-current" />
              <span>Build My Diet</span>
            </Link>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-surface-100 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-DEFAULT/95 border-b border-emerald-500/20 backdrop-blur-2xl px-6 py-6 space-y-3 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">{user.name}</span>
                <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">🔥 {streakDays}d streak</span>
              </div>
              <button
                onClick={() => {
                  resetToDemo();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1"
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
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-surface-100 text-slate-300 hover:bg-slate-800'
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
                className="w-full py-3 rounded-xl text-center text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-glow-sm cursor-pointer active:scale-95"
              >
                Create New AI Diet Plan
              </Link>
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-slate-300 bg-surface-100 border border-slate-800 hover:text-white"
              >
                {isAuthenticated ? 'Switch Profile' : 'Sign In with Email'}
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:text-rose-300"
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
