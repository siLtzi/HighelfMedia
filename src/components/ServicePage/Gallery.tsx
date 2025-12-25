'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryProps {
  gallery: any[];
  title?: string;
  loadMoreText?: string;
}

export default function ServiceGallery({ 
  gallery: rawGallery, 
  title = "Gallery", 
  loadMoreText = "Load More" 
}: GalleryProps) {
  const gallery = rawGallery || [];
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8); // Start with 8 images for 4-col grid

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, gallery.length));
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextImage, prevImage]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-12 text-center">
        {title}
      </h2>

      {/* --- GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {gallery.slice(0, visibleCount).map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => openLightbox(i)}
            className="relative aspect-[4/5] bg-neutral-900 cursor-pointer group overflow-hidden"
          >
            <Image
              src={urlForImage(img).url()}
              alt={`Gallery ${i}`}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* --- LOAD MORE BUTTON --- */}
      {visibleCount < gallery.length && (
        <div className="flex justify-center mt-16">
          <button 
            onClick={loadMore}
            className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="text-xs font-bold uppercase tracking-widest">{loadMoreText}</span>
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50"
            >
              <X size={32} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/50 font-mono text-sm tracking-widest z-50">
              {currentIndex + 1} / {gallery.length}
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-w-7xl max-h-[85vh]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
              >
                <Image
                  src={urlForImage(gallery[currentIndex]).url()}
                  alt="Gallery View"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full"
            >
              <ChevronLeft size={40} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
