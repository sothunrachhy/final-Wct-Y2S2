'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi, getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Trash2, ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface RecipeFormData {
  title: string;
  khmerTitle: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: string;
  categorySlug: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  tools: string[];
  isFeatured: boolean;
}

interface RecipeFormProps {
  initialData?: RecipeFormData & { id?: number };
  isEditing?: boolean;
}

export default function RecipeForm({ initialData, isEditing = false }: RecipeFormProps) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<RecipeFormData>({
    title: initialData?.title || '',
    khmerTitle: initialData?.khmerTitle || '',
    description: initialData?.description || '',
    prepTime: initialData?.prepTime || 15,
    cookTime: initialData?.cookTime || 20,
    servings: initialData?.servings || '4 servings',
    categorySlug: initialData?.categorySlug || 'fish',
    imageUrl: initialData?.imageUrl || '',
    ingredients: initialData?.ingredients?.length ? initialData.ingredients : [''],
    instructions: initialData?.instructions?.length ? initialData.instructions : [''],
    tools: initialData?.tools || [],
    isFeatured: initialData?.isFeatured || false,
  });

  useEffect(() => {
    fetchApi<Category[]>('/categories')
      .then((data) => {
        setCategories(data);
        if (!initialData && data.length > 0) {
          setForm((prev) => ({ ...prev, categorySlug: data[0].slug }));
        }
      })
      .catch((err) => console.error('Failed to load categories:', err));
  }, [initialData]);

  const handleIngredientChange = (index: number, value: string) => {
    const next = [...form.ingredients];
    next[index] = value;
    setForm({ ...form, ingredients: next });
  };
  const addIngredient = () => setForm({ ...form, ingredients: [...form.ingredients, ''] });
  const removeIngredient = (index: number) => {
    setForm({ ...form, ingredients: form.ingredients.filter((_, i) => i !== index) });
  };

  const handleInstructionChange = (index: number, value: string) => {
    const next = [...form.instructions];
    next[index] = value;
    setForm({ ...form, instructions: next });
  };
  const addInstruction = () => setForm({ ...form, instructions: [...form.instructions, ''] });
  const removeInstruction = (index: number) => {
    setForm({ ...form, instructions: form.instructions.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.imageUrl) {
      alert(t('fillRequiredAlert'));
      return;
    }

    setSaving(true);
    try {
      const endpoint = isEditing && initialData?.id ? `/recipes/${initialData.id}` : '/recipes';
      const method = isEditing ? 'PUT' : 'POST';

      const payload = {
        ...form,
        ingredients: form.ingredients.filter((item) => item.trim() !== ''),
        instructions: form.instructions.filter((item) => item.trim() !== ''),
      };

      await fetchApi(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      router.push('/recipes');
      router.refresh();
    } catch (err) {
      alert(`Error saving recipe: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-8 max-w-5xl mx-auto pb-12 ${
      lang === 'km' ? 'font-khmer' : 'font-roboto'
    }`}>
      {/* Top Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t('formBack')}
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all"
        >
          <Save className="w-4 h-4 text-amber-400" />
          {saving ? t('formSavingBtn') : isEditing ? t('formUpdateBtn') : t('formPublishBtn')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
          <div className="clean-card p-6 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-xs">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              {t('basicInfoSection')}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('titleLabel')}</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={t('titlePlaceholder')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('khmerTitleLabel')}</label>
                <input
                  type="text"
                  value={form.khmerTitle}
                  onChange={(e) => setForm({ ...form, khmerTitle: e.target.value })}
                  placeholder={t('khmerTitlePlaceholder')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-khmer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('descLabel')}</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={t('descPlaceholder')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Ingredients Manager */}
          <div className="clean-card p-6 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900">{t('ingredientsSection')}</h2>
              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100/80 text-amber-900 hover:bg-amber-100 text-xs font-bold rounded-xl border border-amber-200"
              >
                <Plus className="w-3.5 h-3.5" /> {t('btnAddIngredient')}
              </button>
            </div>

            <div className="space-y-2.5">
              {form.ingredients.map((ingredient, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 font-mono w-5 text-right">{idx + 1}.</span>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(idx, e.target.value)}
                    placeholder={t('ingredientPlaceholder')}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  {form.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(idx)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Steps */}
          <div className="clean-card p-6 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900">{t('stepsSection')}</h2>
              <button
                type="button"
                onClick={addInstruction}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100/80 text-amber-900 hover:bg-amber-100 text-xs font-bold rounded-xl border border-amber-200"
              >
                <Plus className="w-3.5 h-3.5" /> {t('btnAddStep')}
              </button>
            </div>

            <div className="space-y-3">
              {form.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-xs font-extrabold text-white bg-slate-900 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-xs font-mono">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={step}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    placeholder={t('stepPlaceholder')}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  {form.instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstruction(idx)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-xl transition-colors mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="space-y-6">
          {/* Metadata */}
          <div className="clean-card p-6 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-xs">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              {t('metaSection')}
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('catSelectLabel')}</label>
              <select
                value={form.categorySlug}
                onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 capitalize"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug} className="capitalize">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('prepTimeLabel')}</label>
                <input
                  type="number"
                  min={0}
                  value={form.prepTime}
                  onChange={(e) => setForm({ ...form, prepTime: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('cookTimeLabel')}</label>
                <input
                  type="number"
                  min={0}
                  value={form.cookTime}
                  onChange={(e) => setForm({ ...form, cookTime: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('servingsLabel')}</label>
              <input
                type="text"
                value={form.servings}
                onChange={(e) => setForm({ ...form, servings: e.target.value })}
                placeholder={t('servingsPlaceholder')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{t('featuredLabel')}</p>
                <p className="text-[10px] text-slate-500">{t('featuredSubLabel')}</p>
              </div>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-5 h-5 accent-amber-500 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Cover Photo & Resolved Preview */}
          <div className="clean-card p-6 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-xs">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-600" /> {t('coverImageSection')}
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('imageUrlLabel')}</label>
              <input
                type="text"
                required
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder={t('imageUrlPlaceholder')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Resolved Preview Box */}
            <div className="w-full h-48 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center shadow-inner">
              <img
                src={getImageUrl(form.imageUrl)}
                alt="Recipe Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
