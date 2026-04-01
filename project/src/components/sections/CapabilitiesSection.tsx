import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Layers, 
  Eye, 
  Puzzle, 
  BarChart3, 
  Users, 
  Rocket 
} from 'lucide-react';

const capabilities = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Visual Prompt Editor',
    description: 'Chain steps, add examples, and version prompts with an intuitive drag-and-drop interface.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Live Preview',
    description: 'Test against real inputs with instant feedback. See exactly how your prompts perform.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: 'Tool Registry',
    description: 'Register functions with JSON schemas. Connect to any API or service in minutes.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Execution Logs',
    description: 'Trace every call, latency, and token count. Debug with detailed execution timelines.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Collaborative Runs',
    description: 'Share sessions and annotate outputs. Work together with your team in real-time.',
    color: 'from-emerald-500 to-green-600',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'One-Click Deploy',
    description: 'Export an API endpoint or embed via SDK. Go from prototype to production instantly.',
    color: 'from-red-500 to-rose-600',
  },
];

function CapabilityCard({ capability, index }: { capability: typeof capabilities[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -6 }}
      className="group glass-card p-6 cursor-pointer transition-all duration-300 hover:border-white/[0.15]"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
        {capability.icon}
      </div>
      
      <h3 className="text-lg font-display font-semibold text-nexus-text-primary mb-2">
        {capability.title}
      </h3>
      
      <p className="text-sm text-nexus-text-secondary leading-relaxed">
        {capability.description}
      </p>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section className="section-flowing bg-nexus-bg relative overflow-hidden py-24">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-glow-violet opacity-30" />
      
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="heading-section text-nexus-text-primary mb-4"
          >
            Everything you need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-accent to-purple-400">
              ship agents
            </span>
            .
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-text text-nexus-text-secondary"
          >
            Build, test, deploy, and monitor—inside one workspace. 
            Our platform provides all the tools you need to create production-ready AI agents.
          </motion.p>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
