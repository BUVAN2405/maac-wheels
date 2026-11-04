import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  PhoneCall, 
  MapPin, 
  MessageSquare, 
  Wrench
} from 'lucide-react';
import { WORKSHOP_DETAILS, SERVICES } from '../data/catalog.ts';
import { scrollToTarget } from '../services/smoothScroll.ts';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    scrollToTarget(`#${sectionId}`, -70);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#fffdd0]/95 backdrop-blur-md border-b border-[#dbd49b] shadow-[0_2px_12px_rgba(85,107,47,0.06)]">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4 relative">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => scrollToTarget(document.body, 0)}
              className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded-lg min-h-[44px]"
              title="MAAC Wheels & Accessories Kumbakonam"
            >
              <div className="relative p-1 sm:p-1.5 bg-white rounded-lg border border-[#dbd49b] shadow-xs group-hover:border-[#556b2f] transition-colors flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Wheels & Accessories Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-xl sm:text-2xl lg:text-3xl text-[#1c2610] tracking-tight font-extrabold group-hover:text-[#556b2f] transition-colors leading-none">
                    MAAC
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#556b2f]" />
                </div>
                <p className="font-body text-xs uppercase tracking-widest text-[#556b2f] font-bold leading-tight mt-0.5">
                  WHEELS & ACCESSORIES
                </p>
              </div>
            </button>
          </div>

          {/* DESKTOP NAVBAR: Visible ONLY from lg (1024px+) per STEP 3 requirements */}
          <nav 
            className="hidden lg:flex items-center gap-2 xl:gap-4" 
            aria-label="Main navigation"
          >
            {/* Services Dropdown */}
            <div ref={servicesDropdownRef} className="relative">
              <button
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className="px-3.5 py-2.5 rounded-lg text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer text-[#405126] hover:text-[#1c2610] hover:bg-[#f5f1c6] border border-transparent hover:border-[#dbd49b] min-h-[44px]"
              >
                <Wrench className="w-4 h-4 text-[#556b2f]" />
                <span>Our Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180 text-[#556b2f]' : 'text-[#66774c]'}`} />
              </button>

              {servicesMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#fdfcf3] border border-[#dbd49b] rounded-xl p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#dbd49b]">
                    <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                      6 Signature Services
                    </span>
                    <button
                      onClick={() => scrollToSection('services-section')}
                      className="text-xs text-[#556b2f] hover:text-[#1c2610] flex items-center gap-1 font-semibold p-1"
                    >
                      View All <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {SERVICES.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToSection('services-section')}
                        className="w-full text-left p-2 rounded-lg hover:bg-[#f5f1c6] text-[#405126] hover:text-[#1c2610] transition-colors flex items-center justify-between group cursor-pointer min-h-[44px]"
                      >
                        <div>
                          <p className="text-xs font-heading uppercase text-[#1c2610] group-hover:text-[#556b2f] font-bold">{s.title}</p>
                          <p className="text-xs text-[#66774c] truncate max-w-[200px]">{s.subtitle}</p>
                        </div>
                        <span className="text-xs font-mono-code text-[#556b2f] font-medium">0{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Section Link */}
            <button
              onClick={() => scrollToSection('services-section')}
              className="px-3.5 py-2.5 rounded-lg text-sm font-heading font-bold uppercase tracking-wider text-[#405126] hover:text-[#1c2610] hover:bg-[#f5f1c6] border border-transparent hover:border-[#dbd49b] transition-all cursor-pointer min-h-[44px]"
            >
              Services Overview
            </button>

            {/* Workshop Desk & Consultation */}
            <button
              onClick={() => scrollToSection('contact-section')}
              className="px-3.5 py-2.5 rounded-lg text-sm font-heading font-bold uppercase tracking-wider text-[#405126] hover:text-[#1c2610] hover:bg-[#f5f1c6] border border-transparent hover:border-[#dbd49b] transition-all cursor-pointer min-h-[44px]"
            >
              Workshop Desk
            </button>
          </nav>

          {/* Right Action: WhatsApp CTA & Mobile/Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Primary Action Button (Desktop & Tablet) */}
            <a
              href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent("Hello MAAC Wheels Kumbakonam, I would like to consult on automotive services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] text-[#fffdd0] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-xs min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 text-[#fffdd0] fill-current" />
              <span>Book Service</span>
            </a>

            {/* Hamburger Toggle (Visible under lg, including 768px tablet per STEP 3) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#1c2610] hover:text-[#556b2f] bg-[#f7f4c9] active:bg-[#f4efbe] rounded-lg border border-[#dbd49b] transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
              title="Open Navigation Menu"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 text-[#556b2f]" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN / ADAPTIVE DRAWER MENU FOR MOBILE & TABLET (<1024px) */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          id="mobile-navigation-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-[#fffdd0] text-[#1c2610] flex flex-col overflow-hidden animate-in fade-in duration-150"
        >
          {/* Top Header */}
          <div className="h-16 sm:h-20 px-4 sm:px-6 bg-[#f7f4c9] border-b border-[#dbd49b] flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-1 sm:p-1.5 bg-white rounded-lg border border-[#dbd49b] flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-heading text-xl sm:text-2xl text-[#1c2610] font-extrabold tracking-tight">MAAC</span>
                <p className="font-body text-xs uppercase tracking-widest text-[#556b2f] font-bold leading-none mt-0.5">
                  WHEELS & ACCESSORIES
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center text-[#1c2610] hover:text-[#556b2f] bg-[#fdfcf3] active:bg-[#f5f1c6] rounded-lg border border-[#dbd49b] transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
              title="Close Navigation Menu"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 text-[#556b2f]" />
            </button>
          </div>

          {/* Menu Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] space-y-4 max-w-2xl mx-auto w-full">
            {/* Workshop Location Badge */}
            <div className="p-3 sm:p-4 bg-[#fdfcf3] rounded-xl border border-[#dbd49b] flex items-center justify-between shadow-xs">
              <div>
                <p className="font-heading text-base sm:text-lg text-[#1c2610] font-bold leading-tight">MAAC WHEELS & ACCESSORIES</p>
                <p className="text-xs sm:text-sm text-[#556b2f] font-mono-code mt-0.5">Kumbakonam • NH 36 Bypass</p>
              </div>
              <span className="text-xs font-mono-code bg-[#f7f4c9] text-[#556b2f] px-2.5 py-1 rounded border border-[#dbd49b] uppercase font-bold">
                Workshop Bay
              </span>
            </div>

            {/* 6 Services */}
            <div className="p-4 sm:p-5 bg-[#fdfcf3] rounded-xl border border-[#dbd49b] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#556b2f]" />
                  <span className="font-heading text-sm sm:text-base text-[#1c2610] font-bold uppercase tracking-wider">
                    Our 6 Signature Services
                  </span>
                </div>
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="text-xs sm:text-sm text-[#556b2f] font-bold min-h-[44px] flex items-center"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#dbd49b]">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection('services-section')}
                    className="w-full text-left p-3 rounded-lg bg-[#f7f4c9] hover:bg-[#f5f1c6] active:bg-[#ebe5b0] border border-[#dbd49b] flex items-center justify-between cursor-pointer min-h-[48px]"
                  >
                    <div className="pr-2">
                      <p className="text-xs sm:text-sm font-heading font-bold text-[#1c2610] uppercase">{s.title}</p>
                      <p className="text-xs text-[#66774c] line-clamp-1">{s.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#556b2f] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Jump to Workshop Desk */}
            <button
              onClick={() => scrollToSection('contact-section')}
              className="w-full text-left px-4 py-3.5 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider flex items-center justify-between border bg-[#fdfcf3] text-[#1c2610] border-[#dbd49b] cursor-pointer min-h-[48px]"
            >
              <span>Technical Consultation & Workshop Desk</span>
              <MapPin className="w-4 h-4 text-[#556b2f]" />
            </button>

            {/* Direct Action Contacts */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <a
                href={`tel:${WORKSHOP_DETAILS.phone}`}
                className="py-3 px-3 bg-[#fdfcf3] hover:bg-[#f5f1c6] active:bg-[#ebe5b0] border border-[#dbd49b] text-[#1c2610] rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4 text-[#556b2f]" />
                <span>Call Desk</span>
              </a>

              <a
                href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent("Hello MAAC Wheels Kumbakonam, I would like to consult on automotive services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] text-[#fffdd0] font-bold rounded-xl text-xs sm:text-sm font-heading uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 fill-current text-[#fffdd0]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
