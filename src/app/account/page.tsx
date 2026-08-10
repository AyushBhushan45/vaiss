'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ShieldCheck, Key, ShoppingBag, Library, LogOut, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { getAllOrders, getUserPurchases } from '@/lib/data/repository';
import { Order, Purchase } from '@/types';

export default function AccountPage() {
  const { user, logout, updateProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (user) {
        const allOrders = await getAllOrders();
        const userOrders = allOrders.filter(o => o.user_id === user.id || o.user_email === user.email);
        setOrders(userOrders);

        const userPurchases = await getUserPurchases(user.id);
        setPurchases(userPurchases);
        setFullName(user.full_name);
      }
    }
    loadData();
  }, [user]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ full_name: fullName });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <User className="w-16 h-16 text-slate-500 mx-auto" />
        <h2 className="font-serif text-3xl font-bold text-white">Account Session Expired</h2>
        <p className="text-slate-400 text-sm">Please sign in to access your profile and order history.</p>
        <Link href="/auth/login" className="gold-button px-6 py-3 rounded-xl font-bold text-sm inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Profile Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-surface-border flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center font-serif text-3xl font-bold text-background shadow-lg">
          {user.full_name?.[0] || 'U'}
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="font-serif text-2xl font-bold text-white">{user.full_name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              user.role === 'admin' ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50' : 'bg-gold/10 text-gold border border-gold/30'
            }`}>
              {user.role}
            </span>
          </div>
          <p className="text-xs text-slate-400">{user.email}</p>
          <span className="text-[11px] text-slate-500 block">Member since {new Date(user.created_at).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/library"
            className="gold-button px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Library className="w-4 h-4" /> My Library ({purchases.length})
          </Link>
          <button
            onClick={logout}
            className="p-2.5 rounded-xl bg-surface-card border border-surface-border text-slate-400 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Settings Form */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-surface-border space-y-6">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-gold" /> Personal Information
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1 font-semibold">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1 font-semibold">Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-surface-card/40 border border-surface-border rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Email address cannot be modified directly.</span>
            </div>

            {savedSuccess && (
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </div>
            )}

            <button
              type="submit"
              className="w-full gold-button py-2.5 rounded-xl text-xs font-bold"
            >
              Save Profile Changes
            </button>
          </form>

          {/* Account Security */}
          <div className="pt-4 border-t border-surface-border/60 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-gold" /> Security Settings
            </h4>
            <Link
              href="/auth/forgot-password"
              className="block w-full text-center py-2 rounded-xl text-xs font-semibold bg-surface-card border border-surface-border text-slate-300 hover:text-white"
            >
              Request Password Reset Email
            </Link>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-surface-border space-y-6">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" /> Purchase & Order History
          </h3>

          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 bg-surface-card rounded-2xl border border-surface-border flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-white font-serif">{ord.order_number}</span>
                    <span className="block text-[10px] text-slate-400">
                      {new Date(ord.created_at).toLocaleDateString()} • {ord.payment_provider.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gold font-serif">${ord.total_amount} USD</span>
                    <span className="block text-[10px] text-emerald-400 uppercase font-bold">
                      ● {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No orders found on this account yet.
            </div>
          )}
        </div>

      </div>

    </main>
  );
}
