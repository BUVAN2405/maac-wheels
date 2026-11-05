import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { APPROACH_PILLARS } from '../data/forgeData';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ApproachSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Create ScrollTrigger to monitor scroll progress through this section
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // 3 steps
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveStep(0);
          } else if (progress < 0.66) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative bg-[#080808] min-h-[300vh] text-white"
    >
      {/* Sticky Frame */}
      <div className="sticky top-0 h-[100svh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden max-w-[1440px] mx-auto w-full">
        {/* Top Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 mb-2">
              METHODOLOGY & ATELIER STANDARDS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Our Approach To Every Build
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            Every decision is intentional, every detail has purpose based on your taste, your lifestyle, and your standards.
          </p>
        </div>

        {/* Center Interactive Split: Text & Visual Stages */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
          {/* Left Column: Interactive Step Pillars */}
          <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8">
            {APPROACH_PILLARS.map((pillar, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer transition-all duration-500 p-5 sm:p-6 rounded-xl border ${
                    isActive
                      ? 'border-white/20 bg-white/[0.04] shadow-xl shadow-black/60 translate-x-1 sm:translate-x-2'
                      : 'border-transparent opacity-40 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs tracking-[0.25em] text-red-500">
                      {pillar.number} / {pillar.total}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                    {pillar.description}
                  </p>

                  {/* Step progress line */}
                  <div className="mt-4 h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                    <div
                      className={`h-full bg-red-600 transition-all duration-700 ease-out ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Res Cross-Fading Cinematic Canvas */}
          <div className="lg:col-span-7 relative h-[320px] sm:h-[440px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            {APPROACH_PILLARS.map((pillar, index) => {
              const isCurrent = activeStep === index;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    isCurrent
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Visual Metadata Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-400 mb-1">
                        PILLAR 0{index + 1}
                      </div>
                      <div className="font-display text-lg sm:text-xl font-bold text-white">
                        {pillar.alt}
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 font-mono text-[11px] text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-red-500" />
                      <span>ATELIER VERIFIED</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="border-t border-white/10 pt-4 flex items-center justify-between font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="uppercase tracking-widest text-[11px]">
              SCROLL THROUGH PILLARS {activeStep + 1} OF 3
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === idx ? 'w-8 bg-red-600' : 'w-2 bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
