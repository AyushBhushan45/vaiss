'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Lock, RefreshCw, CheckCircle2, EyeOff, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { getAdminDownloadLinks, toggleDownloadLinkStatus, regenerateDownloadLink } from '@/lib/data/repository';
import { DownloadLink } from '@/types/admin';

export default function AdminDownloadsPage() {
  const [links, setLinks] = useState<DownloadLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLinks();
  }, []);

  async function loadLinks() {
    setLoading(true);
    const list = await getAdminDownloadLinks();
    setLinks(list);
    setLoading(false);
  }

  const handleToggleActive = async (link: DownloadLink) => {
    const updated = await toggleDownloadLinkStatus(link.id);
    if (updated) setLinks(links.map(l => l.id === link.id ? updated : l));
  };

  const handleRegenerate = async (link: DownloadLink) => {
    const updated = await regenerateDownloadLink(link.id);
    if (updated) setLinks(links.map(l => l.id === link.id ? updated : l));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Download className="w-4 h-4" />
            <span>Digital PDF License Security</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Digital Download Management</h2>
          <p className="text-xs text-slate-400">Generate secure download tokens, set download limits, or revoke expired links.</p>
        </div>
      </div>

      {/* Downloads Table */}
      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-surface-card/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-surface-border">
              <tr>
                <th className="p-4">Customer Email</th>
                <th className="p-4">eBook Title</th>
                <th className="p-4">Download Count / Limit</th>
                <th className="p-4">Secure Token</th>
                <th className="p-4">Expires At</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/40">
              {links.map(link => (
                <tr key={link.id} className="hover:bg-surface-card/40 transition-colors">
                  <td className="p-4 font-semibold text-white">{link.customer_email}</td>
                  <td className="p-4 font-serif font-bold text-gold">{link.ebook_title}</td>
                  <td className="p-4 font-mono font-bold text-white">
                    {link.download_count} / {link.max_downloads}
                  </td>
                  <td className="p-4 font-mono text-[10px] text-slate-400 truncate max-w-[120px]">{link.token}</td>
                  <td className="p-4 text-[11px] text-slate-400">{new Date(link.expires_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(link)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        link.active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                      }`}
                    >
                      {link.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleRegenerate(link)}
                      className="px-3 py-1.5 rounded-xl bg-surface border border-surface-border text-gold text-[11px] font-bold hover:bg-gold/20 flex items-center gap-1 ml-auto"
                      title="Regenerate Security Token & Reset Expiry"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset Link
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
