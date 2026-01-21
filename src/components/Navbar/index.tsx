import { getTranslations } from 'next-intl/server'; 
import { sanityFetch } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';
import NavbarContent from './Content';

// Query to fetch navbar data from Sanity
const NAVBAR_QUERY = defineQuery(`
  *[_type == "navbarSettings"][0] {
    "workLabel": workLabel[$locale],
    "servicesLabel": servicesLabel[$locale],
    "aboutLabel": aboutLabel[$locale],
    "ctaLabel": ctaLabel[$locale],
    "serviceLinks": serviceLinks[] {
      "label": label[$locale],
      slug
    }
  }
`);

interface NavbarData {
  workLabel?: string;
  servicesLabel?: string;
  aboutLabel?: string;
  ctaLabel?: string;
  serviceLinks?: { label: string; slug: string }[];
}

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations('Navigation'); 

  // Fetch navbar data from Sanity
  const navbarData = await sanityFetch<NavbarData>({
    query: NAVBAR_QUERY,
    params: { locale },
  }) || {};
  
  // Build service links from Sanity or fallback to defaults
  const serviceLinks = (navbarData.serviceLinks && navbarData.serviceLinks.length > 0)
    ? navbarData.serviceLinks.map(link => ({
        label: link.label || '',
        href: `/${locale}/palvelut/${link.slug}`
      }))
    : [
        { label: t('serviceList.business'), href: `/${locale}/palvelut/yrityskuvaus` },
        { label: t('serviceList.wedding'), href: `/${locale}/palvelut/haakuvaus` },
        { label: t('serviceList.portrait'), href: `/${locale}/palvelut/muotokuvaus` },
        { label: t('serviceList.family'), href: `/${locale}/palvelut/lapsi-ja-perhekuvaus` },
        { label: t('serviceList.graduation'), href: `/${locale}/palvelut/rippi-ja-valmistujaiskuvaus` },
        { label: t('serviceList.realestate'), href: `/${locale}/palvelut/asuntokuvaus` },
        { label: t('serviceList.funeral'), href: `/${locale}/palvelut/hautajaiskuvaus` },
        { label: t('serviceList.pet'), href: `/${locale}/palvelut/elainkuvaus` },
      ];

  const links = [
    { label: navbarData.workLabel || t('work'), href: `/${locale}/#works` },
    { 
      label: navbarData.servicesLabel || t('services'), 
      href: `/${locale}/palvelut`,
      dropdown: serviceLinks
    },
    { label: navbarData.aboutLabel || t('about'), href: `/${locale}/#manifesto` },
  ];

  const ctaLabel = navbarData.ctaLabel || t('letsTalk');

  return (
    <NavbarContent 
      locale={locale}
      links={links}
      ctaLabel={ctaLabel}
    />
  );
}