import { getTranslations, getLocale } from 'next-intl/server';
import ProfileContent from './Content';
import { urlForImage } from '@/sanity/lib/image'; // ✅ Reverted to correct import

export default async function Profile({ data }: { data?: any }) {
  const t = await getTranslations('Profile');
  const locale = await getLocale(); 

  // Helper to safely extract the localized string
  const localize = (field: any) => {
    return field?.[locale] || field?.['en'] || field || '';
  };

  // 1. Resolve Data
  // Note: We check data?.settings first (common Sanity pattern), or fall back to direct data
  const heading = localize(data?.settings?.heading || data?.heading) || t('heading');
  const name = localize(data?.settings?.name || data?.name) || t('defaultName');
  const bio = localize(data?.settings?.bio || data?.bio) || t('defaultBio');
  
  // 2. Resolve Image using the correct helper
  const imageSource = data?.settings?.image || data?.image;
  const imageUrl = imageSource 
    ? urlForImage(imageSource).url() 
    : undefined;

  // 3. Resolve Stats
  let stats = [];
  
  if (data?.stats && Array.isArray(data.stats) && data.stats.length > 0) {
    // Use Sanity Data
    stats = data.stats.map((stat: any) => ({
      value: localize(stat.value),
      label: localize(stat.label)
    }));
  } else {
    // Use JSON defaults
    stats = [
      { label: t('stats.yearsLabel'), value: "10+" },
      { label: t('stats.projectsLabel'), value: "150+" }
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