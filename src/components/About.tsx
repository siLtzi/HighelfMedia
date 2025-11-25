"use client";

import { useTranslations } from "next-intl";
import Container from "./Container";
import Reveal from "./Reveal";
import Image from "next/image";

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* Text */}
          <Reveal>
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                {t("title")}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("body")}
              </p>
            </div>
          </Reveal>

          {/* Portrait */}
          <Reveal delay={0.1} y={24}>
            <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-zinc-800 shadow-lg bg-zinc-900/10">
              <Image
                src="/about-portrait.png"
                alt={t("portraitAlt")}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 20rem, 16rem"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
