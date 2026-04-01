import { useEffect, Suspense, lazy } from 'react';
import { Navigation } from '@/components/Navigation';
const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const PromptEngineeringSection = lazy(() => import('@/components/sections/PromptEngineeringSection'));
const ToolCallingSection = lazy(() => import('@/components/sections/ToolCallingSection'));
const CapabilitiesSection = lazy(() => import('@/components/sections/CapabilitiesSection'));
const MemorySection = lazy(() => import('@/components/sections/MemorySection'));
const SecuritySection = lazy(() => import('@/components/sections/SecuritySection'));
const IntegrationsSection = lazy(() => import('@/components/sections/IntegrationsSection'));
const PricingSection = lazy(() => import('@/components/sections/PricingSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-nexus-bg min-h-screen">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <Suspense fallback={<div className="w-full py-20 text-center text-nexus-text-secondary">Loading...</div>}>
        {/* Section 1: Hero - pin: true */}
        <HeroSection />
        
        {/* Section 2: Prompt Engineering - pin: true */}
        <PromptEngineeringSection />
        
        {/* Section 3: Tool Calling - pin: true */}
        <ToolCallingSection />
        
        {/* Section 4: Capabilities - pin: false */}
        <CapabilitiesSection />
        
        {/* Section 5: Memory - pin: true */}
        <MemorySection />
        
        {/* Section 6: Security - pin: true */}
        <SecuritySection />
        
        {/* Section 7: Integrations - pin: true */}
        <IntegrationsSection />
        
        {/* Section 8: Pricing - pin: false */}
        <PricingSection />
        
        {/* Section 9: CTA + Footer - pin: false */}
        <CTASection />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
