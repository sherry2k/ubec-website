import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categoryColors: Record<string, string> = {
  Regulations: 'bg-brand/10 text-brand',
  Sustainability: 'bg-emerald-50 text-emerald-700',
  Innovation: 'bg-violet-50 text-violet-700',
  Permits: 'bg-amber-50 text-amber-700',
};

function BlogCard({ post, index }: { post: typeof BLOG_POSTS[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-3xl overflow-hidden bg-white border border-border/60 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-500 cursor-pointer"
    >
      {/* Gradient bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand via-brand-light to-brand-dark" />

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 text-[11px] font-semibold rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-gray-accent text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-lg font-bold text-charcoal group-hover:text-brand transition-colors leading-snug">
          {post.title}
        </h3>

        <p className="mt-3 text-gray-body text-sm leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-gray-accent">{post.date}</span>
          <div className="w-8 h-8 rounded-lg bg-gray-light group-hover:bg-brand flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4 text-gray-accent group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);

  return (
    <section id="insights" className="py-24 md:py-32 bg-white relative overflow-hidden">
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
            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Blog & Insights</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight"
          >
            Engineering <span className="gradient-text">Insights</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-body text-base sm:text-lg leading-relaxed"
          >
            Stay updated with the latest in UAE building regulations, sustainable design, and engineering innovations.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
