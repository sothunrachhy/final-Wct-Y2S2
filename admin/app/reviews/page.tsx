'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { MessageSquare, Star, Trash2, RefreshCw } from 'lucide-react';

interface Review {
  id: number;
  recipeId: number;
  recipeTitle?: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const { t, lang } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await fetchApi<Review[]>('/reviews');
      setReviews(data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(t('confirmDeleteReview'))) return;

    setDeletingId(id);
    try {
      await fetchApi(`/reviews/${id}`, { method: 'DELETE' });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(`Failed to delete review: ${(err as Error).message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={`space-y-6 max-w-7xl mx-auto ${lang === 'km' ? 'font-khmer' : 'font-roboto'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('revManagerTitle')}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {t('revManagerSub')}
          </p>
        </div>

        <button
          onClick={loadReviews}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors border border-slate-200"
          title={t('btnRefresh')}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Review List */}
      <div className="clean-card rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="font-extrabold text-slate-900 text-base">
            {t('submittedFeedbackHeader')} ({reviews.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs">{t('loadingReviews')}</div>
        ) : reviews.length === 0 ? (
          <div className="p-16 text-center text-slate-400 text-xs">{t('noReviewsYet')}</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-6 flex items-start justify-between gap-4 hover:bg-amber-50/30 transition-colors">
                <div className="space-y-2 max-w-3xl">
                  {/* Author & Rating */}
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-slate-900 text-sm">{rev.author}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-500' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Recipe tag */}
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 font-sans">
                    <span>{t('recipeTag')}</span>
                    <span className="font-extrabold text-amber-700">{rev.recipeTitle || `Recipe #${rev.recipeId}`}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                    "{rev.comment}"
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(rev.id)}
                  disabled={deletingId === rev.id}
                  className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors border border-transparent hover:border-red-200 shrink-0"
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
  );
}
