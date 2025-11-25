"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";

export default function Navbar({ locale }: { locale: string }) {
  const base = `/${locale}`;
  const link = (slug: string) => `${base}${slug}`;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when we scroll back to top
  useEffect(() => {
    if (!scrolled) setMenuOpen(false);
  }, [scrolled]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full
        text-zinc-50
        transition-colors duration-300
        ${
          scrolled
            ? "bg-black/85 border-b border-white/5"
            : // subtle gradient for readability, no hard bar
              "bg-gradient-to-b from-black/80 via-black/50 to-transparent"
        }
      `}
    >
      <Container>
        <nav className="relative flex h-16 items-center justify-between">
          {/* LEFT: hamburger (when scrolled) + logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger – only after scrolling, bigger and on the left */}
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((v) => !v)}
              className={`
                flex h-11 w-11 items-center justify-center
                rounded-full border border-white/18
                bg-black/80 text-white
                hover:bg-black
                transition-all duration-300
                ${
                  scrolled
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-75 -translate-y-1 pointer-events-none"
                }
              `}
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1.5">
                <span className="block h-[3px] w-5 rounded-full bg-current" />
                <span className="block h-[3px] w-5 rounded-full bg-current" />
                <span className="block h-[3px] w-5 rounded-full bg-current" />
              </div>
            </button>

            {/* Logo */}
            <Link href={base} className="flex items-center gap-2">
              <Image
                src="/Highelf.svg"
                alt="Highelf logo"
                width={120}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* FULL NAV (desktop) – fades out when scrolled */}
          <div
            className={`
              hidden sm:flex items-center gap-6 text-sm
              transition-all duration-300
              ${
                scrolled
                  ? "opacity-0 -translate-y-2 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }
            `}
          >
            <Link
              href={link("#services")}
              className="opacity-85 hover:opacity-100"
              onClick={handleNavClick}
            >
              Palvelut
            </Link>
            <Link
              href={link("#work")}
              className="opacity-85 hover:opacity-100"
              onClick={handleNavClick}
            >
              Hinnasto
            </Link>
            <Link
              href={link("#contact")}
              className="
                rounded-full bg-zinc-50 px-4 py-2 text-zinc-950 text-sm
                hover:bg-white transition
              "
              onClick={handleNavClick}
            >
              Ota yhteyttä
            </Link>
            <LocaleSwitcher current={locale as any} />
          </div>

          {/* Compact nav for mobile (top only) */}
          <div
            className={`
              flex sm:hidden items-center gap-3 text-xs
              transition-all duration-300
              ${
                scrolled
                  ? "opacity-0 -translate-y-2 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }
            `}
          >
            <Link
              href={link("#services")}
              className="opacity-85 hover:opacity-100"
              onClick={handleNavClick}
            >
              Palvelut
            </Link>
            <Link
              href={link("#contact")}
              className="rounded-full bg-zinc-50 px-3 py-1.5 text-[11px] text-zinc-950 hover:bg-white"
              onClick={handleNavClick}
            >
              Ota yhteyttä
            </Link>
          </div>

          {/* Right side: locale when scrolled (desktop) */}
          <div className="hidden sm:flex items-center">
            {scrolled && <LocaleSwitcher current={locale as any} />}
          </div>

          {/* Dropdown menu for hamburger */}
          {menuOpen && scrolled && (
            <div
              className="
                absolute left-0 top-14
                w-64 rounded-2xl border border-zinc-800
                bg-black/95
                shadow-xl
                px-4 py-4
                text-sm
              "
            >
              <div className="flex flex-col gap-2 text-left">
                <Link
                  href={link("#services")}
                  onClick={handleNavClick}
                  className="py-1.5 opacity-90 hover:opacity-100"
                >
                  Palvelut
                </Link>
                <Link
                  href={link("#work")}
                  onClick={handleNavClick}
                  className="py-1.5 opacity-90 hover:opacity-100"
                >
                  Hinnasto
                </Link>
                <Link
                  href={link("#contact")}
                  onClick={handleNavClick}
                  className="py-1.5 opacity-90 hover:opacity-100"
                >
                  Ota yhteyttä
                </Link>

                <div className="mt-3 border-t border-zinc-800 pt-3">
                  <LocaleSwitcher current={locale as any} />
                </div>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}
