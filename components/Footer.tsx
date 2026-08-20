'use client';

import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold text-white">
                Khmer<span className="text-amber-500">Recipes</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-4 font-khmer">
              {t.footerTagline}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-khmer">
              {language === 'km' ? 'ម៉ឺនុយ' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm font-khmer">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">{t.home}</Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-amber-400 transition-colors">{t.allRecipes}</Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-amber-400 transition-colors">{t.categories}</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">{t.about}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 font-khmer">
              {language === 'km' ? 'ប្រភេទម្ហូប' : 'Popular Tags'}
            </h4>
            <div className="flex flex-wrap gap-2 font-khmer">
              <Link href="/recipes?category=fish" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                {language === 'km' ? 'សាច់ត្រី' : 'Fish'} (2)
              </Link>
              <Link href="/recipes?category=beef" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                {language === 'km' ? 'សាច់គោ' : 'Beef'} (2)
              </Link>
              <Link href="/recipes?category=pork" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                {language === 'km' ? 'សាច់ជ្រូក' : 'Pork'} (2)
              </Link>
              <Link href="/recipes?category=chicken" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                {language === 'km' ? 'សាច់មាន់' : 'Chicken'} (2)
              </Link>
              <Link href="/recipes?category=noodle" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                {language === 'km' ? 'មី/គុយទាវ' : 'Noodle'} (1)
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-khmer">
          <p>© {new Date().getFullYear()} KhmerRecipes. {t.rightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}
