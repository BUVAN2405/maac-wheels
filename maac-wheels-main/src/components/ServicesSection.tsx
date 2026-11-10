import React from 'react';
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
  Sparkles,
  Compass,
  Gauge,
  Lightbulb
} from 'lucide-react';
import { ServiceItem } from '../types.ts';
import { SERVICES, getServiceWhatsAppUrl } from '../data/catalog.ts';

interface ServicesSectionProps {
  onNavigate?: (path: string) => void;
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigate,
  onSelectService
}) => {
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
      case 'paint-protection-film':
        return <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'oe-steering-wheels':
        return <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'car-body-kit':
        return <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      case 'premium-headlights-foglamps':
        return <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
      default:
        return <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f2f0ef]" />;
    }
  };

  const handleServiceClick = (service: ServiceItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const targetPath = `/services/${service.id}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else if (onSelectService) {
      onSelectService(service);
    } else {
      window.location.href = targetPath;
    }
  };

  return (
    <section
      id="services-section"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-6 lg:px-8 max-w-[1320px] mx-auto bg-[#f2f0ef]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 lg:mb-12 border-b border-[#d8d4cf] pb-4 sm:pb-6 relative z-10 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label text-[10px] sm:text-xs bg-[#e5e2de] border border-[#d8d4cf] text-[#556b2f] font-semibold">
              <Wrench className="w-3 h-3 text-[#556b2f]" />
              10 Workshop Services in Kumbakonam
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1c2610] uppercase tracking-tight">
            Car Accessories &amp; <span className="text-[#556b2f]">Detailing</span>
          </h2>
        </div>

        <p className="text-xs sm:text-base text-[#405126] max-w-lg font-body leading-relaxed">
          Visit MAAC Wheels on NH 36 Bypass, Koranattukkaruppur (612501) for auto parts, leather seat covers, car audio, sun films, alloy wheels, and ceramic coating. Click any service card to view full specs.
        </p>
      </div>

      {/* SERVICE CARDS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-7 relative z-10 items-stretch">
        {SERVICES.map((service) => {
          const waUrl = getServiceWhatsAppUrl(service);
          const serviceUrl = `/services/${service.id}`;

          return (
            <a
              key={service.id}
              href={serviceUrl}
              onClick={(e) => handleServiceClick(service, e)}
              className="group relative bg-[#ffffff] rounded-xl border border-[#d8d4cf] hover:border-[#556b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer h-full no-underline text-inherit"
              title={`${service.title} in Kumbakonam - View full specifications`}
              aria-label={`${service.title} in Kumbakonam - View full details`}
            >
              {/* Top Image Showcase */}
              <div className="relative w-full aspect-[16/10] bg-[#1c2610] overflow-hidden border-b border-[#d8d4cf] shrink-0">
                <img
                  src={service.image}
                  alt={`${service.title} in Kumbakonam at MAAC Wheels`}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#1c2610]/90 border border-[#556b2f]/40 text-[#f2f0ef] font-label text-[9px] sm:text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                  {getServiceIcon(service.id)}
                  <span>{service.badge}</span>
                </span>
              </div>

              {/* Uniform Card Body */}
              <div className="p-2.5 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between bg-[#ffffff]">
                <div>
                  <h3 className="font-heading text-xs sm:text-lg lg:text-xl text-[#1c2610] group-hover:text-[#556b2f] transition-colors uppercase tracking-tight leading-tight line-clamp-1 h-4 sm:h-6 flex items-center">
                    {service.title}
                  </h3>

                  <p className="font-subheading text-[10px] sm:text-xs text-[#556b2f] font-semibold mt-0.5 mb-1 sm:mb-2 line-clamp-1 h-3.5 sm:h-4">
                    {service.subtitle}
                  </p>

                  <p className="font-body text-[10px] sm:text-xs text-[#405126] line-clamp-2 leading-tight sm:leading-relaxed mb-2 sm:mb-3 h-7 sm:h-9 overflow-hidden">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 gap-1 pt-1.5 border-t border-[#d8d4cf]/70 min-h-[34px] sm:min-h-[40px]">
                    {service.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-1 text-[9px] sm:text-xs text-[#222d13]">
                        <CheckCircle2 className="w-3 h-3 text-[#556b2f] shrink-0" />
                        <span className="truncate font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-auto pt-2 sm:pt-3 border-t border-[#d8d4cf] flex items-center justify-between gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(waUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] text-[#f2f0ef] font-heading text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer min-h-[36px] sm:min-h-[40px]"
                    title={`Get WhatsApp quote for ${service.title} in Kumbakonam`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current text-[#f2f0ef] shrink-0" />
                    <span>Inquire</span>
                  </button>

                  <span
                    className="px-2.5 sm:px-3 h-9 sm:h-10 rounded-lg bg-[#e5e2de] group-hover:bg-[#556b2f] border border-[#d8d4cf] group-hover:border-[#556b2f] text-[#1c2610] group-hover:text-white transition-colors shrink-0 inline-flex items-center justify-center gap-1 font-heading text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                    aria-hidden="true"
                  >
                    <span className="hidden sm:inline">Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
