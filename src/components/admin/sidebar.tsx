'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, PlusCircle, FolderTree, ShoppingCart, 
  Users, Download, CreditCard, Ticket, BarChart3, Image, Mail, 
  Settings, UserCheck, Activity, LogOut, ChevronDown, ChevronRight,
  ShieldCheck, ExternalLink
} from 'lucide-react';
import { useAdminAuth } from '@/lib/auth/admin-context';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { adminUser, logoutAdmin } = useAdminAuth();
  const [ebooksExpanded, setEbooksExpanded] = useState(pathname.includes('/admin/ebooks') || pathname.includes('/admin/categories'));

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') return pathname === '/admin/dashboard' || pathname === '/admin';
    return pathname === path || pathname.startsWith(path + '/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { 
      label: 'eBooks', 
      icon: BookOpen,
      hasSub: true,
      subItems: [
        { label: 'All eBooks', path: '/admin/ebooks' },
        { label: 'Add eBook', path: '/admin/ebooks/add' },
        { label: 'Categories', path: '/admin/categories' },
      ]
    },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Downloads', path: '/admin/downloads', icon: Download },
    { label: 'Payments', path: '/admin/payments', icon: CreditCard },
    { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Website Content', path: '/admin/content', icon: Image },
    { label: 'Emails', path: '/admin/emails', icon: Mail },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
    { label: 'Admin Users', path: '/admin/users', icon: UserCheck },
    { label: 'Activity Log', path: '/admin/activity', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" 
        />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-surface-card border-r border-surface-border flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex-1 overflow-y-auto no-scrollbar py-5 px-4 space-y-6">
          
          {/* Header Brand */}
          <div className="flex items-center justify-between px-2 pb-4 border-b border-surface-border/60">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center shadow-glow-gold">
                <ShieldCheck className="w-5 h-5 text-background stroke-[2.5]" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-tight group-hover:text-gold transition-colors">
                  Lumina<span className="gold-gradient-text">.Admin</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-gold font-bold">
                  Management Console
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Preview Public Store Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2.5 rounded-xl bg-surface/60 border border-surface-border text-xs text-slate-300 hover:text-white hover:border-gold/40 transition-all group"
          >
            <span className="font-semibold">View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
              Store Control Center
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path || '');

              if (item.hasSub) {
                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setEbooksExpanded(!ebooksExpanded)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                        active ? 'bg-gold/15 text-gold border border-gold/30' : 'text-slate-300 hover:text-white hover:bg-surface-border/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${active ? 'text-gold' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {ebooksExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </button>

                    {ebooksExpanded && (
                      <div className="pl-9 space-y-1 border-l-2 border-surface-border/60 ml-4 py-1">
                        {item.subItems?.map((sub) => {
                          const subActive = pathname === sub.path;
                          return (
                            <Link
                              key={sub.path}
                              href={sub.path}
                              onClick={onCloseMobile}
                              className={`block p-2 rounded-lg text-xs font-medium transition-all ${
                                subActive ? 'text-gold font-bold bg-gold/10' : 'text-slate-400 hover:text-white hover:bg-surface-border/30'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  href={item.path!}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active ? 'bg-gold/15 text-gold border border-gold/30 shadow-glow-gold' : 'text-slate-300 hover:text-white hover:bg-surface-border/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-gold' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info & Logout */}
        <div className="p-4 border-t border-surface-border/60 space-y-3 bg-surface-card">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-surface/60 border border-surface-border/60">
            <img 
              src={adminUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'} 
              alt={adminUser?.name || 'Admin'} 
              className="w-8 h-8 rounded-full object-cover border border-gold/40"
            />
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-bold text-white truncate">{adminUser?.name || 'Administrator'}</span>
              <span className="text-[10px] text-gold uppercase font-bold tracking-wider">{adminUser?.role || 'Owner'}</span>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-red-950/30 text-red-400 border border-red-800/40 hover:bg-red-950/50 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>

      </aside>
    </>
  );
}
