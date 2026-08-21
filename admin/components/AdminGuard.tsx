'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle,
  UtensilsCrossed
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, loading } = useAuth();
  const { lang } = useLanguage();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-reload window if browser holds stale Vercel build JS chunks
  useEffect(() => {
    const handleChunkError = (e: ErrorEvent) => {
      if (e.message && (e.message.includes('Loading chunk') || e.message.includes('Script error'))) {
        window.location.reload();
      }
    };
    window.addEventListener('error', handleChunkError);
    return () => window.removeEventListener('error', handleChunkError);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage(lang === 'km' ? 'សូមបញ្ចូលឈ្មោះអ្នកប្រើប្រាស់' : 'Please enter your username');
      return;
    }
    if (!password) {
      setErrorMessage(lang === 'km' ? 'សូមបញ្ចូលពាក្យសម្ងាត់' : 'Please enter your password');
      return;
    }

    setIsSubmitting(true);
    const result = await login(username, password);
    setIsSubmitting(false);

    if (!result.success && result.error) {
      setErrorMessage(
        lang === 'km' 
          ? 'ឈ្មោះអ្នកប្រើប្រាស់ ឬ ពាក្យសម្ងាត់ មិនត្រឹមត្រូវទេ (សាកល្បង admin/admin)' 
          : result.error
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] text-slate-600 font-khmer">
        <Loader2 className="w-10 h-10 animate-spin text-amber-600 mb-3" />
        <p className="text-sm font-semibold text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 font-roboto relative overflow-hidden">
        
        {/* Soft Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 space-y-6 relative z-10 animate-in fade-in-50 zoom-in-95 duration-200">
          
          {/* Brand Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 mx-auto">
              <UtensilsCrossed className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Khmer<span className="text-amber-600">Recipes</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1 font-khmer">
                {lang === 'km' ? 'សូមចូលប្រើប្រាស់គណនីគ្រប់គ្រងទិន្នន័យ' : 'Sign in to access admin portal'}
              </p>
            </div>
          </div>

          {/* Clean Demo Info Note */}
          <div className="px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-center text-xs text-amber-900 font-medium">
            Username: <span className="font-bold">admin</span> &bull; Password: <span className="font-bold">admin</span>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider font-khmer">
                {lang === 'km' ? 'ឈ្មោះអ្នកប្រើប្រាស់' : 'Username'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider font-khmer">
                {lang === 'km' ? 'ពាក្យសម្ងាត់' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium font-khmer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>{lang === 'km' ? 'ចងចាំខ្ញុំ' : 'Remember me'}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 font-khmer mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{lang === 'km' ? 'កំពុងចូល...' : 'Signing in...'}</span>
                </>
              ) : (
                <span>{lang === 'km' ? 'ចូលប្រព័ន្ធ' : 'Sign In'}</span>
              )}
            </button>
          </form>

          {/* Footer Copyright */}
          <div className="pt-2 text-center text-[11px] text-slate-400 font-medium font-khmer border-t border-slate-100">
            &copy; {new Date().getFullYear()} Khmer Recipes Portal &bull; All rights reserved.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
