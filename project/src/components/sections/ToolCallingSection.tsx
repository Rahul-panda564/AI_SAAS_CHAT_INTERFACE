import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, Zap, Shield, Globe } from 'lucide-react';
import { ToolCalling } from '@/components/chat/ToolCalling';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ToolCallingSection() {
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

      // Entrance (0% - 30%)
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

      // Exit (70% - 100%)
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
      id="solutions"
      className="section-pinned bg-nexus-bg relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-glow-magenta opacity-50" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
            {/* Right Content (appears on right in desktop) */}
            <div ref={contentRef} className="flex-1 max-w-xl">
              <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                <span className="text-xs text-pink-400 font-mono uppercase tracking-wider">Actions</span>
              </motion.div>
              
              <h2 className="heading-section text-nexus-text-primary mb-6">
                TOOLS THAT{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                  ACT
                </span>
                .
              </h2>
              
              <p className="body-text text-nexus-text-secondary mb-8 leading-relaxed">
                Connect APIs, run functions, and validate outputs—right from the conversation. 
                Give your AI agents the power to interact with the real world.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Wrench className="w-4 h-4" />, label: '20+ Built-in Tools' },
                  { icon: <Zap className="w-4 h-4" />, label: 'Sub-100ms Latency' },
                  { icon: <Shield className="w-4 h-4" />, label: 'Sandboxed Execution' },
                  { icon: <Globe className="w-4 h-4" />, label: 'Custom API Calls' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <span className="text-pink-400">{item.icon}</span>
                    <span className="text-sm text-nexus-text-secondary">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              
              <button className="btn-secondary flex items-center gap-2 group">
                See integrations
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {/* Left Content - Tool Calling Card */}
            <div
              ref={cardRef}
              className="flex-1 w-full max-w-2xl perspective-1000"
            >
              <div className="glass-card-magenta h-[500px] lg:h-[550px] animate-float">
                <ToolCalling />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
