'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Download, Users } from 'lucide-react';
import { getAnalytics } from '@/lib/data/repository';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState('30d');

  useEffect(() => {
    getAnalytics(range).then(setData);
  }, [range]);

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Store Performance</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Analytics & Revenue Reports</h2>
          <p className="text-xs text-slate-400">Track conversion rates, average order value, top masterclasses, and sales by period.</p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-surface border border-surface-border rounded-xl px-4 py-2 text-xs text-white focus:border-gold focus:outline-none"
        >
          <option value="today">Today</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="month">This Month</option>
          <option value="custom">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-surface-border space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Gross Revenue</span>
          <span className="font-serif text-2xl font-bold text-gold block">${data.totalRevenue} USD</span>
          <span className="text-[10px] text-emerald-400 font-bold">+100% Verified Payments</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-surface-border space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Average Order Value (AOV)</span>
          <span className="font-serif text-2xl font-bold text-white block">${data.averageOrderValue} USD</span>
          <span className="text-[10px] text-slate-400 font-bold">Per Checkout Session</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-surface-border space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Successful Orders</span>
          <span className="font-serif text-2xl font-bold text-white block">{data.totalOrders}</span>
          <span className="text-[10px] text-emerald-400 font-bold">100% Delivered</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-surface-border space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Dispatched PDF Downloads</span>
          <span className="font-serif text-2xl font-bold text-amber-400 block">{data.totalDownloads}</span>
          <span className="text-[10px] text-slate-400 font-bold">Secure Access Tokens</span>
        </div>
      </div>
    </div>
  );
}
