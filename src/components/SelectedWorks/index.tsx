import { getTranslations, getLocale } from 'next-intl/server'; // 1. Use Server versions
import SelectedWorksContent from './Content';

interface SanityProject {
  title: string;
  category: string;
  slug: string;
  imageUrl: string;
  imageAlt?: string;
}

interface SelectedWorksProps {
  data: {
    settings: {
      title: string;
      subtitle: string;
    } | null; 
    list: SanityProject[];
  } | null;
}

// 2. Make function Async
export default async function SelectedWorks({ data }: SelectedWorksProps) {
  // 3. Fetch data on the server
  const t = await getTranslations('SelectedWorks');
  const locale = await getLocale();

  if (!data) return null;

  const formattedProjects = data.list.map((project) => ({
    id: project.slug,
    title: project.title,
    category: project.category,
    imageUrl: project.imageUrl,
    // 4. Ensure links include the locale (e.g., /en/haakuvaus)
    link: `/${locale}/palvelut/${project.slug}`,
  }));

  const sectionTitle = data.settings?.title || t('title');

  return (
    <SelectedWorksContent 
      title={sectionTitle}
      projects={formattedProjects}
      // 5. Pass the missing props
      locale={locale}
      labels={{
        explore: t('explore'),
        allServices: t('allServices'),
        viewAllBtn: t('viewAllBtn'),
      }}
    />
  );
}