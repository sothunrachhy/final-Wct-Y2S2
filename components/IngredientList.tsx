'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface IngredientListProps {
  ingredients: string[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-serif text-xl font-bold text-slate-900">Ingredients</h3>
          <p className="text-xs text-slate-500">{ingredients.length} items needed</p>
        </div>
        {ingredients.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
            {completedCount} / {ingredients.length} prepped
          </span>
        )}
      </div>

      <ul className="space-y-3">
        {ingredients.map((ingredient, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <li
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                  : 'bg-slate-50/50 border-slate-100 hover:border-amber-300 hover:bg-amber-50/30 text-slate-800'
              }`}
            >
              <button className="mt-0.5 shrink-0 text-amber-500 focus:outline-none">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 hover:text-amber-500" />
                )}
              </button>
              <span className="text-sm font-medium leading-relaxed">{ingredient}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
