import { groq } from "next-sanity";

export const allServiceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)]{
    "slug": slug.current
  }
`;

// Note: this is now a FUNCTION that takes slug
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