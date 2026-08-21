'use client';

import RecipeForm from '@/components/RecipeForm';
import { useLanguage } from '@/context/LanguageContext';

export default function NewRecipePage() {
  const { t, lang } = useLanguage();

  return (
    <div className={`space-y-6 ${lang === 'km' ? 'font-khmer' : 'font-roboto'}`}>
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('formCreateTitle')}</h1>
        <p className="text-sm text-slate-500 mt-0.5">{t('formCreateSub')}</p>
      </div>

      <RecipeForm isEditing={false} />
    </div>
  );
}
