import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  MapPin,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Wrench,
  Layers,
  Sun,
  Palette,
  Volume2,
  Disc,
  Gauge,
  Lightbulb
} from 'lucide-react';
import { SERVICES, getServiceWhatsAppUrl, WORKSHOP_DETAILS } from '../data/catalog.ts';
import {
  setPageSEO,
  NEARBY_TOWNS,
  getLocalBusinessSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  getFAQSchema
} from '../services/seo.ts';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigate
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Find target service
  const service = SERVICES.find((s) => s.id === serviceId);

  // Other services for internal cross-linking
  const otherServices = SERVICES.filter((s) => s.id !== serviceId);

  // Setup dynamic SEO metadata & Schema.org JSON-LD whenever service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!service) {
      setPageSEO({
        title: 'Service Not Found | MAAC Wheels Kumbakonam',
        description:
          'The requested automotive service was not found. Browse car accessories and detailing services at MAAC Wheels Kumbakonam.',
        canonicalPath: `/services/${serviceId}`,
        robots: 'noindex, nofollow'
      });
      return;
    }

    const title = service.seoTitle || `${service.title} in Kumbakonam | MAAC Wheels`;
    const description =
      service.seoDescription ||
      `${service.title} in Kumbakonam at MAAC Wheels, Koranattukkaruppur Bypass (612501). Call ${WORKSHOP_DETAILS.phone}.`;
    const keywords = service.seoKeywords || [
      `${service.title.toLowerCase()} in kumbakonam`,
      'car accessories in kumbakonam',
      'car accessories in koranattukkaruppur',
      'car accessories 612501'
    ];

    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/#services-section' },
      { name: `${service.title} in Kumbakonam`, url: `/services/${service.id}` }
    ];

    const schemas: object[] = [
      getLocalBusinessSchema(),
      getServiceSchema(service),
      getBreadcrumbSchema(breadcrumbs)
    ];

    if (service.faqs && service.faqs.length > 0) {
      schemas.push(getFAQSchema(service.faqs));
    }

    setPageSEO({
      title,
      description,
      keywords,
      canonicalPath: `/services/${service.id}`,
      ogImage: service.image,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      jsonLd: schemas
    });
  }, [service, serviceId]);

  if (!service) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-xl bg-[#e5e2de] border border-[#d8d4cf] flex items-center justify-center text-[#556b2f] mb-4">
          <Wrench className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl text-[#1c2610] uppercase tracking-tight mb-2">
          Service Not Found
        </h1>
        <p className="font-body text-sm sm:text-base text-[#405126] mb-6">
          That service link does not match any active page at our Kumbakonam workshop. Explore our 10 car accessory and detailing services below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#556b2f] text-[#f2f0ef] font-heading text-sm font-bold uppercase tracking-wider hover:bg-[#3f5023] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <a
            href="/#services-section"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/#services-section');
            }}
            className="text-sm font-heading font-bold uppercase tracking-wider text-[#556b2f] hover:text-[#1c2610] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded px-2 py-1"
          >
            View All Services
          </a>
        </div>
      </section>
    );
  }

  const waUrl = getServiceWhatsAppUrl(service);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'seat-covers-leathers':
        return <Layers className="w-4 h-4 text-[#f2f0ef]" />;
      case 'ceramic-coating':
        return <ShieldCheck className="w-4 h-4 text-[#f2f0ef]" />;
      case 'sun-films':
        return <Sun className="w-4 h-4 text-[#f2f0ef]" />;
      case 'rubbing-and-polishing':
        return <Palette className="w-4 h-4 text-[#f2f0ef]" />;
      case 'car-audio-system':
        return <Volume2 className="w-4 h-4 text-[#f2f0ef]" />;
      case 'alloy-wheels':
        return <Disc className="w-4 h-4 text-[#f2f0ef]" />;
      case 'paint-protection-film':
        return <Sparkles className="w-4 h-4 text-[#f2f0ef]" />;
      case 'oe-steering-wheels':
        return <Compass className="w-4 h-4 text-[#f2f0ef]" />;
      case 'car-body-kit':
        return <Gauge className="w-4 h-4 text-[#f2f0ef]" />;
      case 'premium-headlights-foglamps':
        return <Lightbulb className="w-4 h-4 text-[#f2f0ef]" />;
      default:
        return <Wrench className="w-4 h-4 text-[#f2f0ef]" />;
    }
  };

  return (
    <article className="min-h-screen bg-[#f2f0ef] text-[#1c2610]">
      {/* ========================================================
          1. STICKY BREADCRUMB BAR
         ======================================================== */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[#d8d4cf] bg-[#e8e5e0]/95 sticky top-16 sm:top-20 z-30 backdrop-blur-md"
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <ol className="flex items-center gap-1.5 sm:gap-2 text-[#405126] font-body truncate">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="hover:text-[#1c2610] font-medium transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded"
              >
                Home
              </a>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-[#66774c] shrink-0" />
            <li>
              <a
                href="/#services-section"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/#services-section');
                }}
                className="hover:text-[#1c2610] font-medium transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded"
              >
                Services
              </a>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-[#66774c] shrink-0" />
            <li className="text-[#556b2f] font-semibold truncate" aria-current="page">
              {service.title} in Kumbakonam
            </li>
          </ol>

          <a
            href="/#services-section"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/#services-section');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#d8d4cf] text-[#1c2610] hover:border-[#556b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] text-xs font-heading uppercase font-bold tracking-wider transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </a>
        </div>
      </nav>

      {/* ========================================================
          2. SPLIT HERO BAND (Dark Automotive Canvas)
         ======================================================== */}
      <section className="bg-[#1c2610] text-[#f2f0ef]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#556b2f] text-[#f2f0ef] font-label text-xs font-bold uppercase tracking-wider">
                {getServiceIcon(service.id)}
                <span>{service.badge}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#556b2f] text-[#c5cbbd] font-label text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#8ea85c]" />
                <span>NH 36 Bypass, Koranattukkaruppur (612501)</span>
              </span>
            </div>

            <div>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05]">
                {service.title} <span className="text-[#8ea85c]">in Kumbakonam</span>
              </h1>
              <p className="font-subheading text-base sm:text-xl text-[#c5cbbd] mt-2 font-medium">
                {service.subtitle}
              </p>
            </div>

            {/* First 100 words naturally mentioning primary keyword, town, and area */}
            <p className="font-body text-sm sm:text-base text-[#c5cbbd] leading-relaxed max-w-2xl">
              {service.fullOverview || service.description}
            </p>

            {/* Clean Hairline Facts Row (Zero fabricated ratings or unverified prices) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
              <div>
                <span className="text-[11px] text-[#8ea85c] uppercase font-bold tracking-wider block">Warranty</span>
                <span className="text-xs sm:text-sm font-semibold text-white">{service.warranty || 'OEM Compliant'}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#8ea85c] uppercase font-bold tracking-wider block">Turnaround</span>
                <span className="text-xs sm:text-sm font-semibold text-white">{service.turnaroundTime || 'Same-Day Fitment'}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#8ea85c] uppercase font-bold tracking-wider block">Wiring</span>
                <span className="text-xs sm:text-sm font-semibold text-white">Coupler / 0 Wire Cut</span>
              </div>
              <div>
                <span className="text-[11px] text-[#8ea85c] uppercase font-bold tracking-wider block">Estimate</span>
                <span className="text-xs sm:text-sm font-semibold text-white">Custom Quote on Call</span>
              </div>
            </div>

            {/* Single Primary Filled CTA + Secondary Text Link */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ea85c] text-white font-heading text-sm font-bold uppercase tracking-wider transition-colors min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Book via WhatsApp</span>
              </a>

              <a
                href={`tel:${WORKSHOP_DETAILS.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-[#f2f0ef] hover:text-[#8ea85c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ea85c] rounded px-2 py-2 font-heading text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4 text-[#8ea85c]" />
                <span>Call {WORKSHOP_DETAILS.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Service Showcase Image */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-[#556b2f]">
              <img
                src={service.image}
                alt={`${service.title} in Kumbakonam at MAAC Wheels`}
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                className="w-full aspect-[4/3] object-cover block"
              />
              <div className="px-4 py-3 bg-[#222d13] border-t border-[#3a4a20] flex items-center justify-between gap-2 text-xs">
                <span className="text-[#c5cbbd] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8ea85c]" />
                  <span>Genuine Fitment Verification</span>
                </span>
                <span className="font-mono-code text-[#8ea85c] font-bold">PIN 612501</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. ASYMMETRIC STICKY SIDE HEADING + SPECIFICATIONS LIST
         ======================================================== */}
      <section className="py-12 sm:py-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#d8d4cf]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Column: Heading + Hairline Spec Table */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-6">
            <div>
              <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                Technical Specifications
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl text-[#1c2610] uppercase tracking-tight mt-1">
                {service.title} Specs
              </h2>
            </div>

            {service.specifications && (
              <dl className="divide-y divide-[#d8d4cf] border-t border-b border-[#d8d4cf]">
                {Object.entries(service.specifications).map(([key, val], idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                    <dt className="font-heading text-xs uppercase text-[#556b2f] font-bold tracking-wider shrink-0">
                      {key}
                    </dt>
                    <dd className="font-body text-xs sm:text-sm text-[#1c2610] font-medium sm:text-right">
                      {val}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Right Column: Straightforward Owner Overview + Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl text-[#1c2610] uppercase tracking-tight">
              What You Get at Our Kumbakonam Workshop
            </h2>

            <div className="space-y-4 font-body text-sm sm:text-base text-[#405126] leading-relaxed">
              {service.longDescription ? (
                service.longDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p>{service.description}</p>
              )}
              <p>
                Our technicians on Kumbakonam Bypass (NH 36, Koranattukkaruppur) check vehicle fitment tolerances and factory wiring connectors before installation begins. Suitable for {service.suitableFor || 'all passenger cars and SUVs'}.
              </p>
            </div>

            <div className="pt-4 border-t border-[#d8d4cf] grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2">
                  <CheckCircle2 className="w-4 h-4 text-[#556b2f] shrink-0 mt-0.5" />
                  <span className="font-heading text-sm text-[#1c2610] uppercase font-bold tracking-wide">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. HORIZONTAL 4-STEP WORKSHOP PROCESS TIMELINE
         ======================================================== */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-12 sm:py-20 bg-[#e8e5e0] border-b border-[#d8d4cf]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                  How We Work
                </span>
                <h2 className="font-heading text-2xl sm:text-4xl text-[#1c2610] uppercase tracking-tight mt-1">
                  Workshop Installation Process
                </h2>
              </div>
              <Clock className="w-5 h-5 text-[#556b2f] hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {service.processSteps.map((step, idx) => (
                <div key={idx} className="border-t-2 border-[#556b2f] pt-4 space-y-2">
                  <span className="font-mono-code text-xs font-bold text-[#556b2f] block">
                    STEP {step.step}
                  </span>
                  <h3 className="font-heading text-base sm:text-lg uppercase text-[#1c2610] font-bold">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#405126] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          5. LOCAL SERVICE AREAS & WORKSHOP DESK (NAP)
         ======================================================== */}
      <section className="py-12 sm:py-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#d8d4cf]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Areas Served + Tamil Keyword Context */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                Local Service Coverage
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-[#1c2610] uppercase tracking-tight mt-1">
                Serving Kumbakonam &amp; Nearby Delta Towns
              </h2>
            </div>

            <p className="font-body text-sm sm:text-base text-[#405126] leading-relaxed">
              Car owners across Kumbakonam and surrounding towns visit our Koranattukkaruppur (612501) workshop on NH 36 Bypass for reliable parts and fitting without traveling to Chennai or Trichy.
            </p>

            <div className="flex flex-wrap gap-2">
              {NEARBY_TOWNS.map((town) => (
                <span
                  key={town}
                  className="px-3 py-1.5 rounded-lg bg-[#e8e5e0] border border-[#d8d4cf] text-xs font-heading font-bold uppercase text-[#1c2610]"
                >
                  {town}
                </span>
              ))}
            </div>

            <p className="font-body text-xs sm:text-sm text-[#405126] pt-2 border-t border-[#d8d4cf]">
              <strong className="text-[#1c2610]">கும்பகோணம் கார் ஆக்சசரீஸ் (Car Accessories Kumbakonam):</strong>{' '}
              கும்பகோணம் பைபாஸ் (கொரநாட்டுக்கருப்பூர், 612501) அருகே அனைத்து கார்களுக்கும் {service.title} மற்றும் கார் ஆக்சசரீஸ் பணி செய்யப்படுகிறது.
            </p>
          </div>

          {/* Identical NAP Workshop Booking Card */}
          <aside className="lg:col-span-5 bg-white rounded-xl border border-[#556b2f] p-5 sm:p-6 space-y-4">
            <div>
              <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                Visit or Book Appointment
              </span>
              <h3 className="font-heading text-xl uppercase text-[#1c2610] mt-0.5">
                {WORKSHOP_DETAILS.name}
              </h3>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-[#405126] font-body border-t border-b border-[#d8d4cf] py-3.5">
              <p>
                <strong className="text-[#1c2610]">Address:</strong> {WORKSHOP_DETAILS.address}
              </p>
              <p>
                <strong className="text-[#1c2610]">Phone / WhatsApp:</strong>{' '}
                <a
                  href={`tel:${WORKSHOP_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="text-[#556b2f] font-semibold hover:underline"
                >
                  {WORKSHOP_DETAILS.phone}
                </a>
              </p>
              <p>
                <strong className="text-[#1c2610]">Hours:</strong> {WORKSHOP_DETAILS.hours}
              </p>
              <p className="font-mono-code text-xs text-[#556b2f]">
                Plus Code: {WORKSHOP_DETAILS.plusCode}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] text-white font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={WORKSHOP_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#d8d4cf] hover:border-[#556b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] text-[#1c2610] font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px]"
              >
                <Compass className="w-4 h-4 text-[#556b2f]" />
                <span>Open Google Maps Directions</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ========================================================
          6. FAQ LIST WITH HAIRLINE DIVIDERS (FAQPage Schema)
         ======================================================== */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-12 sm:py-20 bg-white border-b border-[#d8d4cf]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                Customer Questions
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-[#1c2610] uppercase tracking-tight mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="divide-y divide-[#d8d4cf] border-t border-b border-[#d8d4cf]">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left py-4 flex items-center justify-between gap-4 font-heading text-sm sm:text-base uppercase font-bold text-[#1c2610] hover:text-[#556b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#556b2f] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-4 font-body text-sm text-[#405126] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          7. INTERNAL LINKS: OTHER WORKSHOP SERVICES
         ======================================================== */}
      <section className="py-12 sm:py-16 bg-[#e8e5e0]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                More Workshop Services
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-[#1c2610] uppercase tracking-tight">
                Other Car Accessories &amp; Services in Kumbakonam
              </h2>
            </div>

            <a
              href="/#services-section"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/#services-section');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-heading uppercase font-bold text-[#556b2f] hover:text-[#1c2610] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded px-1 py-1"
            >
              <span>View All {SERVICES.length} Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {otherServices.slice(0, 4).map((s) => (
              <a
                key={s.id}
                href={`/services/${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/services/${s.id}`);
                }}
                title={`${s.title} in Kumbakonam`}
                className="group bg-white rounded-xl border border-[#d8d4cf] hover:border-[#556b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] overflow-hidden flex flex-col justify-between transition-all hover:shadow-md cursor-pointer no-underline"
              >
                <div className="relative aspect-[16/10] bg-[#1c2610] overflow-hidden">
                  <img
                    src={s.image}
                    alt={`${s.title} in Kumbakonam - MAAC Wheels`}
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#1c2610]/90 text-white font-label text-[9px] uppercase font-bold">
                    {s.badge}
                  </span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xs sm:text-sm uppercase text-[#1c2610] group-hover:text-[#556b2f] transition-colors font-bold line-clamp-1">
                      {s.title} in Kumbakonam
                    </h3>
                    <p className="font-body text-[11px] text-[#405126] line-clamp-2 mt-1">
                      {s.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#d8d4cf] flex items-center justify-between text-xs font-heading uppercase font-bold text-[#556b2f]">
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};
