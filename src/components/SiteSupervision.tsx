import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, HardHat } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ============================================================
// ⚙️ REPLACE THESE WITH YOUR REAL SITE SUPERVISION PHOTOS
// Upload images to public/images/supervision/ folder
// Then use paths like '/images/supervision/photo-1.jpg'
// ============================================================

const SITE_PHOTOS = [
  {
    image: '/images/supervision/photo-1.jpeg',
    caption: 'Structural inspection during construction phase',
    size: 'large',   // large = spans 2 columns
  },
  {
    image: '/images/supervision/photo-2.jpeg',
    caption: 'Engineers reviewing site progress at finishing stage',
    size: 'small',
  },
  {
    image: '/images/supervision/photo-3.jpeg',
    caption: 'Quality control assessment on site',
    size: 'small',
  },
  {
    image: '/images/supervision/photo-4.jpeg',
    caption: 'Blueprint verification at project location',
    size: 'small',
  },
  {
    image: '/images/supervision/photo-5.jpeg',
    caption: 'Construction progress documentation',
    size: 'small',
  },
  {
    image: '/images/supervision/photo-6.jpeg',
    caption: 'Team coordination while slab casting',
    size: 'large',
  },
  {
    image: '/images/supervision/photo-7.jpeg',
    caption: 'Construction progress documentation',
    size: 'small',
  },
  {
    image: '/images/supervision/photo-8.jpeg',
    caption: 'Construction progress documentation',
    size: 'small',
  },
];

// ============================================================

export default function SiteSupervision() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.1);
  const [lightbox, setLightbox] = useState<{ image: string; caption: string } | null>(null);

  const openLightbox = (image: string, caption: string) => {
    setLightbox({ image, caption });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  return (
    <section className="py-24 md:py-32 bg-gray-light relative overflow-hidden">
      <div className="absolute inset-0 animated-grid" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand/3 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full mb-6"
          >
            <HardHat className="w-3.5 h-3.5 text-brand" />
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Site Supervision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight"
          >
            On-Site <span className="gradient-text">Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-body text-base sm:text-lg leading-relaxed"
          >
            Our engineers provide rigorous on-site supervision ensuring construction quality, safety compliance, and adherence to approved designs and specifications.
          </motion.p>
        </div>

        {/* Photo Gallery — Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {SITE_PHOTOS.map((photo, i) => {
            const { ref, isVisible } = useScrollAnimation(0.05);

            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  photo.size === 'large' ? 'col-span-2 h-56 sm:h-72' : 'h-48 sm:h-56'
                }`}
                onClick={() => openLightbox(photo.image, photo.caption)}
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center gap-3 translate-y-4 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white text-xs sm:text-sm font-medium text-center px-4 max-w-[200px]">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                {/* Bottom gradient always visible */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-charcoal/30 to-transparent opacity-0 group-hover:opacity-0 sm:opacity-100 sm:group-hover:opacity-0 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Dark backdrop */}
            <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-lg sm:text-xl">{lightbox.caption}</h3>
                <p className="text-white/50 text-sm mt-1">Click outside or press ✕ to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
