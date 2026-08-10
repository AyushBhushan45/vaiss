'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, ShoppingCart, Users, Download, DollarSign, ArrowUpRight, 
  Sparkles, TrendingUp, ShieldCheck, FileText, CheckCircle2, AlertCircle, Plus 
} from 'lucide-react';
import { getAnalytics, getAdminOrders, getEbooks } from '@/lib/data/repository';
import { Order, Ebook } from '@/types';

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [bestsellers, setBestsellers] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const data = await getAnalytics('30d');
        const orders = await getAdminOrders();
        const books = await getEbooks({ publishedOnly: false });
        
        setAnalytics(data);
        setRecentOrders(orders.slice(0, 5));
        setBestsellers(books.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading Analytics & Metrics...</span>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Store Revenue', value: `$${analytics?.totalRevenue || 0} USD`, icon: DollarSign, color: 'text-gold', badge: '+18.4% vs last month' },
    { label: 'Total eBooks', value: analytics?.totalEbooks || 0, sub: `${analytics?.totalPublished || 0} Published • 0 Drafts`, icon: BookOpen, color: 'text-purple-400' },
    { label: 'Completed Orders', value: analytics?.totalOrders || 0, sub: 'Instant Delivery 100%', icon: ShoppingCart, color: 'text-emerald-400' },
    { label: 'Verified Customers', value: analytics?.totalCustomers || 0, sub: 'Active US & Global', icon: Users, color: 'text-blue-400' },
    { label: 'PDF Downloads', value: analytics?.totalDownloads || 0, sub: 'DRM-Free Dispatched', icon: Download, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Add Trigger */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold mb-2 border border-gold/30">
            <Sparkles className="w-3.5 h-3.5 fill-gold" />
            <span>Storefront Engine Active</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Welcome back, Administrator</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Manage digital eBook inventory, sales, customer downloads, and coupons in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/ebooks/add"
            className="gold-button px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-gold"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Publish New eBook</span>
          </Link>
        </div>
      </div>

      {/* 5 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-5 rounded-2xl border border-surface-border flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className="p-2 rounded-xl bg-surface-card border border-surface-border">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold text-white block">{stat.value}</span>
                <span className="text-[10px] text-slate-400 mt-1 block">{stat.sub || stat.badge}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 2-Column Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Orders Table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Recent Customer Orders</h3>
              <p className="text-xs text-slate-400">Live order status and license delivery</p>
            </div>
            <Link href="/admin/orders" className="text-xs text-gold hover:underline font-semibold flex items-center gap-1">
              View All Orders <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-surface-card/60 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/40">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-card/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-white">{order.order_number}</td>
                    <td className="p-3">
                      <span className="block font-semibold text-white">{order.user_name || order.user_email}</span>
                      <span className="text-[10px] text-slate-400">{order.user_email}</span>
                    </td>
                    <td className="p-3 font-serif font-bold text-gold">${order.total_amount} {order.currency}</td>
                    <td className="p-3 uppercase text-[10px] font-bold text-slate-400">{order.payment_provider}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'paid' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Best Selling eBooks Showcase */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Top Publications</h3>
              <p className="text-xs text-slate-400">Best-selling eBooks in catalog</p>
            </div>
            <Link href="/admin/ebooks" className="text-xs text-gold hover:underline font-semibold flex items-center gap-1">
              Manage All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {bestsellers.map((book) => (
              <div key={book.id} className="p-3 bg-surface-card/60 rounded-2xl border border-surface-border flex items-center gap-3">
                <img src={book.cover_url} alt={book.title} className="w-12 h-16 object-cover rounded-xl border border-surface-border shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-xs font-bold text-white truncate">{book.title}</h4>
                  <span className="text-[10px] text-slate-400 block">By {book.author}</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-serif font-bold text-gold">${book.price} USD</span>
                    <span className="text-[10px] text-emerald-400 font-bold">Published ✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
