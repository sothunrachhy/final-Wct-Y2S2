'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { FolderKanban, Plus, Trash2, RefreshCw, FolderPlus } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count?: number;
}

export default function AdminCategoriesPage() {
  const { t, lang } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchApi<Category[]>('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setCreating(true);
    try {
      const created = await fetchApi<Category>('/categories', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      setCategories((prev) => [...prev, created]);
      setName('');
      setDescription('');
    } catch (err) {
      alert(`Failed to create category: ${(err as Error).message}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: number, catName: string) => {
    if (!confirm(t('confirmDeleteCat', { name: catName }))) return;

    setDeletingId(id);
    try {
      await fetchApi(`/categories/${id}`, { method: 'DELETE' });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(`Failed to delete category: ${(err as Error).message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={`space-y-8 max-w-7xl mx-auto ${lang === 'km' ? 'font-khmer' : 'font-roboto'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('catManagerTitle')}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {t('catManagerSub')}
          </p>
        </div>
        <button
          onClick={loadCategories}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors border border-slate-200"
          title={t('btnRefresh')}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="clean-card p-6 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-xs h-fit">
          <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-amber-600" /> {t('createCategoryHeader')}
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('catNameLabel')}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('catNamePlaceholder')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('catDescLabel')}</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('catDescPlaceholder')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={creating || !name.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-sm transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4 text-amber-400" /> {creating ? t('btnCreatingCategory') : t('btnSaveCategory')}
            </button>
          </form>
        </div>

        {/* Category List */}
        <div className="lg:col-span-2 clean-card rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-extrabold text-slate-900 text-base">
              {t('existingCategoriesHeader')} ({categories.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-16 text-center text-slate-400 text-xs">{t('loadingCategories')}</div>
          ) : categories.length === 0 ? (
            <div className="p-16 text-center text-slate-400 text-xs">{t('noCategoriesYet')}</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <div key={cat.id} className="p-5 flex items-center justify-between hover:bg-amber-50/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-extrabold text-slate-900 text-sm capitalize">{cat.name}</h4>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200/60 capitalize">
                        {cat.slug}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{cat.description || '-'}</p>
                    <p className="text-[11px] text-amber-700 font-bold pt-1">
                      {cat.count ?? 0} {t('recipesInCat')}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    disabled={deletingId === cat.id}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors border border-transparent hover:border-red-200"
                    title={t('btnDelete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
