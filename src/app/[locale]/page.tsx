import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import About from "@/components/About";

import {
  getPricingConfig,
  getHeroBackgroundPairs,
  type HeroBackgroundFromSanity,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default async function Page({
  params,
}: {
  params: { locale?: string };
}) {
  const rawLocale = params?.locale;
  const locale: "fi" | "en" =
    rawLocale === "en" || rawLocale === "fi" ? rawLocale : "fi";

  // Fetch pricing + hero backgrounds in parallel
  const [pricing, rawHeroPairs] = await Promise.all([
    getPricingConfig(),
    getHeroBackgroundPairs(),
  ]);

  const heroPairs =
    rawHeroPairs && rawHeroPairs.length > 0
      ? rawHeroPairs
          .filter((p) => p.top && p.bottom)
          .map((p) => ({
            top: urlForImage(p.top).width(1920).height(1080).url(),
            bottom: urlForImage(p.bottom).width(1920).height(1080).url(),
          }))
      : undefined;

  return (
    <>
      <Hero backgroundPairs={heroPairs} />
      <About />
      <Services locale={locale} />
      <Work locale={locale} pricing={pricing} />
      <Contact locale={locale} />
    </>
  );
}
