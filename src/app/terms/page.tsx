'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, ArrowLeft, Scale, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Navigation & Header */}
      <div>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Storefront
        </Link>

        <div className="flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-wider mb-2">
          <Scale className="w-5 h-5" />
          <span>Legal Agreement & Terms of Service</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">Terms & Conditions</h1>
        <p className="text-xs text-slate-400 mt-2">
          Last updated: August 11, 2026 • Governing Law: State of California, USA
        </p>
      </div>

      {/* Terms Content Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-surface-border space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, purchasing, or reading digital publications on Lumina Books (&quot;the Platform&quot;), you enter into a legally binding agreement to comply with these Terms & Conditions. If you disagree with any portion of these terms, please cease using our storefront immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            2. Intellectual Property & Digital Rights Management (DRM)
          </h2>
          <p>
            All content, eBooks, cover artwork, custom formatting, and masterclass publications provided on Lumina Books are protected under international copyright laws and owned by Lumina Digital Publishing Inc.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
            <li><strong className="text-white">Personal License:</strong> Purchasing an eBook grants you a non-exclusive, non-transferable, revocable single-user license for personal reading.</li>
            <li><strong className="text-white">Prohibited Use:</strong> Reselling, redistributing, scraping, uploading to public torrent trackers, or training artificial intelligence models on our proprietary text is strictly illegal.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            3. Digital Purchases & Refund Policy
          </h2>
          <p>
            Due to the immediate digital delivery of DRM-free PDF files and cloud reader licenses, purchases are non-refundable once downloaded, except in cases of double-billing or technical failure to provide access within 48 hours of purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            4. Promo Codes & Discounts
          </h2>
          <p>
            Promotional codes issued via email, affiliate programs, or admin coupons carry specific expiration dates and minimum order thresholds. Lumina Books reserves the right to revoke or amend discount codes at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            5. Contact Information
          </h2>
          <p>
            If you have any questions regarding these Terms & Conditions or wish to report illegal copyright distribution, contact our legal department at <a href="mailto:legal@luminabooks.com" className="text-gold hover:underline font-bold">legal@luminabooks.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
