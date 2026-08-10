'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderTree, Plus, Edit, Trash2, BookOpen, CheckCircle2, X } from 'lucide-react';
import { getCategories, getEbooks, createCategory, updateCategory, deleteCategory } from '@/lib/data/repository';
import { Category, Ebook } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const cats = await getCategories();
    const books = await getEbooks({ publishedOnly: false });
    setCategories(cats);
    setEbooks(books);
    setLoading(false);
  }

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCategory) {
      const updated = await updateCategory(editingCategory.id, { name, description });
      if (updated) setCategories(categories.map(c => c.id === editingCategory.id ? updated : c));
    } else {
      const newCat = await createCategory({ name, description });
      setCategories([...categories, newCat]);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const success = await deleteCategory(id);
      if (success) setCategories(categories.filter(c => c.id !== id));
    }
  };

  const getEbookCountForCategory = (catId: string) => {
    return ebooks.filter(b => b.category_id === catId).length;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Category Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-md p-6 rounded-3xl border border-surface-border space-y-4 bg-surface-card relative"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-surface text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <p className="text-xs text-slate-400">Taxonomy classification for eBook catalog</p>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wealth & Investing"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2.5 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short summary of topics in this domain..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-button py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-glow-gold"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <FolderTree className="w-4 h-4" />
            <span>Storefront Taxonomy</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">eBook Categories</h2>
          <p className="text-xs text-slate-400">Group publications by topic (Finance, Business, Mindset, Gold, Retirement, etc.)</p>
        </div>

        <button
          onClick={openAddModal}
          className="gold-button px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-gold cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const count = getEbookCountForCategory(cat.id);
          return (
            <div key={cat.id} className="glass-card p-5 rounded-2xl border border-surface-border space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-base font-bold text-white">{cat.name}</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30">
                    {count} {count === 1 ? 'eBook' : 'eBooks'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.description || 'No description provided.'}</p>
              </div>

              <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">Slug: {cat.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg bg-surface border border-surface-border text-gold hover:bg-gold/20"
                    title="Edit Category"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
