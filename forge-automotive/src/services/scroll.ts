import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: prefersReduced ? 0.01 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.2,
    infinite: false,
  });

  // Sync ScrollTrigger with Lenis
  lenisInstance.on('scroll', ScrollTrigger.update);

  const updateTicker = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(updateTicker);
    lenisInstance?.destroy();
    lenisInstance = null;
  };
}

export function scrollTo(target: string | HTMLElement, offset: number = 0): void {
  if (typeof window === 'undefined') return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
