import { useEffect } from 'react';
import { initSmoothScroll } from './services/scroll';
import { PreloaderIntro } from './components/PreloaderIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ApproachSection } from './components/ApproachSection';
import { PhilosophyScrub } from './components/PhilosophyScrub';
import { ServicesSection } from './components/ServicesSection';
import { OrdinaryEndsHere } from './components/OrdinaryEndsHere';
import { BuildsShowcase } from './components/BuildsShowcase';
import { FooterSection } from './components/FooterSection';

export default function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => cleanup();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e5e5] selection:bg-[#410306] selection:text-white relative">
      {/* Editorial Opening Manifesto Preloader */}
      <PreloaderIntro />

      {/* Fixed Luxury Minimalist Navigation Header */}
      <Navbar />

      <main>
        {/* Cinematic Hero Section with Scroll Scrubbing Zoom */}
        <HeroSection />

        {/* Pinned 3-Step "Our Approach to Every Build" */}
        <ApproachSection />

        {/* Dynamic Philosophy Text Reveal Scrub */}
        <PhilosophyScrub />

        {/* Horizontal Scroll Atelier of 6 Signature Disciplines */}
        <ServicesSection />

        {/* Monumental Typographic Divider: Ordinary Ends Here */}
        <OrdinaryEndsHere />

        {/* Previous Builds Archives & Available Stock */}
        <BuildsShowcase />

        {/* Interactive Pointlight Footer & Project Inquiry */}
        <FooterSection />
      </main>
    </div>
  );
}
