"use client";
import { useEffect, useState } from "react";

export default function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 40); // hide after slight scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-x-0 bottom-6 flex justify-center",
        "text-zinc-500 dark:text-zinc-400",
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" className="h-24 w-24 animate-bounce">
        <path d="M12 16l-6-6h12l-6 6z" fill="currentColor" />
      </svg>
    </div>
  );
}
