'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, ShoppingBag, DollarSign, Calendar, Mail, BookOpen, X, ShieldCheck } from 'lucide-react';
import { getAdminCustomers, getEbooks } from '@/lib/data/repository';
import { Customer, Ebook } from '@/types';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const list = await getAdminCustomers();
    const books = await getEbooks({ publishedOnly: false });
    setCustomers(list);
    setEbooks(books);
    setLoading(false);
  }

  const filteredCustomers = customers.filter(c => 
    !searchQuery.trim() || 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Customer Purchase History Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-surface-border space-y-6 bg-surface-card relative"
            >
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-surface text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-surface-border pb-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center font-bold text-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">{selectedCustomer.name}</h3>
                  <span className="text-xs text-slate-400">{selectedCustomer.email}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-surface rounded-xl border border-surface-border">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Lifetime Spend</span>
                  <span className="font-serif text-xl font-bold text-gold mt-1 block">${selectedCustomer.total_spent} USD</span>
                </div>
                <div className="p-3 bg-surface rounded-xl border border-surface-border">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Completed Purchases</span>
                  <span className="font-serif text-xl font-bold text-white mt-1 block">{selectedCustomer.order_count} Orders</span>
                </div>
              </div>

              {/* Purchased eBooks Collection */}
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Purchased Masterclass Library</h4>
                <div className="space-y-2">
                  {selectedCustomer.purchased_ebook_ids.map(bookId => {
                    const book = ebooks.find(b => b.id === bookId);
                    return (
                      <div key={bookId} className="p-3 bg-surface rounded-xl border border-surface-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {book?.cover_url && (
                            <img src={book.cover_url} alt={book.title} className="w-10 h-14 object-cover rounded-lg border border-surface-border" />
                          )}
                          <div>
                            <span className="block font-bold text-white text-xs">{book?.title || 'Purchased Publication'}</span>
                            <span className="text-[10px] text-slate-400">By {book?.author || 'Lumina Publishing'}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Active License ✓
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Executive Customer Directory</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Registered Readers & Buyers</h2>
          <p className="text-xs text-slate-400">Track individual customer lifetime spend, purchase history, and reading licenses.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-surface-border">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-surface-card/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-surface-border">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Purchases</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">First Registered</th>
                <th className="p-4 text-right">Purchase History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/40">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-surface-card/40 transition-colors">
                  <td className="p-4 font-bold text-white">{customer.name}</td>
                  <td className="p-4 text-slate-400">{customer.email}</td>
                  <td className="p-4 font-bold text-white">{customer.order_count} Orders</td>
                  <td className="p-4 font-serif font-bold text-gold">${customer.total_spent} USD</td>
                  <td className="p-4 text-slate-400 text-[11px]">{new Date(customer.registered_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-3 py-1.5 rounded-xl bg-surface border border-surface-border text-gold hover:bg-gold/20 hover:border-gold/40 transition-all font-bold text-[11px]"
                    >
                      View Purchases ({customer.purchased_ebook_ids.length})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
