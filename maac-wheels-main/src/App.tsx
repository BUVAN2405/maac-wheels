import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wrench } from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ServiceDetailPage } from './components/ServiceDetailPage.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { WhatsAppButton } from './components/WhatsAppButton.tsx';
import { AppBottomNav } from './components/AppBottomNav.tsx';
import { Footer } from './components/Footer.tsx';
import { OfflineIndicator } from './components/ErrorPages.tsx';
import { initSmoothScroll, scrollToTarget } from './services/smoothScroll.ts';
import {
  setPageSEO,
  MASTER_SEO_KEYWORDS,
  HOMEPAGE_FAQS,
  getLocalBusinessSchema,
  getBreadcrumbSchema,
  getFAQSchema
} from './services/seo.ts';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // Mount GSAP smooth scroll across all devices
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => cleanup();
  }, []);

  // Listen to browser Back and Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path.startsWith('/#')) {
      const targetHash = path.substring(1);
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          scrollToTarget(targetHash, -70);
        }, 80);
      } else {
        scrollToTarget(targetHash, -70);
      }
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const normalizedPath = currentPath === '' ? '/' : currentPath.replace(/\/+$/, '') || '/';
  const isHome = normalizedPath === '/';
  const isServicesDetail = normalizedPath.startsWith('/services/');
  const serviceId = isServicesDetail ? normalizedPath.replace('/services/', '') : null;
  const isUnknownRoute = !isHome && !isServicesDetail;

  useEffect(() => {
    if (isHome) {
      setPageSEO({
        title: 'Car Accessories Shop in Kumbakonam | MAAC Wheels',
        description:
          'Best car accessories & auto part shop in Kumbakonam Bypass, Koranattukkaruppur 612501. Alloys, seat covers, audio & detailing. Call +91 63698 58746.',
        keywords: MASTER_SEO_KEYWORDS,
        canonicalPath: '/',
        ogImage: '/assets/aistudio/logo_45b62f30.jpeg',
        robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        jsonLd: [
          getLocalBusinessSchema(),
          getBreadcrumbSchema([{ name: 'Home', url: '/' }]),
          getFAQSchema(HOMEPAGE_FAQS)
        ]
      });
    } else if (isUnknownRoute) {
      setPageSEO({
        title: 'Page Not Found | MAAC Wheels Kumbakonam',
        description: 'The requested page could not be found at MAAC Wheels and Accessories, Kumbakonam.',
        canonicalPath: normalizedPath,
        robots: 'noindex, nofollow'
      });
    }
  }, [isHome, isUnknownRoute, normalizedPath]);

  const scrollToServices = () => {
    if (!isHome) {
      navigateTo('/#services-section');
    } else {
      scrollToTarget('#services-section', -70);
    }
  };

  return (
    <div className="min-h-[100svh] bg-[#f2f0ef] text-[#1c2610] flex flex-col selection:bg-[#556b2f] selection:text-[#f2f0ef] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      <OfflineIndicator />

      {/* Navigation Header */}
      <Navbar onNavigate={navigateTo} />

      <main className="flex-1">
        {serviceId ? (
          /* Dynamic Service Detail View */
          <ServiceDetailPage serviceId={serviceId} onNavigate={navigateTo} />
        ) : isUnknownRoute ? (
          /* Real 404 View for Unknown Slugs */
          <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-xl bg-[#e5e2de] border border-[#d8d4cf] flex items-center justify-center text-[#556b2f] mb-4">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-[#1c2610] uppercase tracking-tight mb-2">
              Page Not Found
            </h1>
            <p className="font-body text-sm sm:text-base text-[#405126] mb-6">
              The page you requested does not exist. Visit our Kumbakonam car accessories home page to browse all workshop services.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#556b2f] text-[#f2f0ef] font-heading text-sm font-bold uppercase tracking-wider hover:bg-[#3f5023] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#556b2f] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </button>
          </section>
        ) : (
          /* Main Homepage View */
          <>
            <HeroSection
              onExploreServices={scrollToServices}
              onExploreRack={scrollToServices}
            />

            <ServicesSection onNavigate={navigateTo} />

            <ContactSection />
          </>
        )}
      </main>

      {/* Workshop Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Quick Consultation Launcher */}
      <WhatsAppButton />

      {/* Native-style App Bottom Navigation Bar for Mobile and Tablet Views */}
      <AppBottomNav onNavigate={navigateTo} />
    </div>
  );
}
