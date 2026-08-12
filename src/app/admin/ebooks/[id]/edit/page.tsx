'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, CheckCircle2, BookOpen, DollarSign, 
  Tag, FileText, Sparkles, Image, ShieldCheck, Upload
} from 'lucide-react';
import { getEbookById, updateAdminEbook, getCategories } from '@/lib/data/repository';
import { Category, Ebook } from '@/types';

export default function EditEbookPage() {
  const router = useRouter();
  const params = useParams();
  const ebookId = params?.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [benefitsInput, setBenefitsInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [bestseller, setBestseller] = useState(false);

  useEffect(() => {
    async function loadEbook() {
      const cats = await getCategories();
      setCategories(cats);

      if (ebookId) {
        const book = await getEbookById(ebookId);
        if (book) {
          setTitle(book.title || '');
          setSubtitle(book.subtitle || '');
          setAuthor(book.author || '');
          setPrice(String(book.price || 100));
          setSalePrice(book.sale_price ? String(book.sale_price) : '');
          setCategoryId(book.category_id || cats[0]?.id || 'cat-1');
          setShortDescription(book.short_description || '');
          setDescription(book.description || '');
          setPageCount(String(book.page_count || 200));
          setCoverUrl(book.cover_url || '');
          setFilePath(book.file_path || '');
          setPreviewUrl(book.preview_url || '');
          setTagsInput(book.tags ? book.tags.join(', ') : 'Wealth, Finance');
          setBenefitsInput(book.benefits_json ? book.benefits_json.join('\n') : '');
          setSeoTitle(book.seo_title || '');
          setSeoDescription(book.seo_description || '');
          setPublished(book.published);
          setFeatured(book.featured);
          setBestseller(book.bestseller);
        }
      }
      setLoading(false);
    }
    loadEbook();
  }, [ebookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const benefits_json = benefitsInput.split('\n').map(b => b.trim()).filter(Boolean);

    await updateAdminEbook(ebookId, {
      title,
      subtitle,
      author,
      price: Number(price) || 100,
      sale_price: salePrice ? Number(salePrice) : undefined,
      category_id: categoryId,
      short_description: shortDescription,
      description,
      page_count: Number(pageCount) || 200,
      cover_url: coverUrl,
      file_path: filePath,
      preview_url: previewUrl,
      tags,
      benefits_json,
      seo_title: seoTitle,
      seo_description: seoDescription,
      published,
      featured,
      bestseller
    });

    setSaving(false);
    router.push('/admin/ebooks');
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading eBook Details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/ebooks"
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to eBooks List
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 fill-gold" />
          <span>Edit Publication</span>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-surface-border bg-surface-card space-y-8">
        
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">Edit eBook: {title}</h2>
          <p className="text-xs text-slate-400 mt-1">
            Modify price, descriptions, category, cover artwork or publication status.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-300">
          
          {/* Title & Author Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-white">eBook Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1.5 text-white">Author Name *</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2.5 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-slate-300">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2 text-white focus:border-gold focus:outline-none"
            />
          </div>

          {/* Pricing & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-white">Regular Price ($ USD) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2.5 text-white font-serif font-bold text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1.5 text-slate-300">Sale Price (Optional)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2.5 text-emerald-400 font-serif font-bold text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1.5 text-white">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2.5 text-white focus:border-gold focus:outline-none"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Page Count & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-slate-300">Page Count</label>
              <input
                type="number"
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1.5 text-slate-300">Tags (Comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block font-semibold mb-1.5 text-slate-300">Short Summary Description</label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1.5 text-white">Full Masterclass Description</label>
            <textarea
              rows={6}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none font-mono text-xs"
            />
          </div>

          {/* Digital Assets & Storage */}
          <div className="p-6 bg-surface/60 rounded-2xl border border-surface-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4 text-gold" />
                  Digital Assets & Media Upload
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Upload cover artwork images (PNG, JPG, WebP) and eBook PDF documents.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Cover Image Upload Box */}
              <div className="space-y-2">
                <label className="block font-semibold text-xs text-white">Cover Artwork Image *</label>
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-surface-border hover:border-gold/60 rounded-2xl bg-surface/40 transition-colors text-center relative group">
                  {coverUrl ? (
                    <div className="relative w-full aspect-[3/4] max-h-48 rounded-xl overflow-hidden mb-3 border border-surface-border shadow-lg">
                      <img src={coverUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setCoverUrl('')}
                        className="absolute top-2 right-2 bg-red-600/90 text-white p-1 rounded-full text-xs hover:bg-red-700 transition-colors"
                        title="Remove Cover"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="py-6 flex flex-col items-center">
                      <Image className="w-8 h-8 text-gold/80 mb-2 stroke-[1.5]" />
                      <span className="text-xs font-bold text-white">No cover selected</span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    id="cover-file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          if (evt.target?.result) {
                            setCoverUrl(evt.target.result as string);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  <label
                    htmlFor="cover-file-upload"
                    className="cursor-pointer px-4 py-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </label>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block mb-1">Or enter Image URL manually:</span>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl p-2 text-white text-[11px] focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Protected PDF File Upload */}
              <div className="space-y-2">
                <label className="block font-semibold text-xs text-white">Protected eBook PDF File</label>
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-surface-border hover:border-gold/60 rounded-2xl bg-surface/40 transition-colors text-center">
                  <FileText className="w-8 h-8 text-emerald-400/80 mb-2 stroke-[1.5]" />
                  <span className="text-xs font-bold text-white mb-1 truncate max-w-full px-2">
                    {filePath ? filePath.split('/').pop() : 'No PDF file attached'}
                  </span>
                  
                  <input
                    type="file"
                    accept=".pdf"
                    id="pdf-file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFilePath(`private/uploads/${file.name}`);
                      }
                    }}
                  />

                  <label
                    htmlFor="pdf-file-upload"
                    className="cursor-pointer px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors mt-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload PDF File</span>
                  </label>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block mb-1">Internal Storage Path:</span>
                  <input
                    type="text"
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl p-2 text-white text-[11px] focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Sample Preview PDF */}
              <div className="space-y-2">
                <label className="block font-semibold text-xs text-white">Sample Preview PDF</label>
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-surface-border hover:border-gold/60 rounded-2xl bg-surface/40 transition-colors text-center">
                  <BookOpen className="w-8 h-8 text-purple-400/80 mb-2 stroke-[1.5]" />
                  <span className="text-xs font-bold text-white mb-1 truncate max-w-full px-2">
                    {previewUrl ? previewUrl.split('/').pop() : 'No sample PDF attached'}
                  </span>

                  <input
                    type="file"
                    accept=".pdf"
                    id="sample-file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewUrl(`samples/${file.name}`);
                      }
                    }}
                  />

                  <label
                    htmlFor="sample-file-upload"
                    className="cursor-pointer px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors mt-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Sample PDF</span>
                  </label>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block mb-1">Sample PDF URL / Path:</span>
                  <input
                    type="text"
                    value={previewUrl}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl p-2 text-white text-[11px] focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block font-semibold mb-1.5 text-slate-300">What You Will Learn (One per line)</label>
            <textarea
              rows={3}
              value={benefitsInput}
              onChange={(e) => setBenefitsInput(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
            />
          </div>

          {/* Status Switches */}
          <div className="p-4 bg-surface/60 rounded-2xl border border-surface-border flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded text-gold focus:ring-gold"
              />
              <span className="font-bold text-white">Published on Public Storefront</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-gold focus:ring-gold"
              />
              <span className="text-slate-300">Mark as Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="w-4 h-4 rounded text-gold focus:ring-gold"
              />
              <span className="text-slate-300">Mark as Bestseller</span>
            </label>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full gold-button py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-glow-gold hover:scale-[1.01] transition-transform cursor-pointer"
          >
            {saving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Save Changes & Update Storefront</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
