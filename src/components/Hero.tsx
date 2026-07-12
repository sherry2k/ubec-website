import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { IMAGES } from '@/data/content';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 100, suffix: '%', label: 'Municipality Compliance' },
];

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const count = useCountUp(value, 2000, isVisible);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-white/60 text-xs sm:text-sm mt-1 font-medium tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="UAE Modern Architecture Skyline"
          className="w-full h-full object-cover scale-105"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(94,158,58,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(94,158,58,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-brand/10 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-1/3 left-1/6 w-40 h-40 border border-white/5 rounded-2xl rotate-45 animate-float-delayed" />
      <div className="absolute top-1/3 right-1/6 w-3 h-3 bg-brand/40 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-brand/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
              Engineering Tomorrow. Designing Excellence.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Engineering Vision.{' '}
            <span className="gradient-text">Building the Future.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl font-light"
          >
            Universal Building Engineering Consultants LLC delivers innovative architectural, structural, MEP, project management, and authority approval solutions across the UAE with precision, sustainability, and excellence.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#tenders"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-dark transition-all hover:shadow-2xl hover:shadow-brand/30 text-sm sm:text-base"
            >
              🟢 Tenders
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl">
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} delay={1 + i * 0.1} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
