"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname() || "/";
  const base = `/${locale}`;

  const link = (slug: string) => `${base}${slug}`;

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-white/40 backdrop-blur-md dark:bg-black/30">
      <Container>
        <nav className="flex h-14 items-center justify-between">
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
          <div className="flex items-center gap-6 text-sm">
            <Link
              href={link("#services")}
              className="opacity-80 hover:opacity-100"
            >
              Services
            </Link>
            <Link href={link("#work")} className="opacity-80 hover:opacity-100">
              Portfolio
            </Link>
            <Link
              href={link("#contact")}
              className="rounded-full bg-black px-4 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              Contact
            </Link>
            <LocaleSwitcher current={locale as any} />
          </div>
        </nav>
      </Container>
    </header>
  );
}
