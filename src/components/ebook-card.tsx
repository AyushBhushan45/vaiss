'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, BookOpen, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Ebook } from '@/types';

interface EbookCardProps {
  ebook: Ebook;
  isPurchased?: boolean;
  onQuickBuy?: (ebook: Ebook) => void;
}

export function EbookCard({ ebook, isPurchased = false, onQuickBuy }: EbookCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full relative cursor-pointer">
      {/* Full Card Stretched Link */}
      <Link
        href={`/ebook/${ebook.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View details for ${ebook.title}`}
      />

      {/* Book Cover Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-card pointer-events-none">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-auto">
          {ebook.bestseller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold text-background shadow-lg">
              Bestseller
            </span>
          )}
          {ebook.featured && !ebook.bestseller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-auto">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-background/80 backdrop-blur-md text-slate-300 border border-white/10">
            {ebook.category_name || 'Business'}
          </span>
        </div>

        {/* Cover Image */}
        <img
          src={ebook.cover_url}
          alt={ebook.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
      </div>

      {/* Book Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 pointer-events-none">
        <div>
          {/* Rating & Author */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">By {ebook.author}</span>
            <div className="flex items-center gap-1 text-gold font-semibold">
              <Star className="w-3.5 h-3.5 fill-gold" />
              <span>{ebook.rating || 4.9}</span>
              <span className="text-slate-500">({ebook.review_count || 48})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-white line-clamp-1 leading-snug group-hover:text-gold transition-colors">
            {ebook.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {ebook.short_description}
          </p>
        </div>

        {/* Bottom Bar: Price & Action CTA */}
        <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Price</span>
            <span className="text-lg font-bold text-white font-serif">
              ${ebook.price} <span className="text-xs text-slate-400 font-sans font-normal">USD</span>
            </span>
          </div>

          {isPurchased ? (
            <Link
              href={`/read/${ebook.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 pointer-events-auto px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Read Now
            </Link>
          ) : (
            <div className="flex items-center gap-2 relative z-10 pointer-events-auto">
              <Link
                href={`/ebook/${ebook.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-surface-card border border-surface-border text-slate-300 hover:text-white hover:border-gold/40 transition-all"
              >
                Details
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onQuickBuy) {
                    onQuickBuy(ebook);
                  } else {
                    window.location.href = `/checkout/${ebook.id}`;
                  }
                }}
                className="gold-button px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
