// components/Work.tsx
import Container from "./Container";
import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import PhotoCalculator from "./PhotoCalculator";

export default async function Work({ locale }: { locale: "fi" | "en" }) {
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <section
      id="work"
      className="relative min-h-screen flex items-center justify-center py-20"
    >
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* 💰 Price calculator instead of project grid */}
        <Reveal delay={0.1} y={20}>
          <PhotoCalculator />
        </Reveal>
      </Container>
    </section>
  );
}
