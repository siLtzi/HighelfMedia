/*"use client";
import { useEffect, useRef } from "react";

// 👉 your base JSON config
const BASE = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 0,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "window", // we'll still forward manually
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: false, mode: "repulse" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 200, size: 2, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
} as const;

export default function ParticlesLayer() {
  const id = "particles-global";
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const init = async () => {
      await import("particles.js"); // attaches window.particlesJS

      const prefersDark = matchMedia("(prefers-color-scheme: dark)");

      const apply = () => {
        destroy(); // clean re-init on theme change

        const dark = prefersDark.matches;
        const config = structuredClone(BASE) as any;

        // theme colors
        config.particles.color.value = dark ? "#ffffff" : "#111111";
        config.particles.line_linked.color = dark ? "#ffffff" : "#111111";

        // ensure global detection (we still do manual forwarding below)
        config.interactivity.detect_on = "window";

        (window as any).particlesJS(id, config);

        // keep canvas behind everything
        const canvas = document.querySelector(
          `#${id} canvas`
        ) as HTMLCanvasElement | null;
        if (canvas) {
          canvas.style.background = "transparent";
          canvas.style.zIndex = "-1";
        }

        // ---- GLOBAL HOVER: forward window mouse to particles in CANVAS SPACE ----
        const w = window as any;
        const inst = w.pJSDom && w.pJSDom[0]?.pJS;

        // remove previous listeners if any
        if (w.__particlesMove) {
          window.removeEventListener("mousemove", w.__particlesMove);
          window.removeEventListener("mouseleave", w.__particlesLeave);
        }

        if (inst) {
          // helpful: tell particles which element is interactive
          if (canvas) inst.interactivity.el = canvas;

          w.__particlesMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect(); // canvas position in viewport
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            inst.interactivity.mouse.pos_x = x;
            inst.interactivity.mouse.pos_y = y;
            inst.interactivity.status = "mousemove";
          };

          w.__particlesLeave = () => {
            inst.interactivity.mouse.pos_x = null;
            inst.interactivity.mouse.pos_y = null;
            inst.interactivity.status = "mouseleave";
          };

          window.addEventListener("mousemove", w.__particlesMove, { passive: true });
          window.addEventListener("mouseleave", w.__particlesLeave, { passive: true });
        }
        // -----------------------------------------------------------------------
      };

      apply();
      prefersDark.addEventListener("change", apply);
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        prefersDark.removeEventListener("change", apply);
        document.removeEventListener("visibilitychange", handleVisibility);
        destroy();
      };
    };

    const handleVisibility = () => {
      // placeholder if you want to pause on hidden
    };

    const destroy = () => {
      const w = window as any;

      // remove our global mouse forwarders
      if (w.__particlesMove) {
        window.removeEventListener("mousemove", w.__particlesMove);
        w.__particlesMove = null;
      }
      if (w.__particlesLeave) {
        window.removeEventListener("mouseleave", w.__particlesLeave);
        w.__particlesLeave = null;
      }

      // particles.js global destroy pattern
      if (w.pJSDom && w.pJSDom.length) {
        w.pJSDom.forEach((p: any) => p?.pJS?.fn?.vendors?.destroypJS?.());
        w.pJSDom = [];
      }
      const el = document.getElementById(id);
      if (el) el.innerHTML = "";
    };

    init().catch(console.error);
    return () => destroy();
  }, []);

  return <div id={id} className="fixed inset-0 -z-10" aria-hidden />;
}*/
