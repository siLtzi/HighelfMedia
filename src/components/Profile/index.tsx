import { getTranslations, getLocale } from 'next-intl/server';
import ProfileContent from './Content';
import { urlForImage } from '@/sanity/lib/image'; // Assuming you have this helper

export default async function Profile({ data }: { data?: any }) {
  const t = await getTranslations('Profile');
  const locale = await getLocale(); // Get current locale (e.g., 'en' or 'fi')

  // Helper to safely extract the localized string or fallback to English
  const localize = (field: any) => {
    return field?.[locale] || field?.['en'] || '';
  };

  // 1. Resolve Data: Try Sanity first, then fallback to translation files
  const heading = localize(data?.heading) || t('heading');
  const name = localize(data?.name) || t('name');
  const bio = localize(data?.bio) || t('bio');
  
  // 2. Resolve Image
  const imageUrl = data?.image ? urlForImage(data.image).url() : undefined;

  // 3. Resolve Stats
  let stats = [];
  
  if (data?.stats && Array.isArray(data.stats)) {
    // Map Sanity stats to UI format
    stats = data.stats.map((stat: any) => ({
      value: localize(stat.value),
      label: localize(stat.label)
    }));
  } else {
    // Fallback to JSON translations
    stats = [
      { label: t('stats.0.label'), value: t('stats.0.value') },
      { label: t('stats.1.label'), value: t('stats.1.value') }
    ];
  }

  return (
    <ProfileContent 
      heading={heading}
      name={name}
      bio={bio}
      stats={stats}
      imageUrl={imageUrl}
    />
  );
}