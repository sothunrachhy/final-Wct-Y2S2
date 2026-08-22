'use client';

import { useEffect, useState } from 'react';
import { fetchApi, getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { 
  UtensilsCrossed, 
  FolderKanban, 
  MessageSquare, 
  Star, 
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  ChefHat,
  Eye,
  Edit3
} from 'lucide-react';
import Link from 'next/link';

interface AdminStats {
  totalRecipes: number;
  totalCategories: number;
  totalReviews: number;
  averageRating: number | string;
  featuredRecipes: number;
}

interface Recipe {
  id: number;
  slug: string;
  title: string;
  khmerTitle: string;
  categorySlug: string;
  categoryName?: string;
  prepTime: number;
  cookTime: number;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const { t, lang } = useLanguage();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [recipesData, categoriesData, reviewsData] = await Promise.all([
        fetchApi<Recipe[]>('/recipes').catch(() => []),
        fetchApi<any[]>('/categories').catch(() => []),
        fetchApi<any[]>('/reviews').catch(() => []),
      ]);

      const totalRecipes = recipesData.length;
      const totalCategories = categoriesData.length;
      const totalReviews = reviewsData.length;
      const featuredRecipes = recipesData.filter((r) => r.isFeatured).length;

      let averageRating = '5.0';
      if (reviewsData.length > 0) {
        const sum = reviewsData.reduce((acc, r) => acc + (r.rating || 5), 0);
        averageRating = (sum / reviewsData.length).toFixed(1);
      }

      setStats({
        totalRecipes,
        totalCategories,
        totalReviews,
        averageRating,
        featuredRecipes,
      });

      setRecipes(recipesData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const featuredList = recipes.filter((r) => r.isFeatured);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto font-roboto">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Recipes */}
        <div className="clean-card p-4 sm:p-5 rounded-3xl border border-slate-200/80 clean-card-hover font-khmer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('totalRecipes')}</span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats?.totalRecipes ?? 0}</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5 font-roboto">
              <TrendingUp className="w-3 h-3" /> {t('liveBadge')}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">{t('featuredDishes')}</span>
            <span className="text-amber-700 font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 font-roboto">
              {stats?.featuredRecipes ?? 0} {t('dishesCount')}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="clean-card p-4 sm:p-5 rounded-3xl border border-slate-200/80 clean-card-hover font-khmer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('categoriesTitle')}</span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats?.totalCategories ?? 0}</span>
            <span className="text-xs text-slate-500 font-medium">{t('collections')}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">{t('navCategories')}</span>
            <Link href="/categories" className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1">
              {t('manageLink')}
            </Link>
          </div>
        </div>

        {/* User Reviews */}
        <div className="clean-card p-4 sm:p-5 rounded-3xl border border-slate-200/80 clean-card-hover font-khmer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('reviewsTitle')}</span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats?.totalReviews ?? 0}</span>
            <span className="text-xs text-emerald-600 font-bold">{t('submitted')}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">{t('navReviews')}</span>
            <Link href="/reviews" className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1">
              {t('moderateLink')}
            </Link>
          </div>
        </div>

        {/* Avg Rating */}
        <div className="clean-card p-4 sm:p-5 rounded-3xl border border-slate-200/80 clean-card-hover font-khmer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('avgRating')}</span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-500" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats?.averageRating ?? '5.0'}</span>
            <span className="text-xs text-slate-500 font-medium font-roboto">/ 5.0</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">{t('customerScore')}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> {t('excellent')}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Khmer Recipes Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight font-khmer flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-600" />
              {t('featuredHeader')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 font-khmer">
              {t('featuredSub')}
            </p>
          </div>
          <Link href="/recipes" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 font-khmer self-start sm:self-auto">
            {t('viewAllRecipes')} ({recipes.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-xs font-khmer">...</div>
        ) : featuredList.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs font-khmer">-</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredList.map((dish) => (
              <div key={dish.id} className="clean-card rounded-3xl overflow-hidden clean-card-hover flex flex-col justify-between border border-slate-200">
                <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={getImageUrl(dish.imageUrl)}
                    alt={dish.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-amber-800 text-[11px] font-extrabold capitalize shadow-xs border border-amber-100 font-khmer">
                    {dish.categorySlug}
                  </div>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase shadow-xs font-roboto">
                    {t('featuredBadge')}
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                      {lang === 'km' && dish.khmerTitle ? dish.khmerTitle : dish.title}
                    </h3>
                    {lang === 'en' && dish.khmerTitle && (
                      <p className="font-khmer text-xs text-amber-700 font-semibold mt-1">
                        {dish.khmerTitle}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-khmer">
                    <span className="flex items-center gap-1.5 font-medium bg-amber-50 px-2.5 py-1 rounded-xl text-amber-900 border border-amber-200/60 font-roboto text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {dish.prepTime}m &bull; {dish.cookTime}m
                    </span>
                    <Link
                      href={`/recipes/${dish.id}`}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-xs"
                      title={t('btnEdit')}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Published Recipes Table */}
      <div className="clean-card rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-slate-50/50">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2 font-khmer">
              <UtensilsCrossed className="w-4 h-4 text-amber-600" />
              {t('catalogHeader')}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-khmer">{t('catalogSub')}</p>
          </div>
          <Link
            href="/recipes/new"
            className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-all self-start sm:self-auto font-khmer"
          >
            <Plus className="w-4 h-4 text-amber-400" /> {t('btnAddRecipe')}
          </Link>
        </div>


        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs font-khmer">...</div>
        ) : recipes.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-xs font-khmer">-</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100/70 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 font-khmer">
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
                {recipes.map((recipe) => (
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
                    <td className="py-3.5 px-5">
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
                      {recipe.isFeatured ? (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-extrabold shadow-xs font-roboto">
                          {t('featuredBadge')}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">{t('standardBadge')}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2 font-khmer">
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
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold transition-all shadow-xs font-roboto"
                        >
                          {t('btnEdit')}
                        </Link>
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
