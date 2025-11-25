"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import Link from "next/link";

type CardProps = {
  title: string;
  align: "left" | "right";
  image: string;
};

function Card({ title, align, image }: CardProps) {
  const isLeft = align === "left";

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-zinc-800
        bg-zinc-950
        shadow-sm
        transition-transform duration-200
        hover:-translate-y-0.5 hover:scale-[1.02]
      "
    >
      {/* IMAGE BACKGROUND (zooms a bit) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            h-full w-full bg-center bg-cover
            transition-transform duration-300
            group-hover:scale-100
          "
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* TEXT PANEL WITH DIAGONAL EDGE */}
      <div className="relative h-24 sm:h-28 flex items-stretch">
        <div
          className={`
            relative h-full
            w-[240px] sm:w-[280px] lg:w-[320px]   /* 👈 fixed width */
            ${isLeft ? "ml-0 mr-auto" : "ml-auto mr-0"}
          `}
        >
          <div
            className={`
              h-full w-full flex items-center
              px-6 sm:px-8
              bg-zinc-950
              ${isLeft ? "justify-start text-left" : "justify-end text-right"}
              ${
                isLeft
                  ? "[clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]"
                  : "[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]"
              }
            `}
          >
            <span className="text-base sm:text-lg font-semibold tracking-tight">
              {title}
            </span>
          </div>
        </div>
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
    {
      title: "Yrityskuvaus",
      slug: "yrityskuvaus",
      image: "/services/yritys.png",
    },
    { title: "Hääkuvaus", slug: "haakuvaus", image: "/services/haat.png" },
    {
      title: "Muotokuvaus",
      slug: "muotokuvaus",
      image: "/services/muotokuva.png",
    },
    {
      title: "Lapsi- ja perhekuvaus",
      slug: "lapsi-ja-perhekuvaus",
      image: "/services/perhe.png",
    },
    {
      title: "Rippi- ja valmistujaiskuvaus",
      slug: "rippi-ja-valmistujaiskuvaus",
      image: "/services/rippi.png",
    },
    {
      title: "Asuntokuvaus",
      slug: "asuntokuvaus",
      image: "/services/asunto.png",
    },
    {
      title: "Hautajaiskuvaus",
      slug: "hautajaiskuvaus",
      image: "/services/hautaus.png",
    },
    { title: "Eläinkuvaus", slug: "elainkuvaus", image: "/services/elain.png" },
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
                  <Card
                    title={item.title}
                    align={fromLeft ? "left" : "right"}
                    image={item.image}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
