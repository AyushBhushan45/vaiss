'use client';

import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getAllAdminUsers, createAdminUser } from '@/lib/data/repository';
import { AdminUser, AdminRole } from '@/types/admin';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('editor');

  useEffect(() => {
    getAllAdminUsers().then(setUsers);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const newUser = await createAdminUser({ name, email, role });
    setUsers([...users, newUser]);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-3xl border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Staff Permissions</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mt-1">Admin Staff & Role-Based Access</h2>
          <p className="text-xs text-slate-400">Manage administrator roles (Owner, Editor, Support, Analyst).</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="glass-card p-5 rounded-2xl border border-surface-border grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Staff Name</label>
          <input
            type="text"
            required
            placeholder="John Executive"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-white focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Staff Email</label>
          <input
            type="email"
            required
            placeholder="staff@luminabooks.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-white focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Role</label>
          <select
            value={role}
            onChange={(e: any) => setRole(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-white focus:border-gold focus:outline-none"
          >
            <option value="owner">Owner (Full Access)</option>
            <option value="editor">Editor (eBooks & Content)</option>
            <option value="support">Support (Orders & Downloads)</option>
            <option value="analyst">Analyst (View Revenue Only)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full gold-button py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow-gold"
          >
            <Plus className="w-4 h-4" /> Add Staff User
          </button>
        </div>
      </form>

      <div className="glass-panel rounded-3xl border border-surface-border overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-surface-card/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-surface-border">
            <tr>
              <th className="p-4">Staff Member</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Created Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/40">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-surface-card/40 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-3">
                  <img src={u.avatar_url} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-gold/40" />
                  <span>{u.name}</span>
                </td>
                <td className="p-4 text-slate-400">{u.email}</td>
                <td className="p-4 uppercase font-bold text-gold text-[10px]">{u.role}</td>
                <td className="p-4 text-slate-400 text-[11px]">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
