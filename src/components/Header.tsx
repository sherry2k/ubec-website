import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '@/data/content';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
<a href="#home" onClick={() => handleNavClick('#home')} className="flex items-center gap-2 sm:gap-3 group">
              <img 
                src="/images/logo.png" 
                alt="UBEC Logo" 
                className="h-10 sm:h-12 w-auto group-hover:scale-105 transition-transform shrink-0"
              />
              <div>
                <div className={`text-xs sm:text-sm font-bold leading-tight tracking-tight transition-colors ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
                  Universal Building
                </div>
                <div className={`text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors ${isScrolled ? 'text-gray-accent' : 'text-white/70'}`}>
                  Engineering Consultants
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors rounded-lg ${
                    activeSection === link.href.replace('#', '')
                      ? isScrolled ? 'text-brand' : 'text-white'
                      : isScrolled ? 'text-charcoal/70 hover:text-charcoal' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+971502753085"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  isScrolled
                    ? 'text-charcoal hover:text-brand'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                +971 50 2753085
              </a>
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden lg:block px-5 py-2.5 bg-brand text-white text-[13px] font-semibold rounded-xl hover:bg-brand-dark transition-all hover:shadow-lg hover:shadow-brand/20"
              >
                FREE PROPOSAL
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors ${
                  isScrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left px-4 py-3.5 text-lg font-medium rounded-xl transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-brand bg-brand/5'
                      : 'text-charcoal hover:bg-gray-light'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-8 pt-8 border-t border-border">
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-dark transition-all"
              >
                Get Free Proposal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
