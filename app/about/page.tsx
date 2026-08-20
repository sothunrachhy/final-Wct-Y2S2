'use client';

import React from 'react';
import RecipeCard from '@/components/RecipeCard';
import { Heart, Utensils } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();

  const featuredRecipes = [
    {
      id: 3,
      slug: 'terk-kreoung-recipe',
      title: 'Teuk Kreoung (Fusion)',
      khmerTitle: 'ទឹកគ្រឿង',
      description: 'A rich and savory Cambodian crab sauce made with coconut cream, Prahok, and tamarind.',
      prepTime: 20,
      cookTime: 30,
      servings: '4-6 servings',
      categorySlug: 'fish',
      imageUrl: '/assets/recipes/terkkreng.png',
    },
    {
      id: 2,
      slug: 'beef-lok-lak-recipe',
      title: 'Beef Lok Lak',
      khmerTitle: 'ឆា ឡុកឡាក់',
      description: 'A classic Cambodian stir-fried beef dish with garlic, palm sugar, and Kampot pepper sauce.',
      prepTime: 20,
      cookTime: 25,
      servings: '6-8 servings',
      categorySlug: 'beef',
      imageUrl: '/assets/recipes/Beef_Lok_Lak_by_Chef_Nak_1.jpg',
    },
    {
      id: 1,
      slug: 'amok-recipe',
      title: 'Cambodian Fish Amok',
      khmerTitle: 'អាម៉ុកត្រី',
      description: 'Silky steamed fish curry custard with kroeung paste and coconut cream wrapped in banana leaves.',
      prepTime: 30,
      cookTime: 15,
      servings: '4-6 servings',
      categorySlug: 'fish',
      imageUrl: '/assets/recipes/Fish-Amok-Recipe.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* About Header & Bio Card */}
      <section className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Cambodian <span className="text-amber-600">Simply Recipes</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-khmer">
            {language === 'km'
              ? 'វេបសាយនេះត្រូវបានបង្កើតឡើងដើម្បីចែករំលែក និងបង្ហាញពីរូបមន្តម្ហូបខ្មែរដើមពិតៗ ជាមួយរបៀបធ្វើច្បាស់លាស់។'
              : 'This website was created to share and celebrate authentic Cambodian recipes with clear, easy-to-follow cooking guides.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/60">
              <Utensils className="w-5 h-5 text-amber-600" />
              <div>
                <span className="text-xs text-slate-500 block">Recipes Featured</span>
                <span className="font-bold text-slate-900 text-sm">9 Traditional Khmer Dishes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80">
          <img
            src="/assets/main.jpeg"
            alt="Khmer Cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <span className="text-amber-300 font-serif text-xl font-bold block drop-shadow">
              Authentic Cambodian Flavors
            </span>
            <p className="text-xs text-slate-200 drop-shadow font-khmer">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            {t.featuredRecipes}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
