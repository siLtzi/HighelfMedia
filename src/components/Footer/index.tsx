import { getTranslations, getLocale } from 'next-intl/server';
import FooterContent from './Content';

export default async function Footer({ data }: { data?: any }) {
  const t = await getTranslations('Footer');
  const locale = await getLocale();

  // 1. Resolve Data from Sanity (or fallback)
  // The 'data' prop here should be the "footer" object from your homePageQuery
  const footerData = data || {}; 

  const email = footerData.email || 'hello@highelf.fi';
  const phone = footerData.phone || '';
  const location = footerData.location || 'Oulu, Finland'; // Sanity query already picked the locale string
  const ctaText = footerData.ctaText || t('ctaDefault');
  const startProjectLabel = footerData.startProject || t('buttonDefault');

  // Socials: Use Sanity data if available, else defaults
  const socials = footerData.socials?.length > 0 ? footerData.socials : [
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' }
  ];

  // 2. Prepare UI Labels (from fi.json / en.json)
  const uiLabels = {
    location: t('locationLabel'),
    time: t('timeLabel'),
    socials: t('socialsLabel'),
    menu: t('menuLabel'),
    rights: t('rights', { year: new Date().getFullYear() })
  };

  return (
    <FooterContent 
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