'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; name: string } | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ username: string; name: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('khmer_recipes_admin_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser({ username: 'admin', name: 'Administrator' });
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // Simulate short network delay for smooth button spinner feel
    await new Promise((res) => setTimeout(res, 500));

    const validUser = username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'rachhy';
    const validPass = password === 'admin' || password === 'admin123' || password === '123456';

    if (validUser && validPass) {
      localStorage.setItem('khmer_recipes_admin_auth', 'true');
      setIsAuthenticated(true);
      setUser({ username: username.trim(), name: 'Administrator' });
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Invalid username or password. Use username: admin, password: admin' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('khmer_recipes_admin_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
