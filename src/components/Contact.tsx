import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ============================================================
// ⚙️ CONFIGURATION — UPDATE THESE WITH YOUR REAL DETAILS
// ============================================================

// 1. Get your free access key from https://web3forms.com
//    Enter the email where you want to RECEIVE form submissions
const WEB3FORMS_ACCESS_KEY = '8f61f16f-a841-47d5-b202-71924665d95c';

// 2. Your contact details
const COMPANY_INFO = {
  address: ['Abu Dhabi, United Arab Emirates', 'Office 123, Business Tower'],
  phones: ['+971 XX XXX XXXX', '+971 XX XXX XXXX'],
  emails: ['info@ubec.ae', 'projects@ubec.ae'],
  hours: ['Sun–Thu: 8:00 AM – 6:00 PM', 'Fri–Sat: Closed'],
  whatsapp: '971000000000', // Number without + or spaces
  googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463878.1610963!2d54.2471!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f723ef2b9%3A0xc1b301a2e1d4bf0!2sAbu%20Dhabi!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae',
};

// ============================================================

export default function Contact() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.1);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New UBEC Inquiry from ${formData.name}`,
          from_name: 'UBEC Website',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setErrorMessage('Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      setFormStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: COMPANY_INFO.address,
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: COMPANY_INFO.phones,
      links: COMPANY_INFO.phones.map(p => `tel:${p.replace(/\s/g, '')}`),
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: COMPANY_INFO.emails,
      links: COMPANY_INFO.emails.map(e => `mailto:${e}`),
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: COMPANY_INFO.hours,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-light relative overflow-hidden">
      <div className="absolute inset-0 animated-grid" />
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-brand/3 rounded-full blur-[120px] -translate-x-1/2" />

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
            <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Contact Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight"
          >
            Let's Build <span className="gradient-text">Together</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-body text-base sm:text-lg leading-relaxed"
          >
            Ready to start your project? Get in touch with our team for a free consultation.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={headerVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-border/40 hover:border-brand/20 transition-all">
                <div className="w-11 h-11 rounded-xl bg-brand/8 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal text-sm">{item.title}</h4>
                  {item.details.map((d, i) => (
                    item.links ? (
                      <a key={d} href={item.links[i]} className="block text-gray-body text-sm mt-0.5 hover:text-brand transition-colors">
                        {d}
                      </a>
                    ) : (
                      <p key={d} className="text-gray-body text-sm mt-0.5">{d}</p>
                    )
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20your%20engineering%20services.%20Can%20you%20please%20provide%20more%20information%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-semibold rounded-2xl hover:bg-[#20BD5A] transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border/40 h-48">
              <iframe
                src={COMPANY_INFO.googleMapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UBEC Office Location"
              />
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={headerVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-charcoal/5 border border-border/40">
              <h3 className="text-xl font-bold text-charcoal mb-6">Get a Free Consultation</h3>

              {/* Success Message */}
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-brand" />
                  </div>
                  <h4 className="text-xl font-bold text-charcoal">Thank You!</h4>
                  <p className="text-gray-body mt-2 max-w-sm">Your message has been sent successfully. We will get back to you within 24 hours.</p>
                </motion.div>

              /* Error Message */
              ) : formStatus === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h4 className="text-xl font-bold text-charcoal">Oops!</h4>
                  <p className="text-gray-body mt-2 max-w-sm">{errorMessage}</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-4 px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-all"
                  >
                    Try Again
                  </button>
                </motion.div>

              /* Form */
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-light border border-border/60 text-charcoal text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-gray-accent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-light border border-border/60 text-charcoal text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-gray-accent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-light border border-border/60 text-charcoal text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-gray-accent"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Service Required</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-light border border-border/60 text-charcoal text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all appearance-none"
                      >
                        <option value="">Select a service</option>
                        <option value="Architectural Design">Architectural Design</option>
                        <option value="Structural Engineering">Structural Engineering</option>
                        <option value="MEP Drawings">MEP Drawings</option>
                        <option value="Authority Approvals">Authority Approvals</option>
                        <option value="Project Management">Project Management</option>
                        <option value="Construction Supervision">Construction Supervision</option>
                        <option value="Interior Design">Interior Design</option>
                        <option value="BIM Modeling">BIM Modeling</option>
                        <option value="Quantity Surveying">Quantity Surveying</option>
                        <option value="Feasibility Studies">Feasibility Studies</option>
                        <option value="Renovation & Extension">Renovation & Extension</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Project Details</label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-light border border-border/60 text-charcoal text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all resize-none placeholder:text-gray-accent"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-dark transition-all text-sm hover:shadow-lg hover:shadow-brand/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Consultation Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
