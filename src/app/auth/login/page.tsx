'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BookOpen, Lock, Mail, ArrowRight, Sparkles, ShieldCheck, 
  Eye, EyeOff, CheckCircle2, Star, KeyRound 
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/library';

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email || 'alex@example.com', 'customer');
    setLoading(false);
    router.push(redirect);
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
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center shadow-glow-gold transition-transform group-hover:scale-105">
              <BookOpen className="w-6 h-6 text-background stroke-[2.5]" />
            </div>
            <span className="font-serif text-3xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
              Lumina<span className="gold-gradient-text">.</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Sign In to Lumina</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto">
            {redirect.includes('ebook') 
              ? 'Please log in to your account to complete your eBook purchase.'
              : 'Access your purchased masterclasses, cloud reader & DRM-free downloads.'}
          </p>
        </div>

        {/* Social Express Login */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="submit"
              className="py-2.5 px-3 rounded-xl bg-surface-card border border-surface-border text-slate-200 text-xs font-semibold hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
              </svg>
              <span>Google Sign In</span>
            </button>
            <button
              type="submit"
              className="py-2.5 px-3 rounded-xl bg-surface-card border border-surface-border text-slate-200 text-xs font-semibold hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.82c.69-.85 1.15-2.02 1.02-3.2-.99.04-2.2.66-2.9 1.48-.63.73-1.18 1.92-1.03 3.07 1.11.09 2.22-.5 2.91-1.35z"/>
              </svg>
              <span>Apple ID</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-surface-border w-full" />
          <span className="bg-surface-card px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider absolute">
            Or with Credentials
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-slate-400">US & International</span>
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
            <div className="flex justify-between text-xs mb-1.5 font-semibold">
              <label className="text-slate-300">Password</label>
              <Link href="/auth/forgot-password" className="text-gold hover:underline text-[11px]">
                Forgot password?
              </Link>
            </div>
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
                <span>Signing In...</span>
              </div>
            ) : (
              <>
                <span>Sign In & Continue</span>
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
            Don&apos;t have an account?{' '}
            <Link href={`/auth/signup?redirect=${encodeURIComponent(redirect)}`} className="text-gold font-bold hover:underline ml-0.5">
              Sign Up
            </Link>
          </div>
        </div>

      </motion.div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
