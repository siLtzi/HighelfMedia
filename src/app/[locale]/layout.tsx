import localFont from 'next/font/local';
import { VisualEditing } from 'next-sanity/visual-editing'; 
import { draftMode } from 'next/headers'; 
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// 1. Load Local Fonts
// We use "variable" to define the CSS var name for Tailwind
const inter = localFont({
  src: '../../fonts/Inter.woff2', // Relative path to src/fonts
  variable: '--font-inter',
  display: 'swap',
});

const syne = localFont({
  src: '../../fonts/Syne.woff2',
  variable: '--font-syne',
  display: 'swap',
});

// ... Metadata export ...

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
    // 2. Inject Variables into HTML
    <html lang={locale} className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-neutral-950 text-white antialiased">

        {/* Navbar */}
        <Navbar locale={locale} />
        
        {/* Main Content */}
        {children}

        {/* Footer */}
        <Footer />
        
        {/* Sanity Visual Editing (Only shows in Admin mode) */}
        {isDraft && (
          <div className="z-50">
            <VisualEditing />
          </div>
        )}
      </body>
    </html>
  );
}