'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ShieldCheck, Star, BookOpen, 
  CheckCircle2, TrendingUp, Brain, Wallet, Zap, ChevronDown, Lock, Award 
} from 'lucide-react';
import { EbookCard } from '@/components/ebook-card';
import { CheckoutModal } from '@/components/checkout-modal';
import { getEbooks, getCategories, getUserPurchases } from '@/lib/data/repository';
import { useAuth } from '@/lib/auth/context';
import { Ebook, Category } from '@/types';

export default function HomePage() {
  const { user } = useAuth();
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [purchasedEbookIds, setPurchasedEbookIds] = useState<string[]>([]);
  const [selectedEbookForCheckout, setSelectedEbookForCheckout] = useState<Ebook | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    async function loadData() {
      const allBooks = await getEbooks();
      const allCats = await getCategories();
      setEbooks(allBooks);
      setCategories(allCats);
      if (user) {
        const userPurchases = await getUserPurchases(user.id);
        setPurchasedEbookIds(userPurchases.map(p => p.ebook_id));
      }
    }
    loadData();
  }, [user]);

  const featuredBooks = ebooks.filter((b) => b.featured);
  const bestsellerBooks = ebooks.filter((b) => b.bestseller);

  const faqs = [
    {
      q: 'How do I access my purchased eBooks?',
      a: 'Immediately after purchase verification, your eBook automatically appears in your "My Library" dashboard. You can read it directly in our built-in web reader or download the high-resolution PDF for offline reading.',
    },
    {
      q: 'Can I read my books on multiple devices?',
      a: 'Yes! Your purchases are permanently tied to your account. Simply log in on any laptop, iPad, iPhone, or Android device to access your library and automatically sync your reading progress.',
    },
    {
      q: 'Are the payments secure?',
      a: 'Absolute security is guaranteed. We utilize 256-bit SSL encryption and server-side payment verification (via Razorpay, credit cards, and digital wallets). Your card details are processed directly by certified banking partners and are never stored on our servers.',
    },
    {
      q: 'Do I get lifetime access and future updates?',
      a: 'Yes! When you purchase an eBook by John AG Family, you receive lifetime access. Any future content updates, revised editions, or bonus checklists are automatically added to your library at zero additional cost.',
    },
    {
      q: 'Can I download the eBooks as PDFs for offline reading?',
      a: 'Absolutely. Every eBook includes a 1-click DRM-free PDF download option, allowing you to save the file to your Apple Books, Kindle, tablet, or desktop for reading on airplanes or offline.',
    },
    {
      q: 'What is your 30-Day Guarantee policy?',
      a: 'We stand behind the quality of John AG Family masterclasses 100%. If you apply the principles in the eBook and feel it did not provide immense value, simply reach out to support within 30 days for a full refund.',
    },
    {
      q: 'How does the online reader sync reading progress?',
      a: 'Our cloud reader automatically saves your current active chapter, page position, and bookmarks. When you switch from your desktop computer to your mobile phone, you pick up right where you left off.',
    },
    {
      q: 'Is there a limit on how many times I can download my PDF?',
      a: 'No limit whatsoever. You can download your purchased PDF copy as many times as needed across all your personal devices.',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  return (
    <main className="space-y-24 pb-20">
      
      {/* Checkout Modal */}
      {selectedEbookForCheckout && (
        <CheckoutModal
          ebook={selectedEbookForCheckout}
          isOpen={!!selectedEbookForCheckout}
          onClose={() => setSelectedEbookForCheckout(null)}
        />
      )}

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-gold/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            
            {/* Left Copy */}
            <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-gold/30 text-gold text-xs font-semibold shadow-glow-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Premier Digital eBook Publishing House</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Master Wealth, Mindset & High-Stakes <span className="gold-gradient-text">Leverage.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Actionable digital blueprints distilled from world-changing founders and investors. Read instantly online or download secure PDFs to any device.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <Link
                  href="/ebooks"
                  className="gold-button px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  Explore All eBooks
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/#bestsellers"
                  className="px-8 py-4 rounded-2xl font-bold text-base bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-gold/40 transition-all w-full sm:w-auto justify-center"
                >
                  View Bestsellers
                </Link>
              </div>

              {/* Executive Social Proof & Reader Metrics */}
              <div className="pt-6 border-t border-surface-border/50 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs">
                {/* Stacked Reader Avatars */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Reader" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Reader" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Reader" />
                    <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-[10px] font-bold text-gold ring-2 ring-background border border-gold/40">
                      +8k
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-white text-xs">8,500+ Active Readers</span>
                    <span className="text-[10px] text-slate-400">Joined this month</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-surface-border/80 hidden sm:block" />

                {/* Star Ratings */}
                <div className="flex items-center gap-2 text-left">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div>
                    <span className="block font-bold text-white text-xs">4.95 / 5.0 Rating</span>
                    <span className="text-[10px] text-slate-400">From 1,700+ Verified Reviews</span>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right Hero Showcase Cards */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm">
                
                {/* Floating Highlight Card */}
                <div className="absolute -top-6 -left-6 z-20 glass-panel p-4 rounded-2xl shadow-2xl hidden sm:flex items-center gap-3 border border-gold/30 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center font-bold font-serif">
                    #1
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">Bestseller Unlocked</span>
                    <span className="text-[10px] text-slate-400">142+ Reviews This Week</span>
                  </div>
                </div>

                {/* Main Hero Cover */}
                {ebooks[0] && (
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-surface-border group cursor-pointer">
                    {/* Full Card Link to eBook details */}
                    <Link
                      href={`/ebook/${ebooks[0].slug}`}
                      className="absolute inset-0 z-0"
                      aria-label={`View details for ${ebooks[0].title}`}
                    />

                    <img
                      src={ebooks[0].cover_url}
                      alt={ebooks[0].title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform pointer-events-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                      <span className="text-xs uppercase tracking-widest text-gold font-bold">Featured Masterclass</span>
                      <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-gold transition-colors">
                        {ebooks[0].title}
                      </h3>
                      <div className="mt-3 flex items-center justify-between pointer-events-auto">
                        <div>
                          <span className="text-lg font-bold font-serif text-gold">${ebooks[0].price} USD</span>
                          {purchasedEbookIds.includes(ebooks[0].id) && (
                            <span className="block text-[10px] text-emerald-400 font-semibold">In Your Library ✓</span>
                          )}
                        </div>
                        {purchasedEbookIds.includes(ebooks[0].id) ? (
                          <Link
                            href={`/read/${ebooks[0].id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 pointer-events-auto px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Read eBook
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (!user) {
                                window.location.href = `/auth/login?redirect=${encodeURIComponent(`/ebook/${ebooks[0].slug}`)}`;
                              } else {
                                setSelectedEbookForCheckout(ebooks[0]);
                              }
                            }}
                            className="gold-button px-4 py-2 rounded-xl text-xs font-bold relative z-10"
                          >
                            Quick Buy Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-panel rounded-3xl p-8 border border-surface-border grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-serif text-3xl md:text-4xl font-bold gold-gradient-text">10,000+</span>
            <span className="block text-xs text-slate-400 uppercase tracking-wider mt-1">Active Readers</span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl font-bold text-white">4.9 / 5</span>
            <span className="block text-xs text-slate-400 uppercase tracking-wider mt-1">Reader Satisfaction</span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl font-bold gold-gradient-text">100%</span>
            <span className="block text-xs text-slate-400 uppercase tracking-wider mt-1">Instant Access</span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl font-bold text-white">Zero</span>
            <span className="block text-xs text-slate-400 uppercase tracking-wider mt-1">Hidden Subscription Fees</span>
          </div>
        </div>
      </motion.section>

      {/* 3. FEATURED EBOOKS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">Featured Masterclasses</h2>
          </div>
          <Link href="/ebooks" className="text-sm font-semibold text-gold hover:underline flex items-center gap-1">
            Browse Full Library <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.slice(0, 4).map((book) => (
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
      </motion.section>

      {/* 4. BESTSELLING EBOOKS */}
      <motion.section
        id="bestsellers"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Reader Favorites</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white mt-1">Bestselling eBooks</h2>
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellerBooks.map((book) => (
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
      </motion.section>

      {/* 5. CATEGORIES EXPLORER */}
      <motion.section
        id="categories"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-gold font-bold">Domain Expertise</span>
          <h2 className="font-serif text-3xl font-bold text-white mt-1">Explore By Topic</h2>
          <p className="text-sm text-slate-400 mt-2">Filter our growing library of digital publications by domain.</p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={fadeInUp}>
              <Link
                href={`/ebooks?category=${cat.id}`}
                className="glass-card p-6 rounded-2xl block group hover:border-gold/50 transition-all h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold mt-4">
                  View Category Books <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 6. FAQ ACCORDION */}
      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-gold font-bold">Frequently Asked Questions</span>
          <h2 className="font-serif text-3xl font-bold text-white mt-1">Everything You Need to Know</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-surface-border overflow-hidden"
            >
              <button
                onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-white hover:text-gold transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform ${faqOpenIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {faqOpenIndex === idx && (
                <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-surface-border/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 7. FINAL CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-panel rounded-3xl p-10 lg:p-16 border border-gold/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-purple-600/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Elevate Your Knowledge Base Today.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Join thousands of ambitious readers building financial independence and mental mastery. Instant delivery guaranteed.
            </p>
            <div className="pt-2">
              <Link
                href="/ebooks"
                className="gold-button px-8 py-4 rounded-2xl font-bold text-base inline-flex items-center gap-2"
              >
                Browse Full eBooks Catalog <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
