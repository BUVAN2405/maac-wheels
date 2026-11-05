import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OrdinaryEndsHere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Parallax on text and background
      gsap.to(bgImageRef.current, {
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: '20%',
        scale: 1.1,
        ease: 'none',
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.8,
        },
        y: 60,
        opacity: 0.3,
        ease: 'none',
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black py-20 px-4"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          src="https://cdn.forgeautomotive.media/images/ed72g2cx/production/6cfdfe75afaf67d53f391484d666b2fc7a2060cd-1520x2688.png?auto=format&fit=max&w=2400"
          alt="Forge Fleet Studio"
          className="w-full h-[125%] object-cover object-center opacity-30 transform -translate-y-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-[#080808]" />
      </div>

      <div
        ref={textRef}
        className="relative z-10 max-w-[1240px] mx-auto text-center px-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-red-500 mb-4 block">
          THE ATELIER STANDARD
        </span>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9] select-none">
          Ordinary <br />
          <span className="text-stroke-title hover:text-white transition-colors duration-500">
            Ends Here
          </span>
        </h2>

        <p className="mt-8 text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Complete expressions of taste, intent and individuality, shaped through detail, restraint and presence.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-red-600" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            BUILT WITH PURPOSE
          </span>
          <div className="h-px w-12 bg-red-600" />
        </div>
      </div>
    </section>
  );
};
