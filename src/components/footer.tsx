import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Lock, Award, RefreshCw, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-border mt-24">
      {/* Executive Trust & Reader Community Ribbon */}
      <div className="border-b border-surface-border/60 bg-gradient-to-r from-surface-card/60 via-surface/80 to-surface-card/60 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Reader Avatars + Rating */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              <img className="inline-block h-9 w-9 rounded-full ring-2 ring-gold/40 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Reader" />
              <img className="inline-block h-9 w-9 rounded-full ring-2 ring-gold/40 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Reader" />
              <img className="inline-block h-9 w-9 rounded-full ring-2 ring-gold/40 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Reader" />
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-background text-[11px] font-bold ring-2 ring-gold/40">
                +8.5k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {'★'.repeat(5).split('').map((star, i) => (
                  <span key={i} className="text-gold text-sm font-bold">★</span>
                ))}
                <span className="text-xs font-bold text-white ml-1">4.95 / 5.0 Rating</span>
              </div>
              <span className="text-[11px] text-slate-400">Trusted by over 8,500+ global founders & executives</span>
            </div>
          </div>

          {/* Key Guarantee Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% DRM-Free Downloads</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border text-gold">
              <Lock className="w-4 h-4 text-gold" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border text-slate-200">
              <Award className="w-4 h-4 text-gold" />
              <span>Lifetime License & Cloud Sync</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-background stroke-[2.5]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Lumina<span className="gold-gradient-text">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Lumina Books is a premium digital publishing platform delivering masterclass eBooks on wealth creation, behavioral psychology, and high-stakes entrepreneurship.
            </p>
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-3">
              <span>© {new Date().getFullYear()} Lumina Digital Publishing Inc. All rights reserved.</span>
              <span>•</span>
              <Link 
                href="/admin" 
                className="text-[11px] text-slate-600 hover:text-slate-400 transition-colors font-medium cursor-pointer"
                title="Staff Portal Access"
              >
                Admin Login
              </Link>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/ebooks?category=cat-1" className="hover:text-gold transition-colors">Wealth & Business</Link></li>
              <li><Link href="/ebooks?category=cat-2" className="hover:text-gold transition-colors">Mindset & Psychology</Link></li>
              <li><Link href="/ebooks?category=cat-3" className="hover:text-gold transition-colors">Personal Finance</Link></li>
              <li><Link href="/ebooks?category=cat-4" className="hover:text-gold transition-colors">Productivity & Leadership</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Storefront</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/ebooks" className="hover:text-gold transition-colors">All eBooks</Link></li>
              <li><Link href="/library" className="hover:text-gold transition-colors">My Library</Link></li>
              <li><Link href="/account" className="hover:text-gold transition-colors">Account Dashboard</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">VIP Reader Digest</h4>
            <p className="text-xs text-slate-400 mb-3">Get exclusive chapter previews and early book release discounts.</p>
            <div className="flex items-center bg-surface-card border border-surface-border rounded-xl p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-xs text-white px-3 py-1.5 focus:outline-none w-full"
              />
              <button className="gold-button px-3 py-1.5 rounded-lg text-xs font-bold">
                Join
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
