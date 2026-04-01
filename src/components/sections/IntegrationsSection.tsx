import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plug, Slack, Database, CreditCard, Figma, Github, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  { name: 'Slack', icon: <Slack className="w-5 h-5" />, color: 'bg-purple-500/20 text-purple-400', connected: true },
  { name: 'Notion', icon: <FileText className="w-5 h-5" />, color: 'bg-gray-500/20 text-gray-400', connected: true },
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'bg-blue-500/20 text-blue-400', connected: false },
  { name: 'Postgres', icon: <Database className="w-5 h-5" />, color: 'bg-cyan-500/20 text-cyan-400', connected: true },
  { name: 'Stripe', icon: <CreditCard className="w-5 h-5" />, color: 'bg-green-500/20 text-green-400', connected: false },
  { name: 'Figma', icon: <Figma className="w-5 h-5" />, color: 'bg-pink-500/20 text-pink-400', connected: true },
];

export default function IntegrationsSection() {
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
      id="docs"
      className="section-pinned bg-nexus-bg relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-glow-magenta opacity-50" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div ref={contentRef} className="flex-1 max-w-xl">
              <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
                <Plug className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-xs text-pink-400 font-mono uppercase tracking-wider">Integrations</span>
              </motion.div>
              
              <h2 className="heading-section text-nexus-text-primary mb-6">
                PLUGS INTO YOUR{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                  STACK
                </span>
                .
              </h2>
              
              <p className="body-text text-nexus-text-secondary mb-8 leading-relaxed">
                Connect databases, APIs, and messaging in minutes. 
                Our pre-built integrations make it easy to extend your agents capabilities.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['REST API', 'GraphQL', 'Webhooks', 'SDK'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-xs text-nexus-text-secondary"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <button className="btn-secondary flex items-center gap-2 group">
                Browse integrations
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {/* Right Content - Integrations Card */}
            <div
              ref={cardRef}
              className="flex-1 w-full max-w-md perspective-1000"
            >
              <div className="glass-card-magenta p-6 animate-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <Plug className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-nexus-text-primary">Connections</h3>
                    <p className="text-xs text-nexus-text-secondary">{integrations.filter(i => i.connected).length} connected</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {integrations.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        integration.connected
                          ? 'bg-white/[0.05] border border-white/[0.1]'
                          : 'bg-white/[0.02] border border-white/[0.04] opacity-60'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${integration.color} flex items-center justify-center`}>
                        {integration.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-nexus-text-primary block truncate">{integration.name}</span>
                        <span className={`text-[10px] ${integration.connected ? 'text-green-400' : 'text-nexus-text-secondary'}`}>
                          {integration.connected ? 'Connected' : 'Available'}
                        </span>
                      </div>
                      {integration.connected && (
                        <motion.span 
                          className="w-2 h-2 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-2.5 rounded-lg bg-white/5 border border-white/[0.08] text-sm text-nexus-text-secondary hover:bg-white/10 hover:text-nexus-text-primary transition-all">
                  + Add custom integration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
