'use client';

import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Clock } from 'lucide-react';
import { getActivityLogs } from '@/lib/data/repository';
import { ActivityLog } from '@/types/admin';

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    getActivityLogs().then(setLogs);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Audit Audit Trail</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Admin Activity Log</h2>
          <p className="text-xs text-slate-400">Record of administrative actions (eBook published, price changed, settings updated, etc.).</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <div className="p-4 bg-surface-card/80 border-b border-surface-border text-xs font-bold text-slate-400 uppercase tracking-wider">
          System Action Trail
        </div>

        <div className="divide-y divide-surface-border/40">
          {logs.map(log => (
            <div key={log.id} className="p-4 hover:bg-surface-card/40 transition-colors flex items-start justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-gold/15 text-gold border border-gold/30 uppercase">
                  {log.action}
                </span>
                <p className="text-xs font-semibold text-white mt-1.5">{log.details}</p>
                <span className="text-[10px] text-slate-500 block mt-1">
                  By {log.admin_name} ({log.admin_role}) • IP: {log.ip_address}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                {new Date(log.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
