import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ============================================================
// ⚙️ ABOUT SECTION IMAGES — No faces, design/conceptual only
// Replace with your own images:
//   Upload to public/images/about/ and use '/images/about/...'
// ============================================================
const ABOUT_IMAGES = {
  // Main: Detailed architectural floor plan / drawing
  main: '/images/about/about.png',
  // Secondary: 3D rendered modern villa exterior
  secondary: '/images/about/about-1.jpg',
};

const highlights = [
  'Professional Expertise & Qualified Engineers',
  'Innovation-Driven Design Solutions',
  'Sustainable & Compliant Development',
  'Client-First Approach',
  '10+ Years Serving the UAE',
  'Full-Service Engineering Consultancy',
];

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/3 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/2 rounded-full blur-[80px]" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={ABOUT_IMAGES.main}
                  alt="Architectural floor plan and design drawings"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-56 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={ABOUT_IMAGES.secondary}
                  alt="Drafting tools and conceptual design workspace"
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-brand/20 rounded-2xl" />
              <div className="absolute -bottom-4 left-1/3 w-16 h-16 bg-brand/10 rounded-xl -z-10" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-brand rounded-full" />
              <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              Engineering Excellence,{' '}
              <span className="gradient-text">Trusted Partnerships</span>
            </h2>

            <p className="mt-6 text-gray-body leading-relaxed text-base sm:text-lg">
              Universal Building Engineering Consultants LLC is a multidisciplinary engineering consultancy based in the UAE, delivering innovative architectural and engineering solutions for residential, commercial, industrial, and government projects.
            </p>

            <p className="mt-4 text-gray-body leading-relaxed">
              We specialize in transforming ideas into sustainable, compliant, and high-quality developments while ensuring excellence in design, planning, and execution. Our team of qualified architects, engineers, and project managers brings unmatched expertise to every engagement.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-charcoal font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-charcoal text-white font-semibold rounded-2xl hover:bg-charcoal/90 transition-all text-sm"
              >
                Explore Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
