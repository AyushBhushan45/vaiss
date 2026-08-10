'use client';

import React, { useState, useEffect } from 'react';
import { Ticket, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { getAdminCoupons, createCoupon, deleteCoupon } from '@/lib/data/repository';
import { Coupon } from '@/types';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [minOrder, setMinOrder] = useState('0');

  useEffect(() => {
    getAdminCoupons().then(setCoupons);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon = await createCoupon({
      code,
      discount_type: discountType,
      discount_value: Number(discountValue) || 20,
      min_order_amount: Number(minOrder) || 0,
      active: true
    });

    setCoupons([...coupons, newCoupon]);
    setCode('');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this coupon code?')) {
      await deleteCoupon(id);
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Discount Engine</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Coupons & Promo Codes</h2>
          <p className="text-xs text-slate-400">Create promotional discount codes for customer checkout.</p>
        </div>
      </div>

      {/* Add Coupon Form */}
      <form onSubmit={handleCreate} className="glass-card p-5 rounded-2xl border border-surface-border grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Coupon Code</label>
          <input
            type="text"
            required
            placeholder="e.g. WELCOME20"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-white font-mono font-bold uppercase focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Type</label>
          <select
            value={discountType}
            onChange={(e: any) => setDiscountType(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-white focus:border-gold focus:outline-none"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Discount Value</label>
          <input
            type="number"
            required
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-gold font-serif font-bold text-sm focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Min Order ($)</label>
          <input
            type="number"
            value={minOrder}
            onChange={(e) => setMinOrder(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-white focus:border-gold focus:outline-none"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full gold-button py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-gold"
          >
            <Plus className="w-4 h-4" /> Add Coupon
          </button>
        </div>
      </form>

      {/* Coupons Table */}
      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-surface-card/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-surface-border">
            <tr>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Min Order</th>
              <th className="p-4">Used Count</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/40">
            {coupons.map(c => (
              <tr key={c.id} className="hover:bg-surface-card/40 transition-colors">
                <td className="p-4 font-mono font-bold text-gold text-sm">{c.code}</td>
                <td className="p-4 font-serif font-bold text-white">
                  {c.discount_type === 'percentage' ? `${c.discount_value}% OFF` : `$${c.discount_value} USD OFF`}
                </td>
                <td className="p-4 text-slate-400">${c.min_order_amount} USD</td>
                <td className="p-4 font-bold text-white">{c.used_count} times</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Active
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
