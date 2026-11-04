import React, { useState } from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/catalog.ts';

export const WhatsAppButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hello MAAC Wheels & Accessories Kumbakonam team, I'd like an inquiry on services, wheels, and accessories for my vehicle."
  );

  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0.5rem))] lg:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2 sm:gap-3">
      {/* Tooltip on hover (desktop only) */}
      {hovered && (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#fdfcf3] border border-[#dbd49b] text-[#1c2610] text-xs font-mono-code rounded-lg shadow-lg animate-in fade-in duration-150">
          <ShieldCheck className="w-3.5 h-3.5 text-[#556b2f]" />
          <span>KUMBAKONAM WORKSHOP • {WORKSHOP_DETAILS.phone}</span>
        </div>
      )}

      {/* Button: 48px min touch target */}
      <a
        href={`https://wa.me/${WORKSHOP_DETAILS.whatsappRaw}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        id="floating-whatsapp-btn"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 bg-[#556b2f] hover:bg-[#3f5023] active:bg-[#222d13] text-[#fffdd0] rounded-full shadow-lg transition-transform transform active:scale-95 flex items-center justify-center cursor-pointer border-2 border-[#fffdd0] min-h-[48px] min-w-[48px]"
        aria-label="Direct WhatsApp Consultation"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 fill-current text-[#fffdd0]" />
      </a>
    </div>
  );
};
