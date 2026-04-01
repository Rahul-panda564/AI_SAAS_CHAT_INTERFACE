import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Database, Clock, Filter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const memoryItems = [
  { id: 1, label: 'User prefers concise tables', active: true },
  { id: 2, label: 'Project: Q3-Launch', active: false },
  { id: 3, label: 'Tone: professional', active: true },
  { id: 4, label: 'Language: TypeScript expert', active: false },
];

export default function MemorySection() {
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

      // Exit
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
      className="section-pinned bg-nexus-bg relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-glow-violet opacity-50" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div ref={contentRef} className="flex-1 max-w-xl">
              <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nexus-accent/10 border border-nexus-accent/20 mb-6">
                <Brain className="w-3.5 h-3.5 text-nexus-accent" />
                <span className="text-xs text-nexus-accent font-mono uppercase tracking-wider">Memory</span>
              </motion.div>
              
              <h2 className="heading-section text-nexus-text-primary mb-6">
                CONTEXT THAT{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-accent to-purple-400">
                  REMEMBERS
                </span>
                .
              </h2>
              
              <p className="body-text text-nexus-text-secondary mb-8 leading-relaxed">
                Summarize long threads, inject key facts, and keep the model on track. 
                Our intelligent memory system ensures your agents never lose context.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Database className="w-4 h-4" />, text: 'Persistent conversation history' },
                  { icon: <Clock className="w-4 h-4" />, text: 'Time-aware context windows' },
                  { icon: <Filter className="w-4 h-4" />, text: 'Smart context compression' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-sm text-nexus-text-secondary"
                  >
                    <span className="text-nexus-accent">{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
              
              <button className="btn-secondary flex items-center gap-2 group">
                Learn how memory works
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {/* Right Content - Memory Card */}
            <div
              ref={cardRef}
              className="flex-1 w-full max-w-md perspective-1000"
            >
              <div className="glass-card-violet p-6 animate-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-nexus-accent/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-nexus-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-nexus-text-primary">Memory</h3>
                    <p className="text-xs text-nexus-text-secondary">Active context items</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {memoryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        item.active 
                          ? 'bg-nexus-accent/10 border border-nexus-accent/30' 
                          : 'bg-white/[0.03] border border-white/[0.06]'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${item.active ? 'bg-nexus-accent animate-pulse' : 'bg-white/20'}`} />
                      <span className={`text-sm ${item.active ? 'text-nexus-text-primary' : 'text-nexus-text-secondary'}`}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs text-nexus-text-secondary">
                    <span>Context window</span>
                    <span className="font-mono text-nexus-accent">4,096 / 8,192 tokens</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-nexus-accent to-purple-400 rounded-full" />
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
