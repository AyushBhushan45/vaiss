'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ShieldCheck, Lock, Award, RefreshCw, Mail } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-surface border-t border-surface-border mt-24">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/icon.svg" alt="Lumina Books" className="w-9 h-9 rounded-xl object-contain shadow-glow-gold" />
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
                className="text-xs text-gold hover:underline font-bold inline-flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-lg border border-gold/30 transition-colors"
                title="Staff Portal Access"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
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

          {/* Storefront & Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal & Policy</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-gold transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold transition-colors font-medium">Terms & Conditions</Link></li>
              <li><Link href="/ebooks" className="hover:text-gold transition-colors">All eBooks</Link></li>
              <li><Link href="/library" className="hover:text-gold transition-colors">My Library</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">VIP Reader Digest</h4>
            <p className="text-xs text-slate-400 mb-3">Get exclusive chapter previews and early book release discounts.</p>
            <FooterNewsletterForm />
          </div>

        </div>
      </div>
    </footer>
  );
}

function FooterNewsletterForm() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setIsError(true);
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.error || 'Failed to subscribe.');
      } else {
        setIsError(false);
        setMessage(data.message || "You're in! Check your inbox for the next VIP Reader Digest.");
        setEmail('');
      }
    } catch (err: any) {
      setIsError(true);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center bg-surface-card border border-surface-border rounded-xl p-1 focus-within:border-gold">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="bg-transparent text-xs text-white px-3 py-1.5 focus:outline-none w-full placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="gold-button px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 disabled:opacity-50"
        >
          {loading ? '...' : 'Join'}
        </button>
      </div>

      {message && (
        <p className={`text-[11px] font-medium ${isError ? 'text-rose-400' : 'text-emerald-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
