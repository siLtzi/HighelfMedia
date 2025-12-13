'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarContentProps {
  locale: string;
  links: NavLink[];
  ctaLabel: string;
}

export default function NavbarContent({ 
  locale, 
  links, 
  ctaLabel 
}: NavbarContentProps) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSwitchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // This animation was fighting with 'transition-all'
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5 
    });
  }, { scope: navRef });

  return (
    <nav 
      ref={navRef}
      // FIX 1: Changed 'transition-all' to 'transition-[padding,background-color]'
      // This ensures CSS animates the shrinking padding/color, but leaves the POSITION (y) to GSAP.
      className={`fixed top-0 left-0 w-full z-50 px-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md transition-[padding,background-color] duration-300 ease-in-out ${
        isScrolled ? 'py-3 bg-black/80' : 'py-4 bg-black/10'
      }`}
    >
      <Link href={`/${locale}`} className="group relative block shrink-0">
        <img 
          src="/image/HighelfLogoIcon.svg" 
          alt="Highelf Media" 
          // FIX 2: Keep transition-all here (GSAP doesn't touch the image, so it's safe)
          className={`w-auto object-contain transition-all duration-300 ease-in-out group-hover:scale-105 ${
            isScrolled ? 'h-12' : 'h-16'
          }`}
        />
      </Link>

      <div className="hidden md:flex items-center gap-10 lg:gap-16 absolute left-1/2 transform -translate-x-1/2">
        {links.map((link) => (
          <Link 
            key={link.label} 
            href={link.href}
            className="relative text-sm font-medium tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-300 group"
          >
            {link.label}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6 md:gap-8">
        <div className="hidden md:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <button 
            onClick={() => handleSwitchLocale('fi')}
            className={`hover:text-white transition-colors ${locale === 'fi' ? 'text-white font-bold' : ''}`}
          >
            FI
          </button>
          <span className="opacity-30">/</span>
          <button 
            onClick={() => handleSwitchLocale('en')}
            className={`hover:text-white transition-colors ${locale === 'en' ? 'text-white font-bold' : ''}`}
          >
            EN
          </button>
        </div>

        <Link 
          href="#contact" 
          className={`hidden md:block border border-white/30 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 ${
            isScrolled ? 'px-5 py-2' : 'px-6 py-3'
          }`}
        >
          {ctaLabel}
        </Link>
        
        <button className="md:hidden flex flex-col gap-2 p-2 group justify-center items-end">
           <span className="w-8 h-[2px] bg-white transition-all group-hover:w-10" />
           <span className="w-5 h-[2px] bg-white transition-all group-hover:w-10" />
        </button>

      </div>
    </nav>
  );
}