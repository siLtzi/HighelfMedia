"use client";

import { useEffect, useState } from "react";
import ScrollCue from "./ScrollCue";
import { LOGO_PATHS } from "@/lib/logoPaths";

const VB_W = 1920;
const VB_H = 1080;

// background image pairs (top/bottom)
const BACKGROUND_PAIRS = [
  {
    top: "/hero-top.png",
    bottom: "/hero-bottom.png",
  },
  {
    top: "/hero-top-2.png",
    bottom: "/hero-bottom-2.png",
  },
  {
    top: "/hero-top-3.png",
    bottom: "/hero-bottom-3.png",
  },
];

const SLIDE_INTERVAL = 3000; // ms between background changes

export default function Hero() {
  // timings
  const LOGO_APPEAR_DELAY = 0;
  const LOGO_APPEAR_DUR = 1.2;
  const UNDERLINE_WIPE = 0.8;

  const UNDERLINE_DELAY = LOGO_APPEAR_DELAY + LOGO_APPEAR_DUR + 0.03;
  const MEDIA_DELAY = UNDERLINE_WIPE + 0.1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    if (BACKGROUND_PAIRS.length <= 1) return;

    const id = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % BACKGROUND_PAIRS.length;
        setPrevIndex(current);
        return next;
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="
        relative min-h-screen w-full
        grid place-items-center
        px-[clamp(16px,8vw,128px)] py-20
        overflow-hidden
      "
    >
      {/* ==== BACKGROUND WITH OPPOSITE SLIDE + ANTICIPATION ==== */}
      <div
  className="
    pointer-events-none absolute inset-0 -z-10
    overflow-hidden hero-bg-fade
  "
>

        {BACKGROUND_PAIRS.map((pair, i) => {
          const isActive = i === activeIndex;
          const isPrev = i === prevIndex;

          const role =
            prevIndex === null
              ? isActive
                ? "initial-active"
                : "initial-rest"
              : isActive
              ? "active"
              : isPrev
              ? "prev"
              : "rest";

          let topClass =
            "absolute inset-0 bg-cover bg-center hero-split-top will-change-transform";
          let bottomClass =
            "absolute inset-0 bg-cover bg-center will-change-transform";

          switch (role) {
            case "initial-active":
              topClass += " hero-top-rest";
              bottomClass += " hero-bottom-rest";
              break;

            case "initial-rest":
            case "rest":
              topClass += " hero-top-off-left";
              bottomClass += " hero-bottom-off-right";
              break;

            case "active":
              topClass += " hero-top-in";
              bottomClass += " hero-bottom-in";
              break;

            case "prev":
              topClass += " hero-top-out";
              bottomClass += " hero-bottom-out";
              break;
          }

          const zIndex =
            role === "prev"
              ? 30 
              : role === "active"
              ? 20 
              : 10; 

          return (
            <div
              key={`${pair.top}-${pair.bottom}-${i}-${role}`}
              className="absolute inset-0"
              style={{ zIndex }}
            >
              <div
                className={bottomClass}
                style={{ backgroundImage: `url(${pair.bottom})` }}
              />
              <div
                className={topClass}
                style={{ backgroundImage: `url(${pair.top})` }}
              />
            </div>
          );
        })}
      </div>

      {/* ==== LOGO + TEXT ==== */}
      <div className="relative z-10 text-center text-zinc-900 dark:text-white">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="mx-auto w-[min(92vw,1200px)] h-auto overflow-visible"
          role="img"
          aria-labelledby="logoTitle"
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
        >
          <title id="logoTitle">Highelf Media</title>

          <defs>
            <mask
              id="wipe-underline"
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={VB_W}
              height={VB_H}
            >
              <rect
                x={0}
                y={0}
                width={VB_W}
                height={VB_H}
                fill="white"
                className="reveal"
                style={{
                  animationDuration: `${UNDERLINE_WIPE}s`,
                  animationDelay: `${UNDERLINE_DELAY}s`,
                }}
              />
            </mask>
          </defs>

          {/* UNDERLINE — behind Highelf */}
          <g mask="url(#wipe-underline)">
            {/* OUTLINE */}
            <g
              fill="none"
              stroke="black"
              strokeWidth={12}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {LOGO_PATHS.underline.map((d, i) => (
                <path key={`ul-stroke-${i}`} d={d} />
              ))}
            </g>

            {/* FILL */}
            <g fill="white">
              {LOGO_PATHS.underline.map((d, i) => (
                <path key={`ul-fill-${i}`} d={d} />
              ))}
            </g>
          </g>

          {/* HIGHELF — outlined, on top */}
          <g
            className="logo-settle"
            style={{
              animation: `logoSettle ${LOGO_APPEAR_DUR}s ease-out ${LOGO_APPEAR_DELAY}s forwards`,
            }}
          >
            {/* OUTLINE */}
            <g
              fill="none"
              stroke="black"
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {LOGO_PATHS.highelf.map((d, i) => (
                <path key={`hf-stroke-${i}`} d={d} />
              ))}
            </g>

            {/* FILL */}
            <g fill="white">
              {LOGO_PATHS.highelf.map((d, i) => (
                <path key={`hf-fill-${i}`} d={d} />
              ))}
            </g>
          </g>

          {/* media — with outline */}
          <g
            transform="translate(0,90)"
            style={{
              opacity: 0,
              animation: `fadeUp .55s ease-out ${MEDIA_DELAY}s forwards`,
              transformOrigin: "center",
            }}
          >
            {/* OUTLINE */}
            <g
              fill="none"
              stroke="black"
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {LOGO_PATHS.media.map((d, i) => (
                <path key={`m-stroke-${i}`} d={d} />
              ))}
            </g>

            {/* FILL */}
            <g fill="white">
              {LOGO_PATHS.media.map((d, i) => (
                <path key={`m-fill-${i}`} d={d} />
              ))}
            </g>
          </g>
        </svg>
      </div>

      <ScrollCue />
    </section>
  );
}
