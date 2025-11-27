"use client";

import { useState, useEffect } from "react";
import { urlForImage } from "@/sanity/lib/image";

type PortfolioImage = {
  _key: string;
  alt?: string;
  asset?: any;
};

type Props = {
  intro?: string;
  images: PortfolioImage[];
};

const VISIBLE_STEP = 12; // how many images per "page"

export default function ServicePortfolioGrid({ intro, images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(VISIBLE_STEP, images.length)
  );

  // ESC + arrow keys for lightbox
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (activeIndex !== null) {
        if (e.key === "ArrowRight") {
          setActiveIndex((idx) => {
            if (idx === null) return 0;
            return idx === images.length - 1 ? 0 : idx + 1;
          });
        }
        if (e.key === "ArrowLeft") {
          setActiveIndex((idx) => {
            if (idx === null) return 0;
            return idx === 0 ? images.length - 1 : idx - 1;
          });
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) return null;

  const visibleImages = images.slice(0, visibleCount);

  return (
    <section className="mt-20">
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl font-semibold mb-3">Portfolio</h2>
        {intro && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {intro}
          </p>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
        {/* Masonry / Pinterest-style layout */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {visibleImages.map((img, i) => {
            if (!img.asset) return null;

            const thumbUrl = urlForImage(img.asset)
              .width(900) // keep aspect ratio, just cap width
              .auto("format")
              .url();

            return (
              <button
                key={img._key}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="
                  mb-3 sm:mb-4
                  block w-full
                  break-inside-avoid
                  group relative overflow-hidden rounded-2xl bg-zinc-800
                  cursor-pointer
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200
                  transition-transform duration-200 hover:-translate-y-1
                "
              >
                <img
                  src={thumbUrl}
                  alt={img.alt || ""}
                  className="
                    w-full h-auto
                    object-cover
                    transition-transform duration-300 group-hover:scale-105
                  "
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>

        {/* Show more button */}
        {visibleCount < images.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + VISIBLE_STEP, images.length)
                )
              }
              className="
                rounded-full border border-zinc-500/60
                bg-zinc-900/70 text-zinc-100
                px-5 py-2 text-xs sm:text-sm font-medium
                hover:bg-zinc-800/80 hover:border-zinc-300
                transition
              "
            >
              Näytä lisää kuvia ({images.length - visibleCount} jäljellä)
            </button>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && images[activeIndex]?.asset && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative z-10 max-w-5xl w-full flex justify-center"
            onClick={(e) => e.stopPropagation()} // don't close when clicking image
          >
            <img
              src={urlForImage(images[activeIndex].asset)
                .width(2000)
                .fit("max")
                .auto("format")
                .url()}
              alt={images[activeIndex].alt || ""}
              className="
                max-h-[85vh] max-w-full
                w-auto h-auto
                object-contain
                rounded-2xl shadow-2xl
              "
            />

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="
                absolute -top-10 right-0
                inline-flex items-center justify-center
                rounded-full border border-zinc-500/60
                bg-black/40 px-3 py-1 text-xs font-medium
                text-zinc-100 hover:bg-black/70
              "
            >
              Sulje ✕
            </button>

            {/* PREV */}
            <button
              type="button"
              onClick={() =>
                setActiveIndex((idx) => {
                  if (idx === null) return 0;
                  return idx === 0 ? images.length - 1 : idx - 1;
                })
              }
              className="
                absolute
                left-0
                top-1/2 -translate-y-1/2 -translate-x-8 sm:-translate-x-12 lg:-translate-x-16
                h-12 w-12 sm:h-14 sm:w-14
                rounded-full bg-black/50 hover:bg-black/70
                text-white text-4xl font-light
                flex items-center justify-center
                shadow-lg
                select-none
              "
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              type="button"
              onClick={() =>
                setActiveIndex((idx) => {
                  if (idx === null) return 0;
                  return idx === images.length - 1 ? 0 : idx + 1;
                })
              }
              className="
                absolute
                right-0
                top-1/2 -translate-y-1/2 translate-x-8 sm:translate-x-12 lg:translate-x-16
                h-12 w-12 sm:h-14 sm:w-14
                rounded-full bg-black/50 hover:bg-black/70
                text-white text-4xl font-light
                flex items-center justify-center
                shadow-lg
                select-none
              "
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
