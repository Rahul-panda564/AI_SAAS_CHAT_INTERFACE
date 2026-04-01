import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subline = sublineRef.current;
    const cta = ctaRef.current;
    const card = cardRef.current;

    if (!section || !headline || !subline || !cta || !card) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.2 });

      loadTl
        .fromTo(headline, 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
        )
        .fromTo(subline, 
          { y: 16, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
          '-=0.4'
        )
        .fromTo(cta, 
          { y: 14, opacity: 0, scale: 0.98 }, 
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 
          '-=0.3'
        )
        .fromTo(card, 
          { x: 100, opacity: 0, rotateY: 10 }, 
          { x: 0, opacity: 1, rotateY: 0, duration: 0.9, ease: 'power2.out' }, 
          '-=0.6'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Exit animations (70% - 100%)
      scrollTl
        .fromTo(headline.parentElement, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(card, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(cta, 
          { y: 0, opacity: 1 }, 
          { y: '-6vh', opacity: 0, ease: 'power2.in' }, 
          0.75
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
      <div className="absolute inset-0 bg-glow-violet opacity-60" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <motion.h1
                ref={headlineRef}
                className="heading-hero text-nexus-text-primary mb-6"
              >
                AI THAT{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-accent to-purple-400">
                  BUILDS AI
                </span>
                .
              </motion.h1>
              
              <motion.p
                ref={sublineRef}
                className="body-text text-nexus-text-secondary mb-8 leading-relaxed"
              >
                Design prompts, call tools, and ship agents—without managing infrastructure. 
                Build intelligent applications with our visual editor and powerful API.
              </motion.p>
              
              <motion.div ref={ctaRef} className="flex flex-wrap items-center gap-4">
                <button className="btn-primary flex items-center gap-2 group">
                  Start building free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  View docs
                </button>
              </motion.div>
              
              {/* Stats */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/[0.08]">
                <div>
                  <div className="text-2xl font-display font-bold text-nexus-text-primary">10K+</div>
                  <div className="text-xs text-nexus-text-secondary">Developers</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-nexus-text-primary">1M+</div>
                  <div className="text-xs text-nexus-text-secondary">API calls/day</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-nexus-text-primary">99.9%</div>
                  <div className="text-xs text-nexus-text-secondary">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Chat Card */}
            <motion.div
              ref={cardRef}
              className="flex-1 w-full max-w-2xl perspective-1000"
            >
              <div className="glass-card-violet h-[500px] lg:h-[550px] animate-float">
                <ChatInterface showHeader={true} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
