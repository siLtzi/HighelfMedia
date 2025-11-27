import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import About from "@/components/About";
import { getPricingConfig } from "@/sanity/lib/queries"; // 👈 add this

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "fi" | "en" }>;
}) {
  const { locale } = await params;

  // 👇 fetch pricing once for the whole homepage
  const pricing = await getPricingConfig();

  return (
    <>
      <Hero />
      <About />
      <Services locale={locale} />
      {/* 👇 pass pricing into Work */}
      <Work locale={locale} pricing={pricing} />
      <Contact locale={locale} />
    </>
  );
}
