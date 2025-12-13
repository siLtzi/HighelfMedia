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
  const menuRef = useRef<HTMLDivElement>(null); // Ref for mobile menu overlay
  const pathname = usePathname();
  const router = useRouter();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSwitchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsMobileMenuOpen(false); // Close menu on switch
  };

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Initial Nav Reveal Animation
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5 
    });
  }, { scope: navRef });

  // Mobile Menu Animation Logic
  useGSAP(() => {
    if (isMobileMenuOpen) {
      const tl = gsap.timeline();
      
      // 1. Reveal Background
      tl.to(menuRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power4.inOut',
        display: 'flex'
      })
      // 2. Stagger Text Reveal
      .from('.mobile-nav-link', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      }, "-=0.2");
      
    } else {
      // Close Animation
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power4.inOut',
        display: 'none'
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 px-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md transition-[padding,background-color] duration-300 ease-in-out ${
          isScrolled ? 'py-3 bg-black/80' : 'py-4 bg-black/10'
        }`}
      >
        <Link href={`/${locale}`} className="group relative block shrink-0 z-50">
          <img 
            src="/image/HighelfLogoIcon.svg" 
            alt="Highelf Media" 
            className={`w-auto object-contain transition-all duration-300 ease-in-out group-hover:scale-105 ${
              isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'
            }`}
          />
        </Link>

        {/* DESKTOP MENU (Hidden on Mobile) */}
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

        <div className="flex items-center gap-6 md:gap-8 z-50">
          {/* DESKTOP LOCALE SWITCHER */}
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
          
          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-[6px] p-2 group justify-center items-end z-50"
            aria-label="Toggle Menu"
          >
             {/* Top Line: Rotates 45deg when open */}
             <span className={`h-[2px] bg-white transition-all duration-300 origin-center ${
               isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-8'
             }`} />
             
             {/* Middle Line: Fades out when open */}
             <span className={`h-[2px] bg-white transition-all duration-300 ${
               isMobileMenuOpen ? 'w-0 opacity-0' : 'w-6'
             }`} />

             {/* Bottom Line: Rotates -45deg when open */}
             <span className={`h-[2px] bg-white transition-all duration-300 origin-center ${
               isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-4'
             }`} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-40 bg-neutral-950 flex-col justify-center items-center gap-12 hidden"
      >
         {/* Mobile Links */}
         <div className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link text-3xl font-light uppercase tracking-widest text-white hover:text-neutral-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
         </div>

         <div className="w-12 h-[1px] bg-white/10 mobile-nav-link" />

         {/* Mobile Locale & CTA */}
         <div className="flex flex-col items-center gap-8 mobile-nav-link">
             <div className="flex items-center gap-6 text-sm font-mono uppercase tracking-widest text-neutral-500">
                <button 
                  onClick={() => handleSwitchLocale('fi')}
                  className={`${locale === 'fi' ? 'text-white border-b border-white' : ''} pb-1`}
                >
                  Finnish
                </button>
                <button 
                  onClick={() => handleSwitchLocale('en')}
                  className={`${locale === 'en' ? 'text-white border-b border-white' : ''} pb-1`}
                >
                  English
                </button>
             </div>

             <Link 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border border-white/30 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white"
             >
                {ctaLabel}
             </Link>
         </div>
      </div>
    </>
  );
}