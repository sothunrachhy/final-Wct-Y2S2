'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  FolderKanban, 
  MessageSquare, 
  ChefHat,
  ShieldCheck,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isMobileOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { t, lang } = useLanguage();

  const navItems = [
    { name: t('navDashboard'), href: '/', icon: LayoutDashboard },
    { name: t('navRecipes'), href: '/recipes', icon: UtensilsCrossed },
    { name: t('navCategories'), href: '/categories', icon: FolderKanban },
    { name: t('navReviews'), href: '/reviews', icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity animate-in fade-in"
        />
      )}

      {/* Sidebar Navigation Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col h-full shadow-xl transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:z-30 lg:shadow-sm lg:h-screen lg:sticky lg:top-0 shrink-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${lang === 'km' ? 'font-khmer' : 'font-roboto'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20 text-white shrink-0">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-xl tracking-tight leading-none font-roboto">
                <span className="text-amber-600">Khmer</span>Recipes
              </h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('portalSub')}
              </p>
            </div>
          </div>

          {/* Close button for mobile menu */}
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
          <div className="px-2 mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            {t('navMain')}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group relative flex items-center justify-between px-3 py-3 text-sm font-bold transition-all duration-200 border-b-2 ${
                  isActive
                    ? 'text-amber-600 border-amber-500 bg-amber-50/50 rounded-xl'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-slate-200 hover:bg-slate-50 rounded-xl'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 group-hover:text-slate-700'
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className={isActive ? 'font-extrabold text-amber-600' : ''}>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

