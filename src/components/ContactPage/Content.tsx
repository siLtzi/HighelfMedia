'use client';

import { useRef, Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- TYPES ---
interface ContactPageContentProps {
  labels: {
    title: string;
    desc: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    helper: string;
  };
  info: {
    email: string;
    phone: string;
    location: string;
  };
  services?: {
    title: string;
    slug: string;
    packages: { name: string }[];
  }[];
}

// --- MAIN COMPONENT ---
export default function ContactPageContent(props: ContactPageContentProps) {
  // We wrap the logic in Suspense to prevent Next.js build errors with useSearchParams
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <ContactFormLogic {...props} />
    </Suspense>
  );
}

// --- LOGIC COMPONENT ---
function ContactFormLogic({ labels, info, services = [] }: ContactPageContentProps) {
  const container = useRef<HTMLElement>(null);
  
  // 1. Get the Service Slug from URL (e.g. ?service=wedding)
  const searchParams = useSearchParams();
  
  const [selectedService, setSelectedService] = useState<string>('other');
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  useEffect(() => {
    const serviceSlug = searchParams.get('service');
    const packageName = searchParams.get('package');

    if (serviceSlug) {
      // Check if the service exists in our list
      const foundService = services.find(s => s.slug === serviceSlug);
      if (foundService) {
        setSelectedService(serviceSlug);
        
        // If we have a package param, try to select it
        if (packageName) {
           const foundPackage = foundService.packages?.find(p => p.name === packageName);
           if (foundPackage) {
             setSelectedPackage(packageName);
           }
        }
      }
    }
  }, [searchParams, services]);

  useGSAP(() => {
    gsap.from('.contact-anim', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    });
  }, { scope: container });

  const currentService = services.find(s => s.slug === selectedService);

  return (
    <main 
      ref={container}
      className="w-full min-h-screen bg-neutral-950 text-white pt-32 pb-12 px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-32"
    >
      {/* LEFT COLUMN: Title & Details */}
      <div className="w-full md:w-1/3 pt-12">
        <h1 className="contact-anim text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8">
          {labels.title}
        </h1>
        
        <p className="contact-anim text-neutral-400 text-lg leading-relaxed mb-12 max-w-sm">
          {labels.desc}
        </p>
        
        <div className="flex flex-col gap-12">
          {info.email && (
            <div className="contact-anim">
              <h3 className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-4">
                 Email
              </h3>
              <a href={`mailto:${info.email}`} className="text-2xl hover:text-neutral-400 transition-colors">
                {info.email}
              </a>
            </div>
          )}

          {info.phone && (
            <div className="contact-anim">
              <h3 className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-4">
                 Phone
              </h3>
              <p className="text-xl">{info.phone}</p>
            </div>
          )}

          {info.location && (
            <div className="contact-anim">
              <h3 className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-4">
                 Studio
              </h3>
              <p className="text-xl">{info.location}</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: The Form */}
      <div className="contact-anim w-full md:w-2/3 bg-neutral-900/30 p-8 md:p-12 border border-white/5 rounded-sm h-fit">
        <form className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Name Field */}
             <div className="group">
                <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
                  {labels.name}
                </label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors" 
                />
             </div>

             {/* Email Field */}
             <div className="group">
                <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
                  {labels.email}
                </label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors" 
                />
             </div>
          </div>

          {/* Project Type Dropdown - AUTO SELECTED */}
          <div className="group">
             <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
               Aihe
             </label>
             <select 
               value={selectedService}
               onChange={(e) => {
                 setSelectedService(e.target.value);
                 setSelectedPackage('');
               }}
               className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors text-neutral-300"
             >
                <option className="bg-neutral-900" value="other">Muu</option>
                {services.map((service) => (
                  <option key={service.slug} className="bg-neutral-900" value={service.slug}>
                    {service.title}
                  </option>
                ))}
             </select>
          </div>

          {/* Package Dropdown - Shows only if service has packages */}
          {currentService && currentService.packages && currentService.packages.length > 0 && (
            <div className="group animate-in fade-in slide-in-from-top-2 duration-300">
               <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
                 Paketti
               </label>
               <select 
                 value={selectedPackage}
                 onChange={(e) => setSelectedPackage(e.target.value)}
                 className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors text-neutral-300"
               >
                  <option className="bg-neutral-900" value="">Valitse paketti</option>
                  {currentService.packages.map((pkg) => (
                    <option key={pkg.name} className="bg-neutral-900" value={pkg.name}>
                      {pkg.name}
                    </option>
                  ))}
               </select>
            </div>
          )}

          {/* Message Field */}
          <div className="group">
             <label className="block text-xs font-mono text-neutral-500 uppercase mb-2">
               {labels.message}
             </label>
             <textarea 
               rows={5} 
               className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors resize-none" 
               placeholder={labels.helper}
             />
          </div>

          <button className="self-start mt-4 border border-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
             {labels.submit}
          </button>
        </form>
      </div>
    </main>
  );
}