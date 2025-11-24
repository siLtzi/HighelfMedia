"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
// import StaticBackground from "@/components/StaticBackground"; // remove this

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SmoothScroll />

      <div className="relative z-10">{children}</div>
    </>
  );
}
