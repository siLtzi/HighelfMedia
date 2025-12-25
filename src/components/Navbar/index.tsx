import { getTranslations } from 'next-intl/server'; 
import NavbarContent from './Content';

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations('Navigation'); 
  
  // Define the dropdown structure
  const serviceLinks = [
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
    { label: t('work'), href: `/${locale}/#works` },
    { 
      label: t('services'), 
      href: `/${locale}/palvelut`,
      dropdown: serviceLinks // <--- Attach dropdown items here
    },
    { label: t('about'), href: `/${locale}/#manifesto` },
  ];

  return (
    <NavbarContent 
      locale={locale}
      links={links}
      ctaLabel={t('letsTalk')}
    />
  );
}