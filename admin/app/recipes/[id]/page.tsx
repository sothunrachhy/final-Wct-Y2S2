'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import RecipeForm from '@/components/RecipeForm';

export default function EditRecipePage() {
  const params = useParams();
  const id = params.id as string;
  const { t, lang } = useLanguage();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchApi<any>(`/recipes/${id}`)
      .then((data) => {
        setRecipe(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-16 text-center text-slate-400 text-xs font-khmer">{t('loadingDetails')}</div>;
  }

  if (error || !recipe) {
    return <div className="p-16 text-center text-red-600 text-xs font-khmer">{t('failedLoadRecipe')} ({error})</div>;
  }

  return (
    <div className={`space-y-6 ${lang === 'km' ? 'font-khmer' : 'font-roboto'}`}>
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {t('formEditTitle', { id: recipe.id })}
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {t('formEditSub', { title: recipe.title })}
        </p>
      </div>

      <RecipeForm initialData={recipe} isEditing={true} />
    </div>
  );
}
