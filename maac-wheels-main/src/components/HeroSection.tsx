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

      {/* ===== MOBILE LAYOUT (compact overlay on car background) ===== */}
      <div className="relative w-full sm:hidden">
        {/* Car image */}
        <img
          src="/images/hero-custom2.jpg"
          alt="Custom hero background"
          className="w-full block select-none pointer-events-none"
          draggable={false}
        />

        {/* Text block placed directly in the white space above the car roof */}
        <div className="absolute inset-x-0 top-0 h-[45%] flex flex-col items-center justify-start text-center px-2 pt-4.5 pointer-events-auto">


          {/* Headline */}
          <h1 className="font-heading text-xs uppercase tracking-tight leading-none text-[#1c2610] mb-0.5 font-extrabold">
            We Care Your Car.
          </h1>

          {/* Paragraph */}
          <p className="font-body text-[7.5px] leading-tight text-[#2e3d1f] max-w-[240px] mx-auto mb-1">
            From premium seat covers to ceramic coating, car audio, and alloy wheels – everything under one roof.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#1c2610] hover:bg-[#556b2f] text-[#f2f0ef] font-heading font-medium text-[6px] tracking-wider uppercase shadow-2xs transition-all duration-200 cursor-pointer min-h-[14px] leading-none"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-1.5 h-1.5" />
          </button>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (overlay, h-screen) ===== */}
      <div className="relative w-full h-full hidden sm:block">

        {/* Full image */}
        <img
          src="/images/hero-custom2.jpg"
          alt="Custom hero background"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          draggable={false}
        />

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(240,238,237,0.95) 0%, rgba(240,238,237,0.85) 60%, rgba(240,238,237,0.00) 100%)',
          }}
        />

        {/* Text block */}
        <div
          className="absolute inset-x-0 top-0 flex flex-col items-center justify-center text-center px-6 lg:px-8 h-2/5"
        >

          {/* Headline */}
          <h1 className="font-heading text-md md:text-x lg:text-2xl uppercase tracking-tight leading-tight text-[#1c2610] max-w-2xl mb-3">
            We Care Your Car.
          </h1>

          {/* Badge */}

          {/* <p className="font-heading text-sm tracking-widest uppercase text-[#556b2f] font-bold">
            YOUR CAR. OUR PASSION.
          </p> */}

          {/* Paragraph */}
          <p className="font-body text-xs lg:text-sm text-[#2e3d1f] max-w-xl mx-auto leading-relaxed mb-5">
            From premium seat covers to ceramic coating, car audio, and alloy wheels – everything your car deserves, under one roof.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#556b2f] hover:bg-[#556b3f] text-[#f2f0ef] font-heading font-semibold text-xs tracking-wider uppercase shadow-sm transition-all duration-200 cursor-pointer min-h-[34px]"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#f2f0ef] to-transparent pointer-events-none" />

      </div>
    </section>
  );
};
