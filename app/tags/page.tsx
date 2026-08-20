'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Utensils } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export default function TagsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language, getCategoryName } = useLanguage();

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 font-khmer">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">
          {t.categories}
        </h1>
        <p className="text-slate-600 text-base max-w-xl mx-auto">
          {language === 'km' ? 'ជ្រើសរើសប្រភេទម្ហូបខ្មែរតាមគ្រឿងផ្សំ។' : 'Filter authentic Cambodian dishes by main ingredient or style.'}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-200 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/recipes?category=${cat.slug}`}
              className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-khmer">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                    {cat.count} {language === 'km' ? 'រូបមន្ត' : cat.count === 1 ? 'recipe' : 'recipes'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors capitalize font-khmer">
                  {getCategoryName(cat.slug, cat.name)}
                </h3>
                {cat.description && (
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 font-khmer">
                    {cat.description}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-amber-600 group-hover:text-amber-700 font-khmer">
                <span>
                  {language === 'km' ? `មើលរូបមន្ត ${getCategoryName(cat.slug, cat.name)}` : `View ${cat.name} Recipes`}
                </span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
