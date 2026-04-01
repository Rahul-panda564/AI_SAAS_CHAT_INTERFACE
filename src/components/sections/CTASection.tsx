import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Integrations', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Guides', 'Community'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export default function CTASection() {
  const ctaRef = useRef(null);
  const footerRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-100px' });
  const isFooterInView = useInView(footerRef, { once: true, margin: '-50px' });

  return (
    <section className="section-flowing bg-nexus-bg relative overflow-hidden">
      {/* CTA Area */}
      <div ref={ctaRef} className="relative py-24">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-glow-violet opacity-60" />
        
        <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="heading-section text-nexus-text-primary mb-4"
            >
              READY TO BUILD YOUR{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-accent to-purple-400">
                NEXT AGENT
              </span>
              ?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="body-text text-nexus-text-secondary mb-8"
            >
              Start free. No credit card required. 
              Join thousands of developers building the future of AI.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={isCtaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button className="btn-primary flex items-center gap-2 group">
                Start building free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Talk to sales
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer ref={footerRef} className="relative border-t border-white/[0.08] py-12">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="col-span-2"
            >
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nexus-accent to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-display font-bold text-nexus-text-primary">
                  NexusAI
                </span>
              </a>
              <p className="text-sm text-nexus-text-secondary max-w-xs">
                Build, test, and deploy AI agents—without the noise. 
                The platform for the next generation of intelligent applications.
              </p>
            </motion.div>
            
            {/* Links */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h4 className="text-sm font-medium text-nexus-text-primary mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-sm text-nexus-text-secondary hover:text-nexus-text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isFooterInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.08] gap-4"
          >
            <p className="text-xs text-nexus-text-secondary">
              © 2024 NexusAI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-nexus-text-secondary hover:text-nexus-text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-nexus-text-secondary hover:text-nexus-text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-nexus-text-secondary hover:text-nexus-text-primary transition-colors">
                Cookie Settings
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
    </section>
  );
}
