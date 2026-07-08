import { motion } from 'framer-motion';
import { MapPin, Calendar, FileText, ExternalLink } from 'lucide-react';
import { TENDERS } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function TenderCard({ tender, index }: { tender: typeof TENDERS[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group rounded-3xl overflow-hidden bg-white border border-border/60 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={tender.image}
          alt={tender.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-brand text-white text-xs font-semibold rounded-full">
          Open for Bidding
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl">{tender.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <p className="text-gray-body text-sm leading-relaxed mb-6">{tender.description}</p>

        <div className="space-y-3">
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
          <a
            href={tender.drawingsLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-all"
          >
            <FileText className="w-4 h-4" />
            View Drawings
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal/5 text-charcoal text-sm font-semibold rounded-xl hover:bg-charcoal/10 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Submit Bid
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tenders() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);

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
            <TenderCard key={tender.title} tender={tender} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
