import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PromptEngineering } from '@/components/chat/PromptEngineering';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PromptEngineeringSection() {
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
        .fromTo(content, 
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(card, 
          { x: '55vw', opacity: 0, rotateY: -12 }, 
          { x: 0, opacity: 1, rotateY: 0, ease: 'none' }, 
          0
        );

      // Settle (30% - 70%) - hold position

      // Exit (70% - 100%)
      scrollTl
        .fromTo(content, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(card, 
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
      id="product"
      className="section-pinned bg-nexus-bg relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-glow-cyan opacity-50" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div ref={contentRef} className="flex-1 max-w-xl">
              <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider">Core Feature</span>
              </motion.div>
              
              <h2 className="heading-section text-nexus-text-primary mb-6">
                PROMPT ENGINEERING,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  VISUALIZED
                </span>
                .
              </h2>
              
              <p className="body-text text-nexus-text-secondary mb-8 leading-relaxed">
                Chain instructions, set rules, and version your prompts like code. 
                Our visual editor makes it easy to craft perfect prompts with real-time 
                token counting and variable substitution.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Visual prompt chaining with drag-and-drop',
                  'Real-time token estimation',
                  'Variable templating with autocomplete',
                  'Version history and A/B testing',
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-sm text-nexus-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <button className="btn-secondary flex items-center gap-2 group">
                Explore the editor
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {/* Right Content - Prompt Editor Card */}
            <div
              ref={cardRef}
              className="flex-1 w-full max-w-2xl perspective-1000"
            >
              <div className="glass-card-cyan h-[500px] lg:h-[550px] animate-float">
                <PromptEngineering />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
