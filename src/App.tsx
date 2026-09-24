import { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Industries } from './components/Industries';
import { About } from './components/About';
import { Insights } from './components/Insights';
import { Careers } from './components/Careers';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import type { LegalModalType, CaseStudy } from './types';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');
  const [activeModal, setActiveModal] = useState<LegalModalType>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [preloaderKey, setPreloaderKey] = useState<number>(0);

  // Active section tracking on scroll
  useEffect(() => {
    const sectionIds = ['home', 'about', 'capabilities', 'industries', 'insights', 'careers', 'contact'];

    const handleScroll = () => {
      // 140px offset accounts for fixed navbar (64px) + breathing room
      const scrollPosition = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          if (top <= scrollPosition) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectService = (serviceName: string) => {
    setSelectedServicePreset(serviceName);
  };

  const handleApplyForRole = (roleTitle: string) => {
    setSelectedServicePreset(roleTitle);
  };

  const handleOpenCaseStudyModal = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setActiveModal('case_study');
  };

  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);

  const handleOpenLegalModal = (type: LegalModalType) => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedCaseStudy(null);
  };

  const handleReplayIntro = () => {
    setPreloaderDone(false);
    setPreloaderKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Full-Screen Branded Preloader with Dual-Tone Logo Reveal */}
      <Preloader key={preloaderKey} onComplete={() => setPreloaderDone(true)} />

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

        {/* 7. Careers & High-Velocity Culture */}
        <Careers onApplyForRole={handleApplyForRole} />

        {/* 8. Enterprise Pilot Intake Form */}
        <Contact
          selectedServicePreset={selectedServicePreset}
          onClearPreset={() => setSelectedServicePreset('')}
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
