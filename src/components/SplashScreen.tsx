"use client";

import { useEffect, useState } from "react";
import { LOGO_PATHS } from "@/lib/logoPaths";

type SplashScreenProps = {
  onFinish?: () => void;
  vbWidth?: number;
  vbHeight?: number;
  durationMs?: number; 
};

export default function SplashScreen({
  onFinish,
  vbWidth = 1920,
  vbHeight = 1080,
  durationMs = 1800,
}: SplashScreenProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 900); 
    const t2 = setTimeout(() => setPhase("out"), 900); 
    const t3 = setTimeout(() => onFinish?.(), durationMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish, durationMs]);

  return (
    <div
      className={[
        "fixed inset-0 z-9999 grid place-items-center",
        "bg-(--background) text-(--foreground)",
        "pointer-events-none select-none",
        phase === "in"
          ? "animate-splashIn"
          : phase === "hold"
          ? "opacity-100"
          : "animate-splashOut",
      ].join(" ")}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        className="w-[min(92vw,1200px)] h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Highelf"
      >
        <g className="splash-logo-enter">
          {LOGO_PATHS.highelf.map((d, i) => (
            <path key={`s-${i}`} d={d} fill="currentColor" />
          ))}
        </g>
      </svg>
    </div>
  );
}
