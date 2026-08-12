'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BookOpen, Lock, Mail, User, ArrowRight, Sparkles, ShieldCheck, 
  Eye, EyeOff, CheckCircle2, Star 
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/library';

  const { signUp, loginWithProvider } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setErrorMsg('');
    const res = await signUp(email.trim(), password, fullName.trim());
    setLoading(false);
    if (res.success) {
      router.push(redirect);
    } else {
      setErrorMsg(res.error || 'Failed to create account.');
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'discord') => {
    setLoading(true);
    const res = await loginWithProvider(provider);
    setLoading(false);
    if (res.success) {
      router.push(redirect);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel w-full max-w-lg p-6 sm:p-10 rounded-3xl border border-surface-border shadow-2xl space-y-6 relative z-10 my-6"
      >
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3 group mb-1">
            <img src="/icon.svg" alt="Lumina Books" className="w-11 h-11 rounded-2xl object-contain shadow-glow-gold transition-transform group-hover:scale-105" />
            <span className="font-serif text-3xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
              Lumina<span className="gold-gradient-text">.</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Create Reader Account</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto">
            Join over 8,500+ executives & founders accessing digital masterclasses.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Express Social Signup */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignUp('google')}
              className="py-2.5 px-2 rounded-xl bg-surface-card border border-surface-border text-slate-200 text-[11px] font-semibold hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignUp('discord')}
              className="py-2.5 px-2 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/40 text-slate-200 text-[11px] font-semibold hover:bg-[#5865F2]/25 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-[#5865F2]" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .373-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Discord</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-surface-border w-full" />
          <span className="bg-surface-card px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider absolute">
            Or Register with Email
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Alexander Vance"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-slate-400">For instant delivery receipt</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Create Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-button py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-glow-gold hover:scale-[1.01] transition-transform"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <>
                <span>Create Account & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Badges Footer */}
        <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-bit SSL Security</span>
          </div>
          <div>
            Already have an account?{' '}
            <Link href={`/auth/login?redirect=${encodeURIComponent(redirect)}`} className="text-gold font-bold hover:underline ml-0.5">
              Sign In
            </Link>
          </div>
        </div>

      </motion.div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <SignUpContent />
    </Suspense>
  );
}
