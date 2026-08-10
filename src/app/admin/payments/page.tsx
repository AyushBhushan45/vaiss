'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, ShieldCheck, Search, Filter } from 'lucide-react';
import { getAdminPayments } from '@/lib/data/repository';
import { PaymentTransaction } from '@/types/admin';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);

  useEffect(() => {
    getAdminPayments().then(setPayments);
  }, []);

  const totalSuccessful = payments.filter(p => p.status === 'succeeded').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>Payment Gateway Logs</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Transactions & Gateway Receipts</h2>
          <p className="text-xs text-slate-400">View Stripe, Apple Pay, PayPal, and Wire Transfer transaction logs.</p>
        </div>

        <div className="p-3 bg-surface rounded-2xl border border-surface-border">
          <span className="block text-[10px] text-slate-400 uppercase font-bold">Total Processed Revenue</span>
          <span className="font-serif font-bold text-gold text-lg">${totalSuccessful} USD</span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-surface-card/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-surface-border">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/40">
              {payments.map(tx => (
                <tr key={tx.id} className="hover:bg-surface-card/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{tx.transaction_id}</td>
                  <td className="p-4 font-semibold text-white">{tx.customer_name}</td>
                  <td className="p-4 text-slate-400">{tx.customer_email}</td>
                  <td className="p-4 uppercase text-[10px] font-bold text-slate-400">{tx.gateway}</td>
                  <td className="p-4 font-serif font-bold text-gold">${tx.amount} {tx.currency}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">{new Date(tx.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
