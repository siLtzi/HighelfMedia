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
    } | null; // <--- settings might be null if not published yet
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
    link: `/work/${project.slug}`,
  }));

  // SAFETY CHECK: Use fallbacks if settings haven't been created in Sanity yet
  const sectionTitle = data.settings?.title || "Selected Works";
  const sectionSubtitle = data.settings?.subtitle || "";

  return (
    <SelectedWorksContent 
      title={sectionTitle}
      viewCaseLabel={t('viewCase')}
      projects={formattedProjects}
    />
  );
}