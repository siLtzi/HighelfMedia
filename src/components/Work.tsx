"use client";

import { useTranslations } from "next-intl";
import PhotoCalculator from "./PhotoCalculator";
import Container from "./Container";
import Reveal from "./Reveal";
import type { PricingMap } from "@/sanity/lib/queries";

type WorkProps = {
  locale: "fi" | "en";
  pricing: PricingMap;
};

export default function Work({ locale, pricing }: WorkProps) {
  const t = useTranslations("work");

  return (
    <section
  id="work"
  className="
    py-24
  "
>
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={20}>
          <PhotoCalculator pricing={pricing} />
        </Reveal>
      </Container>
    </section>
  );
}
