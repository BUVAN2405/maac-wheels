import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  MapPin, 
  CalendarX, 
  MessageSquare, 
  ExternalLink, 
  Navigation, 
  Compass,
  ChevronDown
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';
import { HOMEPAGE_FAQS, NEARBY_TOWNS } from '../services/seo.ts';

export const ContactSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [whatsAppRedirectUrl, setWhatsAppRedirectUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim().slice(0, 80);
    const cleanMessage = formData.message.trim().slice(0, 1000);
    const cleanPhone = formData.phone.trim().slice(0, 25);
    const cleanVehicle = formData.vehicle.trim().slice(0, 80);

    if (!cleanName || !cleanMessage) return;

    setStatus('submitting');

    const msg = [
      `*New Fitment & Service Inquiry:*`,
      `Name: *${cleanName}*`,
      cleanPhone ? `Phone: ${cleanPhone}` : null,
      cleanVehicle ? `Vehicle: *${cleanVehicle}*` : null,
      ``,
      `*Requirements:*`,
      cleanMessage
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    setWhatsAppRedirectUrl(waUrl);

    setTimeout(() => {
      setStatus('success');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 350);
  };

  const { lat, lng } = WORKSHOP_DETAILS.coordinates; // 10.9829948, 79.3907444

  return (
    <section id="contact-section" className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto bg-[#f2f0ef]">
      {/* Master Container */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-[#d8d4cf] bg-[#ffffff] p-4 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 lg:mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5e2de] border border-[#d8d4cf] text-[#556b2f] font-heading font-bold text-xs uppercase tracking-wider mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#556b2f]" />
            <span>Kumbakonam Workshop & Fitment Desk</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#1c2610] uppercase tracking-tight mb-2">
            Technical Consultation & <span className="text-[#556b2f]">Workshop Desk</span>
          </h2>
          <p className="text-xs sm:text-base text-[#405126] font-body leading-relaxed">
            Visit our physical workshop on Kumbakonam Bypass (NH 36) or submit your vehicle specifications below. Our technicians verify bolt patterns, clearances, and interior templates.
          </p>
        </div>

        {/* ========================================================
            STEP 3 MOBILE PRIORITY ACTION BAR:
            Visible first on mobile (<1024px) for one-tap calling, WhatsApp & GPS Directions!
           ======================================================== */}
        <div className="lg:hidden mb-6 grid grid-cols-3 gap-2">
          {/* Call button */}
          <a
            href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#e5e2de] border border-[#d8d4cf] text-[#1c2610] active:bg-[#dcd8d3] transition-colors min-h-[48px] text-center"
            aria-label="Call Workshop"
          >
            <PhoneCall className="w-4 h-4 text-[#556b2f] mb-1 shrink-0" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider leading-none">Call Desk</span>
          </a>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello MAAC Wheels & Accessories Kumbakonam, I would like to consult on vehicle fitment.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#556b2f] active:bg-[#3f5023] text-[#f2f0ef] transition-colors min-h-[48px] text-center shadow-xs"
            aria-label="WhatsApp Workshop"
          >
            <MessageSquare className="w-4 h-4 text-[#f2f0ef] mb-1 fill-current shrink-0" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider leading-none">WhatsApp</span>
          </a>

          {/* Directions button */}
          <a
            href={WORKSHOP_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#e5e2de] border border-[#d8d4cf] text-[#1c2610] active:bg-[#dcd8d3] transition-colors min-h-[48px] text-center"
            aria-label="Get Directions on Google Maps"
          >
            <Navigation className="w-4 h-4 text-[#556b2f] mb-1 shrink-0" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider leading-none">Directions</span>
          </a>
        </div>

        {/* ========================================================
            RESPONSIVE GRID LAYOUT:
            - Mobile: Form appears first, followed by map (220-280px) and info cards.
            - Tablet: Form in 2-column inputs, Info cards in 2-column grid.
            - Desktop: 12-col split layout (Left: Map + Cards, Right: Form).
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
          
          {/* DESKTOP LEFT COLUMN / MOBILE LOWER SECTION: Workshop Information & Mini Map */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-4">
            
            {/* SATELLITE MAP: Mobile height 240px (per 220-280px requirement), Desktop 300px */}
            <div className="relative rounded-xl overflow-hidden border border-[#d8d4cf] bg-[#e8e5e0] shadow-xs flex flex-col">
              {/* Map Header */}
              <div className="px-3.5 py-2.5 bg-[#e5e2de] border-b border-[#d8d4cf] flex items-center justify-between text-xs z-20">
                <div className="flex items-center gap-1.5 text-[#556b2f]">
                  <MapPin className="w-4 h-4 text-[#556b2f]" />
                  <span className="font-heading text-xs tracking-wider uppercase font-bold text-[#1c2610]">
                    NH 36 Bypass Workshop
                  </span>
                </div>

                <a
                  href={WORKSHOP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-heading text-xs font-bold uppercase tracking-wider text-[#556b2f] hover:text-[#1c2610] px-2.5 py-1 rounded-md bg-[#ffffff] hover:bg-[#dcd8d3] border border-[#d8d4cf] transition-all min-h-[32px]"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#556b2f]" />
                </a>
              </div>

              {/* Map Viewport */}
              <div className="relative w-full h-[240px] sm:h-[260px] lg:h-[290px] bg-[#1c2610]">
                <iframe
                  title="MAAC Wheels & Accessories Kumbakonam Satellite View"
                  src={`https://maps.google.com/maps?q=${lat},${lng}&t=k&hl=en&z=17&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Overlaid Direct Directions Link */}
                <div className="absolute bottom-2.5 right-2.5 z-20">
                  <a
                    href={WORKSHOP_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] text-[#f2f0ef] text-xs font-heading font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all cursor-pointer min-h-[40px]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#f2f0ef]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Bottom Address Info Strip under Map */}
              <div className="p-3 bg-[#e5e2de] border-t border-[#d8d4cf] flex items-center justify-between text-xs font-body text-[#405126]">
                <div className="flex items-center gap-1.5 truncate pr-2 text-xs">
                  <Compass className="w-3.5 h-3.5 text-[#556b2f] shrink-0" />
                  <span className="truncate">NH 36 Bypass, Koranattukkaruppur, Kumbakonam</span>
                </div>
                <span className="text-[#556b2f] text-xs shrink-0 font-heading font-bold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#556b2f]" />
                  Open Today
                </span>
              </div>
            </div>

            {/* Direct Contact Card (Desktop View) */}
            <div className="hidden lg:block p-4 sm:p-5 bg-[#e5e2de] border border-[#d8d4cf] rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-xs text-[#556b2f] font-heading font-bold uppercase tracking-wider mb-2">
                <PhoneCall className="w-4 h-4 text-[#556b2f]" />
                <span>DIRECT FITMENT DESK</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <a 
                    href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-[#1c2610] hover:text-[#556b2f] text-2xl lg:text-3xl block font-price font-bold leading-none tracking-tight transition-colors"
                  >
                    {WORKSHOP_DETAILS.phone}
                  </a>
                  <span className="font-body text-xs text-[#66774c] block mt-1">Direct line to shop technicians</span>
                </div>
                <a
                  href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent('Hello MAAC Wheels & Accessories Kumbakonam, I would like to inquire regarding vehicle fitments.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#556b2f] hover:bg-[#3f5023] text-[#f2f0ef] font-bold rounded-lg text-xs font-heading uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current text-[#f2f0ef]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Cards (2 columns on tablet & mobile) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 sm:p-4 bg-[#e5e2de] border border-[#d8d4cf] rounded-xl">
                <div className="flex items-center gap-1.5 text-[#556b2f] text-xs font-heading font-bold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#556b2f]" />
                  <span>Mon – Sat</span>
                </div>
                <p className="text-[#1c2610] font-heading font-bold text-sm sm:text-base">9:30 AM – 8:30 PM</p>
                <p className="text-xs text-[#66774c] mt-0.5 font-body">Full Bay Active</p>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#e5e2de] border border-[#d8d4cf] rounded-xl">
                <div className="flex items-center gap-1.5 text-[#556b2f] text-xs font-heading font-bold uppercase tracking-wider mb-1">
                  <CalendarX className="w-3.5 h-3.5 text-[#556b2f]" />
                  <span>Sunday</span>
                </div>
                <p className="text-[#1c2610] font-heading font-bold text-sm sm:text-base">10:00 AM – 4:00 PM</p>
                <p className="text-xs text-[#66774c] mt-0.5 font-body">Consultation Bay</p>
              </div>
            </div>

            {/* Fitment Guarantee Pill */}
            <div className="flex items-center gap-3 p-3.5 bg-[#e5e2de] border border-[#d8d4cf] rounded-xl text-xs">
              <ShieldCheck className="w-4 h-4 text-[#556b2f] shrink-0" />
              <span className="text-[#222d13] font-body">
                100% Bolt-On Fitment Guarantee: PCD, hub bore, and offset confirmed prior to installation.
              </span>
            </div>
          </div>

          {/* DESKTOP RIGHT COLUMN / MOBILE UPPER SECTION: Streamlined Consultation Form */}
          <div className="order-1 lg:order-2 lg:col-span-7 bg-[#e8e5e0] border border-[#d8d4cf] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xs relative">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#556b2f]">
                <Wrench className="w-4 h-4 text-[#556b2f]" />
                <span>Submit Vehicle Fitment Inquiry</span>
              </div>
              <span className="text-xs font-mono-code font-bold text-[#556b2f] px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#d8d4cf]">
                Instant Sync
              </span>
            </div>

            {status === 'success' && (
              <div className="mb-5 p-4 bg-[#edf3e0] border border-[#556b2f] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#222d13]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#556b2f] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-bold block text-[#1c2610] text-sm uppercase">Inquiry Prepared</span>
                    <span className="font-body text-[#405126]">Your vehicle details have been pre-formatted for direct workshop consultation.</span>
                  </div>
                </div>
                {whatsAppRedirectUrl && (
                  <a
                    href={whatsAppRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#556b2f] hover:bg-[#3f5023] text-[#f2f0ef] font-heading font-bold rounded-lg text-xs uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition-colors min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>Re-open WhatsApp</span>
                  </a>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {/* Form fields: 1 col on mobile, 2 col on tablet & desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1c2610] mb-1.5">
                    Your Name <span className="text-[#556b2f]">*</span>
                  </label>
                  <input
                    id="client-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Anand Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d8d4cf] focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/20 rounded-lg px-3.5 py-3 text-base text-[#1c2610] placeholder-[#8a9870] focus:outline-none transition-all font-body min-h-[48px]"
                  />
                </div>

                <div>
                  <label htmlFor="client-phone" className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1c2610] mb-1.5">
                    Phone Number (WhatsApp)
                  </label>
                  <input
                    id="client-phone"
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d8d4cf] focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/20 rounded-lg px-3.5 py-3 text-base text-[#1c2610] placeholder-[#8a9870] focus:outline-none transition-all font-body min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="client-vehicle" className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1c2610] mb-1.5">
                  Vehicle Model & Year
                </label>
                <input
                  id="client-vehicle"
                  name="vehicle"
                  type="text"
                  placeholder="e.g. Mahindra Thar Roxx / Creta 2024 / Innova Hycross"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d8d4cf] focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/20 rounded-lg px-3.5 py-3 text-base text-[#1c2610] placeholder-[#8a9870] focus:outline-none transition-all font-body min-h-[48px]"
                />
              </div>

              <div>
                <label htmlFor="client-message" className="block text-xs font-heading font-bold uppercase tracking-wider text-[#1c2610] mb-1.5">
                  Modifications & Requirements <span className="text-[#556b2f]">*</span>
                </label>
                <textarea
                  id="client-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="e.g. 18-inch forged alloys, Nappa leather seat covers, Ceramic Coating 10H, or sun films..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d8d4cf] focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/20 rounded-lg p-3.5 text-base text-[#1c2610] placeholder-[#8a9870] focus:outline-none transition-all font-body min-h-[96px]"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] text-[#f2f0ef] font-heading font-bold text-sm sm:text-base uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 fill-current text-[#f2f0ef]" />
                <span>{status === 'submitting' ? 'Preparing Consultation...' : 'Send Inquiry via WhatsApp Consultation'}</span>
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-[#d8d4cf] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-[#66774c] font-body">
              <span>* WhatsApp pre-populates with your full vehicle details for technician review.</span>
              <span className="text-[#556b2f] font-heading font-bold uppercase text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#556b2f]" />
                Verified Workshop
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          LOCAL SERVICE AREAS & CUSTOMER FAQs (Hairline Layout)
         ======================================================== */}
      <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-[#d8d4cf] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Service Areas & Tamil Reference */}
        <div className="lg:col-span-5 space-y-4">
          <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider block">
            Areas Served Around 612501
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl text-[#1c2610] uppercase tracking-tight">
            Serving Kumbakonam &amp; Nearby Towns
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#405126] leading-relaxed">
            Car owners from Koranattukkaruppur, Darasuram, Swamimalai, Thiruvidaimarudur, Papanasam, Thanjavur, and Mayiladuthurai visit our NH 36 Bypass bay for alloy wheels, custom seat covers, car audio, and detailing.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {NEARBY_TOWNS.map((town) => (
              <span
                key={town}
                className="px-2.5 py-1 rounded bg-[#e8e5e0] border border-[#d8d4cf] text-xs font-heading font-bold uppercase text-[#1c2610]"
              >
                {town}
              </span>
            ))}
          </div>
          <p className="font-body text-xs text-[#405126] pt-3 border-t border-[#d8d4cf]">
            <strong className="text-[#1c2610]">கார் ஆக்சசரீஸ் கும்பகோணம்:</strong>{' '}
            கொரநாட்டுக்கருப்பூர் பைபாஸ் (612501), கும்பகோணம் அருகே சீட் கவர், செராமிக் கோட்டிங், கார் ஆடியோ மற்றும் அலாய் வீல் பணி.
          </p>
        </div>

        {/* Right: Hairline FAQ Accordion */}
        <div className="lg:col-span-7">
          <h3 className="font-heading text-2xl sm:text-3xl text-[#1c2610] uppercase tracking-tight mb-4">
            Common Questions
          </h3>
          <div className="divide-y divide-[#d8d4cf] border-t border-b border-[#d8d4cf]">
            {HOMEPAGE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-3.5 sm:py-4 flex items-center justify-between gap-4 font-heading text-xs sm:text-base uppercase font-bold text-[#1c2610] hover:text-[#556b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#556b2f] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-4 font-body text-xs sm:text-sm text-[#405126] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
