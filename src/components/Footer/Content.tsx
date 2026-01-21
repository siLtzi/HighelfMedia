'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  label: string;
  url: string;
}

interface MenuLink {
  label: string;
  href: string;
}

interface FooterContentProps {
  locale: string;
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
  ctaText: string;
  startProjectLabel: string;
  uiLabels: {
    location: string;
    time: string;
    socials: string;
    menu: string;
    rights: string;
  };
  menuLinks: MenuLink[];
}

export default function FooterContent({ 
  locale,
  email, 
  phone, 
  location, 
  socials, 
  ctaText,
  startProjectLabel,
  uiLabels,
  menuLinks
}: FooterContentProps) {
  const container = useRef<HTMLElement>(null);
  const [time, setTime] = useState('');

  // 1. LIVE OULU TIME CLOCK
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Helsinki',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setTime(now.toLocaleTimeString('en-GB', options));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. GSAP ANIMATIONS
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    // Divider Line
    tl.from('.footer-line', {
      scaleX: 0,
      duration: 1.5,
      ease: 'power4.inOut',
      transformOrigin: 'left'
    });

    // Content Reveal
    tl.from('.footer-reveal', {
      y: 60,
      opacity: 0,
      duration: 1.0,
      stagger: 0.1,
      ease: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }, "-=1.0");

  }, { scope: container });

  return (
    <footer 
      ref={container} 
      className="relative bg-neutral-950 text-white min-h-[85vh] flex flex-col justify-between px-6 py-12 md:p-24 overflow-hidden"
    >
      {/* --- TOP SECTION: HEADLINE --- */}
      <div className="relative w-full">
        <div className="footer-line w-full h-[1px] bg-white/20 mb-12 md:mb-16" />

        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Main Hook */}
          <div className="overflow-hidden max-w-2xl">
            <h2 className="footer-reveal text-2xl md:text-4xl font-light tracking-wide leading-relaxed text-neutral-300">
              <span className="block text-neutral-500 mb-2 text-sm font-mono uppercase tracking-widest">
                Contact
              </span>
              {ctaText}
            </h2>
          </div>

          {/* CTA Button - REDESIGNED */}
          <div className="footer-reveal">
             <Link 
               // 3. USE IT HERE: Dynamic Locale Link
               href={`/${locale}/contact`}
               className="group inline-flex items-center gap-3 border border-white/30 px-8 py-4 hover:bg-white hover:border-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
             >
                <span className="uppercase tracking-widest text-xs font-bold text-white group-hover:text-neutral-950 transition-colors duration-500">
                  {startProjectLabel}
                </span>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 14 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white group-hover:text-neutral-950 transition-all duration-500 group-hover:translate-x-1"
                >
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </Link>
          </div>
        </div>
      </div>

      {/* --- MIDDLE SECTION: CLEANER EMAIL --- */}
      <div className="flex-grow flex flex-col justify-center items-center py-16 md:py-24">
        <a 
          href={`mailto:${email}`} 
          className="group relative inline-block z-10"
        >
          <span className="footer-reveal block text-[8vw] md:text-[6vw] font-bold tracking-tighter text-neutral-500 group-hover:text-white transition-colors duration-500 ease-out">
            {email}
          </span>
          <span className="absolute left-0 bottom-2 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left" />
        </a>
      </div>

      {/* --- BOTTOM SECTION: DETAILS --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-12 text-sm md:text-base">
        
        {/* Column 1: Location */}
        <div className="footer-reveal flex flex-col gap-2">
           <span className="text-xs font-mono uppercase text-neutral-500 tracking-widest mb-1">{uiLabels.location}</span>
           <p className="text-neutral-200">{location}</p>
        </div>

        {/* Column 2: Local Time */}
        <div className="footer-reveal flex flex-col gap-2">
           <span className="text-xs font-mono uppercase text-neutral-500 tracking-widest mb-1">{uiLabels.time}</span>
           <p className="text-neutral-200 font-mono">{time} (EET)</p>
        </div>

        {/* Column 3: Socials */}
        <div className="footer-reveal flex flex-col gap-2">
           <span className="text-xs font-mono uppercase text-neutral-500 tracking-widest mb-1">{uiLabels.socials}</span>
           <div className="flex flex-col gap-1">
             {socials.map((social, i) => (
               <a 
                 key={i}
                 href={social.url} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
               >
                 <span>{social.label}</span>
                 <svg 
                    width="10" 
                    height="10" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </a>
             ))}
           </div>
        </div>

        {/* Column 4: Menu */}
        <div className="footer-reveal flex flex-col gap-2 md:items-end">
           <span className="text-xs font-mono uppercase text-neutral-500 tracking-widest mb-1">{uiLabels.menu}</span>
           <div className="flex flex-col gap-1 md:items-end">
             {menuLinks.map((link, i) => (
               <Link 
                 key={i}
                 href={link.href} 
                 className="text-neutral-400 hover:text-white transition-colors"
               >
                 {link.label}
               </Link>
             ))}
             <span className="text-[10px] text-neutral-600 mt-4">{uiLabels.rights}</span>
           </div>
        </div>

      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/5 via-neutral-950/0 to-neutral-950/0 opacity-40" />
    </footer>
  );
}