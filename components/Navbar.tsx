'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, Menu, X, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { USFlag, CambodiaFlag } from '@/components/Flags';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/recipes', label: t.recipes },
    { href: '/tags', label: t.tags },
    { href: '/about', label: t.about },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 block leading-none">
                Khmer<span className="text-amber-600">Recipes</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase mt-1 block font-khmer">
                {language === 'km' ? 'រូបមន្តម្ហូបខ្មែរងាយៗ' : 'Simply Authentic Cuisine'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Clean Text with Bottom Colored Line Indicator */}
          <nav className="hidden md:flex items-center gap-8 font-khmer">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-base font-medium transition-all ${
                    active
                      ? 'text-amber-600 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full animate-in fade-in zoom-in-50 duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Language Switcher Dropdown & Add Recipe */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector Pill */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm transition-all focus:outline-none"
              >
                {language === 'en' ? <USFlag className="w-5 h-3.5" /> : <CambodiaFlag className="w-5 h-3.5" />}
                <span>{language === 'en' ? 'EN' : 'KM'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-left transition-colors ${
                      language === 'en' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <USFlag className="w-4 h-3" />
                      <span>EN (English)</span>
                    </div>
                    {language === 'en' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setLanguage('km');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-left font-khmer transition-colors ${
                      language === 'km' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CambodiaFlag className="w-4 h-3" />
                      <span>KM (ខ្មែរ)</span>
                    </div>
                    {language === 'km' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/recipes/new"
              className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] font-khmer"
            >
              {t.addRecipe}
            </Link>
          </div>

          {/* Mobile Menu Button & Mobile Language Selector */}
          <div className="flex md:hidden items-center gap-2">
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'km' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-800"
            >
              {language === 'en' ? <USFlag className="w-4 h-3" /> : <CambodiaFlag className="w-4 h-3" />}
              <span>{language === 'en' ? 'EN' : 'KM'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors font-khmer ${
                isActive(link.href)
                  ? 'bg-amber-50 text-amber-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-2 font-khmer">
            <Link
              href="/recipes/new"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-slate-900 text-white font-medium shadow-sm"
            >
              {t.addRecipe}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
