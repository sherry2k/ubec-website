import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Download, ExternalLink, X, ZoomIn, Lock } from 'lucide-react';
import { TENDERS } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function TenderCard({ tender, index, onImageClick }: { tender: typeof TENDERS[0]; index: number; onImageClick: (image: string, title: string) => void }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group rounded-3xl overflow-hidden bg-white border border-border/60 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500"
    >
      {/* Image - Clickable */}
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={() => onImageClick(tender.image, tender.title)}
      >
        <img
          src={tender.image}
          alt={tender.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className={`absolute top-4 right-4 px-3 py-1.5 text-white text-xs font-semibold rounded-full ${
          tender.status === 'closed' ? 'bg-gray-accent' : 'bg-brand'
        }`}>
          {tender.status === 'closed' ? 'Bidding Closed' : 'Open for Bidding'}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl">{tender.title}</h3>
        </div>

        {/* Zoom icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <p className="text-gray-body text-sm leading-relaxed mb-6">{tender.description}</p>

        <div className="space-y-3">
          <p className="text-base font-medium text-gray-body/70 uppercase tracking-wide">{tender.projectName}</p>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-brand shrink-0" />
            <span className="text-charcoal font-medium">{tender.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-brand shrink-0" />
            <span className="text-charcoal font-medium">
              Submission: {new Date(tender.submissionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-3">
          {tender.status === 'closed' ? (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-accent/15 text-gray-accent text-sm font-semibold rounded-xl cursor-not-allowed">
              <Lock className="w-4 h-4" />
              Bidding Closed
            </div>
          ) : (
            <>
              <a
                href={tender.drawingsLink}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-all"
              >
                <Download className="w-4 h-4" />
                Download Drawings
              </a>
             
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Tenders() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);

  const openLightbox = (image: string, title: string) => {
    setLightbox({ image, title });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="tenders" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand/3 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full mb-6"
          >
            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Active Tenders</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight"
          >
            Open <span className="gradient-text">Tenders</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-body text-base sm:text-lg leading-relaxed"
          >
            Explore our current projects open for contractor bidding. Download drawings and submit your competitive proposals.
          </motion.p>
        </div>

        {/* Tenders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TENDERS.map((tender, i) => (
            <TenderCard key={tender.title} tender={tender} index={i} onImageClick={openLightbox} />
          ))}
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
                alt={lightbox.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-lg sm:text-xl">{lightbox.title}</h3>
                <p className="text-white/50 text-sm mt-1">Click outside or press ✕ to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
