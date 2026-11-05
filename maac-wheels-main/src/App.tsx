import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { WhatsAppButton } from './components/WhatsAppButton.tsx';
import { AppBottomNav } from './components/AppBottomNav.tsx';
import { Footer } from './components/Footer.tsx';
import { OfflineIndicator } from './components/ErrorPages.tsx';
import { initSmoothScroll, scrollToTarget } from './services/smoothScroll.ts';

export default function App() {
  // Mount GSAP smooth scroll across all devices
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => cleanup();
  }, []);

  const scrollToServices = () => {
    scrollToTarget('#services-section', -70);
  };

  return (
    <div className="min-h-[100svh] bg-[#f2f0ef] text-[#1c2610] flex flex-col selection:bg-[#556b2f] selection:text-[#f2f0ef] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      <OfflineIndicator />

      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* Full-View Cinematic Hero Section */}
        <HeroSection
          onExploreServices={scrollToServices}
          onExploreRack={scrollToServices}
        />

        {/* Exclusive 6 Signature Services Section */}
        <ServicesSection />

        {/* Technical Consultation & Kumbakonam Workshop Desk */}
        <ContactSection />
      </main>

      {/* Workshop Footer (Powered by - VelzenLabs) */}
      <Footer />

      {/* Floating WhatsApp Quick Consultation Launcher */}
      <WhatsAppButton />

      {/* Native-style App Bottom Navigation Bar for Mobile and Tablet Views */}
      <AppBottomNav />
    </div>
  );
}
