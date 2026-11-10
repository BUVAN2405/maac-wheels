import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Check, MapPin, PhoneCall, Wrench, Clock, Compass } from 'lucide-react';
import { WORKSHOP_DETAILS, SERVICES } from '../data/catalog.ts';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleServiceClick = (serviceId: string) => {
    if (onNavigate) {
      onNavigate(`/services/${serviceId}`);
    } else {
      window.location.href = `/services/${serviceId}`;
    }
  };

  return (
    <footer className="bg-[#222d13] border-t-2 border-[#556b2f] text-[#c5cbbd] text-xs pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* RESPONSIVE FOOTER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* COLUMN 1 & 2 on Desktop: Brand & Philosophy */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-lg border border-[#3a4a20] shadow-xs flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo Kumbakonam"
                  width={40}
                  height={40}
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
              Car accessories, alloy wheels, 10H ceramic coating, self-healing PPF, custom Nappa leather seat covers, audio systems, and Bi-LED projector headlights in Kumbakonam, Tamil Nadu.
            </p>

            <div className="flex items-center gap-2 text-[#f2f0ef] text-xs sm:text-sm font-body pt-0.5">
              <ShieldCheck className="w-4 h-4 text-[#8ea85c] shrink-0" />
              <span>100% Fitment Verification & OEM Factory Warranty Compliant</span>
            </div>
          </div>

          {/* COLUMN 2: Signature Services with direct Dynamic Page links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm text-[#f2f0ef] uppercase tracking-wider font-bold flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#8ea85c] shrink-0" />
              <span>Workshop Services</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-body text-[#c5cbbd]/85">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/services/${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleServiceClick(s.id);
                    }}
                    className="hover:text-[#f2f0ef] transition-colors cursor-pointer text-left flex items-center gap-1.5 py-0.5 w-full group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#8ea85c] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span className="hover:underline underline-offset-2">{s.title}</span>
                  </a>
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
                  className="hover:text-[#f2f0ef] transition-colors hover:underline"
                >
                  {WORKSHOP_DETAILS.address}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8ea85c] shrink-0" />
                <span>{WORKSHOP_DETAILS.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#8ea85c] shrink-0" />
                <a
                  href={`tel:${WORKSHOP_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#f2f0ef] font-semibold text-[#8ea85c] transition-colors"
                >
                  {WORKSHOP_DETAILS.phone}
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Newsletter & Technical Bulletins */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs sm:text-sm text-[#f2f0ef] font-bold uppercase tracking-wider">
              VIP Fitment Alerts
            </h4>
            <p className="text-xs text-[#c5cbbd]/80 leading-relaxed font-body">
              Receive notifications on rare alloy wheel arrivals, seasonal detailing packages, and product launches in Kumbakonam.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  aria-label="Email address for workshop alerts"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#18200d] border border-[#3a4a20] rounded-lg px-3 py-2 text-xs text-[#f2f0ef] placeholder-[#9aa68a] focus:outline-none focus:border-[#8ea85c] focus-visible:ring-2 focus-visible:ring-[#8ea85c] min-h-[38px]"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="w-full bg-[#556b2f] hover:bg-[#3f5023] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ea85c] text-white font-heading font-bold text-xs uppercase tracking-wider py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe to Dispatch <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM ATTRIBUTION BAR */}
        <div className="pt-8 border-t border-[#3a4a20] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[#c5cbbd]/70 text-[11px] font-body">
          <p>
            &copy; {new Date().getFullYear()} MAAC Wheels and Accessories, NH 36 Bypass, Koranattukkaruppur, Kumbakonam 612501.
          </p>
          <p className="font-heading uppercase tracking-wider text-[#8ea85c] font-bold">
            Powered by - VelzenLabs
          </p>
        </div>

      </div>
    </footer>
  );
};
