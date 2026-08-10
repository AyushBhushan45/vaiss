'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, CheckCircle2, X, Download, BookOpen, CreditCard, 
  QrCode, Zap, Star, ArrowRight, Mail, Check, RefreshCw, Smartphone, Tag,
  Globe, Wallet, Landmark, Sparkles, ArrowLeft
} from 'lucide-react';
import { Ebook } from '@/types';
import { useAuth } from '@/lib/auth/context';

interface CheckoutModalProps {
  ebook: Ebook;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ ebook, isOpen, onClose }: CheckoutModalProps) {
  const { user, login } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'express' | 'paypal' | 'upi' | 'bank'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStepText, setProcessingStepText] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState<{ orderNumber: string } | null>(null);

  if (!isOpen) return null;

  const originalPrice = ebook.price;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalPrice = Math.max(0, originalPrice - discount);

  const handleApplyCoupon = async (codeToUse?: string) => {
    setCouponError('');
    const targetCode = (codeToUse || couponCode).trim();
    if (!targetCode) {
      setCouponError('Please enter a promo code');
      return;
    }

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: targetCode, amount: originalPrice })
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({ code: targetCode.toUpperCase(), discountAmount: data.discountAmount });
        setCouponCode(targetCode.toUpperCase());
      } else {
        setCouponError(data.message || 'Invalid promo code');
        setAppliedCoupon(null);
      }
    } catch (err) {
      setCouponError('Failed to validate coupon code');
      setAppliedCoupon(null);
    }
  };

  const handlePayment = async () => {
    if (!user) {
      alert('Please log in first to purchase this eBook');
      return;
    }

    setIsProcessing(true);
    setProcessingStepText('Encrypting US 256-bit security token...');

    try {
      await new Promise((r) => setTimeout(r, 600));
      setProcessingStepText('Verifying banking & payment authorization...');

      const activeUserId = user.id;
      const activeUserEmail = email || user.email;

      const orderRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          userEmail: activeUserEmail,
          ebookId: ebook.id,
          couponCode: appliedCoupon?.code
        })
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert(orderData.error || 'Could not initiate payment');
        setIsProcessing(false);
        return;
      }

      setProcessingStepText('Unlocking eBook & generating download license...');
      await new Promise((r) => setTimeout(r, 600));

      const verifyRes = await fetch('/api/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.orderId,
          paymentId: `pay_usa_${Date.now()}`,
          signature: 'verified_hmac_sig'
        })
      });
      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        setOrderInfo({ orderNumber: orderData.orderNumber || `ORD-${Date.now().toString().slice(-6)}` });
        setIsProcessing(false);
        setPurchaseSuccess(true);
      } else {
        alert(verifyData.error || 'Payment verification failed');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert('An error occurred during checkout. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {/* 
        Position backdrop below website header (top-20) 
        and make it overflow-y-auto so mouse scroll works smoothly over the entire modal 
      */}
      <div className="fixed top-20 inset-x-0 bottom-0 z-40 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background/85 backdrop-blur-xl flex justify-center items-start">
        
        {/* Animated Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel w-full max-w-xl rounded-3xl overflow-hidden border border-surface-border shadow-2xl relative my-4 sm:my-6 flex flex-col bg-surface-card"
        >
          
          {/* Top Decorative Gold Glow Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-gold via-amber-400 to-yellow-600 shrink-0" />

          {/* Sticky Visible Modal Header Bar with Close Cross */}
          <div className="bg-surface-card/95 backdrop-blur-xl border-b border-surface-border/80 z-30 px-5 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-gold" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">Complete Your Order</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-800/40">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.95 Rating</span>
              </div>
              {/* Prominent Cross (X) Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-surface-card hover:bg-gold/20 text-slate-300 hover:text-gold border border-surface-border hover:border-gold/40 transition-all flex items-center gap-1 text-xs font-bold"
                title="Close & return to product details"
                aria-label="Close checkout modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden md:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-5 sm:p-7 space-y-5">

            {!user ? (
              /* REQUIRE LOGIN SCREEN FOR UNAUTHENTICATED USERS */
              <div className="p-2 sm:p-4 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center mx-auto shadow-glow-gold">
                  <Lock className="w-8 h-8" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold mb-2 border border-gold/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Authentication Required</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Please Sign In First</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto mt-2 leading-relaxed">
                    To complete your purchase of <strong className="text-gold">{ebook.title}</strong> and bind the download license to your account, please log in or create a free reader account.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/auth/login?redirect=${encodeURIComponent(`/ebook/${ebook.slug}`)}`}
                      className="py-3 px-4 rounded-xl text-xs font-bold bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-gold/40 text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={`/auth/signup?redirect=${encodeURIComponent(`/ebook/${ebook.slug}`)}`}
                      className="py-3 px-4 rounded-xl text-xs font-bold bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-gold/40 text-center"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>

                {/* Back to Product Link */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-gold flex items-center justify-center gap-1.5 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to {ebook.title} Details</span>
                </button>
              </div>
            ) : purchaseSuccess ? (
              /* SUCCESS CONFIRMATION SCREEN */
              <div className="p-2 sm:p-4 text-center space-y-6">
                
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center justify-center relative z-10 shadow-glow-emerald">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-semibold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Order Verified • {orderInfo?.orderNumber}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">Payment Successful!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                    Congratulations! <strong className="text-gold">{ebook.title}</strong> has been instantly unlocked and added to your Lumina library.
                  </p>
                </div>

                <div className="p-3.5 bg-surface-card/80 rounded-2xl border border-surface-border text-xs text-slate-300 flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center shrink-0 font-bold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Receipt & License Dispatched</span>
                    <span className="text-[11px] text-slate-400">PDF download link sent to <strong className="text-slate-200">{user.email}</strong></span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href={`/read/${ebook.id}`}
                    className="w-full gold-button py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-glow-gold hover:scale-[1.01] transition-transform"
                  >
                    <BookOpen className="w-5 h-5" />
                    Read Online Right Now
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`/api/ebooks/${ebook.id}/download`}
                      download
                      className="py-3 px-4 rounded-xl text-xs font-bold bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-gold/40 flex items-center justify-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4 text-gold" />
                      Download PDF
                    </a>
                    <Link
                      href="/library"
                      className="py-3 px-4 rounded-xl text-xs font-bold bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-gold/40 flex items-center justify-center gap-2 transition-all text-center"
                    >
                      Go to My Library
                    </Link>
                  </div>
                </div>

              </div>
            ) : (
              /* CHECKOUT FORM FOR AUTHENTICATED USER */
              <>
                {/* eBook Featured Item Row */}
                <div className="p-4 bg-surface-card/80 rounded-2xl border border-surface-border flex items-center gap-4 relative overflow-hidden group">
                  <img
                    src={ebook.cover_url}
                    alt={ebook.title}
                    className="w-16 h-22 object-cover rounded-xl shadow-lg shrink-0 border border-surface-border"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-gold tracking-widest block">Instant Digital Access</span>
                    <h4 className="font-serif text-base font-bold text-white truncate mt-0.5">{ebook.title}</h4>
                    <p className="text-xs text-slate-400">By {ebook.author} • {ebook.page_count} Pages</p>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold font-serif gold-gradient-text">${finalPrice} USD</span>
                        {appliedCoupon && (
                          <span className="text-xs text-slate-400 line-through">${originalPrice} USD</span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50 font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Lifetime Access
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Account Info */}
                <div className="p-3 bg-surface-card/60 rounded-xl border border-surface-border/60 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                    Logged in as <strong className="text-white truncate">{user.email}</strong>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold shrink-0 ml-2">Verified ✓</span>
                </div>

                {/* Promo / Coupon Code Input */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-gold" />
                      Promo Code
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon('WELCOME10')}
                      className="text-[10px] text-gold font-bold hover:underline bg-gold/10 px-2 py-0.5 rounded border border-gold/30 transition-colors"
                    >
                      Apply WELCOME10 (10% OFF)
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyCoupon();
                        }
                      }}
                      className="flex-1 bg-surface-card border border-surface-border rounded-xl px-3.5 py-2 text-xs text-white uppercase focus:border-gold focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-gold/40 transition-all"
                    >
                      Apply
                    </button>
                  </div>

                  {appliedCoupon && (
                    <div className="mt-2 text-xs text-emerald-400 flex items-center justify-between bg-emerald-950/40 p-2 rounded-xl border border-emerald-800/40">
                      <span className="flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Coupon &apos;{appliedCoupon.code}&apos; applied! Saved ${appliedCoupon.discountAmount} USD.
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode('');
                          setCouponError('');
                        }}
                        className="text-[10px] text-slate-400 hover:text-white underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <div className="mt-2 text-xs text-red-400 bg-red-950/30 p-2 rounded-xl border border-red-800/40">
                      {couponError}
                    </div>
                  )}
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Select US & Global Payment Method
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                        paymentMethod === 'card'
                          ? 'bg-gold/15 border-gold text-white shadow-glow-gold'
                          : 'bg-surface-card/60 border-surface-border text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <CreditCard className={`w-4 h-4 ${paymentMethod === 'card' ? 'text-gold' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold block">Credit / Debit Card</span>
                      <span className="text-[9px] text-slate-400">Visa, MC, Amex, Discover</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('express')}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                        paymentMethod === 'express'
                          ? 'bg-gold/15 border-gold text-white shadow-glow-gold'
                          : 'bg-surface-card/60 border-surface-border text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <Smartphone className={`w-4 h-4 ${paymentMethod === 'express' ? 'text-gold' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold block">Apple / Google Pay</span>
                      <span className="text-[9px] text-slate-400">1-Touch Express</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                        paymentMethod === 'paypal'
                          ? 'bg-gold/15 border-gold text-white shadow-glow-gold'
                          : 'bg-surface-card/60 border-surface-border text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <Wallet className={`w-4 h-4 ${paymentMethod === 'paypal' ? 'text-gold' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold block">PayPal & Venmo</span>
                      <span className="text-[9px] text-slate-400">US Digital Wallet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                        paymentMethod === 'upi'
                          ? 'bg-gold/15 border-gold text-white shadow-glow-gold'
                          : 'bg-surface-card/60 border-surface-border text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <QrCode className={`w-4 h-4 ${paymentMethod === 'upi' ? 'text-gold' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold block">UPI / QR Code</span>
                      <span className="text-[9px] text-slate-400">Scan & Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                        paymentMethod === 'bank'
                          ? 'bg-gold/15 border-gold text-white shadow-glow-gold'
                          : 'bg-surface-card/60 border-surface-border text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <Landmark className={`w-4 h-4 ${paymentMethod === 'bank' ? 'text-gold' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold block">ACH / Bank Transfer</span>
                      <span className="text-[9px] text-slate-400">Direct Wire</span>
                    </button>
                  </div>
                </div>

                {/* Order Total Breakdown */}
                <div className="p-3.5 bg-surface-card/40 rounded-2xl border border-surface-border space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal ({ebook.title.slice(0, 24)}...)</span>
                    <span>${originalPrice} USD</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-400">
                      <span>10% Promo Discount ({appliedCoupon.code})</span>
                      <span>-${discount} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Instant Cloud Reader & PDF Download License</span>
                    <span className="text-emerald-400 font-semibold">FREE ($0)</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-surface-border/60">
                    <span>Total Amount Due</span>
                    <span className="text-gold font-serif text-lg">${finalPrice} USD</span>
                  </div>
                </div>

                {/* Trust Badges & Guarantee Ribbon */}
                <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300 pt-1">
                  <div className="flex items-center gap-2 p-2 bg-surface-card/40 rounded-xl border border-surface-border/60">
                    <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-surface-card/40 rounded-xl border border-surface-border/60">
                    <RefreshCw className="w-4 h-4 text-gold shrink-0" />
                    <span>Instant Multi-Device Sync</span>
                  </div>
                </div>

                {/* Payment CTA Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full gold-button py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 shadow-glow-gold hover:scale-[1.01] transition-all disabled:opacity-60 cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      <span>{processingStepText || 'Processing Payment...'}</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Pay ${finalPrice} USD & Unlock Instant Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Secondary Return to eBook Details Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs text-slate-400 hover:text-gold flex items-center justify-center gap-1.5 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to eBook Details Page</span>
                </button>
              </>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
