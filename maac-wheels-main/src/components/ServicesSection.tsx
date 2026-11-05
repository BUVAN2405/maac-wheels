import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Layers,
  Wrench,
  Disc,
  Volume2,
  Sun,
  Palette,
  X
} from 'lucide-react';
import { ServiceItem } from '../types.ts';
import { SERVICES, getServiceWhatsAppUrl, WORKSHOP_DETAILS } from '../data/catalog.ts';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'seat-covers-leathers':
        return <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'ceramic-coating':
        return <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'sun-films':
        return <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'rubbing-and-polishing':
        return <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'car-audio-system':
        return <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'alloy-wheels':
        return <Disc className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      default:
        return <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
    }
  };

  const handleCardClick = (service: ServiceItem) => {
    if (onSelectService) {
      onSelectService(service);
    } else {
      setActiveModalService(service);
    }
  };

  return (
    <section
      id="services-section"
      className="relative py-8 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 max-w-[1320px] mx-auto bg-[#f2f0ef]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 lg:mb-12 border-b border-[#d8d4cf] pb-4 sm:pb-6 relative z-10 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
          


            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label text-[10px] sm:text-xs bg-[#e5e2de] border border-[#d8d4cf] text-[#556b2f] font-semibold">
              <Wrench className="w-3 h-3 text-[#556b2f]" />
              6 Signature Disciplines
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1c2610] uppercase tracking-tight">
            Our Workshop <span className="text-[#556b2f]">Services</span>
          </h2>
        </div>

        <p className="text-xs sm:text-base text-[#405126] max-w-lg font-body leading-relaxed">
          Comprehensive expert automotive detailing, bespoke interior tailoring, audio engineering, and exterior stance upgrades executed to factory specification.
        </p>
      </div>

      {/* ========================================================
          2 x 2 CARD LAYOUT (IDENTICAL CARD SIZE ACROSS ALL ITEMS):
          - Mobile: 2 Columns (2x2 viewport grid)
          - Tablet: 2 Columns
          - Desktop: 3 Columns
          All cards have synchronized aspect ratios, fixed title/description heights, and pinned bottom bars.
         ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-7 relative z-10 items-stretch">
        {SERVICES.map((service, index) => {
          const waUrl = getServiceWhatsAppUrl(service);

          return (
            <div
              key={service.id}
              className="group relative bg-[#ffffff] rounded-xl sm:rounded-2xl border border-[#d8d4cf] hover:border-[#556b2f] overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer h-full"
              onClick={() => handleCardClick(service)}
            >
              {/* Top Image Showcase with Fixed Aspect Ratio */}
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-[#1c2610] overflow-hidden border-b border-[#d8d4cf] shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Uniform Card Body - Synchronized Heights */}
              <div className="p-2.5 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between bg-[#ffffff]">
                <div>
                  {/* Fixed 1-line Title container */}
                  <h3 className="font-heading text-xs sm:text-lg lg:text-xl text-[#1c2610] group-hover:text-[#556b2f] transition-colors uppercase tracking-tight leading-tight line-clamp-1 h-4 sm:h-6 flex items-center">
                    {service.title}
                  </h3>

                  {/* Fixed 1-line Subtitle container */}
                  <p className="font-subheading text-[10px] sm:text-xs text-[#556b2f] font-semibold mt-0.5 mb-1 sm:mb-2 line-clamp-1 h-3.5 sm:h-4">
                    {service.subtitle}
                  </p>

                  {/* Fixed 2-line Description container */}
                  <p className="font-body text-[10px] sm:text-xs text-[#405126] line-clamp-2 leading-tight sm:leading-relaxed mb-2 sm:mb-3 h-7 sm:h-9 overflow-hidden">
                    {service.description}
                  </p>

                  {/* Highlights list: Exactly 2 items per card for uniform height */}
                  <div className="grid grid-cols-1 gap-1 pt-1.5 border-t border-[#d8d4cf]/70 min-h-[34px] sm:min-h-[40px]">
                    {service.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-1 text-[9px] sm:text-xs text-[#222d13]">
                        <CheckCircle2 className="w-3 h-3 text-[#556b2f] shrink-0" />
                        <span className="truncate font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer: Pinned at bottom with mt-auto */}
                <div className="mt-auto pt-2 sm:pt-3 border-t border-[#d8d4cf] flex items-center justify-between gap-1.5 sm:gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(waUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] text-[#f2f0ef] font-heading text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer min-h-[36px] sm:min-h-[40px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current text-[#f2f0ef] shrink-0" />
                    <span>Inquire</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalService(service);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#e5e2de] hover:bg-[#dcd8d3] border border-[#d8d4cf] text-[#556b2f] hover:text-[#1c2610] transition-colors shrink-0 flex items-center justify-center cursor-pointer min-h-[32px] sm:min-h-[40px]"
                    title="View service details"
                    aria-label={`View details for ${service.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveModalService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-[#ffffff] border-2 border-[#556b2f] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92svh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-40 sm:h-56 md:h-64 bg-[#1c2610] overflow-hidden shrink-0">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2610] via-black/30 to-transparent" />

              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-3 right-3 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#ffffff] border border-[#d8d4cf] text-[#1c2610] hover:text-[#556b2f] flex items-center justify-center transition-colors cursor-pointer shadow-md min-h-[40px] min-w-[40px]"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-2.5 left-3.5 right-3.5 sm:bottom-4 sm:left-6 sm:right-6">
                <span className="px-2.5 py-0.5 rounded-md bg-[#556b2f] text-[#f2f0ef] font-label text-[10px] sm:text-xs font-bold uppercase tracking-wider inline-block mb-1">
                  {activeModalService.badge}
                </span>
                <h3 className="font-heading text-xl sm:text-3xl text-white uppercase tracking-tight">
                  {activeModalService.title}
                </h3>
                <p className="font-subheading text-xs sm:text-sm text-[#f2f0ef]/90 font-medium">
                  {activeModalService.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-5">
              <div>
                <h4 className="font-heading text-xs sm:text-sm text-[#556b2f] uppercase tracking-wider font-bold mb-1">
                  Service Overview
                </h4>
                <p className="font-body text-xs sm:text-sm text-[#405126] leading-relaxed">
                  {activeModalService.description}
                </p>
              </div>

              <div>
                <h4 className="font-heading text-xs sm:text-sm text-[#556b2f] uppercase tracking-wider font-bold mb-1.5">
                  Key Specifications & Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#e5e2de] p-2.5 rounded-lg border border-[#d8d4cf]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#556b2f] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#1c2610] font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Details */}
              <div className="p-3 sm:p-3.5 rounded-lg bg-[#e5e2de] border border-[#d8d4cf] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div>
                  <p className="text-xs text-[#556b2f] font-bold uppercase tracking-wider">
                    Location & Booking
                  </p>
                  <p className="text-xs text-[#1c2610] mt-0.5 font-body">
                    {WORKSHOP_DETAILS.address}
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-[#556b2f] font-bold block">Same-Day Fitment</span>
                  <span className="text-xs text-[#66774c]">Expert Mechanics</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-3 sm:p-4 border-t border-[#d8d4cf] bg-[#e8e5e0] flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 rounded-lg border border-[#d8d4cf] text-[#405126] hover:bg-[#dcd8d3] text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
              >
                Close
              </button>

              <a
                href={getServiceWhatsAppUrl(activeModalService)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] text-[#f2f0ef] font-heading text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#f2f0ef] fill-current" />
                <span>Book On WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
