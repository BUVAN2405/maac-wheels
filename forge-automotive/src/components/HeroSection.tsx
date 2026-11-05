import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles } from 'lucide-react';
import { FORGE_MARQUES } from '../data/forgeData';
import { scrollTo } from '../services/scroll';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const carStageRef = useRef<HTMLDivElement | null>(null);
  const carImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      .from(carStageRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.out',
      }, '-=0.9');

      // Scroll scrubbing zoom effect on the car & fade on headline
      gsap.to(carImgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.15,
        y: -60,
        ease: 'none',
      });

      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '40% top',
          scrub: 0.5,
        },
        opacity: 0.2,
        y: -30,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#080808]"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-burgundy-glow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808] pointer-events-none" />

      {/* Atmospheric Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Header Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 text-center mt-8 sm:mt-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 text-xs font-mono uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3 h-3 text-red-500" />
          <span>BESPOKE AUTOMOTIVE ATELIER</span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white max-w-5xl mx-auto leading-[0.95]"
        >
          For Those Who <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
            Refuse Ordinary
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          A luxury automotive atelier for bespoke styling, performance and craftsmanship. We engineer distinction into every line, surface, and heartbeat.
        </p>
      </div>

      {/* Cinematic Vehicle Centerpiece Stage */}
      <div
        ref={carStageRef}
        className="relative z-10 my-4 sm:my-8 max-w-[1240px] mx-auto px-4 w-full flex flex-col items-center"
      >
        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-red-950/20 group">
          <img
            ref={carImgRef}
            src="https://cdn.forgeautomotive.media/images/ed72g2cx/production/02dd1fb0de568518e405be67ae7dc3ef47fe383a-1320x2388.jpg?auto=format&fit=max&w=2000"
            alt="Forge Automotive Bespoke Fleet"
            className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-700"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60" />

          {/* Corner Technical Metadata */}
          <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 bg-black/60 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
            LOC: ATELIER SHOWROOM / UK
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest block mb-1">
                EXHIBITION SPECIFICATION
              </span>
              <h3 className="font-display text-lg sm:text-2xl font-bold text-white tracking-wide">
                The Master Fleet Commission
              </h3>
            </div>
            <button
              onClick={() => scrollTo('#approach', -30)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded backdrop-blur-md text-xs font-mono uppercase tracking-wider border border-white/20 transition-all"
            >
              <span>Explore Approach</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="relative z-10 w-full border-y border-white/[0.08] py-3.5 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-12 sm:gap-16">
          {[...FORGE_MARQUES, ...FORGE_MARQUES, ...FORGE_MARQUES].map((marque, i) => (
            <div key={i} className="flex items-center gap-4 text-neutral-400">
              <span className="font-mono text-xs uppercase tracking-[0.3em] font-semibold">
                {marque}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
