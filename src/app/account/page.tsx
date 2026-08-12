'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, ShieldCheck, ShoppingBag, Library, LogOut, CheckCircle2, 
  Bell 
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { getAllOrders, getUserPurchases } from '@/lib/data/repository';
import { Order, Purchase } from '@/types';

export default function AccountPage() {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (user) {
        const allOrders = await getAllOrders();
        const userOrders = allOrders.filter(o => o.user_id === user.id || o.user_email === user.email);
        setOrders(userOrders);

        const userPurchases = await getUserPurchases(user.id);
        setPurchases(userPurchases);
        setFullName(user.full_name);
        setAvatarUrl(user.avatar_url || '');
      }
    }
    loadData();
  }, [user]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ full_name: fullName, avatar_url: avatarUrl });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-surface-card border border-surface-border flex items-center justify-center mx-auto text-slate-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white">Account Session Required</h2>
        <p className="text-slate-400 text-xs">Please sign in to access your masterclasses, profile settings, and DRM downloads.</p>
        <Link href="/auth/login" className="gold-button px-6 py-3 rounded-2xl font-bold text-xs inline-block shadow-glow-gold">
          Sign In to Lumina
        </Link>
      </div>
    );
  }

  const defaultAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Hero Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10">
          <div className="relative group">
            <img 
              src={avatarUrl || user.avatar_url || defaultAvatars[0]} 
              alt={user.full_name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-gold/40 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center" title="Verified Account">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl font-bold text-white">{user.full_name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                user.role === 'admin' ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50' : 'bg-gold/10 text-gold border border-gold/30'
              }`}>
                {user.role} Reader
              </span>
            </div>
            <p className="text-xs text-slate-400">{user.email}</p>
            <span className="text-[10px] text-slate-500 block">Active Member • DRM License Verified</span>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10">
          {user.role === 'admin' && (
            <Link
              href="/admin/dashboard"
              className="px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-purple-300 border border-purple-600/40 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Admin Console</span>
            </Link>
          )}

          <Link
            href="/library"
            className="gold-button px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-gold"
          >
            <Library className="w-4 h-4" /> My Library ({purchases.length})
          </Link>
        </div>
      </div>

      {/* Interactive Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-border pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-gold text-background shadow-md'
              : 'bg-surface/60 text-slate-400 hover:text-white hover:bg-surface'
          }`}
        >
          <User className="w-4 h-4" /> Profile & Identity
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-gold text-background shadow-md'
              : 'bg-surface/60 text-slate-400 hover:text-white hover:bg-surface'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders & Invoices ({orders.length})
        </button>
      </div>

      {/* TAB CONTENT AREAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* TAB 1: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <>
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border space-y-6">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-gold" /> Personal Profile & Details
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Display Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface-card border border-surface-border rounded-xl px-4 py-3 text-xs text-white focus:border-gold focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Registered Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-surface-card/40 border border-surface-border rounded-xl px-4 py-3 text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>

                {/* Avatar Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Select Account Avatar</label>
                  <div className="flex items-center gap-3">
                    {defaultAvatars.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatarUrl(url)}
                        className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                          avatarUrl === url ? 'border-gold scale-110 shadow-glow-gold' : 'border-surface-border opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {savedSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile settings updated successfully!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full gold-button py-3.5 rounded-xl text-xs font-bold shadow-glow-gold"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>

            {/* Account Preferences Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-surface-border space-y-4">
                <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gold" /> Communication Preferences
                </h4>

                <div className="flex items-center justify-between p-3 bg-surface-card/60 rounded-2xl border border-surface-border">
                  <div>
                    <span className="text-xs font-bold text-white block">Email Book Drops & Releases</span>
                    <span className="text-[10px] text-slate-400">Receive notifications for new masterclasses.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="w-4 h-4 accent-gold cursor-pointer"
                  />
                </div>
              </div>

              {/* LOGOUT CARD */}
              <div className="glass-panel p-6 rounded-3xl border border-red-500/30 bg-red-950/10 space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <LogOut className="w-6 h-6" />
                  <div>
                    <h4 className="font-serif text-base font-bold text-white">Sign Out of Account</h4>
                    <p className="text-[11px] text-slate-400">End your active DRM reader session on this browser.</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/auth/login';
                  }}
                  className="w-full py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Lumina</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: ORDERS & BILLING */}
        {activeTab === 'orders' && (
          <div className="lg:col-span-12 glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border space-y-6">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" /> Purchase & Transaction History
            </h3>

            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 bg-surface-card rounded-2xl border border-surface-border flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-white font-serif">{ord.order_number}</span>
                      <span className="block text-[10px] text-slate-400">
                        {new Date(ord.created_at).toLocaleDateString()} • Provider: {ord.payment_provider.toUpperCase()}
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
              <div className="p-12 text-center text-slate-400 text-xs">
                No orders recorded under this email address yet.
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
