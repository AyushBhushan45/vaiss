'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-surface-border shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-background stroke-[2.5]" />
            </div>
            <span className="font-serif text-2xl font-bold text-white">Lumina<span className="gold-gradient-text">.</span></span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-xs text-slate-400">Enter your account email to receive a password recovery link.</p>
        </div>

        {sent ? (
          <div className="p-6 bg-emerald-950/40 border border-emerald-800/50 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-white">Reset Email Dispatched</h3>
            <p className="text-xs text-slate-300">
              We have sent a secure recovery link to <strong className="text-gold">{email}</strong>. Check your inbox to set a new password.
            </p>
            <Link href="/auth/login" className="gold-button px-6 py-2.5 rounded-xl font-bold text-xs inline-block">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-card border border-surface-border rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full gold-button py-3 rounded-xl font-bold text-xs"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-surface-border/40">
          <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>

      </div>
    </main>
  );
}
