import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Destroy any existing instance
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize Lenis with GSAP for all devices (desktop, tablet, mobile)
  lenisInstance = new Lenis({
    duration: prefersReducedMotion ? 0.01 : 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.25,
    infinite: false,
  });

  (window as any).__lenis = lenisInstance;

  // Synchronize Lenis scroll position with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Hook into GSAP ticker for frame-rate synchronization (60fps/120fps ProMotion)
  const tickerUpdate = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(tickerUpdate);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerUpdate);
    lenisInstance?.destroy();
    lenisInstance = null;
    delete (window as any).__lenis;
  };
}

export function scrollToTarget(target: string | HTMLElement, offset: number = -70): void {
  if (typeof window === 'undefined') return;

  const lenis = (window as any).__lenis as Lenis | undefined;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

