import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Flame, Users, Tag, ExternalLink, ArrowLeft, Utensils } from 'lucide-react';
import IngredientList from '@/components/IngredientList';
import InstructionSteps from '@/components/InstructionSteps';
import ReviewSection, { Review } from '@/components/ReviewSection';

interface RecipeDetail {
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
  ingredients: string[];
  instructions: string[];
  tools?: { name: string; url?: string }[];
  reviews?: Review[];
}

async function getRecipe(slug: string): Promise<RecipeDetail | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/recipes/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching recipe slug:', error);
    return null;
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipe(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="pb-24 space-y-12">
      {/* Back Button & Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Recipes</span>
        </Link>
      </div>

      {/* Recipe Hero Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-2">
          
          {/* Hero Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto w-full bg-slate-900">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Link
                href={`/recipes?category=${recipe.categorySlug}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-slate-900 backdrop-blur-md shadow-sm border border-white/50 hover:bg-amber-500 hover:text-slate-950 transition-colors"
              >
                {recipe.categorySlug}
              </Link>
            </div>
          </div>

          {/* Hero Details */}
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {recipe.khmerTitle && (
                <span className="font-khmer text-xl font-bold text-amber-600 tracking-wide block">
                  {recipe.khmerTitle}
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {recipe.title}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {recipe.description}
              </p>
            </div>

            {/* Badges Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100/80 text-center">
                <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block">
                  Prep Time
                </span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {recipe.prepTime} min.
                </span>
              </div>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100/80 text-center">
                <Flame className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block">
                  Cook Time
                </span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {recipe.cookTime} min.
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
                <Users className="w-5 h-5 text-slate-600 mx-auto mb-1" />
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block">
                  Serving
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {recipe.servings}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Recipe Content (Ingredients, Instructions, Tools & Reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Instructions & Community Reviews */}
          <div className="lg:col-span-2 space-y-8">
            <InstructionSteps instructions={recipe.instructions || []} />
            
            <ReviewSection recipeId={recipe.id} initialReviews={recipe.reviews || []} />
          </div>

          {/* Right Column: Ingredients Checklist & Kitchen Tools */}
          <div className="space-y-8">
            <IngredientList ingredients={recipe.ingredients || []} />

            {/* Kitchen Tools Card */}
            {recipe.tools && recipe.tools.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Recommended Tools</h3>
                </div>
                <div className="space-y-2">
                  {recipe.tools.map((tool, i) => (
                    <a
                      key={i}
                      href={tool.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-100 text-sm font-medium text-slate-800 transition-colors group"
                    >
                      <span>{tool.name}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
