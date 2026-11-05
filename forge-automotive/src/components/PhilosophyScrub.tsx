import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophyScrub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Split words into spans for scrub lighting
      const words = textRef.current?.querySelectorAll('.scrub-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { color: 'rgba(255, 255, 255, 0.18)', y: 6 },
          {
            color: 'rgba(255, 255, 255, 1)',
            y: 0,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
              end: 'bottom 40%',
              scrub: 0.8,
            },
          }
        );
      }

      gsap.fromTo(
        subtextRef.current,
        { opacity: 0.2, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: container,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const statement =
    'A vehicle should say something before it moves. Every line, material, and finish is considered.';

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative py-28 sm:py-40 bg-[#080808] px-4 sm:px-8 border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 mb-6 sm:mb-8">
          ATELIER PHILOSOPHY
        </div>

        <h2
          ref={textRef}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white/20 leading-[1.1] max-w-5xl mx-auto"
        >
          {statement.split(' ').map((word, i) => (
            <span key={i} className="scrub-word inline-block mr-[0.25em] transition-colors">
              {word}
            </span>
          ))}
        </h2>

        <p
          ref={subtextRef}
          className="mt-10 sm:mt-14 max-w-2xl mx-auto text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed"
        >
          Our services are shaped with intent, from exterior styling and interior refinement to performance upgrades, detailing and bespoke finishes; each detail sharpens the vehicle’s character without overpowering it.
        </p>
      </div>
    </section>
  );
};
