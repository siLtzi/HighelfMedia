import { getTranslations, getLocale } from 'next-intl/server';
import FooterContent from './Content';

export default async function Footer({ data }: { data?: any }) {
  const t = await getTranslations('Footer');
  
  // 1. Get the current locale (e.g., 'fi' or 'en')
  const locale = await getLocale(); 

  // 2. Resolve Data from Sanity (or fallback)
  const footerData = data || {}; 

  const email = footerData.email || 'hello@highelf.fi';
  const phone = footerData.phone || '';
  const location = footerData.location || 'Oulu, Finland';
  const ctaText = footerData.ctaText || t('ctaDefault');
  const startProjectLabel = footerData.startProject || t('buttonDefault');

  // Socials
  const socials = footerData.socials?.length > 0 ? footerData.socials : [
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' }
  ];

  // UI Labels
  const uiLabels = {
    location: t('locationLabel'),
    time: t('timeLabel'),
    socials: t('socialsLabel'),
    menu: t('menuLabel'),
    rights: t('rights', { year: new Date().getFullYear() })
  };

  return (
    <FooterContent 
      // ✅ ADDED: Pass the locale down to the client component
      locale={locale} 
      email={email}
      phone={phone}
      location={location}
      socials={socials}
      ctaText={ctaText}
      startProjectLabel={startProjectLabel}
      uiLabels={uiLabels}
    />
  );
}