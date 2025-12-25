import localFont from 'next/font/local';
import { VisualEditing } from 'next-sanity/visual-editing'; 
import { draftMode } from 'next/headers'; 
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

// 1. Load Local Fonts
const inter = localFont({
  src: '../../fonts/Inter.woff2',
  variable: '--font-inter',
  display: 'swap',
});

const syne = localFont({
  src: '../../fonts/Syne.woff2',
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Highelf Media",
  description: "Cinematic Photography & Storytelling",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang={locale} className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-neutral-950 text-white antialiased">

        {/* ✅ FIXED: You MUST pass the locale here for the Navbar to know the current language */}
        <Navbar locale={locale} />
        
        {/* Main Content */}
        {children}

        {/* Footer */}
        <Footer />
        
        {/* Sanity Visual Editing */}
        {isDraft && (
          <div className="z-50">
            <VisualEditing />
          </div>
        )}
      </body>
    </html>
  );
}