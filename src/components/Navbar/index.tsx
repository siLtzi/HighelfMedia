import { getTranslations } from 'next-intl/server'; // <--- 1. Change Import
import NavbarContent from './Content';

// 2. Make function ASYNC
export default async function Navbar({ locale }: { locale: string }) {
  // 3. Use await getTranslations
  const t = await getTranslations('Navigation'); 
  
  const links = [
    { label: t('work'), href: '#works' },
    { label: t('services'), href: '#services' },
    { label: t('about'), href: '#manifesto' },
  ];

  return (
    <NavbarContent 
      locale={locale}
      links={links}
      ctaLabel={t('letsTalk')}
    />
  );
}