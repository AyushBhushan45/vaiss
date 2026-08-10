'use client';

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { getEmailTemplates, updateEmailTemplate } from '@/lib/data/repository';
import { EmailTemplate } from '@/types/admin';

export default function AdminEmailsPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getEmailTemplates().then(list => {
      setTemplates(list);
      if (list.length > 0) setSelectedTemplate(list[0]);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;
    const updated = await updateEmailTemplate(selectedTemplate.id, selectedTemplate);
    if (updated) {
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? updated : t));
      setMsg('Email template saved!');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  if (!selectedTemplate) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>Automated Notifications</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Transactional Email Templates</h2>
          <p className="text-xs text-slate-400">Edit purchase confirmation, payment failure, and refund email templates.</p>
        </div>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t)}
              className={`w-full p-3 rounded-xl text-xs font-bold text-left transition-all ${
                selectedTemplate.id === t.id ? 'bg-gold/15 text-gold border border-gold/30' : 'bg-surface-card border border-surface-border text-slate-300 hover:text-white'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="md:col-span-2 glass-panel p-6 rounded-2xl border border-surface-border space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-slate-300">Email Subject Line</label>
            <input
              type="text"
              required
              value={selectedTemplate.subject}
              onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">Email Body Content (Markdown & Tags)</label>
            <textarea
              rows={8}
              required
              value={selectedTemplate.body_markdown}
              onChange={(e) => setSelectedTemplate({ ...selectedTemplate, body_markdown: e.target.value })}
              className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white font-mono text-xs focus:border-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full gold-button py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-glow-gold"
          >
            <CheckCircle2 className="w-4 h-4" /> Save Template
          </button>
        </form>
      </div>
    </div>
  );
}
