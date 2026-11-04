import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { scrollToTarget } from '../services/smoothScroll.ts';

interface HeroSectionProps {
  onExploreServices?: () => void;
  onExploreRack?: () => void;
  onBrowseCatalog?: () => void;
  theme?: 'light' | 'dark';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreServices }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Reliable autoplay & uninterrupted continuous loop
  useEffect(() => {
    try {
      localStorage.removeItem('maac_custom_hero_video');
    } catch {
      // ignore
    }

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const startPlayback = () => {
      try {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } catch {
        // silent fallback
      }
    };

    startPlayback();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused) {
        startPlayback();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handlePreventPause = () => {
    if (videoRef.current) {
      try {
        const p = videoRef.current.play();
        if (p !== undefined) p.catch(() => {});
      } catch {
        // ignore
      }
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      try {
        const p = videoRef.current.play();
        if (p !== undefined) p.catch(() => {});
      } catch {
        // ignore
      }
    }
  };

  const handleCtaClick = () => {
    if (onExploreServices) {
      onExploreServices();
    } else {
      scrollToTarget('#services-section', -70);
    }
  };

  const handleContactClick = () => {
    scrollToTarget('#contact-section', -70);
  };

  return (
    <section className="relative z-0 w-full bg-[#fffdd0] border-b border-[#dbd49b] overflow-hidden pt-6 sm:pt-12 lg:pt-16 pb-8 sm:pb-14 lg:pb-18">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Text */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-10 lg:mb-12 flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
          
          {/* Sub-headline Pill / Tagline */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#f5f1c6] border border-[#dbd49b] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#556b2f] shrink-0" />
            <p className="font-heading text-xs sm:text-sm tracking-widest uppercase text-[#556b2f] font-bold">
              We Care For Your Car.
            </p>
          </div>

          {/* Primary Headline: Fluid typography using clamp (never wraps to 4+ lines at 360px) */}
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight leading-[1] text-[#1c2610] max-w-4xl">
            YOUR CAR. OUR PASSION.
          </h1>

          {/* Tagline Paragraph: Minimum 15px on mobile */}
          <p className="font-body text-sm sm:text-base lg:text-lg text-[#405126] max-w-2xl mx-auto leading-relaxed px-1 sm:px-2 font-normal">
            From premium seat covers to ceramic coating, car audio, and alloy wheels – everything your car deserves, under one roof.
          </p>

          {/* Action Row - Mobile friendly touch targets (min 48px height) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto">
            <button
              onClick={handleCtaClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] text-[#fffdd0] font-heading font-bold text-sm sm:text-base tracking-wider uppercase shadow-xs transition-all duration-150 cursor-pointer min-h-[48px]"
            >
              <span>Explore Workshop Services</span>
              <ArrowRight className="w-4 h-4 text-[#fffdd0]" />
            </button>

            <button
              onClick={handleContactClick}
              className="inline-flex items-center justify-center px-4 py-2.5 font-heading text-sm font-bold uppercase tracking-wider text-[#556b2f] hover:text-[#1c2610] underline underline-offset-4 cursor-pointer transition-colors min-h-[44px]"
            >
              Consult Technician Desk →
            </button>
          </div>
        </div>

        {/* ========================================================
            CINEMATIC WORKSHOP VIDEO SHOWCASE
            Responsive aspect ratios per device:
            - Mobile: aspect-[16/10] with max-h-[360px]
            - Tablet: aspect-[16/9] with max-h-[480px]
            - Desktop: aspect-[21/9] or max-h-[620px]
           ======================================================== */}
        <div 
          onContextMenu={(e) => e.preventDefault()}
          className="relative w-full mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-[#1c2610] border sm:border-2 border-[#556b2f] shadow-md select-none"
        >
          {/* Top subtle rim border */}
          <div className="absolute top-0 inset-x-0 h-[2px] sm:h-[3px] bg-[#556b2f] z-10" />

          {/* Video Container with responsive height */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[360px] sm:max-h-[480px] lg:max-h-[600px] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onPause={handlePreventPause}
              onEnded={handleEnded}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            >
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
