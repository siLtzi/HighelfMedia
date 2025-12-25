'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { urlForImage } from '@/sanity/lib/image';

interface Service {
  title: string;
  slug: string;
  description: string;
  heroImage: any;
}

interface ServicesListContentProps {
  services: Service[];
  title: string;
  locale: string;
  exploreText: string;
}

export default function ServicesListContent({ services, title, locale, exploreText }: ServicesListContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Title Reveal
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    );

    // 2. Grid Items Stagger
    // We select the direct children of the grid
    const cards = gridRef.current?.children;
    if (cards) {
      tl.fromTo(cards,
        { y: 100, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          stagger: 0.1 
        },
        "-=0.8" // Overlap with title animation
      );
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col pt-32 pb-24 px-6 md:px-12 lg:px-24">
      
      <h1 
        ref={titleRef}
        className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-12 md:mb-16 text-center opacity-0"
      >
        {title}
      </h1>

      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 flex-grow"
      >
        {services.map((service) => (
          <Link 
            key={service.slug} 
            href={`/${locale}/palvelut/${service.slug}`}
            className="group block relative w-full h-full min-h-[300px] md:min-h-[400px] overflow-hidden bg-neutral-900 border border-white/10 opacity-0"
          >
            {service.heroImage && (
              <Image
                src={urlForImage(service.heroImage).url()}
                alt={service.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h2>
              <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                 <p className="text-sm text-neutral-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {service.description}
                </p>
              </div>
              {/* Simple arrow or indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <span className="text-xs font-mono uppercase tracking-widest border-b border-white/50 pb-1">
                  {exploreText}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
