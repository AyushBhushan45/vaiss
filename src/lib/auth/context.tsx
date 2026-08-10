'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, role?: 'customer' | 'admin') => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-customer',
  email: 'alex@example.com',
  full_name: 'Alex Mercer',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  role: 'customer',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DEFAULT_ADMIN: UserProfile = {
  id: 'usr-admin',
  email: 'admin@luminabooks.com',
  full_name: 'Store Administrator',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  role: 'admin',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USER,
  isLoading: false,
  login: async () => {},
  logout: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Read cached demo auth session from localStorage if available
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('lumina_auth_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          setUser(DEFAULT_USER);
        }
      }
    }
  }, []);

  const login = async (email: string, role: 'customer' | 'admin' = 'customer') => {
    setIsLoading(true);
    // Simulate auth network response
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    let loggedInUser: UserProfile;
    if (email.includes('admin') || role === 'admin') {
      loggedInUser = { ...DEFAULT_ADMIN, email };
    } else {
      loggedInUser = {
        ...DEFAULT_USER,
        email,
        full_name: email.split('@')[0].replace('.', ' ')
      };
    }
    
    setUser(loggedInUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumina_auth_user', JSON.stringify(loggedInUser));
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lumina_auth_user');
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data, updated_at: new Date().toISOString() };
    setUser(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumina_auth_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
