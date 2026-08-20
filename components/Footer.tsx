import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-serif text-2xl font-bold text-white">
                Khmer<span className="text-amber-500">Recipes</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-4">
              A modern digital showcase of traditional Cambodian culinary heritage. Dedicated to preserving authentic Khmer flavors with easy, step-by-step recipes.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-amber-400 transition-colors">All Recipes</Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-amber-400 transition-colors">Category Tags</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About Project</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              <Link href="/recipes?category=fish" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                Fish (2)
              </Link>
              <Link href="/recipes?category=beef" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                Beef (2)
              </Link>
              <Link href="/recipes?category=pork" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                Pork (2)
              </Link>
              <Link href="/recipes?category=chicken" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                Chicken (2)
              </Link>
              <Link href="/recipes?category=noodle" className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 rounded-full text-xs font-medium transition-colors">
                Noodle (1)
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} KhmerSimplyRecipes. Built by <span className="text-slate-300 font-medium">SothunRachhy</span></p>
          <p>Crafted for Cambodian Cuisine</p>
        </div>
      </div>
    </footer>
  );
}
