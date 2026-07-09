import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// TikTok SVG icon component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.89a8.28 8.28 0 004.76 1.5V6.94a4.85 4.85 0 01-1-.25z"/>
    </svg>
  );
}

// Instagram SVG icon component
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

const services = [
  'Architectural Design',
  'Structural Engineering',
  'MEP Drawings',
  'Authority Approvals',
  'Project Management',
  'Construction Supervision',
  'Interior Design',
  'BIM Modeling',
];

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tenders', href: '#tenders' },
  { label: 'Application', href: '#application' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

// ============================================================
// ⚙️ UPDATE THESE WITH YOUR REAL SOCIAL MEDIA LINKS
// ============================================================
const socials = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/YOUR_USERNAME', label: 'Instagram' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@YOUR_USERNAME', label: 'TikTok' },
];

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-96 h-48 bg-brand/5 rounded-full blur-[100px] -translate-x-1/2" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(94,158,58,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(94,158,58,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative -mt-16 mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand to-brand-dark overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to Start Your Project?</h3>
              <p className="text-white/80 mt-2 text-sm sm:text-base">Get a free consultation from our engineering experts.</p>
            </div>
            <a
              href="#contact"
              className="shrink-0 px-8 py-4 bg-white text-brand font-bold rounded-2xl hover:bg-white/90 transition-all text-sm"
            >
              Get Free Proposal
            </a>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          {/* Company */}
          <div>
           <div className="flex items-center gap-3 mb-6">
  <img 
    src="/images/logo-white.png" 
    alt="UBEC Logo" 
    className="h-12 w-auto"
  />
              <div>
                <div className="text-white text-sm font-bold leading-tight">Universal Building</div>
                <div className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">Engineering Consultants</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              A multidisciplinary engineering consultancy delivering innovative architectural and engineering solutions across the UAE.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand flex items-center justify-center transition-all"
                >
                  <social.icon className="w-4 h-4 text-white/50 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-white/40 hover:text-brand text-sm transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 hover:text-brand text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm">Abu Dhabi, United Arab Emirates</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm">+971 2 6717121</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm">ubec27530@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <p className="text-white/30 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Universal Building Engineering Consultants LLC. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand flex items-center justify-center transition-all group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
