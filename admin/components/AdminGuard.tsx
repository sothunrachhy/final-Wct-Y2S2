'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  UtensilsCrossed,
  KeyRound
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
        <p className="text-sm font-semibold text-slate-500">Loading Admin Portal...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 p-4 font-roboto relative overflow-hidden">
        
        {/* Glowing Ambient Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-2xl p-8 space-y-7 relative z-10 animate-in fade-in-50 zoom-in-95 duration-300">
          
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 mx-auto transform hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                Khmer<span className="text-amber-600">Recipes</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold uppercase tracking-wide border border-amber-200">
                  Admin
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1 font-khmer">
                {lang === 'km' ? 'សូមចូលប្រើប្រាស់គណនីគ្រប់គ្រងទិន្នន័យ' : 'Sign in to access recipe control dashboard'}
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Info Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <KeyRound className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold font-khmer">
                {lang === 'km' ? 'គណនីសាកល្បង៖' : 'Demo Credentials:'}
              </p>
              <p className="mt-0.5 text-[11px] font-mono text-amber-800">
                Username: <span className="font-bold underline">admin</span> | Password: <span className="font-bold underline">admin</span>
              </p>
            </div>
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
              <span className="text-slate-400 font-medium font-khmer text-[11px]">
                {lang === 'km' ? 'សុវត្ថិភាពខ្ពស់' : 'Protected Mode'}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white font-bold text-sm shadow-lg shadow-slate-900/20 hover:from-slate-800 hover:to-amber-900 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 font-khmer mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{lang === 'km' ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'Authenticating...'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'km' ? 'ចូលប្រព័ន្ធ' : 'Sign In to Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
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
