'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoContentProps {
  heading: string;
  statement: string;
}

export default function ManifestoContent({ heading, statement }: ManifestoContentProps) {
  const container = useRef<HTMLDivElement>(null);
  const lines = statement.split('.').filter(line => line.trim().length > 0);

  useGSAP(() => {
    // Reveal animations remain the same, they are solid
    gsap.from('.manifesto-heading', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.manifesto-line-inner', {
      scrollTrigger: {
        trigger: '.manifesto-body',
        start: 'top 75%',
      },
      yPercent: 100,
      duration: 1.2,
      stagger: 0.15,
      ease: 'expo.out',
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full bg-neutral-950 py-32 px-6 md:py-48 flex flex-col items-center justify-center z-20"
    >
      <div className="max-w-4xl w-full">
        
        {/* HEADLINE - Replaced Orange border with White/Neutral */}
        <div className="overflow-hidden mb-16">
           <h2 className="manifesto-heading text-neutral-400 text-sm md:text-base font-mono uppercase tracking-[0.2em] border-l-2 border-white pl-6">
             {heading}
           </h2>
        </div>

        {/* STATEMENT BODY */}
        <div className="manifesto-body space-y-2 md:space-y-4">
          {lines.map((line, index) => (
            <div key={index} className="overflow-hidden">
              <p className="manifesto-line-inner text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight transform-gpu">
                {line.trim()}.
              </p>
            </div>
          ))}
        </div>

        {/* SEPARATOR - kept subtle */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-32" />
      </div>
    </section>
  );
}