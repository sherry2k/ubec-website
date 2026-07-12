import { motion } from 'framer-motion';
import { PARTNERS } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Partners() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full mb-4">
            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Trusted Partners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">
            Authorities & <span className="gradient-text">Partners</span>
          </h2>
        </motion.div>

        {/* Partner Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center justify-center p-6 sm:p-8 rounded-2xl bg-gray-light border border-border/40 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 group"
            >
              <span className="text-gray-accent text-sm font-semibold text-center group-hover:text-brand transition-colors leading-tight">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
