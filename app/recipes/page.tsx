'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import RecipeCard, { Recipe } from '@/components/RecipeCard';
import { Search, Utensils, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function RecipesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { t, language, getCategoryName } = useLanguage();

  // Sync activeCategory with URL search parameters on mount and changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl.toLowerCase());
    } else {
      setActiveCategory('all');
    }
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (catSlug: string) => {
    setActiveCategory(catSlug);
    if (catSlug === 'all') {
      router.push('/recipes');
    } else {
      router.push(`/recipes?category=${catSlug}`);
    }
  };

  const categories = ['all', 'fish', 'beef', 'pork', 'chicken', 'noodle'];

  const filtered = recipes.filter((r) => {
    const matchesCategory =
      activeCategory === 'all' || r.categorySlug.toLowerCase() === activeCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      (r.khmerTitle && r.khmerTitle.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 font-khmer">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">
          {language === 'km' ? 'រូបមន្តម្ហូបខ្មែរទាំងអស់' : 'All Cambodian Recipes'}
        </h1>
        <p className="text-slate-600 text-base max-w-xl mx-auto">
          {language === 'km' ? 'ស្វែងរក និងមើលរូបមន្តម្ហូបខ្មែរប្រពៃណីទាំងអស់។' : 'Explore our complete collection of traditional Khmer recipes.'}
        </p>
      </div>

      {/* Filter and Animated Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input with Focus Glow & Icon Scaling */}
          <div className="relative w-full sm:w-80 group">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-amber-500 group-focus-within:scale-110 transition-all duration-300 absolute left-3.5 top-3.5 pointer-events-none z-10" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 focus:scale-[1.01] transition-all duration-300 font-khmer"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 p-1 rounded-full bg-slate-200 hover:bg-amber-100 hover:text-amber-800 text-slate-600 transition-all duration-200 animate-in fade-in zoom-in-75"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 font-khmer">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-sm scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? t.allRecipes : getCategoryName(cat, cat)}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Recipes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4 font-khmer animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Utensils className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-800">
            {language === 'km' ? 'មិនមានរូបមន្តម្ហូបទេ' : 'No matching recipes found'}
          </h3>
          <p className="text-slate-500 text-sm">
            {language === 'km' ? 'សូមស្វែងរកពាក្យផ្សេងទៀត ឬជ្រើសរើសប្រភេទផ្សេង។' : 'Try relaxing your search query or selecting another tag.'}
          </p>
          <button
            onClick={() => handleCategorySelect('all')}
            className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-amber-400"
          >
            {language === 'km' ? 'បង្ហាញទាំងអស់' : 'Reset Category'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading recipes...</div>}>
      <RecipesContent />
    </Suspense>
  );
}
