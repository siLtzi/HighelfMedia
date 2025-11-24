"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const DURATION = prefersReduced ? 0.25 : 1.0; 
    const WHEEL    = prefersReduced ? 1.0  : 1.8; 

    const lenis = new Lenis({
      duration: DURATION,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), 
      smoothWheel: !prefersReduced,
      wheelMultiplier: WHEEL,
      touchMultiplier: 1.0,
      gestureOrientation: "vertical",
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!) as HTMLElement;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -8 }); 
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
