import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import AdminGuard from '@/components/AdminGuard';

export const metadata: Metadata = {
  title: 'Khmer Recipes Admin Portal',
  description: 'Management Portal for Cambodian Recipes, Categories, and User Reviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-slate-900 min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <AdminGuard>
              {children}
            </AdminGuard>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
