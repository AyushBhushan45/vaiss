'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Download, Library, Sparkles, ArrowRight, CheckCircle2, Laptop } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { getUserPurchases } from '@/lib/data/repository';
import { Purchase } from '@/types';

export default function MyLibraryPage() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLibrary() {
      if (!user) {
        setPurchases([]);
        setLoading(false);
        return;
      }
      const data = await getUserPurchases(user.id);
      setPurchases(data);
      setLoading(false);
    }
    loadLibrary();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 md:p-10 rounded-3xl border border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider mb-1">
            <Library className="w-4 h-4" />
            <span>Permanent Digital Access</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">My eBook Library</h1>
          <p className="text-sm text-slate-300 mt-1">
            Read online or download your purchased titles. Access from any device at any time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-surface-card/80 border border-surface-border px-4 py-2.5 rounded-2xl text-slate-300">
          <Laptop className="w-4 h-4 text-gold shrink-0" />
          <span>Device Sync Active</span>
        </div>
      </div>

      {/* Library Grid or Empty State */}
      {purchases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((pur) => {
            const ebook = pur.ebook;
            if (!ebook) return null;

            return (
              <div
                key={pur.id}
                className="glass-card rounded-2xl overflow-hidden border border-surface-border flex flex-col justify-between p-5 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={ebook.cover_url}
                    alt={ebook.title}
                    className="w-24 aspect-[3/4] object-cover rounded-xl shadow-md shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                      {ebook.category_name || 'Publication'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-white line-clamp-2 leading-snug">
                      {ebook.title}
                    </h3>
                    <p className="text-xs text-slate-400">By {ebook.author}</p>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Purchased & Verified
                    </div>
                  </div>
                </div>

                {/* Primary Action CTAs */}
                <div className="pt-3 border-t border-surface-border/60 grid grid-cols-2 gap-3">
                  <Link
                    href={`/read/${ebook.id}`}
                    className="gold-button py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" /> Read Online
                  </Link>

                  <a
                    href={`/api/ebooks/${ebook.id}/download?userId=${user?.id || 'usr-customer'}`}
                    download
                    className="py-2.5 rounded-xl text-xs font-semibold bg-surface-card border border-surface-border text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4 text-gold" /> Download PDF
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-3xl p-16 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto">
            <Library className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">No eBooks in your library yet</h3>
          <p className="text-sm text-slate-300">
            Browse our curated collection of wealth, business, and mindset publications to get started.
          </p>
          <div className="pt-2">
            <Link href="/ebooks" className="gold-button px-8 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2">
              Explore eBooks Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </main>
  );
}
