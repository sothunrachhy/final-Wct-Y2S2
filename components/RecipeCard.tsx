import React from 'react';
import Link from 'next/link';
import { Clock, Users, Flame } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface Recipe {
  id: number;
  slug: string;
  title: string;
  khmerTitle?: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: string;
  categorySlug: string;
  categoryName?: string;
  imageUrl: string;
  ingredients?: string[];
  instructions?: string[];
  tools?: { name: string; url?: string }[];
  isFeatured?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { language, getCategoryName, t } = useLanguage();

  // Extract number from servings string (e.g., "4-6 servings" -> "4-6")
  const servingNumber = (recipe.servings || '4').replace(/servings|serving/gi, '').trim();

  // When language is Khmer, prioritize Khmer Title if available
  const displayTitle = (language === 'km' && recipe.khmerTitle) ? recipe.khmerTitle : recipe.title;
  const secondaryTitle = (language === 'km' && recipe.khmerTitle) ? recipe.title : recipe.khmerTitle;

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-slate-900 backdrop-blur-md shadow-sm border border-white/50 font-khmer">
            {getCategoryName(recipe.categorySlug, recipe.categorySlug)}
          </span>
        </div>

        {/* Khmer / English Secondary Title Overlay */}
        {secondaryTitle && (
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-amber-300 font-khmer text-base font-bold tracking-wide block drop-shadow">
              {secondaryTitle}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 font-khmer">
            {displayTitle}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed font-khmer">
            {recipe.description}
          </p>
        </div>

        {/* Recipe Badges Meta - Prep & Cook text kept, Servings is icon + number only */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700 gap-1 font-khmer">
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-1 rounded-lg border border-amber-200/60 shrink-0">
            <Clock className="w-3 h-3 text-amber-600 shrink-0" />
            <span>{t.prep}: {recipe.prepTime}m</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-900 px-2 py-1 rounded-lg border border-orange-200/60 shrink-0">
            <Flame className="w-3 h-3 text-orange-600 shrink-0" />
            <span>{t.cook}: {recipe.cookTime}m</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-1 rounded-lg border border-slate-200/60 shrink-0">
            <Users className="w-3 h-3 text-slate-600 shrink-0" />
            <span>{servingNumber}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
