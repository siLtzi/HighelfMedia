"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Container from "./Container";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar({ locale }: { locale: string }) {
  const base = `/${locale}`;
  const section = (hash: string) => `${base}#${hash}`;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-black/90 border-b border-white/10"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-transparent"
        }
        backdrop-blur-md
      `}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: LOGO / BRAND */}
          <div className="flex items-center">
            <Link href={base} className="inline-flex items-center gap-2">
              <img
                src="/Highelf2.svg"
                alt="Highelf Media"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* CENTER: DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 text-sm">

            <Link
              href={section("about")}
              className="relative text-zinc-200/90 hover:text-white transition"
            >
              {tNav("about")}
            </Link>
            <Link
              href={section("services")}
              className="relative text-zinc-200/90 hover:text-white transition"
            >
              <span>{tNav("services")}</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href={section("work")}
              className="text-zinc-200/90 hover:text-white transition"
            >
              {tNav("work")}
            </Link>
          </div>

          {/* RIGHT: DESKTOP CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <LocaleSwitcher current={locale as any} />
            <Link
              href={section("contact")}
              className="
                inline-flex items-center justify-center rounded-full
                bg-white text-black text-sm font-medium
                px-4 py-1.5
                shadow-sm
                hover:bg-zinc-200 transition
              "
            >
              {tCta("contact")}
            </Link>
          </div>

          {/* MOBILE: BURGER */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="
              md:hidden inline-flex h-10 w-10 items-center justify-center
              rounded-full border border-white/20 bg-black/70
              text-white
              transition-transform duration-200
              active:scale-95
            "
          >
            <div className="relative h-4 w-6">
              <span
                className={`
                  absolute left-0 top-0 h-[2px] w-full rounded bg-white transition-all duration-200
                  ${menuOpen ? "top-1/2 rotate-45" : ""}
                `}
              />
              <span
                className={`
                  absolute left-0 top-1/2 h-[2px] w-full rounded bg-white transition-all duration-200
                  ${menuOpen ? "opacity-0" : "-translate-y-1/2"}
                `}
              />
              <span
                className={`
                  absolute left-0 bottom-0 h-[2px] w-full rounded bg-white transition-all duration-200
                  ${menuOpen ? "bottom-1/2 -rotate-45" : ""}
                `}
              />
            </div>
          </button>
        </nav>
      </Container>

      {/* MOBILE MENU PANEL */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95">
          <Container>
            <div className="flex flex-col gap-3 py-4 text-sm">

              <Link
                href={section("about")}
                onClick={closeMenu}
                className="py-1 text-zinc-100 hover:text-white"
              >
                {tNav("about")}
              </Link>

              <Link
                href={section("services")}
                onClick={closeMenu}
                className="py-1 text-zinc-100 hover:text-white"
              >
                {tNav("services")}
              </Link>
              <Link
                href={section("work")}
                onClick={closeMenu}
                className="py-1 text-zinc-100 hover:text-white"
              >
                {tNav("work")}
              </Link>

              <div className="mt-3 flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <LocaleSwitcher current={locale as any} />
                <Link
                  href={section("contact")}
                  onClick={closeMenu}
                  className="
                    inline-flex items-center justify-center rounded-full
                    bg-white text-black text-xs font-medium
                    px-3 py-1
                    hover:bg-zinc-200 transition
                  "
                >
                  {tCta("contact")}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
