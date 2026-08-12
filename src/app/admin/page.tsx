'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, ArrowRight, BookOpen, KeyRound, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/lib/auth/admin-context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminUser, loginAdmin } = useAdminAuth();
  
  const [email, setEmail] = useState('admin@luminabooks.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (adminUser) {
      router.push('/admin/dashboard');
    }
  }, [adminUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await loginAdmin(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/admin/dashboard');
    } else {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-background">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-gold/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel w-full max-w-md p-8 sm:p-10 rounded-3xl border border-surface-border shadow-2xl space-y-6 relative z-10 my-6 bg-surface-card"
      >
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <img src="/icon.svg" alt="Lumina Admin" className="w-14 h-14 rounded-2xl object-contain mx-auto shadow-glow-gold" />
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
              Lumina<span className="gold-gradient-text">.Admin</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Restricted Management Portal • Store Control Center
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Admin Email / Username</span>
              <span className="text-[10px] text-slate-400">Server Authentication</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@luminabooks.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-button py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-glow-gold hover:scale-[1.01] transition-transform cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                <span>Authenticating Session...</span>
              </div>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-background" />
                <span>Sign In to Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Seals */}
        <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Session</span>
          </div>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            Return to Storefront
          </Link>
        </div>

      </motion.div>
    </main>
  );
}
