'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ShieldCheck, Lock, BookOpen, CheckCircle2, 
  FileText, Sparkles, Download, ArrowRight, ArrowLeft, Share2, Award, Clock, ZoomIn, X, Maximize2 
} from 'lucide-react';
import { getEbookBySlug, getReviews, verifyUserOwnership } from '@/lib/data/repository';
import { Ebook, Review } from '@/types';
import { CheckoutModal } from '@/components/checkout-modal';
import { useAuth } from '@/lib/auth/context';

export default function EbookDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { user } = useAuth();

  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'toc' | 'preview' | 'reviews'>('overview');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    async function loadBookData() {
      if (!slug) return;
      const found = await getEbookBySlug(slug);
      if (found) {
        setEbook(found);
        const bookReviews = await getReviews(found.id);
        setReviews(bookReviews);
        if (user) {
          const ownerCheck = await verifyUserOwnership(user.id, found.id);
          setIsOwner(ownerCheck);
        }
      }
      setLoading(false);
    }
    loadBookData();
  }, [slug, user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <BookOpen className="w-16 h-16 text-slate-500 mx-auto" />
        <h2 className="font-serif text-3xl font-bold text-white">eBook Not Found</h2>
        <p className="text-slate-400 text-sm">The publication you requested does not exist or has been archived.</p>
        <Link href="/ebooks" className="gold-button px-6 py-3 rounded-xl font-bold text-sm inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back to Catalog / Store */}
      <div>
        <Link
          href="/ebooks"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store & Catalog
        </Link>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        ebook={ebook}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* Top Hero Product Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Book Cover Image & Formats */}
        <div className="lg:col-span-5 space-y-6">
          <div 
            onClick={() => setShowImageModal(true)}
            className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden glass-panel border border-surface-border shadow-2xl group cursor-pointer"
            title="Click to view full cover image"
          >
            <img
              src={ebook.cover_url}
              alt={ebook.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Hover Expand Overlay */}
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 backdrop-blur-md border border-gold/40 text-gold flex items-center justify-center shadow-glow-gold">
                <ZoomIn className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-surface/90 px-3.5 py-1.5 rounded-full border border-surface-border text-gold shadow-lg">
                Click to View Full Image
              </span>
            </div>

            {ebook.bestseller && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold text-background shadow-lg">
                  Bestseller
                </span>
              </div>
            )}
          </div>

          {/* Format Badges */}
          <div className="glass-card p-4 rounded-2xl border border-surface-border grid grid-cols-3 gap-3 text-center text-xs">
            <div className="space-y-1">
              <BookOpen className="w-4 h-4 text-gold mx-auto" />
              <span className="block font-bold text-white">Online Reader</span>
              <span className="text-[10px] text-slate-400">Kindle-style UI</span>
            </div>
            <div className="space-y-1">
              <Download className="w-4 h-4 text-gold mx-auto" />
              <span className="block font-bold text-white">PDF Download</span>
              <span className="text-[10px] text-slate-400">256-bit Private</span>
            </div>
            <div className="space-y-1">
              <FileText className="w-4 h-4 text-gold mx-auto" />
              <span className="block font-bold text-white">{ebook.page_count} Pages</span>
              <span className="text-[10px] text-slate-400">Full Unabridged</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Author, Price, Buy Bar */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            {/* Category & Rating */}
            <div className="flex items-center gap-3 text-xs mb-3">
              <span className="px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/30 font-semibold uppercase tracking-wider">
                {ebook.category_name || 'Business'}
              </span>
              <div className="flex items-center gap-1 text-gold font-semibold">
                <Star className="w-4 h-4 fill-gold" />
                <span>{ebook.rating || 4.9}</span>
                <span className="text-slate-400 font-normal">({reviews.length || 142} Reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {ebook.title}
            </h1>
            {ebook.subtitle && (
              <p className="text-lg text-slate-300 font-serif italic mt-2">
                {ebook.subtitle}
              </p>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <span>Authored by <strong className="text-white">{ebook.author}</strong></span>
            </div>
          </div>

          {/* Pricing Box & Ownership Status */}
          <div className="glass-panel p-6 rounded-2xl border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="block text-xs uppercase text-slate-400 tracking-wider">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-white">${ebook.price}</span>
                <span className="text-xs text-slate-400">USD (Tax Included)</span>
              </div>
              {isOwner ? (
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Already Owned in Your Library
                </span>
              ) : (
                <span className="text-[11px] text-emerald-400 font-medium">✓ Lifetime Access Across All Devices</span>
              )}
            </div>

            {isOwner ? (
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <Link
                  href={`/read/${ebook.id}`}
                  className="gold-button px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-gold w-full sm:w-auto text-center"
                >
                  <BookOpen className="w-4 h-4" /> Read Online Now
                </Link>
                <a
                  href={`/api/ebooks/${ebook.id}/download`}
                  download
                  className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-surface-card border border-surface-border text-slate-200 hover:text-white flex items-center justify-center gap-2 w-full sm:w-auto transition-colors"
                >
                  <Download className="w-4 h-4 text-gold" /> PDF Download
                </a>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (!user) {
                    window.location.href = `/auth/login?redirect=${encodeURIComponent(`/ebook/${ebook.slug}`)}`;
                  } else {
                    setCheckoutOpen(true);
                  }
                }}
                className="gold-button px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-glow-gold hover:scale-[1.01] transition-transform"
              >
                <Sparkles className="w-5 h-5 fill-background" /> Buy eBook Now (${ebook.price} USD)
              </button>
            )}
          </div>

          {/* Key Benefits Grid */}
          {ebook.benefits_json && ebook.benefits_json.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">What You Will Learn</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ebook.benefits_json.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-surface-card/60 p-3 rounded-xl border border-surface-border">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Executive Security & Access Badges */}
          <div className="pt-3 border-t border-surface-border/40 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-slate-300 text-[11px] font-semibold">
            <div className="flex items-center gap-2 p-2.5 bg-surface-card/40 rounded-xl border border-surface-border/60 hover:border-gold/30 hover:bg-surface-card/80 transition-all">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>DRM-Free PDF Included</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-surface-card/40 rounded-xl border border-surface-border/60 hover:border-gold/30 hover:bg-surface-card/80 transition-all">
              <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <span>Cloud Reader & Sync</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-surface-card/40 rounded-xl border border-surface-border/60 hover:border-gold/30 hover:bg-surface-card/80 transition-all">
              <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span>30-Day Money-Back</span>
            </div>
          </div>



        </div>
      </div>

      {/* Tabs Navigation: Overview, Table of Contents, Sample Chapter, Reviews */}
      <div className="border-b border-surface-border flex gap-8 text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-4 transition-colors ${activeTab === 'overview' ? 'border-b-2 border-gold text-gold font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Book Overview
        </button>
        <button
          onClick={() => setActiveTab('toc')}
          className={`pb-4 transition-colors ${activeTab === 'toc' ? 'border-b-2 border-gold text-gold font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Table of Contents ({ebook.toc_json?.length || 5})
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`pb-4 transition-colors ${activeTab === 'preview' ? 'border-b-2 border-gold text-gold font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Sample Preview
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 transition-colors ${activeTab === 'reviews' ? 'border-b-2 border-gold text-gold font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Reviews ({reviews.length || 2})
        </button>
      </div>

      {/* Tab Content Panes */}
      <div className="glass-panel p-8 rounded-3xl border border-surface-border">
        
        {activeTab === 'overview' && (
          <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
            <div className="flex items-center justify-between border-b border-surface-border/60 pb-4">
              <h3 className="font-serif text-2xl font-bold text-white">About This Publication</h3>
              <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                Official Masterclass Blueprint
              </span>
            </div>

            <div className="space-y-4">
              {ebook.description.split('\n\n').map((block, idx) => {
                if (block.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="font-serif text-lg md:text-xl font-bold text-gold pt-3 border-t border-surface-border/40">
                      {block.replace('### ', '')}
                    </h4>
                  );
                }
                if (block.includes('\n1. ') || block.includes('\n- ')) {
                  const lines = block.split('\n');
                  return (
                    <div key={idx} className="space-y-2 py-2">
                      {lines.map((line, lineIdx) => {
                        if (line.startsWith('### ')) {
                          return <h4 key={lineIdx} className="font-serif text-lg font-bold text-gold mt-2">{line.replace('### ', '')}</h4>;
                        }
                        return <p key={lineIdx} className="pl-2 border-l-2 border-gold/40 text-slate-200">{line}</p>;
                      })}
                    </div>
                  );
                }
                return <p key={idx} className="text-slate-300 text-sm leading-relaxed">{block}</p>;
              })}
            </div>

            {/* Author Guarantee Callout */}
            <div className="p-5 bg-surface-card rounded-2xl border border-surface-border flex items-start gap-4 mt-6">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-serif font-bold text-lg border border-gold/30 shrink-0">
                J
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gold uppercase tracking-wider">Author Note • John AG Family</span>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  &ldquo;Your income follows your thinking. When you shift your mental models from linear labor to permissionless leverage and asymmetric risk management, true compounding begins.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'toc' && (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white mb-6">Table of Contents</h3>
            {ebook.toc_json && ebook.toc_json.length > 0 ? (
              <div className="space-y-3">
                {ebook.toc_json.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-surface-card rounded-xl border border-surface-border text-sm">
                    <span className="font-bold text-white">{item.title}</span>
                    <span className="text-xs text-gold font-serif">Page {item.page}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Chapter breakdown is included in the full online reader.</p>
            )}
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border/60 pb-4">
              <h3 className="font-serif text-2xl font-bold text-white">Free Sample Chapter Preview</h3>
              <span className="text-xs text-gold uppercase font-bold">Unabridged Excerpt</span>
            </div>
            <div className="bg-surface-card p-6 rounded-2xl border border-surface-border text-sm text-slate-300 leading-relaxed font-serif space-y-4">
              {ebook.preview_content?.split('\n\n').map((p, idx) => (
                <p key={idx}>{p}</p>
              )) || <p>Purchase full publication to continue reading.</p>}
            </div>
            <div className="text-center pt-4">
              <button
                onClick={() => setCheckoutOpen(true)}
                className="gold-button px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                Unlock Full eBook to Continue Reading
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white mb-4">Customer Reviews</h3>
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-surface-card rounded-xl border border-surface-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{rev.user_name || 'Verified Purchaser'}</span>
                  <div className="flex items-center text-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rev.review_text}</p>
                <span className="text-[10px] text-slate-500 block">Verified Purchase</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/90 backdrop-blur-2xl cursor-zoom-out"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-surface-card/80 text-slate-300 hover:text-white hover:bg-surface-card border border-surface-border transition-all z-20 shadow-xl"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden glass-panel border border-gold/30 shadow-2xl p-2 md:p-4 bg-surface-card/80 cursor-default flex flex-col items-center"
            >
              <img
                src={ebook.cover_url}
                alt={ebook.title}
                className="w-auto h-auto max-h-[80vh] max-w-full object-contain rounded-2xl mx-auto shadow-2xl"
              />
              
              <div className="mt-3 w-full text-center flex items-center justify-between px-4 py-2 bg-surface/90 rounded-xl border border-surface-border">
                <span className="font-serif text-xs md:text-sm font-bold text-white truncate max-w-md">
                  {ebook.title} • High Resolution Cover Artwork
                </span>
                <span className="text-[11px] text-gold font-semibold flex items-center gap-1">
                  Click outside to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
