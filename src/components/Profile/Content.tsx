'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: string;
}

interface ProfileContentProps {
  heading: string;
  name: string;
  bio: string;
  stats: Stat[];
  imageUrl?: string;
}

export default function ProfileContent({ 
  heading, 
  name, 
  bio, 
  stats, 
  imageUrl = "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1587&auto=format&fit=crop" 
}: ProfileContentProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Standard triggers for content reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%', 
      }
    });

    tl.to('.profile-curtain', {
      height: 0,
      duration: 0.8,
      ease: 'power4.inOut'
    })
    .from('.profile-image', {
      scale: 1.1,
      duration: 1.0,
      ease: 'power2.out'
    }, "<");

    tl.from('.profile-text-element', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    }, "-=0.4");

  }, { scope: container });

  return (
    <div 
      ref={container}
      // ✅ MAGIC FIX:
      // 1. z-50: Ensures this is on TOP of the sticky section (z-0)
      // 2. -mt-[100vh]: Pulls this entire section UP into the previous section's space.
      //    Since the previous section is sticky, this creates the "Slide Over" effect perfectly.
      className="relative z-50 -mt-[100vh] w-full min-h-screen pointer-events-none md:pointer-events-auto"
    >
      <section 
        className="w-full min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row shadow-[0_-50px_100px_rgba(0,0,0,0.8)] pointer-events-auto"
      >
        {/* LEFT: IMAGE COLUMN */}
        <div className="relative w-full md:w-1/2 h-[60vh] md:h-auto overflow-hidden group bg-neutral-950">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="profile-image object-contain grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          />
          <div className="profile-curtain absolute inset-0 bg-neutral-950 z-20 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-20 z-10" />
        </div>

        {/* RIGHT: TEXT COLUMN */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-20 md:p-24 bg-neutral-950 border-l border-white/5">
          <h2 className="profile-text-element text-neutral-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 border-l border-white pl-4">
            {heading}
          </h2>

          <h3 className="profile-text-element text-4xl md:text-6xl font-bold uppercase leading-none tracking-tight mb-8">
            {name}
          </h3>

          <p className="profile-text-element text-neutral-400 text-lg md:text-xl leading-relaxed max-w-md mb-12">
            {bio}
          </p>

          <div className="profile-text-element grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="profile-text-element mt-16 opacity-50">
            <span className="font-serif italic text-2xl">Highelf.</span>
          </div>
        </div>
      </section>
    </div>
  );
}