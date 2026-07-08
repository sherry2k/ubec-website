import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUp, Globe, Share2, MessageSquare, Link2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  { label: 'Blog & Insights', href: '#insights' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

const socials = [
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: Share2, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: MessageSquare, href: '#', label: 'Twitter' },
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
