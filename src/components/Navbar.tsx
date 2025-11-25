"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar({ locale }: { locale: string }) {
  const base = `/${locale}`;
  const link = (slug: string) => `${base}${slug}`;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!scrolled) setMenuOpen(false);
  }, [scrolled]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        text-zinc-50 transition-all duration-300
        ${
          scrolled
            ? "bg-black/85 border-b border-white/5"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent"
        }
      `}
    >
      <Container>
        <nav className="relative flex h-16 items-center justify-between">
          {/* LEFT SIDE — HAMBURGER AFTER SCROLL */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className={`
              flex h-11 w-11 items-center justify-center rounded-full
              border border-white/20 bg-black/80
              transition-all duration-300
              ${
                scrolled
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 -translate-x-4 scale-75 pointer-events-none"
              }
            `}
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-[3px] bg-white rounded-full"></span>
              <span className="block w-6 h-[3px] bg-white rounded-full"></span>
              <span className="block w-6 h-[3px] bg-white rounded-full"></span>
            </div>
          </button>

          {/* CENTER NAV (Visible at top, hidden on scroll) */}
          <div
            className={`
              hidden sm:flex items-center gap-6 text-sm font-medium
              transition-all duration-300
              ${
                scrolled
                  ? "opacity-0 -translate-y-2 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }
            `}
          >
            <Link href={link("#services")} className="hover:opacity-100 opacity-80">
              Palvelut
            </Link>
            <Link href={link("#work")} className="hover:opacity-100 opacity-80">
              Hinnasto
            </Link>
            <Link
              href={link("#contact")}
              className="rounded-full bg-white text-black px-4 py-2 hover:bg-opacity-90 transition"
            >
              Ota yhteyttä
            </Link>
            <LocaleSwitcher current={locale as any} />
          </div>

          {/* MOBILE TOP NAV (only when at top) */}
          <div
            className={`
              flex sm:hidden items-center gap-4 text-sm
              transition-all duration-300
              ${
                scrolled
                  ? "opacity-0 -translate-y-2 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }
            `}
          >
            <Link href={link("#services")} className="opacity-80 hover:opacity-100">
              Palvelut
            </Link>
            <Link
              href={link("#contact")}
              className="rounded-full bg-white text-black px-3 py-1.5"
            >
              Ota yhteyttä
            </Link>
            <LocaleSwitcher current={locale as any} />
          </div>

          {/* RIGHT SIDE — Locale when scrolled */}
          <div className="hidden sm:flex items-center">
            {scrolled && <LocaleSwitcher current={locale as any} />}
          </div>

          {/* DROPDOWN MENU */}
          {menuOpen && scrolled && (
            <div
              className="
                absolute left-0 top-16 w-64 rounded-2xl
                bg-black/95 border border-white/10
                shadow-xl px-5 py-4
                text-sm flex flex-col gap-3
              "
            >
              <Link
                href={link("#services")}
                onClick={closeMenu}
                className="opacity-80 hover:opacity-100"
              >
                Palvelut
              </Link>
              <Link
                href={link("#work")}
                onClick={closeMenu}
                className="opacity-80 hover:opacity-100"
              >
                Hinnasto
              </Link>
              <Link
                href={link("#contact")}
                onClick={closeMenu}
                className="opacity-80 hover:opacity-100"
              >
                Ota yhteyttä
              </Link>

              <div className="pt-3 border-t border-white/10">
                <LocaleSwitcher current={locale as any} />
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}
