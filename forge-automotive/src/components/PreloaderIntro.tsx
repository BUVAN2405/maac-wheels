import React, { useEffect, useState } from 'react';

export const PreloaderIntro: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    // Show intro for 2 seconds, then slide/fade away
    const timer = setTimeout(() => {
      setAnimatingOut(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
      }, 900);
      return () => clearTimeout(closeTimer);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#080808] flex flex-col justify-between p-8 sm:p-16 transition-transform duration-900 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        animatingOut ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="flex justify-between items-center text-xs font-mono tracking-[0.25em] text-neutral-400">
        <span>FORGE ATELIER</span>
        <span>UK BESPOKE DIVISION</span>
      </div>

      <div className="max-w-[1000px] my-auto">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-neutral-400 leading-[1.05] mb-2">
          We don’t modify vehicles.
        </h2>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.05]">
          We build them <span className="text-[#991b1b] underline underline-offset-8 decoration-1">for you.</span>
        </h2>
      </div>

      <div className="flex justify-between items-end border-t border-white/10 pt-4 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="uppercase tracking-widest text-[11px]">CALIBRATING ATELIER CANVAS</span>
        </div>
        <span className="hidden sm:inline tracking-widest uppercase text-[10px]">EDITION MMXXVI</span>
      </div>
    </div>
  );
};
