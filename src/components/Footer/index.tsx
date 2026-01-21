import { getTranslations, getLocale } from 'next-intl/server';
import { sanityFetch } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';
import FooterContent from './Content';

// Query to fetch footer data directly
const FOOTER_QUERY = defineQuery(`
  {
    "footer": *[_type == "footerSettings"][0] {
      email,
      phone,
      "location": location[$locale],
      "ctaText": ctaText[$locale],
      "startProject": buttonText[$locale],
      "socials": socials[] {
        label,
        url
      }
    },
    "navbar": *[_type == "navbarSettings"][0] {
      "workLabel": workLabel[$locale],
      "servicesLabel": servicesLabel[$locale],
      "aboutLabel": aboutLabel[$locale],
      "serviceLinks": serviceLinks[] {
        "label": label[$locale],
        slug
      }
    }
  }
`);

interface FooterQueryResult {
  footer?: {
    email?: string;
    phone?: string;
    location?: string;
    ctaText?: string;
    startProject?: string;
    socials?: { label: string; url: string }[];
  };
  navbar?: {
    workLabel?: string;
    servicesLabel?: string;
    aboutLabel?: string;
    serviceLinks?: { label: string; slug: string }[];
  };
}

export default async function Footer() {
  const t = await getTranslations('Footer');
  const navT = await getTranslations('Navigation');
  
  // 1. Get the current locale (e.g., 'fi' or 'en')
  const locale = await getLocale(); 

  // 2. Fetch footer and navbar data from Sanity
  const data = await sanityFetch<FooterQueryResult>({
    query: FOOTER_QUERY,
    params: { locale },
  }) || {};

  const footerData = data.footer || {};
  const navbarData = data.navbar || {};

  const email = footerData.email || 'hello@highelf.fi';
  const phone = footerData.phone || '';
  const location = footerData.location || 'Oulu, Finland';
  const ctaText = footerData.ctaText || t('ctaDefault');
  const startProjectLabel = footerData.startProject || t('buttonDefault');

  // Socials
  const socials = (footerData.socials && footerData.socials.length > 0) 
    ? footerData.socials 
    : [
        { label: 'Instagram', url: 'https://instagram.com' },
        { label: 'LinkedIn', url: 'https://linkedin.com' }
      ];

  // Navigation links for footer menu (same as navbar)
  const menuLinks = [
    { label: navbarData.workLabel || navT('work'), href: `/${locale}/#works` },
    { label: navbarData.servicesLabel || navT('services'), href: `/${locale}/palvelut` },
    { label: navbarData.aboutLabel || navT('about'), href: `/${locale}/#manifesto` },
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
      locale={locale} 
      email={email}
      phone={phone}
      location={location}
      socials={socials}
      ctaText={ctaText}
      startProjectLabel={startProjectLabel}
      uiLabels={uiLabels}
      menuLinks={menuLinks}
    />
  );
}