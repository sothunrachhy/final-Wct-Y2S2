'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Plus, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CambodiaFlag, USFlag } from '@/components/Flags';

export default function AdminHeader() {
  const { lang, setLang, t } = useLanguage();
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
    <header className={`h-18 border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm py-3 ${
      lang === 'km' ? 'font-khmer' : 'font-roboto'
    }`}>
      {/* Global Search Bar */}
      <div className="relative w-80 lg:w-96 shrink">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className={`w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all ${
            lang === 'km' ? 'font-khmer' : 'font-roboto'
          }`}
        />
      </div>

      {/* Actions & Language Selector */}
      <div className="flex items-center gap-4 lg:gap-5 shrink-0">
        {/* Language Selector Pill */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 bg-white border border-slate-200/90 shadow-sm hover:shadow hover:bg-slate-50/80 rounded-2xl px-4 py-2 transition-all text-sm font-bold text-slate-800 font-roboto whitespace-nowrap"
          >
            {lang === 'km' ? (
              <CambodiaFlag className="w-5 h-3.5" />
            ) : (
              <USFlag className="w-5 h-3.5" />
            )}
            <span className="font-extrabold text-slate-800 tracking-wider">
              {lang === 'km' ? 'KM' : 'EN'}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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

        {/* Create Recipe Button (Fixed padding & whitespace-nowrap) */}
        <Link
          href="/recipes/new"
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-5 py-2.5 rounded-2xl shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="whitespace-nowrap">{t('btnCreateRecipe')}</span>
        </Link>

        <div className="h-6 w-px bg-slate-200 shrink-0" />

        {/* Admin Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-amber-500/20 font-roboto shrink-0">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold text-slate-900 leading-none">{t('userRole')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
