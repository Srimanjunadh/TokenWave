import { useState, useEffect, useCallback } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Industries } from './components/Industries';
import { About } from './components/About';
import { Insights } from './components/Insights';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import type { LegalModalType, CaseStudy } from './types';
import { initSmoothScroll } from './utils/scroll';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');
  const [activeModal, setActiveModal] = useState<LegalModalType>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [preloaderKey, setPreloaderKey] = useState<number>(0);
  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);

  // Initialize Lenis buttery-smooth inertial scroll
  useEffect(() => {
    const lenis = initSmoothScroll();

    // Listen to lenis scroll for instant top and bottom boundary tracking
    const unsubscribe = lenis?.on('scroll', (e) => {
      if (e.scroll < 60) {
        setActiveSection((prev) => (prev === 'home' ? prev : 'home'));
      } else if (e.limit > 0 && e.limit - e.scroll < 80) {
        setActiveSection((prev) => (prev === 'contact' ? prev : 'contact'));
      }
    });

    return () => {
      unsubscribe?.();
      lenis?.destroy();
    };
  }, []);

  // Zero-layout-thrashing IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = ['home', 'about', 'capabilities', 'industries', 'our-work', 'contact'];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const intersecting = entries.filter((entry) => entry.isIntersecting);
      if (intersecting.length > 0) {
        intersecting.sort((a, b) => {
          return Math.abs(a.boundingClientRect.top - 80) - Math.abs(b.boundingClientRect.top - 80);
        });
        const targetId = intersecting[0].target.id;
        setActiveSection((prev) => (prev === targetId ? prev : targetId));
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-70px 0px -55% 0px',
      threshold: [0, 0.1, 0.25],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectService = useCallback((serviceName: string) => {
    setSelectedServicePreset(serviceName);
  }, []);

  const handleOpenCaseStudyModal = useCallback((caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setActiveModal('case_study');
  }, []);

  const handleOpenLegalModal = useCallback((type: LegalModalType) => {
    setActiveModal(type);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
    setSelectedCaseStudy(null);
  }, []);

  const handleClearPreset = useCallback(() => {
    setSelectedServicePreset('');
  }, []);

  const handleReplayIntro = useCallback(() => {
    setPreloaderDone(false);
    setPreloaderKey((prev) => prev + 1);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Full-Screen Branded Preloader with Dual-Tone Logo Reveal */}
      <Preloader key={preloaderKey} onComplete={handlePreloaderComplete} />

      {/* 1. Sticky Navigation Bar */}
      <Navbar 
        activeSection={activeSection} 
        onSelectSection={setActiveSection}
        onReplayIntro={handleReplayIntro} 
        isPreloaderDone={preloaderDone} 
      />

      {/* Main Single-Page Flow */}
      <main className="flex-1 w-full">
        {/* 2. Hero Section */}
        <Hero isPreloaderDone={preloaderDone} />

        {/* 3. About Us & Brand Promise */}
        <About />

        {/* 4. Core Capabilities Section */}
        <Capabilities onSelectService={handleSelectService} />

        {/* 5. Industries & Solutions Section */}
        <Industries onSelectIndustry={handleSelectService} />

        {/* 6. Case Studies & Strategic Insights */}
        <Insights onOpenCaseStudyModal={handleOpenCaseStudyModal} />

        {/* 7. Enterprise Pilot Intake Form */}
        <Contact
          selectedServicePreset={selectedServicePreset}
          onClearPreset={handleClearPreset}
        />
      </main>

      {/* 9. Footer */}
      <Footer onOpenLegalModal={handleOpenLegalModal} />

      {/* Modals for Legal, Compliance & Case Studies */}
      <LegalModal
        modalType={activeModal}
        selectedCaseStudy={selectedCaseStudy}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
