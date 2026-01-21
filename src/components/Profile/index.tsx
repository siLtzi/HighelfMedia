import { getTranslations } from 'next-intl/server';
import ProfileContent from './Content';

export default async function Profile({ data }: { data?: any }) {
  const t = await getTranslations('Profile');

  // Data is now pre-localized from the query
  const heading = data?.heading || t('heading');
  const name = data?.name || t('defaultName');
  const bio = data?.bio || t('defaultBio');
  const imageUrl = data?.imageUrl || undefined;

  // Stats are now pre-localized from the query
  let stats = [];
  
  if (data?.stats && Array.isArray(data.stats) && data.stats.length > 0) {
    stats = data.stats.map((stat: any) => ({
      value: stat.value || '',
      label: stat.label || ''
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