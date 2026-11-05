import React, { useState, useRef } from 'react';
import { ArrowUp, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { scrollTo } from '../services/scroll';

export const FooterSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vehicle: 'Defender 110 V8',
    message: '',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', vehicle: 'Defender 110 V8', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="relative bg-[#050505] pt-20 pb-12 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Interactive Pointlight Hero Banner (Awwwards Signature Effect) */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative rounded-3xl p-8 sm:p-14 md:p-20 overflow-hidden border border-white/15 bg-[#0a0a0a] shadow-2xl transition-all duration-300"
          style={{
            background: `radial-gradient(circle 450px at ${mousePos.x}% ${mousePos.y}%, rgba(85, 8, 14, 0.45), rgba(15, 15, 15, 0.95))`,
          }}
        >
          {/* Subtle Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-4">
              COMMISSION INQUIRY
            </span>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              Are you ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-300">
                Refuse Ordinary?
              </span>
            </h2>

            <p className="mt-6 text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Tell us about your vehicle, your vision, and your standards. Our master builders and design directors review every commission proposal personally.
            </p>

            {/* Interactive Commission Form */}
            <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jonathan Sterling"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                  Direct Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sterling@atelier.com"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                  Target Vehicle Platform
                </label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="Defender 110 V8">Land Rover Defender 90 / 110 / 130 V8</option>
                  <option value="Mercedes-AMG G63">Mercedes-AMG G63 Bi-Turbo</option>
                  <option value="Porsche 911 GT3">Porsche 911 (992) GT3 / Turbo S</option>
                  <option value="Range Rover SV">Range Rover SV Bespoke</option>
                  <option value="Lamborghini Urus">Lamborghini Urus Performante</option>
                  <option value="Other Bespoke Chassis">Other Bespoke Supercar / Chassis</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                  Commission Notes / Intended Disciplines
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline desired aerodynamic styling, custom interior leather shades, wheel fitments, or performance goals..."
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-lg font-mono text-xs uppercase tracking-widest font-semibold transition-all group shadow-xl"
                >
                  {formSubmitted ? (
                    <span className="text-emerald-700 font-bold">COMMISSION REQUEST RECEIVED ✓</span>
                  ) : (
                    <>
                      <span>Start Your Commission</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Atelier Technical Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16 border-b border-white/10 text-neutral-400 font-light text-xs sm:text-sm">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded border border-white/20 bg-red-950 flex items-center justify-center font-display font-black text-white text-xs">
                F
              </div>
              <span className="font-display font-bold text-white tracking-[0.2em] text-sm uppercase">
                FORGE AUTOMOTIVE
              </span>
            </div>
            <p className="leading-relaxed text-neutral-400">
              Bespoke vehicles built on distinction, desire, and identity. Not simply to be modified.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-white mb-4">
              Atelier Coordinates
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Forge Atelier, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>+44 (0) 20 8090 9800</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span>atelier@forgeautomotive.co.uk</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs text-neutral-400">
              <li>
                <button onClick={() => scrollTo('#approach', -30)} className="hover:text-white transition-colors">
                  Our Approach
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services', -30)} className="hover:text-white transition-colors">
                  Six Disciplines
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#philosophy', -30)} className="hover:text-white transition-colors">
                  Atelier Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#builds', -30)} className="hover:text-white transition-colors">
                  Curated Builds
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-white mb-4">
                Elevation
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Awwwards Site of the Day (SOTD) design showcase recreation with precision GSAP ScrollTrigger kinetics.
              </p>
            </div>

            <button
              onClick={() => scrollTo('#hero', 0)}
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-red-400 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Legal & Stamp */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-neutral-500 uppercase tracking-widest gap-4">
          <div>© 2026 FORGE AUTOMOTIVE LTD. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-neutral-300 cursor-pointer">TERMS OF COMMISSION</span>
            <span className="hover:text-neutral-300 cursor-pointer">SITEMAP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
