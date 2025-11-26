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

export default function ServicePortfolioGrid({ intro, images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const getTileClasses = (i: number) => {
    // Simple repeating pattern to make it feel "puzzle-like"
    switch (i % 6) {
      case 0:
        return "sm:col-span-2 sm:row-span-2";
      case 1:
        return "row-span-2";
      case 3:
        return "sm:col-span-2";
      case 5:
        return "row-span-2";
      default:
        return "";
    }
  };

  if (!images || images.length === 0) return null;

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
        <div
          className="
            grid gap-4
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
            auto-rows-[140px] sm:auto-rows-[170px] lg:auto-rows-[190px]
          "
        >
          {images.map((img, i) => {
            if (!img.asset) return null;

            const thumbUrl = urlForImage(img.asset)
              .width(900)
              .height(900)
              .fit("crop")
              .auto("format")
              .url();

            return (
              <button
                key={img._key}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`
    group relative overflow-hidden rounded-2xl bg-zinc-800
    cursor-pointer                        /* 👈 ADD THIS */
    focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200
    transition-transform duration-200 hover:-translate-y-1
    ${getTileClasses(i)}
  `}
              >
                <img
                  src={thumbUrl}
                  alt={img.alt || ""}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && images[activeIndex]?.asset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setActiveIndex(null)}
          />

          <div className="relative z-10 max-w-5xl max-h-[90vh] w-[94vw]">
            <img
              src={urlForImage(images[activeIndex].asset)
                .width(2000)
                .fit("max")
                .auto("format")
                .url()}
              alt={images[activeIndex].alt || ""}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />

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
          </div>
        </div>
      )}
    </section>
  );
}
