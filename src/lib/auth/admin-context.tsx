'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminUser } from '@/types/admin';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/admin/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setAdminUser(data.user);
          } else {
            setAdminUser(null);
          }
        } else {
          setAdminUser(null);
        }
      } catch (err) {
        setAdminUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  const loginAdmin = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();

      if (data.success && data.user) {
        setAdminUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch (err) {
      return { success: false, error: 'Network error during login' };
    }
  };

  const logoutAdmin = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    } finally {
      setAdminUser(null);
      router.push('/admin');
    }
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
