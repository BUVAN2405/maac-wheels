import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  MessageSquare, 
  Wrench
} from 'lucide-react';
import { WORKSHOP_DETAILS, SERVICES } from '../data/catalog.ts';
import { scrollToTarget } from '../services/smoothScroll.ts';

interface NavbarProps {
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
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

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    if (window.location.pathname !== '/') {
      handleNavClick(`/#${sectionId}`);
    } else {
      scrollToTarget(`#${sectionId}`, -70);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#f2f0ef]/95 backdrop-blur-md border-b border-[#d8d4cf] shadow-[0_2px_12px_rgba(85,107,47,0.06)]">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4 relative">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center flex-shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded-lg min-h-[44px] no-underline"
              title="MAAC Wheels & Accessories - Best Auto Part Shop in Kumbakonam"
            >
              <div className="relative p-1 sm:p-1.5 bg-white rounded-lg border border-[#d8d4cf] shadow-xs group-hover:border-[#556b2f] transition-colors flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Wheels & Accessories Logo Kumbakonam"
                  width={40}
                  height={40}
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
            </a>
          </div>

          {/* DESKTOP NAVBAR: Visible ONLY from lg (1024px+) */}
          <nav 
            className="hidden lg:flex items-center gap-2 xl:gap-4" 
            aria-label="Main navigation"
          >
            {/* Services Dropdown */}
            <div ref={servicesDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                aria-expanded={servicesMenuOpen}
                className="px-3.5 py-2.5 rounded-lg text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer text-[#405126] hover:text-[#1c2610] hover:bg-[#e5e2de] border border-transparent hover:border-[#d8d4cf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] min-h-[44px]"
              >
                <Wrench className="w-4 h-4 text-[#556b2f]" />
                <span>Our Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesMenuOpen ? 'rotate-180 text-[#556b2f]' : 'text-[#66774c]'}`} />
              </button>

              {servicesMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-88 bg-[#ffffff] border border-[#d8d4cf] rounded-xl p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#d8d4cf]">
                    <span className="font-label text-xs font-bold text-[#556b2f] uppercase tracking-wider">
                      {SERVICES.length} Signature Disciplines
                    </span>
                    <button
                      type="button"
                      onClick={() => scrollToSection('services-section')}
                      className="text-xs text-[#556b2f] hover:text-[#1c2610] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded flex items-center gap-1 font-semibold p-1 cursor-pointer"
                    >
                      View All <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {SERVICES.map((s, idx) => (
                      <a
                        key={s.id}
                        href={`/services/${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(`/services/${s.id}`);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-[#e5e2de] text-[#405126] hover:text-[#1c2610] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] transition-colors flex items-center justify-between group cursor-pointer min-h-[44px] no-underline"
                      >
                        <div>
                          <p className="text-xs font-heading uppercase text-[#1c2610] group-hover:text-[#556b2f] font-bold">{s.title}</p>
                          <p className="text-xs text-[#66774c] truncate max-w-[220px]">{s.subtitle}</p>
                        </div>
                        <span className="text-xs font-mono-code text-[#556b2f] font-medium ml-2">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Section Link */}
            <button
              type="button"
              onClick={() => scrollToSection('services-section')}
              className="px-3.5 py-2.5 rounded-lg text-sm font-heading font-bold uppercase tracking-wider text-[#405126] hover:text-[#1c2610] hover:bg-[#e5e2de] border border-transparent hover:border-[#d8d4cf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] transition-all cursor-pointer min-h-[44px]"
            >
              Services Overview
            </button>

            {/* Workshop Desk & Consultation */}
            <button
              type="button"
              onClick={() => scrollToSection('contact-section')}
              className="px-3.5 py-2.5 rounded-lg text-sm font-heading font-bold uppercase tracking-wider text-[#405126] hover:text-[#1c2610] hover:bg-[#e5e2de] border border-transparent hover:border-[#d8d4cf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] transition-all cursor-pointer min-h-[44px]"
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
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] text-[#f2f0ef] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-xs min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 text-[#f2f0ef] fill-current" />
              <span>Book Service</span>
            </a>

            {/* Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#1c2610] hover:text-[#556b2f] bg-[#e8e5e0] active:bg-[#d0cdc8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded-lg border border-[#d8d4cf] transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
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
          className="fixed inset-0 z-[9999] bg-[#f2f0ef] text-[#1c2610] flex flex-col overflow-hidden animate-in fade-in duration-150"
        >
          {/* Top Header */}
          <div className="h-16 sm:h-20 px-4 sm:px-6 bg-[#e8e5e0] border-b border-[#d8d4cf] flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-1 sm:p-1.5 bg-white rounded-lg border border-[#d8d4cf] flex items-center justify-center">
                <img
                  src="/assets/aistudio/logo_45b62f30.jpeg"
                  alt="MAAC Logo Kumbakonam"
                  width={40}
                  height={40}
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
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center text-[#1c2610] hover:text-[#556b2f] bg-[#ffffff] active:bg-[#e5e2de] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded-lg border border-[#d8d4cf] transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
              title="Close Navigation Menu"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5 text-[#556b2f]" />
            </button>
          </div>

          {/* Menu Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] space-y-4 max-w-2xl mx-auto w-full">
            {/* Workshop Location Badge */}
            <div className="p-3 sm:p-4 bg-[#ffffff] rounded-xl border border-[#d8d4cf] flex items-center justify-between shadow-xs">
              <div>
                <p className="font-heading text-base sm:text-lg text-[#1c2610] font-bold leading-tight">MAAC WHEELS & ACCESSORIES</p>
                <p className="text-xs sm:text-sm text-[#556b2f] font-mono-code mt-0.5">Kumbakonam, NH 36 Bypass</p>
              </div>
              <span className="text-xs font-mono-code bg-[#e8e5e0] text-[#556b2f] px-2.5 py-1 rounded border border-[#d8d4cf] uppercase font-bold">
                Workshop Bay
              </span>
            </div>

            {/* Signature Services */}
            <div className="p-4 sm:p-5 bg-[#ffffff] rounded-xl border border-[#d8d4cf] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#556b2f]" />
                  <span className="font-heading text-sm sm:text-base text-[#1c2610] font-bold uppercase tracking-wider">
                    Our {SERVICES.length} Signature Services
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('services-section')}
                  className="text-xs sm:text-sm text-[#556b2f] font-bold min-h-[44px] flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] rounded px-1"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#d8d4cf]">
                {SERVICES.map((s) => (
                  <a
                    key={s.id}
                    href={`/services/${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(`/services/${s.id}`);
                    }}
                    className="w-full text-left p-3 rounded-lg bg-[#e8e5e0] hover:bg-[#e5e2de] active:bg-[#dcd8d3] border border-[#d8d4cf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] flex items-center justify-between cursor-pointer min-h-[48px] no-underline"
                  >
                    <div className="pr-2">
                      <p className="text-xs sm:text-sm font-heading font-bold text-[#1c2610] uppercase">{s.title}</p>
                      <p className="text-xs text-[#66774c] truncate max-w-[200px]">{s.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#556b2f] shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => scrollToSection('contact-section')}
                className="w-full py-3 rounded-xl bg-[#ffffff] border border-[#d8d4cf] text-[#1c2610] font-heading font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 min-h-[48px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f]"
              >
                <span>Visit Workshop Desk</span>
                <ArrowRight className="w-4 h-4 text-[#556b2f]" />
              </button>

              <a
                href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${encodeURIComponent("Hello MAAC Wheels Kumbakonam, I would like to consult on automotive services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#556b2f] hover:bg-[#3f5023] text-white font-heading font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 min-h-[48px] shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Book Service Consultation</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
