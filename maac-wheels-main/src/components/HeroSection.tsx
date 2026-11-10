import React from 'react';
import { ArrowRight } from 'lucide-react';
import { scrollToTarget } from '../services/smoothScroll.ts';

interface HeroSectionProps {
  onExploreServices?: () => void;
  onExploreRack?: () => void;
  onBrowseCatalog?: () => void;
  theme?: 'light' | 'dark';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreServices }) => {

  const handleCtaClick = () => {
    if (onExploreServices) {
      onExploreServices();
    } else {
      scrollToTarget('#services-section', -70);
    }
  };

  return (
    <section className="relative w-full bg-[#f0eeed] overflow-hidden sm:h-screen">
      {/* Single responsive hero image with dimensions & priority loading for Core Web Vitals (LCP) */}
      <img
        src="/images/hero-custom2.jpg"
        alt="Car accessories and alloy wheel workshop in Kumbakonam - MAAC Wheels"
        width={1024}
        height={576}
        loading="eager"
        decoding="async"
        className="w-full block sm:absolute sm:inset-0 sm:h-full sm:object-cover sm:object-center select-none pointer-events-none"
        draggable={false}
      />

      {/* Desktop gradient overlay for text readability */}
      <div
        className="hidden sm:block absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(240,238,237,0.95) 0%, rgba(240,238,237,0.85) 60%, rgba(240,238,237,0.00) 100%)',
        }}
      />

      {/* Single H1 & Text Overlay (Responsive for both mobile and desktop) */}
      <div className="absolute inset-x-0 top-0 h-[45%] sm:h-2/5 flex flex-col items-center justify-start sm:justify-center text-center px-2 pt-3.5 sm:px-6 lg:px-8 sm:pt-0 pointer-events-auto">
        <h1 className="font-heading text-xs sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-tight leading-none sm:leading-tight text-[#1c2610] max-w-2xl mb-0.5 sm:mb-2 font-extrabold">
          Car Accessories Shop in Kumbakonam
        </h1>

        <p className="font-body text-[7.5px] sm:text-xs lg:text-sm leading-tight sm:leading-relaxed text-[#2e3d1f] max-w-[245px] sm:max-w-xl mx-auto mb-1 sm:mb-5">
          Seat covers, ceramic coating, car audio, sun films, and alloy wheels at NH 36 Bypass, Koranattukkaruppur (612501).
        </p>

        <button
          type="button"
          onClick={handleCtaClick}
          className="inline-flex items-center justify-center gap-0.5 sm:gap-1.5 px-2 sm:px-5 py-0.5 sm:py-2 rounded-full bg-[#1c2610] sm:bg-[#556b2f] hover:bg-[#556b2f] sm:hover:bg-[#3f5023] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] text-[#f2f0ef] font-heading font-semibold text-[6px] sm:text-xs tracking-wider uppercase shadow-xs transition-all duration-200 cursor-pointer min-h-[16px] sm:min-h-[38px] leading-none"
        >
          <span>Explore Services</span>
          <ArrowRight className="w-1.5 h-1.5 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {/* Bottom fade into next section (desktop) */}
      <div className="hidden sm:block absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#f2f0ef] to-transparent pointer-events-none" />
    </section>
  );
};
