'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'km';

export const categoryTranslations: Record<string, { en: string; km: string }> = {
  beef: { en: 'Beef', km: 'សាច់គោ' },
  chicken: { en: 'Chicken', km: 'សាច់មាន់' },
  fish: { en: 'Fish', km: 'សាច់ត្រី' },
  noodle: { en: 'Noodle', km: 'មី/គុយទាវ' },
  pork: { en: 'Pork', km: 'សាច់ជ្រូក' },
};

export const dictionary = {
  en: {
    home: 'Home',
    recipes: 'Recipes',
    tags: 'Tags',
    about: 'About',
    addRecipe: 'Add Recipe',
    heroTitlePrefix: 'Cambodian',
    heroTitleSuffix: 'Simply Recipes',
    heroTagline: '"Easy, just recipes"',
    heroDesc: 'Discover traditional Khmer culinary treasures crafted with fresh herbs, kroeung pastes, and timeless techniques.',
    searchPlaceholder: 'Search recipes by name, ingredient, or Khmer name...',
    allRecipes: 'All Recipes',
    categories: 'Recipe Categories',
    featuredRecipes: 'Featured Recipes',
    showing: 'Showing',
    prep: 'Prep',
    cook: 'Cook',
    submitRecipe: 'Submit Recipe',
    haveRecipe: 'Have a custom Khmer recipe?',
    shareRecipe: 'Share your favorite family recipe with our Cambodian food community.',
    ingredients: 'Ingredients',
    instructions: 'Step-by-Step Instructions',
    reviews: 'Community Reviews',
    leaveReview: 'Leave a Review',
    yourName: 'Your Name',
    rating: 'Rating',
    yourReview: 'Your Review',
    submitReview: 'Submit Review',
    footerTagline: 'Discover, cook, and enjoy authentic Cambodian cuisine.',
    rightsReserved: 'All rights reserved.',
    createdBy: 'Created by Sothun Rachhy for ITE Coursework.',
  },
  km: {
    home: 'ទំព័រដើម',
    recipes: 'រូបមន្តម្ហូប',
    tags: 'ប្រភេទម្ហូប',
    about: 'អំពីយើង',
    addRecipe: 'បន្ថែមរូបមន្ត',
    heroTitlePrefix: 'រូបមន្តម្ហូប',
    heroTitleSuffix: 'ខ្មែរ ងាយៗ',
    heroTagline: '"ងាយស្រួល គ្រាន់តែជារូបមន្តម្ហូប"',
    heroDesc: 'ស្វែងយល់ពីរូបមន្តម្ហូបខ្មែរបុរាណ ធ្វើឡើងពីគ្រឿងផ្សំស្រស់ៗ និងវិធីធ្វើបែបប្រពៃណី។',
    searchPlaceholder: 'ស្វែងរកតាមឈ្មោះ គ្រឿងផ្សំ...',
    allRecipes: 'រូបមន្តទាំងអស់',
    categories: 'ប្រភេទម្ហូប',
    featuredRecipes: 'ម្ហូបពិសេសៗ',
    showing: 'បង្ហាញ',
    prep: 'រៀបចំ',
    cook: 'ចម្អិន',
    submitRecipe: 'បញ្ជូនរូបមន្ត',
    haveRecipe: 'មានរូបមន្តម្ហូបខ្មែរផ្ទាល់ខ្លួន?',
    shareRecipe: 'ចែករំលែករូបមន្តម្ហូបគ្រួសាររបស់អ្នកជាមួយសហគមន៍ម្ហូបខ្មែរ។',
    ingredients: 'គ្រឿងផ្សំ',
    instructions: 'របៀបធ្វើតាមជំហាន',
    reviews: 'មតិយោបល់ពីអ្នកទស្សនា',
    leaveReview: 'សរសេរមតិយោបល់',
    yourName: 'ឈ្មោះរបស់អ្នក',
    rating: 'ការវាយតម្លៃ',
    yourReview: 'មតិយោបល់របស់អ្នក',
    submitReview: 'បញ្ជូនមតិយោបល់',
    footerTagline: 'ស្វែងរក ចម្អិន និងរីករាយជាមួយម្ហូបខ្មែរដើមពិតៗ។',
    rightsReserved: 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
    createdBy: 'បង្កើតឡើងដោយ Sothun Rachhy សម្រាប់កិច្ចការសិក្សា ITE។',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof dictionary.en;
  getCategoryName: (slug: string, fallbackName?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: dictionary.en,
  getCategoryName: (slug) => slug,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('khmer_recipes_lang') as Language;
    if (saved && (saved === 'en' || saved === 'km')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('khmer_recipes_lang', lang);
  };

  const getCategoryName = (slug: string, fallbackName?: string) => {
    const key = slug.toLowerCase();
    if (categoryTranslations[key]) {
      return categoryTranslations[key][language];
    }
    return fallbackName || slug;
  };

  const t = dictionary[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCategoryName }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
