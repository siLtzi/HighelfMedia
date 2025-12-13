"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  link: string;
}

interface SelectedWorksContentProps {
  title: string;
  projects: Project[];
}

export default function SelectedWorksContent({
  title,
  projects,
}: SelectedWorksContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const getScrollDistance = () => {
      return track.scrollWidth - window.innerWidth + 100;
    };

    // ANIMATION LOGIC:
    // We want the horizontal scroll to finish EARLY.
    // The container is 300vh tall.
    // We set 'end' to 'center center'. 
    // This means the horizontal scroll finishes when you are halfway through the section.
    // The remaining half is purely for the next section to overlap comfortably.
    gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: container,     
        start: "top top",       
        end: "center center",   // ✅ CHANGED: Finishes early (at 50% scroll)
        scrub: 1,               
        invalidateOnRefresh: true,
      },
    });

  }, { scope: containerRef });

  return (
    // TALL WRAPPER (300vh)
    // This provides enough space for:
    // 1. The Horizontal Scroll (First ~150vh)
    // 2. The Static Hold while Profile slides over (Remaining ~150vh)
    <div 
      ref={containerRef} 
      className="relative z-0 h-[400vh] bg-neutral-900"
    >
      {/* STICKY CONTENT */}
      <section
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute top-12 left-6 md:left-12 z-10 mix-blend-difference text-white">
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] border-l-2 border-white/50 pl-4 opacity-80">
            {title}
          </h2>
        </div>

        <div
          ref={trackRef}
          className="flex items-center px-6 md:px-12 w-max h-[70vh] md:h-[80vh] mt-12 gap-4 md:gap-8"
        >
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={project.link}
              className="group relative h-full w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 block overflow-hidden bg-neutral-950"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000" />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col justify-end items-start">
                <div className="overflow-hidden mb-4">
                  <span className="inline-block px-3 py-1 bg-white text-neutral-950 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-75">
                  {project.title}
                </h3>
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-100">
                  <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white border-b border-white/50 pb-1 group-hover:border-white transition-colors">
                    Explore {project.category}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                      <path d="M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M6 1L11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="absolute top-4 right-6 pointer-events-none mix-blend-overlay">
                <span className="text-8xl font-bold text-white/10 group-hover:text-white/30 transition-colors duration-1000">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </Link>
          ))}

          <Link 
            href="/palvelut" 
            className="group relative h-full w-[85vw] md:w-[30vw] flex-shrink-0 bg-neutral-800 flex flex-col justify-center items-center border-l border-white/5 hover:bg-neutral-800/80 transition-colors duration-500"
          >
            <div className="text-center">
              <span className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-4">
                All Services
              </span>
              <span className="text-3xl md:text-4xl text-white font-bold uppercase tracking-tight group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] block">
                View All <br /> Categories
              </span>
              <div className="mt-8 flex justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                 <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                 </div>
              </div>
            </div>
          </Link>
          <div className="w-12 shrink-0" />
        </div>
      </section>
    </div>
  );
}