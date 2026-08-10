'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Plus, Search, Filter, Edit, Trash2, Eye, EyeOff, 
  CheckCircle2, AlertTriangle, Sparkles, Star, Tag, RefreshCw, X 
} from 'lucide-react';
import { getEbooks, togglePublishEbook, deleteAdminEbook, getCategories } from '@/lib/data/repository';
import { Ebook, Category } from '@/types';

export default function AdminEbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [loading, setLoading] = useState(true);

  // Delete Confirmation State
  const [deletingEbook, setDeletingEbook] = useState<Ebook | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const books = await getEbooks({ publishedOnly: false });
    const cats = await getCategories();
    setEbooks(books);
    setCategories(cats);
    setLoading(false);
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePublish = async (book: Ebook) => {
    const updated = await togglePublishEbook(book.id);
    if (updated) {
      setEbooks(ebooks.map(b => b.id === book.id ? updated : b));
      showToast(`eBook "${book.title}" is now ${updated.published ? 'Published on storefront' : 'Unpublished'}`);
    }
  };

  const confirmDelete = async () => {
    if (!deletingEbook) return;
    setIsDeleting(true);
    const success = await deleteAdminEbook(deletingEbook.id);
    setIsDeleting(false);

    if (success) {
      setEbooks(ebooks.filter(b => b.id !== deletingEbook.id));
      showToast(`eBook "${deletingEbook.title}" was permanently deleted`);
      setDeletingEbook(null);
    }
  };

  const filteredBooks = ebooks.filter(b => {
    const matchesSearch = !searchQuery.trim() || 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || b.category_id === selectedCategory;
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'published' ? b.published : !b.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-2xl text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingEbook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-md p-6 rounded-3xl border border-surface-border space-y-4 bg-surface-card"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-950/60 text-red-400 border border-red-800/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white">Permanently Delete eBook?</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-gold">&quot;{deletingEbook.title}&quot;</strong>? This action cannot be undone and will remove it from the storefront.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingEbook(null)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-surface border border-surface-border text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>eBook Master Catalog</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Manage Store eBooks</h2>
          <p className="text-xs text-slate-400">Add, edit pricing, upload PDFs, or toggle publication status.</p>
        </div>

        <Link
          href="/admin/ebooks/add"
          className="gold-button px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-gold"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New eBook</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="glass-card p-4 rounded-2xl border border-surface-border flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search eBook title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-gold focus:outline-none"
          />
        </div>

        {/* Category & Status Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:border-gold focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs text-white focus:border-gold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>

      </div>

      {/* eBook Inventory Table */}
      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-surface-card/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-surface-border">
              <tr>
                <th className="p-4">Cover</th>
                <th className="p-4">Title & Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/40">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-surface-card/40 transition-colors">
                  <td className="p-4">
                    <img src={book.cover_url} alt={book.title} className="w-12 h-16 object-cover rounded-xl border border-surface-border shadow" />
                  </td>
                  <td className="p-4">
                    <span className="block font-serif font-bold text-white text-sm">{book.title}</span>
                    <span className="text-[11px] text-slate-400">By {book.author} • {book.page_count} Pages</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      {book.bestseller && <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-gold text-background">Bestseller</span>}
                      {book.featured && <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-800">Featured</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-surface border border-surface-border text-slate-300 text-[11px] font-semibold">
                      {book.category_name || 'Business'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-serif font-bold text-white text-sm">${book.price} USD</span>
                    {book.sale_price && (
                      <span className="block text-[10px] text-emerald-400 font-bold">Sale: ${book.sale_price} USD</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePublish(book)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        book.published 
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900/60' 
                          : 'bg-amber-950/80 text-amber-400 border border-amber-800/60 hover:bg-amber-900/60'
                      }`}
                    >
                      {book.published ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3 text-amber-400" />}
                      <span>{book.published ? 'Published' : 'Unpublished'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/ebook/${book.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-surface border border-surface-border text-slate-400 hover:text-white hover:border-gold/40 transition-all"
                        title="View Public Storefront Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/ebooks/${book.id}/edit`}
                        className="p-2 rounded-xl bg-surface border border-surface-border text-gold hover:bg-gold/20 hover:border-gold/40 transition-all"
                        title="Edit eBook Details"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeletingEbook(book)}
                        className="p-2 rounded-xl bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60 transition-all"
                        title="Delete eBook"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
