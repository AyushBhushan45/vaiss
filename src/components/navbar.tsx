'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { BookOpen, Search, User, Library, ShieldCheck, LogOut, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

export function Navbar() {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-[100] glass-panel border-b border-surface-border bg-background/90 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center shadow-glow-gold transition-transform group-hover:scale-105">
              <BookOpen className="w-6 h-6 text-background stroke-[2.5]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                Lumina<span className="gold-gradient-text">.</span>
              </span>
              <span className="block text-[10px] tracking-widest text-slate-400 font-semibold uppercase -mt-1">
                Digital Publishing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link
              href="/"
              className={`transition-colors hover:text-white ${isActive('/') ? 'text-gold font-semibold' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/ebooks"
              className={`transition-colors hover:text-white ${isActive('/ebooks') ? 'text-gold font-semibold' : ''}`}
            >
              eBooks Catalog
            </Link>
            <Link
              href="/#categories"
              className="transition-colors hover:text-white"
            >
              Categories
            </Link>
            <Link
              href="/#faq"
              className="transition-colors hover:text-white"
            >
              FAQ & Support
            </Link>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery) window.location.href = `/ebooks?search=${encodeURIComponent(searchQuery)}`;
                  }}
                  className="flex items-center bg-surface-card border border-surface-border rounded-full px-3 py-1.5"
                >
                  <Search className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search books or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs text-white focus:outline-none w-48"
                    autoFocus
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white text-xs ml-1">
                    ✕
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 text-slate-300 hover:text-white rounded-full hover:bg-surface-card border border-transparent hover:border-surface-border transition-all"
                  title="Search Books"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Authenticated Links */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/library"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    isActive('/library')
                      ? 'bg-gold/10 border-gold/40 text-gold'
                      : 'bg-surface-card border-surface-border text-slate-200 hover:border-gold/30'
                  }`}
                >
                  <Library className="w-4 h-4 text-gold" />
                  My Library
                </Link>

                <Link
                  href="/account"
                  className="w-10 h-10 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center text-slate-300 hover:text-white hover:border-gold/50 transition-all"
                  title="Account Settings"
                >
                  <User className="w-5 h-5" />
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="gold-button px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-background" />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-surface-card border border-surface-border text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden bg-surface-card border-b border-surface-border px-4 pt-4 pb-6 space-y-4 shadow-2xl"
          >
            {/* Mobile Search Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery) {
                  setMobileMenuOpen(false);
                  window.location.href = `/ebooks?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="flex items-center bg-background/80 border border-surface-border rounded-xl px-3 py-2"
            >
              <Search className="w-4 h-4 text-gold mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search by title, topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
              />
            </form>

            <nav className="space-y-1.5 pt-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                  isActive('/') ? 'bg-gold/10 text-gold' : 'text-slate-200 hover:bg-surface-border/40'
                }`}
              >
                Home
              </Link>
              <Link
                href="/ebooks"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-semibold transition-colors ${
                  isActive('/ebooks') ? 'bg-gold/10 text-gold' : 'text-slate-200 hover:bg-surface-border/40'
                }`}
              >
                eBooks Catalog
              </Link>
              <Link
                href="/#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-200 hover:bg-surface-border/40"
              >
                Categories
              </Link>
              <Link
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-200 hover:bg-surface-border/40"
              >
                FAQ & Support
              </Link>

              {user ? (
                <div className="pt-3 border-t border-surface-border/60 space-y-2">
                  <Link
                    href="/library"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-base font-semibold text-gold bg-gold/10 border border-gold/30"
                  >
                    <Library className="w-5 h-5 text-gold" />
                    My Library
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-surface-border/40"
                  >
                    <User className="w-5 h-5 text-slate-400" />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold text-red-400 hover:bg-red-950/30"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-surface-border/60 grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-sm font-semibold rounded-xl bg-surface-card border border-surface-border text-slate-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="gold-button py-2.5 text-center text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 fill-background" />
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
