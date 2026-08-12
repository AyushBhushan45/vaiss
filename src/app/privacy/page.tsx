'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowLeft, Mail, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <ShieldCheck className="w-5 h-5" />
          <span>Security & Data Governance</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400 mt-2">
          Last updated: August 11, 2026 • Effective Date: Immediate
        </p>
      </div>

      {/* Policy Content Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-surface-border space-y-8 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            1. Overview & Commitment
          </h2>
          <p>
            At Lumina Digital Publishing Inc. (&quot;Lumina Books&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we prioritize user privacy, data security, and transparent governance. This Privacy Policy details how we collect, store, encrypt, process, and protect your personal information when you browse our storefront, purchase masterclass eBooks, or access our DRM-protected online cloud reader.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            2. Data We Collect
          </h2>
          <p>
            We collect only essential data required to process digital book orders, deliver DRM licenses, and maintain your personal library:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
            <li><strong className="text-white">Account Identification:</strong> Full name, email address, avatar image, and authentication tokens.</li>
            <li><strong className="text-white">Transaction Metadata:</strong> Order numbers, purchased eBooks, applied discount promo codes, payment provider identifiers, and billing timestamps. (We do NOT store credit card numbers).</li>
            <li><strong className="text-white">Reading Progress & Annotations:</strong> Bookmark locations, chapter progress percentages, and private reader notes to sync across your devices.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            3. Payment Security & DRM Protection
          </h2>
          <p>
            All monetary transactions are processed via 256-bit SSL encrypted PCI-DSS compliant payment gateways (Stripe & Razorpay). Digital downloads and cloud reading sessions utilize watermarked DRM tokens to prevent unauthorized duplication while allowing lifetime access for legitimate purchasers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            4. Cookies & Analytics
          </h2>
          <p>
            We use localized session storage and privacy-focused telemetry to maintain your active shopping cart, preserve reader preferences (font sizing, night mode), and ensure instant loading speed. We do not sell or rent user data to third-party ad brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-white">
            5. Your Data Rights & Erasure
          </h2>
          <p>
            You retain full rights to request a complete export of your order history or account deletion. To request data erasure, contact our data protection team at:
          </p>
          <div className="p-4 bg-surface/80 rounded-2xl border border-surface-border text-xs flex items-center gap-3">
            <Mail className="w-5 h-5 text-gold" />
            <div>
              <span className="font-bold text-white block">Data Protection Officer</span>
              <a href="mailto:privacy@luminabooks.com" className="text-gold hover:underline">privacy@luminabooks.com</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
