import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Check, Lock, Eye, FileCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  { id: 1, label: 'SSO / SAML', checked: true },
  { id: 2, label: 'Audit logs', checked: true },
  { id: 3, label: 'Role-based permissions', checked: true },
  { id: 4, label: 'Data encryption at rest', checked: true },
  { id: 5, label: 'SOC 2 Type II', checked: false },
];

export default function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const card = cardRef.current;

    if (!section || !content || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Entrance
      scrollTl
        .fromTo(card, 
          { x: '-55vw', opacity: 0, rotateY: 12 }, 
          { x: 0, opacity: 1, rotateY: 0, ease: 'none' }, 
          0
        )
        .fromTo(content, 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        );

      // Exit
      scrollTl
        .fromTo(card, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(content, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned bg-nexus-bg relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-glow-cyan opacity-50" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
            {/* Right Content */}
            <div ref={contentRef} className="flex-1 max-w-xl">
              <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider">Security</span>
              </motion.div>
              
              <h2 className="heading-section text-nexus-text-primary mb-6">
                BUILT FOR{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  TEAMS
                </span>
                .
              </h2>
              
              <p className="body-text text-nexus-text-secondary mb-8 leading-relaxed">
                SSO, audit logs, and role-based access—out of the box. 
                Enterprise-grade security that scales with your organization.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: <Lock className="w-5 h-5" />, label: 'End-to-end encryption' },
                  { icon: <Eye className="w-5 h-5" />, label: 'Full audit trails' },
                  { icon: <FileCheck className="w-5 h-5" />, label: 'Compliance ready' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <span className="text-cyan-400 mb-2">{item.icon}</span>
                    <span className="text-xs text-nexus-text-secondary">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              
              <button className="btn-secondary flex items-center gap-2 group">
                Security overview
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {/* Left Content - Security Card */}
            <div
              ref={cardRef}
              className="flex-1 w-full max-w-md perspective-1000"
            >
              <div className="glass-card-cyan p-6 animate-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-nexus-text-primary">Access</h3>
                    <p className="text-xs text-nexus-text-secondary">Security settings</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {securityFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <span className="text-sm text-nexus-text-primary">{feature.label}</span>
                      {feature.checked ? (
                        <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-400" />
                        </span>
                      ) : (
                        <span className="text-xs text-nexus-text-secondary font-mono">Coming</span>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs text-nexus-text-secondary">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>All data encrypted with AES-256</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
