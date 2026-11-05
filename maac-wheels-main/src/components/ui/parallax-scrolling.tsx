'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Compass, ShieldCheck } from 'lucide-react';

export interface ParallaxComponentProps {
  title?: string;
  layer1Image?: string;
  layer2Image?: string;
  layer4Image?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ParallaxComponent({
  title = "DEFENDER",
  layer1Image = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
  layer2Image = "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=80",
  layer4Image = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80",
  className = "",
  children
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`parallax ${className}`} ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img 
              src={layer1Image} 
              loading="eager" 
              width="1920" 
              data-parallax-layer="1" 
              alt="Rugged mountain landscape background" 
              className="parallax__layer-img" 
            />
            <img 
              src={layer2Image} 
              loading="eager" 
              width="1920" 
              data-parallax-layer="2" 
              alt="Land Rover traversing terrain" 
              className="parallax__layer-img" 
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">{title}</h2>
            </div>
            <img 
              src={layer4Image} 
              loading="eager" 
              width="1920" 
              data-parallax-layer="4" 
              alt="Land Rover luxury front view" 
              className="parallax__layer-img" 
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      <section className="parallax__content">
        {children ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-4">
            <Compass className="w-14 h-14 sm:w-16 sm:h-16 text-[#556b2f] animate-pulse" />
            <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              All-Terrain Mastery & Precision Fitment
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#c5cbbd] leading-relaxed">
              Engineered for extreme performance and rugged luxury. Discover our bespoke wheel specifications and all-terrain armor.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#a9ba86] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#556b2f]" />
              <span>Tested For Extreme Clearances & Load Capacities</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ParallaxComponent;

