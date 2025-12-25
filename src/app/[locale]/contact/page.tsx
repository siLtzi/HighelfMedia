import { client } from '@/sanity/lib/client';
import { homePageQuery } from '@/sanity/queries';
import ContactPage from '@/components/ContactPage';
import { defineQuery } from 'next-sanity';

const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] {
    title,
    "slug": slug.current,
    packages[] {
      name
    }
  }
`);

// 1. Next.js 15: params is a Promise, so we type it as Promise<{ locale: string }>
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  // 2. Await the params before accessing locale
  const { locale } = await params;

  // 3. Now pass the awaited locale to Sanity
  const data = await client.fetch(homePageQuery, { locale });
  const services = await client.fetch(SERVICES_QUERY);

  return (
    <ContactPage data={data} services={services} />
  );
}