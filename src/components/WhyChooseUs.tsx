import { motion } from 'framer-motion';
import {
  Users, Award, Lightbulb, Leaf, Clock, Globe, TrendingDown, Headphones
} from 'lucide-react';
import { WHY_CHOOSE_US } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Award, Lightbulb, Leaf, Clock, Globe, TrendingDown, HeadphonesIcon: Headphones,
};

function FeatureCard({ feature, index }: { feature: typeof WHY_CHOOSE_US[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const IconComponent = iconMap[feature.icon] || Users;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand/40 hover:bg-white/10 transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-xl bg-brand/15 flex items-center justify-center group-hover:bg-brand group-hover:scale-110 transition-all duration-500">
        <IconComponent className="w-5 h-5 text-brand group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="mt-5 text-white font-bold text-base">{feature.title}</h3>
      <p className="mt-2 text-white/50 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand/3 rounded-full blur-[120px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(94,158,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(94,158,58,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 rounded-full mb-6"
          >
            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Why Choose Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            The <span className="gradient-text">UBEC</span> Advantage
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-white/50 text-base sm:text-lg leading-relaxed"
          >
            What sets us apart as a leading engineering consultancy in the UAE.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CHOOSE_US.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
