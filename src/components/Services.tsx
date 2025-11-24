"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import Link from "next/link";


function Card({ title }: { title: string }) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-zinc-200/50 dark:border-zinc-800
        bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl
        shadow-sm transition-all
        hover:-translate-y-0.5 hover:shadow-lg
      "
    >
      <div className="relative px-8 py-10 text-left">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
    </div>
  );
}

/* === Services Section === */

export default function Services({ locale }: { locale: "fi" | "en" }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // title + slug for each service (slug = url)
  const items = [
    { title: "Yrityskuvaus", slug: "yrityskuvaus" },
    { title: "Hääkuvaus", slug: "haakuvaus" },
    { title: "Muotokuvaus", slug: "muotokuvaus" },
    { title: "Lapsi- ja perhekuvaus", slug: "lapsi-ja-perhekuvaus" },
    {
      title: "Rippi- ja valmistujaiskuvaus",
      slug: "rippi-ja-valmistujaiskuvaus",
    },
    { title: "Asuntokuvaus", slug: "asuntokuvaus" },
    { title: "Hautajaiskuvaus", slug: "hautajaiskuvaus" },
    { title: "Eläinkuvaus", slug: "elainkuvaus" },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 text-center"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col items-center">
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              Palvelut
            </h2>
            <p className="mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              Valokuvauspalvelut kaikkiin elämäsi hetkiin.
            </p>
          </div>
        </Reveal>

        {/* Staggered rows */}
        <div className="mt-16 flex flex-col gap-10 w-full mx-auto pb-8">
          {items.map((item, i) => {
            const fromLeft = i % 2 === 0;

            const hidden = fromLeft
              ? "-translate-x-16 opacity-0"
              : "translate-x-16 opacity-0";

            const shown = "translate-x-0 opacity-100";

            return (
              <div
                key={item.slug}
                className={`
                  w-full flex
                  ${fromLeft ? "justify-start" : "justify-end"}
                  transition-[transform,opacity] duration-500 ease-out
                  ${triggered ? shown : hidden}
                `}
                style={{
                  transitionDelay: triggered ? `${i * 120}ms` : "0ms",
                }}
              >
                <Link
                  href={`/${locale}/${item.slug}`}
                  className="
                    w-[78%] md:w-[70%]
                    hover:w-full
                    transition-[width] duration-200 ease-out
                  "
                >
                  <Card title={item.title} />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
