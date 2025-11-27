import { groq } from "next-sanity";
import { client } from "./client";

export const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const serviceBySlugQuery = (slug: string) => groq`
  *[_type == "service" && slug.current == ${JSON.stringify(slug)}][0]{
    _id,
    "slug": slug.current,
    title,
    tagline,
    info,
    pricingIntro,
    portfolioIntro,
    howItWorks[]{
      title,
      desc
    },
    faq[]{
      q,
      a
    },
    portfolioImages[]{
      _key,
      alt,
      asset->
    }
  }
`;

export type PricingService = {
  slug: string;
  base: number;
  hourly: number;
  perPhoto: number;
  extras?: { id: string; price: number }[];
};

export type PricingMap = Record<
  string,
  {
    base: number;
    hourly: number;
    perPhoto: number;
    extras: { id: string; price: number }[];
  }
>;

const pricingQuery = groq`
  *[_type == "pricingCalculator"][0].services[]{
    slug,
    base,
    hourly,
    perPhoto,
    "extras": extras[]{
      id,
      price
    }
  }
`;

export async function getPricingConfig(): Promise<PricingMap> {
  const services = await client.fetch<PricingService[]>(pricingQuery);

  const map: PricingMap = {};
  for (const svc of services ?? []) {
    map[svc.slug] = {
      base: svc.base ?? 0,
      hourly: svc.hourly ?? 0,
      perPhoto: svc.perPhoto ?? 0,
      extras: svc.extras ?? [],
    };
  }

  return map;
}

