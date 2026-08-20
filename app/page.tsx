'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RecipeCard, { Recipe } from '@/components/RecipeCard';
import { Search, ArrowRight, X, Utensils } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const HERO_IMAGES = [
  { url: '/assets/recipes/Fish-Amok-Recipe.jpg', title: 'Cambodian Fish Amok' },
  { url: '/assets/recipes/Beef_Lok_Lak_by_Chef_Nak_1.jpg', title: 'Beef Lok Lak' },
  { url: '/assets/recipes/terkkreng.png', title: 'Teuk Kreoung' },
  { url: '/assets/recipes/bysrob.png', title: 'Bai Sach Chrouk' },
  { url: '/assets/recipes/curry.png', title: 'Khmer Chicken Curry' },
];

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [heroIndex, setHeroIndex] = useState<number>(0);
  const { t, language, getCategoryName } = useLanguage();

  // Auto-slide hero background image every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const catRes = await fetch('/api/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }

      const url = selectedCategory === 'all'
        ? '/api/recipes'
        : `/api/recipes?category=${selectedCategory}`;

      const recRes = await fetch(url);
      if (recRes.ok) {
        const recData = await recRes.json();
        setRecipes(recData);
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.khmerTitle && r.khmerTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header Section with 3s 5-Image Slideshow */}
      <section className="relative overflow-hidden min-h-[440px] sm:min-h-[480px] flex items-center justify-center py-16 sm:py-20 border-b border-slate-200/80">
        
        {/* 5 Background Image Layers */}
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === heroIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            } transition-transform duration-10000`}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px]" />

        {/* Hero Content Box */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-lg font-khmer">
            {t.heroTitlePrefix} <span className="text-amber-400">{t.heroTitleSuffix}</span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-amber-200 italic drop-shadow font-khmer">
            {t.heroTagline}
          </p>

          <p className="text-slate-200 max-w-xl mx-auto text-base sm:text-lg leading-relaxed drop-shadow font-khmer">
            {t.heroDesc}
          </p>

          {/* Animated Interactive Search Input Box */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center group">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-amber-500 group-focus-within:scale-110 transition-all duration-300 absolute left-4 pointer-events-none z-10" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/40 text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-400 focus:scale-[1.01] transition-all duration-300 text-base placeholder:text-slate-400 font-khmer"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-500 transition-all duration-200 animate-in fade-in zoom-in-75"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="pt-4 flex items-center justify-center gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === heroIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar / Category Filter Container */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 font-khmer">
              <div className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-khmer">
                {t.categories}
              </div>

              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
                    selectedCategory === 'all'
                      ? 'text-amber-600 font-bold bg-amber-50/80 border-l-4 border-amber-500 pl-3.5'
                      : 'text-slate-700 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <span>{t.allRecipes}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    selectedCategory === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {recipes.length}
                  </span>
                </button>

                {categories.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
                        active
                          ? 'text-amber-600 font-bold bg-amber-50/80 border-l-4 border-amber-500 pl-3.5'
                          : 'text-slate-700 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <span className="capitalize">{getCategoryName(cat.slug, cat.name)}</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        active ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Redesigned Clean Warm Quick Banner */}
            <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-amber-100/40 rounded-3xl p-6 border border-amber-200/80 shadow-sm space-y-4 font-khmer">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-slate-900">{t.haveRecipe}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.shareRecipe}
                </p>
              </div>
              <Link
                href="/recipes/new"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all w-full justify-center shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.submitRecipe}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </aside>

          {/* Recipes Listing Catalog Grid */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between font-khmer">
              <h2 className="font-serif text-2xl font-bold text-slate-900 capitalize">
                {selectedCategory === 'all'
                  ? t.featuredRecipes
                  : `${getCategoryName(selectedCategory)} ${language === 'km' ? 'រូបមន្ត' : 'Recipes'}`}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {t.showing} {filteredRecipes.length}
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4 font-khmer animate-in fade-in duration-300">
                <h3 className="font-serif text-xl font-bold text-slate-800">
                  {language === 'km' ? 'មិនមានរូបមន្តម្ហូបទេ' : 'No recipes found'}
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  {language === 'km' ? 'សូមស្វែងរកពាក្យផ្សេងទៀត' : 'Try searching for another keyword or change your category filter.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-amber-400"
                >
                  {language === 'km' ? 'កំណត់ឡើងវិញ' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </main>

        </div>
      </section>
    </div>
  );
}
