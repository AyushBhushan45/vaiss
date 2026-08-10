'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Search, Filter, CheckCircle2, AlertCircle, RefreshCw, 
  X, Eye, Mail, DollarSign, Download, Lock, Tag 
} from 'lucide-react';
import { getAdminOrders, updateOrderStatus } from '@/lib/data/repository';
import { Order } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const list = await getAdminOrders();
    setOrders(list);
    setLoading(false);
  }

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    const updated = await updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders(orders.map(o => o.id === orderId ? updated : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = !searchQuery.trim() || 
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (o.user_email && o.user_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.user_name && o.user_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-surface-border space-y-6 bg-surface-card relative"
            >
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-surface text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-surface-border pb-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center font-bold">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-gold uppercase block">Order #{selectedOrder.order_number}</span>
                  <h3 className="font-serif text-xl font-bold text-white">Order Specification Details</h3>
                  <span className="text-[11px] text-slate-400">Placed on {new Date(selectedOrder.created_at).toLocaleString()}</span>
                </div>
              </div>

              {/* Customer & Payment Meta Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-surface rounded-xl border border-surface-border">
                  <span className="block font-bold text-slate-400 uppercase text-[10px]">Customer Info</span>
                  <span className="block font-semibold text-white mt-1">{selectedOrder.user_name || 'Customer'}</span>
                  <span className="text-slate-400">{selectedOrder.user_email}</span>
                </div>

                <div className="p-3 bg-surface rounded-xl border border-surface-border">
                  <span className="block font-bold text-slate-400 uppercase text-[10px]">Payment Summary</span>
                  <span className="block font-serif font-bold text-gold text-base mt-1">${selectedOrder.total_amount} {selectedOrder.currency}</span>
                  <span className="text-slate-400 uppercase text-[10px] font-bold">Gateway: {selectedOrder.payment_provider}</span>
                </div>
              </div>

              {/* Purchased eBooks Items */}
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Purchased Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map(item => (
                    <div key={item.id} className="p-3 bg-surface rounded-xl border border-surface-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.ebook?.cover_url && (
                          <img src={item.ebook.cover_url} alt={item.ebook.title} className="w-10 h-14 object-cover rounded-lg border border-surface-border" />
                        )}
                        <div>
                          <span className="block font-bold text-white text-xs">{item.ebook?.title || 'eBook Item'}</span>
                          <span className="text-[10px] text-slate-400">By {item.ebook?.author || 'Lumina Author'}</span>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-gold text-xs">${item.price} USD</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Controls */}
              <div className="p-4 bg-surface rounded-2xl border border-surface-border flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Change Status</span>
                  <span className="text-xs font-semibold text-white">Current: <strong className="uppercase text-gold">{selectedOrder.status}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'paid')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800"
                  >
                    Paid
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'refunded')}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-950 text-red-300 border border-red-800"
                  >
                    Refund
                  </button>
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
            <ShoppingCart className="w-4 h-4" />
            <span>Storefront Sales</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Customer Orders</h2>
          <p className="text-xs text-slate-400">View payment statuses, order line items, and transaction receipts.</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-card p-4 rounded-2xl border border-surface-border flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, email, or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:border-gold focus:outline-none"
        >
          <option value="all">All Statuses (Paid, Pending, Refunded)</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-surface-card/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-surface-border">
              <tr>
                <th className="p-4">Order Number</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/40">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-surface-card/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{order.order_number}</td>
                  <td className="p-4">
                    <span className="block font-semibold text-white">{order.user_name || 'Customer'}</span>
                    <span className="text-[10px] text-slate-400">{order.user_email}</span>
                  </td>
                  <td className="p-4 font-serif font-bold text-gold">${order.total_amount} {order.currency}</td>
                  <td className="p-4 uppercase text-[10px] font-bold text-slate-400">{order.payment_provider}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'paid' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' : 
                      order.status === 'refunded' ? 'bg-red-950/80 text-red-400 border border-red-800/50' : 
                      'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 rounded-xl bg-surface border border-surface-border text-gold hover:bg-gold/20 hover:border-gold/40 transition-all"
                      title="View Order Specification"
                    >
                      <Eye className="w-4 h-4" />
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
