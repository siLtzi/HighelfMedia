'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from '@/components/Logo';

gsap.registerPlugin(ScrollTrigger);

interface HeroContentProps {
  data: {
    title?: string; // e.g. "Silent North"
    subtitle?: string; // e.g. "Premium Media Production"
    imageUrl?: string;
    videoUrl?: string;
  };
}

export default function HeroContent({ data }: HeroContentProps) {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { title, subtitle, imageUrl, videoUrl } = data;
  const activeVideoSrc = videoUrl || '/video/heroBG.mp4';

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Select the groups we made in the Logo component
    const icon = '.logo-icon';
    const mainLetters = gsap.utils.toArray('.logo-main'); // H, I, G...
    const subLetters = gsap.utils.toArray('.logo-sub');   // M, E, D...

    // 1. Initial State
    gsap.set(videoRef.current, { opacity: 0 });
    
    // 2. Sequence
    
    // A. Video Fades In (Background)
    tl.to(videoRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut'
    })

    // B. The ICON (The Anchor)
    // Slides in from the left and fades up
    .fromTo(icon, 
      { x: -50, opacity: 0, scale: 0.9 },
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "power3.out" 
      }, 
      "-=1.5"
    )

    // C. "HIGHELF" (The Heavy Lifter)
    // Staggered slide-up from below. Looks masked.
    .fromTo(mainLetters, 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.0, 
        stagger: 0.08, // The ripple effect
        ease: "expo.out" 
      }, 
      "-=0.8"
    )

    // D. "MEDIA" (The Finisher)
    // Wide tracking snap. It starts with wide spacing and snaps tight.
    .fromTo(subLetters,
      { x: 20, opacity: 0 }, // Simple fade/slide for the group elements
      { 
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05, // Fast ripple
        ease: "power2.out"
      },
      "-=0.5"
    )

    // E. Subtitle / Hooks
    .from(textRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    }, "-=0.2");

    // Parallax
    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 150, 
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          poster={imageUrl} 
          className="h-full w-full object-cover"
        >
          <source src={activeVideoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center items-center pb-12 px-6">
        
        {/* LOGO */}
        <div className="w-full max-w-4xl mb-8">
           {/* Drop shadow helps against bright snowy backgrounds */}
           <Logo className="w-full h-auto drop-shadow-2xl text-white" /> 
        </div>
        
        {/* TEXT */}
        <div ref={textRef} className="text-center max-w-2xl opacity-100"> 
           <h1 className="sr-only">{title}</h1>
           {subtitle && (
             <p className="font-serif text-xl md:text-2xl text-neutral-300 font-light tracking-widest uppercase">
               {subtitle}
             </p>
           )}
        </div>
      </div>
    </section>
  );
}