import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { FORGE_SERVICES, type ServiceItem } from '../data/forgeData';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Calculate total horizontal scroll distance
    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth + 80;
    };

    const ctx = gsap.context(() => {
      // Horizontal scroll tween pinned to vertical scroll
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      <div className="h-[100svh] flex flex-col justify-between py-8 sm:py-12">
        {/* Section Header */}
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 mb-2">
              SERVICES / SIX ATELIER DISCIPLINES
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Shaped With Intent
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="uppercase tracking-widest text-[11px]">
              SCROLL DOWN TO REVEAL DISCIPLINES (01 — 06)
            </span>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="my-auto overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 px-4 sm:px-8 w-max items-center"
          >
            {FORGE_SERVICES.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative w-[310px] sm:w-[380px] md:w-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[#0e0e0e] hover:border-white/30 transition-all duration-300 cursor-pointer flex-shrink-0"
              >
                {/* Service Visual Preview */}
                <div className="relative h-[240px] sm:h-[280px] overflow-hidden bg-black">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/30" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                      SERVICE 0{index + 1}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400 bg-red-950/60 backdrop-blur-md px-2.5 py-1 rounded border border-red-500/20">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-1">
                    {service.category}
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm line-clamp-3 leading-relaxed font-light mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                      Atelier Specification
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Track Indicator */}
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 flex justify-between items-center text-xs font-mono text-neutral-400 border-t border-white/10 pt-4">
          <span>01 / BODYSTYLING</span>
          <span className="hidden sm:inline">02 / INTERIOR</span>
          <span className="hidden sm:inline">03 / WHEELS</span>
          <span className="hidden sm:inline">04 / LIGHTING</span>
          <span className="hidden sm:inline">05 / EXHAUST</span>
          <span>06 / PROTECTION</span>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#111111] border border-white/20 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-red-500 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedService.category}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
              {selectedService.title}
            </h3>

            <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
              {selectedService.description}
            </p>

            <div className="border-t border-white/10 pt-4 mb-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Key Engineering & Atelier Standards:
              </h4>
              <ul className="space-y-2.5">
                {selectedService.fullDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <Check className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedService(null);
                  const el = document.querySelector('#contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 bg-white text-black font-mono text-xs uppercase tracking-wider rounded font-medium hover:bg-neutral-200 transition-colors"
              >
                Inquire For This Discipline
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
