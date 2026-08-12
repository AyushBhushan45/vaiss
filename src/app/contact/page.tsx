'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Access Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate contact form dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen py-12 lg:py-20 relative overflow-hidden bg-background">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-gold/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-gold/30 text-gold text-xs font-semibold shadow-glow-gold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Dedicated Reader Assistance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Contact <span className="gold-gradient-text">Lumina Support.</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Have questions about your eBook orders, download access, or billing? Our executive reader concierges are on standby 24/7 to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-surface-border space-y-6">
              <h3 className="font-serif text-xl font-bold text-white">Direct Communication Channels</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Priority Email</h4>
                    <a href="mailto:ayushbhushan45@gmail.com" className="text-white font-medium hover:text-gold transition-colors text-sm sm:text-base">
                      ayushbhushan45@gmail.com
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">Average response time: &lt; 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Response Guarantee</h4>
                    <p className="text-white font-medium text-sm sm:text-base">Fast 2-Hour Response</p>
                    <p className="text-xs text-slate-400 mt-0.5">Dedicated support team active 7 days a week, 365 days a year.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Risk-Free Guarantee</h4>
                    <p className="text-white font-medium text-sm sm:text-base">30-Day Money-Back Guarantee</p>
                    <p className="text-xs text-slate-400 mt-0.5">100% hassle-free full refund if you aren't completely satisfied.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helpful Link Box */}
            <div className="glass-card p-6 rounded-3xl border border-surface-border flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Looking for instant answers?</h4>
                <p className="text-xs text-slate-400 mt-0.5">Check out our frequently asked questions section.</p>
              </div>
              <Link href="/#faq" className="gold-button px-4 py-2 rounded-xl text-xs font-bold shrink-0">
                View FAQs
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-surface-border relative">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Message Delivered Successfully!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you for reaching out to Lumina Support. An executive support officer will reply to <span className="text-gold font-semibold">{email}</span> within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-white">Send Us a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="Order & Access Support">Order & Download Access Issue</option>
                      <option value="Billing & Refund Request">Billing & Refund Inquiry</option>
                      <option value="eBook Pre-Sales Question">Pre-Sales Question</option>
                      <option value="Corporate & Bulk Licensing">Corporate & Bulk Licensing</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Message Details
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please describe how we can assist you..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="gold-button w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
