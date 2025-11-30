"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Container from "./Container";
import Reveal from "./Reveal";
import Link from "next/link";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type CardProps = {
  title: string;
  align: "left" | "right";
  image: string;
  backgroundPosition?: string;
};

function Card({ title, align, image, backgroundPosition }: CardProps) {
  const isLeft = align === "left";

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-zinc-800
        bg-zinc-950
        shadow-sm
        transition-transform duration-200
        hover:translate-y-0 hover:scale-[1.01]
      "
    >
      {/* IMAGE BACKGROUND (shared) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            h-full w-full bg-cover
            transition-transform duration-300
            group-hover:scale-100
          "
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: backgroundPosition ?? "50% 50%",
          }}
        />
      </div>

      {/* === MOBILE VERSION (< sm) === */}
      <div className="relative h-48 flex items-end sm:hidden">
        <div
          className={`
            w-full px-4 py-3
            bg-linear-to-t from-black/85 via-black/40 to-transparent
            text-white
            ${isLeft ? "text-left" : "text-right"}
          `}
        >
          <span className="text-lg font-semibold tracking-tight drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]">
            {title}
          </span>
        </div>
      </div>

      {/* === DESKTOP / TABLET VERSION (sm+) === */}
      <div className="relative hidden sm:flex h-32 lg:h-40 items-stretch">
        <div
          className={`
            relative h-full
            ${isLeft ? "ml-0 mr-auto" : "ml-auto mr-0"}
          `}
        >
          <div
            className={`
              h-full flex items-center
              px-4 sm:px-6
              bg-zinc-950
              w-[280px] sm:w-[340px] lg:w-[400px]
              ${isLeft ? "justify-start text-left" : "justify-end text-right"}
              ${
                isLeft
                  ? "[clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]"
                  : "[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]"
              }
            `}
          >
            <span className="text-base sm:text-lg lg:text-3xl tracking-tight drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === Services Section === */

type Locale = "fi" | "en";

type ServiceItem = {
  slug: string;
  image: string;
  backgroundPosition?: string;
};

const items: ServiceItem[] = [
  {
    slug: "yrityskuvaus",
    image: "/services/yritys.png",
    backgroundPosition: "50% 90%",
  },
  {
    slug: "haakuvaus",
    image: "/services/haat.png",
    backgroundPosition: "50% 20%",
  },
  {
    slug: "muotokuvaus",
    image: "/services/muotokuva.png",
    backgroundPosition: "50% 30%",
  },
  {
    slug: "lapsi-ja-perhekuvaus",
    image: "/services/perhe.png",
    backgroundPosition: "50% 22%",
  },
  {
    slug: "rippi-ja-valmistujaiskuvaus",
    image: "/services/rippi.png",
    backgroundPosition: "50% 18%",
  },
  {
    slug: "asuntokuvaus",
    image: "/services/asunto.png",
    backgroundPosition: "50% 55%",
  },
  {
    slug: "hautajaiskuvaus",
    image: "/services/hautaus.png",
    backgroundPosition: "50% 57%",
  },
  {
    slug: "elainkuvaus",
    image: "/services/elain.png",
  },
];

export default function Services({ locale }: { locale: Locale }) {
  const t = useTranslations("services");
  const listRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!listRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLDivElement>(".service-row");

      rows.forEach((row, index) => {
        const fromLeft = row.dataset.align === "left";

        gsap.fromTo(
          row,
          {
            opacity: 0,
            x: fromLeft ? -64 : 64, // 64px offset
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.06,
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="
        relative min-h-screen flex items-center justify-center py-24 text-center
      "
    >
      <Container>
        <Reveal>
          <div className="flex flex-col items-center">
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Staggered rows */}
        <div
          ref={listRef}
          className="mt-16 flex flex-col gap-2 w-full mx-auto pb-8"
        >
          {items.map((item, i) => {
            const fromLeft = i % 2 === 0;

            return (
              <div
                key={item.slug}
                className={`
                  service-row
                  w-full flex
                  ${fromLeft ? "justify-start" : "justify-end"}
                `}
                data-align={fromLeft ? "left" : "right"}
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
                    title={t(`labels.${item.slug}`)}
                    align={fromLeft ? "left" : "right"}
                    image={item.image}
                    backgroundPosition={item.backgroundPosition}
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
