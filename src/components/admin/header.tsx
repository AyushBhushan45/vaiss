'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Search, ShieldCheck, ExternalLink, Zap, Lock } from 'lucide-react';
import { useAdminAuth } from '@/lib/auth/admin-context';

interface HeaderProps {
  onToggleMobile: () => void;
}

export function AdminHeader({ onToggleMobile }: HeaderProps) {
  const pathname = usePathname();
  const { adminUser } = useAdminAuth();

  const getBreadcrumbTitle = () => {
    if (pathname.includes('/admin/dashboard')) return 'Store Overview & Analytics Dashboard';
    if (pathname.includes('/admin/ebooks/add')) return 'Add New eBook Publication';
    if (pathname.includes('/admin/ebooks/') && pathname.includes('/edit')) return 'Edit eBook Details';
    if (pathname.includes('/admin/ebooks')) return 'eBook Catalog & Inventory Management';
    if (pathname.includes('/admin/categories')) return 'Category Taxonomy Management';
    if (pathname.includes('/admin/orders')) return 'Customer Orders & Transactions';
    if (pathname.includes('/admin/customers')) return 'Customer Directory & Accounts';
    if (pathname.includes('/admin/downloads')) return 'Digital PDF License & Download System';
    if (pathname.includes('/admin/payments')) return 'Payment Gateway Transactions';
    if (pathname.includes('/admin/coupons')) return 'Promo Coupons & Discount Management';
    if (pathname.includes('/admin/analytics')) return 'Store Analytics & Revenue Reports';
    if (pathname.includes('/admin/content')) return 'Live Website CMS Content Manager';
    if (pathname.includes('/admin/emails')) return 'Transactional Email Templates';
    if (pathname.includes('/admin/settings')) return 'Store Settings & Gateway API Keys';
    if (pathname.includes('/admin/users')) return 'Admin Staff & Role-Based Access';
    if (pathname.includes('/admin/activity')) return 'Audit & Activity Log';
    return 'Admin Management Console';
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B1120] border-b border-surface-border px-4 sm:px-8 flex items-center justify-between shadow-md">
      
      {/* Left Title & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobile}
          className="p-2 rounded-xl bg-surface border border-surface-border text-slate-300 md:hidden hover:text-white"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-wider">
            <Lock className="w-3 h-3 text-gold" />
            <span>Secure Admin Workspace</span>
          </div>
          <h1 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
            {getBreadcrumbTitle()}
          </h1>
        </div>
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-3">
        
        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-[11px] font-semibold text-emerald-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>System Online • USD Storefront</span>
        </div>

        {/* Live Website Link */}
        <Link
          href="/"
          target="_blank"
          className="gold-button px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-glow-gold"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Open Storefront</span>
        </Link>

      </div>

    </header>
  );
}
