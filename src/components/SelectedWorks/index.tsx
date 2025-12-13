import { useTranslations } from 'next-intl';
import SelectedWorksContent from './Content';

// 1. The shape of data coming from Sanity
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

export default function SelectedWorks({ data }: SelectedWorksProps) {
  const t = useTranslations('SelectedWorks');

  if (!data) return null;

  // Map Sanity Data -> Component Props
  const formattedProjects = data.list.map((project) => ({
    id: project.slug,
    title: project.title,
    category: project.category,
    imageUrl: project.imageUrl,
    // ✅ CHANGED: Links to root service page (e.g., /haakuvaus)
    // instead of /work/haakuvaus, fitting your new site structure.
    link: `/${project.slug}`,
  }));

  // SAFETY CHECK: Use fallbacks if settings haven't been created in Sanity yet
  const sectionTitle = data.settings?.title || t('title');

  return (
    <SelectedWorksContent 
      title={sectionTitle}
      // ❌ REMOVED: viewCaseLabel={t('viewCase')} 
      // This was causing the error because the child component no longer needs it.
      projects={formattedProjects}
    />
  );
}