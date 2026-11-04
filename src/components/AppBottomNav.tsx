import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Wrench, 
  MapPin 
} from 'lucide-react';
import { scrollToTarget } from '../services/smoothScroll.ts';

type NavTab = 'home' | 'services' | 'workshop';

export const AppBottomNav: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavTab>('home');
  const isUserNavigating = useRef(false);
  const navLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Prevent scroll spy from overwriting active item while smooth scrolling after user tap
      if (isUserNavigating.current) return;

      const scrollPos = window.scrollY + 220;
      const contactEl = document.getElementById('contact-section');
      const servicesEl = document.getElementById('services-section');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveItem('workshop');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveItem('services');
      } else {
        setActiveItem('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hook into Lenis momentum scroll updates
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', handleScroll);
      }
      if (navLockTimer.current) clearTimeout(navLockTimer.current);
    };
  }, []);

  const scrollTo = (id: string, item: NavTab) => {
    setActiveItem(item);
    
    // Lock scroll spy during smooth momentum transit to avoid jitter
    isUserNavigating.current = true;
    if (navLockTimer.current) clearTimeout(navLockTimer.current);
    navLockTimer.current = setTimeout(() => {
      isUserNavigating.current = false;
    }, 1100);

    if (item === 'home') {
      scrollToTarget(document.body, 0);
    } else {
      scrollToTarget(`#${id}`, -70);
    }
  };

  // Translate percentages for 3-tab sliding indicator: 0% for home, 100% for services, 200% for workshop
  const indicatorOffset = 
    activeItem === 'home' ? 'translate-x-0' :
    activeItem === 'services' ? 'translate-x-full' :
    'translate-x-[200%]';

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#fffdd0]/95 backdrop-blur-xl border-t border-[#dbd49b] shadow-[0_-4px_20px_rgba(85,107,47,0.12)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="relative max-w-md mx-auto">
        {/* Animated Sliding Indicator Bar along the top edge across all 3 tabs */}
        <div className="absolute top-0 left-0 w-full h-[2.5px] overflow-hidden pointer-events-none">
          <div 
            className={`h-full w-1/3 bg-[#556b2f] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-full ${indicatorOffset}`}
          />
        </div>

        {/* 3-Column Navigation Grid */}
        <div className="grid grid-cols-3 h-16 items-center px-3 sm:px-6">
          
          {/* 1. Home */}
          <button
            onClick={() => scrollTo('root', 'home')}
            className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-transform active:scale-90 duration-150 cursor-pointer min-h-[48px]"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${
              activeItem === 'home' ? 'bg-[#556b2f]/15 text-[#556b2f] -translate-y-0.5 scale-105' : 'text-[#66774c]'
            }`}>
              <Home className="w-5 h-5 transition-transform duration-200" />
            </div>
            <span className={`text-[11px] font-heading uppercase tracking-wider transition-all duration-200 ${
              activeItem === 'home' ? 'text-[#556b2f] font-bold' : 'text-[#66774c] font-medium'
            }`}>
              Home
            </span>
          </button>

          {/* 2. Services */}
          <button
            onClick={() => scrollTo('services-section', 'services')}
            className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-transform active:scale-90 duration-150 cursor-pointer min-h-[48px]"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${
              activeItem === 'services' ? 'bg-[#556b2f]/15 text-[#556b2f] -translate-y-0.5 scale-105' : 'text-[#66774c]'
            }`}>
              <Wrench className="w-5 h-5 transition-transform duration-200" />
            </div>
            <span className={`text-[11px] font-heading uppercase tracking-wider transition-all duration-200 ${
              activeItem === 'services' ? 'text-[#556b2f] font-bold' : 'text-[#66774c] font-medium'
            }`}>
              Services
            </span>
          </button>

          {/* 3. Kumbakonam Workshop Desk */}
          <button
            onClick={() => scrollTo('contact-section', 'workshop')}
            className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-transform active:scale-90 duration-150 cursor-pointer min-h-[48px]"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${
              activeItem === 'workshop' ? 'bg-[#556b2f]/15 text-[#556b2f] -translate-y-0.5 scale-105' : 'text-[#66774c]'
            }`}>
              <MapPin className="w-5 h-5 transition-transform duration-200" />
            </div>
            <span className={`text-[11px] font-heading uppercase tracking-wider transition-all duration-200 ${
              activeItem === 'workshop' ? 'text-[#556b2f] font-bold' : 'text-[#66774c] font-medium'
            }`}>
              Workshop
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
