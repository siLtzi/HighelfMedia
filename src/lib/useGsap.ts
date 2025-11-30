"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

// Simple and typesafe
export function useGsap(callback: (gsapInstance: typeof gsap) => void) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback(gsap);
    });

    return () => ctx.revert();
  }, [callback]);
}
