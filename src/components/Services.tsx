import { motion } from 'framer-motion';
import {
  Building2, Columns3, Zap, ShieldCheck, ClipboardList, HardHat,
  Palette, Box, Calculator, BarChart3, RefreshCw
} from 'lucide-react';
import { SERVICES } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Columns3, Zap, ShieldCheck, ClipboardList, HardHat,
  Palette, Box, Calculator, BarChart3, RefreshCw,
};

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const IconComponent = iconMap[service.icon] || Building2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-border/60 hover:border-brand/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand/5 cursor-pointer"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-brand/8 flex items-center justify-center group-hover:bg-brand group-hover:scale-110 transition-all duration-500">
          <IconComponent className="w-6 h-6 text-brand group-hover:text-white transition-colors duration-500" />
        </div>

        <h3 className="mt-6 text-lg font-bold text-charcoal group-hover:text-brand transition-colors duration-300">
          {service.title}
        </h3>

        <p className="mt-3 text-gray-body text-sm leading-relaxed">
          {service.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-brand text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          Learn More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);

  return (
    <section id="services" className="py-24 md:py-32 bg-gray-light relative overflow-hidden">
      <div className="absolute inset-0 animated-grid" />

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
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Our Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight"
          >
            Comprehensive Engineering{' '}
            <span className="gradient-text">Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-body text-base sm:text-lg leading-relaxed"
          >
            From initial concept to final completion, we deliver end-to-end engineering and architectural services tailored to your project requirements.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
