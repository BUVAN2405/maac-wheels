import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AudioAmbience } from './AudioAmbience';
import { scrollTo } from '../services/scroll';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (selector: string) => {
    setMenuOpen(false);
    scrollTo(selector, -30);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.06] transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero', 0);
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded border border-white/20 bg-gradient-to-br from-[#410306] to-black flex items-center justify-center font-display font-black text-white text-sm tracking-tighter group-hover:border-red-600 transition-colors">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white tracking-[0.2em] text-xs sm:text-sm uppercase">
                FORGE
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase -mt-0.5">
                AUTOMOTIVE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('#approach')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Approach
            </button>
            <button
              onClick={() => handleNavClick('#services')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('#philosophy')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Philosophy
            </button>
            <button
              onClick={() => handleNavClick('#builds')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Builds
            </button>
            <button
              onClick={() => handleNavClick('#stock')}
              className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Stock
            </button>
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-3 sm:gap-4">
            <AudioAmbience />

            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-medium tracking-wider rounded uppercase transition-colors"
            >
              <span>Refuse Ordinary</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile / Fullscreen Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white hover:text-neutral-300 transition-colors border border-white/10 rounded bg-white/[0.02]"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 pt-24 animate-in fade-in duration-300">
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 my-auto">
            <div className="flex flex-col space-y-5 sm:space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-red-500/80">
                NAVIGATION ATELIER
              </span>
              {[
                { label: 'Our Approach', target: '#approach' },
                { label: 'Bespoke Services', target: '#services' },
                { label: 'Atelier Philosophy', target: '#philosophy' },
                { label: 'Previous Builds', target: '#builds' },
                { label: 'Available Stock', target: '#stock' },
                { label: 'Commission Inquiry', target: '#contact' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.target)}
                  className="text-left font-display text-3xl sm:text-5xl font-bold tracking-tight text-neutral-300 hover:text-white hover:translate-x-3 transition-all duration-300 flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                </button>
              ))}
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-4">
                  Forge Automotive Atelier
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed max-w-sm mb-6 font-light">
                  A luxury automotive atelier for bespoke styling, performance and craftsmanship. One-off Defender, G63, Range Rover, Urus and 911 builds.
                </p>
                <div className="font-mono text-xs text-neutral-400 space-y-1">
                  <div>United Kingdom Atelier</div>
                  <div className="text-neutral-300">concierge@forgeautomotive.co.uk</div>
                </div>
              </div>

              <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                © 2026 FORGE AUTOMOTIVE LTD. ALL RIGHTS RESERVED.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
