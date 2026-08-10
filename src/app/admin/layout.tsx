'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/lib/auth/admin-context';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, loading } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === '/admin';

  useEffect(() => {
    if (!loading && !adminUser && !isLoginPage) {
      router.push('/admin');
    }
  }, [adminUser, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Loading Lumina Admin Security Console...
        </span>
      </div>
    );
  }

  // Render clean Login Page container without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // Guard protected admin routes
  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex text-slate-100 antialiased">
      {/* Sidebar Navigation */}
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main Admin Content View */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleMobile={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
