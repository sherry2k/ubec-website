import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = ['All', 'Commercial', 'Residential Villa', 'Industrial', 'Mixed-use', 'Mosque'];
// Map each project type to its filter category
const categoryMap: Record<string, string> = {
  'Commercial Tower': 'Commercial',
  'Commercial Complex': 'Commercial',
  'Luxury Villa': 'Residential',
  'Mosque': 'Mosque',
  'Residential Community': 'Residential',
  'Industrial Facility': 'Industrial',
  'Mixed-use Development': 'Mixed-use',
  'Luxury Residences': 'Residential',
};
export default function Projects() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => categoryMap[p.type] === activeCategory);

  return (
    <section id="projects" className="py-24 md:py-32 bg-gray-light relative overflow-hidden">
      <div className="absolute inset-0 animated-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 rounded-full mb-6"
          >
            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Featured Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight"
          >
            Our <span className="gradient-text">Portfolio</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-body text-base sm:text-lg leading-relaxed"
          >
            A showcase of our diverse engineering projects across the UAE, from luxury modern villas to commercial towers.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand text-white shadow-lg shadow-brand/20'
                  : 'bg-white text-gray-body hover:text-charcoal hover:bg-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - Masonry-like */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
                  project.featured && i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  project.featured && i === 0 ? 'h-[500px]' : 'h-72 sm:h-80'
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Status badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-brand/90 text-white'
                        : 'bg-white/90 text-charcoal'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-white/70 text-xs font-medium mb-2">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                    <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">{project.title}</h3>
                    <p className="text-white/60 text-sm mb-3">{project.type}</p>

                    {/* Services tags */}
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.services.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium rounded-lg">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-0 rotate-45">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
