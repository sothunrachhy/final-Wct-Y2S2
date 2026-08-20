import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Khmer Recipes | Authentic Cambodian Simply Recipes',
  description: 'Explore authentic Cambodian recipes including Fish Amok, Beef Lok Lak, Bai Sach Chrouk, Khmer Curry, and Kola Noodles.',
  keywords: ['Khmer Recipes', 'Cambodian Food', 'Fish Amok', 'Beef Lok Lak'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
