'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Plus, Trash2, Utensils, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [khmerTitle, setKhmerTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categorySlug, setCategorySlug] = useState('fish');
  const [prepTime, setPrepTime] = useState('20');
  const [cookTime, setCookTime] = useState('25');
  const [servings, setServings] = useState('4 servings');
  const [imageUrl, setImageUrl] = useState('/assets/recipes/recipe-1.jpeg');

  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (idx: number) =>
    setIngredients(ingredients.filter((_, i) => i !== idx));

  const addInstruction = () => setInstructions([...instructions, '']);
  const removeInstruction = (idx: number) =>
    setInstructions(instructions.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanIngredients = ingredients.filter((i) => i.trim() !== '');
    const cleanInstructions = instructions.filter((i) => i.trim() !== '');

    if (!title.trim() || !description.trim() || cleanIngredients.length === 0 || cleanInstructions.length === 0) {
      setErrorMsg('Please fill in all required fields (title, description, ingredients, instructions).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          khmerTitle,
          description,
          prepTime,
          cookTime,
          servings,
          categorySlug,
          imageUrl,
          ingredients: cleanIngredients,
          instructions: cleanInstructions,
        }),
      });

      if (res.ok) {
        const newRecipe = await res.json();
        router.push(`/recipes/${newRecipe.slug}`);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to submit recipe.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred while submitting your recipe.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/recipes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Recipes</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Utensils className="w-4 h-4 inline" />
            <span>Community Recipe Submission</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">Submit a New Recipe</h1>
          <p className="text-slate-600 text-sm mt-1">
            Share a traditional Khmer recipe with food lovers everywhere.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Somlor Korko"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Khmer Title (Optional)
              </label>
              <input
                type="text"
                value={khmerTitle}
                onChange={(e) => setKhmerTitle(e.target.value)}
                placeholder="e.g. សម្លកកូរ"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-khmer focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief summary of flavor profile and story..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="fish">Fish</option>
                <option value="beef">Beef</option>
                <option value="pork">Pork</option>
                <option value="chicken">Chicken</option>
                <option value="noodle">Noodle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Prep Time (min)
              </label>
              <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Cook Time (min)
              </label>
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Servings
              </label>
              <input
                type="text"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Image URL / Path
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none"
            />
          </div>

          {/* Dynamic Ingredients List */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Ingredients List *
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Ingredient ${idx + 1}...`}
                  value={ing}
                  onChange={(e) => {
                    const newArr = [...ingredients];
                    newArr[idx] = e.target.value;
                    setIngredients(newArr);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    className="p-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Dynamic Steps List */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Cooking Instructions *
              </label>
              <button
                type="button"
                onClick={addInstruction}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Step
              </button>
            </div>

            {instructions.map((inst, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 w-6 text-right">
                  {idx + 1}.
                </span>
                <input
                  type="text"
                  placeholder={`Step ${idx + 1} description...`}
                  value={inst}
                  onChange={(e) => {
                    const newArr = [...instructions];
                    newArr[idx] = e.target.value;
                    setInstructions(newArr);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none"
                />
                {instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(idx)}
                    className="p-2 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-base"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Recipe'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
