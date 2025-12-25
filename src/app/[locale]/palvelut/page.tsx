import { sanityFetch } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';
import { getTranslations } from 'next-intl/server';
import ServicesListContent from '@/components/ServicesList/Content';

const SERVICES_QUERY = defineQuery(`
  *[_type == "service"]|order(title asc) {
    title,
    "slug": slug.current,
    description,
    heroImage
  }
`);

interface Service {
  title: string;
  slug: string;
  description: string;
  heroImage: any;
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Navigation');
  const tSelectedWorks = await getTranslations('SelectedWorks');
  
  const services = await sanityFetch<Service[]>({
    query: SERVICES_QUERY,
  });

  return (
    <main className="bg-neutral-950 min-h-screen text-white">
      <ServicesListContent 
        services={services} 
        title={t('services')} 
        locale={locale} 
        exploreText={tSelectedWorks('explore')}
      />
    </main>
  );
}
