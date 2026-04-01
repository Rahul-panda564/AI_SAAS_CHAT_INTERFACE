import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for personal projects and experimentation.',
    features: [
      '1 agent',
      '500 messages/mo',
      'Community support',
      'Basic prompt editor',
      '3 tools',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For teams building production AI applications.',
    features: [
      'Unlimited agents',
      'Unlimited messages',
      'Priority support',
      'Advanced prompt editor',
      'Unlimited tools',
      'Team collaboration',
      'API access',
    ],
    cta: 'Get started',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations with advanced security needs.',
    features: [
      'Everything in Pro',
      'SSO / SAML',
      'Audit logs',
      'Dedicated infrastructure',
      'SLA guarantee',
      'Custom integrations',
      'Dedicated support',
    ],
    cta: 'Contact sales',
    featured: false,
  },
];

function PricingCard({ tier, index }: { tier: typeof pricingTiers[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`relative ${tier.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}
    >
      {tier.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-nexus-accent text-white text-xs font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Most popular
        </div>
      )}
      
      <div className={`h-full p-6 rounded-2xl transition-all duration-300 ${
        tier.featured 
          ? 'pricing-card-featured' 
          : 'pricing-card'
      }`}>
        <div className="mb-6">
          <h3 className="text-lg font-display font-semibold text-nexus-text-primary mb-2">
            {tier.name}
          </h3>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-display font-bold text-nexus-text-primary">
              {tier.price}
            </span>
            {tier.period && (
              <span className="text-sm text-nexus-text-secondary">{tier.period}</span>
            )}
          </div>
          <p className="text-sm text-nexus-text-secondary">{tier.description}</p>
        </div>
        
        <ul className="space-y-3 mb-8">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-nexus-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-nexus-accent" />
              </span>
              <span className="text-sm text-nexus-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
          tier.featured
            ? 'bg-nexus-accent text-white hover:bg-nexus-accent/90'
            : 'bg-white/5 text-nexus-text-primary hover:bg-white/10 border border-white/[0.08]'
        }`}>
          {tier.cta}
        </button>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="pricing" className="section-flowing bg-nexus-bg relative overflow-hidden py-24">
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
            Simple{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-accent to-purple-400">
              pricing
            </span>
            .
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="body-text text-nexus-text-secondary"
          >
            Start free. Upgrade when you're ready to scale. 
            No hidden fees, no surprises.
          </motion.p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16 text-xs text-nexus-text-secondary"
        >
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            14-day free trial
          </span>
        </motion.div>
      </div>
    </section>
  );
}
