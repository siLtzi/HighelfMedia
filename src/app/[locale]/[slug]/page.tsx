import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { client } from "@/sanity/lib/client";
import { allServiceSlugsQuery, serviceBySlugQuery } from "@/sanity/lib/queries";
import ServicePortfolioGrid from "./ServicePortfolioGrid";
import PhotoCalculator from "@/components/PhotoCalculator";
import Contact from "@/components/Contact";

type ServiceSlug = string;

type Service = {
  slug: string;
  title: string;
  tagline?: string;
  info?: string;
  pricingIntro?: string;
  portfolioIntro?: string;
  howItWorks?: { title?: string; desc?: string }[];
  faq?: { q?: string; a?: string }[];
  portfolioImages?: {
    _key: string;
    alt?: string;
    asset?: any;
  }[];
};

export async function generateStaticParams() {
  const services: { slug: string }[] = await client.fetch(allServiceSlugsQuery);

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: ServiceSlug };
}): Promise<Metadata> {
  const { slug } = params;
  const service: Service | null = await client.fetch(serviceBySlugQuery(slug));

  if (!service) return {};

  return {
    title: `${service.title} – Highelf Media`,
    description: service.tagline,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: ServiceSlug }>;
}) {
  const { slug, locale } = await params;

  const service: Service | null = await client.fetch(serviceBySlugQuery(slug));

  if (!service) notFound();

  return (
    <section className="py-20">
      <Container>
        {/* INFO SECTION */}
        <Reveal>
          <header className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Palvelu
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              {service.tagline}
            </p>
          </header>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* LEFT: info */}
          <div className="space-y-8">
            {/* Info block */}
            <Reveal delay={0.05} y={20}>
              <section className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-6 sm:p-8">
                <h2 className="text-lg font-semibold">Tietoa kuvauksesta</h2>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {service.info}
                </p>
              </section>
            </Reveal>

            {/* How it works */}
            {service.howItWorks && service.howItWorks.length > 0 && (
              <Reveal delay={0.08} y={20}>
                <section className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-6 sm:p-8">
                  <h2 className="text-lg font-semibold">Miten kuvaus etenee</h2>
                  <ol className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {service.howItWorks.map((step, index) => (
                      <li key={step.title ?? index} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white text-xs dark:bg-zinc-100 dark:text-zinc-900">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">
                            {step.title}
                          </p>
                          <p className="text-xs sm:text-sm mt-1">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}
          </div>

          {/* RIGHT: pricing / CTA */}
          <Reveal delay={0.15} y={20}>
            <aside className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur p-6 sm:p-7">
              <h2 className="text-base font-semibold">Hinnoittelu</h2>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {service.pricingIntro}
              </p>

              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Voit käyttää sivun hinnastolaskuria arvioidaksesi lopullisen
                hinnan tai pyytää suoraan tarjouksen juuri tätä kuvausta varten.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="#work"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 text-white text-sm px-4 py-2.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition"
                >
                  Avaa hinnasto
                </a>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition"
                >
                  Kysy lisää / varaa aika
                </a>
              </div>

              {service.faq && service.faq.length > 0 && (
                <div className="mt-6 border-t border-zinc-200/70 dark:border-zinc-800 pt-4">
                  <h3 className="text-sm font-semibold mb-2">Usein kysyttyä</h3>
                  <dl className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
                    {service.faq.map((item, index) => (
                      <div key={item.q ?? index}>
                        <dt className="font-medium text-zinc-900 dark:text-zinc-100">
                          {item.q}
                        </dt>
                        <dd className="mt-1">{item.a}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </aside>
          </Reveal>
        </div>
      </Container>

      {/* === CALCULATOR FOR THIS SERVICE === */}
      <div id="work">
        <Container>
          <Reveal delay={0.08} y={20}>
            <PhotoCalculator serviceSlug={service.slug} lockToService />
          </Reveal>
        </Container>
      </div>

      {/* === PORTFOLIO ROW (FULL CONTAINER WIDTH) === */}
      <Container>
        <Reveal delay={0.1} y={20}>
          <ServicePortfolioGrid
            intro={service.portfolioIntro}
            images={service.portfolioImages ?? []}
          />
        </Reveal>
      </Container>

      {/* === CONTACT SECTION (reuse homepage contact) === */}
      <Contact locale={locale} />
    </section>
  );
}
