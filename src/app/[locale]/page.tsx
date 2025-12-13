import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { homePageQuery } from "@/sanity/queries";

// Components
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import SelectedWorks from "@/components/SelectedWorks";
import Profile from "@/components/Profile";

// --- TYPES (This fixes the "Property does not exist" errors) ---
interface MetadataResponse {
  title: string;
  description: string;
  image: string;
}

interface HomePageData {
  hero: any; // We will type these strictly in the components
  manifesto: {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  };
  projects: {
    settings: { title: string; subtitle: string };
    list: any[];
  };
  profiles: {
    settings: { title: string; subtitle: string };
    list: any[];
  };
}

// -----------------------------------------------------------------------------
// 1. Static Generation
// -----------------------------------------------------------------------------
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }];
}

// -----------------------------------------------------------------------------
// 2. SEO Metadata
// -----------------------------------------------------------------------------
const METADATA_QUERY = defineQuery(`
  *[_type == "heroSettings"][0] {
    "title": title[$locale],
    "description": subtitle[$locale],
    "image": backgroundImage.asset->url
  }
`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // <MetadataResponse> tells TS what this query returns
  const seo = await sanityFetch<MetadataResponse>({
    query: METADATA_QUERY,
    params: { locale },
  });

  if (!seo) return {};

  return {
    title: `${seo.title} | Portfolio`,
    description: seo.description,
    openGraph: {
      images: seo.image ? [seo.image] : [],
    },
  };
}

// -----------------------------------------------------------------------------
// 3. The Page Component
// -----------------------------------------------------------------------------
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const validLocales = ["en", "fi"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  // <HomePageData> tells TS that 'data' has hero, manifesto, etc.
  const data = await sanityFetch<HomePageData>({
    query: homePageQuery,
    params: { locale },
  });

  if (!data) return null;

  return (
    <main className="flex flex-col min-h-screen bg-neutral-950">
      {/* 1. HERO */}
      <Hero locale={locale} data={data.hero} />

      {/* 2. MANIFESTO */}
      <Manifesto data={data.manifesto} />

      {/* 3. SELECTED WORKS */}
      <SelectedWorks data={data.projects} />

      {/* 4. PROFILE */}
      <Profile data={data.profiles.settings} />
    </main>
  );
}
