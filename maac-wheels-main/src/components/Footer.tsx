import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Check, MapPin, PhoneCall, Wrench, Clock, Compass } from 'lucide-react';
import { WORKSHOP_DETAILS, SERVICES } from '../data/catalog.ts';
import { scrollToTarget } from '../services/smoothScroll.ts';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToServices = () => {
    scrollToTarget('#services-section', -70);
  };

  return (
    <footer className="bg-[#222d13] border-t-2 border-[#556b2f] text-[#c5cbbd] text-xs pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* ========================================================
            RESPONSIVE FOOTER GRID:
            - Mobile: Brand & Tagline on top (full width), 
                      followed by a balanced 2-column grid for Services & Workshop,
                      then Newsletter.
            - Tablet (md): 2 or 3 balanced columns.
            - Desktop (lg): 5 Columns in a clean single row.
           ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* COLUMN 1 & 2 on Desktop: Brand & Philosophy */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-lg border border-[#3a4a20] shadow-xs flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-xl sm:text-2xl text-[#f2f0ef] tracking-tight font-bold leading-none">MAAC</span>
                  <span className="w-2 h-2 rounded-full bg-[#556b2f]"></span>
                </div>
                <span className="font-body text-[10px] sm:text-xs text-[#c5cbbd] uppercase tracking-widest font-semibold leading-none mt-1">
                  WHEELS & ACCESSORIES
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#c5cbbd]/85 font-body leading-relaxed max-w-md">
              Your premium destination for high-performance automotive wheels, custom fitments,
              laser optics, cockpit electronics, and aerodynamic styling in Kumbakonam, Tamil Nadu.
            </p>

            <div className="flex items-center gap-2 text-[#f2f0ef] text-xs sm:text-sm font-body pt-0.5">
              <ShieldCheck className="w-4 h-4 text-[#8ea85c] shrink-0" />
              <span>100% Fitment Verification & OEM Warranty Compliant</span>
            </div>
          </div>

          {/* COLUMN 2: Signature Services */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm text-[#f2f0ef] uppercase tracking-wider font-bold flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#8ea85c] shrink-0" />
              <span>Workshop Services</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-body text-[#c5cbbd]/85">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <button
                    onClick={scrollToServices}
                    className="hover:text-[#f2f0ef] transition-colors cursor-pointer text-left flex items-center gap-1.5 py-0.5 w-full"
                  >

                    <span className="hover:underline underline-offset-2">{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Workshop Facility & Hours */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm text-[#f2f0ef] font-bold uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8ea85c] shrink-0" />
              <span>Workshop Desk</span>
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm font-body text-[#c5cbbd]/85">
              <div className="flex items-start gap-2">
                <Compass className="w-4 h-4 text-[#8ea85c] shrink-0 mt-0.5" />
                <a
                  href={WORKSHOP_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#f2f0ef] hover:underline transition-colors leading-snug"
                >
                  NH 36 Bypass, Koranattukkaruppur, Kumbakonam, TN
                </a>
              </div>

              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#8ea85c] shrink-0" />
                <a
                  href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-[#f2f0ef] transition-colors font-mono-code font-semibold"
                >
                  {WORKSHOP_DETAILS.phone}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8ea85c] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="block font-medium">Mon–Sat: 9:30 AM–8:30 PM</span>
                  <span className="block text-[11px] sm:text-xs text-[#c5cbbd]/70">Sun: 10:00 AM–4:00 PM (Emergency Fitment)</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Fitment Updates Newsletter */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm text-[#f2f0ef] font-bold uppercase tracking-wider">
              Fitment Updates
            </h4>
            <p className="text-xs sm:text-sm text-[#c5cbbd]/80 font-body leading-relaxed">
              Get immediate alerts when new forged wheel lines and audio upgrades land in the bay.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative flex items-center">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-[#2c3a19] border border-[#556b2f] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#f2f0ef] placeholder-[#c5cbbd]/50 focus:outline-none focus:border-[#8ea85c] font-body min-h-[42px] pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-8 h-8 bg-[#556b2f] hover:bg-[#3f5023] text-[#f2f0ef] font-bold rounded-md transition-colors flex items-center justify-center cursor-pointer min-h-[34px] min-w-[34px]"
                  title="Subscribe"
                  aria-label="Subscribe to updates"
                >
                  <ArrowRight className="w-4 h-4 text-[#f2f0ef]" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#8ea85c] font-mono-code flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ========================================================
            BOTTOM LEGAL & ATTRIBUTION STRIP
           ======================================================== */}
        <div className="border-t border-[#556b2f]/50 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code text-[#c5cbbd]/70 text-center sm:text-left">
          <p>© {new Date().getFullYear()} MAAC Wheels & Accessories. Kumbakonam, TN.</p>

          <div className="flex items-center gap-3">
            {/* Powered by VelzenLabs */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2c3a19] border border-[#556b2f]">
              <span className="text-[#c5cbbd]/80">Powered by</span>
              <span className="text-[#f2f0ef] font-bold tracking-wider">
                Velzen

              </span>
            </div>


          </div>
        </div>
      </div>
    </footer>
  );
};
