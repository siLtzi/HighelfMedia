import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/image';
import { getTranslations } from 'next-intl/server';
import ServiceGallery from '@/components/ServicePage/Gallery';

// 1. DEFINE TYPES
interface ServiceData {
  title: string;
  description: string;
  heroImage: any;
  packages: {
    name: string;
    price: string;
    features: string[];
  }[];
  gallery: any[];
  faq: {
    question: string;
    answer: string;
  }[];
}

// 2. QUERY
const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    title,
    description,
    heroImage,
    packages[] {
      name,
      price,
      features
    },
    gallery,
    faq[] {
      question,
      answer
    }
  }
`);

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('contact');
  const tService = await getTranslations('ServicePage');

  // 3. PASS THE TYPE GENERIC <ServiceData>
  const service = await sanityFetch<ServiceData>({
    query: SERVICE_QUERY,
    params: { slug },
  });

  if (!service) {
    return notFound();
  }

  return (
    <main className="bg-neutral-950 min-h-screen text-white">
      
      {/* --- HERO HEADER --- */}
      <div className="relative px-6 md:px-12 lg:px-24 pt-32 pb-24 overflow-hidden">
        {/* Background Image */}
        {service.heroImage && (
           <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
              <Image
                src={urlForImage(service.heroImage).url()}
                alt=""
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-neutral-950/20 to-neutral-950" />
           </div>
        )}

        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-6">
            {service.title}
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      {/* --- CONTENT GRID (Pricing & FAQ) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 px-6 md:px-12 lg:px-24 mb-24 border-t border-white/10 pt-12">
        
        {/* LEFT: Pricing */}
        <div>
          <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-12">
            {tService('pricingTitle')}
          </h2>

          <div className="flex flex-col gap-8">
            {service.packages?.map((pkg, i) => (
              <div key={i} className="group border border-white/10 p-8 hover:bg-white/5 transition-colors duration-300">
                <div className="flex justify-between items-baseline mb-6">
                  <h3 className="text-2xl font-bold uppercase">{pkg.name}</h3>
                  <span className="text-xl font-mono text-neutral-400">{pkg.price}</span>
                </div>
                <ul className="flex flex-col gap-3 mb-8">
                  {pkg.features?.map((feature, j) => (
                    <li key={j} className="text-sm text-neutral-300 flex items-start gap-3">
                        <span className="text-neutral-600 mt-0.5">✦</span>
                        {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/${locale}/contact?service=${slug}&package=${pkg.name}`}
                  className="inline-block w-full py-3 text-center border border-white/30 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  {tService('selectPackage')}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: FAQ */}
        <div>
          {service.faq && service.faq.length > 0 && (
            <>
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-12">
                {tService('faqTitle')}
              </h2>
              <div className="flex flex-col gap-8">
                {service.faq.map((item, i) => (
                  <div key={i} className="border-b border-white/5 pb-8 last:border-0">
                    <h4 className="font-bold text-lg mb-4 text-neutral-200">{item.question}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>

      {/* --- GALLERY SECTION (Full Width) --- */}
      <div className="w-full px-6 md:px-12 pb-24 border-t border-white/10 pt-24">
          <ServiceGallery 
            gallery={service.gallery} 
            title={tService('galleryTitle')}
            loadMoreText={tService('loadMore')}
          />
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="bg-white text-black py-24 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8">
          {tService('ctaTitle')}
        </h2>
        <Link 
          href={`/${locale}/contact`}
          className="inline-block bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
        >
          {t('submit')}
        </Link>
      </div>

    </main>
  );
}