'use client';

import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { getStoreSettings, updateStoreSettings } from '@/lib/data/repository';
import { StoreSettings } from '@/types/admin';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getStoreSettings().then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    await updateStoreSettings(settings);
    setSaving(false);
    setMsg('Store settings updated successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  if (!settings) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Settings className="w-4 h-4" />
            <span>Configuration Suite</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Store Settings & Gateway Security</h2>
          <p className="text-xs text-slate-400">Configure payment gateways, download token limits, currency defaults, and SEO meta tags.</p>
        </div>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs text-slate-300">
        
        {/* General Store Information */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">General Store Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Store Name</label>
              <input
                type="text"
                required
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Default Currency</label>
              <input
                type="text"
                required
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white focus:border-gold focus:outline-none font-bold uppercase"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways Security */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white">Payment Gateway Configuration</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Client Keys Safe</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Stripe Publishable Key</label>
              <input
                type="text"
                value={settings.gateway_stripe_public_key}
                onChange={(e) => setSettings({ ...settings, gateway_stripe_public_key: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white font-mono text-xs focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Razorpay Key ID</label>
              <input
                type="text"
                value={settings.gateway_razorpay_key_id}
                onChange={(e) => setSettings({ ...settings, gateway_razorpay_key_id: e.target.value })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white font-mono text-xs focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Digital Downloads Rules */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">Digital Download Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Default Download Count Limit</label>
              <input
                type="number"
                value={settings.default_max_downloads}
                onChange={(e) => setSettings({ ...settings, default_max_downloads: Number(e.target.value) })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white font-bold focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Link Expiration (Days)</label>
              <input
                type="number"
                value={settings.download_expiry_days}
                onChange={(e) => setSettings({ ...settings, download_expiry_days: Number(e.target.value) })}
                className="w-full bg-surface border border-surface-border rounded-xl p-3 text-white font-bold focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full gold-button py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-glow-gold"
        >
          {saving ? <span>Saving Settings...</span> : <> <CheckCircle2 className="w-5 h-5" /> <span>Save Store Settings</span> </>}
        </button>

      </form>
    </div>
  );
}
