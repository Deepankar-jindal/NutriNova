'use client';

import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, User, CheckCircle2, AlertCircle, Eye, EyeOff, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signUp } = useNutrition();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    if (isLoading) return;
    setErrorMessage('');
    setSuccessMessage('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const res = await signUp(name, email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Failed to create account. Please try again.');
          setIsLoading(false);
          return;
        }
        setSuccessMessage(`Account created! Welcome, ${name || email.split('@')[0]} 🎉`);
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Invalid credentials or failed to sign in.');
          setIsLoading(false);
          return;
        }
        setSuccessMessage(`Signed in successfully! Welcome back 🎉`);
      }

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#06b6d4', '#f59e0b'],
        });
      } catch {}

      // Auto close after showing success
      setTimeout(() => {
        setIsLoading(false);
        handleClose();
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during authentication.');
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async (demoEmail: string, demoName: string) => {
    setEmail(demoEmail);
    setPassword('demopassword123');
    setName(demoName);
    setIsLoading(true);
    setErrorMessage('');

    const res = await login(demoEmail, 'demopassword123');
    if (res.success) {
      setSuccessMessage(`Signed in as ${demoName}! 🚀`);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#06b6d4'],
        });
      } catch {}
      setTimeout(() => {
        setIsLoading(false);
        handleClose();
      }, 1000);
    } else {
      setIsLoading(false);
      setErrorMessage(res.error || 'Demo login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-surface-DEFAULT border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-glass overflow-hidden">
        
        {/* Top glow ambient effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-24 bg-gradient-to-b from-emerald-500/25 to-teal-500/5 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-2 rounded-xl bg-surface-100 border border-slate-800 text-slate-400 hover:text-white transition disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 shadow-glow-sm">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {isSignUp ? 'Join NutriSaarthi' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp
              ? 'Start your personalized AI nutrition & meal journey.'
              : 'Sign in to access your synchronized diet plans & logs.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-400 text-xs animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center gap-2.5 text-emerald-300 text-xs font-semibold animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Arjun Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-9 pr-3 py-2.5 bg-surface-100 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full pl-9 pr-3 py-2.5 bg-surface-100 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="•••••••• (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full pl-9 pr-10 py-2.5 bg-surface-100 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>{isSignUp ? 'Creating Profile...' : 'Authenticating...'}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>{isSignUp ? 'Create My Account' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <p className="text-[11px] text-center text-slate-400 mb-2">Or test instantly with 1-click:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleDemoSignIn('arjun.sharma@example.com', 'Arjun Sharma')}
              className="px-2.5 py-2 rounded-xl bg-surface-100 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 text-[11px] text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <span>👤 Arjun (Demo)</span>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleDemoSignIn('priya.patel@example.com', 'Priya Patel')}
              className="px-2.5 py-2 rounded-xl bg-surface-100 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 text-[11px] text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <span>👩 Priya (Demo)</span>
            </button>
          </div>
        </div>

        {/* Toggle Sign Up / Sign In */}
        <div className="text-center mt-4">
          <button
            disabled={isLoading}
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className="text-xs text-slate-400 hover:text-emerald-400 transition"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
};

