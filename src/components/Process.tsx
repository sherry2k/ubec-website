import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function ProcessStep({ step, index }: { step: typeof PROCESS_STEPS[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative flex items-start gap-6 md:gap-8"
    >
      {/* Timeline line & dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-500 ${
          isVisible ? 'bg-brand text-white shadow-lg shadow-brand/30 scale-100' : 'bg-gray-light text-gray-accent scale-90'
        }`}>
          {step.step}
        </div>
        {index < PROCESS_STEPS.length - 1 && (
          <div className="w-0.5 h-16 sm:h-20 bg-gradient-to-b from-brand/30 to-border mt-3" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 sm:pb-16 pt-1">
        <h3 className="text-lg sm:text-xl font-bold text-charcoal">{step.title}</h3>
        <p className="mt-2 text-gray-body text-sm leading-relaxed max-w-lg">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);

  return (
    <section id="process" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/3 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Header */}
          <div ref={headerRef} className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full mb-6"
            >
              <div className="w-1.5 h-1.5 bg-brand rounded-full" />
              <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Our Process</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight"
            >
              Engineering{' '}
              <span className="gradient-text">Process</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-gray-body text-base sm:text-lg leading-relaxed"
            >
              Our proven 7-step methodology ensures every project is delivered with precision, quality, and transparency from inception to completion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-dark transition-all text-sm hover:shadow-lg hover:shadow-brand/20"
              >
                Start Your Project
              </a>
            </motion.div>
          </div>

          {/* Right - Timeline */}
          <div>
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
