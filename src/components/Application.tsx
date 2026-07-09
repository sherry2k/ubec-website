import { motion } from 'framer-motion';
import { Smartphone, Star, Shield, Bell, FileCheck, ClipboardList } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ============================================================
// ⚙️ CONFIGURATION — UPDATE THESE WITH YOUR REAL LINKS
// ============================================================

const APP_CONFIG = {
  // Replace with your actual App Store & Play Store links
  appStoreLink: 'https://apps.apple.com/us/app/universal-consultant/id6745930257',
  playStoreLink: 'https://consys.me/download.php?app=android_ubec',

  // Replace with your actual app screenshot images
  // Upload to public/images/ folder and use paths like '/images/app-screen-1.png'
  appScreenshots: [
    '/images/projects/app-screen-1.png',
    '/images/projects/app-screen-2.png',
    
  ],
};

// ============================================================

const features = [
  {
    icon: FileCheck,
    title: 'Track Your Project',
    description: 'Real-time updates on project progress, milestones, and timelines.',
  },
  {
    icon: ClipboardList,
    title: 'View Tender Status',
    description: 'Submit bids and track tender status directly from your phone.',
  },
  {
    icon: Bell,
    title: 'Instant Notifications',
    description: 'Get notified about approvals, deadlines, and project updates.',
  },
  {
    icon: Shield,
    title: 'Secure Documents',
    description: 'Access drawings, reports, and approvals securely anytime, anywhere.',
  },
];

export default function Application() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.1);
  const { ref: phonesRef, isVisible: phonesVisible } = useScrollAnimation(0.1);

  return (
    <section id="application" className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(94,158,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(94,158,58,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — Content */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 rounded-full mb-6"
            >
              <Smartphone className="w-3.5 h-3.5 text-brand" />
              <span className="text-brand text-xs font-semibold uppercase tracking-[0.15em]">Mobile Application</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Your Projects,{' '}
              <span className="gradient-text">In Your Pocket</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-white/60 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              Download the UBEC mobile app to track your projects, view tender updates, access documents, and stay connected with our engineering team — all from your smartphone.
            </motion.p>

            {/* App features */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={headerVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/8 hover:border-brand/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand/15 flex items-center justify-center shrink-0 group-hover:bg-brand transition-all duration-300">
                    <feature.icon className="w-4 h-4 text-brand group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                    <p className="text-white/40 text-xs mt-1 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {/* App Store Button */}
              <a
                href={APP_CONFIG.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white text-charcoal rounded-2xl hover:bg-white/90 transition-all hover:shadow-xl hover:shadow-white/10"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.82 11.78 5.72 12.57 5.72C13.36 5.72 14.85 4.62 16.4 4.8C17.04 4.83 18.83 5.06 19.97 6.7C19.87 6.77 17.64 8.07 17.67 10.82C17.7 14.09 20.49 15.17 20.53 15.18C20.49 15.28 20.05 16.85 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] font-medium text-gray-accent uppercase tracking-wider leading-none">Download on the</div>
                  <div className="text-lg font-bold leading-tight -mt-0.5">App Store</div>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href={APP_CONFIG.playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white text-charcoal rounded-2xl hover:bg-white/90 transition-all hover:shadow-xl hover:shadow-white/10"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.49C2.97 23.34 2.82 23.07 2.82 22.68V1.32C2.82 0.93 2.97 0.66 3.18 0.51L3.24 0.46L13.63 10.86V11.14L3.24 21.54L3.18 23.49Z" fill="#4285F4"/>
                  <path d="M17.09 15.32L13.63 11.86V11.14L17.09 7.68L17.17 7.73L21.2 10.03C22.35 10.68 22.35 11.76 21.2 12.41L17.17 14.71L17.09 15.32Z" fill="#FBBC04"/>
                  <path d="M17.17 14.71L13.63 11.14L3.18 21.54C3.57 21.96 4.2 22.01 4.92 21.61L17.17 14.71Z" fill="#EA4335"/>
                  <path d="M17.17 7.73L4.92 0.83C4.2 0.43 3.57 0.49 3.18 0.9L13.63 11.14L17.17 7.73Z" fill="#34A853"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] font-medium text-gray-accent uppercase tracking-wider leading-none">Get it on</div>
                  <div className="text-lg font-bold leading-tight -mt-0.5">Google Play</div>
                </div>
              </a>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-white/50 text-sm">4.8 Rating • 1K+ Downloads</span>
            </motion.div>
          </div>

          {/* Right — Phone Mockups */}
          <motion.div
            ref={phonesRef}
            initial={{ opacity: 0, x: 60 }}
            animate={phonesVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind phones */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand/15 rounded-full blur-[100px]" />

            {/* Phone mockups */}
            <div className="relative flex items-center gap-4 sm:gap-6">
              {/* Left phone (behind) */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -5 }}
                animate={phonesVisible ? { opacity: 1, y: 0, rotate: -5 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden sm:block relative -mr-8 z-0"
              >
                <div className="w-48 h-[400px] rounded-[2rem] bg-charcoal border-2 border-white/10 shadow-2xl overflow-hidden p-2">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-light">
                    <img
                      src={APP_CONFIG.appScreenshots[1]}
                      alt="UBEC App Screen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Center phone (front) */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={phonesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10"
              >
                <div className="w-56 sm:w-64 h-[440px] sm:h-[500px] rounded-[2.5rem] bg-charcoal border-2 border-white/15 shadow-2xl shadow-black/40 overflow-hidden p-2">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-charcoal rounded-full z-20" />
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gray-light relative">
                    <img
                      src={APP_CONFIG.appScreenshots[0]}
                      alt="UBEC App Main Screen"
                      className="w-full h-full object-cover"
                    />
                    {/* App UI overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                    <div className="absolute bottom-6 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white font-bold text-xs">UB</div>
                          <div>
                            <div className="text-charcoal text-xs font-bold">UBEC Engineering</div>
                            <div className="text-gray-accent text-[10px]">Project Management App</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right phone (behind) */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 5 }}
                animate={phonesVisible ? { opacity: 1, y: 0, rotate: 5 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden sm:block relative -ml-8 z-0"
              >
                <div className="w-48 h-[400px] rounded-[2rem] bg-charcoal border-2 border-white/10 shadow-2xl overflow-hidden p-2">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-light">
                    <img
                      src={APP_CONFIG.appScreenshots[2]}
                      alt="UBEC App Screen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 right-8 w-16 h-16 border border-brand/15 rounded-2xl rotate-12 animate-float" />
            <div className="absolute -bottom-4 left-8 w-12 h-12 border border-white/5 rounded-full animate-float-delayed" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
