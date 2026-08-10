'use client';

import React, { useState, useEffect } from 'react';
import { Image, CheckCircle2, RefreshCw } from 'lucide-react';
import { getCMSContent, updateCMSContent } from '@/lib/data/repository';
import { CMSContent } from '@/types/admin';

export default function AdminContentPage() {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getCMSContent().then(setContent);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);

    await updateCMSContent(content);
    setSaving(false);
    setMsg('Website CMS content updated successfully! Public homepage updated live.');
    setTimeout(() => setMsg(''), 4000);
  };

  if (!content) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Image className="w-4 h-4" />
            <span>Storefront Content CMS</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Live Website Content Manager</h2>
          <p className="text-xs text-slate-400">Edit homepage hero headlines, about text, testimonials, FAQs, and footer links without code changes.</p>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs text-slate-300">
        
        {/* Homepage Hero Section */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">Homepage Hero Section</h3>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Main Hero Headline *</label>
            <input
              type="text"
              required
              value={content.hero_heading}
              onChange={(e) => setContent({ ...content, hero_heading: e.target.value })}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white font-serif font-bold text-base focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Hero Subtitle Description *</label>
            <textarea
              rows={3}
              required
              value={content.hero_description}
              onChange={(e) => setContent({ ...content, hero_description: e.target.value })}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">About & Brand Section</h3>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">About Heading</label>
            <input
              type="text"
              value={content.about_heading}
              onChange={(e) => setContent({ ...content, about_heading: e.target.value })}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">About Description Text</label>
            <textarea
              rows={4}
              value={content.about_description}
              onChange={(e) => setContent({ ...content, about_description: e.target.value })}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Footer & Support Email */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">Footer & Contact Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Copyright Line</label>
              <input
                type="text"
                value={content.footer_copyright}
                onChange={(e) => setContent({ ...content, footer_copyright: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">Support Email</label>
              <input
                type="email"
                value={content.footer_email}
                onChange={(e) => setContent({ ...content, footer_email: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full gold-button py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-glow-gold"
        >
          {saving ? <span>Updating CMS...</span> : <> <CheckCircle2 className="w-5 h-5" /> <span>Save & Update Public Website</span> </>}
        </button>

      </form>
    </div>
  );
}
