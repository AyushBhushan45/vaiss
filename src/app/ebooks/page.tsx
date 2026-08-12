'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, BookOpen, Sparkles } from 'lucide-react';
import { EbookCard } from '@/components/ebook-card';
import { CheckoutModal } from '@/components/checkout-modal';
import { getEbooks, getCategories, getUserPurchases } from '@/lib/data/repository';
import { useAuth } from '@/lib/auth/context';
import { Ebook, Category } from '@/types';

export default function EbooksCatalogPage() {
  const { user } = useAuth();
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [purchasedEbookIds, setPurchasedEbookIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [selectedEbookForCheckout, setSelectedEbookForCheckout] = useState<Ebook | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const allBooks = await getEbooks();
        const allCats = await getCategories();
        setEbooks(allBooks);
        setCategories(allCats);
        if (user) {
          const userPurchases = await getUserPurchases(user.id);
          setPurchasedEbookIds(userPurchases.map(p => p.ebook_id));
        }
      } catch (err) {
        console.error('Failed loading catalog data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    // Check query params if available
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const searchParam = params.get('search');
      if (catParam) setSelectedCategory(catParam);
      if (searchParam) setSearchQuery(searchParam);
    }
  }, [user]);

  // Filter & Sort Logic
  const filteredEbooks = ebooks.filter((b) => {
    const matchedCat = categories.find(c => c.id === selectedCategory || c.slug === selectedCategory);
    const targetCatId = matchedCat ? matchedCat.id : selectedCategory;

    const matchesCategory = selectedCategory === 'all' || b.category_id === targetCatId || b.category_id === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Checkout Modal */}
      {selectedEbookForCheckout && (
        <CheckoutModal
          ebook={selectedEbookForCheckout}
          isOpen={!!selectedEbookForCheckout}
          onClose={() => setSelectedEbookForCheckout(null)}
        />
      )}

      {/* Header Title Banner */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="glass-panel p-8 md:p-12 rounded-3xl border border-surface-border text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Digital Publications</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">eBook Catalog</h1>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
          Explore our complete library of business, finance, and mindset publications authored by John AG Family.
        </p>
      </motion.div>

      {/* Filter & Search Bar Controls */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="glass-card p-4 rounded-2xl border border-surface-border flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        
        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-card border border-surface-border rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-gold focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-gold text-background font-bold shadow'
                : 'bg-surface-card text-slate-300 border border-surface-border hover:text-white'
            }`}
          >
            All Categories ({ebooks.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gold text-background font-bold shadow'
                  : 'bg-surface-card text-slate-300 border border-surface-border hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-surface-card border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:border-gold focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest Releases</option>
          </select>
        </div>

      </motion.div>

      {/* eBook Grid View */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-4 border border-surface-border animate-pulse space-y-4">
              <div className="h-48 bg-slate-800 rounded-xl w-full" />
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800 rounded w-1/2" />
              <div className="h-8 bg-slate-800 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : filteredEbooks.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredEbooks.map((book) => (
            <motion.div key={book.id} variants={fadeInUp}>
              <EbookCard
                ebook={book}
                isPurchased={purchasedEbookIds.includes(book.id)}
                onQuickBuy={(b) => {
                  if (!user) {
                    window.location.href = `/auth/login?redirect=${encodeURIComponent(`/ebook/${b.slug}`)}`;
                  } else {
                    setSelectedEbookForCheckout(b);
                  }
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty Filter State */
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-white">No eBooks match your filter criteria</h3>
          <p className="text-xs text-slate-400">Try clearing your search query or selecting a different category.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="gold-button px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            Reset Catalog Filters
          </button>
        </motion.div>
      )}

    </main>
  );
}
