'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface InstructionStepsProps {
  instructions: string[];
}

export default function InstructionSteps({ instructions }: InstructionStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({});

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="font-serif text-xl font-bold text-slate-900">Step-by-Step Instructions</h3>
        <p className="text-xs text-slate-500">Follow the steps below to craft authentic flavors</p>
      </div>

      <div className="space-y-6">
        {instructions.map((step, idx) => {
          const isDone = !!completedSteps[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleStep(idx)}
              className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-200 opacity-75'
                  : 'bg-white border-slate-200/80 hover:border-amber-400 hover:shadow-md'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold transition-colors ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-900 text-amber-400 group-hover:bg-amber-500 group-hover:text-white'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 block mb-1">
                  Step {idx + 1}
                </span>
                <p className={`text-slate-800 text-sm sm:text-base leading-relaxed ${isDone ? 'line-through text-slate-500' : ''}`}>
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
