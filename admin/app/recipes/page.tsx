'use client';

import { useEffect, useState } from 'react';
import { fetchApi, getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Plus, Search, Trash2, Edit3, Star, Filter, RefreshCw, Eye } from 'lucide-react';

interface Recipe {
  id: number;
  slug: string;
  title: string;
  khmerTitle: string;
  categorySlug: string;
  categoryName?: string;
  prepTime: number;
  cookTime: number;
  servings: string;
  imageUrl: string;
  isFeatured: boolean;
}

export default function AdminRecipesPage() {
  const { t, lang } = useLanguage();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const data = await fetchApi<Recipe[]>('/recipes');
      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(t('confirmDeleteRecipe', { title }))) return;

    setDeletingId(id);
    try {
      await fetchApi(`/recipes/${id}`, { method: 'DELETE' });
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(`Failed to delete recipe: ${(err as Error).message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleFeatured = async (recipe: Recipe) => {
    try {
      const updated = await fetchApi<Recipe>(`/recipes/${recipe.id}`, {
        method: 'PUT',
        body: JSON.stringify({ isFeatured: !recipe.isFeatured }),
      });
      setRecipes((prev) =>
        prev.map((r) => (r.id === recipe.id ? { ...r, isFeatured: updated.isFeatured } : r))
      );
    } catch (err) {
      alert(`Failed to update featured status: ${(err as Error).message}`);
    }
  };

  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.khmerTitle && r.khmerTitle.toLowerCase().includes(search.toLowerCase())) ||
      r.slug.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || r.categorySlug.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(recipes.map((r) => r.categorySlug))).filter(Boolean);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-khmer">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('recipesCatalogTitle')}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {t('recipesCatalogSub')}
          </p>
        </div>

        <Link
          href="/recipes/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" /> {t('btnAddNewRecipe')}
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="clean-card p-4 rounded-3xl flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchRecipes')}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" /> {t('thCategory')}:
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 capitalize"
          >
            <option value="all">{t('filterAll')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={loadRecipes}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors border border-slate-200"
            title={t('btnRefresh')}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Recipes Data Table */}
      <div className="clean-card rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs">...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-xs">-</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">{t('thIdImage')}</th>
                  <th className="py-3.5 px-5">{t('thTitle')}</th>
                  <th className="py-3.5 px-5">{t('thKhmerTitle')}</th>
                  <th className="py-3.5 px-5">{t('thCategory')}</th>
                  <th className="py-3.5 px-5">{t('thTime')}</th>
                  <th className="py-3.5 px-5 text-center">{t('thStatus')}</th>
                  <th className="py-3.5 px-5 text-right">{t('thActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecipes.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-amber-50/30 transition-colors group">
                    <td className="py-3.5 px-5 flex items-center gap-3">
                      <img
                        src={getImageUrl(recipe.imageUrl)}
                        alt={recipe.title}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop';
                        }}
                      />
                    </td>
                    <td className="py-3.5 px-5 font-roboto">
                      <p className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{recipe.title}</p>
                    </td>
                    <td className="py-3.5 px-5 font-khmer text-slate-800 font-semibold">{recipe.khmerTitle || '-'}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 font-bold capitalize text-[11px] border border-amber-200/60 font-khmer">
                        {recipe.categorySlug}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-medium font-roboto">
                      {recipe.prepTime}m &bull; {recipe.cookTime}m
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <button
                        onClick={() => toggleFeatured(recipe)}
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold border transition-all inline-flex items-center gap-1 font-roboto ${
                          recipe.isFeatured
                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${recipe.isFeatured ? 'fill-white' : ''}`} />
                        {recipe.isFeatured ? t('featuredBadge') : t('standardBadge')}
                      </button>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`http://localhost:3000/recipes/${recipe.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                          title={t('btnView')}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/recipes/${recipe.id}`}
                          className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors font-roboto"
                          title={t('btnEdit')}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(recipe.id, recipe.title)}
                          disabled={deletingId === recipe.id}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl transition-colors font-roboto"
                          title={t('btnDelete')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
