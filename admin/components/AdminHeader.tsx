'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Plus, ChevronDown, Check, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { CambodiaFlag, USFlag } from '@/components/Flags';

interface AdminHeaderProps {
  onToggleMobileMenu?: () => void;
}

export default function AdminHeader({ onToggleMobileMenu }: AdminHeaderProps) {
  const { lang, setLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`min-h-16 lg:h-18 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs py-2.5 sm:py-3 gap-2 ${
      lang === 'km' ? 'font-khmer' : 'font-roboto'
    }`}>
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-[150px] sm:max-w-xs md:max-w-sm lg:w-96 shrink">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className={`w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all ${
              lang === 'km' ? 'font-khmer' : 'font-roboto'
            }`}
          />
        </div>
      </div>

      {/* Actions & Language Selector */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 shrink-0">
        {/* Language Selector Pill */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 sm:gap-2.5 bg-white border border-slate-200/90 shadow-xs hover:shadow hover:bg-slate-50/80 rounded-2xl px-2.5 sm:px-4 py-1.5 sm:py-2 transition-all text-xs sm:text-sm font-bold text-slate-800 font-roboto whitespace-nowrap"
          >
            {lang === 'km' ? (
              <CambodiaFlag className="w-4.5 sm:w-5 h-3.5" />
            ) : (
              <USFlag className="w-4.5 sm:w-5 h-3.5" />
            )}
            <span className="font-extrabold text-slate-800 tracking-wider">
              {lang === 'km' ? 'KM' : 'EN'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-30 font-roboto">
              <button
                onClick={() => {
                  setLang('km');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-colors ${
                  lang === 'km' ? 'bg-amber-50 text-amber-900 font-khmer' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CambodiaFlag className="w-4 h-3" />
                  <span>KM (ភាសាខ្មែរ)</span>
                </div>
                {lang === 'km' && <Check className="w-4 h-4 text-amber-600" />}
              </button>

              <button
                onClick={() => {
                  setLang('en');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold transition-colors ${
                  lang === 'en' ? 'bg-amber-50 text-amber-900 font-roboto' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <USFlag className="w-4 h-3" />
                  <span>EN (English)</span>
                </div>
                {lang === 'en' && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Create Recipe Button */}
        <Link
          href="/recipes/new"
          className="flex items-center gap-1.5 sm:gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">{t('btnCreateRecipe')}</span>
        </Link>

        <div className="h-5 sm:h-6 w-px bg-slate-200 shrink-0 hidden sm:block" />

        {/* Admin Profile & Logout Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 font-roboto shrink-0 uppercase">
            {user?.username?.substring(0, 2) || 'AD'}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold text-slate-900 leading-none">{t('userRole')}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">{user?.username || 'admin'}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title={lang === 'km' ? 'ចាកចេញ' : 'Log out'}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

